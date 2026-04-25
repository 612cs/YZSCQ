import { computed, toValue, type MaybeRefOrGetter } from 'vue'

import { renderSealSvg } from '@/components/seal/SealSvgRenderer'
import type { SealConfig } from '@/types/seal'

export function useSealRenderer(config: MaybeRefOrGetter<SealConfig>) {
  const renderResult = computed(() => renderSealSvg(toValue(config)))

  return {
    renderResult,
  }
}
