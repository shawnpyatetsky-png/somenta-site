'use client'

import { useState, useEffect, useRef, Fragment } from 'react'
import ExitPopup from './components/ExitPopup'
import type { ReactNode, CSSProperties } from 'react'
import Image from 'next/image'
import { P, serif, bodyText, photoGrade } from '@/lib/theme'
import heroImg from '@/public/assets/pexels-natalka-17844889.jpg'

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  .nf{opacity:0;transform:translateY(24px);transition:opacity .95s cubic-bezier(.16,1,.3,1),transform .95s cubic-bezier(.16,1,.3,1)}
  .nf[data-v]{opacity:1;transform:none}
  .nf[data-d="1"]{transition-delay:.12s}
  .nf[data-d="2"]{transition-delay:.24s}
  .nf[data-d="3"]{transition-delay:.36s}
  .nf[data-d="4"]{transition-delay:.48s}
  .nf[data-d="5"]{transition-delay:.60s}
  .nf[data-d="6"]{transition-delay:.72s}

  /* Keyboard focus — palette ring, invisible to mouse users */
  button:focus-visible,a:focus-visible{outline:2px solid rgba(184,80,48,.65);outline-offset:3px}

  /* Paper grain — barely-there warm noise so light sections read as material, not flat fill */
  .np-grain{position:relative}
  .np-grain::after{content:'';position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.11 0 0 0 0 0.05 0 0 0 0.05 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");background-size:240px 240px}

  /* Buttons */
  .np-btn-accent{transition:background .2s,transform .18s,box-shadow .2s}
  .np-btn-accent:hover{background:#B06A30!important;transform:translateY(-2px);box-shadow:0 6px 22px rgba(200,120,64,.28)!important}
  .np-btn-outline{transition:background .2s,color .2s,border-color .2s}
  .np-btn-outline:hover{background:#C87840!important;color:#FDFBF6!important}
  .np-btn-light{transition:background .2s,transform .18s}
  .np-btn-light:hover{background:#EDE5D8!important;transform:translateY(-1px)}

  /* Nav links */
  .np-nav-link{transition:color .2s;position:relative;padding-bottom:3px}
  .np-nav-link::after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:#B85030;transform:scaleX(0);transform-origin:center;transition:transform 280ms cubic-bezier(0.22,1,0.36,1)}
  .np-nav-link:hover{color:#281B0D!important}
  .np-nav-link:hover::after{transform:scaleX(1)}

  /* Who cards */
  .np-who-card{transition:background .22s}
  .np-who-card:hover{background:rgba(184,80,48,.06)!important}
  .np-who-card h3{transition:color .2s}
  .np-who-card:hover h3{color:#B85030!important}

  /* Feature items */
  .np-feat-item{transition:background .2s}
  .np-feat-item:hover{background:rgba(184,80,48,.05)!important}
  .np-feat-icon{transition:color .22s}
  .np-feat-item:hover .np-feat-icon{color:#B85030!important}
  /* Pillar accordion */
  .np-pillar-btn{background:none;border:none;width:100%;text-align:left;cursor:pointer;transition:background .2s}
  .np-pillar-btn:hover{background:rgba(184,80,48,.03)!important}

  /* Changes selector */
  .np-selector-btn{background:none;border:none;cursor:pointer;width:100%;text-align:left;padding:0;transition:opacity .2s}
  .np-selector-btn:hover{opacity:.8}
  .np-inline-quote{display:none}

  /* Schedule image shimmer */
  @keyframes np-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
  .np-sched-img{background:linear-gradient(90deg,#E8E0D0 25%,#EDE5D8 50%,#E8E0D0 75%);background-size:200% 100%;animation:np-shimmer 1.4s ease-in-out infinite}

  /* How steps */
  .np-step{transition:background .2s}
  .np-step:hover{background:rgba(184,80,48,.04)!important}
  .np-step-num{transition:color .25s}
  .np-step:hover .np-step-num{color:#B85030!important}

  /* Schedule week calendar */
  @keyframes np-live-pulse{0%,100%{opacity:1}50%{opacity:.3}}
  .np-live-dot{animation:np-live-pulse 2.2s ease-in-out infinite}
  @keyframes np-day-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .np-day-in{animation:np-day-in .42s cubic-bezier(.16,1,.3,1) forwards}
  .np-week-day{transition:background .2s,box-shadow .28s,transform .28s cubic-bezier(.16,1,.3,1),border-color .2s;cursor:pointer;border:none;box-sizing:border-box;flex:1 1 0;min-width:0;height:120px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:16px 4px}
  .np-week-day:not(.np-week-day-active):hover{transform:translateY(-1px)}
  .np-week-day:not(.np-week-day-active):hover{background:rgba(184,80,48,0.05)!important}

  @media(max-width:860px){
    /* Nav — flex on mobile so CTA sits at far right */
    .np-nav-links{display:none!important}
    .np-nav-cta{padding:10px 16px!important;font-size:13px!important}
    .np-nav-inner{display:flex!important;justify-content:space-between!important;align-items:center!important;grid-template-columns:unset!important;gap:0!important}

    /* Hero */
    .np-hero-text{padding:100px 1.5rem 2rem!important}
    .np-hero-stage{height:auto!important;min-height:80vh!important}
    /* Denser, full-width fog on small screens — the desktop pocket is too narrow for phones */
    .np-hero-fog{background:radial-gradient(ellipse 130% 36% at 50% 48%, rgba(247,243,236,0.94) 0%, rgba(247,243,236,0.62) 58%, transparent 82%), linear-gradient(180deg, rgba(247,243,236,0.96) 0%, rgba(247,243,236,0.88) 20%, rgba(247,243,236,0.64) 42%, rgba(247,243,236,0.3) 58%, transparent 72%)!important}
    .np-hero-quotes{grid-template-columns:1fr!important;gap:1.5rem 0!important}
    .np-hero-qdiv{display:none!important}
    .np-hero-q-extra{display:none!important}

    /* Changes — bring up bottom quote */
    .np-changes-bottom{margin-top:2rem!important}

    /* Who */
    .np-who-grid{grid-template-columns:1fr!important;gap:2.5rem!important}
    .np-who-photo{aspect-ratio:3/2!important;max-height:340px}

    /* Practice */
    .np-practice-grid{grid-template-columns:1fr!important;gap:2rem!important}
    .np-practice-sticky{position:static!important;top:auto!important}
    .np-practice-right{padding-top:1.5rem!important}
    .np-feat-cards{grid-template-columns:1fr!important}

    /* Schedule */
    .np-sched-two-col{grid-template-columns:1fr!important}
    .np-sched-photo{display:none!important}
    .np-day-photo-m{display:block!important}
    .np-sched-content{height:auto!important;min-height:480px!important;overflow:hidden!important}

    /* Changes — accordion mode on mobile */
    .np-inline-quote{display:block!important}
    .np-changes-grid{grid-template-columns:1fr!important;gap:0!important}
    .np-changes-quote{display:none!important}
    .np-changes-selector{flex-direction:column!important}
    .np-changes-left{padding-bottom:0!important}
    .np-changes-heading{margin-bottom:1.5rem!important}

    /* General */
    .np-how-step{grid-template-columns:1fr!important;gap:.5rem!important;padding:1.75rem 1.25rem!important}
    .np-step-num{font-size:1.5rem!important;padding-top:0!important}

    /* Mobile rhythm — tighter gutters, calmer vertical spacing */
    section:not(.np-hero-section){padding:4.5rem 1.25rem!important}
    footer{padding:2rem 1.25rem!important}
    .np-who-card{padding:1.6rem 0.25rem!important;gap:1.1rem!important}

    /* Calendar — tiles and circles sized for narrow screens */
    .np-week-tray{gap:4px!important;padding:8px 8px 10px!important}
    .np-week-day{height:98px!important;padding:11px 2px!important}
    .np-day-circle{width:32px!important;height:32px!important}
    .np-day-circle span{font-size:0.95rem!important}
    .np-sched-two-col>div:first-child{padding:1.6rem 1.25rem 1.75rem!important}

    /* Member huddle — smaller circles so ten faces sit comfortably, split 6 / 4 */
    .np-huddle{row-gap:8px}
    .np-huddle>div{width:52px!important;height:52px!important}
    .np-huddle>div:not(:first-child){margin-left:-11px!important}
    .np-huddle>div.np-huddle-break{display:block!important;flex-basis:100%!important;width:100%!important;height:0!important;margin:0!important}
  }

`

// ── Reveal ────────────────────────────────────────────────────────────────────
function Reveal({ children, d = 0, style }: { children: ReactNode; d?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const fallback = setTimeout(() => el.setAttribute('data-v', '1'), 1200)
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.setAttribute('data-v', '1'); obs.disconnect(); clearTimeout(fallback) } },
      { threshold: 0.04, rootMargin: '0px 0px -16px 0px' }
    )
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fallback) }
  }, [])
  return (
    <div ref={ref} className="nf" {...(d > 0 ? { 'data-d': String(d) } : {})} style={style}>
      {children}
    </div>
  )
}

// ── Shared style constants ────────────────────────────────────────────────────
const eyebrow: CSSProperties = {
  fontSize: '12px', letterSpacing: '0.22em',
  textTransform: 'uppercase', color: P.muted, fontWeight: 500, margin: 0,
}
const btnAccent: CSSProperties = {
  background: P.accent, color: P.light, border: 'none',
  borderRadius: 100, padding: '16px 36px',
  fontSize: '15px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.01em',
}

// ── Who icons ─────────────────────────────────────────────────────────────────
const WHO_ICONS: Record<string, ReactNode> = {
  'Losing the afterglow': (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3.5" />
      <line x1="12" y1="2.5" x2="12" y2="5" />
      <line x1="19.5" y1="4.5" x2="17.7" y2="6.3" />
      <line x1="21.5" y1="12" x2="19" y2="12" />
      <line x1="19.5" y1="19.5" x2="17.7" y2="17.7" strokeOpacity="0.3" />
      <line x1="12" y1="21.5" x2="12" y2="19" strokeOpacity="0.18" />
      <line x1="4.5" y1="19.5" x2="6.3" y2="17.7" strokeOpacity="0.12" />
      <line x1="2.5" y1="12" x2="5" y2="12" strokeOpacity="0.1" />
      <line x1="4.5" y1="4.5" x2="6.3" y2="6.3" strokeOpacity="0.22" />
    </svg>
  ),
  'Navigating the overwhelm': (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7 C6 7 6 11 9 11 C12 11 12 7 15 7 C18 7 18 11 21 11" />
      <path d="M3 13 C6 13 6 17 9 17 C12 17 12 13 15 13 C18 13 18 17 21 17" strokeOpacity="0.5" />
      <path d="M3 10 C5 10 7 14 9 14 C11 14 13 10 15 10 C17 10 19 14 21 14" strokeOpacity="0.25" />
    </svg>
  ),
  'Feeling the disconnect': (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="12" r="3" />
      <line x1="9" y1="12" x2="10.5" y2="12" />
      <polyline points="10.5,12 11.4,10.2 12.6,13.8 13.5,12" strokeOpacity="0.5" />
      <line x1="13.5" y1="12" x2="15" y2="12" />
    </svg>
  ),
  'Living in your head': (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21 L9 18.5 C6 17 4 14.5 4 11 C4 6.5 7.5 3 12 3 C16.5 3 20 6.5 20 11 C20 14.5 18 17 15 18.5 L15 21 Z" />
      <circle cx="12" cy="11" r="1.5" strokeOpacity="0.8" />
      <circle cx="12" cy="11" r="3.2" strokeOpacity="0.45" />
      <circle cx="12" cy="11" r="5" strokeOpacity="0.18" />
    </svg>
  ),
}

// ── Feature icons ─────────────────────────────────────────────────────────────
const ICONS: Record<string, ReactNode> = {
  'The Daily Drop': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="4.5" y2="12" strokeOpacity="0.4" />
      <line x1="6.5" y1="9" x2="6.5" y2="15" strokeOpacity="0.6" />
      <line x1="9.5" y1="6.5" x2="9.5" y2="17.5" />
      <line x1="12.5" y1="9" x2="12.5" y2="15" />
      <line x1="15.5" y1="10.5" x2="15.5" y2="13.5" strokeOpacity="0.6" />
      <line x1="18.5" y1="11.5" x2="18.5" y2="12.5" strokeOpacity="0.35" />
    </svg>
  ),
  'Guided Classes': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12 C4.5 7 7.5 7 9.5 12 C11.5 17 14.5 17 16.5 12 C18.5 7 21 7 22 12" />
      <path d="M5 17.5 C6.2 15.2 7.8 15.2 9 17.5" strokeOpacity="0.38" />
    </svg>
  ),
  'Integration Circles': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <circle cx="12" cy="16.5" r="3" />
      <line x1="11" y1="8" x2="13" y2="8" />
      <line x1="9" y1="10.6" x2="11" y2="14" />
      <line x1="15" y1="10.6" x2="13" y2="14" />
    </svg>
  ),
  'The Practice Room': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5 C4 5 8 4 12 5 L12 20 C8 19 4 20 4 20 Z" />
      <path d="M20 5 C20 5 16 4 12 5 L12 20 C16 19 20 20 20 20 Z" />
      <line x1="15" y1="9" x2="18" y2="9" />
      <line x1="15" y1="12.5" x2="18" y2="12.5" />
      <line x1="15" y1="16" x2="17" y2="16" />
    </svg>
  ),
  'Connection Events': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="7.5" r="2.5" />
      <circle cx="15.5" cy="7.5" r="2.5" />
      <path d="M3 20 C3 16 5.5 14 8.5 14" />
      <path d="M21 20 C21 16 18.5 14 15.5 14" />
      <path d="M10.5 18.5 C10.5 16.5 13.5 16.5 13.5 18.5" />
    </svg>
  ),
  'Monthly Ritual': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8.5" r="3" />
      <path d="M6 21 C6 17 8.5 15 12 15 C15.5 15 18 17 18 21" />
      <line x1="12" y1="2" x2="12" y2="3.5" />
      <line x1="16.5" y1="3.8" x2="15.5" y2="5.2" />
      <line x1="7.5" y1="3.8" x2="8.5" y2="5.2" />
    </svg>
  ),
}

// ── Data ──────────────────────────────────────────────────────────────────────
const WHO_ITEMS = [
  { title: 'Losing the afterglow', body: 'You have profound insights, but struggle to translate them into everyday life as old routines pull you back in.' },
  { title: 'Navigating the overwhelm', body: 'You had a deeply opening experience, but struggle to stay grounded as intense emotions surface in daily life.' },
  { title: 'Feeling the disconnect', body: "Your internal world shifted, but your environment hasn't, leaving you feeling alienated from the people in your life." },
  { title: 'Living in your head', body: 'You realize your stuckness lives in your body, and trying to figure everything out in your head is no longer working.' },
]


const EM = (s: string) => <em style={{ fontStyle: 'italic', color: P.text }}>{s}</em>
const AL = (s: string) => <><span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: P.rust, marginRight: '0.45rem' }}>Audio</span>{s}</>
const JL = (s: string) => <><span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: P.rust, marginRight: '0.45rem' }}>Prompt</span><em style={{ fontStyle: 'italic' }}>&ldquo;{s}&rdquo;</em></>

const WEEK_DAYS = [
  {
    num: '01', day: 'Monday', tag: 'Async Drop',
    theme: 'Establishing Safety',
    sentences: [
      AL('2-minute guided body scan to help you find a physical sense of calm.'),
      <>The week&rsquo;s new theme arrives {EM('softly, without demand.')} Set your intention, then step away.</>,
    ],
  },
  {
    num: '02', day: 'Tuesday', tag: 'Async Drop & Practice Room',
    theme: 'Observing the Tension',
    sentences: [
      AL('2-minute guided somatic practice to gently notice physical holding.'),
      JL('Without trying to fix or judge it, where is your body currently holding tension or bracing against change?'),
      <>Your daily practice continues — complete it on your own time. Or do it together: a 30-minute silent co-working session, {EM('the accountability of being in the room')} without the pressure of speaking.</>,
    ],
  },
  {
    num: '03', day: 'Wednesday', tag: 'Live Online Class',
    theme: 'Live Somatic Regulation',
    sentences: [
      'A 60-minute session safely guided by a somatic facilitator.',
      <><strong style={{ fontWeight: 600, color: P.text }}>This week&rsquo;s focus: Body Awareness</strong></>,
      <><span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: P.rust, marginRight: '0.45rem' }}>Class</span><em style={{ fontStyle: 'italic' }}>Through a <strong style={{ fontWeight: 600 }}>guided meditation</strong>, you will explore where your emotions live in your body, ask what they might be needing, and close with a moment of appreciation for the parts of yourself that often go unnoticed.</em></>,
      EM('The session your nervous system has been waiting for.'),
    ],
  },
  {
    num: '04', day: 'Thursday', tag: 'Async Drop & Practice Room',
    theme: 'Reflection & Undoing',
    sentences: [
      AL('2-minute guided somatic unwinding.'),
      JL('Reflecting on what surfaced during yesterday\'s live class, what physical tension or "armor" are you finally giving yourself permission to let go of?'),
      <>Your daily practice continues. Another chance to drop into the Practice Room for {EM('quiet, shared accountability.')} No performance required.</>,
    ],
  },
  {
    num: '05', day: 'Friday', tag: 'Async Drop',
    theme: 'Inviting the Good',
    sentences: [
      'A final 2-minute guided practice to gently close the week.',
      EM('Let what landed, land.'),
    ],
  },
  {
    num: '06', day: 'Saturday', tag: 'Rest',
    theme: 'Integration in the Wild',
    sentences: [
      'No drops. No classes. Let the week settle into your body.',
      EM('Give yourself full permission to rest, unplug, and simply experience your daily life.'),
    ],
  },
  {
    num: '07', day: 'Sunday', tag: 'Share Pod · 12-Week Sprint',
    theme: 'Translation into Action',
    sentences: [
      "A closed circle of 8 to 10 peers, safely guided by a dedicated facilitator.",
      EM("Every Sunday is your space to process the week’s insights and translate them into ongoing growth."),
      <><strong style={{ fontWeight: 600, color: P.text }}>This week&rsquo;s focus: The Body</strong></>,
      "You will share the physical tension that surfaced over the last few days, and together, set a new, small physical commitment for the week ahead.",
    ],
  },
]

const TESTIMONIALS = [
  { outcome: 'Making insights stick, not fade', quote: "The reflection and constant reminder of my experience and how to land it best in my daily life. Having that is extremely valuable and allows it not to fall by the wayside.", name: 'Damon, Founding Member', photo: '/assets/damon.jpg' },
  { outcome: 'Taking clear action, not overthinking', quote: "My habits have gotten better, especially when it comes to getting my daily work done and staying off of social media. I feel like I'm on the right track.", name: 'Cam, Founding Member', photo: '/assets/cam.jpg' },
  { outcome: 'Staying grounded, not scattered', quote: "It is an active group with great leaders/coaches and good interactive workshops… that really help ground and bring yourself into your body and the present.", name: 'Evan, Founding Member', photo: '/assets/evan.jpg' },
]

const STEPS = [
  { num: '01', title: 'Find your path', body: "Take our 2-minute assessment to explore your current needs. Based on your results, we will match you with the path and level of commitment that is exactly right for you.", aside: null },
  { num: '02', title: 'Step into your matched path', body: 'Because our community scales to your current energy levels, your assessment will guide you to the container that is exactly right for you.', aside: 'If you are ready for deep, reflective work, you will be matched with an intimate 8-to-10 person pod for a 12-week live share circle sprint. If you require a lighter commitment right now, you will be guided to our Foundation tier, giving you access to our large-group classes and events at your own pace.' },
  { num: '03', title: 'Show up daily & weekly', body: 'Engage with our Daily Async Drops (short somatic audios and journal prompts) and our live Wednesday Regulation Class to actively calm your nervous system.', aside: null },
  { num: '04', title: 'Stay connected', body: 'Between sessions, your community is always there. Drop into our live Practice Rooms for silent social accountability, or lean on your pod as you translate your insights into daily action.', aside: null },
]

// ── Hero quote data ───────────────────────────────────────────────────────────
const HERO_QUOTES = [
  { quote: '"I\'ve been craving a space like this for years."', name: 'Holly', role: 'Founding Member' },
  { quote: '"My habits have gotten better. I feel like I\'m on the right track."', name: 'Cam', role: 'Founding Member' },
  { quote: '"The practices ground you in your body and the present."', name: 'Evan', role: 'Founding Member' },
]

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="np-nav-inner" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 72,
      padding: '0 clamp(20px, 4vw, 56px)',
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '24px',
      background: scrolled ? 'rgba(247,243,236,0.95)' : 'transparent',
      borderBottom: `1px solid ${scrolled ? P.div : 'transparent'}`,
      backdropFilter: scrolled ? 'saturate(140%) blur(14px)' : 'none',
      transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
    }}>
      {/* Logo + wordmark left — whole area clickable to scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/Somenta_Logo_240x60_v4.png" alt="Somenta" style={{ height: 30, width: 120, objectFit: 'contain' }} />
      </button>
      {/* Links center */}
      <div className="np-nav-links" style={{ display: 'flex', gap: '32px', justifyContent: 'center' }}>
        {([['np-value', "What\u2019s Inside"], ['np-stories', 'Transformations'], ['np-how', 'Getting Started'], ['np-faq', 'FAQ']] as [string, string][]).map(([id, label]) => (
          <button key={id} onClick={() => go(id)} className="np-nav-link" style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '13.5px', color: P.text,
            letterSpacing: '0.01em', padding: '6px 0',
          }}>
            {label}
          </button>
        ))}
      </div>
      {/* CTA right */}
      <div style={{ justifySelf: 'end' }}>
        <a href="/quiz" style={{ textDecoration: 'none' }}>
          <button className="np-btn-outline np-nav-cta" style={{
            background: 'transparent', color: P.accent, border: `1.5px solid ${P.accent}`,
            borderRadius: 100, padding: '14px 28px',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.01em',
          }}>
            Find your path
          </button>
        </a>
      </div>
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="np-hero-section" style={{ background: P.bg }}>

      {/* Photo stage — real people at rest, forest green, misty text zone */}
      <div className="np-hero-stage" style={{
        position: 'relative', height: 'max(88vh, 660px)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <Image
          src={heroImg}
          alt=""
          aria-hidden="true"
          fill
          priority
          placeholder="blur"
          quality={70}
          sizes="100vw"
          style={{
            // Grade is baked into the source file (photoGrade + sepia(0.1) brightness(1.03),
            // applied mathematically) — no runtime filter on the page's largest surface,
            // and low-power mode keeps the same warm tone
            objectFit: 'cover', objectPosition: 'center 68%',
          }}
        />

        {/* Fog system: full-width fade over the top half (nav + headline), plus a concentrated pocket behind the subhead and CTA */}
        <div className="np-hero-fog" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 38% at 50% 50%, rgba(247,243,236,0.9) 0%, rgba(247,243,236,0.5) 55%, transparent 80%), linear-gradient(180deg, rgba(247,243,236,0.95) 0%, rgba(247,243,236,0.84) 16%, rgba(247,243,236,0.58) 34%, rgba(247,243,236,0.26) 50%, transparent 66%)',
        }} />

        {/* Long soft dissolve — the meadow melts gradually into the page, no hard edge */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, transparent 58%, rgba(247,243,236,0.18) 70%, rgba(247,243,236,0.45) 80%, rgba(247,243,236,0.75) 89%, rgba(247,243,236,0.94) 96%, #F7F3EC 100%)',
        }} />

        {/* Content — words live in the veiled mist, the people rest below */}
        <div className="np-hero-text" style={{
          position: 'relative', zIndex: 1, width: '100%',
          padding: 'clamp(110px, 15vh, 150px) clamp(20px, 4vw, 56px) 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
        <div style={{ maxWidth: 920, width: '100%', textAlign: 'center' }}>

          <Reveal>
            <p style={{ ...eyebrow, marginBottom: 24 }}>
              For life after a retreat or plant medicine journey
            </p>
          </Reveal>

          <Reveal d={1}>
            <h1 style={{
              ...serif, margin: '0 0 28px',
              fontSize: 'clamp(40px, min(6.8vw, 9.4vh), 92px)',
              fontWeight: 400, lineHeight: 1.02,
              color: P.text, letterSpacing: '-0.022em',
            }}>
              The retreat is over.<br /><em>Now comes the hard part.</em>
            </h1>
          </Reveal>

          <Reveal d={2}>
            <div style={{ maxWidth: 680, margin: '0 auto 36px', textAlign: 'center' }}>
              <p style={{
                fontSize: 'clamp(14px, min(1.2vw, 1.9vh), 17px)', lineHeight: 1.8,
                color: P.text, margin: 0, opacity: 0.82,
              }}>
                Daily somatic practices — breathwork, meditation, yoga nidra — plus a live weekly class and an intimate share pod of people who actually get it. So what shifted becomes how you live, before it fades.{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 500 }}>Not another content library.</em>
              </p>
            </div>
          </Reveal>

          <Reveal d={3}>
            <a href="/quiz" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <button className="np-btn-accent" style={btnAccent}>
                Find your path →
              </button>
            </a>
          </Reveal>

        </div>
        </div>
      </div>

      {/* Quotes rise out of the dissolve — no hard strip */}
      <div className="np-hero-quotes-wrap" style={{ position: 'relative', zIndex: 2, marginTop: '-4.5rem', padding: '0 0 1.5rem' }}>
        <div className="np-hero-quotes" style={{
          maxWidth: 960, margin: '0 auto',
          padding: '1.5rem clamp(20px, 4vw, 56px) 0',
          display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
          gap: '0 2.5rem', alignItems: 'center',
        }}>
          {HERO_QUOTES.map((q, i) => (
            <Fragment key={q.name}>
              {i > 0 && <div className="np-hero-qdiv" style={{ background: 'rgba(224,211,191,0.5)', alignSelf: 'stretch' }} />}
              <div className={i > 0 ? 'np-hero-q-extra' : undefined} style={{ textAlign: 'center', padding: '0 1rem' }}>
                <p style={{ fontSize: '11px', color: P.accent, margin: '0 0 0.4rem', letterSpacing: '0.04em' }}>★★★★★</p>
                <p style={{
                  ...serif, fontStyle: 'italic',
                  fontSize: '0.88rem', lineHeight: 1.65,
                  color: P.text, opacity: 0.82, margin: '0 0 0.55rem',
                }}>{q.quote}</p>
                <span style={{
                  ...eyebrow, fontSize: '10px',
                  letterSpacing: '0.18em', color: P.muted,
                }}>{q.name} · {q.role}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

    </section>
  )
}


// ── Who ───────────────────────────────────────────────────────────────────────
function WhoSection() {
  return (
    <section id="np-who" className="np-grain" style={{ background: P.bg, padding: '7rem 3rem 8rem' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div className="np-who-grid" style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '5rem', alignItems: 'start' }}>

          {/* Left: heading + photo */}
          <div>
            <Reveal>
              <h2 style={{
                ...serif, margin: 0,
                fontSize: 'clamp(34px, 4.2vw, 52px)',
                fontWeight: 400, lineHeight: 1.08,
                color: P.text, letterSpacing: '-0.018em', maxWidth: '14ch',
              }}>
                For anyone navigating life after a <em>transformative retreat.</em>
              </h2>
            </Reveal>
            <Reveal d={1}>
              {/* Mounted print — same physical-photo language as the calendar polaroids */}
              <div style={{
                background: P.light, border: `1px solid ${P.div}`,
                borderRadius: 12, padding: 10,
                boxShadow: '0 12px 32px rgba(40,27,13,0.10)',
                marginTop: '2.75rem',
              }}>
                <div className="np-who-photo" style={{
                  position: 'relative', borderRadius: 6, overflow: 'hidden', aspectRatio: '4/5',
                }}>
                  <Image
                    src="/assets/Girl_park_v3.png"
                    alt="" aria-hidden="true"
                    fill sizes="(max-width: 860px) 100vw, 40vw"
                    style={{ objectFit: 'cover', objectPosition: 'center 55%', filter: photoGrade }}
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: editorial list */}
          <div style={{ borderTop: `1px solid ${P.div}` }}>
            {WHO_ITEMS.map((item, i) => (
              <Reveal key={item.title} d={i + 1 as 1 | 2 | 3 | 4}>
                <div className="np-who-card" style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.75rem',
                  alignItems: 'start', padding: '2.4rem 0.75rem 2.4rem 0.5rem',
                  borderBottom: `1px solid ${P.div}`, borderRadius: 2,
                }}>
                  <div style={{ color: P.rust, paddingTop: 2 }}>
                    {WHO_ICONS[item.title]}
                  </div>
                  <div>
                    <h3 style={{ ...serif, fontSize: 'clamp(18px, 1.5vw, 22px)', fontWeight: 500, color: P.text, margin: '0 0 0.55rem', lineHeight: 1.25 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: P.text, opacity: 0.72, lineHeight: 1.85, margin: 0, maxWidth: '56ch' }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

// ── Philosophy ────────────────────────────────────────────────────────────────
function PhilosophySection() {
  return (
    <section style={{ background: P.greenDeep, padding: '9rem 3rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        <Reveal d={1}>
          <h2 style={{
            ...serif,
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            fontWeight: 400, lineHeight: 1.1,
            color: P.light, margin: '0 auto 2.5rem',
            letterSpacing: '-0.018em',
            maxWidth: 820,
          }}>
            You cannot integrate<br />in isolation.
          </h2>
        </Reveal>
        <Reveal d={2}>
          <p style={{
            ...serif, fontStyle: 'italic',
            fontSize: 'clamp(16.5px, 1.5vw, 20px)', lineHeight: 1.7,
            color: 'rgba(247,243,236,0.85)', maxWidth: '44ch', margin: '0 auto',
          }}>
            Profound experiences can leave you feeling disconnected from the everyday world. Your journey makes more sense when you are truly seen and heard by others.
          </p>
        </Reveal>
        <Reveal d={3}>
          {/* The huddle — real founding members and facilitators, shoulder to shoulder */}
          <div className="np-huddle" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3.25rem' }}>
            {[...POD_PHOTOS, '/assets/jake.jpg', '/assets/britt_breathing.jpg'].map((src, i) => (
              <Fragment key={src}>
                {/* Mobile-only row break after the 6th face — splits the huddle 6 / 4 so nobody sits alone */}
                {i === 6 && <div className="np-huddle-break" aria-hidden="true" style={{ display: 'none' }} />}
                <div style={{
                  position: 'relative', width: 66, height: 66,
                  borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                  border: '2px solid rgba(247,243,236,0.9)',
                  marginLeft: i > 0 ? -15 : 0,
                  background: '#2A4636',
                }}>
                  <Image
                    src={src} alt="" aria-hidden="true"
                    fill sizes="66px"
                    style={src.includes('shawn')
                      ? { objectFit: 'cover', objectPosition: '19% 55%', filter: photoGrade, transform: 'scale(1.8)', transformOrigin: '0% 68%' }
                      : { objectFit: 'cover', objectPosition: 'center 25%', filter: photoGrade }}
                  />
                </div>
              </Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Practice (Value) ──────────────────────────────────────────────────────────
const PILLARS = [
  {
    num: '01', title: 'Daily Grounding', tag: 'Solo & Async', cue: 'View Practices',
    desc: 'Translate your insights into lasting change, even on your busiest days.',
    features: [
      { name: 'The Daily Drop', body: <><strong style={{ fontWeight: 600 }}>5 minutes a day</strong> of guided somatic audios and journaling prompts based on our Weekly Focus.</> },
      { name: 'The Practice Room', body: 'A quiet, dedicated live space to journal and reflect alongside others who are showing up too.' },
    ],
  },
  {
    num: '02', title: 'Live Regulation', tag: 'Large Group', cue: 'View Classes',
    desc: 'Stay present and out of your head with expert-led somatic tracking.',
    features: [
      { name: 'Guided Classes', body: 'Live weekly breathwork, meditation, and movement to recalibrate your nervous system.' },
      { name: 'Monthly Ritual', body: 'A monthly chance to go deeper together — a focused practice, a new theme, or a ceremony like cacao.' },
    ],
  },
  {
    num: '03', title: 'Community Bonding', tag: 'Interactive', cue: 'View Gatherings',
    desc: 'Process what is surfacing with peers who truly get it.',
    features: [
      { name: 'Integration Circles', body: 'Intimate, 12-week facilitated share pods with the same trusted people each time.' },
      { name: 'Connection Events', body: 'Exclusive, capped gatherings with small breakout rooms to form real, lasting relationships.' },
    ],
  },
]


function PracticeSection() {
  const [openPillar, setOpenPillar] = useState<number | null>(0)
  return (
    <section id="np-value" className="np-grain" style={{ background: P.bg, padding: '8rem 3rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="np-practice-grid" style={{ display: 'grid', gridTemplateColumns: '42% 58%', gap: '5rem', alignItems: 'start' }}>

          <div className="np-practice-sticky" style={{ position: 'sticky', top: 110, display: 'flex', flexDirection: 'column' }}>
            <Reveal style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <h2 style={{
                ...serif, margin: 0,
                fontSize: 'clamp(34px, 4.2vw, 52px)',
                fontWeight: 400, lineHeight: 1.08, color: P.text, letterSpacing: '-0.018em',
              }}>
                A compassionate, <em style={{ whiteSpace: 'nowrap' }}>safe place to land.</em>
              </h2>
              <p style={{ fontSize: '0.95rem', color: P.green, letterSpacing: '0.08em', margin: '0.75rem 0 0' }}>
                Welcome to Somenta
              </p>
              <p style={{ fontSize: '0.95rem', color: bodyText, lineHeight: 1.85, margin: 0 }}>
                We are so much more than <em>just</em> a community. Think of Somenta as a living rhythm of practice, reflection, and real support. A real space to breathe, reflect, and grow alongside people who deeply understand what you are going through.
              </p>
            </Reveal>
            <Reveal d={1}>
              {/* Mounted print — same physical-photo language as the calendar polaroids */}
              <div style={{
                background: P.light, border: `1px solid ${P.div}`,
                borderRadius: 12, padding: 10,
                boxShadow: '0 12px 32px rgba(40,27,13,0.10)',
                marginTop: '2.5rem',
              }}>
                <div style={{
                  position: 'relative', borderRadius: 6, overflow: 'hidden', aspectRatio: '4/3',
                }}>
                  <Image
                    src="/assets/group_backyard_v2.png"
                    alt="" aria-hidden="true"
                    fill sizes="(max-width: 860px) 100vw, 38vw"
                    style={{ objectFit: 'cover', objectPosition: '88% 45%', filter: photoGrade }}
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="np-practice-right" style={{ borderTop: `1px solid ${P.div}` }}>
            {PILLARS.map((pillar, i) => {
              const isOpen = openPillar === i
              return (
                <Reveal key={pillar.num} d={i + 1 as 1 | 2 | 3}>
                  <div style={{ borderBottom: `1px solid ${P.div}` }}>
                    {/* Clickable pillar header */}
                    <button
                      className="np-pillar-btn"
                      onClick={() => setOpenPillar(isOpen ? null : i)}
                      style={{ padding: '1.75rem 0.25rem', width: '100%' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem', flex: 1 }}>
                          {/* Number */}
                          <span style={{ ...serif, fontStyle: 'italic', fontSize: '12px', color: 'rgba(140,124,104,0.55)', fontWeight: 400, flexShrink: 0 }}>
                            {pillar.num}
                          </span>
                          <div style={{ flex: 1 }}>
                            {/* Title + tag */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                              <h3 style={{ ...serif, fontSize: 'clamp(17px, 1.3vw, 20px)', fontWeight: 500, color: P.text, margin: 0, lineHeight: 1.2 }}>
                                {pillar.title}
                              </h3>
                              <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: P.muted }}>
                                {pillar.tag}
                              </span>
                            </div>
                            {/* Description below */}
                            <p style={{ fontSize: '0.875rem', color: bodyText, lineHeight: 1.7, margin: 0, textAlign: 'left' }}>
                              {pillar.desc}
                            </p>
                          </div>
                        </div>
                        {/* Cue + chevron */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0, paddingTop: 3 }}>
                          <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', color: P.rust }}>
                            {pillar.cue}
                          </span>
                          <div style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                            color: P.rust,
                          }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Expandable two-card row */}
                    <div style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.45s cubic-bezier(0.16,1,0.3,1)',
                    }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div className="np-feat-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '0 0.25rem 1.75rem' }}>
                          {pillar.features.map(feat => (
                            <div key={feat.name} className="np-feat-item" style={{
                              background: P.light, border: `1px solid ${P.div}`,
                              borderRadius: 12, padding: '1.5rem',
                              display: 'flex', flexDirection: 'column', gap: '1rem',
                            }}>
                              <div className="np-feat-icon" style={{
                                width: 44, height: 44, borderRadius: 10,
                                background: 'rgba(184,80,48,0.10)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: P.rust, flexShrink: 0,
                              }}>
                                {ICONS[feat.name]}
                              </div>
                              <div>
                                <h4 style={{ fontSize: '14px', fontWeight: 600, color: P.text, margin: '0 0 0.4rem', lineHeight: 1.3 }}>
                                  {feat.name}
                                </h4>
                                <p style={{ fontSize: '0.875rem', color: bodyText, lineHeight: 1.8, margin: 0 }}>
                                  {feat.body}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
            <Reveal>
              <div style={{ marginTop: '2.75rem', textAlign: 'center' }}>
                <a href="/quiz" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  <button className="np-btn-accent" style={btnAccent}>
                    Find your path →
                  </button>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Schedule (Looks) ──────────────────────────────────────────────────────────
const PHOTO_CARD_STYLE: CSSProperties = {
  position: 'relative', borderRadius: 10, overflow: 'hidden',
  width: 165, height: 274, flexShrink: 0,
  boxShadow: '0 4px 18px rgba(40,27,13,0.14)', background: '#E8E0D0',
}
const DAY_ABBR  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DAY_DATES = ['18',  '19',  '20',  '21',  '22',  '23',  '24']

const DAY_INACTIVE_BG = '#F5F0E8'  // all 7 cells when not selected
const DAY_ACTIVE_BG   = '#EDE7D9'  // the one selected cell + content area

const POD_PHOTOS = [
  '/assets/steve.jpg', '/assets/damon.jpg', '/assets/cam.jpg',
  '/assets/evan.jpg', '/assets/janice.jpg', '/assets/shawn_new.jpg',
  '/assets/kevin.jpg', '/assets/ben.jpg',
]

// Mobile banner crops — wide strips need their own framing, tuned per photo.
// Wednesday and Sunday get different photos than desktop (better crops at banner ratio).
const MOBILE_BANNERS: Record<string, { src: string; pos: string }> = {
  Monday:    { src: '/assets/establishing_safety.jpg',      pos: 'center 20%' },
  Tuesday:   { src: '/assets/body_scan.jpg',                pos: 'center 23%' },
  Wednesday: { src: '/assets/Laying_meditation_park.jpg',   pos: 'center 55%' },
  Thursday:  { src: '/assets/reflection_undoing.jpg',       pos: 'center 86%' },
  Friday:    { src: '/assets/pexels-solo-meadow.jpg',       pos: 'center 92%' },
  Saturday:  { src: '/assets/Integration_wild.jpg',         pos: '65% center' },
  Sunday:    { src: '/assets/inviting_good.jpg',            pos: 'center 52%' },
}

// Weekday polaroid photos, keyed by day name — Wednesday and Sunday have custom right columns
const POLAROIDS: Record<string, { src: string; pos: string }> = {
  Monday:   { src: '/assets/establishing_safety.jpg', pos: 'right center' },
  Tuesday:  { src: '/assets/body_scan.jpg',           pos: 'center center' },
  Thursday: { src: '/assets/reflection_undoing.jpg',  pos: 'center center' },
  Friday:   { src: '/assets/pexels-solo-meadow.jpg',  pos: 'center center' },
  Saturday: { src: '/assets/Integration_wild.jpg',    pos: '65% center' },
}

// ── Shared day-panel frame: text column left, day-specific right column ──────
function DayPanel({ day, tone, headingWeight, compact = false, children }: {
  day: (typeof WEEK_DAYS)[number]
  tone: string
  headingWeight: 400 | 500
  compact?: boolean
  children: ReactNode
}) {
  // Mobile-only banner photo — the desktop photo columns are hidden under 860px,
  // so each day carries its image as a small cover strip above the text instead
  const banner = MOBILE_BANNERS[day.day]

  return (
    <div className="np-day-in np-sched-two-col" style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '55% 45%' }}>
      {/* Left: text */}
      <div style={{ padding: '2.25rem 2rem 2rem 3.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {banner && (
          <div className="np-day-photo-m" style={{ position: 'relative', width: '100%', height: 132, borderRadius: 10, overflow: 'hidden', marginBottom: '1.15rem', display: 'none', flexShrink: 0 }}>
            <Image src={banner.src} alt="" fill sizes="92vw" style={{ objectFit: 'cover', objectPosition: banner.pos, filter: photoGrade }} />
            {day.day === 'Wednesday' && (
              <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', alignItems: 'center', gap: 4, background: P.rust, borderRadius: 100, padding: '3px 8px' }}>
                <span className="np-live-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#FDFBF6', display: 'inline-block' }} />
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FDFBF6', lineHeight: 1 }}>Live</span>
              </div>
            )}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span style={{ ...eyebrow, color: tone, margin: 0 }}>{day.day}</span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: tone, background: tone === P.rust ? 'rgba(184,80,48,0.12)' : 'rgba(184,80,48,0.08)', padding: '3px 8px', borderRadius: 100 }}>{day.tag}</span>
        </div>
        <h3 style={{
          ...serif,
          fontSize: compact ? 'clamp(20px, 2.4vw, 28px)' : 'clamp(22px, 2.8vw, 34px)',
          fontWeight: headingWeight, color: P.text, lineHeight: 1.15,
          margin: '0 0 0.85rem', letterSpacing: '-0.015em',
          ...(compact ? {} : { maxWidth: '26ch' }),
        }}>{day.theme}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? '0.45rem' : '0.55rem', ...(compact ? {} : { maxWidth: '52ch' }) }}>
          {day.sentences.map((s, si) => <p key={si} style={{ fontSize: compact ? '0.82rem' : '0.875rem', color: bodyText, lineHeight: 1.75, margin: 0 }}>{s}</p>)}
        </div>
      </div>
      {children}
    </div>
  )
}

function ScheduleSection() {
  const [openDay, setOpenDay] = useState<number>(0)
  const calRef = useRef<HTMLDivElement>(null)
  const tourRef = useRef<{ done: boolean }>({ done: false })

  // Scroll-linked intro: as the calendar rises toward the center of the viewport,
  // the week advances Mon → Tue → Wed, then settles. Reversible while approaching.
  // The first click ends the intro for good — after that, scroll never moves the days.
  useEffect(() => {
    const el = calRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpenDay(2)
      return
    }
    const tour = tourRef.current
    const onScroll = () => {
      if (tour.done) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh                          // card top at bottom edge → progress 0
      const end = vh / 2 - r.height / 2         // card centered → progress 1
      const p = Math.min(1, Math.max(0, (start - r.top) / Math.max(1, start - end)))
      setOpenDay(p >= 0.85 ? 2 : p >= 0.5 ? 1 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function pickDay(i: number) {
    tourRef.current.done = true
    setOpenDay(i)
  }

  const day = WEEK_DAYS[openDay]
  const isWednesday = openDay === 2
  const isSunday = openDay === 6
  const polaroid = POLAROIDS[day.day]

  return (
    <section id="np-looks" className="np-grain" style={{ background: P.bgWarm, padding: '8rem 3rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        <Reveal style={{ marginBottom: '4rem' }}>
          <h2 style={{
            ...serif, margin: '0 0 1.25rem',
            fontSize: 'clamp(34px, 4.2vw, 52px)',
            fontWeight: 400, lineHeight: 1.08, color: P.text, letterSpacing: '-0.018em', textAlign: 'center',
          }}>
            Real people. Real growth. <em>Every week.</em>
          </h2>
          <p style={{ fontSize: '0.95rem', color: bodyText, lineHeight: 1.7, margin: '0 auto', maxWidth: '52ch', textAlign: 'center' }}>
            <span style={{ ...serif, fontStyle: 'italic', fontSize: '1.05rem', color: P.rust, fontWeight: 400 }}>Not another content library.</span>{' '}
            Guided daily practices, live online classes, and a community that shows up with you — day after day.
          </p>
        </Reveal>

        <Reveal>
          {/* One rounded container — calendar header + content as a single unit */}
          <div ref={calRef} style={{
            border: '1px solid rgba(30,59,42,0.22)',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 28px 80px rgba(40,27,13,0.16), 0 6px 18px rgba(40,27,13,0.06)',
          }}>

            {/* Month / week context bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1.4rem',
              background: DAY_INACTIVE_BG,
              borderBottom: `1px solid ${P.div}`,
            }}>
              <span style={{ ...serif, fontStyle: 'italic', fontSize: '0.875rem', color: P.muted, fontWeight: 400, letterSpacing: '0.01em' }}>May 2026</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <span style={{ fontSize: '15px', color: 'rgba(107,90,71,0.3)', lineHeight: 1, userSelect: 'none' }}>‹</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: P.muted }}>Week 1 · The Body</span>
                <span style={{ fontSize: '15px', color: 'rgba(107,90,71,0.3)', lineHeight: 1, userSelect: 'none' }}>›</span>
              </div>
            </div>

            {/* Week columns — physical tiles floating on the same surface as the panel below */}
            <div className="np-week-tray" style={{ display: 'flex', gap: 8, padding: '12px 12px 14px', background: DAY_ACTIVE_BG, borderBottom: `1px solid ${P.div}` }}>
              {WEEK_DAYS.map((d, i) => {
                const isActive = i === openDay
                const isAnchorDay = d.day === 'Wednesday' || d.day === 'Sunday'
                const isRestDay = d.day === 'Saturday'
                const isPracticeDay = d.day === 'Tuesday' || d.day === 'Thursday'
                const isAsyncDay = !isAnchorDay && !isRestDay && !isPracticeDay
                return (
                  <button
                    key={d.day}
                    className={`np-week-day${isActive ? ' np-week-day-active' : ''}`}
                    onClick={() => pickDay(i)}
                    style={{
                      background: isActive ? '#F6F0E4' : 'rgba(253,251,246,0.45)',
                      borderRadius: 12,
                      border: isActive ? '1px solid rgba(45,90,64,0.32)' : '1px solid rgba(224,211,191,0.65)',
                      boxShadow: isActive ? '0 12px 26px rgba(40,27,13,0.16)' : 'none',
                      transform: isActive ? 'translateY(-3px)' : 'none',
                    }}
                  >
                    {/* Day abbreviation */}
                    <div style={{
                      fontSize: '11px', fontWeight: 500,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: isActive ? P.text : isAnchorDay ? 'rgba(120,90,60,0.7)' : 'rgba(140,124,104,0.6)',
                      lineHeight: '16px', marginBottom: 8,
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      transition: 'color 0.2s', flexShrink: 0,
                    }}>
                      {DAY_ABBR[i]}
                    </div>

                    {/* Date circle */}
                    <div className="np-day-circle" style={{
                      width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                      background: isActive ? P.greenDeep : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.25s cubic-bezier(.16,1,.3,1)',
                    }}>
                      <span style={{
                        ...serif, fontStyle: 'italic',
                        fontSize: '1.15rem', fontWeight: 400, lineHeight: 1,
                        color: isActive ? '#F5EDE0' : isAnchorDay ? 'rgba(120,90,60,0.75)' : 'rgba(140,124,104,0.65)',
                        transition: 'color 0.2s',
                      }}>
                        {DAY_DATES[i]}
                      </span>
                    </div>

                    {/* Indicator: Live/Pod pill · waveform bars · nothing */}
                    <div style={{ width: '100%', height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6, flexShrink: 0 }}>
                      {isAnchorDay ? (
                        <span style={{
                          fontSize: '10px', fontWeight: 600, letterSpacing: '0.10em',
                          textTransform: 'uppercase', lineHeight: 1,
                          color: isActive ? 'rgba(245,237,224,0.9)' : P.rust,
                          background: isActive ? 'rgba(245,237,224,0.15)' : 'rgba(184,80,48,0.1)',
                          padding: '2px 6px', borderRadius: 100,
                          transition: 'color 0.2s, background 0.2s',
                        }}>
                          {d.day === 'Wednesday' ? (
                            <>
                              <span className="np-live-dot" style={{
                                display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
                                background: 'currentColor', marginRight: 4, verticalAlign: 'middle',
                              }} />
                              Live
                            </>
                          ) : 'Pod'}
                        </span>
                      ) : isPracticeDay ? (
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: 10 }}>
                          {[6, 10, 7].map((h, bi) => (
                            <div key={bi} style={{
                              width: 2.5, height: h, borderRadius: 2,
                              background: isActive ? 'rgba(245,237,224,0.5)' : 'rgba(140,124,104,0.28)',
                              transition: 'background 0.2s',
                            }} />
                          ))}
                          <div style={{
                            width: 4, height: 4, borderRadius: '50%', flexShrink: 0,
                            marginLeft: 1, marginBottom: 0,
                            background: isActive ? 'rgba(245,237,224,0.5)' : 'rgba(140,124,104,0.28)',
                            transition: 'background 0.2s',
                            alignSelf: 'center',
                          }} />
                        </div>
                      ) : isAsyncDay ? (
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: 10 }}>
                          {[6, 10, 7].map((h, bi) => (
                            <div key={bi} style={{
                              width: 2.5, height: h, borderRadius: 2,
                              background: isActive ? 'rgba(245,237,224,0.5)' : 'rgba(140,124,104,0.28)',
                              transition: 'background 0.2s',
                            }} />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Content area — fixed height so every day is identical */}
            <div className="np-sched-content" style={{ background: DAY_ACTIVE_BG, height: 400, overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>

              {/* ── Wednesday: Britt photo right ── */}
              {isWednesday && (
                <DayPanel key={`content-${openDay}`} day={day} tone={P.rust} headingWeight={500}>
                  {/* Right: Britt photo card */}
                  <div className="np-sched-photo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '2.5rem 1.75rem 3rem 0.25rem' }}>
                    <div className="np-sched-img" style={{ position: 'relative', width: 165, height: 274, borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 18px rgba(40,27,13,0.18)', flexShrink: 0 }}>
                      <Image src="/assets/britt_breathing.jpg" alt="Britt" fill loading="eager" sizes="165px" style={{ objectFit: 'cover', objectPosition: 'center top', filter: photoGrade }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(247,243,236,0.18)' }} />
                      {/* LIVE badge */}
                      <div style={{ position: 'absolute', top: 6, right: 8, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(40,27,13,0.45)', borderRadius: 100, padding: '3px 8px 3px 6px', backdropFilter: 'blur(4px)' }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FDFBF6', flexShrink: 0 }} />
                        <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FDFBF6', lineHeight: 1 }}>Live</span>
                      </div>
                    </div>
                    <p style={{ margin: '0.65rem 0 0', fontSize: '0.75rem', color: P.muted, lineHeight: 1.5, textAlign: 'center' }}>
                      This week led by <strong style={{ fontWeight: 600, color: P.text }}>Britt</strong>, Somatic Facilitator
                    </p>
                  </div>
                </DayPanel>
              )}

              {/* ── Sunday: avatar grid right ── */}
              {isSunday && (
                <DayPanel key={`content-${openDay}`} day={day} tone={P.rust} headingWeight={500} compact>
                  {/* Right: Zoom-style wide grid with window frame */}
                  <div className="np-sched-photo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem 1.5rem 0.5rem' }}>
                    <div style={{ position: 'relative', border: '2px solid rgba(40,27,13,0.18)', borderRadius: 12, padding: '10px', background: 'rgba(40,27,13,0.025)', boxShadow: '0 3px 14px rgba(40,27,13,0.08)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {/* Row 1: steve, damon, cam */}
                        <div style={{ display: 'flex', gap: 4 }}>
                          {POD_PHOTOS.slice(0, 3).map((p, i) => (
                            <div key={i} className="np-sched-img" style={{ position: 'relative', width: 90, height: 70, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                              <Image src={p} alt="" fill sizes="90px" style={{ objectFit: 'cover', objectPosition: 'center 20%', filter: photoGrade }} />
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(247,243,236,0.28)' }} />
                            </div>
                          ))}
                        </div>
                        {/* Row 2: evan, You, janice */}
                        <div style={{ display: 'flex', gap: 4 }}>
                          <div style={{ position: 'relative', width: 90, height: 70, borderRadius: 6, overflow: 'hidden', flexShrink: 0, background: '#E8E0D0' }}>
                            <Image src={POD_PHOTOS[3]} alt="" fill sizes="90px" style={{ objectFit: 'cover', objectPosition: 'center 20%', filter: photoGrade }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(247,243,236,0.28)' }} />
                          </div>
                          {/* You */}
                          <div style={{ width: 90, height: 70, borderRadius: 6, background: 'rgba(184,80,48,0.07)', border: '1.5px solid rgba(184,80,48,0.35)', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B85030" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                            <span style={{ ...serif, fontStyle: 'italic', fontSize: '14px', color: P.rust, lineHeight: 1, opacity: 0.85 }}>You</span>
                          </div>
                          <div style={{ position: 'relative', width: 90, height: 70, borderRadius: 6, overflow: 'hidden', flexShrink: 0, background: '#E8E0D0' }}>
                            <Image src={POD_PHOTOS[4]} alt="" fill sizes="90px" style={{ objectFit: 'cover', objectPosition: 'center 20%', filter: photoGrade }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(247,243,236,0.28)' }} />
                          </div>
                        </div>
                        {/* Row 3: shawn, kevin, ben */}
                        <div style={{ display: 'flex', gap: 4 }}>
                          {[
                            { src: POD_PHOTOS[5], pos: '19% 55%', scale: true },
                            { src: POD_PHOTOS[6], pos: 'center 20%', scale: false },
                            { src: POD_PHOTOS[7], pos: 'center 20%', scale: false },
                          ].map(({ src, pos, scale }, i) => (
                            <div key={i} className="np-sched-img" style={{ position: 'relative', width: 90, height: 70, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                              <Image src={src} alt="" fill sizes="90px" style={{ objectFit: 'cover', objectPosition: pos, filter: photoGrade, ...(scale ? { transform: 'scale(1.7)', transformOrigin: '-12% 71%' } : {}) }} />
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(247,243,236,0.28)' }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </DayPanel>
              )}

              {/* ── All other days: single polaroid right ── */}
              {polaroid && (
                <DayPanel key={`content-${openDay}`} day={day} tone={P.muted} headingWeight={400}>
                  {/* Right: photo */}
                  <div className="np-sched-photo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem 1rem 0' }}>
                    <div className="np-sched-img" style={PHOTO_CARD_STYLE}>
                      <Image src={polaroid.src} alt="" fill loading="eager" sizes="185px" style={{ objectFit: 'cover', objectPosition: polaroid.pos, filter: photoGrade }} />
                    </div>
                  </div>
                </DayPanel>
              )}

            </div>

          </div>

        </Reveal>

      </div>
    </section>
  )
}

// ── Changes ───────────────────────────────────────────────────────────────────
const ALL_TESTIMONIALS = [
  {
    outcome: 'Finding connection, not isolation',
    quote: "It\u2019s that kind of being able to connect with people who understand you\u2026 other people don\u2019t relate to because they just can\u2019t understand what that\u2019s like.",
    name: 'Steve \u00b7 Founding Member',
    photo: '/assets/steve.jpg',
  },
  ...TESTIMONIALS,
]

function ChangesSection() {
  const [active, setActive] = useState(0)
  const item = ALL_TESTIMONIALS[active]
  const firstName = item.name.split(/[,·]/)[0].trim()

  return (
    <section id="np-stories" style={{ background: P.green, padding: '8rem 3rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div className="np-changes-grid" style={{ display: 'grid', gridTemplateColumns: '38% 1fr', gap: '5rem', alignItems: 'end' }}>

          {/* Left: heading + outcome selector */}
          <div className="np-changes-left">
            <Reveal style={{ marginBottom: '2.5rem' }}>
              <h2 className="np-changes-heading" style={{
                ...serif, margin: 0,
                fontSize: 'clamp(30px, 3.6vw, 46px)',
                fontWeight: 400, lineHeight: 1.08, color: P.bg, letterSpacing: '-0.018em',
              }}>
                The real shifts our members feel.
              </h2>
            </Reveal>

            <Reveal>
              <p style={{ fontSize: '11px', color: 'rgba(247,243,236,0.6)', letterSpacing: '0.08em', fontStyle: 'italic', margin: '0 0 0.75rem' }}>
                (Select to explore)
              </p>
              <div className="np-changes-selector" style={{ display: 'flex', flexDirection: 'column' }}>
                {ALL_TESTIMONIALS.map((t, i) => {
                  const isActive = i === active
                  const tFirstName = t.name.split(/[,·]/)[0].trim()
                  return (
                    <div key={t.name} style={{ borderRadius: 10, background: isActive ? 'rgba(253,251,246,0.1)' : 'transparent', transition: 'background 0.25s' }}>
                      <button
                        className="np-selector-btn"
                        onClick={() => setActive(i)}
                        style={{ padding: '1.4rem 1rem 1.4rem 1.25rem' }}
                      >
                        <p style={{
                            ...serif, margin: 0,
                            fontSize: 'clamp(16px, 1.3vw, 19px)',
                            fontWeight: isActive ? 500 : 400,
                            color: isActive ? P.bg : 'rgba(247,243,236,0.55)',
                            lineHeight: 1.35,
                            transition: 'color 0.2s',
                            padding: '0 0.25rem',
                          }}>
                            {t.outcome}
                          </p>
                      </button>
                      {/* Mobile inline quote — hidden on desktop */}
                      {isActive && (
                        <div className="np-inline-quote" style={{ padding: '0 1rem 1.25rem 1.25rem' }}>
                          <p style={{ ...serif, fontStyle: 'italic', fontSize: '14px', color: 'rgba(247,243,236,0.88)', lineHeight: 1.75, margin: '0 0 0.85rem' }}>
                            &ldquo;{t.quote.replace(/^[""]/, '').replace(/[""]$/, '')}&rdquo;
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Image src={t.photo} alt={tFirstName} width={44} height={44} style={{ borderRadius: 10, objectFit: 'cover', objectPosition: 'center 25%', flexShrink: 0, filter: photoGrade }} />
                            <div>
                              <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: P.bg, letterSpacing: '0.02em' }}>{tFirstName}</p>
                              <div style={{ color: P.rust, fontSize: '0.6rem', letterSpacing: '0.1em' }}>★★★★★</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>

          {/* Right: elevated quote card */}
          <div
            key={active}
            className="np-day-in np-changes-quote"
            style={{
              background: P.bg,
              borderRadius: 20,
              padding: '2.75rem 3rem 2.5rem',
              boxShadow: '0 24px 64px rgba(15,40,25,0.45), 0 4px 16px rgba(15,40,25,0.25)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Decorative open quote */}
            <div style={{
              ...serif, fontStyle: 'italic',
              fontSize: '5.5rem', lineHeight: 0.8,
              color: P.rust, opacity: 0.6,
              marginBottom: '0.5rem',
              userSelect: 'none',
            }}>
              &ldquo;
            </div>

            {/* Quote body — flex:1 + justify-center vertically centers between quote mark and divider */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{
                ...serif, fontStyle: 'italic', margin: 0,
                fontSize: 'clamp(14px, 1.15vw, 16px)',
                color: P.text, lineHeight: 1.95,
              }}>
                {item.quote.replace(/^[“”]/, '').replace(/[“”]$/, '')}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: P.rust, opacity: 0.25, margin: '2.25rem 0 1.5rem' }} />

            {/* Attribution — the member front and center: a big square portrait, like a printed photo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
              <Image
                src={item.photo}
                alt={firstName}
                width={80} height={80}
                style={{ borderRadius: 12, objectFit: 'cover', objectPosition: 'center 25%', flexShrink: 0, filter: photoGrade, boxShadow: '0 6px 18px rgba(40,27,13,0.18)' }}
              />
              <div>
                <p style={{ ...serif, margin: '0 0 0.2rem', fontSize: '17px', fontWeight: 500, color: P.text, letterSpacing: '-0.01em' }}>
                  {firstName}
                </p>
                <p style={{ margin: '0 0 0.35rem', fontSize: '11px', color: P.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Founding Member
                </p>
                <div style={{ color: P.rust, fontSize: '0.7rem', letterSpacing: '0.12em' }}>★★★★★</div>
              </div>
            </div>
          </div>

        </div>

        <Reveal style={{ marginTop: '5rem', textAlign: 'center' }}>
          <div className="np-changes-bottom">
          <p style={{
            ...serif, fontStyle: 'italic',
            fontSize: 'clamp(17px, 1.6vw, 21px)',
            fontWeight: 400, color: P.bg, lineHeight: 1.6,
            maxWidth: '55ch', margin: '0 auto',
          }}>
            You live more in alignment with what matters to you — feeling more present, more aware, and more compassionate along the way.
          </p>
          </div>
        </Reveal>

      </div>
    </section>
  )
}

// ── How ───────────────────────────────────────────────────────────────────────
function HowSection() {
  return (
    <section id="np-how" className="np-grain" style={{ background: P.bgWarm, padding: '8rem 3rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal style={{ marginBottom: '4.5rem' }}>
          <h2 style={{
            ...serif, margin: 0,
            fontSize: 'clamp(34px, 4.2vw, 52px)',
            fontWeight: 400, lineHeight: 1.08, color: P.text, letterSpacing: '-0.018em',
          }}>
            A simple rhythm, <em>designed to hold you.</em>
          </h2>
        </Reveal>

        <Reveal>
          <div style={{
            background: 'rgba(253,251,246,0.5)',
            border: `1px solid ${P.div}`,
            borderRadius: 12,
            overflow: 'hidden',
          }}>
            {STEPS.map((step, i) => (
              <div key={step.num} className="np-step np-how-step" style={{
                borderTop: i > 0 ? `1px solid ${P.div}` : 'none',
                padding: '2.4rem 2.5rem',
                display: 'grid', gridTemplateColumns: '5.5rem 1fr',
                gap: '2rem', alignItems: 'start',
              }}>
                <span className="np-step-num" style={{
                  ...serif, fontSize: 'clamp(2rem, 3vw, 3.5rem)',
                  color: '#BBA98C', fontWeight: 400, lineHeight: 1, paddingTop: '0.1rem',
                }}>
                  {step.num}
                </span>
                <div>
                  <h3 style={{ fontSize: '15.5px', fontWeight: 600, color: P.text, margin: '0 0 0.5rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: bodyText, lineHeight: 1.85, margin: 0 }}>{step.body}</p>
                  {step.aside && (
                    <p style={{
                      fontSize: '0.85rem', color: bodyText, lineHeight: 1.7,
                      margin: '0.9rem 0 0', fontStyle: 'italic',
                      paddingLeft: '1rem', borderLeft: '1px solid rgba(140,124,104,0.45)',
                    }}>
                      {step.aside}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal d={1}>
          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <a href="/quiz" style={{ textDecoration: 'none' }}>
              <button className="np-btn-accent" style={btnAccent}>
                Find your path →
              </button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section style={{ background: P.greenDeep, padding: '8rem 3rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <Reveal>
          <h2 style={{
            ...serif,
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            fontWeight: 400, lineHeight: 1.05,
            color: P.light, margin: '0 0 1.5rem',
            letterSpacing: '-0.018em',
          }}>
            You don&rsquo;t have to<br />do this alone.
          </h2>
        </Reveal>
        <Reveal d={1}>
          <p style={{
            ...serif, fontStyle: 'italic',
            fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)',
            color: P.accent, margin: '0 0 3.5rem',
          }}>
            Your people are here.
          </p>
        </Reveal>
        <Reveal d={2}>
          <a href="/quiz" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <button className="np-btn-light" style={{
              background: P.light, color: P.text, border: 'none',
              borderRadius: 100, padding: '18px 44px',
              fontSize: '16px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.02em',
            }}>
              Find your path →
            </button>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
type FAQItem = { q: string; paras: string[] }
type FAQCategory = { title: string; items: FAQItem[] }

function renderAnswer(paras: string[]) {
  const nodes: ReactNode[] = []
  let checkItems: string[] = []

  function flushChecks() {
    if (checkItems.length === 0) return
    nodes.push(
      <ul key={`ul-${nodes.length}`} style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {checkItems.map((item, i) => {
          const text = item.replace(/^✓\s*/, '')
          const colonIdx = text.indexOf(':')
          const hasTitle = colonIdx > 0 && colonIdx < 40
          return (
            <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', fontSize: '0.93rem', color: bodyText, lineHeight: 1.7 }}>
              <span style={{ color: P.green, fontWeight: 600, flexShrink: 0 }}>✓</span>
              <span>
                {hasTitle ? (
                  <><span style={{ color: P.green, fontWeight: 500 }}>{text.slice(0, colonIdx + 1)}</span>{text.slice(colonIdx + 1)}</>
                ) : text}
              </span>
            </li>
          )
        })}
      </ul>
    )
    checkItems = []
  }

  paras.forEach((p, i) => {
    if (p.startsWith('✓')) {
      checkItems.push(p)
    } else if (p.startsWith('HIGHLIGHT:')) {
      flushChecks()
      nodes.push(
        <p key={i} style={{
          ...serif, fontStyle: 'italic',
          fontSize: '1rem', color: P.rust, lineHeight: 1.6,
          margin: '1rem 0 0', fontWeight: 400,
        }}>
          {p.replace('HIGHLIGHT: ', '')}
        </p>
      )
    } else {
      flushChecks()
      const tokenRegex = /\[([^\]]+)\]\(([^)]+)\)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
      const inline: ReactNode[] = []
      let last = 0, m: RegExpExecArray | null
      while ((m = tokenRegex.exec(p)) !== null) {
        if (m.index > last) inline.push(p.slice(last, m.index))
        if (m[1] && m[2]) {
          inline.push(<a key={m.index} href={m[2]} target="_blank" rel="noopener noreferrer" style={{ color: P.rust, textDecoration: 'underline', textUnderlineOffset: '2px' }}>{m[1]}</a>)
        } else {
          inline.push(<a key={m.index} href={`mailto:${m[0]}`} style={{ color: P.rust, textDecoration: 'underline', textUnderlineOffset: '2px' }}>{m[0]}</a>)
        }
        last = m.index + m[0].length
      }
      if (last < p.length) inline.push(p.slice(last))
      nodes.push(
        <p key={i} style={{ fontSize: '0.93rem', color: bodyText, lineHeight: 1.8, margin: i === 0 ? '0' : '0.85rem 0 0' }}>
          {inline}
        </p>
      )
    }
  })
  flushChecks()
  return nodes
}

function AccordionItem({ item, itemKey, openKey, setOpenKey }: {
  item: FAQItem
  itemKey: string
  openKey: string | null
  setOpenKey: (key: string | null) => void
}) {
  const isOpen = openKey === itemKey
  return (
    <div style={{
      background: P.bgWarm,
      border: `1px solid ${isOpen ? P.rust : P.div}`,
      borderRadius: 14,
      overflow: 'hidden',
      transition: 'border-color .2s',
    }}>
      <button
        onClick={() => setOpenKey(isOpen ? null : itemKey)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          cursor: 'pointer', padding: '1.75rem 2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem',
        }}
      >
        <span style={{
          ...serif, fontSize: 'clamp(15px, 1.2vw, 17px)',
          fontWeight: isOpen ? 500 : 400,
          color: P.text, lineHeight: 1.4,
        }}>
          {item.q}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{
            flexShrink: 0, color: isOpen ? P.rust : P.muted,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform .25s, color .2s',
          }}
        >
          <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <div style={{ padding: '0 2rem 2rem' }}>
          {renderAnswer(item.paras)}
        </div>
      )}
    </div>
  )
}

const FAQ_TOP: FAQItem[] = [
  {
    q: 'What exactly is Somenta?',
    paras: [
      "Somenta is an online, peer-supported digital sanctuary designed to help you integrate profound insights and live in balance.",
      "Our framework is built on a unique blend of holistic integration, peer support, and somatic (body-based) practices — such as breathwork, guided meditation, and Yoga Nidra — designed to gently regulate your nervous system and help you build supportive daily rhythms.",
    ],
  },
  {
    q: "I'm already busy. How much time does this take, and will I fall behind?",
    paras: [
      "Your baseline commitment is just over an hour a week: a 60-minute Live Class and four bite-sized, 2-minute daily check-ins designed to restore your energy instead of draining it.",
      "Please know there is no \"falling behind\" here. Our flexible participation naturally builds in \"permission to fail,\" meaning you can engage on your own terms without ever experiencing guilt if you miss a few days.",
    ],
  },
  {
    q: "How is Somenta different from meditation or breathwork apps?",
    paras: [
      "Most wellness apps are solo content libraries that rely entirely on your own willpower. Somenta removes this heavy mental friction by giving you a single, curated daily rhythm.",
      "And the best part is, you aren't doing it alone. You are anchored by an action-oriented community — giving you the live peer accountability and human connection required to make your insights land permanently.",
    ],
  },
  {
    q: "What is an Intimate Peer Pod?",
    paras: [
      "Our Intimate Peer Pod is a 12-week facilitated share circle sprint designed for deep, reflective work. When you join a Pod, you are carefully matched with a small group of 8 to 10 peers and an expert facilitator.",
      "Because you meet with the exact same trusted people each week, you build a profound level of emotional safety and peer accountability.",
      "It is the perfect tier for anyone ready to go beyond solo practices to safely process what is surfacing with a dedicated group of peers who truly understand the journey.",
    ],
  },
]

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    title: 'The Somenta Experience',
    items: [
      {
        q: "What is integration, and do I really need it?",
        paras: [
          "Yes. Integration is the vital, ongoing practice of translating the insights from a profound journey into your everyday reality.",
          "A journey or retreat acts as a beautiful catalyst that plants a seed for change, but even the most blissful experiences will naturally fade without the structured, daily intention required to help that seed grow.",
        ],
      },
      {
        q: "Is Somenta a replacement for traditional therapy?",
        paras: [
          "No, Somenta is designed to be a gentle, action-oriented complement to your therapy, not a replacement.",
          "While traditional therapy is a vital tool for exploring your past and treating specific symptoms, Somenta is an action-oriented community built to help your insights land.",
          "We focus on your present and future through:",
          "✓ Gentle daily practices to calm your nervous system.",
          "✓ A holistic approach to align the six core areas of your life.",
          "✓ Community connection to surround you with peers who truly understand your journey.",
          "We provide the peer connection and somatic practices to help you actively apply your insights today. Please note that we do not provide clinical psychotherapy or medical advice.",
        ],
      },
      {
        q: "Will Somenta cure my anxiety, overwhelm, or disconnect?",
        paras: [
          "While there is no overnight \"cure,\" Somenta is lovingly designed to support you through these exact struggles.",
          "Profound journeys are beautiful catalysts for change, but they don't do the daily work for you. Somenta provides the accessible somatic practices and intimate community support you need to:",
          "✓ Gently process heavy emotions",
          "✓ Safely release trapped tension",
          "✓ Build a lasting, heartfelt connection to yourself and others",
        ],
      },
    ],
  },
  {
    title: 'Your Time & Daily Practices',
    items: [
      {
        q: "What happens during the Live Weekly Class?",
        paras: [
          "This is where our community comes together in real time.",
          "In these 60-minute live sessions, an expert facilitator guides the group through deep somatic practices like meditation, breathwork, and Yoga Nidra, and then opens up intimate breakout rooms.",
          "While there might be a brief moment for journaling at the end, the focus is on body-based healing and providing a safe, structured space to share and build deep connections with peers who understand exactly what you are going through.",
        ],
      },
      {
        q: "What exactly happens in the Practice Room?",
        paras: [
          "The Practice Room is your private, digital sanctuary. Twice a week, you will log into a virtual room alongside other community members.",
          "A facilitator will gently guide the group by playing a 2-minute somatic audio to calm your nervous system. For your first session of the week, you will be given a 3-minute, highly focused journal prompt. During your second session later in the week, you will use that same calm state to gently reflect on how that prompt is going.",
          "It is bite-sized, frictionless, and incredibly restorative. You can do these 5-minute practices anywhere:",
          "✓ At your desk",
          "✓ On your couch",
          "✓ Even in your parked car",
        ],
      },
      {
        q: "Do I need prior experience with somatic practices, journaling, or meditation?",
        paras: [
          "Absolutely not. You do not need any prior experience to feel at home here.",
          "\"Somatic\" simply means body-based, and every exercise we offer is fully guided. Our journal prompts are highly specific and take less than 3 minutes, so you will never be left staring at a blank page.",
          "We only ask that you join our live classes from a quiet, undisturbed space where your nervous system can completely relax.",
        ],
      },
    ],
  },
  {
    title: 'Membership, Safety, & Support',
    items: [
      {
        q: "How much does it cost, and am I locked into a contract?",
        paras: [
          "Membership begins at $25/month, but we offer a $10/month introductory rate for your first 3 months so you can establish your daily rhythm without financial pressure.",
          "You are never locked in. You can cancel anytime, or use our \"Pause\" feature to step away for a month to integrate on your own and return right where you left off.",
          "We also offer a free Find Your Path Assessment to recommend the exact tier of support that feels best for you right now.",
        ],
      },
      {
        q: "Is the community private and safe?",
        paras: [
          "Yes. Deep inner work requires absolute emotional safety.",
          "What is shared in the community stays in the community, and we have strict, heavily moderated guidelines to protect your identity and ensure confidentiality.",
          "Because this is a peer-supported community, it is not suitable for individuals experiencing severe psychiatric crises or active trauma.",
        ],
      },
      {
        q: "Who is Somenta not for?",
        paras: [
          "Somenta is a peer-supported community, not a clinical crisis center. It is not suitable for individuals currently experiencing severe psychiatric crises, active trauma, or those seeking a replacement for acute medical care.",
        ],
      },
    ],
  },
]

const FAQ_FOOTER: FAQItem = {
  q: "What if I still have questions before joining?",
  paras: [
    "We'd love to help!",
    "You can send us an email at hello@joinsomenta.com, or schedule a quick, 15-minute alignment call with our team here: [Click to schedule a call](https://calendly.com/jake-joinsomenta/30min).",
    "We are here to help you decide if Somenta feels like the right fit for your journey.",
  ],
}

function FAQSection() {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  return (
    <section id="np-faq" className="np-grain" style={{ background: P.bg, padding: '8rem 3rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Reveal style={{ marginBottom: '4rem' }}>
          <p style={{ ...eyebrow, marginBottom: '0.85rem' }}>FAQ</p>
          <h2 style={{
            ...serif, margin: 0,
            fontSize: 'clamp(34px, 4.2vw, 52px)',
            fontWeight: 400, lineHeight: 1.08, color: P.text, letterSpacing: '-0.018em',
          }}>
            Still have questions?
          </h2>
        </Reveal>

        {/* Top 5 questions — always visible */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {FAQ_TOP.map((item) => (
            <AccordionItem key={item.q} item={item} itemKey={`top-${item.q}`} openKey={openKey} setOpenKey={setOpenKey} />
          ))}
        </div>

        {/* Show All button — only when collapsed */}
        {!showAll && (
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <button
              onClick={() => setShowAll(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: P.text,
                textDecoration: 'underline', textUnderlineOffset: '4px',
                textDecorationColor: P.div, padding: 0,
              }}
            >
              Show All
            </button>
          </div>
        )}

        {/* Categorized questions + footer + Show Less — visible after Show All */}
        {showAll && (
          <>
            <div style={{ marginTop: '3.5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {FAQ_CATEGORIES.map((cat) => (
                <div key={cat.title}>
                  <p style={{
                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em',
                    textTransform: 'uppercase', color: P.muted,
                    margin: '0 0 1.25rem', paddingBottom: '0.85rem',
                    borderBottom: `1px solid ${P.div}`,
                  }}>
                    {cat.title}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {cat.items.map((item) => (
                      <AccordionItem key={item.q} item={item} itemKey={`cat-${item.q}`} openKey={openKey} setOpenKey={setOpenKey} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: `1px solid ${P.div}` }}>
              <AccordionItem item={FAQ_FOOTER} itemKey="footer" openKey={openKey} setOpenKey={setOpenKey} />
            </div>
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <button
                onClick={() => setShowAll(false)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: P.text,
                  textDecoration: 'underline', textUnderlineOffset: '4px',
                  textDecorationColor: P.div, padding: 0,
                }}
              >
                Show Less
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function FooterSection() {
  return (
    <footer style={{
      background: P.bg, borderTop: `1px solid ${P.div}`,
      padding: '2.25rem 3rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '1rem',
    }}>
      <span style={{ ...serif, fontSize: '1rem', color: P.text, fontWeight: 400 }}>Somenta</span>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <a href="/terms" style={{ fontSize: '0.78rem', color: P.muted, textDecoration: 'none' }}>Terms of Service</a>
        <a href="/privacy" style={{ fontSize: '0.78rem', color: P.muted, textDecoration: 'none' }}>Privacy Policy</a>
        <a href="/member-agreement" style={{ fontSize: '0.78rem', color: P.muted, textDecoration: 'none' }}>Member Agreement</a>
        <a href="mailto:hello@joinsomenta.com" style={{ fontSize: '0.78rem', color: P.muted, textDecoration: 'none' }}>hello@joinsomenta.com</a>
      </div>
      <span style={{ fontSize: '0.72rem', color: P.muted }}>&copy; 2026 Somenta LLC</span>
    </footer>
  )
}

// ── Schema ────────────────────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What exactly is Somenta?', acceptedAnswer: { '@type': 'Answer', text: 'Somenta is an online, peer-supported digital sanctuary designed to help you integrate profound insights and live in balance. Our framework is built on a unique blend of holistic integration, peer support, and somatic (body-based) practices — such as breathwork, guided meditation, and Yoga Nidra — designed to gently regulate your nervous system and help you build supportive daily rhythms.' } },
    { '@type': 'Question', name: 'How much does Somenta cost?', acceptedAnswer: { '@type': 'Answer', text: 'Foundation membership begins at $10/month for your first 3 months (then $25/month). The Intimate Peer Pod begins at $40/month for your first 3 months (then $60/month). You can cancel or pause anytime.' } },
    { '@type': 'Question', name: 'How much time does Somenta take each week?', acceptedAnswer: { '@type': 'Answer', text: 'Your baseline commitment is just over an hour a week: a 60-minute Live Class and four bite-sized, 2-minute daily check-ins. There is no falling behind — flexible participation builds in permission to miss days without guilt.' } },
    { '@type': 'Question', name: 'How is Somenta different from meditation or breathwork apps?', acceptedAnswer: { '@type': 'Answer', text: 'Most wellness apps are solo content libraries that rely entirely on your own willpower. Somenta removes this friction by giving you a single curated daily rhythm anchored by a live peer community — giving you the accountability and human connection required to make your insights land permanently.' } },
    { '@type': 'Question', name: 'What is an Intimate Peer Pod?', acceptedAnswer: { '@type': 'Answer', text: 'An Intimate Peer Pod is a 12-week facilitated share circle sprint designed for deep, reflective work. You are carefully matched with a small group of 8 to 10 peers and an expert facilitator, meeting with the same trusted people each week to build profound emotional safety and peer accountability.' } },
    { '@type': 'Question', name: 'Is Somenta a replacement for therapy?', acceptedAnswer: { '@type': 'Answer', text: 'No. Somenta is designed to be a gentle, action-oriented complement to therapy, not a replacement. We focus on present and future integration through daily somatic practices, community connection, and peer accountability. We do not provide clinical psychotherapy or medical advice.' } },
    { '@type': 'Question', name: 'Who is Somenta for?', acceptedAnswer: { '@type': 'Answer', text: 'Somenta is for adults navigating life after a transformative retreat — including plant medicine journeys, breathwork intensives, silent meditation retreats, or other profound experiential therapy — who want structured support to translate their insights into lasting everyday change.' } },
    { '@type': 'Question', name: 'Is the community private and safe?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. What is shared in the community stays in the community. We have strict, heavily moderated guidelines to protect your identity and ensure confidentiality. Share Circles and pod sessions are never recorded.' } },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function NewPage() {
  // Capture traffic source (?src=reddit etc.) so the quiz can attribute the
  // submission even when the visitor lands here first
  useEffect(() => {
    const src = new URLSearchParams(window.location.search).get('src')
    if (src) sessionStorage.setItem('somenta_src', src)
  }, [])

  return (
    <div style={{
      background: P.bg, color: P.text,
      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <ExitPopup />
      <Nav />
      <main>
        <Hero />
        <WhoSection />
        <PhilosophySection />
        <PracticeSection />
        <ScheduleSection />
        <ChangesSection />
        <HowSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <FooterSection />
    </div>
  )
}
