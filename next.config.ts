import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Serve modern compressed formats, sized to the visitor's screen.
    // AVIF first (smallest), WebP fallback.
    formats: ['image/avif', 'image/webp'],
    // Quality values used across the site (hero uses 70, default is 75)
    qualities: [70, 75],
  },
}

export default nextConfig
