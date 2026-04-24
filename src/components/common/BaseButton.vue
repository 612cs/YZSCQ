<template>
  <button :class="['base-button', `base-button--${variant}`]" :type="type">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'danger'
  }>(),
  {
    type: 'button',
    variant: 'primary'
  }
)
</script>

<style scoped lang="scss">
.base-button {
  min-height: 40px;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, box-shadow 0.16s ease;

  &:focus-visible {
    outline: 3px solid rgba(47, 128, 237, 0.24);
    outline-offset: 2px;
  }
}

.base-button--primary {
  background: #1e6f75;
  color: #fff;

  &:hover {
    background: #185a5f;
  }
}

.base-button--secondary {
  border-color: #d8e1ea;
  background: #fff;
  color: #273444;

  &:hover {
    border-color: #9fb4c7;
    background: #f6f9fc;
  }
}

.base-button--danger {
  border-color: rgba(239, 63, 58, 0.32);
  background: #fff;
  color: #c9342f;

  &:hover {
    border-color: #ef3f3a;
    background: #fff3f2;
  }
}
</style>
