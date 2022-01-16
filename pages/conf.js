import React, { Suspense } from 'react'

import Satori from '../lib/satori'

function Test({ name, number }) {
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
        fontFamily: 'sans-serif',
        color: '#fff',
        letterSpacing: -0.1,
      }}
    >
      <div
        style={{
          width: 600,
          border: '6px solid #4A92F5',
          backgroundImage: 'linear-gradient(to bottom, #333, #111)',
          borderRadius: 20,
          paddingLeft: 40,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 40,
            }}
          >
            <img
              src='https://github.com/shuding.png'
              width={100 * 0.6}
              height={100 * 0.6}
              style={{
                borderRadius: 100,
              }}
            />
            <div style={{ flex: 1, marginLeft: 10 }}>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 3 }}>
                {name}
              </div>
              <div style={{ fontSize: 18, fontWeight: 300 }}>@shuding_</div>
            </div>
          </div>
          <div style={{ fontSize: 26, margin: '50px 0' }}>Next.js CONF</div>
          <div>October 26, 2021</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 40,
              marginTop: 10,
            }}
          >
            <div style={{ flex: 1, fontWeight: 300 }}>9a-1p PT Online</div>
            <div style={{ flex: '0 0 130px' }}>Hosted by ▲</div>
          </div>
        </div>
        <div
          style={{ flex: '0 0 1px', height: '90%', background: '#304b70' }}
        ></div>
        <div
          style={{
            display: 'flex',
            flex: '0 0 40px',
            height: '100%',
            padding: '40px 40px 40px 80px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              writingMode: 'vertical-rl',
              fontSize: 30,
              fontFamily:
                '"SF Mono,SFMono-Regular,ui-monospace,Menlo,Consolas,monospace"',
              letterSpacing: 2,
            }}
          >
            <span style={{ marginBottom: 5 }}>#</span>
            {number}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [value, setValue] = React.useState('Shu Ding')
  const [number, setNumber] = React.useState('123456')

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
      👈 update the name
      <br />
      <input
        defaultValue={number}
        onChange={(e) => {
          const val = e.currentTarget.value
          React.startTransition(() => {
            setNumber(val)
          })
        }}
      />{' '}
      👈 update the number
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
            <Test name={value} number={number} />
          </Satori>
        </Suspense>
      </div>
    </>
  )
}
