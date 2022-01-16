import React from 'react'
import { suspend } from 'suspend-react'
import Yoga from 'yoga-layout-prebuilt'

import { block, inlineblock } from './converter/block'
import text from './converter/text'
import textwrapper from './converter/text-wrapper'
import image from './converter/image'
import { resetId } from './utils/id'

let renderToReadableStream
let renderToPipeableStream

const IS_NODE = typeof window === 'undefined'

if (IS_NODE) {
  renderToPipeableStream =
    require('react-server-dom-webpack/writer.node.server').renderToPipeableStream
} else {
  renderToReadableStream =
    require('react-server-dom-webpack/writer.browser.server').renderToReadableStream
}

export default function Satori({ children, width, height }) {
  const stringified = suspend(
    async () => {
      if (IS_NODE) {
        const Writable = require('stream').Writable
        const chunks = []
        return new Promise((res) => {
          const wriable = new Writable({
            write(chunk, _, next) {
              chunks.push(chunk)
              next()
            },
            final(next) {
              res(Buffer.concat(chunks).toString('utf8'))
              next()
            },
          })
          renderToPipeableStream(children).pipe(wriable)
        })
      } else {
        let result = ''
        const readable = renderToReadableStream(children)
        const reader = readable.getReader()
        const decoder = new TextDecoder()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          result += decoder.decode(value)
        }
        return result
      }
    },
    [children],
    {
      equal: (a, b) => {
        return JSON.stringify(a.props) === JSON.stringify(b.props)
      },
    }
  )

  const converted = React.useMemo(
    () => startWork(stringified, width, height),
    [stringified]
  )

  return converted
}

function startWork(stringified, width, height) {
  const rows = stringified
    .split('\n')
    .filter(Boolean)
    .map((row) => JSON.parse(row.slice(row.indexOf(':') + 1)))

  const nodes = []
  function getNode(parent, layout) {
    if (layout) return nodes.shift()

    const node = Yoga.Node.create()
    parent.insertChild(node, parent.getChildCount())
    nodes.push(node)
    return node
  }

  function convert(el, parent, layout, style) {
    if (el === null) return ''

    if (typeof el === 'string') {
      return textwrapper(
        parent,
        el.replace(/\$@/g, '@'),
        convert,
        layout,
        style
      )
    }

    const node = getNode(parent, layout)

    const [_, type, __, props] = el
    switch (type) {
      case '$word':
        return text(node, props.children, convert, layout, style)
      case 'b':
        return inlineblock(node, props, convert, layout, {
          ...style,
          fontWeight: 'bold',
        })
      case 'span':
        return inlineblock(node, props, convert, layout, style)
      case 'img':
        return image(node, props, convert, layout, style)
      case 'h1':
        return block(node, props, convert, layout, {
          ...style,
          fontSize: 2 * style.fontSize,
          fontWeight: 'bold',
          marginTop: 0.67 * 2 * style.fontSize,
          marginBottom: 0.67 * 2 * style.fontSize,
        })
      case 'hr':
        return block(node, props, convert, layout, {
          ...style,
          backgroundColor: 'currentColor',
          height: 1,
          marginTop: 0.5 * 2 * style.fontSize,
          marginBottom: 0.5 * 2 * style.fontSize,
        })
      default:
        return block(node, props, convert, layout, style)
    }
  }

  const root = Yoga.Node.create()
  root.setWidth(width)
  root.setHeight(height)
  root.setFlexWrap(Yoga.WRAP_WRAP)

  resetId()
  for (const element of rows) {
    convert(element, root, null, { fontSize: 16, fontFamily: 'serif' })
  }

  root.calculateLayout(width, height, Yoga.DIRECTION_LTR)

  resetId()
  let result = ''
  for (const element of rows) {
    result += convert(
      element,
      root,
      { x: 0, y: 0 },
      { fontSize: 16, fontFamily: 'serif' }
    )
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      dangerouslySetInnerHTML={{ __html: result }}
    ></svg>
  )
}
