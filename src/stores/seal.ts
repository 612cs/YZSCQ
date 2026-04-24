import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

import { renderSealSvg } from '@/components/seal/SealSvgRenderer'
import { useLocalCache } from '@/composables/useLocalCache'
import { STORAGE_KEYS } from '@/constants/seal-defaults'
import { SEAL_TEMPLATE_LIST } from '@/constants/seal-templates'
import type { SealConfig } from '@/types/seal'
import { createDefaultSealConfig, normalizeSealConfig } from '@/utils/seal-config'

export const useSealStore = defineStore('seal', () => {
  const { getItem, setItem } = useLocalCache()
  const currentTemplateCode = ref(getItem<string>(STORAGE_KEYS.currentTemplate, SEAL_TEMPLATE_LIST[0].code))
  const cachedConfig = getItem<Partial<SealConfig>>(STORAGE_KEYS.currentConfig, {})
  const config = ref<SealConfig>(normalizeSealConfig(cachedConfig))

  const currentTemplate = computed(
    () => SEAL_TEMPLATE_LIST.find((item) => item.code === currentTemplateCode.value) ?? SEAL_TEMPLATE_LIST[0]
  )
  const renderResult = computed(() => renderSealSvg(config.value))

  const patchConfig = (payload: Partial<SealConfig>) => {
    config.value = {
      ...config.value,
      ...payload
    }
  }

  const resetConfig = () => {
    config.value = createDefaultSealConfig()
  }

  const setTemplate = (templateCode: string) => {
    currentTemplateCode.value = templateCode
  }

  watch(currentTemplateCode, (value) => {
    setItem(STORAGE_KEYS.currentTemplate, value)
  })

  watch(
    config,
    (value) => {
      setItem(STORAGE_KEYS.currentConfig, value)
    },
    { deep: true }
  )

  return {
    currentTemplateCode,
    currentTemplate,
    config,
    renderResult,
    patchConfig,
    resetConfig,
    setTemplate
  }
})
