import { describe, expect, it } from 'vitest'

import { DEFAULT_SEAL_CONFIG } from '@/constants/seal-defaults'
import type { SealConfig } from '@/types/seal'
import { createDefaultSealConfig, normalizeSealConfig } from './seal-config'

describe('seal config helpers', () => {
  it('fills missing cached fields from defaults', () => {
    const config = normalizeSealConfig({
      companyName: '缓存公司',
      securityCode: '987654',
    })

    expect(config.companyName).toBe('缓存公司')
    expect(config.securityCode).toBe('987654')
    expect(config.securityOffsetY).toBe(DEFAULT_SEAL_CONFIG.securityOffsetY)
    expect(config.roughnessNoise).toBe(DEFAULT_SEAL_CONFIG.roughnessNoise)
  })

  it('migrates the old security offset default to the current default', () => {
    const config = normalizeSealConfig({
      securityOffsetY: 18,
    })

    expect(config.securityOffsetY).toBe(DEFAULT_SEAL_CONFIG.securityOffsetY)
  })

  it('creates an isolated default config object for reset', () => {
    const first = createDefaultSealConfig()
    const second = createDefaultSealConfig()

    first.companyName = '已修改'

    expect(second.companyName).toBe(DEFAULT_SEAL_CONFIG.companyName)
    expect(first).not.toBe(second)
  })

  it('returns a complete SealConfig shape', () => {
    const config: SealConfig = normalizeSealConfig({})

    expect(config).toMatchObject(DEFAULT_SEAL_CONFIG)
  })
})
