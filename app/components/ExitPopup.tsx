'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { P, serif, photoGrade } from '@/lib/theme'

const SHOWN_KEY = 'somenta_exit_popup_shown'

export default function ExitPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only on desktop — skip on touch devices
    if ('ontouchstart' in window) return
    // Only show once per session
    if (sessionStorage.getItem(SHOWN_KEY)) return

    let scrolledEnough = false
    let timeEnough = false

    // Require at least 15 seconds on page
    const timeTimer = setTimeout(() => { timeEnough = true }, 15000)

    // Require at least 30% scroll depth
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (pct >= 0.3) scrolledEnough = true
    }

    // Trigger on mouse leaving top of viewport
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && scrolledEnough && timeEnough) {
        setVisible(true)
        sessionStorage.setItem(SHOWN_KEY, '1')
        document.removeEventListener('mouseleave', onMouseLeave)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      clearTimeout(timeTimer)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setVisible(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: 'rgba(26,17,8,0.55)',
          backdropFilter: 'blur(4px)',
          animation: 'exit-fade-in .3s ease',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed', zIndex: 9999,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(520px, 92vw)',
        background: P.bg,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(26,17,8,0.3)',
        animation: 'exit-slide-in .35s cubic-bezier(.16,1,.3,1)',
        textAlign: 'center',
      }}>
        <style>{`
          @keyframes exit-fade-in{from{opacity:0}to{opacity:1}}
          @keyframes exit-slide-in{from{opacity:0;transform:translate(-50%,-46%)}to{opacity:1;transform:translate(-50%,-50%)}}
        `}</style>

        {/* Cover photo */}
        <div style={{ position: 'relative', width: '100%', height: 'clamp(140px, 26vw, 200px)' }}>
          <Image
            src="/assets/inviting_good.jpg"
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 55%', filter: photoGrade }}
          />
        </div>

        <div style={{ padding: 'clamp(2rem, 5vw, 3rem)' }}>

        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(247,243,236,0.85)', border: 'none', cursor: 'pointer',
            color: P.text, fontSize: '18px', lineHeight: 1, padding: 0,
            borderRadius: '50%', width: 28, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            paddingBottom: '1px',
          }}
        >
          ×
        </button>

        {/* Heading */}
        <h2 style={{
          ...serif, margin: '0 0 1rem',
          fontSize: 'clamp(22px, 3vw, 28px)',
          fontWeight: 400, lineHeight: 1.2, color: P.text,
          letterSpacing: '-0.015em',
        }}>
          Take our free 2-minute assessment.
        </h2>

        {/* Body */}
        <p style={{
          fontSize: '15px', lineHeight: 1.75, color: P.muted,
          margin: '0 0 2rem',
          fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        }}>
          Discover exactly what kind of support your nervous system needs right now.
        </p>

        {/* CTA */}
        <a href="/quiz" style={{ textDecoration: 'none', display: 'block' }}>
          <button
            style={{
              width: '100%', background: P.accent, color: '#FDFBF6',
              border: 'none', borderRadius: 100,
              padding: '16px 32px', fontSize: '15px', fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.01em',
              fontFamily: 'var(--font-inter), -apple-system, sans-serif',
              transition: 'background .2s, transform .18s',
            }}
            onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = '#B06A30' }}
            onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = P.accent }}
          >
            Find my path →
          </button>
        </a>

        {/* Dismiss */}
        <button
          onClick={() => setVisible(false)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '13px', color: P.muted, marginTop: '1rem',
            textDecoration: 'underline', textUnderlineOffset: '3px',
            textDecorationColor: P.div, padding: 0,
            fontFamily: 'var(--font-inter), -apple-system, sans-serif',
          }}
        >
          No thanks
        </button>
        </div>
      </div>
    </>
  )
}
