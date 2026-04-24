<template>
  <section class="workspace-panel">
    <main class="workspace-main">
      <section class="template-strip">
        <div class="strip-copy">
          <p class="eyebrow">Templates</p>
          <h1>印章工作台</h1>
          <span>{{ templateName }} · {{ config.companyName }}</span>
        </div>
        <SealTemplateGrid
          :active-code="activeTemplateCode"
          :templates="templates"
          @select="$emit('selectTemplate', $event)"
        />
      </section>

      <SealPreview
        :svg-markup="renderResult.svgMarkup"
        :template-name="templateName"
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
import SealTemplateGrid from '@/components/seal/SealTemplateGrid.vue'
import { useSealExport } from '@/composables/useSealExport'
import type { SealConfig, SealRenderResult, SealTemplateMeta } from '@/types/seal'

const props = defineProps<{
  config: SealConfig
  renderResult: SealRenderResult
  templateName: string
  templates: SealTemplateMeta[]
  activeTemplateCode: string
}>()

const emit = defineEmits<{
  update: [payload: Partial<SealConfig>]
  reset: []
  selectTemplate: [templateCode: string]
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
  grid-template-columns: minmax(0, 1fr) minmax(360px, 420px);
  min-height: calc(100vh - 112px);
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

.template-strip {
  display: grid;
  grid-template-columns: minmax(190px, 0.28fr) minmax(0, 1fr);
  gap: 18px;
  padding: 20px;
  border-bottom: 1px solid #dfe7ee;
  background: #fff;
}

.strip-copy {
  min-width: 0;

  h1 {
    margin: 3px 0 8px;
    color: #17212f;
    font-size: 24px;
    line-height: 1.1;
  }

  span {
    display: block;
    overflow: hidden;
    color: #667485;
    font-size: 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.eyebrow {
  margin: 0;
  color: #1e6f75;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 1080px) {
  .workspace-panel {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 760px) {
  .template-strip {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
