import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'Somenta — The retreat is over. Now comes the hard part.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const root = join(process.cwd(), 'public')

  const fontData       = readFileSync(join(root, 'fonts/Fraunces.ttf'))
  const fontItalicData = readFileSync(join(root, 'fonts/Fraunces-Italic-Light.ttf'))
  const mountainBuf = readFileSync(join(root, 'assets/mountain_hero_wider.jpg'))
  const logoBuf     = readFileSync(join(root, 'assets/logo-mark.png'))

  const mountainSrc = `data:image/jpeg;base64,${mountainBuf.toString('base64')}`
  const logoSrc     = `data:image/png;base64,${logoBuf.toString('base64')}`

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#1A1108' }}>

        {/* Mountain */}
        <img src={mountainSrc} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%' }} />

        {/* Overlay — light at top so dark text reads, dark at bottom */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          background: 'linear-gradient(180deg, rgba(247,243,236,0.10) 0%, rgba(26,17,8,0.28) 50%, rgba(26,17,8,0.92) 100%)',
        }} />

        {/* Headline */}
        <div style={{
          position: 'absolute', top: 50, left: 0, right: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
          padding: '0 80px',
        }}>
          <span style={{ fontFamily: 'Fraunces', fontSize: 72, fontWeight: 400, fontStyle: 'normal', color: '#281B0D', lineHeight: 1.1, letterSpacing: '-0.022em' }}>
            The retreat is over.
          </span>
          <span style={{ fontFamily: 'Fraunces', fontSize: 72, fontWeight: 300, fontStyle: 'italic', color: '#281B0D', lineHeight: 1.1, letterSpacing: '-0.022em' }}>
            Now comes
          </span>
          <span style={{ fontFamily: 'Fraunces', fontSize: 72, fontWeight: 300, fontStyle: 'italic', color: '#281B0D', lineHeight: 1.1, letterSpacing: '-0.022em' }}>
            the hard part.
          </span>
        </div>

        {/* Bottom — logo + Somenta */}
        <div style={{ position: 'absolute', bottom: 48, left: 72, display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={logoSrc} style={{ width: 30, height: 30, objectFit: 'contain', opacity: 0.9 }} />
          <span style={{ fontFamily: 'Fraunces', fontSize: 30, fontWeight: 400, fontStyle: 'normal', color: '#F7F3EC', letterSpacing: '0.005em', lineHeight: 1 }}>
            Somenta
          </span>
        </div>

      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Fraunces', data: fontData,       style: 'normal', weight: 400 },
        { name: 'Fraunces', data: fontItalicData, style: 'italic', weight: 300 },
      ],
    }
  )
}
