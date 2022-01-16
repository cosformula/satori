import GraphemeSplitter from 'grapheme-splitter'
import Yoga from 'yoga-layout-prebuilt'

const splitter = new GraphemeSplitter()

let ctx

if (typeof window === 'undefined') {
  const { createCanvas } = require('@napi-rs/canvas')

  const canvas = createCanvas(300, 320)
  ctx = canvas.getContext('2d')
} else {
  const canvas = document.createElement('canvas')
  ctx = canvas.getContext('2d')
}

function withPx(v) {
  if (typeof v === 'number') return v + 'px'
  return v
}

function toRatio(v, base) {
  if (typeof v === 'number') return v / base
  if (v.endsWith('px')) return parseFloat(v) / base
  return parseFloat(v)
}

export default function text(node, content, convert, layout, style) {
  const fontWeight = style.fontWeight || 'normal'
  const fontSize = withPx(style.fontSize) || '16px'
  const fontFamily = style.fontFamily || 'serif'
  const fontStyle = style.fontStyle || 'normal'
  const color = style.color || 'black'
  const letterSpacing = style.letterSpacing || 0
  const textDecoration = style.textDecorationLine || 'inherit'
  const lineHeight = style.lineHeight
    ? toRatio(style.lineHeight, parseFloat(fontSize))
    : 1
  const writingMode = style.writingMode

  if (layout) {
    let { left, top, width, height } = node.getComputedLayout()
    left += layout.x
    top += layout.y

    return `<text x="${left}" y="${top}" width="${width}" height="${height}" fill="${color}" dominant-baseline="text-before-edge" xml:space="preserve" font-weight="${fontWeight}" font-style="${fontStyle}" font-size="${fontSize}" font-family="${fontFamily}" letter-spacing="${letterSpacing}" text-decoration="${textDecoration}" white-space="pre" ${
      writingMode === 'vertical-rl' ? 'writing-mode="tb"' : ''
    }>${content}</text>`
  }

  ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`
  const { width, fontBoundingBoxAscent, fontBoundingBoxDescent } =
    ctx.measureText(content)

  const contentHeight =
    (fontBoundingBoxDescent + fontBoundingBoxAscent) * lineHeight
  const contentWidth =
    width +
    (letterSpacing ? splitter.countGraphemes(content) * letterSpacing : 0)

  if (writingMode === 'vertical-rl') {
    node.setHeight(contentWidth)
    node.setWidth(contentHeight)
  } else {
    node.setHeight(contentHeight)
    node.setWidth(contentWidth)
  }

  return ''
}
