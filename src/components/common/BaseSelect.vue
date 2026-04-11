<template>
  <select class="base-select" :value="modelValue" @change="onChange">
    <option v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
interface SelectOption {
  label: string
  value: string
}

defineProps<{
  modelValue: string
  options: SelectOption[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const onChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<style scoped lang="scss">
.base-select {
  width: 100%;
  min-height: 38px;
  border: 1px solid #d6dee8;
  border-radius: 8px;
  background: #fff;
  padding: 0 12px;
  font-size: 14px;
}
</style>
