import React, { Suspense } from 'react'

import Satori from '../lib/satori'

import logo from '../assets/swr-base64'

function Test({ value }) {
  return (
    <div style={{ background: 'white' }}>
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
          <img
            src="data:image/svg+xml,%3Csvg width='45' height='53' viewBox='0 0 45 53' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.0385 53C4.86288 53 2.38696 50.2369 1.22112 47.9189C0.0138461 45.5182 0 43.1204 0 43.0195V9.98052C0 9.87968 0.0138461 7.48172 1.22112 5.08112C2.38696 2.76311 4.86288 0 10.0385 0H26.6538C26.8401 0 31.2676 0.0255822 35.7355 2.24653C39.962 4.34761 45 8.82783 45 18.2403C45 27.6527 39.962 32.1329 35.7355 34.2339C31.2676 36.4549 26.8401 36.4805 26.6538 36.4805H20.0769V43.0195C20.0769 43.1204 20.0631 45.5182 18.8558 47.9189C17.69 50.2369 15.214 53 10.0385 53ZM3.46154 43.0195C3.46165 43.0292 3.48819 44.7922 4.36385 46.4707C5.44777 48.5485 7.30396 49.5584 10.0385 49.5584C12.8125 49.5584 14.684 48.5187 15.7596 46.3798C16.5921 44.7244 16.6154 43.0361 16.6154 43.0195V36.5514C15.0794 36.6516 12.7258 36.8929 10.4069 37.4744C5.79831 38.63 3.46154 40.4957 3.46154 43.0195ZM18.3462 33.039H26.6538C26.6886 33.0388 30.5443 32.9998 34.2876 31.1055C39.0989 28.6707 41.5385 24.3421 41.5385 18.2403C41.5385 12.095 39.0652 7.74959 34.1875 5.32489C30.4424 3.46313 26.6912 3.44156 26.6538 3.44156H10.0385C7.26438 3.44156 5.39296 4.48125 4.31735 6.62018C3.48485 8.27557 3.46154 9.96389 3.46154 9.98052V36.7397C4.89704 35.7142 6.88731 34.8017 9.61869 34.1228C13.9297 33.0512 18.1679 33.039 18.3462 33.039Z' fill='white'/%3E%3C/svg%3E%0A"
            width={30}
            height={30}
          />
        </div>
      </div>
      img:
      <img src={logo} width={30} height={100} />
      <img
        src={logo}
        width={30}
        height={100}
        style={{ objectFit: 'contain' }}
      />
      <img src={logo} width={30} height={100} style={{ objectFit: 'cover' }} />
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
          <img src={logo} width={30} height={20} />
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
            backgroundImage: `url(${logo})`,
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
            backgroundImage: `url(${logo})`,
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
            fontSize: 12,
            backgroundColor: 'red',
            border: '1px solid green',
            backgroundImage: `url(${logo})`,
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
