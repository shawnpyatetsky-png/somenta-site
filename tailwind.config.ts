import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#2E5B44',
          deep: '#1F3D2D',
          ink: '#1A3A2B',
          muted: '#7F9485',
        },
        cream: {
          DEFAULT: '#F2EBDD',
          soft: '#EFE7D5',
        },
        sand: {
          DEFAULT: '#E8DFC8',
          warm: '#EADFC1',
        },
        gold: {
          DEFAULT: '#D9A441',
          soft: '#E6BE6A',
          ink: '#A87820',
        },
        ink: '#1A2922',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1180px',
      },
    },
  },
  plugins: [],
}

export default config
