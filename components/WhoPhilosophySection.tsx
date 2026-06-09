'use client'

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type TabKey = 'who' | 'philosophy'

const WHO_ITEMS = [
  {
    title: 'Losing the afterglow',
    body: 'You have profound insights, but struggle to translate them into everyday life as old routines pull you back in.',
    icon: <img src="/assets/afterglow%20icon.png" alt="" width={64} height={64} />,
  },
  {
    title: 'Navigating the overwhelm',
    body: 'You had a deeply opening experience, but struggle to stay grounded as intense emotions surface in daily life.',
    icon: <img src="/assets/overwhelm%20icon.png" alt="" width={64} height={64} />,
  },
  {
    title: 'Feeling the disconnect',
    body: "Your internal world shifted, but your environment hasn't, leaving you feeling alienated from the people in your life.",
    icon: <img src="/assets/disconnect%20icon.png" alt="" width={64} height={64} />,
  },
  {
    title: 'Living in your head',
    body: 'You realize your stuckness lives in your body, and trying to figure everything out in your head is no longer working.',
    icon: <img src="/assets/stuck%20in%20head%20icon.png" alt="" width={64} height={64} />,
  },
]

function WhoPanel() {
  return (
    <>
      <div className="who-head">
        <h2>
          For anyone returning from a <em>transformative retreat.</em>
        </h2>
      </div>
      <div className="who-grid" role="list">
        {WHO_ITEMS.map(item => (
          <div key={item.title} className="who-item" role="listitem">
            <div className="who-icon" aria-hidden="true">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </>
  )
}

function PhilosophyPanel() {
  return (
    <div className="philosophy-inner">
      <h2>
        You cannot integrate <em>in isolation.</em>
      </h2>
      <p className="lead">
        Profound experiences can leave us feeling disconnected from the everyday world.
        We make the most sense of our journeys when we are truly seen and heard by others.
      </p>
    </div>
  )
}

export default function WhoPhilosophySection() {
  const [active, setActive] = useState<TabKey>('who')
  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isFirstMount = useRef(true)

  // Scroll-triggered entrance for the tab bar and initial content
  useGSAP(
    () => {
      gsap.from('.wp-tabs-bar', {
        opacity: 0,
        y: 18,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.wp-tabs-bar', start: 'top 88%' },
      })
      gsap.from('.wp-content-wrap', {
        opacity: 0,
        y: 26,
        duration: 0.82,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.wp-content-wrap', start: 'top 84%' },
      })
      gsap.from('.who-item', {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.who-grid', start: 'top 82%' },
      })
    },
    { scope: containerRef }
  )

  /*
   * Tab-switch animation — fires after React commits the new panel to the DOM.
   * duration: 0.18s (180ms) keeps us well under the 400ms Doherty Threshold,
   * so the switch feels instant yet polished.
   * Skip initial mount: entrance is already handled by the scroll trigger above.
   */
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    if (!contentRef.current) return
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 7 },
      {
        opacity: 1,
        y: 0,
        duration: 0.18,
        ease: 'power2.out',
        clearProps: 'transform',
      }
    )
  }, [active])

  return (
    <section
      className="who-philosophy"
      id="who"
      ref={containerRef}
      aria-label="Who Somenta is for and our philosophy"
    >
      <div className="who-glow" aria-hidden="true" />

      <div className="wrap">
        {/* Tab bar */}
        <div className="wp-tabs-bar" role="tablist" aria-label="Section">
          <button
            role="tab"
            className={`wp-tab${active === 'who' ? ' active' : ''}`}
            aria-selected={active === 'who'}
            aria-controls="wp-panel-who"
            id="wp-tab-who"
            onClick={() => setActive('who')}
          >
            Who it&rsquo;s for
          </button>
          <button
            role="tab"
            className={`wp-tab${active === 'philosophy' ? ' active' : ''}`}
            aria-selected={active === 'philosophy'}
            aria-controls="wp-panel-philosophy"
            id="wp-tab-philosophy"
            onClick={() => setActive('philosophy')}
          >
            The philosophy
          </button>
        </div>

        {/* Content panel */}
        <div
          className="wp-content-wrap"
          ref={contentRef}
          role="tabpanel"
          id={active === 'who' ? 'wp-panel-who' : 'wp-panel-philosophy'}
          aria-labelledby={active === 'who' ? 'wp-tab-who' : 'wp-tab-philosophy'}
        >
          {active === 'who' ? <WhoPanel /> : <PhilosophyPanel />}
        </div>
      </div>
    </section>
  )
}
