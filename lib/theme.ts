import type { CSSProperties } from 'react'

// ── Shared warm palette ───────────────────────────────────────────────────────
export const P = {
  bg:     '#F7F3EC',   // warm ivory
  bgWarm: '#F0E9DC',   // amber tan
  bgDark: '#1A1108',   // deep warm espresso
  text:   '#281B0D',   // warm brown
  light:  '#FDFBF6',   // near white
  muted:  '#6B5A47',   // warm taupe
  accent: '#C87840',   // warm amber — CTA buttons only
  rust:   '#B85030',   // rust/terracotta — icons, highlights, emphasis
  green:  '#2D5A40',   // forest green — the Nature pillar: growth, renewal; quiet secondary
  greenDeep: '#1E3B2A', // deep forest — dark anchor sections; Somenta's night-forest counterpart to espresso
  div:    '#E0D3BF',   // warm divider
}

// ── Shared type constants ─────────────────────────────────────────────────────
export const serif: CSSProperties = { fontFamily: 'var(--font-fraunces), Georgia, serif' }

// Body text color — P.text at 72% opacity gives ~6.4:1 contrast on warm backgrounds (WCAG AA)
export const bodyText = 'rgba(40,27,13,0.72)'

// ── Unified photo grade ───────────────────────────────────────────────────────
// Every content photo on the site runs through this one filter so all imagery
// shares the same warm, calm, golden tone. Tune the vibe here, in one place.
export const photoGrade = 'sepia(0.16) saturate(0.97) brightness(1.02) contrast(0.95)'
