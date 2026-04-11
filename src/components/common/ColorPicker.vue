<template>
  <label class="color-picker">
    <input :value="modelValue" type="color" @input="onInput" />
    <span>{{ modelValue }}</span>
  </label>
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
.color-picker {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 38px;

  input {
    width: 44px;
    height: 38px;
    border: 0;
    background: transparent;
    padding: 0;
  }

  span {
    color: #5d6877;
    font-size: 13px;
  }
}
</style>
