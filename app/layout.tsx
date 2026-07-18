import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import './globals.css'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Somenta',
  url: 'https://www.joinsomenta.com',
  logo: 'https://www.joinsomenta.com/assets/logo-mark.png',
  description: 'Somenta is an online membership community for psychedelic integration and plant medicine integration, built for life after a retreat. We provide structured daily somatic practices, weekly live breathwork and meditation classes, and intimate peer share pods to help people translate profound retreat insights into lasting everyday change.',
  email: 'hello@joinsomenta.com',
  sameAs: [],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Somenta Membership',
  provider: { '@type': 'Organization', name: 'Somenta', url: 'https://www.joinsomenta.com' },
  description: 'A peer-supported online community for psychedelic integration, plant medicine integration, and life integration after a retreat. Offers daily breathwork and somatic audio drops, weekly live meditation and regulation classes, intimate 12-week facilitated share pods, and silent co-working practice rooms for individuals navigating life after ayahuasca, psilocybin, breathwork intensives, silent retreats, or other transformative experiences.',
  url: 'https://www.joinsomenta.com',
  serviceType: 'Integration Support Community',
  audience: {
    '@type': 'Audience',
    audienceType: 'Adults seeking psychedelic integration, plant medicine integration, life integration after a retreat, or breathwork integration after ayahuasca, psilocybin, DMT, ketamine, MDMA, silent meditation retreats, or somatic intensives.',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Foundation Membership',
      description: 'Access to weekly live guided classes (breathwork, meditation), daily async somatic audio drops, journaling prompts, the Practice Room, and community connection events.',
      price: '10.00',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '10.00',
        priceCurrency: 'USD',
        description: 'Introductory rate for first 3 months, then $25/month',
      },
      eligibleDuration: 'P3M',
      url: 'https://www.joinsomenta.com/quiz',
    },
    {
      '@type': 'Offer',
      name: 'The Intimate Peer Pod',
      description: 'Everything in Foundation plus a 12-week facilitated share circle with the same 8–10 trusted peers every Sunday, guided by a dedicated somatic facilitator.',
      price: '40.00',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '40.00',
        priceCurrency: 'USD',
        description: 'Introductory rate for first 3 months, then $60/month',
      },
      eligibleDuration: 'P3M',
      url: 'https://www.joinsomenta.com/quiz',
    },
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Somenta',
  url: 'https://www.joinsomenta.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.joinsomenta.com/quiz',
    description: 'Take the free integration path assessment',
  },
}

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Somenta — A membership community for life integration',
  description: 'Somenta is a membership community for psychedelic integration, focused on turning insights into daily life. Somatic practices, live breathwork and meditation classes, and intimate peer pods to help you translate plant medicine, ayahuasca, psilocybin, or retreat insights into lasting change.',
  icons: { icon: '/assets/Somenta_Icon_32x32_Amber.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        {/* Low-power mode: devices that jank hard while rendering (>1.2s of long
            tasks in the first 4s) get html.np-lite — expensive paint layers drop
            (see globals.css) — and the flag persists so every later visit starts
            lite. Fast devices pay ~nothing. Synthetic benchmarks can't see paint
            cost, so we observe the real visit instead. */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var el = document.documentElement, n = navigator;
            var save = n.connection && n.connection.saveData;
            var lowMem = n.deviceMemory && n.deviceMemory <= 2;
            if (localStorage.npLite === '1' || save || lowMem) { el.classList.add('np-lite'); }
            else if (window.PerformanceObserver) {
              var jank = 0;
              var po = new PerformanceObserver(function (l) { l.getEntries().forEach(function (e) { jank += e.duration }) });
              po.observe({ type: 'longtask', buffered: true });
              setTimeout(function () {
                po.disconnect();
                if (jank > 1200) { el.classList.add('np-lite'); try { localStorage.npLite = '1' } catch (e) {} }
              }, 4000);
            }
          } catch (e) {}
        `.replace(/\n\s*/g, ' ') }} />
      </head>
      <body data-theme="forest" className={`${fraunces.variable} ${inter.variable}`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-Y1KPX56G3S" />
      <Script id="clarity" strategy="afterInteractive">{`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "x0zu5vyxyp");
      `}</Script>
    </html>
  )
}
