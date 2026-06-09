'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from(['.final-h2', '.final-sub', '.final-btn'], {
        opacity: 0,
        y: 28,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
      })
    },
    { scope: containerRef }
  )

  return (
    <section className="final-cta" id="final-cta" ref={containerRef}>
      <div className="wrap">
        <h2 className="final-h2">
          You don&rsquo;t have to
          <br />
          do this alone.
        </h2>
        <div className="sub final-sub">
          <em>Your people are here.</em>
        </div>
        <div className="button-stack final-btn">
          <button className="cta-pill on-forest">Find your path</button>
        </div>
      </div>
    </section>
  )
}
