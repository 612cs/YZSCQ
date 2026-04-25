import { describe, expect, it } from 'vitest'

import { DEFAULT_SEAL_CONFIG } from '@/constants/seal-defaults'
import { renderSealSvg } from './SealSvgRenderer'

describe('renderSealSvg', () => {
  it('renders the default seal as SVG markup', () => {
    const result = renderSealSvg(DEFAULT_SEAL_CONFIG)

    expect(result.svgMarkup).toContain('<svg')
    expect(result.svgMarkup).toContain('>一</text>')
    expect(result.svgMarkup).toContain('>司</text>')
    expect(result.svgMarkup).toContain(DEFAULT_SEAL_CONFIG.sealName)
    expect(result.svgMarkup).toContain('<circle')
    expect(result.width).toBeGreaterThan(DEFAULT_SEAL_CONFIG.diameter)
  })

  it('renders security code flip options without falling back to textPath', () => {
    const result = renderSealSvg({
      ...DEFAULT_SEAL_CONFIG,
      securityCode: '43012110263968',
      securityFlipX: true,
      securityFlipY: true,
    })

    expect(result.svgMarkup).not.toContain('<textPath')
    expect(result.svgMarkup).toContain('scale(-1, -1)')
    expect(result.svgMarkup).toContain('4')
  })
})
