<template>
  <div class="category-bar">
    <button
      v-for="item in categories"
      :key="item"
      :class="{ active: item === modelValue }"
      type="button"
      @click="$emit('update:modelValue', item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: readonly string[]
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped lang="scss">
.category-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

button {
  min-width: 112px;
  min-height: 42px;
  border: 1px solid #d9e3f0;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
}

.active {
  border-color: #2f80ed;
  color: #2f80ed;
}
</style>

