'use client'

import { useState, useEffect } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

const CONSENT_KEY = 'somenta_cookie_consent'

export default function CookieBanner() {
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'accepted') { setConsent('accepted'); return }
    if (stored === 'declined') { setConsent('declined'); return }
    // Show banner after a short delay so it doesn't flash immediately
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setConsent('declined')
    setVisible(false)
  }

  return (
    <>
      {/* Load GA only if accepted */}
      {consent === 'accepted' && <GoogleAnalytics gaId="G-Y1KPX56G3S" />}

      {/* Banner */}
      {visible && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
          background: 'rgba(26,17,8,0.96)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(224,211,191,0.15)',
          padding: '1rem clamp(20px, 4vw, 56px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem',
          animation: 'cookie-in .4s cubic-bezier(.16,1,.3,1)',
        }}>
          <style>{`@keyframes cookie-in{from{transform:translateY(100%)}to{transform:none}}`}</style>

          <p style={{
            margin: 0, fontSize: '13px', lineHeight: 1.6,
            color: 'rgba(247,243,236,0.72)',
            fontFamily: 'var(--font-inter), -apple-system, sans-serif',
            maxWidth: '60ch',
          }}>
            We use cookies to understand how people find and use Somenta.{' '}
            <a href="/privacy" style={{ color: 'rgba(247,243,236,0.5)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
              Privacy Policy
            </a>
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
            <button
              onClick={decline}
              style={{
                background: 'none', border: '1px solid rgba(224,211,191,0.25)',
                borderRadius: 100, padding: '8px 20px',
                fontSize: '13px', fontWeight: 500, color: 'rgba(247,243,236,0.55)',
                cursor: 'pointer', fontFamily: 'var(--font-inter), -apple-system, sans-serif',
                transition: 'border-color .2s, color .2s',
              }}
              onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(224,211,191,0.5)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(247,243,236,0.8)' }}
              onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(224,211,191,0.25)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(247,243,236,0.55)' }}
            >
              Decline
            </button>
            <button
              onClick={accept}
              style={{
                background: '#C87840', border: 'none',
                borderRadius: 100, padding: '8px 20px',
                fontSize: '13px', fontWeight: 600, color: '#FDFBF6',
                cursor: 'pointer', fontFamily: 'var(--font-inter), -apple-system, sans-serif',
                transition: 'background .2s',
              }}
              onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = '#B06A30' }}
              onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = '#C87840' }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  )
}
