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
        fontFamily: 'Roboto',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          left: 42,
          top: 42,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            background: 'black',
          }}
        ></span>
        <span
          style={{
            marginLeft: 8,
            letterSpacing: -0.03,
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          rauchg.com
        </span>
      </div>
      <div
        style={{
          padding: '20px 40px',
          letterSpacing: -0.05,
          fontSize: 40,
          fontWeight: 700,
          width: 'auto',
          maxWidth: 600,
          textAlign: 'center',
          background: 'black',
          color: 'white',
        }}
      >
        {value}
      </div>
    </div>
  )
}

export default function App({ title, width = 800, height = 450 }) {
  const [value, setValue] = React.useState(title || '2020 in Review')

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
          <Satori width={width} height={height}>
            <Test value={value} />
          </Satori>
        </Suspense>
      </div>
    </>
  )
}
