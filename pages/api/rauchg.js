import { GlobalFonts } from '@napi-rs/canvas'

const { render } = require('@resvg/resvg-js')

import { renderToPipeableStream } from 'react-dom/server'
import { Writable } from 'stream'
import { join } from 'path'
import TextToSVG from 'text-to-svg'

import Component from '../rauchg'

const FONT_ROBOTO = TextToSVG.loadSync(
  join(process.cwd(), 'assets', 'Roboto-Regular.ttf')
)
const FONT_ROBOTO_BOLD = TextToSVG.loadSync(
  join(process.cwd(), 'assets', 'Roboto-Bold.ttf')
)
globalThis.__SATORI_TextToSVG__ = {
  Roboto: {
    default: FONT_ROBOTO,
    700: FONT_ROBOTO_BOLD,
  },
  default: {
    default: FONT_ROBOTO,
  },
}

GlobalFonts.registerFromPath(
  join(process.cwd(), 'assets', 'Roboto-Regular.ttf'),
  'Roboto'
)

GlobalFonts.registerFromPath(
  join(process.cwd(), 'assets', 'Roboto-Bold.ttf'),
  'Roboto'
)

export const config = {
  unstable_includeFiles: ['assets'],
}

export default async (req, res) => {
  const { title, width, height } = req.query

  let didError
  const { abort, pipe } = renderToPipeableStream(
    <Component title={title} width={width} height={height} />,
    {
      onError(error) {
        didError = true
        res.statusCode = 500
        res.end(error.message)
        console.log(error)
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

                const pngData = render(svg, {
                  fitTo: {
                    mode: 'width',
                    value: 1686,
                  },
                  font: {
                    loadSystemFonts: false,
                  },
                })
                res.setHeader('content-type', 'image/png')
                res.send(pngData)
              })()
            },
          })
          pipe(wriable)
        }
      },
    }
  )
}
