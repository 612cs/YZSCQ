<template>
  <aside class="seal-editor">
    <header class="editor-header">
      <div>
        <p class="eyebrow">Inspector</p>
        <h2>印章参数</h2>
      </div>
      <button class="reset-link" type="button" @click="$emit('reset')">恢复默认</button>
    </header>

    <nav class="category-tabs" aria-label="印章参数分组">
      <button
        v-for="group in editorGroups"
        :key="group.key"
        :class="['tab-btn', { active: activeCategory === group.key }]"
        type="button"
        @click="activeCategory = group.key"
      >
        <span>{{ group.label }}</span>
        <small>{{ group.fields.length }}</small>
      </button>
    </nav>

    <section
      v-for="group in editorGroups"
      v-show="activeCategory === group.key"
      :key="group.key"
      class="editor-section"
    >
      <div class="section-title">
        <div>
          <h3>{{ group.label }}</h3>
          <p>{{ group.summary }}</p>
        </div>

        <div
          v-for="field in group.fields.filter((f) => isHeaderField(f))"
          :key="field.key"
          class="section-title-extra"
        >
          <template v-if="field.control === 'boolean'">
            <span class="field-label">{{ field.label }}</span>
            <span class="switch-control">
              <input
                :checked="getBooleanValue(field.key)"
                type="checkbox"
                @change="updateField(field.key, ($event.target as HTMLInputElement).checked)"
              />
              <span class="switch-track" />
            </span>
          </template>
          <template v-else-if="field.control === 'color'">
            <span class="field-label" style="margin-right: 4px">{{ field.label }}</span>
            <ColorPicker
              :model-value="getStringValue(field.key)"
              @update:model-value="updateField(field.key, $event)"
            />
          </template>
        </div>
      </div>

      <div class="field-list">
        <label
          v-for="(field, index) in group.fields.filter((f) => !isHeaderField(f))"
          :key="field.key"
          :class="[
            'field-row',
            `field-row--${field.control}`,
            { 'is-lone-number': isLoneNumber(field, group.fields) },
          ]"
        >
          <span class="field-label">{{ field.label }}</span>

          <BaseInput
            v-if="field.control === 'text'"
            :model-value="getStringValue(field.key)"
            @update:model-value="updateField(field.key, $event)"
          />
          <BaseNumberInput
            v-else-if="field.control === 'number'"
            :model-value="getNumberValue(field.key)"
            :step="field.step ?? 1"
            @update:model-value="updateField(field.key, $event)"
          />
          <BaseSelect
            v-else-if="field.control === 'select'"
            :model-value="getStringValue(field.key)"
            :options="field.options ?? []"
            @update:model-value="updateField(field.key, $event)"
          />
          <ColorPicker
            v-else-if="field.control === 'color'"
            :model-value="getStringValue(field.key)"
            @update:model-value="updateField(field.key, $event)"
          />
          <span v-else class="switch-control">
            <input
              :checked="getBooleanValue(field.key)"
              type="checkbox"
              @change="updateField(field.key, ($event.target as HTMLInputElement).checked)"
            />
            <span class="switch-track" />
          </span>
        </label>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BaseInput from '@/components/common/BaseInput.vue'
import BaseNumberInput from '@/components/common/BaseNumberInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import ColorPicker from '@/components/common/ColorPicker.vue'
import type { SealConfig } from '@/types/seal'
import { SEAL_EDITOR_GROUPS, type SealEditorFieldKey } from './seal-editor-fields'

const props = defineProps<{
  config: SealConfig
}>()

const emit = defineEmits<{
  update: [payload: Partial<SealConfig>]
  reset: []
}>()

const editorGroups = SEAL_EDITOR_GROUPS
const activeCategory = ref(editorGroups[0].key)

const updateField = (key: SealEditorFieldKey, value: string | number | boolean) => {
  emit('update', {
    [key]: value,
  } as Partial<SealConfig>)
}

const getStringValue = (key: SealEditorFieldKey) => String(props.config[key] ?? '')
const getNumberValue = (key: SealEditorFieldKey) => {
  const value = props.config[key]

  return typeof value === 'number' ? value : Number(value) || 0
}
const getBooleanValue = (key: SealEditorFieldKey) => Boolean(props.config[key])

const isHeaderField = (field: any) => {
  return field.control === 'color' || field.key.endsWith('Bold') || field.key === 'roughnessEnabled'
}

const isLoneNumber = (field: any, allFields: any[]) => {
  if (field.control !== 'number') return false
  const activeFields = allFields.filter((f: any) => !isHeaderField(f))
  const myIndex = activeFields.findIndex((f: any) => f.key === field.key)
  if (myIndex === -1) return false

  let blockStart = myIndex
  while (blockStart > 0 && activeFields[blockStart - 1].control === 'number') blockStart--

  let blockEnd = myIndex
  while (blockEnd < activeFields.length - 1 && activeFields[blockEnd + 1].control === 'number')
    blockEnd++

  const blockLength = blockEnd - blockStart + 1
  const indexInBlock = myIndex - blockStart

  return indexInBlock === blockLength - 1 && blockLength % 2 !== 0
}
</script>

<style scoped lang="scss">
.seal-editor {
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  border-left: 1px solid #dfe7ee;
  background: #fbfcfd;
}

.editor-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 22px 16px;
  border-bottom: 1px solid #e4ebf2;
  background: #fff;

  h2 {
    margin: 2px 0 0;
    color: #17212f;
    font-size: 22px;
    line-height: 1.2;
  }
}

.eyebrow {
  margin: 0;
  color: #1e6f75;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.reset-link {
  min-height: 40px;
  border: 1px solid #d8e1ea;
  border-radius: 8px;
  background: #fff;
  color: #445063;
  padding: 0 11px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    border-color: #ef3f3a;
    color: #c9342f;
  }

  &:focus-visible {
    outline: 3px solid rgba(47, 128, 237, 0.24);
    outline-offset: 2px;
  }
}

.category-tabs {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  padding: 16px 18px;
  border-bottom: 1px solid #e4ebf2;
  background: #f7fafc;
}

.tab-btn {
  display: flex;
  min-width: 0;
  min-height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid #d9e3ec;
  border-radius: 8px;
  background: #fff;
  color: #445063;
  padding: 0 10px;
  font-size: 13px;
  cursor: pointer;

  span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    flex-shrink: 0;
    color: #8a96a3;
    font-size: 11px;
  }

  &:hover {
    border-color: #9fb4c7;
  }

  &:focus-visible {
    outline: 3px solid rgba(47, 128, 237, 0.22);
    outline-offset: 2px;
  }

  &.active {
    border-color: #1e6f75;
    background: #e9f4f3;
    color: #174f54;
    font-weight: 700;
  }
}

.editor-section {
  flex: 1;
  min-height: 0;
  padding: 20px 22px 28px;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;

  h3 {
    margin: 0;
    color: #17212f;
    font-size: 18px;
  }

  p {
    margin: 4px 0 0;
    color: #6a7787;
    font-size: 13px;
  }
}

.section-title-extra {
  display: flex;
  align-items: center;
  gap: 8px;
}

.field-list {
  display: grid;
  gap: 12px;
}

.field-row {
  display: grid;
  grid-template-columns: minmax(92px, 0.42fr) minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.field-label {
  color: #445063;
  font-size: 13px;
  font-weight: 600;
}

.switch-control {
  position: relative;
  display: inline-flex;
  width: 44px;
  min-height: 44px;
  align-items: center;

  input {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0;
    cursor: pointer;
  }
}

.switch-track {
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background: #cfd8e3;
  transition: background 0.18s ease;

  &::after {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 4px rgba(15, 23, 42, 0.24);
    content: '';
    transition: transform 0.18s ease;
  }
}

.switch-control input:checked + .switch-track {
  background: #1e6f75;

  &::after {
    transform: translateX(20px);
  }
}

.switch-control input:focus-visible + .switch-track {
  outline: 3px solid rgba(47, 128, 237, 0.22);
  outline-offset: 2px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.header-color {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-color-label {
  color: #445063;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

@media (max-width: 920px) {
  .seal-editor {
    border-top: 1px solid #dfe7ee;
    border-left: 0;
  }

  .editor-section {
    overflow: visible;
  }

  .category-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .editor-header {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .reset-link {
    width: auto;
  }

  .category-tabs {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .tab-btn {
      flex: 0 0 auto;
      min-width: max-content;
    }
  }

  .field-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px 12px;
  }

  .field-row {
    grid-template-columns: minmax(0, 1fr);
    grid-column: span 2;
    gap: 8px;

    &--number {
      grid-column: span 1;
    }

    &--boolean {
      grid-column: span 1;
    }

    &.is-lone-number {
      grid-column: span 2;
    }
  }
}
</style>
