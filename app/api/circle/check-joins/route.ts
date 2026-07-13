// Polls Circle for new Landing Pad members (the plan has no webhooks, but the
// Zapier token can read the member list). Called every 10 minutes by Supabase
// pg_cron. New members get logged in cta_events (landing_pad_joined) and receive
// the welcome email from Jake — once, ever.
//
// Env: CIRCLE_API_TOKEN (Circle Zapier token), CIRCLE_WEBHOOK_SECRET (protects
// this URL), plus the existing Supabase + Resend keys.
//
// Seeding: members who joined more than 48 hours ago are logged silently with
// no email — so the first run doesn't blast the founding members.

import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const COMMUNITY_ID = 465458

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

export async function GET(req: Request) {
  console.log('[circle/check-joins] run started')

  const url = new URL(req.url)
  if (!process.env.CIRCLE_WEBHOOK_SECRET || url.searchParams.get('token') !== process.env.CIRCLE_WEBHOOK_SECRET) {
    console.warn('[circle/check-joins] rejected: bad or missing token')
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const circleToken = process.env.CIRCLE_API_TOKEN
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!circleToken || !supabaseUrl || !supabaseKey) {
    console.error('[circle/check-joins] missing env vars')
    return NextResponse.json({ ok: false, error: 'missing env' }, { status: 500 })
  }

  // ── Fetch all community members from Circle ────────────────────────────────
  const members: { email?: string; first_name?: string; name?: string; created_at?: string }[] = []
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(
      `https://app.circle.so/api/v1/community_members?community_id=${COMMUNITY_ID}&per_page=100&page=${page}`,
      { headers: { Authorization: `Token ${circleToken}` }, cache: 'no-store' }
    )
    if (!res.ok) {
      console.error('[circle/check-joins] Circle API error:', res.status)
      break
    }
    const batch = await res.json()
    if (!Array.isArray(batch) || batch.length === 0) break
    members.push(...batch)
    if (batch.length < 100) break
  }

  // ── Who has already been logged? ───────────────────────────────────────────
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data: seen, error: seenError } = await supabase
    .from('cta_events')
    .select('email')
    .eq('cta', 'landing_pad_joined')
  if (seenError) {
    console.error('[circle/check-joins] read error:', seenError.message)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
  const seenSet = new Set((seen ?? []).map(r => (r.email || '').toLowerCase()))

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
  const cutoff = Date.now() - 48 * 60 * 60 * 1000
  let logged = 0
  let welcomed = 0

  for (const m of members) {
    const email = (m.email || '').toLowerCase().trim()
    if (!email || email.endsWith('@joinsomenta.com')) continue // skip team accounts
    if (seenSet.has(email)) continue

    const { error: insertError } = await supabase.from('cta_events').insert({ email, cta: 'landing_pad_joined' })
    if (insertError) {
      console.error('[circle/check-joins] insert error for', email, insertError.message)
      continue
    }
    logged++

    // Only welcome genuinely new members — older ones are seeded silently
    const joinedAt = Date.parse(m.created_at || '') || 0
    if (resend && joinedAt > cutoff) {
      const firstName = String(m.first_name || m.name || '').trim().split(/\s+/)[0] || 'there'
      const { error: sendError } = await resend.emails.send({
        from: 'Jake from Somenta <jake@joinsomenta.com>',
        replyTo: 'jake@joinsomenta.com',
        to: email,
        subject: "You've landed.",
        html: WELCOME_HTML(firstName),
      })
      if (sendError) console.error('[circle/check-joins] Resend error for', email, sendError.message)
      else {
        welcomed++
        console.log('[circle/check-joins] welcomed', email)
      }
    }
  }

  console.log('[circle/check-joins] done — members:', members.length, 'logged:', logged, 'welcomed:', welcomed)
  return NextResponse.json({ ok: true, members: members.length, logged, welcomed })
}
