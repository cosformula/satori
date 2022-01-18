const { renderAsync } = require('@resvg/resvg-js')
import { renderToPipeableStream } from 'react-dom/server'
import { Writable } from 'stream'
import { join } from 'path'
import opentype from 'opentype.js'

import Component from '../test'

let customFontsLoaded = false
const loadingCustomFonts = (async () => {
  const [FONT_ROBOTO, FONT_ROBOTO_BOLD] = await Promise.all([
    opentype.load(join(process.cwd(), 'assets', 'Roboto-Regular.ttf')),
    opentype.load(join(process.cwd(), 'assets', 'Roboto-Bold.ttf')),
  ])

  globalThis.__SATORI_OPENTYPE__ = {
    Roboto: {
      default: FONT_ROBOTO,
      700: FONT_ROBOTO_BOLD,
    },
    default: {
      default: FONT_ROBOTO,
      700: FONT_ROBOTO_BOLD,
    },
  }

  customFontsLoaded = true
})()

export const config = {
  unstable_includeFiles: ['assets'],
}

export default async (req, res) => {
  const { title, width, height } = req.query

  if (!customFontsLoaded) {
    await loadingCustomFonts
  }

  let didError
  const { abort, pipe } = renderToPipeableStream(
    <Component title={title} width={width} height={height} />,
    {
      onError(error) {
        didError = true
        res.statusCode = 500
        res.end(error.message)
        console.error(error)
        abort()
      },
      onCompleteAll() {
        if (!didError) {
          const chunks = []
          const wriable = new Writable({
            write(chunk, _, next) {
              chunks.push(chunk)
              next()
            },
            final(next) {
              next()
              ;(async () => {
                const html = Buffer.concat(chunks).toString('utf8')
                const svg = html.slice(
                  html.indexOf('<svg '),
                  html.indexOf('</svg>') + 6
                )

                const data = await renderAsync(svg, {
                  fitTo: {
                    mode: 'width',
                    value: 600,
                  },
                  font: {
                    fontFiles: [
                      join(process.cwd(), 'assets', 'Roboto-Regular.ttf'),
                      join(process.cwd(), 'assets', 'Roboto-Bold.ttf'),
                    ], // Load custom fonts.
                    loadSystemFonts: false,
                    defaultFontFamily: 'Roboto',
                  },
                })
                res.setHeader('content-type', 'image/png')
                res.send(data)
              })()
            },
          })
          pipe(wriable)
        }
      },
    }
  )
}
