import type { SealConfig, SealRenderResult } from '@/types/seal'
import { resolveFontFamily } from '@/constants/font-options'

export function renderSealSvg(config: SealConfig): SealRenderResult {
  const sealSize = config.diameter
  const padding = Math.max(config.companyFontSize + 18, 36)
  const canvasSize = sealSize + padding * 2
  const center = canvasSize / 2
  const outerRadius = sealSize / 2 - config.outerBorderWidth
  const innerRadius = outerRadius - 20
  const companyInset = Math.max(config.companyFontSize * 0.72, 14) + config.companyOffsetY
  const companyTextRadius = outerRadius - companyInset
  const securityTextRadius = outerRadius - Math.max(config.securityFontSize * 1.8, 18)
  const clipRadius = outerRadius + config.outerBorderWidth * 0.5
  const escapedSealName = escapeXml(config.sealName)
  const escapedCenterText = escapeXml(config.centerText)
  const escapedSecurityCode = escapeXml(config.securityCode)
  const companyFontFamily = resolveFontFamily(config.companyFontFamily)
  const sealNameFontFamily = resolveFontFamily(config.sealNameFontFamily)
  const centerFontFamily = resolveFontFamily(config.centerFontFamily)
  const securityFontFamily = resolveFontFamily(config.securityFontFamily)
  const agingMaskMarkup = renderAgingMask({
    enabled: config.roughnessEnabled,
    level: config.roughnessLevel,
    density: config.roughnessDensity,
    size: canvasSize,
    center,
    clipRadius,
    seedText: `${config.companyName}|${config.sealName}|${config.securityCode}|${config.diameter}|${config.roughnessLevel}|${config.roughnessDensity}`
  })
  const companyTextMarkup = renderTopArcText({
    text: config.companyName,
    center,
    radius: companyTextRadius,
    fontSize: config.companyFontSize,
    fontFamily: companyFontFamily,
    letterSpacing: config.companyLetterSpacing,
    color: config.color,
    stretchY: config.companyStretchY
  })

  const svgMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${canvasSize}" height="${canvasSize}" viewBox="0 0 ${canvasSize} ${canvasSize}">
      <defs>
        <path id="bottomArc" d="${describeArc(center, center, securityTextRadius, 125, 235, 1)}" />
        ${agingMaskMarkup}
      </defs>
      <g mask="url(#sealAgingMask)">
        <circle cx="${center}" cy="${center}" r="${outerRadius}" fill="none" stroke="${config.color}" stroke-width="${config.outerBorderWidth}" />
        <circle cx="${center}" cy="${center}" r="${innerRadius}" fill="none" stroke="${config.color}" stroke-width="${config.innerBorderWidth}" opacity="0.65" />
        ${companyTextMarkup}
        <text
          x="${center}"
          y="${center + 52}"
          text-anchor="middle"
          fill="${config.color}"
          font-size="${config.sealNameFontSize}"
          font-family="${sealNameFontFamily}"
          letter-spacing="${config.sealNameLetterSpacing}"
          transform="${createScaleTransform(center, center + 52, config.sealNameStretchY)}"
        >
          ${escapedSealName}
        </text>
        <text
          x="${center}"
          y="${center + 18}"
          text-anchor="middle"
          fill="${config.color}"
          font-size="${config.centerFontSize}"
          font-family="${centerFontFamily}"
          letter-spacing="${config.centerLetterSpacing}"
          transform="${createScaleTransform(center, center + 18, config.centerStretchY)}"
        >
          ${escapedCenterText}
        </text>
        <text
          fill="${config.color}"
          font-size="${config.securityFontSize}"
          font-family="${securityFontFamily}"
          letter-spacing="${config.securityLetterSpacing}"
          transform="${createScaleTransform(center, center, config.securityStretchY)}"
        >
          <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">${escapedSecurityCode}</textPath>
        </text>
      </g>
    </svg>
  `.trim()

  return {
    svgMarkup,
    width: canvasSize,
    height: canvasSize
  }
}

function renderTopArcText(options: {
  text: string
  center: number
  radius: number
  fontSize: number
  fontFamily: string
  letterSpacing: number
  color: string
  stretchY: number
}) {
  const chars = Array.from(options.text)

  if (chars.length === 0) {
    return ''
  }

  if (chars.length === 1) {
    const point = polarToCartesian(options.center, options.center, options.radius, 0)

    return `
      <text
        x="${point.x}"
        y="${point.y}"
        fill="${options.color}"
        font-size="${options.fontSize}"
        font-family="${options.fontFamily}"
        text-anchor="middle"
        dominant-baseline="middle"
        transform="${createScaleTransform(point.x, point.y, options.stretchY)}"
      >${escapeXml(chars[0])}</text>
    `.trim()
  }

  const baseCharWidth = options.fontSize * 0.95 + 2
  const baseStep = (baseCharWidth / options.radius) * (180 / Math.PI)
  const spacingStep = (options.letterSpacing / options.radius) * (180 / Math.PI) * 1.4
  const angleStep = Math.max(2.2, Math.min(32, baseStep + spacingStep))
  const startAngle = -((chars.length - 1) * angleStep) / 2

  return chars
    .map((char, index) => {
      const angle = startAngle + index * angleStep
      const point = polarToCartesian(options.center, options.center, options.radius, angle)

      return `
        <text
          x="${point.x}"
          y="${point.y}"
          fill="${options.color}"
          font-size="${options.fontSize}"
          font-family="${options.fontFamily}"
          text-anchor="middle"
          dominant-baseline="middle"
          transform="rotate(${angle}, ${point.x}, ${point.y}) ${createScaleTransform(point.x, point.y, options.stretchY)}"
        >${escapeXml(char)}</text>
      `.trim()
    })
    .join('')
}

function createScaleTransform(originX: number, originY: number, stretchY: number) {
  const safeStretchY = Number.isFinite(stretchY) && stretchY > 0 ? stretchY : 1

  return `translate(${originX}, ${originY}) scale(1 ${safeStretchY}) translate(${-originX}, ${-originY})`
}

function renderAgingMask(options: {
  enabled: boolean
  level: number
  density: number
  size: number
  center: number
  clipRadius: number
  seedText: string
}) {
  if (!options.enabled) {
    return `
      <mask id="sealAgingMask">
        <rect width="${options.size}" height="${options.size}" fill="white" />
      </mask>
    `.trim()
  }

  const safeLevel = Math.max(1, Math.min(100, options.level))
  const safeDensity = Math.max(1, Math.min(200, options.density))
  const dotCount = Math.round(500 + safeDensity * 35 + safeLevel * 35)
  const prng = createPrng(createSeed(options.seedText))
  const dots = Array.from({ length: dotCount }, () => {
    const angle = prng() * Math.PI * 2
    const radius = Math.sqrt(prng()) * options.clipRadius
    const x = options.center + Math.cos(angle) * radius
    const y = options.center + Math.sin(angle) * radius
    const dotRadius = 0.16 + prng() * (0.06 + safeLevel * 0.0015)
    const opacity = 0.42 + prng() * 0.26

    return `<circle cx="${x}" cy="${y}" r="${dotRadius}" fill="black" fill-opacity="${opacity}" />`
  }).join('')

  return `
    <mask id="sealAgingMask">
      <rect width="${options.size}" height="${options.size}" fill="white" />
      <g>
        ${dots}
      </g>
    </mask>
  `.trim()
}

function createSeed(text: string) {
  let hash = 2166136261

  for (const char of text) {
    hash ^= char.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

function createPrng(seed: number) {
  let state = seed || 1

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180)

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

function describeArc(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  sweepFlag: 0 | 1
) {
  const start = polarToCartesian(centerX, centerY, radius, startAngle)
  const end = polarToCartesian(centerX, centerY, radius, endAngle)
  const angleDiff = Math.abs(endAngle - startAngle)
  const largeArcFlag = angleDiff <= 180 ? '0' : '1'

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
