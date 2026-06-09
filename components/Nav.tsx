'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import LogoMark from './LogoMark'

const NAV_SECTIONS = ['who', 'looks', 'how', 'pricing'] as const

export default function Nav() {
  const [active, setActive] = useState<string>('')
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const sections = NAV_SECTIONS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="nav" aria-label="Site navigation">
      <a href="#" className="pill brand" style={{ justifySelf: 'start' }} aria-label="Somenta">
        {logoError ? (
          <LogoMark className="brand-mark" />
        ) : (
          <Image
            className="brand-mark"
            src="/assets/logo-mark.png"
            alt=""
            width={22}
            height={22}
            onError={() => setLogoError(true)}
            priority
          />
        )}
        Somenta
      </a>

      <div className="pill nav-links" role="list">
        {NAV_SECTIONS.map(id => (
          <a
            key={id}
            href={`#${id}`}
            role="listitem"
            data-link={id}
            className={active === id ? 'active' : ''}
            onClick={e => { e.preventDefault(); scrollTo(id) }}
          >
            {id === 'who' && "Who it's for"}
            {id === 'looks' && 'What it looks like'}
            {id === 'how' && 'How it works'}
            {id === 'pricing' && 'Pricing'}
          </a>
        ))}
      </div>

      <button className="cta-pill" onClick={() => scrollTo('pricing')}>
        Find your path
      </button>
    </nav>
  )
}
