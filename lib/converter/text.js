import GraphemeSplitter from 'grapheme-splitter'
import Yoga from 'yoga-layout-prebuilt'

const splitter = new GraphemeSplitter()

let measure

if (typeof window === 'undefined') {
  measure = ({ fontWeight, fontSize, fontFamily }, content) => {
    const px = parseFloat(fontSize)
    if (globalThis.__SATORI_OPENTYPE__) {
      const font =
        __SATORI_OPENTYPE__[fontFamily]?.[fontWeight] ||
        __SATORI_OPENTYPE__[fontFamily]?.default ||
        __SATORI_OPENTYPE__.default?.[fontWeight] ||
        __SATORI_OPENTYPE__.default?.default
      if (font) {
        return {
          width: font.getAdvanceWidth(content, px),
          fontBoundingBoxAscent: (font.ascender / font.unitsPerEm) * px,
          fontBoundingBoxDescent: -(font.descender / font.unitsPerEm) * px,
        }
      }
    }
    throw new Error('font not found')
  }
} else {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  measure = ({ fontWeight, fontSize, fontFamily }, content) => {
    ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`
    return ctx.measureText(content)
  }
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

  const measured = measure({ fontWeight, fontSize, fontFamily }, content)

  if (layout) {
    let { left, top, width, height } = node.getComputedLayout()
    left += layout.x
    top += layout.y
    top += measured.fontBoundingBoxAscent

    return `<text x="${left}" y="${top}" width="${width}" height="${height}" fill="${color}" xml:space="preserve" style="white-space: pre" font-weight="${fontWeight}" font-style="${fontStyle}" font-size="${fontSize}" font-family="${fontFamily}" letter-spacing="${(
      letterSpacing / parseFloat(fontSize)
    ).toFixed(4)}em" text-decoration="${textDecoration}" ${
      writingMode === 'vertical-rl' ? 'writing-mode="tb"' : ''
    }>${content}</text>`
  }

  const { width, fontBoundingBoxAscent, fontBoundingBoxDescent } = measured

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
