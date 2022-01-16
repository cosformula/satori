import GraphemeSplitter from 'grapheme-splitter'
import Yoga from 'yoga-layout-prebuilt'

import { inheritable } from '../utils/style'
import { convertChildren } from '../utils/children'

// TODO: use the measure function to do this: https://github.com/vincentriemer/react-native-dom/blob/146afe3fcdb5bbd9d9425e68bbf8e4e885299a44/ReactDom/views/Text/RCTShadowText.js#L140

const splitter = new GraphemeSplitter()

export default function textWrapper(node, content, convert, layout, style) {
  const textAlign = style.textAlign || 'left'
  const children = []

  // To correctly measure and wrap the text, let's make each word a yoga node.
  let word = ''
  const splitted = splitter.splitGraphemes(content)
  for (let char of splitted) {
    if (textAlign !== 'right') {
      word += char
    }
    if (
      [
        ' ',
        '.',
        '\n',
        ':',
        "'",
        '"',
        '?',
        '!',
        '-',
        '@',
        '+',
        '/',
        '\\',
      ].includes(char)
    ) {
      children.push(['$', '$word', null, { children: word }])
      word = ''
    }
    if (textAlign === 'right') {
      word += char
    }
  }
  if (word) {
    children.push(['$', '$word', null, { children: word }])
  }

  if (layout) {
    const content = convertChildren(
      node,
      { children },
      convert,
      layout,
      inheritable(style)
    )
    return content
  }

  node.setAlignItems(Yoga.ALIGN_BASELINE)
  switch (textAlign) {
    case 'center':
      node.setJustifyContent(Yoga.JUSTIFY_CENTER)
      break
    case 'right':
      node.setJustifyContent(Yoga.JUSTIFY_FLEX_END)
      break
    case 'justify':
      node.setJustifyContent(Yoga.JUSTIFY_SPACE_BETWEEN)
      break
  }

  convertChildren(node, { children }, convert, layout, inheritable(style))

  return ''
}
