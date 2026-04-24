<template>
  <section class="seal-preview">
    <div class="canvas-shell">
      <div class="toolbar">
        <BaseButton variant="secondary" @click="$emit('reset')">恢复默认</BaseButton>
        <BaseButton @click="$emit('export')">下载印章</BaseButton>
      </div>
      <div class="canvas-grid">
        <div class="canvas" v-html="svgMarkup" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'

defineProps<{
  svgMarkup: string
}>()

defineEmits<{
  export: []
  reset: []
}>()
</script>

<style scoped lang="scss">
.seal-preview {
  display: flex;
  min-height: 0;
  flex-direction: column;
  padding: clamp(16px, 2vw, 24px);
  height: 100%;
}

.toolbar {
  position: absolute;
  top: clamp(16px, 2vw, 24px);
  right: clamp(16px, 2vw, 24px);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  z-index: 10;
}

.canvas-shell {
  position: relative;
  display: grid;
  flex: 1;
  place-items: center;
  min-height: clamp(200px, 45vh, 560px);
  padding: clamp(20px, 4vw, 40px);
  border: 1px solid #dce5ee;
  border-radius: 12px;
  background:
    linear-gradient(90deg, rgba(30, 111, 117, 0.05) 1px, transparent 1px),
    linear-gradient(rgba(30, 111, 117, 0.05) 1px, transparent 1px),
    #f8fbfd;
  background-size: 28px 28px;
}

.canvas-grid {
  display: grid;
  place-items: center;
  width: min(100%, 560px);
  aspect-ratio: 1;
  border: 1px solid rgba(23, 33, 47, 0.08);
  border-radius: 50%;
  background: radial-gradient(circle, #fff 0%, #fff 58%, rgba(239, 63, 58, 0.04) 59%, transparent 70%);
  box-shadow: 0 18px 48px rgba(23, 33, 47, 0.08);
}

.canvas {
  display: grid;
  width: min(86%, 430px);
  place-items: center;
}

.canvas :deep(svg) {
  width: 100%;
  height: auto;
}

@media (max-width: 720px) {
  .seal-preview {
    height: auto;
  }

  .canvas-shell {
    min-height: clamp(280px, 46vh, 400px);
    padding: 20px;
  }
}
</style>
