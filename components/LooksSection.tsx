'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type PanelKey = 'monday' | 'wednesday' | 'thursday' | 'sunday'

interface PanelData {
  label: string
  title: string
  body: string
  who: string
  when: string
  where: string
  s1: { day: string; title: string; body: string; when: string }
  s2: { day: string; title: string; body: string; when: string }
}

const PANELS: Record<PanelKey, PanelData> = {
  monday: {
    label: 'Monday morning · Live class',
    title: 'Landing the week. A somatic practice for re-entry.',
    body: 'Thirty minutes of guided breath and movement to set the nervous system for the week ahead. No prior experience required — just bring yourself, a blanket, and a willingness to land.',
    who: 'Led by Maya R.',
    when: '7:00–7:45 AM PT',
    where: 'Zoom, members-only',
    s1: {
      day: 'Also Monday',
      title: 'Weekly Focus drops',
      body: 'A new theme lands in your inbox — something to sit with, write about, and bring into your practice all week.',
      when: 'THEME · RELANDING',
    },
    s2: {
      day: 'Rolling',
      title: 'Practice Room is open',
      body: 'A quiet, shared journaling window. Silent co-presence — you show up, others do too, and the work gets done.',
      when: '3× DAILY',
    },
  },
  wednesday: {
    label: 'Wednesday evening · Integration circle',
    title: 'Small, facilitated groups where the real processing happens.',
    body: 'Your pod of 8–10 gathers for ninety minutes of structured share. A trained facilitator holds the container. You speak. You listen. You leave less alone.',
    who: 'Your dedicated facilitator',
    when: '6:30–8:00 PM PT',
    where: 'Pod room (Zoom)',
    s1: {
      day: 'Tuesday prep',
      title: 'Prompts arrive',
      body: 'A short reflection drops the day before, so you arrive knowing what you want to bring into the circle.',
      when: '24H BEFORE',
    },
    s2: {
      day: 'After circle',
      title: 'Integration notes',
      body: 'A private space to capture what landed, so next week\'s practice meets you where you actually are.',
      when: 'OPTIONAL',
    },
  },
  thursday: {
    label: 'Thursday · Guest session',
    title: 'Fresh modalities from thoughtful, expert facilitators.',
    body: 'A rotating roster of practitioners — somatic experiencing, IFS, breathwork, ecstatic dance — bring their craft into the space. You try something new, without the awkwardness of a first-time class.',
    who: 'Rotating guest teachers',
    when: '5:30–6:45 PM PT',
    where: 'Main hall (Zoom)',
    s1: {
      day: 'This week',
      title: 'Breathwork with Elan',
      body: 'A conscious-connected breath session. Come ready to move and be moved.',
      when: 'GUEST · ELAN',
    },
    s2: {
      day: 'Next week',
      title: 'IFS primer with Jo',
      body: 'An intro to parts work — gentle, grounded, practical. No prior experience needed.',
      when: 'PREVIEW',
    },
  },
  sunday: {
    label: 'Sunday evening · Connection',
    title: 'Casual gatherings. Real conversations. No agenda.',
    body: "An unstructured hour to catch up, ask questions, or just co-exist with your people. Some weeks it's tea + talk. Some weeks it's a walk you do from your own trail. All weeks, you're not alone.",
    who: 'Hosted by the community',
    when: '7:00–8:00 PM PT',
    where: 'Casual room',
    s1: {
      day: 'Anytime',
      title: 'Ask the community',
      body: "A thread-based space to ask questions and share what's alive. Not a firehose — a slow, thoughtful exchange.",
      when: 'ASYNC',
    },
    s2: {
      day: 'Monthly',
      title: 'In-person meetup',
      body: 'Members organize local walks, dinners, and sits in SF, NYC, LA, Portland, and Berlin.',
      when: 'OPT-IN',
    },
  },
}

const TABS: { key: PanelKey; label: string }[] = [
  { key: 'monday', label: 'Monday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'sunday', label: 'Sunday' },
]

export default function LooksSection() {
  const [active, setActive] = useState<PanelKey>('monday')
  const panelRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.looks-head', {
        opacity: 0,
        y: 28,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.looks-head', start: 'top 85%' },
      })
      gsap.from('.looks-tabs', {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.looks-tabs', start: 'top 88%' },
      })
      gsap.from('.looks-panel', {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.looks-panel', start: 'top 85%' },
      })
    },
    { scope: containerRef }
  )

  function switchTab(key: PanelKey) {
    if (key === active) return
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current.children,
        { opacity: 0.4, y: 8 },
        { opacity: 1, y: 0, duration: 0.26, ease: 'power2.out', stagger: 0.05 }
      )
    }
    setActive(key)
  }

  const data = PANELS[active]

  return (
    <section className="looks" id="looks" ref={containerRef}>
      <div className="wrap">
        <div className="looks-head">
          <div className="eyebrow on-dark">What it looks like</div>
          <h2>
            Real people. Real practice. <em>Every week.</em>
          </h2>
          <p className="sub">
            Small groups. Consistent rhythm. Space to reflect, share, and actually do
            the work.
          </p>
        </div>

        <div className="looks-tabs">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`looks-tab${active === tab.key ? ' active' : ''}`}
              onClick={() => switchTab(tab.key)}
              aria-pressed={active === tab.key}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="looks-panel" ref={panelRef}>
          <div className="looks-hero">
            <div className="looks-hero-inner">
              <div className="looks-label">{data.label}</div>
              <h3>{data.title}</h3>
              <p>{data.body}</p>
            </div>
            <div className="looks-meta">
              <div>
                <strong>{data.who}</strong>
                Integration facilitator
              </div>
              <div>
                <strong>{data.when}</strong>
                Live + recorded
              </div>
              <div>
                <strong>{data.where}</strong>
                Join by link
              </div>
            </div>
          </div>

          <div className="looks-side">
            <div className="looks-card">
              <div className="cornerdot" />
              <div>
                <div className="day">{data.s1.day}</div>
                <h4>{data.s1.title}</h4>
                <p>{data.s1.body}</p>
              </div>
              <div className="when">
                <span>{data.s1.when}</span>
              </div>
            </div>
            <div className="looks-card">
              <div
                className="cornerdot"
                style={{
                  background: '#B7C9B9',
                  boxShadow: '0 0 0 4px rgba(183,201,185,0.2)',
                }}
              />
              <div>
                <div className="day">{data.s2.day}</div>
                <h4>{data.s2.title}</h4>
                <p>{data.s2.body}</p>
              </div>
              <div className="when">
                <span>{data.s2.when}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
