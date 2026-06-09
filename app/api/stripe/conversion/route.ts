import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { createHmac } from 'crypto'

export async function POST(req: Request) {
  console.log('[stripe/webhook] POST received')
  const body = await req.text()

  // Verify the request really came from Stripe
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (signingSecret) {
    const sigHeader = req.headers.get('stripe-signature') ?? ''
    const parts = Object.fromEntries(sigHeader.split(',').map(p => p.split('=')))
    const expected = createHmac('sha256', signingSecret)
      .update(`${parts.t}.${body}`)
      .digest('hex')
    if (expected !== parts.v1) {
      console.warn('[stripe/webhook] Invalid signature — ignoring')
      return NextResponse.json({ ok: false }, { status: 401 })
    }
  }

  const event = JSON.parse(body)

  // Only care about completed checkouts (a member finishing payment)
  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ ok: true })
  }

  const session = event.data?.object
  const email = session?.customer_details?.email ?? session?.customer_email
  const plan = session?.metadata?.plan ?? null
  const amount = session?.amount_total ?? null

  if (!email) {
    console.warn('[stripe/webhook] No email in payload')
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  console.log('[stripe/webhook] Payment completed:', email, amount)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { error } = await supabase.rpc('track_payment_completed', {
      p_email: email,
      p_plan: plan,
      p_amount: amount,
      p_event_id: event.id,
    })
    if (error) console.error('[stripe/webhook] Supabase error:', error.message)
    else console.log('[stripe/webhook] Payment tracked for:', email)
  }

  return NextResponse.json({ ok: true })
}
