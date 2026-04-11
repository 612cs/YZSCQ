<template>
  <button class="base-button" :type="type">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    type: 'button'
  }
)
</script>

<style scoped lang="scss">
.base-button {
  border: 0;
  border-radius: 10px;
  background: #2f80ed;
  color: #fff;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
}
</style>

