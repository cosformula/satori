import transform from 'css-to-react-native'
import Yoga from 'yoga-layout-prebuilt'
import { parseElementStyle } from 'css-background-parser'

export function inheritable(style) {
  const s = {}
  ;[
    'color',
    'fontSize',
    'fontWeight',
    'fontFamily',
    'fontStyle',
    'letterSpacing',
    'writingMode',
    'lineHeight',
    'textAlign',
    'textDecorationLine',
    'textDecorationColor',
    'textDecorationStyle',
  ].forEach((property) => {
    if (property in style) s[property] = style[property]
  })
  return s
}

export function normalize(style) {
  const cloned = { ...style }
  const transformed = transform(
    Object.entries(cloned).map(([k, v]) => [
      k,
      typeof v === 'string'
        ? v
        : !['font-weight', 'fontWeight', 'line-height', 'lineHeight'].includes(
            k
          ) && typeof v === 'number'
        ? v + 'px'
        : v.toString(),
    ])
  )

  const { backgrounds } = parseElementStyle(style)
  transformed._backgrounds = backgrounds

  return transformed
}

export function addBox(style, node) {
  node.setDisplay(Yoga.DISPLAY_FLEX)

  const marginTop = style.marginTop || 0
  const marginBottom = style.marginBottom || 0
  const marginLeft = style.marginLeft || 0
  const marginRight = style.marginRight || 0
  const paddingTop = style.paddingTop || 0
  const paddingBottom = style.paddingBottom || 0
  const paddingLeft = style.paddingLeft || 0
  const paddingRight = style.paddingRight || 0

  node.setMargin(Yoga.EDGE_TOP, marginTop)
  node.setMargin(Yoga.EDGE_BOTTOM, marginBottom)
  node.setMargin(Yoga.EDGE_LEFT, marginLeft)
  node.setMargin(Yoga.EDGE_RIGHT, marginRight)
  node.setPadding(Yoga.EDGE_TOP, paddingTop)
  node.setPadding(Yoga.EDGE_BOTTOM, paddingBottom)
  node.setPadding(Yoga.EDGE_LEFT, paddingLeft)
  node.setPadding(Yoga.EDGE_RIGHT, paddingRight)
  node.setBorder(Yoga.EDGE_TOP, style.borderWidth || 0)
  node.setBorder(Yoga.EDGE_BOTTOM, style.borderWidth || 0)
  node.setBorder(Yoga.EDGE_LEFT, style.borderWidth || 0)
  node.setBorder(Yoga.EDGE_RIGHT, style.borderWidth || 0)

  if (style.position === 'absolute') {
    node.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE)
    node.setPosition(Yoga.EDGE_TOP, style.top || 0)
    node.setPosition(Yoga.EDGE_BOTTOM, style.bottom || 0)
    node.setPosition(Yoga.EDGE_LEFT, style.left || 0)
    node.setPosition(Yoga.EDGE_RIGHT, style.right || 0)
  } else {
    node.setPositionType(Yoga.POSITION_TYPE_RELATIVE)
  }

  // Default flex direction
  if (!style.flexDirection || style.flexDirection === 'row') {
    node.setFlexDirection(Yoga.FLEX_DIRECTION_ROW)
  } else if (style.flexDirection === 'column') {
    node.setFlexDirection(Yoga.FLEX_DIRECTION_COLUMN)
  } else if (style.flexDirection === 'row-reverse') {
    node.setFlexDirection(Yoga.FLEX_DIRECTION_ROW_REVERSE)
  } else if (style.flexDirection === 'column-reverse') {
    node.setFlexDirection(Yoga.FLEX_DIRECTION_COLUMN_REVERSE)
  }

  if (!style.flexWrap) {
    node.setFlexWrap(Yoga.WRAP_WRAP)
  }

  if (style.alignSelf === 'center') {
    node.setAlignSelf(Yoga.ALIGN_CENTER)
  } else if (style.alignSelf === 'flex-end') {
    node.setAlignSelf(Yoga.ALIGN_FLEX_END)
  }

  if (style.justifyContent === 'space-around') {
    node.setJustifyContent(Yoga.JUSTIFY_SPACE_AROUND)
  } else if (style.justifyContent === 'space-between') {
    node.setJustifyContent(Yoga.JUSTIFY_SPACE_BETWEEN)
  } else if (style.justifyContent === 'center') {
    node.setJustifyContent(Yoga.JUSTIFY_CENTER)
  } else if (style.justifyContent === 'flex-end') {
    node.setJustifyContent(Yoga.JUSTIFY_FLEX_END)
  } else {
    node.setJustifyContent(Yoga.JUSTIFY_FLEX_START)
  }

  if (style.flexBasis) {
    node.setFlexBasis(style.flexBasis)
  }
  if (style.flexGrow) {
    node.setFlexGrow(style.flexGrow)
  }
  if (style.flexShrink) {
    node.setFlexShrink(style.flexShrink)
  }

  if (style.alignItems === 'center') {
    node.setAlignItems(Yoga.ALIGN_CENTER)
  } else {
    node.setAlignItems(Yoga.ALIGN_FLEX_START)
  }

  const width = style.width
  const height = style.height
  if (width !== undefined) {
    node.setWidth(width)
  }
  if (height !== undefined) {
    node.setHeight(height)
  }

  if (style.maxWidth !== undefined) {
    node.setMaxWidth(style.maxWidth)
  }
  if (style.maxHeight !== undefined) {
    node.setMaxHeight(style.maxHeight)
  }
}
