'use client'

import React, { Suspense, useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { P, serif, bodyText, photoGrade } from '@/lib/theme'

const CIRCLE_URL = 'https://community.joinsomenta.com/join?invitation_token=62db94618ed1ee9815bfd2323aa78bb89565f2ef-e4478c1a-4a2c-4dd5-b62b-e82e90cdbc7d'

const Q4_EMPATHY: Record<string, string> = {
  A: 'Breaking old routines is incredibly hard, even when you know what needs to change.',
  B: 'Staying grounded and navigating intense emotions can be exhausting.',
  C: 'Feeling disconnected from the people in your life is a heavy burden to carry.',
  D: "Retreating into your head when your body doesn't feel safe makes complete sense.",
}

const Q4_TESTIMONIAL: Record<string, { quote: string; attribution: string; avatar: string }> = {
  A: {
    quote: '"My habits have gotten better, especially when it comes to getting my daily work done and staying off of social media... It\'s a group to help keep you on track and support you as you move through your life."',
    attribution: 'Cam, 32 · Plant Medicine Retreat',
    avatar: '/assets/cam.jpg',
  },
  B: {
    quote: '"Week one and two, people are going through stuff. But then everything got lighter and lighter. That\'s what I saw with every call. People were just happier, more comfortable with the group."',
    attribution: 'Coach Kevin',
    avatar: '/assets/kevin.jpg',
  },
  C: {
    quote: '"When people start to be in this environment and other people are being really vulnerable with their shares, it gives them permission to share... and trust the people in the space to feel safe enough to share some real s*** that\'s going on."',
    attribution: 'Coach Brittany',
    avatar: '/assets/britt_breathing.jpg',
  },
  D: {
    quote: '"It is an active group with great leaders and coaches, and good interactive workshops that really help ground and bring yourself into your body and the present."',
    attribution: 'Evan, 28 · Plant Medicine Retreat',
    avatar: '/assets/evan.jpg',
  },
}

const CSS = `
  @keyframes lp-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
  .lp-in{animation:lp-in .52s cubic-bezier(.16,1,.3,1) both}
  .lp-plan{border:2px solid ${P.div};border-radius:20px;overflow:hidden;background:${P.light}}
  .lp-feat-row{display:flex;align-items:flex-start;gap:.75rem;padding:.55rem 0}

  .lp-btn{
    background:${P.accent};color:${P.light};border:none;border-radius:100px;
    padding:16px 36px;font-size:15px;font-weight:600;cursor:pointer;
    letter-spacing:.01em;transition:background .2s,transform .18s,box-shadow .2s;
    font-family:var(--font-inter),-apple-system,sans-serif;
    width:100%;text-align:center;display:block;text-decoration:none;
    box-sizing:border-box;
  }
  .lp-btn:hover{background:#B06A30;transform:translateY(-2px);box-shadow:0 6px 22px rgba(200,120,64,.28)}

  @media(max-width:640px){.lp-inner{padding:1.75rem 1.25rem!important}}

  /* Paper grain — same material as the rest of the site */
  .lp-grain::after{content:'';position:fixed;inset:0;pointer-events:none;mix-blend-mode:multiply;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.11 0 0 0 0 0.05 0 0 0 0.05 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");background-size:240px 240px}
`

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="7.5" fill="rgba(45,90,64,0.12)" />
      <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke={P.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LandingPadContent() {
  const params = useSearchParams()
  const name = params.get('name') || ''
  const q4 = params.get('q4') || 'A'
  const q8 = params.get('q8') || 'B'
  const email = params.get('email') || ''

  const isPod = q8 === 'C'
  const recommendedTier = isPod ? 'The Pod' : 'Foundation'
  const empathy = Q4_EMPATHY[q4] ?? Q4_EMPATHY.A
  const testimonial = Q4_TESTIMONIAL[q4] ?? Q4_TESTIMONIAL.A

  return (
    <div className="lp-grain" style={{ background: P.bg, minHeight: '100vh', fontFamily: 'var(--font-inter),-apple-system,sans-serif', color: P.text }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64, display: 'flex', alignItems: 'center',
        padding: '0 clamp(20px,4vw,48px)',
        background: 'rgba(247,243,236,0.92)',
        borderBottom: `1px solid ${P.div}`,
        backdropFilter: 'blur(12px)',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
          <Image src="/assets/Somenta_Logo_240x60_v4.png" alt="Somenta" width={112} height={28} style={{ objectFit: 'contain' }} />
        </a>
      </nav>

      {/* Main */}
      <main style={{
        minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '100px clamp(20px,4vw,48px) 80px',
      }}>
        <div className="lp-in" style={{ width: '100%', maxWidth: 600 }}>

          {/* Headline */}
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h1 style={{
              ...serif, margin: '0 0 1rem',
              fontSize: 'clamp(22px,3.5vw,30px)',
              fontWeight: 400, lineHeight: 1.2, color: P.text, letterSpacing: '-0.015em',
            }}>
              Welcome, <em>{name}.</em>{' '}You&rsquo;ve found a safe place to land.
            </h1>
            <div style={{ maxWidth: '52ch', marginLeft: 'auto', marginRight: 'auto' }}>
              {/* The human line — spoken voice, not UI text */}
              <p style={{ ...serif, fontStyle: 'italic', fontSize: '16px', color: bodyText, lineHeight: 1.75, margin: 0 }}>
                {empathy} That is exactly why we built Somenta — an integration community opening its doors on August 3rd.
              </p>

              {/* The facts — chips, not a paragraph */}
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: P.muted, margin: '1.5rem 0 0.6rem' }}>
                Based on your answers
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center',
                  border: '1px solid rgba(45,90,64,0.35)', background: 'rgba(45,90,64,0.07)',
                  borderRadius: 100, padding: '6px 14px',
                  fontSize: '13px', fontWeight: 600, color: P.green,
                }}>
                  Your pathway: {recommendedTier}
                </span>
              </div>
            </div>
          </div>

          {/* Card wrapper — badge sits outside overflow:hidden card */}
          <div style={{ position: 'relative' }}>

            {/* Floating badge — centered on card top border */}
            <div style={{
              position: 'absolute', top: 0, left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'inline-flex', alignItems: 'center',
              background: P.bg, border: `1px solid rgba(184,80,48,0.3)`,
              borderRadius: 100, padding: '5px 14px', whiteSpace: 'nowrap',
              zIndex: 10,
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: P.rust }}>
                ★ Your Pre-Launch Invitation
              </span>
            </div>

          {/* Card */}
          <div className="lp-plan">

            {/* Cover — the circle they're joining, melting into the card */}
            <div style={{ position: 'relative', width: '100%', height: 'clamp(150px, 26vw, 215px)' }}>
              <Image
                src="/assets/meditation_class_indoors.jpg"
                alt="" aria-hidden="true"
                fill sizes="600px"
                style={{ objectFit: 'cover', objectPosition: 'center 14%', filter: photoGrade }}
              />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, transparent 55%, #F0E9DC 100%)' }} />
            </div>

            {/* Card header */}
            <div style={{ padding: '0.9rem 2rem 1.5rem', borderBottom: `1px solid ${P.div}`, background: P.bgWarm }}>
              <h2 style={{
                ...serif, margin: '0 0 0.35rem',
                fontSize: 'clamp(24px,3vw,30px)',
                fontWeight: 400, color: P.text, lineHeight: 1.1, letterSpacing: '-0.015em',
              }}>
                The Landing Pad
              </h2>
              <p style={{ fontSize: '14px', color: bodyText, margin: 0, lineHeight: 1.6 }}>
                Holding a free private space to see what Somenta is all about before the community officially kicks off.
              </p>
            </div>

            {/* Card body */}
            <div className="lp-inner" style={{ padding: '1.75rem 2rem' }}>

              {/* Section 1: Free now */}
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: P.accent, margin: '0 0 0.5rem' }}>
                🌤️ What you get right now:
              </p>
              <div className="lp-feat-row">
                <CheckIcon />
                <span style={{ fontSize: '14px', color: P.text, lineHeight: 1.6, fontWeight: 500 }}>Your first 5-minute somatic practice</span>
              </div>
              <div className="lp-feat-row">
                <CheckIcon />
                <span style={{ fontSize: '14px', color: P.text, lineHeight: 1.6, fontWeight: 500 }}>Early practices, updates, and intros to the facilitators</span>
              </div>
              <div className="lp-feat-row">
                <CheckIcon />
                <span style={{ fontSize: '14px', color: P.text, lineHeight: 1.6, fontWeight: 500 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center',
                    background: 'rgba(184,80,48,0.12)', borderRadius: 4,
                    padding: '2px 8px', marginRight: '0.4rem',
                    fontSize: '10px', fontWeight: 700, color: P.rust, letterSpacing: '0.08em',
                  }}>★ Founding Status</span>
                  Your spot saved for when the community opens
                </span>
              </div>

              {/* Primary action — right where the free offer ends */}
              <div style={{ margin: '1.4rem 0 0.25rem' }}>
                <a
                  href={CIRCLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lp-btn"
                  onClick={() => {
                    navigator.sendBeacon(
                      '/api/quiz/conversion',
                      new Blob([JSON.stringify({ email, cta: 'landing_pad_join' })], { type: 'application/json' })
                    )
                  }}
                >
                  Enter The Landing Pad (Free) →
                </a>
                <p style={{ textAlign: 'center', fontSize: '12px', color: P.muted, margin: '0.7rem 0 0', letterSpacing: '0.04em' }}>
                  Limited spaces available
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: P.div, margin: '1.4rem 0 1.25rem' }} />

              {/* Section 2: At launch */}
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: P.rust, margin: '0 0 0.5rem' }}>
                🗓️ When we open, you&rsquo;ll get:
              </p>
              {[
                'Rotating weekly live classes from our experienced facilitators',
                ...(isPod ? ['Small, intimate weekly share circles led by our facilitators'] : []),
                'Short, daily practices & prompts that fit into your busy day',
                'Live, weekly practice room to journal, meditate, or simply be next to other members',
                'Full access to an incredible community of people all around the world who are going through something similar',
              ].map((line, i) => (
                <div key={i} className="lp-feat-row">
                  <CheckIcon />
                  <span style={{ fontSize: '14px', color: P.text, lineHeight: 1.6, fontWeight: 500 }}>{line}</span>
                </div>
              ))}

              {/* Price-as-info */}
              <p style={{ fontSize: '13px', color: P.muted, lineHeight: 1.8, margin: '0.9rem 0 0' }}>
                {isPod
                  ? 'Pod starts at $40/mo for your first 3 months, then $60 after.'
                  : '$10/mo for your first 3 months, then $25. Pause or cancel anytime.'}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: P.div, margin: '1.5rem 0' }} />

              {/* Testimonial */}
              <div style={{ background: P.bgWarm, borderRadius: 14, padding: '1.5rem 1.5rem 1.25rem' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: P.accent, margin: '0 0 0.75rem' }}>
                  What members like you are saying
                </p>
                <p style={{ ...serif, fontSize: '2.5rem', color: P.accent, lineHeight: 1, margin: '0 0 0.25rem', fontStyle: 'normal' }}>
                  &ldquo;
                </p>
                <p style={{ ...serif, fontStyle: 'italic', fontSize: '16px', color: P.text, lineHeight: 1.75, margin: '0 0 1rem' }}>
                  {testimonial.quote.replace(/^"|"$/g, '')}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Image src={testimonial.avatar} alt={testimonial.attribution} width={32} height={32}
                    style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <p style={{ fontSize: '11px', color: P.muted, margin: 0, letterSpacing: '0.06em', fontWeight: 500 }}>
                    {testimonial.attribution}
                  </p>
                </div>
              </div>

            </div>
          </div>
          </div>{/* end card wrapper */}

        </div>
      </main>

      <SeatReservePopup email={email} />
    </div>
  )
}

// ── Exit-intent seat reservation — shown once, desktop only, if they leave without joining ──
const SEAT_POPUP_KEY = 'somenta_seat_popup_shown'

function SeatReservePopup({ email }: { email: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Desktop only — touch devices have no exit signal
    if ('ontouchstart' in window) return
    if (sessionStorage.getItem(SEAT_POPUP_KEY)) return

    // Require a little time on page so it never fires on an accidental mouse flick
    let timeEnough = false
    const timeTimer = setTimeout(() => { timeEnough = true }, 8000)

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && timeEnough) {
        setVisible(true)
        sessionStorage.setItem(SEAT_POPUP_KEY, '1')
        document.removeEventListener('mouseleave', onMouseLeave)
      }
    }
    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      clearTimeout(timeTimer)
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
          background: 'rgba(26,17,8,0.62)',
          animation: 'lp-in .3s ease',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed', zIndex: 9999,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(480px, 92vw)',
        background: P.bg,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(26,17,8,0.3)',
        textAlign: 'center',
      }}>
        {/* Cover photo */}
        <div style={{ position: 'relative', width: '100%', height: 'clamp(120px, 22vw, 160px)' }}>
          <Image
            src="/assets/Laying_meditation_park.jpg"
            alt="" aria-hidden="true"
            fill sizes="480px"
            style={{ objectFit: 'cover', objectPosition: 'center 55%', filter: photoGrade }}
          />
        </div>

        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          style={{
            position: 'absolute', top: 14, right: 14,
            background: 'rgba(247,243,236,0.85)', border: 'none', cursor: 'pointer',
            color: P.text, fontSize: '18px', lineHeight: 1, padding: 0,
            borderRadius: '50%', width: 28, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            paddingBottom: '1px',
          }}
        >
          ×
        </button>

        <div style={{ padding: 'clamp(1.75rem, 4.5vw, 2.5rem)' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: P.rust, margin: '0 0 0.85rem' }}>
            Doors open August 3rd
          </p>

          <h2 style={{
            ...serif, margin: '0 0 0.9rem',
            fontSize: 'clamp(21px, 3vw, 26px)',
            fontWeight: 400, lineHeight: 1.25, color: P.text, letterSpacing: '-0.015em',
          }}>
            Hold a seat at our first live class.
          </h2>

          <p style={{
            fontSize: '14.5px', lineHeight: 1.75, color: P.muted,
            margin: '0 0 1.75rem',
            fontFamily: 'var(--font-inter), -apple-system, sans-serif',
          }}>
            Sign up and save your place in opening week&rsquo;s live somatic regulation class — free, live, and guided by our facilitators.
          </p>

          <a
            href={CIRCLE_URL}
            className="lp-btn"
            onClick={() => {
              navigator.sendBeacon(
                '/api/quiz/conversion',
                new Blob([JSON.stringify({ email, cta: 'landing_pad_seat_reserve' })], { type: 'application/json' })
              )
            }}
          >
            Reserve my seat →
          </a>

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

export default function LandingPadPage() {
  return (
    <Suspense>
      <LandingPadContent />
    </Suspense>
  )
}
