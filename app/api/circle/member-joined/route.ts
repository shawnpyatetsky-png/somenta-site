// Circle webhook → welcome email from Jake + funnel logging.
//
// Setup:
// 1. Vercel env var CIRCLE_WEBHOOK_SECRET (same value goes in the webhook URL below)
// 2. Circle → Settings → Developers → Webhooks → event "Community member joined",
//    URL: https://www.joinsomenta.com/api/circle/member-joined?token=<CIRCLE_WEBHOOK_SECRET>
// 3. jake@joinsomenta.com must exist as a mailbox or forward so replies reach a human.
//
// Each join: logged once in cta_events (cta = 'landing_pad_joined'), then the
// welcome email is sent. Duplicate webhooks for the same email are ignored.

import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const WELCOME_HTML = (firstName: string) => `
  <div style="font-family:Georgia,serif;max-width:540px;margin:0 auto;color:#281B0D;line-height:1.75;font-size:16px;padding:8px 4px">
    <p style="margin:0 0 20px">Hi ${firstName},</p>

    <p style="margin:0 0 20px">Welcome to the Landing Pad — and thank you for trusting us with this stretch of your journey.</p>

    <p style="margin:0 0 20px">One promise before anything else: <strong>there&rsquo;s nothing you need to do right now.</strong> No introductions, no forms, no catching up. The space is quiet on purpose. Your only job is to settle in.</p>

    <p style="margin:0 0 8px">Two things worth knowing:</p>

    <p style="margin:0 0 16px"><strong>Your first practice is coming.</strong> Over the next couple of weeks we&rsquo;ll drop short, 5-minute guided somatic practices in the community feed — a gentle first taste of the Somenta rhythm. Keep an eye out.</p>

    <p style="margin:0 0 20px"><strong>Save the date — Sunday, August 2nd &middot; 2pm ET / 11am PT.</strong> Our first live session: a guided practice, the coaches who&rsquo;ll be leading your classes and pods, and a walk through what your first weeks will look like. Camera on or off, no pressure to speak. RSVP link lands in the feed soon.</p>

    <p style="margin:0 0 20px">That&rsquo;s it. Take a deep breath — you don&rsquo;t have to do this alone anymore.</p>

    <p style="margin:0 0 4px">— Jake</p>
    <p style="margin:0 0 28px;color:#6B5A47;font-size:14px">Somenta</p>

    <p style="margin:0;color:#6B5A47;font-size:13.5px;font-style:italic">P.S. If anything&rsquo;s on your mind, just hit reply. A real person reads these.</p>
  </div>
`

export async function POST(req: Request) {
  console.log('[circle/member-joined] POST received')

  // Shared-secret check — reject anything that isn't our Circle webhook
  const url = new URL(req.url)
  if (!process.env.CIRCLE_WEBHOOK_SECRET || url.searchParams.get('token') !== process.env.CIRCLE_WEBHOOK_SECRET) {
    console.warn('[circle/member-joined] rejected: bad or missing token')
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const body = await req.json().catch(() => ({} as Record<string, unknown>))
  // Circle payload shapes vary by event version — check the usual places
  const b = body as any
  const member = b?.member ?? b?.data?.member ?? b?.community_member ?? b?.data ?? {}
  const email: string | null = member?.email ?? b?.email ?? null
  const rawName: string = member?.first_name ?? member?.name ?? b?.name ?? ''
  const firstName = String(rawName).trim().split(/\s+/)[0] || 'there'

  if (!email) {
    console.warn('[circle/member-joined] no email in payload — ignoring')
    return NextResponse.json({ ok: true })
  }

  // Dedupe: one welcome per email, ever (webhooks can retry)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: existing } = await supabase
      .from('cta_events')
      .select('id')
      .eq('email', email)
      .eq('cta', 'landing_pad_joined')
      .limit(1)

    if (existing && existing.length > 0) {
      console.log('[circle/member-joined] already welcomed:', email)
      return NextResponse.json({ ok: true })
    }

    const { error } = await supabase.from('cta_events').insert({ email, cta: 'landing_pad_joined' })
    if (error) console.error('[circle/member-joined] event insert error:', error.message)
    else console.log('[circle/member-joined] join logged:', email)
  }

  // Welcome email from Jake
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const resend = new Resend(resendKey)
    const { error } = await resend.emails.send({
      from: 'Jake from Somenta <jake@joinsomenta.com>',
      replyTo: 'jake@joinsomenta.com',
      to: email,
      subject: "You've landed.",
      html: WELCOME_HTML(firstName),
    })
    if (error) console.error('[circle/member-joined] Resend error:', error.message)
    else console.log('[circle/member-joined] welcome sent to', email)
  } else {
    console.warn('[circle/member-joined] RESEND_API_KEY missing — skipping email')
  }

  console.log('[circle/member-joined] Done')
  return NextResponse.json({ ok: true })
}
