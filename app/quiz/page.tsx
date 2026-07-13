'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { P, serif, bodyText } from '@/lib/theme'

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  @keyframes qz-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
  .qz-in{animation:qz-in .52s cubic-bezier(.16,1,.3,1) both}

  @keyframes qz-fade{from{opacity:0}to{opacity:1}}
  .qz-fade{animation:qz-fade .4s ease both}

  .qz-opt{
    display:flex;align-items:flex-start;gap:1rem;
    padding:1.1rem 1.25rem;border-radius:12px;
    border:1.5px solid ${P.div};background:${P.light};
    cursor:pointer;width:100%;text-align:left;
    transition:border-color .18s,background .18s,box-shadow .18s;
  }
  .qz-opt:hover{border-color:rgba(45,90,64,0.45);background:#FAF6F0;box-shadow:0 2px 12px rgba(40,27,13,0.06)}
  .qz-opt.selected{border-color:${P.green};background:rgba(45,90,64,0.05);box-shadow:0 0 0 1px ${P.green}}

  .qz-radio{
    width:18px;height:18px;border-radius:50%;flex-shrink:0;margin-top:1px;
    border:1.5px solid ${P.div};background:${P.light};
    display:flex;align-items:center;justify-content:center;
    transition:border-color .18s,background .18s;
  }
  .qz-opt.selected .qz-radio{border-color:${P.green};background:${P.green}}
  .qz-radio-dot{width:7px;height:7px;border-radius:50%;background:${P.light}}

  .qz-btn{
    background:${P.accent};color:${P.light};border:none;border-radius:100px;
    padding:16px 36px;font-size:15px;font-weight:600;cursor:pointer;
    letter-spacing:.01em;transition:background .2s,transform .18s,box-shadow .2s;
    font-family:var(--font-inter),-apple-system,sans-serif;
  }
  .qz-btn:hover:not(:disabled){background:#B06A30;transform:translateY(-2px);box-shadow:0 6px 22px rgba(200,120,64,.28)}
  .qz-btn:disabled{opacity:.38;cursor:not-allowed;transform:none;box-shadow:none}

  .qz-input{
    width:100%;padding:14px 18px;border-radius:10px;
    border:1.5px solid ${P.div};background:${P.light};
    font-size:16px;color:${P.text};outline:none;
    font-family:var(--font-inter),-apple-system,sans-serif;
    transition:border-color .2s,box-shadow .2s;box-sizing:border-box;
  }
  .qz-input:focus{border-color:${P.rust};box-shadow:0 0 0 3px rgba(184,80,48,.1)}
  .qz-input::placeholder{color:rgba(107,90,71,.45)}

  .qz-progress-bar{height:2px;background:${P.green};transition:width .5s cubic-bezier(.16,1,.3,1)}

  /* Keyboard focus — same palette ring as the landing page */
  button:focus-visible,a:focus-visible,input:focus-visible{outline:2px solid rgba(184,80,48,.65);outline-offset:3px}

  /* Paper grain — same material as the landing page */
  .qz-grain::after{content:'';position:fixed;inset:0;pointer-events:none;mix-blend-mode:multiply;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.11 0 0 0 0 0.05 0 0 0 0.05 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");background-size:240px 240px}

  @keyframes qz-line-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .qz-calc-line{opacity:0;animation:qz-line-in .5s cubic-bezier(.16,1,.3,1) forwards}
  .qz-calc-line:nth-child(1){animation-delay:.15s}
  .qz-calc-line:nth-child(2){animation-delay:.5s}
  .qz-calc-line:nth-child(3){animation-delay:.85s}

`

// ── Quiz data ─────────────────────────────────────────────────────────────────
const Q1_OPTS = [
  { key: 'A', label: 'I feel great and mostly need accountability to build healthy new daily routines to hold onto how I feel' },
  { key: 'B', label: 'I had massive breakthroughs, but now I need support navigating major, disruptive changes to my life, relationships, or career' },
  { key: 'C', label: 'I feel highly anxious or destabilized and need support calming my nervous system' },
  { key: 'D', label: "I didn't get the clarity I went looking for and feel stuck or disappointed" },
]

const Q2_OPTS = [
  { key: 'A', label: 'I feel generally comfortable, warm, and at ease, without any specific discomfort' },
  { key: 'B', label: 'I am holding tight, rigid tension, chronic pain, or spasms in my muscles' },
  { key: 'C', label: 'I feel jittery and agitated; my heart races, and I have a hard time sitting still' },
  { key: 'D', label: 'I feel physical exhaustion, brain fog, or a deep sense of heaviness' },
  { key: 'E', label: 'I feel physically numb, floating out of my body, or disconnected from myself' },
]

const Q3_OPTS = [
  { key: 'A', label: '0 to 4 weeks ago' },
  { key: 'B', label: '1 to 6 months ago' },
  { key: 'C', label: '6 months to 1 year ago' },
  { key: 'D', label: 'Over 1 year ago' },
]

const Q4_OPTS = [
  { key: 'A', label: 'Knowing what I need to change, but old routines are holding me back' },
  { key: 'B', label: 'Navigating emotional overwhelm and struggling to stay grounded' },
  { key: 'C', label: 'Feeling disconnected or alienated from the people in my life' },
  { key: 'D', label: 'Spending too much time in my head because it feels safer than my body' },
]

const Q5_OPTS = [
  { key: 'A', label: <><strong style={{ fontWeight: 600 }}>My Mind & Spirit</strong> — Struggling to process heavy emotions or make sense of my shifting worldview</> },
  { key: 'B', label: <><strong style={{ fontWeight: 600 }}>My Body & Lifestyle</strong> — Having a hard time breaking old habits or building daily routines that stick</> },
  { key: 'C', label: <><strong style={{ fontWeight: 600 }}>My Relationships</strong> — Feeling alienated from others or struggling to set new boundaries</> },
  { key: 'D', label: <><strong style={{ fontWeight: 600 }}>My Nature & Environment</strong> — Feeling called to unplug, change my surroundings, and live more intentionally</> },
]

const Q6_OPTS = [
  { key: 'A', label: 'I have great intentions, but honestly... I haven\'t built a real routine yet' },
  { key: 'B', label: 'I only do them reactively — usually just when I\'m already feeling overwhelmed or stressed' },
  { key: 'C', label: 'I do them in bursts, but I eventually lose momentum and fall completely off track' },
  { key: 'D', label: 'I am consistent with my practices, but I am looking to deepen my journey alongside others' },
]

const Q7_OPTS = [
  { key: 'A', label: 'I have a therapist, but no community of peers who have walked a similar path' },
  { key: 'B', label: 'I have friends and family who care, but they don\'t fully understand the depth of what I\'m navigating' },
  { key: 'C', label: 'I am navigating this entirely on my own, without a support network' },
  { key: 'D', label: 'I have pieced together a mix of resources, but my support feels scattered and disconnected' },
]

const Q8_OPTS = [
  { key: 'A', label: <><strong style={{ fontWeight: 600 }}>At my own pace:</strong> Just a few minutes a day to build simple, supported routines</> },
  { key: 'B', label: <><strong style={{ fontWeight: 600 }}>The community rhythm:</strong> About 1 hour a week for a live class, plus simple daily practices</> },
  { key: 'C', label: <><strong style={{ fontWeight: 600 }}>Going deep:</strong> About 2 hours a week to include the live class plus an intimate, facilitated small group where we actively share together</> },
]

const Q4_BREAK: Record<string, { heading: string; body: string; quote: string; attribution: string }> = {
  A: {
    heading: 'Willpower alone rarely wins against deeply ingrained routines.',
    body: "It's completely normal for your everyday environment to pull you right back into familiar ruts. Instead, combining a gentle, consistent structure with reliable support creates the ideal foundation to break through and stay on track.",
    quote: '"I feel like I\'m falling right back into my standard route as a result of not having [support]... It\'s almost as if I\'m trapped in a world that I don\'t want to live in, but I\'m in."',
    attribution: '— Damon, 52 · Plant Medicine Retreat',
  },
  B: {
    heading: 'When you go through a profound shift, feeling overwhelmed is completely natural.',
    body: "You don't need to fix everything at once. The most effective integration happens when you have a safe place to land, a guided rhythm and a supportive community to help you gently manage those emotions.",
    quote: '"I came back with a ton of anger... there\'s this sense of healing and this sense of anger that I don\'t have anywhere to put at all. It makes integration for me very clouded."',
    attribution: '— Damon, 52 · Plant Medicine Retreat',
  },
  C: {
    heading: "After a profound insight, it's incredibly common to feel like you're suddenly speaking a different language than the people in your life.",
    body: "When your old relationships no longer align with who you are becoming, that gap can leave you feeling deeply unseen. The most effective way to bridge that gap is finding a safe container of peers who actually get it, so you never have to translate, hide, or defend your journey.",
    quote: '"There are things in life that people just don\'t understand. You cannot explain this to people and you can talk to people about it to an extent, but they don\'t really get it."',
    attribution: '— Steve, 45 · Plant Medicine Retreat',
  },
  D: {
    heading: 'Mental insight is only half of the experience.',
    body: "It's common to try and make sense of profound experiences purely through thought, leaving the physical self behind. But while the mind understands the shift, a safe, guided rhythm with somatic-based practices can bridge the gap between your mind and body.",
    quote: '"My brain goes at a million miles an hour. It\'s just f****** going non-stop though. So, I really struggle with that being present... I\'m trying to shut out that external noise."',
    attribution: '— Steve, 45 · Plant Medicine Retreat',
  },
}

const Q7_BREAK: Record<string, { heading: string; body1: string; body2: React.ReactNode }> = {
  A: {
    heading: 'Professional help is a powerful starting point, but peer connection adds a completely new layer.',
    body1: 'Having a therapist is incredibly valuable, but it is not the same as being seen and heard by a community of people who are walking a similar path.',
    body2: <>You need a space to <strong>actually put that therapy into practice</strong> — a place where your experience is a shared reality.</>,
  },
  B: {
    heading: "Having friends who care is amazing, but it isn't their fault if they can't understand everything you're going through.",
    body1: "It can be exhausting to constantly explain, filter, or translate your inner shifts to people who haven't been in a similar mental space.",
    body2: <>The process of integration requires an emotionally safe space where you can <strong>share vulnerable, unfiltered thoughts</strong> with a community that immediately understands the depth of your journey.</>,
  },
  C: {
    heading: "You don't have to do this alone.",
    body1: "Navigating a profound shift by yourself can feel incredibly isolating, almost like you're speaking a language no one else understands.",
    body2: <>But there is a profound, immediate relief that happens the moment you share your experience and hear someone else say, <strong>"I know exactly how that feels."</strong> We're built to be that space for you.</>,
  },
  D: {
    heading: 'A dedicated community changes everything.',
    body1: "Sounds like you've laid a great foundation, but patching together scattered resources can quickly become exhausting. Craving a consistent, dedicated space to share and connect is completely natural right now.",
    body2: <>Stepping into a reliable community <strong>eases your emotional load</strong> and provides the exact foundation to anchor your growth to.</>,
  },
}

// Step shown in progress bar per screen index (null = no bar)
const SCREEN_STEP: Record<number, number | null> = {
  0: null, 1: null,
  2: 1, 3: 2, 4: 2, 5: 3, 6: 4,
  7: 5, 8: 6, 9: 7, 10: 7,
  11: 8,
  12: null, 13: null,
}

function getRecommendedPath(q8: string | null): 'pod' | 'foundation' {
  if (q8 === 'C') return 'pod'
  return 'foundation'
}

// ── Sub-components ────────────────────────────────────────────────────────────
function OptionCard({ label, optKey, selected, onSelect }: {
  label: React.ReactNode; optKey: string; selected: boolean; onSelect: () => void
}) {
  return (
    <button className={`qz-opt${selected ? ' selected' : ''}`} onClick={onSelect}>
      <div className="qz-radio">
        {selected && <div className="qz-radio-dot" />}
      </div>
      <span style={{ fontSize: '15px', color: P.text, lineHeight: 1.55, fontWeight: selected ? 500 : 400 }}>
        <span style={{ color: P.muted, marginRight: '0.5rem', fontSize: '13px', fontWeight: 400 }}>{optKey}.</span>
        {label}
      </span>
    </button>
  )
}

function QuestionHeader({ step, total = 8, question }: { step: number; total?: number; question: string }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <p style={{
        fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: P.muted, margin: '0 0 1.25rem',
      }}>
        Step {step} of {total}
      </p>
      <h2 style={{
        ...serif, margin: 0,
        fontSize: 'clamp(20px, 3vw, 26px)',
        fontWeight: 400, lineHeight: 1.2, color: P.text,
        letterSpacing: '-0.015em',
      }}>
        {question}
      </h2>
    </div>
  )
}

function BreakQuote({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <div style={{
      marginTop: '1.75rem',
      padding: '1.3rem 1.5rem 1.15rem',
      background: P.bgWarm,
      borderRadius: 14,
      border: `1px solid ${P.div}`,
    }}>
      <p style={{ ...serif, fontSize: '2rem', color: P.rust, lineHeight: 0.9, margin: '0 0 0.35rem', fontStyle: 'normal' }}>
        &ldquo;
      </p>
      <p style={{ ...serif, fontStyle: 'italic', fontSize: '0.9rem', color: P.text, lineHeight: 1.75, margin: '0 0 0.6rem', opacity: 0.88 }}>
        {quote}
      </p>
      <p style={{ fontSize: '11px', color: P.muted, margin: 0, letterSpacing: '0.08em' }}>
        {attribution}
      </p>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function QuizPage() {
  const [screen, setScreen] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [q1, setQ1] = useState<string | null>(null)
  const [q2, setQ2] = useState<string | null>(null)
  const [q3, setQ3] = useState<string | null>(null)
  const [q4, setQ4] = useState<string | null>(null)
  const [q5, setQ5] = useState<string | null>(null)
  const [q6, setQ6] = useState<string | null>(null)
  const [q7, setQ7] = useState<string | null>(null)
  const [q8, setQ8] = useState<string | null>(null)
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [src, setSrc] = useState('')

  // Traffic source (?src=reddit etc.) — read from the URL or from sessionStorage
  // if it was captured on the landing page; survives reloads mid-quiz
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('src')
    if (fromUrl) {
      setSrc(fromUrl)
      sessionStorage.setItem('somenta_src', fromUrl)
    } else {
      const stored = sessionStorage.getItem('somenta_src')
      if (stored) setSrc(stored)
    }
  }, [])

  const advance = () => setScreen(s => s + 1)

  // GA4 quiz funnel tracking
  const SCREEN_NAMES: Record<number, string> = {
    0: 'welcome', 1: 'name_transition',
    2: 'q3_how_long_ago', 3: 'q4_biggest_hurdle', 4: 'break1_empathy', 5: 'q5_disconnect_area',
    6: 'q1_capacity', 7: 'q2_somatic_state', 8: 'q6_current_routine',
    9: 'q7_support_system', 10: 'break2_support_checkin',
    11: 'q8_commitment_level',
    12: 'email_capture', 13: 'calculating',
  }
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gtag = (window as any).gtag
    if (typeof gtag === 'function') {
      gtag('event', 'quiz_step_view', {
        step_number: screen,
        step_name: SCREEN_NAMES[screen] ?? `screen_${screen}`,
      })
    }
  }, [screen])

  // Auto-advance: name transition (screen 1)
  useEffect(() => {
    if (screen === 1) {
      const t = setTimeout(advance, 1500)
      return () => clearTimeout(t)
    }
  }, [screen])

  // After calculating screen, redirect to pre-launch landing pad
  useEffect(() => {
    if (screen === 13) {
      const t = setTimeout(() => {
        router.push(`/landing-pad?name=${encodeURIComponent(name)}&q4=${q4 ?? 'A'}&q8=${q8 ?? 'B'}&email=${encodeURIComponent(email)}`)
      }, 1500)
      return () => clearTimeout(t)
    }
  }, [screen])

  // Submit quiz answers to API
  async function submitQuiz() {
    if (submitted) return
    setSubmitted(true)
    const path = getRecommendedPath(q8)
    try {
      await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, q1, q2, q3, q4, q5, q6, q7, q8, recommended_path: path, source: src || null }),
      })
    } catch {
      // fire and forget — don't block UI
    }
  }

  // When calculating screen appears, submit in background
  useEffect(() => {
    if (screen === 13) submitQuiz()
  }, [screen])

  function handleEmailSubmit() {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!valid) { setEmailError('Please enter a valid email address.'); return }
    setEmailError('')
    advance()
  }

  const step = SCREEN_STEP[screen]
  const progress = step ? (step / 8) * 100 : 0

  // ── Render ──────────────────────────────────────────────────────────────────
  const renderScreen = () => {
    switch (screen) {

      // ── Screen 0: Welcome ─────────────────────────────────────────────────
      case 0: return (
        <div className="qz-in" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{
              ...serif, margin: '0 0 1rem',
              fontSize: 'clamp(28px, 4vw, 38px)',
              fontWeight: 400, lineHeight: 1.15, color: P.text, letterSpacing: '-0.018em',
            }}>
              Welcome to Somenta.
            </h1>
            <p style={{ fontSize: '16px', color: bodyText, lineHeight: 1.75, margin: '0 0 2.5rem', maxWidth: '38ch', marginLeft: 'auto', marginRight: 'auto' }}>
              We are so glad you found your way here. What is your first name so we can help personalize your path?
            </p>
          </div>
          <div style={{ maxWidth: 360, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              className="qz-input"
              type="text"
              name="given-name"
              autoComplete="given-name"
              placeholder="Your first name"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && name.trim() && advance()}
              autoFocus
            />
            <button className="qz-btn" disabled={!name.trim()} onClick={advance}>
              Begin →
            </button>
          </div>
        </div>
      )

      // ── Screen 1: Name transition ─────────────────────────────────────────
      case 1: return (
        <div className="qz-in" style={{ textAlign: 'center' }}>
          <h2 style={{
            ...serif, margin: 0,
            fontSize: 'clamp(22px, 3.5vw, 32px)',
            fontWeight: 400, lineHeight: 1.3, color: P.text, letterSpacing: '-0.015em',
          }}>
            Nice to meet you, <em>{name}.</em><br />
            Let&rsquo;s map out your integration journey.
          </h2>
        </div>
      )

      // ── Screen 2: Q3 — Timeframe ─────────────────────────────────────────
      case 2: return (
        <div className="qz-in">
          <QuestionHeader step={1} question="How long ago was your retreat or transformative journey?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q3_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q3 === o.key} onSelect={() => setQ3(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q3} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 3: Q4 — Biggest hurdle ────────────────────────────────────
      case 3: return (
        <div className="qz-in">
          <QuestionHeader step={2} question="If you had to choose, what is the single biggest hurdle you're facing right now?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q4_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q4 === o.key} onSelect={() => setQ4(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q4} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 4: Dynamic Break 1 ─────────────────────────────────────────
      case 4: {
        const b = Q4_BREAK[q4 ?? 'A']
        return (
          <div className="qz-in">
            <h2 style={{
              ...serif, margin: '0 0 1rem',
              fontSize: 'clamp(20px, 2.8vw, 26px)',
              fontWeight: 400, lineHeight: 1.25, color: P.text, letterSpacing: '-0.015em',
            }}>
              {b.heading}
            </h2>
            <p style={{ fontSize: '15px', color: bodyText, lineHeight: 1.8, margin: '0 0 0.5rem' }}>
              {b.body}
            </p>
            <BreakQuote quote={b.quote} attribution={b.attribution} />
            <div style={{ marginTop: '2rem' }}>
              <button className="qz-btn" onClick={advance}>Continue →</button>
            </div>
          </div>
        )
      }

      // ── Screen 5: Q5 — Disconnect ─────────────────────────────────────────
      case 5: return (
        <div className="qz-in">
          <QuestionHeader step={3} question="Where do you feel the most disconnect right now?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q5_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q5 === o.key} onSelect={() => setQ5(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q5} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 6: Q1 — Capacity ──────────────────────────────────────────
      case 6: return (
        <div className="qz-in">
          <QuestionHeader step={4} question="If you had to describe the overall energy of the experience you are bringing back into your life, what does it feel like?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q1_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q1 === o.key} onSelect={() => setQ1(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q1} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 7: Q2 — Somatic state ─────────────────────────────────────
      case 7: return (
        <div className="qz-in">
          <QuestionHeader step={5} question="When you tune into your body right now, what physical sensations are most present for you in this integration period?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q2_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q2 === o.key} onSelect={() => setQ2(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q2} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 8: Q6 — Current routine ───────────────────────────────────
      case 8: return (
        <div className="qz-in">
          <QuestionHeader step={6} question="Which best describes your current routine with integration practices like journaling, breathwork, or meditation?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q6_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q6 === o.key} onSelect={() => setQ6(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q6} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 9: Q7 — Support system ────────────────────────────────────
      case 9: return (
        <div className="qz-in">
          <QuestionHeader step={7} question="What does your current support system look like?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q7_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q7 === o.key} onSelect={() => setQ7(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q7} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 10: Dynamic Break 2 ────────────────────────────────────────
      case 10: {
        const b = Q7_BREAK[q7 ?? 'A']
        return (
          <div className="qz-in">
            <h2 style={{
              ...serif, margin: '0 0 1rem',
              fontSize: 'clamp(20px, 2.8vw, 26px)',
              fontWeight: 400, lineHeight: 1.25, color: P.text, letterSpacing: '-0.015em',
            }}>
              {b.heading}
            </h2>
            <p style={{ fontSize: '15px', color: bodyText, lineHeight: 1.8, margin: '0 0 1rem' }}>
              {b.body1}
            </p>
            <p style={{ fontSize: '15px', color: bodyText, lineHeight: 1.8, margin: 0 }}>
              {b.body2}
            </p>
            <div style={{ marginTop: '2rem' }}>
              <button className="qz-btn" onClick={advance}>Continue →</button>
            </div>
          </div>
        )
      }

      // ── Screen 11: Q8 — Commitment level ─────────────────────────────────
      case 11: return (
        <div className="qz-in">
          <QuestionHeader step={8} question="What level of support and time commitment are you looking for right now?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q8_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q8 === o.key} onSelect={() => setQ8(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q8} onClick={advance}>See my path forward →</button>
        </div>
      )

      // ── Screen 12: Email capture ──────────────────────────────────────────
      case 12: return (
        <div className="qz-in" style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: P.rust, margin: '0 0 1.25rem',
          }}>
            Almost there, {name}.
          </p>
          <h2 style={{
            ...serif, margin: '0 0 0.75rem',
            fontSize: 'clamp(22px, 3.5vw, 30px)',
            fontWeight: 400, lineHeight: 1.2, color: P.text, letterSpacing: '-0.015em',
          }}>
            Let&rsquo;s save your integration profile.
          </h2>
          <p style={{ fontSize: '15px', color: bodyText, lineHeight: 1.75, margin: '0 0 2rem', maxWidth: '38ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Enter your email to secure your answers and view your recommended Somenta Pathway.
          </p>
          <form
            onSubmit={e => { e.preventDefault(); handleEmailSubmit() }}
            style={{ maxWidth: 360, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <input
              className="qz-input"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailError('') }}
              autoFocus
            />
            {emailError && (
              <p style={{ fontSize: '13px', color: P.rust, margin: 0, textAlign: 'left' }}>{emailError}</p>
            )}
            <button type="submit" className="qz-btn" disabled={!email.trim()}>
              View My Pathway →
            </button>
          </form>
        </div>
      )

      // ── Screen 13: Calculating ────────────────────────────────────────────
      case 13: return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(45,90,64,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={P.green} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 320, margin: '0 auto' }}>
            {[
              'Analyzing your integration profile...',
              'Reviewing your current support system...',
              'Building your Somenta Pathway...',
            ].map((line, i) => (
              <p key={i} className="qz-calc-line"
                style={{ ...serif, fontStyle: 'italic', fontSize: '16px', color: P.text, margin: 0, lineHeight: 1.4 }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      )

      default: return null
    }
  }

  return (
    <div className="qz-grain" style={{
      minHeight: '100vh', background: P.bg, color: P.text,
      fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px, 4vw, 48px)',
        background: 'rgba(247,243,236,0.92)',
        borderBottom: `1px solid ${P.div}`,
        backdropFilter: 'blur(12px)',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
          <Image src="/assets/logo-mark.png" alt="Somenta" width={24} height={24}
            style={{ objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(52%) sepia(48%) saturate(632%) hue-rotate(346deg) brightness(96%) contrast(92%)' }} />
          <span style={{ ...serif, fontSize: '17px', color: P.text, fontWeight: 400 }}>Somenta</span>
        </a>
        {step && (
          <span style={{ fontSize: '12px', color: P.muted, letterSpacing: '0.08em' }}>
            Step {step} of 8
          </span>
        )}
      </nav>

      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 64, left: 0, right: 0, height: 2, background: P.div, zIndex: 99 }}>
        <div className="qz-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* Screen content */}
      <main style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px clamp(20px, 4vw, 48px)',
      }}>
        <div key={screen} style={{ width: '100%', maxWidth: 560 }}>
          {renderScreen()}
        </div>
      </main>
    </div>
  )
}
