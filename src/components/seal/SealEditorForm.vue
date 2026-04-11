<template>
  <section class="seal-editor">
    <h2>自定义印章</h2>
    <div class="form-grid">
      <label>
        <span>公司名</span>
        <BaseInput :model-value="config.companyName" @update:model-value="update('companyName', $event)" />
      </label>
      <label>
        <span>章名</span>
        <BaseInput :model-value="config.sealName" @update:model-value="update('sealName', $event)" />
      </label>
      <label>
        <span>中心内容</span>
        <BaseInput :model-value="config.centerText" @update:model-value="update('centerText', $event)" />
      </label>
      <label>
        <span>防伪码</span>
        <BaseInput :model-value="config.securityCode" @update:model-value="update('securityCode', $event)" />
      </label>
      <label>
        <span>公司名字号</span>
        <BaseNumberInput
          :model-value="config.companyFontSize"
          @update:model-value="update('companyFontSize', $event)"
        />
      </label>
      <label>
        <span>公司名字体</span>
        <BaseSelect
          :model-value="config.companyFontFamily"
          :options="FONT_OPTIONS"
          @update:model-value="update('companyFontFamily', $event)"
        />
      </label>
      <label>
        <span>公司名字间距</span>
        <BaseNumberInput
          :model-value="config.companyLetterSpacing"
          @update:model-value="update('companyLetterSpacing', $event)"
        />
      </label>
      <label>
        <span>公司名距外圈</span>
        <BaseNumberInput :model-value="config.companyOffsetY" @update:model-value="update('companyOffsetY', $event)" />
      </label>
      <label>
        <span>公司名上下拉伸</span>
        <BaseNumberInput
          :model-value="config.companyStretchY"
          :step="0.1"
          @update:model-value="update('companyStretchY', $event)"
        />
      </label>
      <label>
        <span>章名字号</span>
        <BaseNumberInput :model-value="config.sealNameFontSize" @update:model-value="update('sealNameFontSize', $event)" />
      </label>
      <label>
        <span>章名字体</span>
        <BaseSelect
          :model-value="config.sealNameFontFamily"
          :options="FONT_OPTIONS"
          @update:model-value="update('sealNameFontFamily', $event)"
        />
      </label>
      <label>
        <span>章名字间距</span>
        <BaseNumberInput
          :model-value="config.sealNameLetterSpacing"
          @update:model-value="update('sealNameLetterSpacing', $event)"
        />
      </label>
      <label>
        <span>章名上下拉伸</span>
        <BaseNumberInput
          :model-value="config.sealNameStretchY"
          :step="0.1"
          @update:model-value="update('sealNameStretchY', $event)"
        />
      </label>
      <label>
        <span>中心字号</span>
        <BaseNumberInput :model-value="config.centerFontSize" @update:model-value="update('centerFontSize', $event)" />
      </label>
      <label>
        <span>中心字体</span>
        <BaseSelect
          :model-value="config.centerFontFamily"
          :options="FONT_OPTIONS"
          @update:model-value="update('centerFontFamily', $event)"
        />
      </label>
      <label>
        <span>中心字间距</span>
        <BaseNumberInput
          :model-value="config.centerLetterSpacing"
          @update:model-value="update('centerLetterSpacing', $event)"
        />
      </label>
      <label>
        <span>中心上下拉伸</span>
        <BaseNumberInput
          :model-value="config.centerStretchY"
          :step="0.1"
          @update:model-value="update('centerStretchY', $event)"
        />
      </label>
      <label>
        <span>防伪码字体</span>
        <BaseSelect
          :model-value="config.securityFontFamily"
          :options="FONT_OPTIONS"
          @update:model-value="update('securityFontFamily', $event)"
        />
      </label>
      <label>
        <span>防伪码字间距</span>
        <BaseNumberInput
          :model-value="config.securityLetterSpacing"
          @update:model-value="update('securityLetterSpacing', $event)"
        />
      </label>
      <label>
        <span>防伪码上下拉伸</span>
        <BaseNumberInput
          :model-value="config.securityStretchY"
          :step="0.1"
          @update:model-value="update('securityStretchY', $event)"
        />
      </label>
      <label>
        <span>颜色</span>
        <ColorPicker :model-value="config.color" @update:model-value="update('color', $event)" />
      </label>
      <label>
        <span>印章尺寸</span>
        <BaseNumberInput :model-value="config.diameter" @update:model-value="update('diameter', $event)" />
      </label>
      <label>
        <span>外边线</span>
        <BaseNumberInput
          :model-value="config.outerBorderWidth"
          @update:model-value="update('outerBorderWidth', $event)"
        />
      </label>
      <label>
        <span>内边线</span>
        <BaseNumberInput
          :model-value="config.innerBorderWidth"
          @update:model-value="update('innerBorderWidth', $event)"
        />
      </label>
      <label class="toggle-field">
        <span>印章老化</span>
        <input
          :checked="config.roughnessEnabled"
          type="checkbox"
          @change="update('roughnessEnabled', ($event.target as HTMLInputElement).checked)"
        />
      </label>
      <label>
        <span>老化强度</span>
        <BaseNumberInput
          :model-value="config.roughnessLevel"
          @update:model-value="update('roughnessLevel', $event)"
        />
      </label>
      <label>
        <span>老化密度</span>
        <BaseNumberInput
          :model-value="config.roughnessDensity"
          @update:model-value="update('roughnessDensity', $event)"
        />
      </label>
    </div>
    <div class="actions">
      <BaseButton @click="$emit('reset')">恢复默认</BaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseNumberInput from '@/components/common/BaseNumberInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import ColorPicker from '@/components/common/ColorPicker.vue'
import { FONT_OPTIONS } from '@/constants/font-options'
import type { SealConfig } from '@/types/seal'

defineProps<{
  config: SealConfig
}>()

const emit = defineEmits<{
  update: [payload: Partial<SealConfig>]
  reset: []
}>()

const update = <K extends keyof SealConfig>(key: K, value: SealConfig[K]) => {
  emit('update', {
    [key]: value
  } as Partial<SealConfig>)
}
</script>

<style scoped lang="scss">
.seal-editor {
  padding: 24px;
}

h2 {
  margin: 0 0 20px;
  font-size: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

label {
  display: grid;
  gap: 8px;
}

.toggle-field {
  align-content: start;

  input {
    width: 18px;
    height: 18px;
    margin: 10px 0 0;
  }
}

span {
  color: #445063;
  font-size: 13px;
}

.actions {
  margin-top: 20px;
}
</style>
