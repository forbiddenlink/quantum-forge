import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'Quantum Forge - Employee Portal'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
  // Font loading (optional, using system fonts for simplicity and speed in this demo)
  // const interSemiBold = fetch(new URL('./Inter-SemiBold.ttf', import.meta.url)).then((res) => res.arrayBuffer())
 
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: '#0B1021',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Abstract Background Shapes */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: 800,
            height: 800,
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(115, 103, 240, 0.15), transparent 70%)',
            backgroundSize: '100% 100%',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: 600,
            height: 600,
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 201, 243, 0.1), transparent 70%)',
            backgroundSize: '100% 100%',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />

        {/* Content Container */}
        <div
           style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 10,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.03)',
            padding: '60px 100px',
            borderRadius: '32px',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
           }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #1F2852 0%, #7367F0 100%)',
              color: 'white',
              fontSize: 40,
              fontWeight: 800,
              marginBottom: 32,
              boxShadow: '0 0 30px rgba(115, 103, 240, 0.4)',
            }}
          >
            QF
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              background: 'linear-gradient(to bottom right, #ffffff, #94A3B8)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            Quantum Forge
          </div>

          <div
            style={{
              fontSize: 28,
              color: '#94A3B8',
              textAlign: 'center',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Next-Gen Employee Experience Platform
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
