import { ImageResponse } from 'next/og'

// Icon metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Icon component
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#78350f',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fef3c7',
          borderRadius: '50%',
          fontWeight: 'bold',
        }}
      >
        R
      </div>
    ),
    {
      ...size,
    }
  )
}
