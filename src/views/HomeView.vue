<template>
  <div class="page">
    <TopNav />
    <main class="page-main">
      <WorkspacePanel
        :config="sealStore.config"
        :active-template-code="sealStore.currentTemplateCode"
        :render-result="sealStore.renderResult"
        :template-name="sealStore.currentTemplate.name"
        :templates="templates"
        @reset="sealStore.resetConfig"
        @select-template="sealStore.setTemplate"
        @update="sealStore.patchConfig"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import TopNav from '@/components/layout/TopNav.vue'
import WorkspacePanel from '@/components/layout/WorkspacePanel.vue'
import { SEAL_TEMPLATE_LIST } from '@/constants/seal-templates'
import { useSealStore } from '@/stores/seal'

const sealStore = useSealStore()
const templates = SEAL_TEMPLATE_LIST
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(30, 111, 117, 0.08), transparent 280px),
    #eef3f6;
}

.page-main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 18px 20px 28px;
}

.block {
  margin-bottom: 20px;
}
</style>
