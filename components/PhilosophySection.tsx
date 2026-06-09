'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PhilosophySection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.philosophy-inner', {
        opacity: 0,
        y: 36,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.philosophy-inner',
          start: 'top 80%',
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section className="philosophy" id="philosophy" ref={containerRef}>
      <div className="wrap">
        <div className="philosophy-inner">
          <div className="eyebrow">The philosophy</div>
          <h2>
            You cannot integrate <em>in isolation.</em>
          </h2>
          <p className="lead">
            Profound experiences can leave us feeling disconnected from the everyday
            world. We make the most sense of our journeys when we are truly seen and
            heard by others.
          </p>
        </div>
      </div>
    </section>
  )
}
