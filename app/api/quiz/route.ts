// SQL to run in Supabase dashboard (SQL Editor) before using this route:
//
// create table quiz_submissions (
//   id uuid default gen_random_uuid() primary key,
//   created_at timestamptz default now(),
//   first_name text,
//   email text,
//   q1 text, q2 text, q3 text, q4 text,
//   q5 text, q6 text, q7 text, q8 text,
//   recommended_path text,
//   schema_version text,
//   answers jsonb
// );
//
// alter table quiz_submissions enable row level security;
// -- Service role bypasses RLS so no policy needed for server-side inserts.
//
// If the table already exists, just add the column:
// alter table quiz_submissions add column if not exists schema_version text;

import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const Q_LABELS: Record<string, Record<string, string>> = {
  q1: { A: 'Feels great, wants routine', B: 'Breakthroughs, needs change support', C: 'Anxious, needs nervous system support', D: 'Stuck, no clarity yet' },
  q2: { A: 'Comfortable, no discomfort', B: 'Tight/rigid tension or pain', C: 'Jittery, racing heart', D: 'Exhausted, brain fog', E: 'Numb, disconnected' },
  q3: { A: '0–4 weeks ago', B: '1–6 months ago', C: '6 months–1 year ago', D: 'Over 1 year ago' },
  q4: { A: 'Old routines holding back', B: 'Emotional overwhelm', C: 'Feeling disconnected', D: 'Too much in head' },
  q5: { A: 'Mind & Spirit', B: 'Body & Lifestyle', C: 'Relationships', D: 'Nature & Environment' },
  q6: { A: 'No routine yet', B: 'Only reactive', C: 'Bursts then fall off', D: 'Consistent, want to deepen' },
  q7: { A: 'Has therapist, no peer community', B: 'Friends/family but they don\'t get it', C: 'Entirely on own', D: 'Scattered resources' },
  q8: { A: 'At my own pace (few min/day)', B: 'Community rhythm (1 hr/week)', C: 'Going deep (2 hrs/week, Pod)' },
}

function label(q: string, val: string | null) {
  if (!val) return '—'
  return Q_LABELS[q]?.[val] ?? val
}

export async function POST(req: Request) {
  console.log('[quiz/route] POST received')

  const body = await req.json()
  const { name, email, q1, q2, q3, q4, q5, q6, q7, q8, recommended_path } = body

  // ── Save to Supabase ──────────────────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { error } = await supabase.from('quiz_submissions').insert({
      first_name: name,
      email,
      q1, q2, q3, q4, q5, q6, q7, q8,
      recommended_path,
      schema_version: 'v2',
      answers: { name, email, q1, q2, q3, q4, q5, q6, q7, q8, recommended_path },
    })
    if (error) console.error('[quiz/route] Supabase insert error:', error.message)
    else console.log('[quiz/route] Saved to Supabase')
  } else {
    console.warn('[quiz/route] Supabase env vars missing — skipping DB save')
  }

  // ── Send notification email via Resend ────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY

  if (resendKey) {
    const resend = new Resend(resendKey)
    const { error } = await resend.emails.send({
      from: 'Somenta Quiz <onboarding@joinsomenta.com>',
      to: 'hello@joinsomenta.com',
      subject: `New quiz completion — ${name} (${email}) → ${recommended_path === 'pod' ? 'The Pod' : 'Foundation'}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#281B0D;line-height:1.6">
          <h2 style="font-size:22px;margin:0 0 8px">New quiz submission</h2>
          <p style="color:#6B5A47;margin:0 0 24px;font-size:14px">${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', timeZone: 'America/New_York' })}</p>

          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr style="background:#F0E9DC"><td style="padding:10px 14px;font-weight:600">Name</td><td style="padding:10px 14px">${name}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600">Email</td><td style="padding:10px 14px"><a href="mailto:${email}" style="color:#B85030">${email}</a></td></tr>
            <tr style="background:#F0E9DC"><td style="padding:10px 14px;font-weight:600">Recommended path</td><td style="padding:10px 14px;font-weight:700;color:#B85030">${recommended_path === 'pod' ? 'The Intimate Peer Pod' : 'Foundation'}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600">Q1 — Timeframe</td><td style="padding:10px 14px">${label('q3', q3)}</td></tr>
            <tr style="background:#F0E9DC"><td style="padding:10px 14px;font-weight:600">Q2 — Biggest hurdle</td><td style="padding:10px 14px">${label('q4', q4)}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600">Q3 — Disconnect area</td><td style="padding:10px 14px">${label('q5', q5)}</td></tr>
            <tr style="background:#F0E9DC"><td style="padding:10px 14px;font-weight:600">Q4 — Capacity / energy</td><td style="padding:10px 14px">${label('q1', q1)}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600">Q5 — Somatic state</td><td style="padding:10px 14px">${label('q2', q2)}</td></tr>
            <tr style="background:#F0E9DC"><td style="padding:10px 14px;font-weight:600">Q6 — Current routine</td><td style="padding:10px 14px">${label('q6', q6)}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600">Q7 — Support system</td><td style="padding:10px 14px">${label('q7', q7)}</td></tr>
            <tr style="background:#F0E9DC"><td style="padding:10px 14px;font-weight:600">Q8 — Commitment level</td><td style="padding:10px 14px">${label('q8', q8)}</td></tr>
          </table>
        </div>
      `,
    })
    if (error) console.error('[quiz/route] Resend error:', error.message)
    else console.log('[quiz/route] Notification email sent')
  } else {
    console.warn('[quiz/route] RESEND_API_KEY missing — skipping email')
  }

  console.log('[quiz/route] Done')
  return NextResponse.json({ ok: true })
}
