'use client'

import React, { useState, Suspense } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import type { Metadata } from 'next'

const P = {
  bg: '#F7F3EC', bgWarm: '#F0E9DC',
  text: '#281B0D', light: '#FDFBF6', muted: '#6B5A47',
  accent: '#C87840', rust: '#B85030', div: '#E0D3BF',
}
const serif: CSSProperties = { fontFamily: 'var(--font-fraunces), Georgia, serif' }
const bodyText = 'rgba(40,27,13,0.72)'

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
  @keyframes lp-fade{from{opacity:0}to{opacity:1}}
  .lp-fade{animation:lp-fade .4s ease both}

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

  .lp-community-btn{
    display:flex;align-items:center;justify-content:space-between;gap:.5rem;
    width:100%;background:none;border:none;cursor:pointer;padding:.65rem 0;
    font-family:var(--font-inter),-apple-system,sans-serif;transition:opacity .2s;
  }
  .lp-community-btn:hover{opacity:.75}

  @media(max-width:640px){.lp-inner{padding:1.75rem 1.25rem!important}}
`

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="7.5" fill="rgba(184,80,48,0.12)" />
      <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke={P.rust} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LandingPadContent() {
  const params = useSearchParams()
  const name = params.get('name') || ''
  const q4 = params.get('q4') || 'A'
  const q8 = params.get('q8') || 'B'
  const email = params.get('email') || ''
  const [communityOpen, setCommunityOpen] = useState(false)

  const recommendedTier = q8 === 'C' ? 'The Pod' : 'Foundation'
  const empathy = Q4_EMPATHY[q4] ?? Q4_EMPATHY.A
  const testimonial = Q4_TESTIMONIAL[q4] ?? Q4_TESTIMONIAL.A

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: 'var(--font-inter),-apple-system,sans-serif', color: P.text }}>
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
          <Image src="/assets/logo-mark.png" alt="Somenta" width={24} height={24}
            style={{ objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(52%) sepia(48%) saturate(632%) hue-rotate(346deg) brightness(96%) contrast(92%)' }} />
          <span style={{ ...serif, fontSize: '17px', color: P.text, fontWeight: 400 }}>Somenta</span>
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
              {q8 === 'A' ? (
                <>
                  <p style={{ fontSize: '15px', color: bodyText, lineHeight: 1.8, margin: '0 0 0.85rem' }}>
                    Because you mentioned you only have a few minutes a day right now,{' '}
                    <strong style={{ color: P.text, fontWeight: 600 }}>Foundation</strong> will be the perfect place to start.
                  </p>
                  <p style={{ fontSize: '15px', color: bodyText, lineHeight: 1.8, margin: 0 }}>
                    Begin gently today in the Landing Pad —{' '}
                    <strong style={{ color: P.text, fontWeight: 600 }}>free</strong> — before we open on{' '}
                    <strong style={{ color: P.text, fontWeight: 600 }}>August 3rd</strong>.
                  </p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '15px', color: bodyText, lineHeight: 1.8, margin: '0 0 0.85rem' }}>
                    {empathy} That is exactly why we built Somenta.
                  </p>
                  <p style={{ fontSize: '15px', color: bodyText, lineHeight: 1.8, margin: 0 }}>
                    Based on your answers, your recommended pathway is{' '}
                    <strong style={{ color: P.text, fontWeight: 600 }}>{recommendedTier}</strong>. Live cohorts open{' '}
                    <strong style={{ color: P.text, fontWeight: 600 }}>August 3rd</strong>. Until then, step into the Landing Pad —{' '}
                    <strong style={{ color: P.text, fontWeight: 600 }}>free</strong> — and start today.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Card */}
          <div className="lp-plan">

            {/* Card header */}
            <div style={{ padding: '2rem 2rem 1.5rem', borderBottom: `1px solid ${P.div}`, background: P.bgWarm }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'rgba(200,120,64,0.2)', borderRadius: 100,
                padding: '3px 10px', marginBottom: '0.75rem',
              }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: P.accent }}>
                  ★ Your Pre-Launch Invitation
                </span>
              </div>
              <h2 style={{
                ...serif, margin: '0 0 0.35rem',
                fontSize: 'clamp(24px,3vw,30px)',
                fontWeight: 400, color: P.text, lineHeight: 1.1, letterSpacing: '-0.015em',
              }}>
                The Landing Pad
              </h2>
              <p style={{ fontSize: '14px', color: bodyText, margin: '0 0 1.25rem', lineHeight: 1.6 }}>
                A free, private space to catch your breath and prepare your nervous system before the full community opens.
              </p>
              <p style={{ ...serif, fontStyle: 'italic', fontSize: '14px', color: P.muted, margin: 0, lineHeight: 1.6 }}>
                You&rsquo;re one of our founding members — your spot is saved for launch.
              </p>
            </div>

            {/* Card body */}
            <div className="lp-inner" style={{ padding: '1.75rem 2rem' }}>

              {/* Section 1: Free now */}
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: P.accent, margin: '0 0 0.5rem' }}>
                Right now, free in the Landing Pad
              </p>
              {[
                'Your first 5-minute somatic practice, today',
                'Early practices and updates as we prepare to open',
                'Your founding spot, saved for launch',
              ].map((line, i) => (
                <div key={i} className="lp-feat-row">
                  <CheckIcon />
                  <span style={{ fontSize: '14px', color: P.text, lineHeight: 1.6, fontWeight: 500 }}>{line}</span>
                </div>
              ))}

              {/* Divider */}
              <div style={{ height: 1, background: P.div, margin: '1.25rem 0' }} />

              {/* Section 2: At launch */}
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: P.rust, margin: '0 0 0.5rem' }}>
                When we open — August 3rd
              </p>
              {[
                'Weekly live classes to recalibrate your nervous system',
                '5-minute daily practices that fit into a busy day',
                'A supportive community rhythm, at your own pace',
              ].map((line, i) => (
                <div key={i} className="lp-feat-row">
                  <CheckIcon />
                  <span style={{ fontSize: '14px', color: P.text, lineHeight: 1.6, fontWeight: 500 }}>{line}</span>
                </div>
              ))}

              {/* Community dropdown */}
              <div style={{ marginTop: '0.25rem' }}>
                <button className="lp-community-btn" onClick={() => setCommunityOpen(o => !o)}>
                  <span style={{ fontSize: '13.5px', color: P.rust, fontWeight: 500 }}>
                    + Full access to the Somenta Community — opens August 3rd
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.rust} strokeWidth="1.5" strokeLinecap="round"
                    style={{ flexShrink: 0, transform: communityOpen ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {communityOpen && (
                  <div className="lp-fade" style={{ paddingBottom: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                    {[
                      'The Daily Drop. 5-minute async guided audio and journaling prompts to anchor your practice.',
                      'The Practice Room. Silent live journaling space for quiet, shared accountability.',
                      'Connection Events. Capped gatherings with small breakout rooms to form real relationships.',
                    ].map((f, i) => (
                      <div key={i} className="lp-feat-row" style={{ paddingLeft: '0.5rem' }}>
                        <CheckIcon />
                        <span style={{ fontSize: '14px', color: bodyText, lineHeight: 1.6 }}>
                          <strong style={{ fontWeight: 600, color: P.text }}>{f.split('.')[0]}.</strong>
                          {f.slice(f.indexOf('.') + 1)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: P.div, margin: '1.5rem 0' }} />

              {/* Price-as-info */}
              <p style={{ fontSize: '13px', color: P.muted, lineHeight: 1.8, margin: '0 0 1.5rem' }}>
                Founding rate at launch: Foundation $10/mo for your first 3 months, then $25 (Pod $40, then $60). Your 3 months begin when live cohorts open on August 3rd. Join free now to lock your founding rate — yours for as long as you stay.
              </p>

              {/* CTA */}
              <a
                href={CIRCLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-btn"
                onClick={() => fetch('/api/quiz/conversion', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, cta: 'landing_pad_join' }),
                }).catch(() => {})}
              >
                Enter The Landing Pad (Free) →
              </a>

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

          {/* Footer */}
          <p style={{ textAlign: 'center', fontSize: '13px', color: P.muted, margin: '2rem 0 0', letterSpacing: '0.04em' }}>
            Live cohorts open August 3rd. Your spot is saved.
          </p>

        </div>
      </main>
    </div>
  )
}

export default function LandingPadPage() {
  return (
    <Suspense>
      <LandingPadContent />
    </Suspense>
  )
}
