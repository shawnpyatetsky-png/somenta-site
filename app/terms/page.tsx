import type { CSSProperties } from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Somenta',
  description: 'Terms of Service for Somenta, a membership community for life integration.',
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

function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ margin: '0.5rem 0 1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(40,27,13,0.78)' }}>{item}</li>
      ))}
    </ul>
  )
}

export default function TermsPage() {
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
          <Image src="/assets/logo-mark-amber.png" alt="Somenta" width={22} height={22} style={{ objectFit: 'contain' }} />
          <span style={{ ...serif, fontSize: '17px', color: P.text, fontWeight: 400 }}>Somenta</span>
        </a>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 740, margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 4vw, 40px) 120px' }}>

        {/* Title block */}
        <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: `1px solid ${P.div}` }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: P.muted, margin: '0 0 1rem' }}>Legal</p>
          <h1 style={{ ...serif, fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 400, color: P.text, margin: '0 0 0.75rem', letterSpacing: '-0.015em', lineHeight: 1.15 }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: '13.5px', color: P.muted, margin: 0, fontStyle: 'italic' }}>Last Modified: April 4, 2026</p>
        </div>

        {/* Intro */}
        <P_>Welcome to Somenta. Please carefully review these Terms of Service (the &ldquo;Terms&rdquo;) that govern your access to and use of the website (joinsomenta.com), the community platform, and any and all related services, content, recordings, and applications (collectively, the &ldquo;Services&rdquo;) provided by Somenta (including its successors and assigns, &ldquo;Somenta,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; and &ldquo;our&rdquo;). By using, accessing, or subscribing to the Services, you (&ldquo;Member,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;): (a) acknowledge that you have read, understand, and agree to these Terms and that you have read and understood our Privacy Policy, which is incorporated herein by reference; (b) represent that you are 18 years of age or older; and (c) accept and agree that you are legally bound by these Terms. If you do not agree to these Terms, you may not use or access the Services.</P_>

        {/* Warning block */}
        <div style={{
          background: 'rgba(40,27,13,0.04)', border: `1px solid ${P.div}`,
          borderRadius: 10, padding: '1.25rem 1.5rem', margin: '1.5rem 0 2.5rem',
        }}>
          <p style={{ fontSize: '13px', lineHeight: 1.85, color: 'rgba(40,27,13,0.75)', margin: 0, fontWeight: 500 }}>
            PLEASE READ THESE TERMS CAREFULLY. THESE TERMS CONTAIN A MANDATORY INDIVIDUAL ARBITRATION PROVISION IN SECTION 18(A) (THE &ldquo;ARBITRATION AGREEMENT&rdquo;) AND A CLASS ACTION/JURY TRIAL WAIVER PROVISION IN SECTION 18(D) (THE &ldquo;CLASS ACTION/JURY TRIAL WAIVER&rdquo;) THAT REQUIRE, UNLESS YOU OPT OUT PURSUANT TO THE INSTRUCTIONS IN SECTION 18(B), THE EXCLUSIVE USE OF FINAL AND BINDING ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES BETWEEN YOU AND US. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, YOU EXPRESSLY WAIVE YOUR RIGHT TO SEEK RELIEF IN A COURT OF LAW AND TO HAVE A JURY TRIAL ON YOUR CLAIMS, AS WELL AS YOUR RIGHT TO PARTICIPATE AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS, COLLECTIVE, OR REPRESENTATIVE ACTION OR PROCEEDING.
          </p>
        </div>

        <Section num="1" title="General Terms of Use and Restrictions">
          <P_>Subject to these Terms, Somenta grants you a limited, revocable, nonexclusive, nontransferable personal right to access and make use of the Services solely for your personal, non-commercial benefit.</P_>
          <P_>We may discontinue or alter any aspect of the Services or remove content from the Services at any time without prior notice. We may also immediately suspend or terminate your access under certain circumstances, including:</P_>
          <Ul items={[
            'Breaches or violations of these Terms, the Member Agreement, or other incorporated agreements',
            'Discontinuance or material modification of the Services',
            'Unexpected technical or security issues',
            'Extended periods of inactivity',
            'Engagement by you in fraudulent, inappropriate, or illegal activities',
          ]} />
          <P_>You agree that such measures shall be taken in our sole discretion and without liability to you or any third party.</P_>
        </Section>

        <Section num="2" title="Agreement Structure">
          <P_>Your participation in Somenta is governed by three documents, each serving a distinct purpose:</P_>
          <Ul items={[
            <><strong>Terms of Service (this document):</strong> the legal contract governing your use of the Services, payment, liability, and dispute resolution.</>,
            <><strong>Privacy Policy:</strong> how we collect, use, store, and protect your personal information.</>,
            <><strong>Member Agreement:</strong> the behavioral and cultural commitments required of all members, including communication ground rules, confidentiality obligations, and participation expectations.</>,
          ]} />
          <P_>Together, these three documents constitute the complete agreement between you and Somenta. By using the Services, you acknowledge that you have read, understood, and agreed to all three documents.</P_>
        </Section>

        <Section num="3" title="Description of Services">
          <P_>Somenta is a paid subscription community platform that provides peer-based support, integration resources, and ongoing connection for individuals navigating personal growth and transformation. The Services may include, but are not limited to:</P_>
          <Ul items={[
            'Curated small-group pods (approximately 6–8 members) with an assigned coach',
            'Coach-led integration circles and live practice sessions, including breathwork, meditation, somatic practices, and yoga',
            'Community events and in-person gatherings',
            'Access to the Somenta community platform',
            'On-demand recordings of select live sessions',
            'Educational and experiential content related to personal development and integration',
          ]} />
        </Section>

        <Section num="4" title="Eligibility">
          <P_>You must be at least 18 years of age to use the Services. By creating an account, you represent and warrant that you are at least 18 years old, that all information you provide is accurate and complete, and that you have the legal capacity to enter into these Terms.</P_>
        </Section>

        <Section num="5" title="Acceptance and Screening">
          <P_>Access to the Intimate Peer Pod tier requires completion of an introductory call with a member of the Somenta team. This call serves as a mutual screening process to determine whether Somenta is the right fit for you and whether you are the right fit for the community. Foundation tier members may join directly without a call.</P_>
          <P_>Somenta reserves the right, in its sole discretion, to decline any applicant for Pod membership for any reason or no reason, and without obligation to disclose the basis for such decision. Not every person who completes an introductory call will be offered membership. This is not a reflection of an applicant&rsquo;s worth or character; it is a reflection of Somenta&rsquo;s commitment to maintaining the integrity, safety, and culture of the community.</P_>
          <P_>If you are declined for membership, any fees already paid will be refunded in full.</P_>
        </Section>

        <Section num="6" title="Account Registration and Security">
          <P_>To access the Services, you must create an account (&ldquo;Account&rdquo;) and acknowledge all three Somenta agreements. Pod tier members must also complete an introductory call prior to joining. You are responsible for maintaining the confidentiality of your password and any other authentication credentials associated with your Account and are fully responsible for all activities that occur under your Account. You are prohibited from sharing your Account with, or assigning your Account to, any other person without our prior written authorization. Should you become aware of or suspect any unauthorized use of your Account, you must immediately notify us at <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a>.</P_>
        </Section>

        <Section num="7" title="Informed Consent and Assumption of Risk">
          <Sub num="7.1" title="Nature of the Program">
            <P_>Somenta involves experiential practices that engage the body, emotions, and attention. These may include breathwork, meditation, somatic movement, yoga, guided visualization, and deep emotional sharing in group settings. These practices are designed to support personal integration and growth, and they involve intentionally directing awareness toward thoughts, feelings, and physical sensations.</P_>
          </Sub>
          <Sub num="7.2" title="Physical Risks">
            <P_>Participation in physical practices such as breathwork, yoga, and somatic movement carries inherent risks. These may include, but are not limited to: muscle strain, fatigue, dizziness, lightheadedness, changes in blood pressure, and in rare cases, physical injury. You acknowledge that you participate in all physical practices at your own risk and that Somenta, its founders, coaches, and facilitators shall not be held liable for any physical injury sustained during your participation in the Services.</P_>
            <P_>You are responsible for consulting with your physician or healthcare provider before beginning any new physical practice. If you have any medical conditions, injuries, or physical limitations, it is your responsibility to disclose them to your coach and to modify or abstain from practices as appropriate.</P_>
          </Sub>
          <Sub num="7.3" title="Emotional and Psychological Risks">
            <P_>Engaging in deep integration work, somatic practices, and emotional sharing within a group setting may cause feelings of sadness, anger, fear, grief, or other strong emotions to feel more intense initially. This is a normal part of the process of paying conscious attention to emotional and physical experience. However, these practices are not therapy and are not designed to treat or diagnose any mental health condition.</P_>
            <P_>You acknowledge and accept that emotional intensity may arise during your participation, that this is part of the process and not an indication of harm, and that Somenta is not responsible for managing your emotional experience outside of sessions.</P_>
          </Sub>
          <Sub num="7.4" title="Voluntary Participation">
            <P_>Your participation in all Somenta activities, sessions, and practices is entirely voluntary. You may choose to modify, pause, or opt out of any practice or session at any time without explanation or consequence. You are solely responsible for your own wellbeing during and after participation.</P_>
          </Sub>
        </Section>

        <Section num="8" title="Medical Disclaimers and Exclusionary Criteria">
          <Sub num="8.1" title="Somenta Is Not Clinical Care">
            <P_>Somenta provides peer support, community connection, and integration coaching. Somenta does not provide therapy, counseling, psychiatric care, medical advice, or any licensed professional clinical services. No coach, facilitator, or staff member at Somenta is acting in the capacity of a licensed therapist, counselor, psychologist, psychiatrist, or medical professional in their role within the Somenta community.</P_>
            <P_>Nothing in the Services should be construed as a diagnosis, treatment plan, or clinical recommendation. The Services are not a substitute for professional medical or mental health treatment.</P_>
            <div style={{ background: 'rgba(40,27,13,0.04)', border: `1px solid ${P.div}`, borderRadius: 8, padding: '1rem 1.25rem', margin: '0.75rem 0 1rem' }}>
              <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(40,27,13,0.72)', margin: 0, fontWeight: 500 }}>THE INFORMATION AND SERVICES PROVIDED THROUGH SOMENTA DO NOT CREATE A MEDICAL PROFESSIONAL OR PATIENT RELATIONSHIP BETWEEN SOMENTA AND YOU AND DO NOT CONSTITUTE ANY PROFESSIONAL OPINION, MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT. YOU SHOULD NOT ACT OR REFRAIN FROM ACTING ON THE BASIS OF ANY CONTENT OR EXPERIENCE OBTAINED THROUGH THE SERVICES WITHOUT SEEKING THE ADVICE OF A PROFESSIONAL LICENSED AND QUALIFIED IN THE APPLICABLE SUBJECT MATTER. SOMENTA EXPRESSLY DISCLAIMS ALL LIABILITY IN RESPECT OF ACTIONS TAKEN OR NOT TAKEN BASED ON ANY CONTENT OR EXPERIENCE OBTAINED THROUGH THE SERVICES.</p>
            </div>
          </Sub>
          <Sub num="8.2" title="Exclusionary Criteria">
            <P_>Somenta is not designed to serve as a substitute for professional care for individuals experiencing acute or severe mental health conditions. The following conditions may indicate that Somenta is not the appropriate level of support and that professional clinical services should be sought first:</P_>
            <Ul items={[
              'Active suicidal ideation or recent suicide attempt',
              'Untreated or actively destabilizing psychosis',
              'Acute major depressive episodes requiring clinical intervention',
              'Active substance use disorders requiring detox or clinical stabilization',
              'Any condition for which a licensed mental health professional has advised against participation in group or experiential programs',
            ]} />
            <P_>If you are uncertain whether Somenta is appropriate for your current situation, we encourage you to discuss this with your mental health provider before joining. If at any point during your membership your circumstances change and you require a higher level of clinical care, we will support your transition to appropriate professional services.</P_>
          </Sub>
          <Sub num="8.3" title="Emergency Situations">
            <P_>If you or someone you know is experiencing a mental health emergency, please seek immediate help:</P_>
            <Ul items={[
              'Call 911 for immediate danger',
              'Call or text 988 (Suicide and Crisis Lifeline)',
              'Text HOME to 741741 (Crisis Text Line)',
              'Go to your nearest emergency room',
            ]} />
            <P_>Somenta coaches and facilitators are not trained or equipped to handle psychiatric emergencies. In the event a member discloses an active crisis during a session, our team will provide referrals to professional resources but cannot provide clinical intervention.</P_>
          </Sub>
        </Section>

        <Section num="9" title="Membership and Payment">
          <Sub num="9.1" title="Service Fees">
            <P_>Certain aspects of the Services may be provided for free, while certain other aspects require a paid subscription (&ldquo;Membership&rdquo;). By enrolling in a Membership, you agree to the pricing and payment terms applicable to you as made available through your Account or at joinsomenta.com. We may add new services for additional fees, amend fees for existing services, or discontinue any Membership at any time; provided, however, that if we have agreed to a specific subscription term and fee, that Membership will remain in force at that fee during that term. Any change to pricing will become effective in the billing cycle following our provision of notice of such change.</P_>
          </Sub>
          <Sub num="9.2" title="Payment Processing">
            <P_>Payments are processed through our third-party payment processor, currently Stripe, Inc. By subscribing, you authorize Somenta and our payment processor to charge your designated payment method on a recurring basis until you cancel your subscription. You represent and warrant that all payment information you provide is true, accurate, and complete, and that you are authorized to use the payment method.</P_>
          </Sub>
          <Sub num="9.3" title="Automatic Renewal">
            <P_>YOUR MEMBERSHIP WILL AUTOMATICALLY RENEW AT THE END OF EACH SUBSCRIPTION TERM FOR SUBSEQUENT TERMS EQUAL IN LENGTH TO THE INITIAL TERM UNLESS AND UNTIL YOU CANCEL IN ACCORDANCE WITH THE CANCELLATION PROCEDURES BELOW.</P_>
          </Sub>
          <Sub num="9.4" title="Cancellation">
            <P_>You may cancel your Membership at any time through your Account settings or by contacting us at <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a>. Should you cancel before the end of your current subscription term, you will retain access to the Services until the end of that term.</P_>
          </Sub>
          <Sub num="9.5" title="Refunds">
            <P_>If you are dissatisfied with the Services within the first 14 days of your initial subscription, you may request a full refund by emailing <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a>. After the initial 14-day period, all fees are non-refundable. Refund requests will be processed within 10 business days.</P_>
          </Sub>
          <Sub num="9.6" title="Price Changes">
            <P_>We may change the price of any Membership at any time. Somenta will notify you at least 7 days before any price increase takes effect. Any price change will become effective on the first day of the next subscription term. If you do not cancel after receiving notice of a price change, you consent to the new rate.</P_>
          </Sub>
        </Section>

        <Section num="10" title="Audio and Video Recordings">
          <Sub num="10.1" title="Session Recordings">
            <P_>Somenta may record select live sessions, including breathwork, meditation, yoga, and other practice sessions, for the purpose of building an on-demand resource library available to current members. These recordings capture facilitator-led instruction and practice guidance only. We will never record a session without your consent.</P_>
          </Sub>
          <Sub num="10.2" title="Consent">
            <P_>By participating in the Services, you consent to being recorded during live sessions that are designated as recorded. Somenta will clearly indicate in advance when a session will be recorded. If you do not wish to be recorded, you may choose not to participate in that session, or you may turn off your camera and microphone during recorded portions.</P_>
          </Sub>
          <Sub num="10.3" title="Use and Access">
            <P_>Recorded sessions will be made available only to current Somenta members through the platform. Recordings will not be sold, licensed, or distributed to third parties. Somenta retains ownership of all recordings.</P_>
          </Sub>
          <Sub num="10.4" title="Confidential Sessions Are Never Recorded">
            <P_>Share Circles, pod sessions, and any session involving personal disclosure or group sharing are never recorded. These spaces are confidential by design. No audio or video capture of any kind is permitted by Somenta or by members in these settings.</P_>
          </Sub>
          <Sub num="10.5" title="Member Recordings Prohibited">
            <P_>Members may not record, screenshot, or capture any live session, pod meeting, Share Circle, or other community interaction without the express written consent of all participants and Somenta. Violation of this policy is grounds for immediate termination of membership.</P_>
          </Sub>
        </Section>

        <Section num="11" title="Community Guidelines">
          <P_>Your participation in the Somenta community is governed by our Member Agreement, which is a separate document that outlines the behavioral expectations, communication ground rules, and confidentiality commitments required of all members. The Member Agreement is incorporated into these Terms by reference.</P_>
          <P_>Violations of the Member Agreement may result in a private conversation with your coach, temporary suspension of community access, or termination of membership, at the sole discretion of Somenta.</P_>
        </Section>

        <Section num="12" title="User Contributions">
          <P_>Members may post, submit, publish, display, or transmit information or materials (&ldquo;User Contributions&rdquo;) on or through the Services. Any User Contribution you post to the Services will be considered non-confidential and non-proprietary unless posted within a designated confidential space (pods, Share Circles, integration circles, or direct messages), in which case the confidentiality provisions of the Member Agreement and Privacy Policy apply.</P_>
          <P_>By providing any User Contribution on the Services, you grant Somenta a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, display, and distribute such material in connection with the operation and promotion of the Services. For the avoidance of doubt, any User Contributions used for marketing or promotional purposes shall not contain identifying features of the member who posted them without that member&rsquo;s express consent.</P_>
        </Section>

        <Section num="13" title="Intellectual Property">
          <P_>All content, materials, session recordings, branding, logos, and other intellectual property available through the Services (excluding your User Contributions) are the property of Somenta or its licensors and are protected by United States and international intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any Somenta content without prior written consent.</P_>
        </Section>

        <Section num="14" title="Third-Party Services">
          <P_>The Services may be hosted on, integrate with, or link to websites, platforms, or resources maintained by third parties, including but not limited to community platform providers, payment processors, scheduling tools, analytics providers, and email service providers. You agree that we have no control over and are not responsible for the content or availability of such third-party services, or for any privacy or other practices of the third parties operating them.</P_>
        </Section>

        <Section num="15" title="Privacy">
          <P_>Your privacy is important to us. Please carefully review our <a href="/privacy" style={{ color: P.rust }}>Privacy Policy</a> for information about how Somenta collects, uses, stores, and shares your personal information.</P_>
        </Section>

        <Section num="16" title="Disclaimer">
          <div style={{ background: 'rgba(40,27,13,0.04)', border: `1px solid ${P.div}`, borderRadius: 8, padding: '1rem 1.25rem', margin: '0.5rem 0 1rem' }}>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(40,27,13,0.72)', margin: 0, fontWeight: 500 }}>THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND ON AN &ldquo;AS AVAILABLE&rdquo; BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, SOMENTA HEREBY EXPRESSLY DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK.</p>
          </div>
        </Section>

        <Section num="17" title="Limitation of Liability">
          <div style={{ background: 'rgba(40,27,13,0.04)', border: `1px solid ${P.div}`, borderRadius: 8, padding: '1rem 1.25rem', margin: '0.5rem 0 1rem' }}>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(40,27,13,0.72)', margin: 0, fontWeight: 500 }}>TO THE MAXIMUM EXTENT PERMITTED BY LAW, YOU EXPRESSLY UNDERSTAND AND AGREE THAT SOMENTA SHALL NOT BE LIABLE FOR ANY INJURY YOU MAY SUSTAIN OR ANY DIRECT, INDIRECT, CONSEQUENTIAL, SPECIAL, INCIDENTAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF YOUR USE OF OR INABILITY TO USE THE SERVICES. TO THE MAXIMUM EXTENT PERMITTED BY LAW, SOMENTA&rsquo;S TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU FOR THE SERVICES DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>
          </div>
        </Section>

        <Section num="18" title="Arbitration and Class Action/Jury Trial Waiver">
          <Sub num="18.1" title="Arbitration Agreement">
            <P_>This Arbitration Agreement applies to and governs any dispute, controversy, or claim between you and Somenta that arises out of or relates to these Terms, access to or use of the Services, any transactions through the Services, or any other aspect of your relationship with us as a member. Any Claims shall first be attempted to be resolved through good-faith negotiation by contacting us at <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a>. In the unlikely event that we have not been able to resolve a Claim after sixty (60) days, we each agree to resolve such Claim exclusively through binding arbitration by the American Arbitration Association (&ldquo;AAA&rdquo;) before a single arbitrator, under the Consumer Arbitration Rules then in effect. The arbitration shall take place in Los Angeles County, California, unless you and Somenta agree otherwise.</P_>
          </Sub>
          <Sub num="18.2" title="Opting Out of Arbitration">
            <P_>If you are a new member, you can reject and opt out of this Arbitration Agreement within thirty (30) days of accepting these Terms by emailing us at <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a> with your full legal name and stating your intent to opt out.</P_>
          </Sub>
          <Sub num="18.3" title="Equitable Relief">
            <P_>Nothing in this Arbitration Agreement will be deemed as preventing Somenta from seeking injunctive or other equitable relief from the courts as necessary to prevent the actual or threatened infringement, misappropriation, or violation of our data security, confidential information, or intellectual property rights.</P_>
          </Sub>
          <Sub num="18.4" title="Class Action/Jury Trial Waiver">
            <div style={{ background: 'rgba(40,27,13,0.04)', border: `1px solid ${P.div}`, borderRadius: 8, padding: '1rem 1.25rem', margin: '0.5rem 0 1rem' }}>
              <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(40,27,13,0.72)', margin: 0, fontWeight: 500 }}>YOU AGREE THAT ANY CLAIM YOU MAY HAVE AGAINST SOMENTA MAY ONLY BE BROUGHT INDIVIDUALLY AND YOU WILL NOT JOIN SUCH CLAIM WITH CLAIMS OF ANY OTHER PERSON OR ENTITY OR BRING, JOIN, OR PARTICIPATE IN A CLASS ACTION AGAINST SOMENTA. BY ACCEPTING THESE TERMS, YOU AND SOMENTA ARE EACH WAIVING THE RIGHT TO PARTICIPATE IN OR BRING A CLASS ACTION AND THE RIGHT TO A JURY TRIAL.</p>
            </div>
          </Sub>
        </Section>

        <Section num="19" title="Release and Indemnification">
          <P_>You agree to release Somenta, its founders, coaches, facilitators, employees, and affiliates from any and all liability and obligations whatsoever in connection with or arising out of your use of the Services. If at any time you are not satisfied with the Services, your sole remedy is cessation of use.</P_>
          <P_>You agree to defend, indemnify, and hold harmless Somenta, its founders, coaches, facilitators, employees, and affiliates from and against any and all claims, actions, demands, losses, liabilities, expenses, and costs, including reasonable legal fees, arising from your access to or use of the Services, your participation in any session or practice, breach of these Terms or the Member Agreement, or any negligence or willful misconduct by you.</P_>
        </Section>

        <Section num="20" title="Notice of Copyright Infringement">
          <P_>We respect content owners&rsquo; rights, and it is our policy to respond to alleged infringement notices that comply with the Digital Millennium Copyright Act of 1998 (&ldquo;DMCA&rdquo;). To report a claim, please contact us at: <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a>, Attn: DMCA Notice.</P_>
        </Section>

        <Section num="21" title="Termination">
          <P_>Somenta may terminate or suspend your access to the Services at any time, with or without cause, and with or without notice. You may terminate these Terms at any time by canceling your Membership and discontinuing your use of the Services. Upon termination, your right to use the Services will immediately cease.</P_>
        </Section>

        <Section num="22" title="Governing Law">
          <P_>You agree that the laws of the State of California, without giving effect to any principles of conflicts of law, govern these Terms and any dispute that may arise between you and us. Notwithstanding the foregoing, the Federal Arbitration Act governs the interpretation and enforcement of the Arbitration Agreement.</P_>
        </Section>

        <Section num="23" title="Modifications to These Terms">
          <P_>We may modify or update these Terms from time to time. When we change these Terms in a material manner, we will update the &ldquo;Last Modified&rdquo; date at the top of this document and notify you by email. Your continued access to or use of the Services after the Terms have been revised constitutes your express consent to the modified Terms.</P_>
        </Section>

        <Section num="24" title="General Provisions">
          <Ul items={[
            <><strong>Entire Agreement.</strong> These Terms, together with the Privacy Policy and Member Agreement, constitute the complete and entire agreement between you and Somenta with respect to the Services.</>,
            <><strong>No Waiver.</strong> No waiver by either party of any breach of these Terms shall be deemed a further or continuing waiver of any other breach.</>,
            <><strong>Severability.</strong> If any provision of these Terms is found to be unenforceable, the invalidity of such provision will not affect the validity of the remaining provisions.</>,
            <><strong>Assignment.</strong> You may not assign or transfer your rights or obligations under these Terms without our prior written consent. Somenta may assign its rights and obligations under these Terms without restriction.</>,
            <><strong>California Residents.</strong> If you are a California resident, you may report complaints to the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs by contacting it at 1625 North Market Blvd., Suite N 112, Sacramento, CA 95834, or by telephone at (800) 952-5210.</>,
          ]} />
        </Section>

        <Section num="25" title="Contact Information">
          <P_>If you have any questions about these Terms or the Services, please contact us at:</P_>
          <P_>Email: <a href="mailto:hello@joinsomenta.com" style={{ color: P.rust }}>hello@joinsomenta.com</a><br />Website: <a href="https://joinsomenta.com" style={{ color: P.rust }}>joinsomenta.com</a></P_>
        </Section>

        {/* Footer */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: `1px solid ${P.div}`, display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="/privacy" style={{ fontSize: '13px', color: P.muted, textDecoration: 'none' }}>Privacy Policy</a>
          <a href="/member-agreement" style={{ fontSize: '13px', color: P.muted, textDecoration: 'none' }}>Member Agreement</a>
          <a href="/" style={{ fontSize: '13px', color: P.muted, textDecoration: 'none' }}>Back to Home</a>
        </div>

      </main>
    </div>
  )
}
