/**
 * 生成 Open Graph 图片（SVG + PNG）
 *
 * 输出 1200x630 的分享卡片，直接输出 PNG 并通过 Vite 的 public/ 目录部署。
 *
 * 使用方式: tsx --tsconfig tsconfig.app.json scripts/generate-og-image.ts
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

import { renderSealSvg } from '../src/components/seal/SealSvgRenderer'
import type { SealConfig } from '../src/types/seal'

const PUBLIC_DIR = resolve(import.meta.dirname, '..', 'public')
const SVG_PATH = resolve(PUBLIC_DIR, 'og-image.svg')
const PNG_PATH = resolve(PUBLIC_DIR, 'og-image.png')

const OG_SEAL_CONFIG: SealConfig = {
  companyName: '示例科技有限公司',
  sealName: '合同专用章',
  centerText: '★',
  securityCode: '在线印章生成器',
  companyFontFamily: 'SimSun',
  sealNameFontFamily: 'SimSun',
  centerFontFamily: 'SimSun',
  securityFontFamily: 'KaiTi',
  companyFontSize: 20,
  companyLetterSpacing: 0,
  companyStretchY: 1,
  companyOffsetY: 4,
  companyBold: false,
  sealNameFontSize: 16,
  sealNameLetterSpacing: 0,
  sealNameStretchY: 1,
  sealNameOffsetX: 0,
  sealNameOffsetY: 0,
  sealNameBold: false,
  centerFontSize: 50,
  centerLetterSpacing: 0,
  centerStretchY: 1,
  centerBold: false,
  securityFontSize: 10,
  securityLetterSpacing: 2,
  securityOffsetY: 4,
  securityStretchY: 1,
  securityBold: false,
  securityFlipX: false,
  securityFlipY: false,
  outerBorderWidth: 6,
  innerBorderWidth: 2,
  innerBorderOffset: 30,
  color: '#ef3a',
  diameter: 220,
  roughnessEnabled: false,
  roughnessLevel: 100,
  roughnessDensity: 200,
  roughnessNoise: 10,
}

const WIDTH = 1200
const HEIGHT = 630

async function main() {
  try {
    console.log('[og-image] Generating OG image card...')

    const { svgMarkup } = renderSealSvg(OG_SEAL_CONFIG)

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e6f75"/>
      <stop offset="100%" stop-color="#155a5f"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" rx="16"/>
  <text x="580" y="120" font-family="-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="56" font-weight="700" fill="#ffffff" text-anchor="start">印章生成器</text>
  <text x="580" y="180" font-family="-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="28" fill="rgba(255,255,0.8)" text-anchor="start">免费在线电子印章生成工具</text>
  <text x="580" y="230" font-family="-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="20" fill="rgba(255,255,0.6)" text-anchor="start">SVG 实时预览 · 高清 PNG 导出 · 多种模板</text>
  <rect x="580" y="270" width="200" height="48" rx="24" fill="rgba(255,0.15)" stroke="rgba(255,255,0.3)" stroke-width="2"/>
  <text x="680" y="302" font-family="-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="20" fill="#ffffff" text-anchor="middle">立即使用</text>
  <g transform="translate(300, 315)">
    ${svgMarkup}
  </g>
</svg>`

    // Write SVG for reference
    writeFileSync(SVG_PATH, svg, 'utf-8')

    // Convert to PNG via sharp
    await sharp(Buffer.from(svg))
      .resize(WIDTH, HEIGHT)
      .png()
      .toFile(PNG_PATH)

    console.log(`[og-image] Done — ${PNG_PATH}`)
  } catch (err) {
    console.error('[og-image] ERROR:', err instanceof Error ? err.message : String(err))
    process.exit(1)
  }
}

main()
