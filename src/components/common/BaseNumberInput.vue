<template>
  <div class="number-input">
    <button type="button" @click="updateValue(props.modelValue - props.step)">-</button>
    <input :value="props.modelValue" type="number" @input="onInput" />
    <button type="button" @click="updateValue(props.modelValue + props.step)">+</button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: number
    step?: number
  }>(),
  {
    step: 1
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const updateValue = (value: number) => {
  emit('update:modelValue', normalizeNumber(value))
}

const onInput = (event: Event) => {
  emit('update:modelValue', normalizeNumber(Number((event.target as HTMLInputElement).value)))
}

function normalizeNumber(value: number) {
  if (!Number.isFinite(value)) {
    return 0
  }

  return Number(value.toFixed(4))
}
</script>

<style scoped lang="scss">
.number-input {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 40px;
  gap: 6px;

  button,
  input {
    min-height: 44px;
    border: 1px solid #d6dee8;
    border-radius: 8px;
    background: #fff;
    color: #17212f;
    box-sizing: border-box;
  }

  button {
    cursor: pointer;

    &:hover {
      border-color: #9fb4c7;
      background: #f6f9fc;
    }
  }

  input {
    text-align: center;
  }

  button:focus-visible,
  input:focus {
    border-color: #1e6f75;
    outline: 3px solid rgba(30, 111, 117, 0.15);
  }
}
</style>
