import { DEFAULT_SEAL_CONFIG } from '@/constants/seal-defaults'
import type { SealConfig } from '@/types/seal'

export function createDefaultSealConfig(): SealConfig {
  return { ...DEFAULT_SEAL_CONFIG }
}

export function normalizeSealConfig(config: Partial<SealConfig>): SealConfig {
  const migratedConfig = {
    ...config,
    securityOffsetY: config.securityOffsetY === 18 || config.securityOffsetY === undefined
      ? DEFAULT_SEAL_CONFIG.securityOffsetY
      : config.securityOffsetY
  }

  return {
    ...DEFAULT_SEAL_CONFIG,
    ...migratedConfig
  }
}
