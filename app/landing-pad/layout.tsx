import type { Metadata } from 'next'

// Inclusive title/description for the Landing Pad so shared links (iMessage, etc.)
// don't fall back to the site-wide "The retreat is over" card. Works for anyone
// after a retreat OR a plant medicine journey.
export const metadata: Metadata = {
  title: 'The Landing Pad · Somenta',
  description: 'A free, private space to settle in and take your first practice before the community opens.',
  openGraph: {
    title: 'The Landing Pad · Somenta',
    description: 'A free, private space to settle in and take your first practice before the community opens.',
  },
}

export default function LandingPadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
