<template>
  <section class="workspace-panel">
    <main class="workspace-main">
      <SealPreview
        :svg-markup="renderResult.svgMarkup"
        @export="handleExport"
        @reset="resetConfig"
      />
    </main>

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
  await exportPng(props.renderResult, props.config.companyName, '公章印章')
}
</script>

<style scoped lang="scss">
.workspace-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 420px);
  height: 100%;
  background: #fff;
  border: 1px solid #dfe7ee;
  border-radius: 14px;
  box-shadow: 0 18px 60px rgba(23, 33, 47, 0.08);
  overflow: hidden;
}

.workspace-main {
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  background: #f2f6f8;
}

@media (max-width: 1080px) {
  .workspace-panel {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>