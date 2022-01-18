import Yoga from 'yoga-layout-prebuilt'

import { inheritable, normalize, addBox } from '../utils/style'
import { getId } from '../utils/id'

export default function image(node, props = {}, convert, layout, style) {
  style = { ...style, ...normalize(props.style) }

  if (layout) {
    let { left, top, width, height } = node.getComputedLayout()
    left += layout.x
    top += layout.y

    const preserveAspectRatio =
      style.objectFit === 'contain'
        ? 'xMidYMid'
        : style.objectFit === 'cover'
        ? 'xMidYMid slice'
        : 'none'

    const borderRadius = style.borderBottomLeftRadius

    let clip = ''
    let clipId
    if (borderRadius) {
      clipId = getId()
      clip = `<clipPath id="${clipId}"><rect x="${left}" y="${top}" width="${width}" height="${height}" rx="${borderRadius}" ry="${borderRadius}"/></clipPath>`
    }

    return `${clip}<image href="${
      props.src
    }" x="${left}" y="${top}" width="${width}" height="${height}" preserveAspectRatio="${preserveAspectRatio}" ${
      clip ? `clip-path="url(#${clipId})"` : ''
    } />`
  }

  node.setHeight(props.height)
  node.setWidth(props.width)
  addBox(style, node)

  return ''
}
