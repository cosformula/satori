import { createCanvas, Image, GlobalFonts } from '@napi-rs/canvas'

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
                // res.end(svg)
                // return

                const image = new Image()
                image.src = Buffer.from(svg, 'utf-8')

                image.width = 1686
                image.height = 956

                const w = image.width
                const h = image.height

                // create a canvas of the same size as the image
                const canvas = createCanvas(w, h)
                const ctx = canvas.getContext('2d')

                // fill the canvas with the image
                ctx.drawImage(image, 0, 0)

                res.setHeader('content-type', 'image/png')
                res.send(await canvas.encode('png'))
              })()
            },
          })
          pipe(wriable)
        }
      },
    }
  )
}
