// One-time SQL (Supabase dashboard → SQL Editor) — table + permissions:
//
// create table cta_events (
//   id uuid default gen_random_uuid() primary key,
//   created_at timestamptz default now(),
//   email text,
//   cta text
// );
// alter table cta_events enable row level security;
// create policy "allow event inserts" on cta_events for insert with check (true);
//
// grant insert on table cta_events to anon, authenticated, service_role;
// grant select on table cta_events to service_role;
// grant select, update on table quiz_submissions to service_role;

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  console.log('[quiz/conversion] POST received')

  const { email, cta } = await req.json()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Server-side route — prefer the service role key (bypasses RLS), fall back to anon
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Full click history — one row per event
    const { error: eventError } = await supabase.from('cta_events').insert({ email, cta })
    if (eventError) console.error('[quiz/conversion] event insert error:', eventError.message)
    else console.log('[quiz/conversion] event saved:', cta, 'for', email)

    // Stamp the person's quiz row (first click wins; cta_events keeps the rest)
    const { error: stampError } = await supabase
      .from('quiz_submissions')
      .update({ cta_clicked: cta, cta_clicked_at: new Date().toISOString() })
      .eq('email', email)
      .is('cta_clicked', null)
    if (stampError) console.error('[quiz/conversion] submission stamp error:', stampError.message)
  }

  console.log('[quiz/conversion] Done')
  return NextResponse.json({ ok: true })
}
