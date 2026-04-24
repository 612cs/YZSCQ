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
  grid-template-areas: 'preview inspector';
  grid-template-columns: minmax(0, 1fr) clamp(360px, 30vw, 440px);
  min-height: 100vh;
  background: #fff;
}

.workspace-main {
  grid-area: preview;
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  background: #f2f6f8;
}

.workspace-panel :deep(.seal-editor) {
  grid-area: inspector;
}

@media (max-width: 1080px) {
  .workspace-panel {
    grid-template-columns: minmax(0, 1fr) clamp(320px, 34vw, 380px);
  }
}

@media (max-width: 920px) {
  .workspace-panel {
    grid-template-areas:
      'preview'
      'inspector';
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto;
    height: auto;
    min-height: 100vh;
  }

  .workspace-main {
    min-height: 280px;
  }
}
</style>
