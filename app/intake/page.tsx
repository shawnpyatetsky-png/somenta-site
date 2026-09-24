'use client'

import React, { Suspense, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { P, serif, bodyText, photoGrade } from '@/lib/theme'

// ── Booking calendars ─────────────────────────────────────────────────────────
// Paste each Google Calendar appointment-schedule embed URL here.
// In Google Calendar: create an appointment schedule → Share → Embed →
// copy the src="..." value out of the iframe code and paste it below.
const CALENDARS: Record<string, { name: string; embed: string }> = {
  shawn: {
    name: 'Shawn',
    embed: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3tkwh9V97q8JzxCcxAeS8GAwslXPUwvkskcH2UsSMhvzm8l2QbpAkyhFwV_K5sIUYmofYIViOP?gv=true',
  },
  jake: {
    name: 'Jake',
    embed: '',   // paste Jake's appointment-schedule URL here (same format as above)
  },
}

// ?c=s → Shawn, ?c=j → Jake. Anything else falls back to Shawn.
function ownerFromParam(c: string | null): 'shawn' | 'jake' {
  return c === 'j' ? 'jake' : 'shawn'
}

// ── Questions ─────────────────────────────────────────────────────────────────
const Q1_OPTS = [
  '0–3 months',
  '3–12 months',
  '1–2 years',
  '2+ years',
  "I haven't had one yet",
]

const Q2_OPTS = [
  'Feeling like no one around me really gets it',
  "I can't stay consistent with my practices",
  'What I gained is fading',
  "I'm still trying to make sense of it",
  "Nothing major, I'm doing well",
]

const Q3_OPTS = [
  'No one',
  "A few, but they don't really get it",
  'Yes, people who really get it',
]

const Q4_OPTS = [
  'Sharing and being heard in a circle',
  'Breathwork',
  'Meditation',
  'Movement and somatic practice',
  'Cacao ceremony',
  'Journaling or creative practice',
  'Books, talks, and workshops',
  'Staying accountable to a daily practice',
  'Not sure yet',
]

const TOTAL_STEPS = 6

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  @keyframes in-up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
  .in-up{animation:in-up .52s cubic-bezier(.16,1,.3,1) both}

  .in-opt{
    display:flex;align-items:flex-start;gap:1rem;
    padding:1.1rem 1.25rem;border-radius:12px;
    border:1.5px solid ${P.div};background:${P.light};
    cursor:pointer;width:100%;text-align:left;
    transition:border-color .18s,background .18s,box-shadow .18s;
  }
  .in-opt:hover{border-color:rgba(45,90,64,0.45);background:#FAF6F0;box-shadow:0 2px 12px rgba(40,27,13,0.06)}
  .in-opt.selected{border-color:${P.green};background:rgba(45,90,64,0.05);box-shadow:0 0 0 1px ${P.green}}

  .in-mark{
    width:18px;height:18px;flex-shrink:0;margin-top:1px;
    border:1.5px solid ${P.div};background:${P.light};
    display:flex;align-items:center;justify-content:center;
    transition:border-color .18s,background .18s;
  }
  .in-mark.radio{border-radius:50%}
  .in-mark.check{border-radius:5px}
  .in-opt.selected .in-mark{border-color:${P.green};background:${P.green}}
  .in-dot{width:7px;height:7px;border-radius:50%;background:${P.light}}

  .in-btn{
    background:${P.accent};color:${P.light};border:none;border-radius:100px;
    padding:16px 36px;font-size:15px;font-weight:600;cursor:pointer;
    letter-spacing:.01em;transition:background .2s,transform .18s,box-shadow .2s;
    font-family:var(--font-inter),-apple-system,sans-serif;
  }
  .in-btn:hover:not(:disabled){background:#B06A30;transform:translateY(-2px);box-shadow:0 6px 22px rgba(200,120,64,.28)}
  .in-btn:disabled{opacity:.38;cursor:not-allowed;transform:none;box-shadow:none}

  .in-input{
    width:100%;padding:14px 18px;border-radius:10px;
    border:1.5px solid ${P.div};background:${P.light};
    font-size:16px;color:${P.text};outline:none;
    font-family:var(--font-inter),-apple-system,sans-serif;
    transition:border-color .2s,box-shadow .2s;box-sizing:border-box;
  }
  .in-input:focus{border-color:${P.rust};box-shadow:0 0 0 3px rgba(184,80,48,.1)}
  .in-input::placeholder{color:rgba(107,90,71,.45)}

  .in-progress{height:2px;background:${P.green};transition:width .5s cubic-bezier(.16,1,.3,1)}

  button:focus-visible,a:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid rgba(184,80,48,.65);outline-offset:3px}

  .in-grain::after{content:'';position:fixed;inset:0;pointer-events:none;mix-blend-mode:multiply;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.11 0 0 0 0 0.05 0 0 0 0.05 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");background-size:240px 240px}
`

// ── Pieces ────────────────────────────────────────────────────────────────────
function OptionCard({ label, selected, multi, onSelect }: {
  label: string; selected: boolean; multi?: boolean; onSelect: () => void
}) {
  return (
    <button className={`in-opt${selected ? ' selected' : ''}`} onClick={onSelect}>
      <div className={`in-mark ${multi ? 'check' : 'radio'}`}>
        {selected && (multi
          ? <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.5L5 9L9.5 3.5" stroke={P.light} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          : <div className="in-dot" />
        )}
      </div>
      <span style={{ fontSize: '15px', color: P.text, lineHeight: 1.55, fontWeight: selected ? 500 : 400 }}>
        {label}
      </span>
    </button>
  )
}

function QuestionHeader({ step, question, hint }: { step: number; question: string; hint?: string }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: P.muted, margin: '0 0 1.25rem' }}>
        Step {step} of {TOTAL_STEPS}
      </p>
      <h2 style={{ ...serif, margin: 0, fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 400, lineHeight: 1.25, color: P.text, letterSpacing: '-0.015em' }}>
        {question}
      </h2>
      {hint && (
        <p style={{ fontSize: '13px', color: P.muted, margin: '0.75rem 0 0' }}>{hint}</p>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
function IntakeContent() {
  const params = useSearchParams()
  const owner = ownerFromParam(params.get('c'))
  const calendar = CALENDARS[owner]

  const [screen, setScreen] = useState(0)
  const [q1, setQ1] = useState<string | null>(null)
  const [q2, setQ2] = useState<string[]>([])
  const [q3, setQ3] = useState<string | null>(null)
  const [q4, setQ4] = useState<string[]>([])
  const [q5, setQ5] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const advance = () => setScreen(s => s + 1)

  const toggle = (list: string[], set: (v: string[]) => void, value: string) => {
    set(list.includes(value) ? list.filter(v => v !== value) : [...list, value])
  }

  async function submit() {
    if (submitted) return
    setSubmitted(true)
    try {
      await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, owner, q1, q2, q3, q4, q5 }),
      })
    } catch {
      // fire and forget — never block them from reaching the calendar
    }
  }

  function handleDetailsSubmit() {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!valid) { setEmailError('Please enter a valid email address.'); return }
    setEmailError('')
    submit()
    advance()
  }

  // Progress bar shows on question screens only (1–6)
  const progressStep = screen >= 1 && screen <= 6 ? screen : null

  return (
    <div className="in-grain" style={{ background: P.bg, minHeight: '100vh', fontFamily: 'var(--font-inter),-apple-system,sans-serif', color: P.text }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64, display: 'flex', alignItems: 'center',
        padding: '0 clamp(20px,4vw,48px)',
        background: 'rgba(247,243,236,0.92)',
        borderBottom: `1px solid ${P.div}`,
        backdropFilter: 'blur(12px)',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
          <Image src="/assets/logo-mark-amber.png" alt="Somenta" width={24} height={24} style={{ objectFit: 'contain' }} />
          <span style={{ ...serif, fontSize: '17px', color: P.text, fontWeight: 400 }}>Somenta</span>
        </a>
      </nav>

      {/* Progress */}
      {progressStep && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99, height: 2, background: P.div }}>
          <div className="in-progress" style={{ width: `${(progressStep / TOTAL_STEPS) * 100}%` }} />
        </div>
      )}

      {/* Content sits vertically centred in the viewport — the standard for
          one-question-at-a-time forms. Padding is the safe minimum so tall
          screens (the calendar) clear the fixed nav instead of tucking under it. */}
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '112px clamp(20px,4vw,48px) 72px' }}>
        <div key={screen} className="in-up" style={{ width: '100%', maxWidth: screen === 7 ? 820 : 620 }}>

          {/* 0 — Welcome */}
          {screen === 0 && (
            <div style={{ textAlign: 'center' }}>
              {/* Photo leads so it sets the tone, then an uninterrupted chain of
                  greeting → explanation → action. Capped narrower than the column
                  so it stays a warm anchor instead of out-weighing the CTA. */}
              <div style={{ position: 'relative', width: '100%', maxWidth: 420, margin: '0 auto 2.5rem', aspectRatio: '3 / 2', borderRadius: 16, overflow: 'hidden' }}>
                <Image
                  src="/assets/establishing_safety.jpg"
                  alt="" aria-hidden="true"
                  fill sizes="(max-width: 640px) 100vw, 420px" priority
                  style={{ objectFit: 'cover', objectPosition: 'center 40%', filter: photoGrade }}
                />
              </div>

              <h1 style={{ ...serif, fontSize: 'clamp(28px,4.5vw,40px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 1.25rem' }}>
                Glad you&rsquo;re here.
              </h1>

              <p style={{ fontSize: '16px', lineHeight: 1.75, color: bodyText, margin: '0 auto 2.5rem', maxWidth: 470 }}>
                A few quick questions. Then pick a time to chat about where you&rsquo;re at and how this community could help.
              </p>

              <button className="in-btn" onClick={advance}>Get started →</button>

              <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: P.muted, margin: '2rem 0 0' }}>
                Your answers stay between us. Join 100+ people integrating together.
              </p>
            </div>
          )}

          {/* 1 — Timeframe */}
          {screen === 1 && (
            <div>
              <QuestionHeader step={1} question="How long ago was your most recent retreat, ceremony, or personal journey?" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {Q1_OPTS.map(o => (
                  <OptionCard key={o} label={o} selected={q1 === o} onSelect={() => { setQ1(o); setTimeout(advance, 220) }} />
                ))}
              </div>
            </div>
          )}

          {/* 2 — Hardest part (multi) */}
          {screen === 2 && (
            <div>
              <QuestionHeader step={2} question="What's been the hardest part since your experience?" hint="Select all that apply." />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {Q2_OPTS.map(o => (
                  <OptionCard key={o} label={o} multi selected={q2.includes(o)} onSelect={() => toggle(q2, setQ2, o)} />
                ))}
              </div>
              <div style={{ marginTop: '2rem' }}>
                <button className="in-btn" onClick={advance} disabled={q2.length === 0}>Continue →</button>
              </div>
            </div>
          )}

          {/* 3 — Support system */}
          {screen === 3 && (
            <div>
              <QuestionHeader step={3} question="Do you have people in your life you can talk to about what you went through?" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {Q3_OPTS.map(o => (
                  <OptionCard key={o} label={o} selected={q3 === o} onSelect={() => { setQ3(o); setTimeout(advance, 220) }} />
                ))}
              </div>
            </div>
          )}

          {/* 4 — What they want (multi) */}
          {screen === 4 && (
            <div>
              <QuestionHeader step={4} question="What would you most like to do together in an online group?" hint="Select all that apply." />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {Q4_OPTS.map(o => (
                  <OptionCard key={o} label={o} multi selected={q4.includes(o)} onSelect={() => toggle(q4, setQ4, o)} />
                ))}
              </div>
              <div style={{ marginTop: '2rem' }}>
                <button className="in-btn" onClick={advance} disabled={q4.length === 0}>Continue →</button>
              </div>
            </div>
          )}

          {/* 5 — Anything else (optional) */}
          {screen === 5 && (
            <div>
              <QuestionHeader step={5} question="Anything else you'd like us to know before we talk?" hint="Optional — skip if nothing comes to mind." />
              <textarea
                className="in-input"
                rows={5}
                value={q5}
                onChange={e => setQ5(e.target.value)}
                placeholder="Whatever feels relevant..."
                style={{ resize: 'vertical', lineHeight: 1.6 }}
              />
              <div style={{ marginTop: '2rem' }}>
                <button className="in-btn" onClick={advance}>Continue →</button>
              </div>
            </div>
          )}

          {/* 6 — Name + email */}
          {screen === 6 && (
            <div>
              <QuestionHeader step={6} question="Last thing — who are we talking to?" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  className="in-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="First name"
                  autoComplete="given-name"
                />
                <input
                  className="in-input"
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError('') }}
                  onKeyDown={e => { if (e.key === 'Enter' && name.trim() && email.trim()) handleDetailsSubmit() }}
                  placeholder="Email address"
                  autoComplete="email"
                />
                {emailError && (
                  <p style={{ fontSize: '13px', color: P.rust, margin: 0 }}>{emailError}</p>
                )}
              </div>
              <div style={{ marginTop: '2rem' }}>
                <button className="in-btn" onClick={handleDetailsSubmit} disabled={!name.trim() || !email.trim()}>
                  Pick a time →
                </button>
              </div>
            </div>
          )}

          {/* 7 — Booking */}
          {screen === 7 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ ...serif, fontSize: 'clamp(24px,3.5vw,32px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 0.85rem' }}>
                  Thanks{name ? `, ${name.trim().split(' ')[0]}` : ''}. Let&rsquo;s find a time.
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: bodyText, margin: 0 }}>
                  Grab a slot that works best and we&rsquo;ll talk soon.
                </p>
              </div>

              <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${P.div}`, background: P.light }}>
                {calendar.embed ? (
                  <iframe
                    src={calendar.embed}
                    title={`Book a call with ${calendar.name}`}
                    style={{ border: 0, display: 'block', width: '100%', height: 700 }}
                  />
                ) : (
                  <p style={{ fontSize: '15px', lineHeight: 1.7, color: bodyText, textAlign: 'center', padding: '3.5rem 2rem', margin: 0 }}>
                    Thanks for sharing all of that. We&rsquo;ve got your answers and {calendar.name} will
                    reach out shortly to find a time that works for you.
                  </p>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

export default function IntakePage() {
  return (
    <Suspense>
      <IntakeContent />
    </Suspense>
  )
}
