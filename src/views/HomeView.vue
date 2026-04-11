<template>
  <div class="page">
    <TopNav />
    <main class="page-main">
      <WorkspacePanel
        :config="sealStore.config"
        :render-result="sealStore.renderResult"
        :template-name="sealStore.currentTemplate.name"
        @reset="sealStore.resetConfig"
        @update="sealStore.patchConfig"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import TopNav from '@/components/layout/TopNav.vue'
import WorkspacePanel from '@/components/layout/WorkspacePanel.vue'
import { useSealStore } from '@/stores/seal'

const sealStore = useSealStore()
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f6f9fc;
}

.page-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
}

.block {
  margin-bottom: 20px;
}
</style>
