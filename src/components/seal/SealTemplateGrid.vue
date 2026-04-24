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
  grid-template-columns: repeat(auto-fit, minmax(138px, 1fr));
  gap: 8px;
}

button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  min-height: 70px;
  padding: 12px;
  border: 1px solid #d8e1ea;
  border-radius: 8px;
  background: #fff;
  color: #17212f;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.16s ease, background 0.16s ease, box-shadow 0.16s ease;

  &:hover:not(:disabled) {
    border-color: #1e6f75;
    background: #f7fbfb;
  }

  &:focus-visible {
    outline: 3px solid rgba(47, 128, 237, 0.22);
    outline-offset: 2px;
  }
}

.active {
  border-color: #1e6f75;
  background: #e9f4f3;
  box-shadow: inset 0 0 0 1px rgba(30, 111, 117, 0.2);
}

.disabled {
  opacity: 0.45;
}

span {
  color: #6c7785;
  font-size: 12px;
}
</style>
