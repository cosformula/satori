import React, { Suspense } from 'react'

import Satori from '../lib/satori'

function Test({ value }) {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#000',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 450,
          top: -10,
          left: -10,
          backgroundImage: `url(data:image/svg+xml,%3Csvg width='1' height='1' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle fill='gray' cx='0.5' cy='0.5' r='.0125'/%3E%3C/svg%3E)`,
          backgroundSize: '80px 80px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 450,
          top: -10,
          left: -10,
          backgroundImage: `url(data:image/svg+xml,%3Csvg width='1' height='1' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle fill='gray' cx='0.5' cy='0.5' r='.0125'/%3E%3C/svg%3E)`,
          backgroundSize: '80px 80px',
          backgroundPosition: '55% 58%',
        }}
      />
      <img
        src="data:image/svg+xml,%3Csvg width='116' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' clip-rule='evenodd' d='M57.5 0L115 100H0L57.5 0z'/%3E%3C/svg%3E"
        width={116 * 0.8}
        height={100 * 0.8}
      />
      <div
        style={{
          padding: '60px 20px 0',
          letterSpacing: -0.05,
          fontFamily: 'sans-serif',
          fontSize: 36,
          fontWeight: 300,
          width: 'auto',
          maxWidth: 600,
          textAlign: 'center',
          color: '#fff',
          lineHeight: '1.5em',
        }}
      >
        <span style={{ fontWeight: 900 }}>Vercel: </span>
        {value}
      </div>
    </div>
  )
}

export default function App() {
  const [value, setValue] = React.useState(
    'Everything About React Server Components'
  )

  return (
    <>
      <input
        defaultValue={value}
        onChange={(e) => {
          const val = e.currentTarget.value
          React.startTransition(() => {
            setValue(val)
          })
        }}
      />{' '}
      👈 update the title to test layout wrapping
      <br />
      <br />
      <div
        style={{
          display: 'inline-flex',
          border: '1px solid #999',
          maxWidth: '100%',
        }}
      >
        <Suspense fallback={null}>
          <Satori width={800} height={450}>
            <Test value={value} />
          </Satori>
        </Suspense>
      </div>
    </>
  )
}
