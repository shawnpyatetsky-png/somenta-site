import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  console.log('[quiz/conversion] POST received')

  const { email, cta } = await req.json()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase.rpc('track_cta_click', { p_email: email, p_cta: cta })

    if (error) console.error('[quiz/conversion] RPC error:', error.message)
    else console.log('[quiz/conversion] CTA tracked:', cta, 'for', email)
  }

  return NextResponse.json({ ok: true })
}
