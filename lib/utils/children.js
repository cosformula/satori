export function convertChildren(node, props, convert, layout, style) {
  const children = props.children
  return typeof children === 'string' ||
    typeof children === 'number' ||
    (Array.isArray(children) && children.length === 4 && children[0] === '$')
    ? convert(children, node, layout, style)
    : children
        ?.map((child) => {
          return convert(child, node, layout, style)
        })
        .join('') || ''
}
