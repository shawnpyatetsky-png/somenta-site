'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 })

      tl.from('.hero-eyebrow', {
        opacity: 0,
        y: 18,
        duration: 0.75,
        ease: 'power3.out',
      })
        .from(
          '.hero-h1',
          { opacity: 0, y: 28, duration: 1.0, ease: 'power3.out' },
          '-=0.45'
        )
        .from(
          '.hero-lede',
          { opacity: 0, y: 18, duration: 0.75, ease: 'power3.out' },
          '-=0.55'
        )
        .from(
          '.hero-cta',
          { opacity: 0, y: 14, duration: 0.65, ease: 'power3.out' },
          '-=0.45'
        )
        .from(
          '.hero-quote',
          { opacity: 0, y: 12, duration: 0.8, ease: 'power3.out' },
          '-=0.35'
        )

    },
    { scope: containerRef }
  )

  return (
    <section className="hero" id="hero" ref={containerRef}>
      <div
        id="hero-photo"
        className="hero-photo"
        role="img"
        aria-label="Misty forest valley at dawn"
        style={{
          backgroundImage: `linear-gradient(rgba(46,91,68,0.55), rgba(46,91,68,0.6)), url('/assets/hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="hero-inner">
        <div className="eyebrow on-dark hero-eyebrow">
          The retreat is over. Now comes the hard part.
        </div>

        <h1 className="hero-h1">
          Membership community for <em>life integration.</em>
        </h1>

        <p className="lede hero-lede">
          We provide the structured weekly practices, live classes, and community
          accountability you need to translate profound insights into everyday reality.
        </p>

        <button className="cta-pill on-forest hero-cta">
          Find your path →
        </button>

        <div className="hero-quote">
          &ldquo;To be in a space with people who <em>get it</em> — I have been craving this
          for years.&rdquo;
          <span className="name">— Holly, Founding Member</span>
        </div>
      </div>
    </section>
  )
}
