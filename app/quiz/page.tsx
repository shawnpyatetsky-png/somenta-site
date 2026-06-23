'use client'

import React, { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'

// ── Palette (matches landing page) ────────────────────────────────────────────
const P = {
  bg:     '#F7F3EC',
  bgWarm: '#F0E9DC',
  bgDark: '#1A1108',
  text:   '#281B0D',
  light:  '#FDFBF6',
  muted:  '#6B5A47',
  accent: '#C87840',
  rust:   '#B85030',
  div:    '#E0D3BF',
}

const serif: CSSProperties  = { fontFamily: 'var(--font-fraunces), Georgia, serif' }
const bodyText = 'rgba(40,27,13,0.72)'

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
  .qz-opt:hover{border-color:rgba(184,80,48,0.35);background:#FAF6F0;box-shadow:0 2px 12px rgba(40,27,13,0.06)}
  .qz-opt.selected{border-color:${P.rust};background:rgba(184,80,48,0.05);box-shadow:0 0 0 1px ${P.rust}}

  .qz-radio{
    width:18px;height:18px;border-radius:50%;flex-shrink:0;margin-top:1px;
    border:1.5px solid ${P.div};background:${P.light};
    display:flex;align-items:center;justify-content:center;
    transition:border-color .18s,background .18s;
  }
  .qz-opt.selected .qz-radio{border-color:${P.rust};background:${P.rust}}
  .qz-radio-dot{width:7px;height:7px;border-radius:50%;background:${P.light}}

  .qz-btn{
    background:${P.accent};color:${P.light};border:none;border-radius:100px;
    padding:16px 36px;font-size:15px;font-weight:600;cursor:pointer;
    letter-spacing:.01em;transition:background .2s,transform .18s,box-shadow .2s;
    font-family:var(--font-inter),-apple-system,sans-serif;
  }
  .qz-btn:hover:not(:disabled){background:#B06A30;transform:translateY(-2px);box-shadow:0 6px 22px rgba(200,120,64,.28)}
  .qz-btn:disabled{opacity:.38;cursor:not-allowed;transform:none;box-shadow:none}

  .qz-btn-ghost{
    background:none;border:1.5px solid ${P.div};color:${P.text};border-radius:100px;
    padding:16px 36px;font-size:15px;font-weight:600;cursor:pointer;
    letter-spacing:.01em;transition:border-color .2s,background .2s;
    font-family:var(--font-inter),-apple-system,sans-serif;
  }
  .qz-btn-ghost:hover{border-color:${P.text};background:rgba(40,27,13,.04)}

  .qz-input{
    width:100%;padding:14px 18px;border-radius:10px;
    border:1.5px solid ${P.div};background:${P.light};
    font-size:16px;color:${P.text};outline:none;
    font-family:var(--font-inter),-apple-system,sans-serif;
    transition:border-color .2s,box-shadow .2s;box-sizing:border-box;
  }
  .qz-input:focus{border-color:${P.rust};box-shadow:0 0 0 3px rgba(184,80,48,.1)}
  .qz-input::placeholder{color:rgba(107,90,71,.45)}

  .qz-progress-bar{height:2px;background:${P.rust};transition:width .5s cubic-bezier(.16,1,.3,1)}

  @keyframes qz-line-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .qz-calc-line{opacity:0;animation:qz-line-in .5s cubic-bezier(.16,1,.3,1) forwards}
  .qz-calc-line:nth-child(1){animation-delay:.15s}
  .qz-calc-line:nth-child(2){animation-delay:.5s}
  .qz-calc-line:nth-child(3){animation-delay:.85s}

  .qz-plan{border:2px solid ${P.div};border-radius:20px;overflow:hidden;background:${P.light}}

  .qz-feat-row{display:flex;align-items:flex-start;gap:.75rem;padding:.55rem 0}

  .qz-community-btn{
    display:flex;align-items:center;justify-content:space-between;gap:.5rem;
    width:100%;background:none;border:none;cursor:pointer;padding:.65rem 0;
    font-family:var(--font-inter),-apple-system,sans-serif;
    transition:opacity .2s;
  }
  .qz-community-btn:hover{opacity:.75}

  .qz-toggle-link{
    background:none;border:none;cursor:pointer;padding:0;
    color:${P.muted};font-size:13px;text-decoration:underline;
    text-underline-offset:3px;text-decoration-color:${P.div};
    font-family:var(--font-inter),-apple-system,sans-serif;
    transition:color .2s;
  }
  .qz-toggle-link:hover{color:${P.rust}}

  @media(max-width:640px){
    .qz-pricing-inner{padding:1.75rem 1.25rem!important}
  }
`

// ── Quiz data ─────────────────────────────────────────────────────────────────
const Q1_OPTS = [
  { key: 'A', label: 'Plant medicine or transformative journey' },
  { key: 'B', label: 'Breathwork or somatic intensive' },
  { key: 'C', label: 'Silent retreat or intensive meditation' },
  { key: 'D', label: 'Other profound experiential therapy' },
]

const Q2_OPTS = [
  { key: 'A', label: '0 to 4 weeks ago' },
  { key: 'B', label: '1 to 6 months ago' },
  { key: 'C', label: '6 months to 1 year ago' },
  { key: 'D', label: 'Over 1 year ago' },
]

const Q3_OPTS = [
  { key: 'A', label: 'Knowing what I need to change, but old routines are holding me back.' },
  { key: 'B', label: 'Navigating emotional overwhelm and struggling to stay grounded.' },
  { key: 'C', label: 'Feeling disconnected or alienated from the people in my life.' },
  { key: 'D', label: 'Spending too much time in my head because it feels safer than my body.' },
]

const Q4_OPTS = [
  { key: 'A', label: <><strong style={{ fontWeight: 600 }}>My Mind & Spirit</strong> — Struggling to process heavy emotions or make sense of my shifting worldview.</> },
  { key: 'B', label: <><strong style={{ fontWeight: 600 }}>My Body & Lifestyle</strong> — Having a hard time breaking old habits or building daily routines that stick.</> },
  { key: 'C', label: <><strong style={{ fontWeight: 600 }}>My Relationships</strong> — Feeling alienated from others or struggling to set new boundaries.</> },
  { key: 'D', label: <><strong style={{ fontWeight: 600 }}>My Nature & Environment</strong> — Feeling called to unplug, change my surroundings, and live more intentionally.</> },
]

const Q5_OPTS = [
  { key: 'A', label: 'I have great intentions, but honestly... I haven\'t built a real routine yet.' },
  { key: 'B', label: 'I only do them reactively — usually just when I\'m already feeling overwhelmed or stressed.' },
  { key: 'C', label: 'I do them in bursts, but I eventually lose momentum and fall completely off track.' },
  { key: 'D', label: 'I am consistent with my practices, but I am looking to deepen my journey alongside others.' },
]

const Q6_OPTS = [
  { key: 'A', label: 'I have a therapist, but no community of peers who have walked a similar path.' },
  { key: 'B', label: 'I have friends and family who care, but they don\'t fully understand the depth of what I\'m navigating.' },
  { key: 'C', label: 'I am navigating this entirely on my own, without a support network.' },
  { key: 'D', label: 'I have pieced together a mix of resources, but my support feels scattered and disconnected.' },
]

const Q7_OPTS = [
  { key: 'A', label: 'Just a few minutes a day to build simple, supported routines.' },
  { key: 'B', label: 'About an hour a week for a live class, plus simple daily practices.' },
  { key: 'C', label: 'I have the space and desire to dive deep into multiple hours of practices, journaling, and live community circles.' },
]

const Q8_OPTS = [
  { key: 'A', label: 'I want to go deeper. An intimate, facilitated small group where we actively share and navigate our experiences together.' },
  { key: 'B', label: 'I want community at my own pace. The supportive rhythm of the broader community, but I prefer to absorb and reflect on my own.' },
]

const Q3_BREAK: Record<string, { heading: string; body: string; quote: string; attribution: string }> = {
  A: {
    heading: 'Willpower alone rarely wins against deeply ingrained routines.',
    body: "It's completely normal for your everyday environment to pull you right back into familiar ruts. Instead, combining a gentle, consistent structure with reliable support creates the ideal foundation to break through and stay on track.",
    quote: '"I feel like I\'m falling right back into my standard route as a result of not having [support]... It\'s almost as if I\'m trapped in a world that I don\'t want to live in, but I\'m in."',
    attribution: '— Damon, 52 · Ayahuasca Retreat',
  },
  B: {
    heading: 'When you go through a profound shift, feeling overwhelmed is completely natural.',
    body: "You don't need to fix everything at once. The most effective integration happens when you have a safe place to land, a guided rhythm and a supportive community to help you gently manage those emotions.",
    quote: '"I came back with a ton of anger... there\'s this sense of healing and this sense of anger that I don\'t have anywhere to put at all. It makes integration for me very clouded."',
    attribution: '— Damon, 52 · Ayahuasca Retreat',
  },
  C: {
    heading: "After a profound insight, it's incredibly common to feel like you're suddenly speaking a different language than the people in your life.",
    body: "When your old relationships no longer align with who you are becoming, that gap can leave you feeling deeply unseen. The most effective way to bridge that gap is finding a safe container of peers who actually get it, so you never have to translate, hide, or defend your journey.",
    quote: '"There are things in life that people just don\'t understand. You cannot explain this to people and you can talk to people about it to an extent, but they don\'t really get it."',
    attribution: '— Steve, 45 · Ayahuasca Retreat',
  },
  D: {
    heading: 'Mental insight is only half of the experience.',
    body: "It's common to try and make sense of profound experiences purely through thought, leaving the physical self behind. But while the mind understands the shift, a safe, guided rhythm with somatic-based practices can bridge the gap between your mind and body.",
    quote: '"My brain goes at a million miles an hour. It\'s just f****** going non-stop though. So, I really struggle with that being present... I\'m trying to shut out that external noise."',
    attribution: '— Steve, 45 · Ayahuasca Retreat',
  },
}

const Q6_BREAK: Record<string, { heading: string; body: string }> = {
  A: {
    heading: 'Professional help is a powerful starting point, but peer connection adds a completely new layer.',
    body: 'Having a therapist is incredibly valuable, but it is not the same as being seen and heard by a community of people who are walking a similar path. You need a space to actually put that therapy into practice — a place where your experience is a shared reality.',
  },
  B: {
    heading: "Having friends who care is amazing, but it isn't their fault if they can't understand everything you're going through.",
    body: "It can be exhausting to constantly explain, filter, or translate your inner shifts to people who haven't been in a similar mental space. The process of integration requires an emotionally safe space where you can share vulnerable, unfiltered thoughts with a community that immediately understands the depth of your journey.",
  },
  C: {
    heading: "You don't have to do this alone.",
    body: "Navigating a profound shift by yourself can feel incredibly isolating, almost like you're speaking a language no one else understands. But there is a profound, immediate relief that happens the moment you share your experience and hear someone else say, \"I know exactly how that feels.\" We're built to be that space for you.",
  },
  D: {
    heading: 'A dedicated community changes everything.',
    body: "Sounds like you've laid a great foundation, but patching together scattered resources can quickly become exhausting. Craving a consistent, dedicated space to share and connect is completely natural at this stage of your journey. Stepping into a reliable community eases your emotional load and provides the exact foundation to anchor your growth to.",
  },
}

const Q3_EMPATHY_VAR: Record<string, string> = {
  A: 'Breaking old routines is incredibly hard, even when you know what needs to change.',
  B: 'Staying grounded and navigating intense emotions can be exhausting.',
  C: 'Feeling disconnected from the people in your life is a heavy burden to carry.',
  D: "Retreating into your head when your body doesn't feel safe makes complete sense.",
}

const Q3_TESTIMONIAL: Record<string, { quote: string; attribution: string }> = {
  A: {
    quote: '"My habits have gotten better, especially when it comes to getting my daily work done and staying off of social media... It\'s a group to help keep you on track and support you as you move through your life."',
    attribution: 'Cam, 32 · Ayahuasca Retreat',
  },
  B: {
    quote: '"Week one and two, people are going through stuff. But then everything got lighter and lighter. That\'s what I saw with every call. People were just happier, more comfortable with the group."',
    attribution: 'Coach Kevin',
  },
  C: {
    quote: '"When people start to be in this environment and other people are being really vulnerable with their shares, it gives them permission to share... and trust the people in the space to feel safe enough to share some real s*** that\'s going on."',
    attribution: 'Coach Brittany',
  },
  D: {
    quote: '"It is an active group with great leaders and coaches, and good interactive workshops that really help ground and bring yourself into your body and the present."',
    attribution: 'Evan, 28 · Ayahuasca Retreat',
  },
}

// Step shown in progress bar per screen index (null = no bar)
const SCREEN_STEP: Record<number, number | null> = {
  0: null, 1: null,
  2: 1, 3: 2, 4: 3, 5: 3,
  6: 4, 7: 5, 8: 6, 9: 6,
  10: 7, 11: 8,
  12: null, 13: null, 14: null,
}

function getRecommendedPath(q7: string | null, q8: string | null): 'pod' | 'foundation' {
  if (q8 === 'B') return 'foundation'
  if (q8 === 'A' && q7 === 'A') return 'foundation'
  if (q8 === 'A' && (q7 === 'B' || q7 === 'C')) return 'pod'
  return 'foundation'
}

// ── Sub-components ────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="7.5" fill="rgba(184,80,48,0.12)" stroke="none" />
      <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke={P.rust} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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
      padding: '1.25rem 1.5rem',
      background: P.bgWarm,
      borderRadius: 12,
      borderLeft: `3px solid ${P.rust}`,
    }}>
      <p style={{ ...serif, fontStyle: 'italic', fontSize: '0.9rem', color: P.text, lineHeight: 1.75, margin: '0 0 0.6rem', opacity: 0.88 }}>
        {quote}
      </p>
      <p style={{ fontSize: '11px', color: P.muted, margin: 0, letterSpacing: '0.08em' }}>
        {attribution}
      </p>
    </div>
  )
}

function CommunityDropdown({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div style={{ marginTop: '0.25rem' }}>
      <button className="qz-community-btn" onClick={onToggle}>
        <span style={{ fontSize: '13.5px', color: P.rust, fontWeight: 500 }}>
          + Full access to the Somenta Community
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.rust} strokeWidth="1.5" strokeLinecap="round"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="qz-fade" style={{ paddingBottom: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          {[
            'The Daily Drop. 5-minute async guided audio and journaling prompts to anchor your practice.',
            'The Practice Room. Silent live journaling space for quiet, shared accountability.',
            'Connection Events. Capped gatherings with small breakout rooms to form real relationships.',
          ].map((f, i) => (
            <div key={i} className="qz-feat-row" style={{ paddingLeft: '0.5rem' }}>
              <CheckIcon />
              <span style={{ fontSize: '14px', color: bodyText, lineHeight: 1.6 }}>
                <strong style={{ fontWeight: 600, color: P.text }}>{f.split('.')[0]}.</strong>
                {f.slice(f.indexOf('.') + 1)}
              </span>
            </div>
          ))}
        </div>
      )}
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
  const [activePlan, setActivePlan] = useState<'pod' | 'foundation'>('foundation')
  const [communityOpen, setCommunityOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const advance = () => setScreen(s => s + 1)

  // GA4 quiz funnel tracking
  const SCREEN_NAMES: Record<number, string> = {
    0: 'welcome', 1: 'name_transition',
    2: 'q1_retreat_type', 3: 'q2_how_long_ago', 4: 'q3_biggest_hurdle',
    5: 'break1_empathy', 6: 'q4_disconnect_area', 7: 'q5_current_routine',
    8: 'q6_support_system', 9: 'break2_support_checkin',
    10: 'q7_time_available', 11: 'q8_journey_preference',
    12: 'email_capture', 13: 'calculating', 14: 'pricing',
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

  // Auto-advance: name transition (screen 1) and calculating (screen 13)
  useEffect(() => {
    if (screen === 1 || screen === 13) {
      const t = setTimeout(advance, 1500)
      return () => clearTimeout(t)
    }
  }, [screen])


  // When we reach pricing, set the recommended plan
  useEffect(() => {
    if (screen === 14) {
      const path = getRecommendedPath(q7, q8)
      setActivePlan(path)
      setCommunityOpen(false)
    }
  }, [screen])

  // Submit quiz answers to API
  async function submitQuiz() {
    if (submitted) return
    setSubmitted(true)
    const path = getRecommendedPath(q7, q8)
    try {
      await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, q1, q2, q3, q4, q5, q6, q7, q8, recommended_path: path }),
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
  const isSafetyFilter = q8 === 'A' && q7 === 'A'

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

      // ── Screen 2: Q1 ─────────────────────────────────────────────────────
      case 2: return (
        <div className="qz-in">
          <QuestionHeader step={1} question="What type of retreat are you currently integrating?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q1_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q1 === o.key} onSelect={() => setQ1(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q1} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 3: Q2 ─────────────────────────────────────────────────────
      case 3: return (
        <div className="qz-in">
          <QuestionHeader step={2} question="How long ago was your transformative experience?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q2_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q2 === o.key} onSelect={() => setQ2(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q2} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 4: Q3 ─────────────────────────────────────────────────────
      case 4: return (
        <div className="qz-in">
          <QuestionHeader step={3} question="If you had to choose, what is the single biggest hurdle you're facing right now?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q3_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q3 === o.key} onSelect={() => setQ3(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q3} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 5: Dynamic Break 1 ─────────────────────────────────────────
      case 5: {
        const b = Q3_BREAK[q3 ?? 'A']
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

      // ── Screen 6: Q4 ─────────────────────────────────────────────────────
      case 6: return (
        <div className="qz-in">
          <QuestionHeader step={4} question="Where do you feel the most disconnect right now?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q4_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q4 === o.key} onSelect={() => setQ4(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q4} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 7: Q5 ─────────────────────────────────────────────────────
      case 7: return (
        <div className="qz-in">
          <QuestionHeader step={5} question="Which best describes your current routine with integration practices like journaling, breathwork, or meditation?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q5_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q5 === o.key} onSelect={() => setQ5(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q5} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 8: Q6 ─────────────────────────────────────────────────────
      case 8: return (
        <div className="qz-in">
          <QuestionHeader step={6} question="What does your current support system look like?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q6_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q6 === o.key} onSelect={() => setQ6(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q6} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 9: Dynamic Break 2 ─────────────────────────────────────────
      case 9: {
        const b = Q6_BREAK[q6 ?? 'A']
        return (
          <div className="qz-in">
            <h2 style={{
              ...serif, margin: '0 0 1rem',
              fontSize: 'clamp(20px, 2.8vw, 26px)',
              fontWeight: 400, lineHeight: 1.25, color: P.text, letterSpacing: '-0.015em',
            }}>
              {b.heading}
            </h2>
            <p style={{ fontSize: '15px', color: bodyText, lineHeight: 1.8, margin: 0 }}>
              {b.body}
            </p>
            <div style={{ marginTop: '2rem' }}>
              <button className="qz-btn" onClick={advance}>Continue →</button>
            </div>
          </div>
        )
      }

      // ── Screen 10: Q7 ────────────────────────────────────────────────────
      case 10: return (
        <div className="qz-in">
          <QuestionHeader step={7} question="How much time can you realistically dedicate to your practice each week?" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {Q7_OPTS.map(o => (
              <OptionCard key={o.key} optKey={o.key} label={o.label} selected={q7 === o.key} onSelect={() => setQ7(o.key)} />
            ))}
          </div>
          <button className="qz-btn" disabled={!q7} onClick={advance}>Continue →</button>
        </div>
      )

      // ── Screen 11: Q8 ────────────────────────────────────────────────────
      case 11: return (
        <div className="qz-in">
          <QuestionHeader step={8} question="How do you prefer to journey?" />
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
              background: 'rgba(184,80,48,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={P.rust} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
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

      // ── Screen 14: Pricing ────────────────────────────────────────────────
      case 14: {
        const testimonial = Q3_TESTIMONIAL[q3 ?? 'A']
        const isPod = activePlan === 'pod'
        const isSafety = isSafetyFilter && activePlan === 'foundation'

        const headingBody = isSafety
          ? `Because you mentioned you only have a few minutes a day right now, Foundation is the perfect place to start your journey and gently build your capacity.`
          : `${Q3_EMPATHY_VAR[q3 ?? 'A']} That is exactly why we built Somenta. Based on your answers, here is your recommended pathway.`

        return (
          <div className="qz-in" style={{ maxWidth: 600, margin: '0 auto' }}>
            {/* Heading */}
            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
              <h1 style={{
                ...serif, margin: '0 0 1rem',
                fontSize: 'clamp(22px, 3.5vw, 30px)',
                fontWeight: 400, lineHeight: 1.2, color: P.text, letterSpacing: '-0.015em',
              }}>
                Welcome, <em>{name}.</em> You&rsquo;ve found a safe place to land.
              </h1>
              <p style={{ fontSize: '15px', color: bodyText, lineHeight: 1.8, margin: 0, maxWidth: '52ch', marginLeft: 'auto', marginRight: 'auto' }}>
                {headingBody}
              </p>
            </div>

            {/* Plan card */}
            <div className="qz-plan">
              {/* Card header */}
              <div style={{
                padding: '2rem 2rem 1.5rem',
                borderBottom: `1px solid ${P.div}`,
                background: isPod ? P.bgDark : P.bgWarm,
              }}>
                {isPod && (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    background: 'rgba(200,120,64,0.2)', borderRadius: 100,
                    padding: '3px 10px', marginBottom: '0.75rem',
                  }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: P.accent }}>
                      ★ Recommended for you
                    </span>
                  </div>
                )}
                <h2 style={{
                  ...serif, margin: '0 0 0.35rem',
                  fontSize: 'clamp(24px, 3vw, 30px)',
                  fontWeight: 400, color: isPod ? P.light : P.text,
                  lineHeight: 1.1, letterSpacing: '-0.015em',
                }}>
                  {isPod ? 'The Intimate Peer Pod' : 'Foundation'}
                </h2>
                <p style={{ fontSize: '14px', color: isPod ? 'rgba(253,251,246,0.7)' : bodyText, margin: '0 0 1.25rem', lineHeight: 1.6 }}>
                  {isPod
                    ? 'Go deeper with facilitated processing in the same trusted group — every session, the same faces.'
                    : 'Live classes, guided focus, and community — a gentle rhythm to keep you grounded.'}
                </p>
                <div style={{
                  display: 'inline-block',
                  background: isPod ? 'rgba(200,120,64,0.15)' : 'rgba(184,80,48,0.08)',
                  borderRadius: 10, padding: '0.85rem 1.25rem',
                }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: isPod ? P.accent : P.rust, margin: '0 0 0.3rem' }}>
                    Founding Member Invitation
                  </p>
                  <p style={{ margin: 0 }}>
                    <span style={{ ...serif, fontSize: '2rem', fontWeight: 400, color: isPod ? P.light : P.text, letterSpacing: '-0.02em' }}>
                      {isPod ? '$40' : '$10'}
                    </span>
                    <span style={{ fontSize: '14px', color: isPod ? 'rgba(253,251,246,0.6)' : P.muted, marginLeft: '0.35rem' }}>
                      / month for your first 3 months
                    </span>
                  </p>
                  <p style={{ fontSize: '13px', color: isPod ? 'rgba(253,251,246,0.5)' : P.muted, margin: '0.2rem 0 0' }}>
                    then {isPod ? '$75' : '$25'} / month — cancel or pause any time
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="qz-pricing-inner" style={{ padding: '1.75rem 2rem' }}>
                {isPod ? (
                  <>
                    {[
                      { title: 'Integration Circles.', body: 'Intimate 12-week facilitated share pods with the exact same trusted people to process what is surfacing.' },
                      { title: 'Live Regulation.', body: 'Full access to weekly expert-led Guided Classes (breathwork & meditation) and Guest Sessions.' },
                    ].map((f, i) => (
                      <div key={i} className="qz-feat-row">
                        <CheckIcon />
                        <span style={{ fontSize: '14px', color: bodyText, lineHeight: 1.65 }}>
                          <strong style={{ fontWeight: 600, color: P.text }}>{f.title}</strong>{' '}{f.body}
                        </span>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      { title: 'Live Regulation.', body: 'Weekly Guided Classes to recalibrate your nervous system, plus fresh perspectives from expert Guest Sessions.' },
                      { title: 'Daily Grounding.', body: 'The Daily Drop (5 minutes of guided somatic audio and journaling) and access to The Practice Room.' },
                    ].map((f, i) => (
                      <div key={i} className="qz-feat-row">
                        <CheckIcon />
                        <span style={{ fontSize: '14px', color: bodyText, lineHeight: 1.65 }}>
                          <strong style={{ fontWeight: 600, color: P.text }}>{f.title}</strong>{' '}{f.body}
                        </span>
                      </div>
                    ))}
                  </>
                )}

                <CommunityDropdown open={communityOpen} onToggle={() => setCommunityOpen(o => !o)} />

                {/* Divider */}
                <div style={{ height: 1, background: P.div, margin: '1.5rem 0' }} />

                {/* Testimonial */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: P.muted, margin: '0 0 0.85rem' }}>
                    What members like you are saying
                  </p>
                  <p style={{ ...serif, fontStyle: 'italic', fontSize: '14px', color: P.text, lineHeight: 1.75, margin: '0 0 0.55rem', opacity: 0.88 }}>
                    {testimonial.quote}
                  </p>
                  <p style={{ fontSize: '11px', color: P.muted, margin: 0, letterSpacing: '0.06em' }}>
                    — {testimonial.attribution}
                  </p>
                </div>

                {/* CTA */}
                {isPod ? (
                  <a
                    href="https://calendly.com/jake-joinsomenta/30min"
                    target="_blank" rel="noopener noreferrer"
                    style={{ textDecoration: 'none', display: 'block' }}
                    onClick={() => fetch('/api/quiz/conversion', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, cta: 'pod_call' }),
                    })}
                  >
                    <button className="qz-btn" style={{ width: '100%', textAlign: 'center' }}>
                      Book Your Fit Call with Jake →
                    </button>
                  </a>
                ) : (
                  <a
                    href="https://community.joinsomenta.com/checkout/foundation-membership?coupon_code=FOUNDATION"
                    target="_blank" rel="noopener noreferrer"
                    style={{ textDecoration: 'none', display: 'block' }}
                    onClick={() => fetch('/api/quiz/conversion', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, cta: 'foundation_join' }),
                    })}
                  >
                    <button className="qz-btn" style={{ width: '100%', textAlign: 'center' }}>
                      Join Foundation Now →
                    </button>
                  </a>
                )}

                <p style={{ fontSize: '12px', color: P.muted, textAlign: 'center', margin: '0.75rem 0 1rem' }}>
                  Cancel or pause your membership at any time
                </p>

                {/* Toggle */}
                <div style={{ textAlign: 'center' }}>
                  {isPod ? (
                    <button className="qz-toggle-link" onClick={() => { setActivePlan('foundation'); setCommunityOpen(false) }}>
                      Looking for a lighter commitment? Explore the Foundation tier.
                    </button>
                  ) : (
                    <button className="qz-toggle-link" onClick={() => { setActivePlan('pod'); setCommunityOpen(false) }}>
                      Actually, I want the core experience. Take me back to The Pod.
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      }

      default: return null
    }
  }

  return (
    <div style={{
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
        display: 'flex', alignItems: screen === 14 ? 'flex-start' : 'center', justifyContent: 'center',
        padding: screen === 14 ? '100px clamp(20px, 4vw, 48px) 80px' : '80px clamp(20px, 4vw, 48px)',
      }}>
        <div key={screen} style={{ width: '100%', maxWidth: screen === 14 ? 600 : 560 }}>
          {renderScreen()}
        </div>
      </main>
    </div>
  )
}
