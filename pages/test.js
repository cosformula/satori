import React, { Suspense } from 'react'

import Satori from '../lib/satori'

function Test({ value }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: 'red' }}>
        HTML JSX to <b style={{ fontStyle: 'italic' }}>SVG</b>
      </div>
      <div>
        <span style={{ letterSpacing: 3, fontWeight: 900 }}>hello</span>, world.
      </div>
      <h1 style={{ marginTop: 0, fontFamily: 'sans-serif', letterSpacing: -3 }}>
        heading w/ negative letter spacing
      </h1>
      <div
        style={{
          backgroundColor: 'cyan',
          padding: '10px 0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span>it works!</span>
        <span style={{ alignSelf: 'center' }}>align-self: center</span>
        <span style={{ alignSelf: 'flex-end' }}>align-self: flex-end</span>
      </div>
      <div
        style={{
          backgroundColor: 'blanchedalmond',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <span>it works!</span>
        <span>justify-content:</span>
        <span>space-around</span>
      </div>
      <div
        style={{
          backgroundColor: 'crimson',
          color: 'white',
          display: 'flex',
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <span style={{ flex: '0 0 100px', border: '1px solid white' }}>
          flex: 0 0 100px
        </span>
        <span style={{ flex: 2, border: '1px solid white' }}>flex: 2</span>
        <span style={{ flex: 1, border: '1px solid white' }}>flex: 1</span>
      </div>
      <div
        style={{
          alignItems: 'flex-end',
          padding: 40,
          paddingLeft: 20,
          background: '#111',
          color: '#fff',
          borderRadius: 20,
        }}
      >
        <div
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            border: '1px solid white',
          }}
        >
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            {value} — Shared Hook State with{' '}
            <span
              style={{
                background: 'red',
                fontSize: 70,
                textDecoration: 'underline',
                fontStyle: 'italic',
                color: 'blue',
              }}
            >
              SWR
            </span>
          </div>
          <img src='/paco.svg' width={30} height={30} />
        </div>
      </div>
      img:
      <img src='/swr.png' width={30} height={100} />
      <img
        src='/swr.png'
        width={30}
        height={100}
        style={{ objectFit: 'contain' }}
      />
      <img
        src='/swr.png'
        width={30}
        height={100}
        style={{ objectFit: 'cover' }}
      />
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: -80,
            left: 100,
            width: 100,
            background: 'rgba(255,255,0,.5)',
          }}
        >
          Absolute position:
          <img src='/swr.png' width={30} height={20} />
        </div>
      </div>
      <hr />
      Text alignment:
      <div style={{ display: 'flex' }}>
        <span
          style={{
            display: 'inline-block',
            width: 100,
            height: 100,
            background: 'yellow',
            textAlign: 'center',
            border: '1px solid red',
          }}
        >
          Shared Hook State with lib SWR
        </span>
        <span
          style={{
            display: 'inline-block',
            width: 100,
            height: 100,
            background: 'yellow',
            textAlign: 'right',
            border: '1px solid red',
          }}
        >
          Shared Hook State with lib SWR
        </span>
        <span
          style={{
            display: 'inline-block',
            width: 100,
            height: 100,
            background: 'yellow',
            textAlign: 'justify',
            border: '4px solid blue',
            borderRadius: 20,
            backgroundImage:
              'linear-gradient(190deg, yellow 40%, green 60%, red 100%)',
          }}
        >
          justified align and linear-gradient background
        </span>
        <span
          style={{
            display: 'inline-block',
            width: 100,
            height: 100,
            background: 'red',
            color: 'white',
            textAlign: 'left',
            border: '1px solid green',
            backgroundImage: 'url(/swr.png)',
            backgroundSize: '50% 10%',
          }}
        >
          image and color background
        </span>
        <span
          style={{
            display: 'inline-block',
            width: 100,
            height: 100,
            background: 'red',
            color: 'white',
            textAlign: 'left',
            border: '1px solid green',
            backgroundImage: 'url(/swr.png)',
            backgroundSize: '50% 10%',
            backgroundRepeat: 'repeat-y',
          }}
        >
          image and color background, only repeat-y
        </span>
        <span
          style={{
            display: 'inline-block',
            width: 100,
            height: 100,
            textAlign: 'left',
            color: 'white',
            fontSize: '.8rem',
            backgroundColor: 'red',
            border: '1px solid green',
            backgroundImage: 'url(/swr.png)',
            backgroundSize: '50% 30px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '20% center',
          }}
        >
          no-repeat + background-position: 20% center + background-size: 50%
          30px
        </span>
      </div>
    </div>
  )
}

export default function App({ title = 'Hi' }) {
  const [value, setValue] = React.useState(title)

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
      <div style={{ display: 'flex', gap: 10 }}>
        <div>
          <h1>SVG:</h1>
          <hr />
          <Suspense fallback={null}>
            <Satori width={600} height={800}>
              <Test value={value} />
            </Satori>
          </Suspense>
        </div>
        <div>
          <h1>HTML:</h1>
          <hr />
          <div
            style={{
              width: 600,
              height: 800,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Test value={value} />
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * TODOs:
 * - font
 * - flex
 * - transform
 * - line-height
 * - br
 * - min/max width/height
 * - flex gap
 * - truncate
 * - typesetting prohibition
 */
