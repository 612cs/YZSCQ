<template>
  <section class="seal-preview">
    <div class="toolbar">
      <BaseButton @click="$emit('export')">下载印章</BaseButton>
    </div>
    <div class="canvas" v-html="svgMarkup" />
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'

defineProps<{
  svgMarkup: string
}>()

defineEmits<{
  export: []
}>()
</script>

<style scoped lang="scss">
.seal-preview {
  min-height: 580px;
  border-right: 1px solid #eef2f7;
  padding: 24px;
}

.toolbar {
  margin-bottom: 24px;
}

.canvas {
  display: grid;
  place-items: center;
  min-height: 480px;
}
</style>

