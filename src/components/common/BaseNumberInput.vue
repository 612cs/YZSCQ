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
  grid-template-columns: 32px 1fr 32px;
  gap: 8px;

  button,
  input {
    min-height: 38px;
    border: 1px solid #d6dee8;
    border-radius: 8px;
    background: #fff;
  }

  input {
    text-align: center;
  }
}
</style>
