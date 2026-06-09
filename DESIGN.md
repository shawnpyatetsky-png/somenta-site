---
name: Somenta Landing Page
description: A guided psychedelic integration community — where profound experiences find their ground.
colors:
  warm-ivory: "#F7F3EC"
  amber-tan: "#F0E9DC"
  espresso-deep: "#1A1108"
  warm-brown: "#281B0D"
  parchment: "#FDFBF6"
  warm-taupe: "#8C7C68"
  amber-glow: "#C87840"
  amber-hush: "#B06A30"
  warm-divider: "#E0D3BF"
typography:
  display:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "clamp(44px, 6.2vw, 84px)"
    fontWeight: 400
    lineHeight: 1.02
  headline:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "clamp(34px, 4.2vw, 52px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.018em"
  title:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "clamp(18px, 1.55vw, 22px)"
    fontWeight: 500
    lineHeight: 1.25
  body:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.22em"
rounded:
  card: "14px"
  button: "100px"
  dot: "50%"
spacing:
  section-v: "8rem"
  section-h: "3rem"
  card-md: "2.25rem"
  card-sm: "1.75rem 2rem"
components:
  button-accent:
    backgroundColor: "{colors.amber-glow}"
    textColor: "{colors.parchment}"
    rounded: "{rounded.button}"
    padding: "0.9rem 2.25rem"
  button-accent-hover:
    backgroundColor: "{colors.amber-hush}"
    textColor: "{colors.parchment}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.amber-glow}"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.75rem"
  button-outline-hover:
    backgroundColor: "{colors.amber-glow}"
    textColor: "{colors.parchment}"
  card:
    backgroundColor: "{colors.parchment}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-md}"
  card-hover:
    backgroundColor: "rgba(200,120,64,0.05)"
---

# Design System: Somenta Landing Page

## 1. Overview

**Creative North Star: "The Integration Hearth"**

This system is built around the feeling of coming home after something that changed you. Every surface, spacing decision, and typographic choice should evoke warmth without sentimentality, structure without coldness, and depth without mysticism for its own sake. The palette is drawn from earth and ember — ivory, amber, espresso, warm taupe. Nothing synthetic. Nothing that glows or pulses or demands attention.

The design carries the emotional work before a word is read. A visitor who has just returned from a profound retreat should land here and feel immediately held, not sold to. Whitespace is not emptiness — it is the breath between insights. Restraint is not blandness — it is respect for the user's interior life.

This system explicitly rejects: the pastel gamification of consumer wellness apps (Calm/Headspace), the clinical coldness of therapy platforms, the neon mysticism of psychedelic hype brands, and the hero-feature-pricing template of SaaS landing pages.

**Key Characteristics:**
- Warm earth palette: all neutrals tinted toward amber, nothing purely grey or white
- Fraunces serif for all display and emotional copy; sans-serif strictly for metadata and labels
- Italic as a voice, not a style — used for the human, felt, intimate moments in copy
- Hover states that whisper: a barely-there amber tint, no lifts, no shadows, no drama
- Motion that breathes: slow reveal (0.95s), exponential ease, no bounce, no snap

## 2. Colors: The Ember Palette

A single-accent, all-warm palette. Every neutral is tinted toward amber; nothing is grey or cold. The amber accent is rare by design — its infrequency is its power.

### Primary
- **Amber Glow** (#C87840): The one true accent. Used exclusively for primary CTAs, active states, and key interactive elements. Prohibited from decorative use. On hover, deepens to Amber Hush (#B06A30).

### Neutral
- **Warm Ivory** (#F7F3EC): The primary background — the page surface, the resting state.
- **Amber Tan** (#F0E9DC): The warm section background, used to alternate sections without jarring contrast.
- **Espresso Deep** (#1A1108): Hero and dark section backgrounds. The night-time depth of the system.
- **Warm Brown** (#281B0D): Primary body text. Never pure black.
- **Parchment** (#FDFBF6): Card and elevated surface background. One step lighter than Warm Ivory.
- **Warm Taupe** (#8C7C68): Muted / secondary text. Eyebrow labels. Supporting copy.
- **Warm Divider** (#E0D3BF): Borders, dividers, subtle separators. Never used as a card background.
- **Amber Hush** (#B06A30): CTA hover state only. Not used independently.

### Named Rules
**The One Ember Rule.** The amber accent (#C87840) appears on ≤10% of any screen surface. It marks CTAs, active states, and key interactive moments. Using it decoratively dissolves its power entirely — prohibited.

**The No-Cold-Neutral Rule.** Every surface, text, and border colour must carry warmth. Pure grey (#888888, #CCCCCC) and pure white (#FFFFFF) are forbidden. If a neutral looks grey in isolation, it is wrong for this system.

## 3. Typography

**Display Font:** Fraunces (with Georgia, serif fallback)
**Body Font:** system-ui, -apple-system, sans-serif
**Label Font:** Same sans stack, uppercase, tracked

**Character:** Fraunces is an optical variable serif with a warm, slightly literary quality — confident without being stiff. Used at low weight (300–400) with italic, it carries the intimate and felt tone of the copy. The sans-serif is strictly functional: it never appears in emotional or narrative contexts, only in metadata, eyebrows, tags, and attribution lines.

### Hierarchy
- **Display** (weight 400, clamp(44px, 6.2vw, 84px), line-height 1.02): Hero headlines only. Letter-spacing normal; never tracked tight at this size.
- **Headline** (weight 400, clamp(34px, 4.2vw, 52px), line-height 1.08, tracking -0.018em): Section h2s. The emotional anchor of each section.
- **Title** (weight 500, clamp(18px, 1.55vw, 22px), line-height 1.25): Card headings, shift statements. The only Fraunces weight to hit 500 — used sparingly.
- **Body** (weight 400, 0.875–0.95rem, line-height 1.75–1.8): Paragraph text. Sans-serif. Max line length ~65ch.
- **Label** (weight 500, 11px, letter-spacing 0.22em, UPPERCASE): Eyebrows, section tags, attribution. Always sans-serif. Colour: Warm Taupe on light backgrounds.

### Named Rules
**The Italic-as-Voice Rule.** Italic is not decoration — it is the first-person, felt, interior voice. It appears in member quotes, emotional copy, section subtitles. Never use italic on body text for emphasis; use it for register shifts.

**The Serif-for-Story Rule.** Fraunces is the emotional register. System-sans is the functional register. They never trade roles. Navigation, labels, tags, and metadata: sans-serif only. Headlines, quotes, and narrative copy: Fraunces only.

## 4. Elevation

This system is flat by default. Surfaces rest at rest. Depth is conveyed through tonal layering — alternating warm-ivory and amber-tan sections, parchment cards floating on warm-ivory — not through shadows.

Shadows appear exclusively as state responses: a hover glow on the primary CTA button, the amber dot bloom on the timeline. They are earned, not decorative.

### Shadow Vocabulary
- **CTA hover glow** (`box-shadow: 0 6px 22px rgba(200,120,64,0.28)`): Primary accent button hover state only. Amber-tinted, never neutral grey.
- **Timeline dot bloom** (`box-shadow: 0 0 0 5px rgba(200,120,64,0.28), 0 0 22px rgba(200,120,64,0.42)`): Timeline dot when the adjacent card is hovered. A radiance, not a drop shadow.
- **Timeline dot rest** (`box-shadow: 0 0 0 3px rgba(200,120,64,0.18), 0 0 14px rgba(200,120,64,0.22)`): Ambient amber ring on the timeline dot at rest.

### Named Rules
**The Flat-by-Default Rule.** No card, section, or container has a shadow at rest. Shadows are responses to interaction, not structural depth cues. If you're reaching for a `box-shadow` on a static element, reach for a tonal background shift instead.

## 5. Components

### Buttons
Character: pill-shaped, unhurried, no hard edges.
- **Shape:** Full pill (border-radius 100px)
- **Primary / Accent:** Background Amber Glow (#C87840), text Parchment (#FDFBF6), padding 0.9rem 2.25rem. Hover: deepens to Amber Hush (#B06A30), lifts 2px, amber glow shadow. Transition: 0.18–0.2s ease.
- **Outline:** Transparent background, 1.5px Amber Glow border, Amber Glow text, same padding. Hover: fills with Amber Glow, text becomes Parchment.
- **Ghost:** Transparent, no border. Hover: `rgba(40,27,13,0.06)` — barely visible dark tint. Used for secondary actions and nav.
- **Light:** Warm light bg at rest. Hover: lightens further (`#EDE5D8`) + 1px lift.

### Cards / Containers
Character: warm and tactile — a hint of amber on hover, nothing more.
- **Corner Style:** Gently curved (14px radius)
- **Background:** Parchment (#FDFBF6) at 0.55 opacity on warm-ivory sections; solid parchment on dark sections
- **Shadow Strategy:** None at rest (see Flat-by-Default Rule)
- **Border:** `1px solid #E0D3BF` (Warm Divider)
- **Internal Padding:** 2.25rem (larger cards), 1.75rem 2rem (timeline cards)
- **Hover:** `background: rgba(200,120,64,0.05)` — a whisper of amber, matching across all card types for consistency

### Navigation
- **Style:** Fixed pill containing brand name + links. Background: Espresso Deep at rest.
- **Links:** Sans-serif 13px, Warm Taupe colour. Hover: underline scaleX animation from center (280ms `cubic-bezier(0.22,1,0.36,1)`), colour shifts to Warm Brown.
- **CTA pill:** Amber Glow background, all-caps label, 0.14em tracking, bold. Right-justified in the nav grid.
- **Mobile:** Navigation hidden below 860px breakpoint.

### Accordion (FAQ)
- **Style:** No visible container at rest — just a question line and expand/collapse chevron
- **Active:** Amber accent on the question text and chevron
- **Answer reveal:** Smooth height transition, body text in Warm Taupe at 0.9rem
- **Key:** Uses question text as state key (single open at a time)

### Timeline (Weekly Schedule)
Signature component. A zig-zag vertical timeline alternating left/right cards.
- **Center line:** 1px `linear-gradient` Warm Divider, fade at top and bottom
- **Dot:** 12px circle, Amber Glow fill, 2.5px Parchment border, ambient amber ring shadow. On card hover: scales to 1.65×, ring expands. Implemented via React state (CSS can't bridge cross-column hover).
- **Connector lines:** `::before`/`::after` on dot-wrap column, extending 3rem left and right. 1px Warm Divider. Hidden on mobile.
- **Cards:** Parchment background, Warm Divider border, 14px radius, 1.75rem 2rem padding. Hover matches standard card hover (amber whisper tint only).
- **Grid:** `grid-template-columns: 1fr 72px 1fr`. Mobile collapses to `36px 1fr`.

### Chips / Tags
- **Style:** `background: rgba(200,120,64,0.07)`, no border, full pill. Text: Warm Taupe, 0.58rem, 0.16em tracking, uppercase, weight 600.
- **Hover (on parent card hover):** Background `rgba(200,120,64,0.14)`, text shifts to Amber Glow.

## 6. Do's and Don'ts

### Do:
- **Do** use Fraunces italic for all member quotes, emotional headlines, and intimate copy moments.
- **Do** alternate sections between Warm Ivory (#F7F3EC) and Amber Tan (#F0E9DC) for rhythm without contrast shock.
- **Do** keep the amber accent (#C87840) rare — CTAs, active states, and one emphatic inline italic per card, maximum.
- **Do** use the card hover tint (`rgba(200,120,64,0.05)`) consistently across all interactive card types: feature items, timeline cards, changes cards.
- **Do** respect the Reveal animation's unhurried pace (0.95s, cubic-bezier(.16,1,.3,1)). The slowness is intentional — it matches the user's interior pace.
- **Do** treat whitespace as content. Section padding of 8rem is not excess — it is the breath of the system.
- **Do** cap body text at ~65ch. Integration copy needs room to land.

### Don't:
- **Don't** use generic meditation app aesthetics — pastel palettes, rounded illustrations, gamified UI, streaks, or progress bars. Somenta is not Headspace.
- **Don't** use clinical or medical visual language — sterile white surfaces, cold grey text, form-heavy layouts. Somenta is not BetterHelp.
- **Don't** use psychedelic hype visual language — neon, cosmic AI imagery, trippy gradients, mystical oversize typography. The work is sacred; the design doesn't perform sacredness.
- **Don't** use any pure grey neutral or pure white (#FFFFFF). Every surface must carry warmth.
- **Don't** use gradient text (`background-clip: text`). Single solid colour only.
- **Don't** use side-stripe `border-left` accents greater than 1px. If a card needs emphasis, use a background tint or a full border.
- **Don't** animate layout properties (height, width, top, left). Animate opacity and transform only.
- **Don't** bounce or use elastic easing. Exponential ease-out only: `cubic-bezier(.16,1,.3,1)`.
- **Don't** use amber (#C87840) decoratively — not as a background wash, not as a heading colour, not as a decorative divider. Its rarity is its power.
- **Don't** use the hero-metric SaaS template (big number, small label, supporting stats). Somenta's value is experiential, not quantifiable.
