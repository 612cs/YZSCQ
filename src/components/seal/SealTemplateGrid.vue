<template>
  <div class="template-grid">
    <button
      v-for="item in templates"
      :key="item.code"
      :class="{ active: item.code === activeCode, disabled: !item.enabled }"
      type="button"
      :disabled="!item.enabled"
      @click="$emit('select', item.code)"
    >
      <strong>{{ item.name }}</strong>
      <span>{{ item.category }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { SealTemplateMeta } from '@/types/seal'

defineProps<{
  templates: SealTemplateMeta[]
  activeCode: string
}>()

defineEmits<{
  select: [code: string]
}>()
</script>

<style scoped lang="scss">
.template-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 14px;
  border: 1px solid #d9e3f0;
  border-radius: 10px;
  background: #fff;
  text-align: left;
}

.active {
  border-color: #2f80ed;
  box-shadow: 0 0 0 2px rgba(47, 128, 237, 0.12);
}

.disabled {
  opacity: 0.45;
}

span {
  color: #6c7785;
  font-size: 12px;
}
</style>

