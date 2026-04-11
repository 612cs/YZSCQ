<template>
  <section class="workspace-panel">
    <SealPreview :svg-markup="renderResult.svgMarkup" @export="handleExport" />
    <SealEditorForm :config="config" @reset="resetConfig" @update="patchConfig" />
  </section>
</template>

<script setup lang="ts">
import SealEditorForm from '@/components/seal/SealEditorForm.vue'
import SealPreview from '@/components/seal/SealPreview.vue'
import { useSealExport } from '@/composables/useSealExport'
import type { SealConfig, SealRenderResult } from '@/types/seal'

const props = defineProps<{
  config: SealConfig
  renderResult: SealRenderResult
  templateName: string
}>()

const emit = defineEmits<{
  update: [payload: Partial<SealConfig>]
  reset: []
}>()

const { exportPng } = useSealExport()

const patchConfig = (payload: Partial<SealConfig>) => {
  emit('update', payload)
}

const resetConfig = () => {
  emit('reset')
}

const handleExport = async () => {
  await exportPng(props.renderResult, props.config.companyName, props.templateName)
}
</script>

<style scoped lang="scss">
.workspace-panel {
  display: grid;
  grid-template-columns: 360px 1fr;
  background: #fff;
  border: 1px solid #e6edf5;
  border-radius: 18px;
  overflow: hidden;
}
</style>

