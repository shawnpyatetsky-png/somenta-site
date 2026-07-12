import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
  },
}

export default nextConfig
