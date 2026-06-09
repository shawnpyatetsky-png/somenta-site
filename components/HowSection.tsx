'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'Take the assessment',
    body: 'Take our 2-minute quiz to see if Somenta is right for you. If it\'s a mutual fit, we will invite you to a free, private Introductory Class to safely experience our facilitation style before you choose your level of commitment.',
    aside: null,
  },
  {
    num: '02',
    title: 'Join your Pod',
    body: 'We will place you into an intimate 8-to-10 person group for your live weekly circles. Led by an expert facilitator, this is your dedicated space to share your journey, integrate your insights, and be truly seen.',
    aside: 'If you need a lighter commitment, you can also join our Foundation tier to access classes and events without a pod.',
  },
  {
    num: '03',
    title: 'Show up weekly',
    body: 'Engage with live practices and guided reflections that help you stay connected to what matters.',
    aside: null,
  },
  {
    num: '04',
    title: 'Stay connected',
    body: 'Between sessions, your community is always there.',
    aside: null,
  },
]

export default function HowSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.how-head', {
        opacity: 0,
        y: 28,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.how-head', start: 'top 85%' },
      })
      gsap.from('.how-step', {
        opacity: 0,
        y: 20,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.how-list', start: 'top 82%' },
      })
    },
    { scope: containerRef }
  )

  return (
    <section className="how" id="how" ref={containerRef}>
      <div className="wrap">
        <div className="how-head">
          <div className="eyebrow">How it works</div>
          <h2>
            A simple rhythm, <em>designed to hold you.</em>
          </h2>
        </div>

        <div className="how-list">
          {STEPS.map(step => (
            <div key={step.num} className="how-step">
              <div className="num">{step.num}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {step.aside && <p className="aside">{step.aside}</p>}
              </div>
              <div className="arrow" aria-hidden="true">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
