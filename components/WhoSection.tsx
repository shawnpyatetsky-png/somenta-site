'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WHO_ITEMS = [
  {
    title: 'Losing the afterglow',
    body: 'You have profound insights, but struggle to translate them into everyday life as old routines pull you back in.',
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="#D9A441" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="50" cy="50" r="12" fill="#D9A441" />
        <line x1="50" y1="18" x2="50" y2="10" />
        <line x1="50" y1="90" x2="50" y2="82" />
        <line x1="18" y1="50" x2="10" y2="50" />
        <line x1="90" y1="50" x2="82" y2="50" />
        <line x1="27" y1="27" x2="22" y2="22" />
        <line x1="78" y1="78" x2="73" y2="73" />
        <line x1="27" y1="73" x2="22" y2="78" />
        <line x1="78" y1="22" x2="73" y2="27" />
        <g strokeDasharray="1 3">
          <line x1="50" y1="28" x2="50" y2="20" />
          <line x1="50" y1="80" x2="50" y2="72" />
          <line x1="28" y1="50" x2="20" y2="50" />
          <line x1="80" y1="50" x2="72" y2="50" />
          <line x1="33" y1="33" x2="27" y2="27" />
          <line x1="73" y1="73" x2="67" y2="67" />
          <line x1="33" y1="67" x2="27" y2="73" />
          <line x1="73" y1="27" x2="67" y2="33" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Navigating the overwhelm',
    body: 'You had a deeply opening experience, but struggle to stay grounded as intense emotions surface in daily life.',
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="#D9A441" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20,40 C24,30 36,28 42,36 C48,44 30,48 28,38 C26,28 40,24 48,32 C54,38 42,46 38,40 C34,34 46,28 52,36 C56,42 44,48 44,42 C44,36 58,34 62,44 C66,54 52,58 50,48 C48,40 62,42 68,52" />
        <path d="M68,52 C74,54 82,58 88,62" />
      </svg>
    ),
  },
  {
    title: 'Feeling the disconnect',
    body: "Your internal world shifted, but your environment hasn't, leaving you feeling alienated from the people in your life.",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="#D9A441" strokeWidth="1.5" strokeLinecap="round">
        <path d="M30,68 L50,30 L70,68 Z" />
        <circle cx="30" cy="68" r="2.5" fill="#D9A441" />
        <circle cx="50" cy="30" r="2.5" fill="#D9A441" />
        <circle cx="70" cy="68" r="2.5" fill="#D9A441" />
        <circle cx="82" cy="32" r="3.5" fill="#D9A441" />
      </svg>
    ),
  },
  {
    title: 'Living in your head',
    body: 'You realize your stuckness lives in your body, and trying to figure everything out in your head is no longer working.',
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="#D9A441" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30,82 C28,70 22,66 22,54 C22,38 34,24 50,24 C66,24 76,36 76,50 C76,60 70,62 68,68 L66,78 L60,82 Z" />
        <rect x="38" y="40" width="26" height="26" />
        <line x1="38" y1="50" x2="64" y2="50" />
        <line x1="38" y1="58" x2="64" y2="58" />
        <line x1="47" y1="40" x2="47" y2="66" />
        <line x1="55" y1="40" x2="55" y2="66" />
      </svg>
    ),
  },
]

export default function WhoSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.who-head', {
        opacity: 0,
        y: 32,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.who-head',
          start: 'top 85%',
        },
      })

      gsap.from('.who-item', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.who-grid',
          start: 'top 80%',
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section className="who" id="who" ref={containerRef}>
      <div className="who-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="who-head">
          <div className="eyebrow on-dark">Who it&rsquo;s for</div>
          <h2>
            For anyone returning from a <em>transformative retreat.</em>
          </h2>
        </div>
        <div className="who-grid">
          {WHO_ITEMS.map(item => (
            <div key={item.title} className="who-item">
              <div className="who-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="who-divider" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
