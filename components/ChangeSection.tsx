'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHANGE_ITEMS = [
  {
    idx: 'Outcome 02',
    outcome: 'You integrate insights instead of losing them.',
    body: '"The reflection and constant reminder of my experience and how to land it best in my daily life. Having that is extremely valuable and allows it not to fall by the wayside."',
    name: '— Damon, Founding Member',
  },
  {
    idx: 'Outcome 03',
    outcome: 'You stop overthinking and start taking clear action.',
    body: '"It\'s a group to help keep you on track and support you as you move through your life. My habits have gotten better… I feel like I\'m on the right track."',
    name: '— Cam, Founding Member',
  },
  {
    idx: 'Outcome 04',
    outcome: 'You feel grounded instead of scattered.',
    body: '"It\'s a community that you can call upon in times of mental stress for clarification, a safe space, or if you just need a friend to talk to… It has made me want to be a more compassionate person."',
    name: '— Evan, Founding Member',
  },
]

export default function ChangeSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.change-head', {
        opacity: 0,
        y: 28,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.change-head', start: 'top 85%' },
      })

      gsap.from('.change-feature', {
        opacity: 0,
        x: -28,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.change-grid', start: 'top 80%' },
      })

      gsap.from('.change-item', {
        opacity: 0,
        x: 20,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.change-list', start: 'top 80%' },
      })

      gsap.from('.change-coda', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.change-coda', start: 'top 90%' },
      })
    },
    { scope: containerRef }
  )

  return (
    <section className="change" id="change" ref={containerRef}>
      <div className="wrap">
        <div className="change-head">
          <div className="eyebrow">What begins to change</div>
          <h2>
            The shifts people <em>actually feel.</em>
          </h2>
        </div>

        <div className="change-grid">
          <div className="change-feature">
            <span className="mark" aria-hidden="true">&ldquo;</span>
            <h3 className="outcome">
              You have people who <em>actually understand</em> you.
            </h3>
            <p className="body">
              &ldquo;Doing these practices with people coming from the same place, with the
              same intention — that changes everything. It&rsquo;s not like dropping into a
              random class where you do not know anyone.&rdquo;
            </p>
            <div className="attr">
              <span>Janice&nbsp;·&nbsp;Founding Member</span>
              <span className="stars">★★★★★</span>
            </div>
          </div>

          <div className="change-list">
            {CHANGE_ITEMS.map(item => (
              <div key={item.idx} className="change-item">
                <span className="idx">{item.idx}</span>
                <h4 className="outcome">{item.outcome}</h4>
                <p className="body">{item.body}</p>
                <span className="name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="change-coda">
          You live more in alignment with what actually matters to you — feeling more
          present, more aware, and more compassionate along the way.
        </p>
      </div>
    </section>
  )
}
