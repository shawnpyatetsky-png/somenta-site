import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Clean shareable links — each forwards to the quiz with its source tag,
  // so DMs and bios carry joinsomenta.com/jake instead of ?src=... clutter
  async redirects() {
    return [
      // Warm links (after a conversation) — straight to the quiz
      { source: '/jake', destination: '/quiz?src=fb-jake', permanent: false },
      { source: '/reddit', destination: '/quiz?src=reddit-shawn', permanent: false },
      { source: '/coach', destination: '/quiz?src=coaches', permanent: false },
      // Cold links (bios, profiles) — homepage first; the tag carries into the quiz
      { source: '/jake-site', destination: '/?src=fb-jake', permanent: false },
      { source: '/coach-site', destination: '/?src=coaches', permanent: false },
    ]
  },
  images: {
    // Serve modern compressed formats, sized to the visitor's screen.
    // AVIF first (smallest), WebP fallback.
    formats: ['image/avif', 'image/webp'],
    // Quality values used across the site (hero uses 70, default is 75)
    qualities: [70, 75],
    // Cap the largest generated variant at 1920px. Retina screens would otherwise
    // request 3840px (678KB for the hero) — invisible gain through the fog veil,
    // very visible cost in load time.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Let browsers and the edge cache optimized images for 31 days. Without this,
    // /assets-sourced images ship with max-age=0 and every visit re-downloads them.
    minimumCacheTTL: 2678400,
  },
}

export default nextConfig
