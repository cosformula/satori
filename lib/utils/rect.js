import gradient from 'gradient-parser'

import { getId } from './id'

function getStringifiedLength(len) {
  return len.value + len.type
}

function getRelativeValue(v, total) {
  if (typeof v === 'string' && v.endsWith('%')) {
    return +v.slice(0, -1) / 100
  }
  return parseFloat(v) / total
}

export function generateRect(style, left, top, node) {
  let defs = ''

  if (style.position === 'absolute') {
    node.calculateLayout()
  }
  const { width, height } = node.getComputedLayout()

  let fill = style.backgroundColor
  const borderRadius = style.borderBottomLeftRadius
  const borderWidth = style.borderWidth
  const borderColor = style.borderColor || style.color || 'inherit'

  let shouldUseRect = fill || borderRadius || borderWidth

  for (let background of style._backgrounds) {
    if (background.image) {
      shouldUseRect = true

      // gradient
      if (
        background.image.startsWith('linear-gradient(') ||
        background.image.startsWith('radial-gradient(')
      ) {
        let id
        const parsed = gradient.parse(background.image)[0]
        switch (parsed.type) {
          // case 'radial-gradient':
          //   console.log(parsed)
          //   id = getId()
          //   defs += `<radialGradient id="${id}">${parsed.colorStops
          //     .map(
          //       (stop, i) =>
          //         `<stop offset="${
          //           stop.length
          //             ? getStringifiedLength(stop.length)
          //             : (i / (parsed.colorStops.length - 1)) * 100 + '%'
          //         }" stop-color="${stop.value}"/>`
          //     )
          //     .join('')}</linearGradient>`
          //   fill = `url(#${id})`
          //   break
          case 'linear-gradient':
            id = getId()
            let x1, y1, x2, y2
            if (parsed.orientation.type === 'directional') {
              ;[x1, y1, x2, y2] = {
                top: [0, 1, 0, 0],
                bottom: [0, 0, 0, 1],
                left: [1, 0, 0, 0],
                right: [0, 0, 1, 0],
              }[parsed.orientation.value]
            } else if (parsed.orientation.type === 'angular') {
              const angle =
                (+parsed.orientation.value / 180) * Math.PI - Math.PI / 2
              const cos = Math.cos(angle)
              const sin = Math.sin(angle)
              x1 = 0
              y1 = 0
              x2 = cos
              y2 = sin
              if (x2 < 0) {
                x1 -= x2
                x2 = 0
              }
              if (y2 < 0) {
                y1 -= y2
                y2 = 0
              }
            }
            defs += `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${parsed.colorStops
              .map(
                (stop, i) =>
                  `<stop offset="${
                    stop.length
                      ? getStringifiedLength(stop.length)
                      : (i / (parsed.colorStops.length - 1)) * 100 + '%'
                  }" stop-color="${
                    stop.type === 'rgb'
                      ? `rgb(${stop.value})`
                      : stop.type === 'rgba'
                      ? `rgba(${stop.value})`
                      : stop.type === 'hex'
                      ? `#` + stop.value
                      : stop.value
                  }"/>`
              )
              .join('')}</linearGradient>`
            fill = `url(#${id})`
            break
        }
      } else if (background.image.startsWith('url(')) {
        const id = getId()

        const preserveAspectRatio =
          background.size === 'contain'
            ? 'xMidYMid'
            : background.size === 'cover'
            ? 'xMidYMid slice'
            : 'none'

        const parsed = background.image.slice(4, -1)

        let [w, h] = (background.size || '').split(' ')
        w = getRelativeValue(w || width, width)
        h = getRelativeValue(h || height, height)

        let rw = ['repeat-y', 'no-repeat'].includes(background.repeat) ? 1 : w
        let rh = ['repeat-x', 'no-repeat'].includes(background.repeat) ? 1 : h

        let x = 0
        let y = 0
        if (background.position) {
          let posX
          let posY
          switch (background.position) {
            case 'center':
              posX = posY = '50%'
              break
            case 'left':
              posX = '0%'
              posY = '50%'
              break
            case 'top':
              posX = '50%'
              posY = '0%'
              break
            case 'bottom':
              posX = '50%'
              posY = '100%'
              break
            case 'right':
              posX = '100%'
              posY = '50%'
              break
            default:
              ;[posX, posY] = background.position.split(' ')
              if (posX === 'left') posX = '0%'
              if (posX === 'center') posX = '50%'
              if (posX === 'right') posX = '100%'
              if (posY === 'top') posY = '0%'
              if (posY === 'center') posY = '50%'
              if (posY === 'bottom') posY = '100%'
          }
          x = getRelativeValue(posX, width) * (1 - w) * rw
          y = getRelativeValue(posY, height) * (1 - h) * rh
        }

        defs += `<pattern id="${id}" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="${rw}" height="${rh}">${
          fill ? `<rect x="0" y="0" width="1" height="1" fill="${fill}"/>` : ''
        }<image href="${parsed}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="${preserveAspectRatio}"/></pattern>`
        fill = `url(#${id})`
      }
    }
  }

  if (shouldUseRect) {
    return (
      (defs ? '<defs>' + defs + '</defs>' : '') +
      `<rect x="${left}" y="${top}" width="${width}" height="${height}" ${
        fill ? `fill="${fill}"` : 'fill="transparent"'
      } ${borderRadius ? `rx="${borderRadius}" ry="${borderRadius}"` : ''} ${
        borderWidth
          ? `stroke-width="${borderWidth}" stroke="${borderColor}"`
          : ''
      }></rect>`
    )
  }
  return ''
}
