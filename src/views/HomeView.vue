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
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(30, 111, 117, 0.08), transparent 280px),
    #eef3f6;
}

.page-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  min-height: auto;
}

.page-main > * {
  flex: 1;
  min-width: 0;
  min-height: 0;
}

@media (max-width: 720px) {
  .page-main {
    padding: 12px;
    min-height: auto;
  }
}
</style>
