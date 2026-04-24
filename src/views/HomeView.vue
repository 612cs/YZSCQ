<template>
  <div class="page">
    <main class="page-main">
      <WorkspacePanel
        :config="sealStore.config"
        :render-result="sealStore.renderResult"
        @reset="sealStore.resetConfig"
        @update="sealStore.patchConfig"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import WorkspacePanel from '@/components/layout/WorkspacePanel.vue'
import { useSealStore } from '@/stores/seal'

const sealStore = useSealStore()
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(30, 111, 117, 0.08), transparent 280px),
    #eef3f6;
}

.page-main {
  height: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px;
}
</style>
