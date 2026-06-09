import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { createHmac } from 'crypto'

export async function POST(req: Request) {
  console.log('[calendly/webhook] POST received')

  const body = await req.text()

  // Verify Calendly webhook signature
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY
  if (signingKey) {
    const signature = req.headers.get('Calendly-Webhook-Signature') ?? ''
    // Calendly signature format: "t=<timestamp>,v1=<hmac>"
    const parts = Object.fromEntries(signature.split(',').map(p => p.split('=')))
    const expected = createHmac('sha256', signingKey)
      .update(`${parts.t}.${body}`)
      .digest('hex')
    if (`v1=${expected}` !== `v1=${parts.v1}`) {
      console.warn('[calendly/webhook] Invalid signature — ignoring')
      return NextResponse.json({ ok: false }, { status: 401 })
    }
  }

  const payload = JSON.parse(body)
  const event = payload.event

  // Only handle successful bookings
  if (event !== 'invitee.created') {
    return NextResponse.json({ ok: true })
  }

  const email = payload.payload?.invitee?.email
  const name  = payload.payload?.invitee?.name
  const scheduledTime = payload.payload?.event?.start_time

  if (!email) {
    console.warn('[calendly/webhook] No email in payload')
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  console.log('[calendly/webhook] Booking confirmed:', email, scheduledTime)

  // Update Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase.rpc('track_call_scheduled', {
      p_email: email,
      p_scheduled_at: scheduledTime ?? new Date().toISOString(),
    })

    if (error) console.error('[calendly/webhook] Supabase error:', error.message)
    else console.log('[calendly/webhook] Call scheduled marked for:', email)
  }

  return NextResponse.json({ ok: true })
}
