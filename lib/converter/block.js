import Yoga from 'yoga-layout-prebuilt'

import { inheritable, normalize, addBox } from '../utils/style'
import { convertChildren } from '../utils/children'
import { generateRect } from '../utils/rect'

function gen(fn) {
  return (node, props = {}, convert, layout, style) => {
    style = { ...style, ...normalize(props.style) }

    if (layout) {
      let { left, top } = node.getComputedLayout()
      left += layout.x
      top += layout.y
      const inheritedLayout = { x: left, y: top }

      const rect = generateRect(style, left, top, node)
      const content = convertChildren(
        node,
        props,
        convert,
        inheritedLayout,
        inheritable(style)
      )

      return rect + content
    }

    fn(node)
    addBox(style, node)

    convertChildren(node, props, convert, layout, inheritable(style))
    return ''
  }
}

export const block = gen((node) => node.setWidth('100%'))
export const inlineblock = gen((node) => node.setWidthAuto())
