// SQL to run in Supabase dashboard (SQL Editor) before using this route:
//
// create table intake_submissions (
//   id uuid default gen_random_uuid() primary key,
//   created_at timestamptz default now(),
//   first_name text,
//   email text,
//   owner text,              -- 'shawn' or 'jake' — whose link they came through
//   q1_timeframe text,
//   q2_hardest_part text,    -- comma-joined (multi-select)
//   q3_support text,
//   q4_wants text,           -- comma-joined (multi-select)
//   q5_anything_else text,
//   answers jsonb
// );
//
// alter table intake_submissions enable row level security;
// grant insert on intake_submissions to anon, authenticated, service_role;
// grant select on intake_submissions to service_role;

import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const OWNER_NAMES: Record<string, string> = { shawn: 'Shawn', jake: 'Jake' }

export async function POST(req: Request) {
  console.log('[intake/route] POST received')

  const body = await req.json()
  const { name, email, owner, q1, q2, q3, q4, q5 } = body

  // Multi-selects arrive as arrays — store readable, comma-joined text so the
  // Supabase table is scannable at a glance before a call
  const q2Text = Array.isArray(q2) ? q2.join(', ') : (q2 ?? '')
  const q4Text = Array.isArray(q4) ? q4.join(', ') : (q4 ?? '')

  // ── Save to Supabase ──────────────────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { error } = await supabase.from('intake_submissions').insert({
      first_name: name,
      email,
      owner: owner || null,
      q1_timeframe: q1 ?? '',
      q2_hardest_part: q2Text,
      q3_support: q3 ?? '',
      q4_wants: q4Text,
      q5_anything_else: q5 ?? '',
      answers: { name, email, owner, q1, q2, q3, q4, q5 },
    })
    if (error) console.error('[intake/route] Supabase insert error:', error.message)
    else console.log('[intake/route] Saved to Supabase')
  } else {
    console.warn('[intake/route] Supabase env vars missing — skipping DB save')
  }

  // ── Send notification email via Resend ────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY

  if (resendKey) {
    const resend = new Resend(resendKey)
    const ownerName = OWNER_NAMES[owner] ?? 'Unassigned'
    const row = (k: string, v: string, alt: boolean) =>
      `<tr${alt ? ' style="background:#F0E9DC"' : ''}><td style="padding:10px 14px;font-weight:600;vertical-align:top;width:34%">${k}</td><td style="padding:10px 14px">${v || '—'}</td></tr>`

    const { error } = await resend.emails.send({
      from: 'Somenta Intake <onboarding@joinsomenta.com>',
      to: 'hello@joinsomenta.com',
      subject: `New intake — ${name} (${email}) → ${ownerName}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#281B0D;line-height:1.6">
          <h2 style="font-size:22px;margin:0 0 8px">New intake submission</h2>
          <p style="color:#6B5A47;margin:0 0 24px;font-size:14px">${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', timeZone: 'America/New_York' })}</p>

          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${row('Name', name, true)}
            ${row('Email', `<a href="mailto:${email}" style="color:#B85030">${email}</a>`, false)}
            ${row('Call with', `<strong style="color:#B85030">${ownerName}</strong>`, true)}
            ${row('Time since experience', q1 ?? '', false)}
            ${row('Hardest part', q2Text, true)}
            ${row('Support system', q3 ?? '', false)}
            ${row('Wants from a group', q4Text, true)}
            ${row('Anything else', q5 ?? '', false)}
          </table>
        </div>
      `,
    })
    if (error) console.error('[intake/route] Resend error:', error.message)
    else console.log('[intake/route] Notification email sent')
  } else {
    console.warn('[intake/route] RESEND_API_KEY missing — skipping email')
  }

  console.log('[intake/route] Done')
  return NextResponse.json({ ok: true })
}
