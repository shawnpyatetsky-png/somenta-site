'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    num: 'i.',
    title: 'Guided Classes',
    body: 'Live weekly meditation and somatic practices to help you stay grounded, present, and out of your head.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#2E4A3E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 C 7 8, 7 14, 12 21 C 17 14, 17 8, 12 3 Z" />
        <circle cx="12" cy="12" r="1" fill="#2E4A3E" />
      </svg>
    ),
  },
  {
    num: 'ii.',
    title: 'Weekly Focus',
    body: 'Weekly themes, prompts, and practices to help you translate your insights into lasting change.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#2E4A3E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2 C 8 2, 5 5, 5 9 C 5 12, 7 14, 8 15 L 8 18 L 16 18 L 16 15 C 17 14, 19 12, 19 9 C 19 5, 16 2, 12 2 Z" />
      </svg>
    ),
  },
  {
    num: 'iii.',
    title: 'Integration Circles',
    body: 'Small, facilitated groups to process what is surfacing — with the same trusted people each time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#2E4A3E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="7" r="2.4" />
        <circle cx="18" cy="7" r="2.4" />
        <circle cx="12" cy="17" r="2.4" />
        <line x1="8" y1="8" x2="10.5" y2="15" />
        <line x1="16" y1="8" x2="13.5" y2="15" />
      </svg>
    ),
  },
  {
    num: 'iv.',
    title: 'The Practice Room',
    body: 'A quiet, dedicated space to journal and reflect alongside others who are showing up too.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#2E4A3E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
      </svg>
    ),
  },
  {
    num: 'v.',
    title: 'Connection Events',
    body: 'Casual gatherings to form real, lasting relationships through conversations that actually matter.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#2E4A3E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 10 C 8 7, 16 7, 16 10 C 16 13, 12 14, 12 17" />
        <circle cx="12" cy="20" r="0.8" fill="#2E4A3E" />
        <path d="M5 15 C 5 18, 19 18, 19 15" />
      </svg>
    ),
  },
  {
    num: 'vi.',
    title: 'Guest Sessions',
    body: 'Fresh modalities and perspectives from thoughtful, expert facilitators.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#2E4A3E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3" />
        <path d="M5 21 C 5 16, 9 14, 12 14 C 15 14, 19 16, 19 21" />
        <circle cx="12" cy="4" r="0.6" fill="#2E4A3E" />
      </svg>
    ),
  },
]

export default function ValueSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.value-intro', {
        opacity: 0,
        y: 30,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.value-intro',
          start: 'top 82%',
        },
      })

      gsap.from('.feat', {
        opacity: 0,
        y: 24,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.feat-grid',
          start: 'top 80%',
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section className="value" id="value" ref={containerRef}>
      <div className="wrap">
        <div className="value-grid">
          <div className="value-intro">
            <div className="eyebrow">The practice</div>
            <h2>
              <span style={{ whiteSpace: 'nowrap' }}>A compassionate,</span>{' '}
              <em>safe place to land.</em>
            </h2>
            <p className="sub">Welcome to Somenta.</p>
            <p className="body">
              We are so much more than <em>just</em> a community. Think of Somenta as a
              living rhythm of practice, reflection, and real support. A real space to
              breathe, reflect, and grow alongside people who actually understand what you
              are going through — and are showing up with that exact same intention.
            </p>
            <button className="value-cta">Find your path →</button>
          </div>

          <div className="feat-grid">
            {FEATURES.map(feat => (
              <div key={feat.title} className="feat">
                <span className="feat-num">{feat.num}</span>
                <div className="feat-icon">{feat.icon}</div>
                <h3>{feat.title}</h3>
                <p>{feat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
