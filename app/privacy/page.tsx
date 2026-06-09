import type { CSSProperties } from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Somenta',
  description: 'Privacy Policy for Somenta, a membership community for life integration.',
}

const P = { bg: '#F7F3EC', text: '#281B0D', muted: '#6B5A47', div: '#E0D3BF', rust: '#B85030' }
const serif: CSSProperties = { fontFamily: 'var(--font-fraunces), Georgia, serif' }
const body: CSSProperties = { fontSize: '15px', lineHeight: 1.85, color: 'rgba(40,27,13,0.78)', margin: '0 0 1rem 0' }
const h2style: CSSProperties = { fontSize: '15px', fontWeight: 700, color: P.text, margin: '2.5rem 0 0.6rem', lineHeight: 1.4 }
const h3style: CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: P.text, margin: '1.75rem 0 0.5rem', lineHeight: 1.4 }

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section style={{ paddingTop: '0.25rem' }}>
      <h2 style={h2style}>{num}. {title}</h2>
      {children}
    </section>
  )
}

function Sub({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={h3style}>{num} {title}</h3>
      {children}
    </div>
  )
}

function P_({ children }: { children: React.ReactNode }) {
  return <p style={body}>{children}</p>
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: '0.5rem 0 1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(40,27,13,0.78)' }}>{item}</li>
      ))}
    </ul>
  )
}

export default function PrivacyPage() {
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
          <Image src="/assets/logo-mark.png" alt="Somenta" width={22} height={22}
            style={{ objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(52%) sepia(48%) saturate(632%) hue-rotate(346deg) brightness(96%) contrast(92%)' }} />
          <span style={{ ...serif, fontSize: '17px', color: P.text, fontWeight: 400 }}>Somenta</span>
        </a>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 740, margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 4vw, 40px) 120px' }}>

        {/* Title block */}
        <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: `1px solid ${P.div}` }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: P.muted, margin: '0 0 1rem' }}>Legal</p>
          <h1 style={{ ...serif, fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 400, color: P.text, margin: '0 0 0.75rem', letterSpacing: '-0.015em', lineHeight: 1.15 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '13.5px', color: P.muted, margin: 0, fontStyle: 'italic' }}>Last Updated: April 4, 2026</p>
        </div>

        {/* Intro */}
        <P_>This Privacy Policy explains how Somenta (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses, and otherwise processes personal data in connection with our website (joinsomenta.com), our community platform, and any related services, products, or applications that reference or link to this Privacy Policy (collectively, the &ldquo;Services&rdquo;).</P_>
        <P_>This Privacy Policy does not address our practices relating to data that is not subject to applicable data protection laws, such as deidentified or publicly available information. By using our Services, you consent to the practices described in this Privacy Policy. If you do not agree with these practices, please do not use our Services.</P_>

        <Section num="1" title="Our Collection and Use of Personal Data">
          <P_>The categories of personal data we collect depend on how you interact with us and our Services. You may provide us personal data directly when you register for an account, complete an introductory call, subscribe to a Membership, participate in community activities, or otherwise contact or interact with us. We also collect personal data automatically when you interact with our website and services.</P_>

          <Sub num="1.1" title="Personal Data Provided by You">
            <Ul items={[
              'Contact Information: including first and last name, email address, and communication preferences. Used to fulfill your requests, communicate with you, and send communications in accordance with your preferences.',
              'Account Information: including name, email address, account credentials, profile details, and subscription information. Used to administer your account, provide the Services, and for support purposes.',
              'Introductory Call Information: including details you share during your initial call with our team. Used to match you with an appropriate coach and pod.',
              'Community Content: including messages, posts, comments, and other content you share within the Somenta community. Used to provide the Services and facilitate community interactions.',
              'Payment Information: processed through our third-party payment processor. We do not retain full payment card numbers on our servers.',
              'Communications: including emails, feedback, support requests, and other correspondence you send to us.',
            ]} />
          </Sub>

          <Sub num="1.2" title="Personal Data Collected Automatically">
            <P_>We, and our third-party partners, automatically collect information about how you access and use our Services through cookies, web beacons, pixels, and similar technologies.</P_>
            <Ul items={[
              'Device and Network Information: including device type, operating system, IP address, browser type, and unique identifiers.',
              'Usage Information: including how you interact with the Services, pages visited, features used, session duration, and other browsing behavior.',
              'Location Information: including general geographic location derived from your IP address.',
            ]} />
          </Sub>

          <Sub num="1.3" title="Audio and Video Recordings">
            <P_>Somenta may record select live practice sessions for the purpose of building an on-demand resource library for current members. The following applies to all recordings:</P_>
            <Ul items={[
              'Members will be notified in advance whenever a session is designated for recording',
              'Recordings capture facilitator-led instruction and practice guidance only',
              'Members may opt out of being recorded by turning off their camera and microphone',
              'Recordings are stored securely and accessible only to current Somenta members',
              'Recordings are not sold, licensed, or distributed to any third party',
              'Share Circles, pod sessions, and any session involving personal sharing are never recorded under any circumstances',
            ]} />
          </Sub>

          <Sub num="1.4" title="Personal Data from Other Sources">
            <P_>We may receive personal data about you from third-party platforms and services we use to operate the Services, including our community platform provider, payment processor, and scheduling tools.</P_>
          </Sub>
        </Section>

        <Section num="2" title="How We Use Your Personal Data">
          <P_>In addition to the uses described above, we may use personal data we collect to:</P_>
          <Ul items={[
            'Provide, maintain, and improve the Services',
            'Process payments and manage your subscription',
            'Match you with an appropriate pod and coach',
            'Communicate with you about your membership, updates, events, and community activity',
            'Personalize your experience within the community',
            'Create and manage on-demand session recordings as described in Section 1.3',
            'Analyze usage patterns and improve our platform, content, and offerings',
            'Enforce our Terms of Service, Member Agreement, and community guidelines',
            'Detect, prevent, investigate, or address security incidents, fraud, or illegal activity',
            'Comply with legal obligations and protect our rights',
          ]} />
        </Section>

        <Section num="3" title="Community Confidentiality">
          <Sub num="3.1" title="Confidential Spaces">
            <P_>Somenta designates the following spaces as confidential:</P_>
            <Ul items={[
              'Pod sessions (small groups of 6–8 members)',
              'Share Circles (live group sessions involving personal disclosure)',
              'Coach-led integration circles',
              'Direct messages between members within the platform',
            ]} />
            <P_>Personal stories, emotional disclosures, and private information shared within these confidential spaces must not be discussed, distributed, or shared outside of that specific space.</P_>
          </Sub>
          <Sub num="3.2" title="What Confidentiality Means in Practice">
            <Ul items={[
              'You may share your own experience and what you learned, but you may not share identifying details about other members',
              'You may not reference another member by name or identifiable detail outside of the community',
              'You may not screenshot, copy, or forward messages or content from confidential spaces',
              'You may not discuss the membership or participation of any other member with anyone outside the community',
            ]} />
          </Sub>
          <Sub num="3.3" title="Limitations">
            <P_>While Somenta takes reasonable measures to create and protect a confidential environment, we cannot guarantee that all members will honor confidentiality commitments at all times. Somenta is not liable for disclosures made by other members.</P_>
          </Sub>
          <Sub num="3.4" title="Exceptions">
            <P_>Somenta may disclose information shared within the community if required by law, or if Somenta believes in good faith that disclosure is necessary to prevent imminent harm to a member or to others.</P_>
          </Sub>
        </Section>

        <Section num="4" title="Our Disclosure of Personal Data">
          <P_>We do not sell your personal information. We disclose or otherwise make available personal data in the following ways:</P_>
          <Sub num="4.1" title="Service Providers">
            <P_>We engage third-party service providers to perform certain services on our behalf, including community platform providers, payment processors, scheduling tools, analytics providers, email and communication service providers, customer support tools, and cloud hosting providers.</P_>
          </Sub>
          <Sub num="4.2" title="Coaches and Facilitators">
            <P_>Relevant information (such as your name, introductory call context, and pod assignment) is shared with Somenta coaches and facilitators to provide a personalized and supportive experience. Coaches and facilitators are required to maintain the confidentiality of all member information.</P_>
          </Sub>
          <Sub num="4.3" title="To Facilitate Legal Obligations and Rights">
            <P_>We may disclose personal data to third parties, such as legal advisors and law enforcement, in connection with the establishment, exercise, or defense of legal claims, to comply with laws or respond to lawful requests, to protect our rights and property and the rights of our members, or to protect the health and safety of us, our members, or any person.</P_>
          </Sub>
          <Sub num="4.4" title="Business Transfers">
            <P_>In the event of a merger, acquisition, or sale of all or a portion of our assets, your personal information may be disclosed or transferred as part of that transaction. We will notify you before your information becomes subject to a different privacy policy.</P_>
          </Sub>
          <Sub num="4.5" title="With Your Consent">
            <P_>We may disclose your personal data to other third parties or publicly with your consent or at your direction. For example, with your permission, we may share your testimonial on our website.</P_>
          </Sub>
        </Section>

        <Section num="5" title="Data Security">
          <P_>We have implemented reasonable physical, technical, and organizational safeguards designed to protect your personal data from unauthorized access, loss, misuse, or alteration. These include encryption of data in transit, secure authentication protocols, and access controls limited to authorized personnel.</P_>
          <P_>However, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security of your information.</P_>
        </Section>

        <Section num="6" title="Data Retention">
          <P_>We will retain personal data we collect about you for no longer than reasonably necessary to fulfill the purposes for which it was collected, and in accordance with our legitimate business interests and applicable law.</P_>
          <P_>After you cancel your subscription:</P_>
          <Ul items={[
            'Your account data and personal information will be retained for up to 90 days to comply with legal obligations, resolve disputes, and enforce our agreements',
            'Community content you have posted in non-confidential spaces may remain visible to other members unless you request its removal',
            'Session recordings in which you appear will remain in the on-demand library unless you request removal of your identifiable participation',
            'Payment records will be retained as required by applicable tax and financial regulations',
          ]} />
          <P_>You may request deletion of your personal data at any time by contacting us at <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a>. We will respond to your request within 30 days.</P_>
        </Section>

        <Section num="7" title="Your Privacy Choices">
          <Sub num="7.1" title="Communication Preferences">
            <P_>You can stop receiving promotional email communications from us by clicking the &ldquo;unsubscribe&rdquo; link in any of our emails. Please note you cannot opt out of service-related communications such as account verification or membership update emails.</P_>
          </Sub>
          <Sub num="7.2" title="Automatic Data Collection Preferences">
            <P_>You may utilize browser settings to restrict our use of automatic data collection technologies. Most browsers allow you to change settings to limit cookies. Note that blocking these technologies may negatively impact your experience using the Services.</P_>
          </Sub>
          <Sub num="7.3" title="Recording Opt-Out">
            <P_>You may opt out of being included in session recordings at any time by turning off your camera and microphone during recorded sessions or by choosing not to attend sessions designated for recording.</P_>
          </Sub>
          <Sub num="7.4" title="Modifying or Deleting Your Personal Data">
            <P_>If you have questions about reviewing, modifying, or deleting your personal data, you can contact us at <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a>.</P_>
          </Sub>
        </Section>

        <Section num="8" title="Your Rights">
          <P_>Depending on your location and applicable law, you may be able to exercise some or all of the following rights regarding your personal data:</P_>
          <Ul items={[
            'Right to Know / Access: the right to confirm whether we are processing personal data about you, and to obtain access to and a copy of that data.',
            'Right to Portability: the right to obtain a copy of your personal data in a structured, commonly used, and machine-readable format.',
            'Right to Correction: the right to correct inaccuracies in your personal data.',
            'Right to Deletion: the right to have us delete personal data we maintain about you, subject to certain exceptions.',
            'Right to Restrict Processing: the right to require us to limit the purposes for which we process your personal data.',
            'Right to Object: the right to object to processing based on our legitimate interests.',
            'Right to Withdraw Consent: where consent is the basis for processing, the right to withdraw your consent at any time.',
          ]} />
          <P_>To exercise any of these rights, please contact us at <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a>. Before processing your request, we may need to verify your identity.</P_>
        </Section>

        <Section num="9" title="U.S. State-Specific Disclosures">
          <Sub num="9.1" title="California Residents">
            <P_>If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect and how it is used, the right to request deletion, and the right not to be discriminated against for exercising your rights. We do not sell personal information as defined under the CCPA. To submit a verifiable consumer request, please contact us at <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a>.</P_>
          </Sub>
          <Sub num="9.2" title="Other U.S. States">
            <P_>Residents of other U.S. states with applicable privacy legislation may have similar rights regarding their personal data. Please contact us at <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a> to submit a request, and we will respond in accordance with applicable law.</P_>
          </Sub>
          <Sub num="9.3" title="Sensitive Personal Data">
            <P_>Certain personal data we collect may be classified as &ldquo;sensitive&rdquo; under applicable privacy laws, including account credentials and health-related information you choose to share with us. We only use or disclose sensitive personal data where reasonably necessary for the purposes of providing the Services.</P_>
          </Sub>
        </Section>

        <Section num="10" title="Cookies and Tracking Technologies">
          <P_>We use cookies and similar tracking technologies to analyze trends, administer our website, and gather usage information. You can control cookies through your browser settings, though disabling cookies may affect your ability to use certain features of the Services.</P_>
          <P_>When you visit our website, a cookie consent banner will appear. Analytics cookies are only set after you explicitly accept. You may withdraw your consent at any time by clearing your browser cookies and declining on your next visit.</P_>
          <Ul items={[
            'Essential Cookies: required for the basic functionality of the Services, including login and session management.',
            'Analytics Cookies: we use Google Analytics (provided by Google LLC) to understand how visitors interact with our website, including pages visited, time spent, and general geographic location. Google Analytics collects data anonymously and reports website trends without identifying individual visitors. You can opt out of Google Analytics by declining cookies in our consent banner or by installing the Google Analytics opt-out browser add-on at tools.google.com/dlpage/gaoptout.',
            'Preference Cookies: used to remember your cookie consent choice and other settings.',
          ]} />
        </Section>

        <Section num="11" title="Children's Privacy">
          <P_>The Services are not directed to, and we do not intentionally collect or solicit personal data from, individuals under the age of 18. If a child under 18 has provided personal data to us, we encourage the child&rsquo;s parent or guardian to contact us at <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a>, and we will take steps to delete such information.</P_>
        </Section>

        <Section num="12" title="Third-Party Websites and Services">
          <P_>Our Services may include links to third-party websites, plug-ins, applications, and other services. This Privacy Policy does not apply to any personal data practices of third parties. To learn about the personal data practices of third parties, please visit their respective privacy policies.</P_>
        </Section>

        <Section num="13" title="International Transfers of Personal Data">
          <P_>We operate in the United States and engage third-party partners and providers in various jurisdictions. Your personal data may be transferred to, stored in, or processed in the United States or other countries that may not provide the same level of data protection as your country of residence.</P_>
        </Section>

        <Section num="14" title="Updates to This Privacy Policy">
          <P_>We may update this Privacy Policy from time to time. When we make changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this document. If we make material changes, we will notify you by email to your registered email address or by prominent posting on the Services. Your continued use of the Services after any changes constitutes acceptance of the updated Privacy Policy.</P_>
        </Section>

        <Section num="15" title="Contact Us">
          <P_>If you have any questions, concerns, or requests in connection with this Privacy Policy or our data practices, please contact us at:</P_>
          <P_>Email: <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a><br />Website: <a href="https://joinsomenta.com" style={{ color: P.rust }}>joinsomenta.com</a></P_>
        </Section>

        {/* Footer */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: `1px solid ${P.div}`, display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="/terms" style={{ fontSize: '13px', color: P.muted, textDecoration: 'none' }}>Terms of Service</a>
          <a href="/" style={{ fontSize: '13px', color: P.muted, textDecoration: 'none' }}>Back to Home</a>
        </div>

      </main>
    </div>
  )
}
