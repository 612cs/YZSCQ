<template>
  <input class="base-input" :value="modelValue" @input="onInput" />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped lang="scss">
.base-input {
  width: 100%;
  min-height: 38px;
  border: 1px solid #d6dee8;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
}
</style>

