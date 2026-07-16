import type { CSSProperties } from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Member Agreement — Somenta',
  description: 'The shared commitments that make Somenta what it is.',
}

const P = { bg: '#F7F3EC', text: '#281B0D', muted: '#6B5A47', div: '#E0D3BF', rust: '#B85030', accent: '#C87840' }
const serif: CSSProperties = { fontFamily: 'var(--font-fraunces), Georgia, serif' }
const body: CSSProperties = { fontSize: '15px', lineHeight: 1.85, color: 'rgba(40,27,13,0.78)', margin: '0 0 1rem 0' }

function P_({ children }: { children: React.ReactNode }) {
  return <p style={body}>{children}</p>
}

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section style={{ paddingTop: '2.5rem', borderTop: `1px solid ${P.div}`, marginTop: '2.5rem' }}>
      <h2 style={{ ...serif, fontSize: 'clamp(18px, 2.2vw, 22px)', fontWeight: 400, color: P.text, margin: '0 0 1.25rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
        {num}. {title}
      </h2>
      {children}
    </section>
  )
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: '1.75rem' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 600, color: P.rust, margin: '0 0 0.6rem', lineHeight: 1.4, fontStyle: 'italic' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function SubLabel({ title }: { title: string }) {
  return (
    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: P.accent, margin: '1.75rem 0 0.75rem' }}>
      {title}
    </p>
  )
}

function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ margin: '0.25rem 0 1rem', paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(40,27,13,0.78)' }}>{item}</li>
      ))}
    </ul>
  )
}

export default function MemberAgreementPage() {
  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: 'var(--font-inter), -apple-system, sans-serif' }}>

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(247,243,236,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${P.div}`,
        padding: '0 clamp(20px, 4vw, 56px)', height: 64,
        display: 'flex', alignItems: 'center',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
          <Image src="/assets/logo-mark-amber.png" alt="Somenta" width={26} height={26} style={{ objectFit: 'contain' }} />
          <span style={{ ...serif, fontSize: '18px', color: P.text, fontWeight: 400 }}>Somenta</span>
        </a>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: 'clamp(3rem, 6vw, 5rem) clamp(20px, 4vw, 40px) 6rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', paddingBottom: '2.5rem', borderBottom: `1px solid ${P.div}` }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: P.accent, margin: '0 0 0.75rem' }}>
            Somenta
          </p>
          <h1 style={{ ...serif, fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 400, color: P.text, margin: '0 0 0.75rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Member Agreement
          </h1>
          <p style={{ fontSize: '13px', color: P.muted, margin: 0, fontStyle: 'italic' }}>Effective Date: April 4, 2026</p>
        </div>

        {/* Intro */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ ...serif, fontStyle: 'italic', fontSize: '16px', color: P.rust, margin: '0 0 1.5rem', lineHeight: 1.7 }}>
            This is not fine print. This is what we are building together.
          </p>
          <P_>Somenta exists because transformation is not the only hard part. What comes after is, too. The quiet stretch where the insight is still fresh but your life has not caught up yet. The moment you realize the people around you cannot quite meet you where you are now.</P_>
          <P_>This community is the container for that stretch. And a container only works if everyone inside it agrees on what it is and how we show up within it.</P_>
          <P_>This Member Agreement is the shared commitment that makes Somenta what it is. It is not enforced by legal consequence. It is held by mutual respect, by the understanding that what we build here depends on how each of us chooses to be here.</P_>
          <P_>Please read this carefully. It is not long. Everything in it matters.</P_>
        </div>

        {/* Section 1 */}
        <Section num="1" title="How We Communicate">
          <P_>Before anything else, we agree on how we talk to each other. These are the ground rules that apply in every Somenta space: pods, Share Circles, integration circles, live sessions, the community platform, and direct messages.</P_>

          <Ul items={[
            <><strong>Speak from your own experience.</strong> Share what happened to you, what you felt, what you noticed. Your stories will naturally involve other people in your life, and that is expected. What we ask is that you stay close to your own experience rather than interpreting someone else's. If you want to reflect something back to another member, offer it as what you noticed, not as an explanation of why they feel the way they do.</>,
            <><strong>Listen to understand, not to respond.</strong> When someone is sharing, your role is to witness, not to fix. Do not interrupt. Do not offer unsolicited advice. Do not redirect the conversation to your own experience while someone else is still in theirs.</>,
            <><strong>No diagnosing, labeling, or prescribing.</strong> You are not here as a clinician, even if you are one in your professional life. Do not diagnose other members. Do not label their experiences. Do not tell them what they should do, take, try, or stop doing. If someone asks for your perspective, share it as your personal experience, not as a recommendation.</>,
            <><strong>No cross-talk during sharing.</strong> In pods and Share Circles, when someone has the floor, they have the floor. Side conversations, reactions in the chat, or interjections break the container. Hold your response until it is your turn.</>,
            <><strong>Name it if something lands wrong.</strong> If something another member says triggers a strong reaction in you, you are welcome to name that in the moment or bring it to your coach privately. We do not expect perfection. We expect willingness to stay in the conversation.</>,
            <><strong>No solicitation or promotion.</strong> Do not promote your business, services, products, courses, retreats, or any external offering to other members. Do not recruit members for other communities, programs, or organizations. If a genuine connection leads to a professional relationship outside of Somenta, that is between you and the other person, but the community spaces are not the venue for it.</>,
          ]} />
        </Section>

        {/* Section 2 */}
        <Section num="2" title="What Is Shared Here Stays Here">
          <p style={{ ...body, fontWeight: 600, color: P.text }}>This is the single most important agreement in this document.</p>
          <P_>Everything shared in pods, Share Circles, integration circles, and direct messages within the Somenta community is confidential. This is not a suggestion. It is the foundation of the trust that makes this community work.</P_>

          <SubLabel title="What confidentiality means" />
          <Ul items={[
            "You do not share another member’s story, name, details, or identifiable information with anyone outside of Somenta",
            'You do not discuss what happened in a pod or Share Circle with members who were not present in that specific session',
            'You do not screenshot, copy, record, or forward any content from confidential community spaces',
            "You do not reference another member’s participation, membership status, or personal disclosures to anyone outside the community",
          ]} />

          <SubLabel title="What you can share" />
          <Ul items={[
            <>Your own experience: <em>"I have been part of a group where I am learning to sit with discomfort"</em> is fine</>,
            <>General themes without identifying details: <em>"I was in a circle where the topic of grief came up and it helped me process my own"</em> is fine</>,
            'That Somenta exists and what it generally offers, without naming other members or sharing their stories',
          ]} />

          <SubLabel title="Why this matters" />
          <P_>People share things in this community that they have not said out loud before. They take risks. They show the parts of themselves they have been carrying alone. That only happens when they trust the container. Every time someone breaks confidentiality, even casually, that trust is damaged for everyone.</P_>
          <P_>If you are unsure whether something is okay to share outside the community, the answer is: do not share it.</P_>
        </Section>

        {/* Section 3 */}
        <Section num="3" title="Emotional Safety and Responsibility">
          <P_>Somenta is designed to be a space where you can be honest about where you are. That requires emotional safety, which is built collectively, not provided as a service.</P_>

          <SubLabel title="What we commit to as a community" />
          <Ul items={[
            'We hold space without judgment. Someone sharing something difficult is not an invitation to evaluate, compare, or minimize their experience.',
            'We respect emotional boundaries. If someone says they are not ready to go deeper, we honor that without pushing.',
            'We do not use vulnerability as leverage. What someone shares in a moment of openness is not to be referenced later in a way that feels exposing or manipulative.',
            'We take responsibility for our own emotional state. If a session brings up something intense, we use our resources: our coach, our pod, our own support systems outside Somenta.',
          ]} />

          <SubLabel title="What emotional safety does not mean" />
          <P_>Emotional safety does not mean comfort. Growth requires encountering edges. Your pod members and coaches may reflect things back to you that are uncomfortable to hear. The agreement is not that everything will feel good. The agreement is that everything will be done with care.</P_>
        </Section>

        {/* Section 4 */}
        <Section num="4" title="Showing Up">
          <P_>The pod structure only works if people show up. Not perfectly. Not every single time. But consistently enough that the group can form real trust and do real work together.</P_>

          <SubLabel title="What showing up looks like" />
          <Ul items={[
            'Attending your pod sessions and Share Circles regularly. If you cannot make a session, let your pod or coach know in advance.',
            'Being present when you are in a session. Camera on when possible. Phone away. Not multitasking.',
            'Engaging with the community between sessions, even briefly. A comment, a check-in, a response to someone else\'s post.',
            'Reaching out to your coach if you are struggling, pulling away, or unsure whether this is working for you.',
          ]} />

          <SubLabel title="What happens if you disappear" />
          <P_>If you stop attending without communication, your coach will reach out. This is not punitive. It is because your pod notices when you are not there, and because isolation is often the first sign that someone needs more support, not less. We would rather have an honest conversation about whether Somenta is the right fit than have you quietly drift away.</P_>
        </Section>

        {/* Section 5 */}
        <Section num="5" title="What You Can Expect from Us">
          <P_>This agreement runs both directions. Here is what Somenta commits to you:</P_>
          <Ul items={[
            <><strong style={{ fontWeight: 600, color: P.text }}>A thoughtful onboarding process.</strong> Someone from Somenta will reach out personally within hours of you joining. You will be introduced to your pod with care and intention.</>,
            <><strong style={{ fontWeight: 600, color: P.text }}>A first live session within days of joining,</strong> not weeks.</>,
            <><strong style={{ fontWeight: 600, color: P.text }}>A human check-in at day seven</strong> to see how you are settling in.</>,
            <><strong style={{ fontWeight: 600, color: P.text }}>Coaches who maintain confidentiality,</strong> show up prepared, and hold the container with integrity.</>,
            <><strong style={{ fontWeight: 600, color: P.text }}>Transparent communication</strong> if anything about the services, schedule, or structure changes.</>,
            <><strong style={{ fontWeight: 600, color: P.text }}>Responsiveness.</strong> If you reach out with a concern, you will hear back within 48 hours.</>,
          ]} />
        </Section>

        {/* Section 6 */}
        <Section num="6" title="When Agreements Are Broken">
          <P_>We do not expect perfection. We expect accountability.</P_>
          <P_>If a member violates this Agreement, the response will be proportional to the situation:</P_>
          <Ul items={[
            'A private conversation with your coach to understand what happened and repair the relationship if appropriate',
            'A formal warning if the behavior was harmful to another member or to the group',
            'Temporary suspension from community spaces if the behavior requires a cooling-off period',
            'Permanent removal from the community in cases of severe or repeated violations, including any breach of confidentiality that causes identifiable harm to another member',
          ]} />
          <P_>These decisions are made by the Somenta team and are not subject to appeal through the dispute resolution process in the Terms of Service. This is a community, and the safety of the group takes priority.</P_>
        </Section>

        {/* Section 7 */}
        <Section num="7" title="Your Commitment">
          <P_>By acknowledging this Member Agreement, you are making the following commitments:</P_>
          <Ul items={[
            'I understand the ground rules for communication and I agree to speak from my own experience, listen without fixing, and hold space for others.',
            'I understand the confidentiality commitment and I agree that what is shared within pods, Share Circles, and other confidential spaces stays within those spaces.',
            'I understand the emotional risks and I accept that engaging in integration practices and deep emotional sharing may bring up intense feelings, and that this is part of the process.',
            'I understand that Somenta is not therapy and that the coaches and facilitators are not acting as licensed clinicians. I take responsibility for seeking professional help if I need it.',
            'I commit to showing up for myself and for my pod, with the understanding that this community is built by the people in it.',
          ]} />
        </Section>

        {/* Footer nav */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: `1px solid ${P.div}`, display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <a href="/terms" style={{ fontSize: '13px', color: P.muted, textDecoration: 'none' }}>Terms of Service</a>
          <a href="/privacy" style={{ fontSize: '13px', color: P.muted, textDecoration: 'none' }}>Privacy Policy</a>
          <a href="mailto:hello@joinsomenta.com" style={{ fontSize: '13px', color: P.muted, textDecoration: 'none' }}>hello@joinsomenta.com</a>
        </div>
      </div>
    </div>
  )
}
