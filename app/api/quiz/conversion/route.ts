// SQL to run in Supabase dashboard (SQL Editor) before this route can save events:
//
// create table cta_events (
//   id uuid default gen_random_uuid() primary key,
//   created_at timestamptz default now(),
//   email text,
//   cta text
// );
//
// alter table cta_events enable row level security;
// create policy "allow event inserts" on cta_events for insert with check (true);
// -- Insert-only: no select policy, so the public key can write events but never read them.

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  console.log('[quiz/conversion] POST received')

  const { email, cta } = await req.json()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase.from('cta_events').insert({ email, cta })

    if (error) console.error('[quiz/conversion] insert error:', error.message)
    else console.log('[quiz/conversion] event saved:', cta, 'for', email)
  }

  console.log('[quiz/conversion] Done')
  return NextResponse.json({ ok: true })
}
