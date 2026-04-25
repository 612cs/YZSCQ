import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

import { renderSealSvg } from '@/components/seal/SealSvgRenderer'
import { useLocalCache } from '@/composables/useLocalCache'
import { STORAGE_KEYS } from '@/constants/seal-defaults'
import type { SealConfig } from '@/types/seal'
import { createDefaultSealConfig, normalizeSealConfig } from '@/utils/seal-config'

export const useSealStore = defineStore('seal', () => {
  const { getItem, setItem } = useLocalCache()
  const cachedConfig = getItem<Partial<SealConfig>>(STORAGE_KEYS.currentConfig, {})
  const config = ref<SealConfig>(normalizeSealConfig(cachedConfig))

  const renderResult = computed(() => renderSealSvg(config.value))

  const patchConfig = (payload: Partial<SealConfig>) => {
    config.value = {
      ...config.value,
      ...payload,
    }
  }

  const resetConfig = () => {
    config.value = createDefaultSealConfig()
  }

  watch(
    config,
    (value) => {
      setItem(STORAGE_KEYS.currentConfig, value)
    },
    { deep: true },
  )

  return {
    config,
    renderResult,
    patchConfig,
    resetConfig,
  }
})
