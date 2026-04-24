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
  min-height: 44px;

  input {
    width: 44px;
    height: 44px;
    border: 1px solid #d6dee8;
    border-radius: 8px;
    background: transparent;
    padding: 2px;
    cursor: pointer;

    &:focus-visible {
      outline: 3px solid rgba(30, 111, 117, 0.15);
      outline-offset: 2px;
    }
  }

  span {
    color: #445063;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }
}
</style>
