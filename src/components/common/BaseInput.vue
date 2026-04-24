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
  box-sizing: border-box;
  width: 100%;
  min-height: 44px;
  border: 1px solid #d6dee8;
  border-radius: 8px;
  background: #fff;
  color: #17212f;
  padding: 0 12px;
  font-size: 14px;

  &:hover {
    border-color: #afbecd;
  }

  &:focus {
    border-color: #1e6f75;
    outline: 3px solid rgba(30, 111, 117, 0.15);
  }
}
</style>
