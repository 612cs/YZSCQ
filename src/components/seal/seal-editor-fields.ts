import { FONT_OPTIONS } from '@/constants/font-options'
import type { SealConfig } from '@/types/seal'

export type SealEditorControl = 'text' | 'number' | 'select' | 'color' | 'boolean'
export type SealEditorFieldKey = keyof SealConfig

export interface SealEditorField {
  key: SealEditorFieldKey
  label: string
  control: SealEditorControl
  step?: number
  options?: Array<{ label: string; value: string }>
}

export interface SealEditorGroup {
  key: string
  label: string
  summary: string
  fields: SealEditorField[]
}

export const SEAL_EDITOR_GROUPS: SealEditorGroup[] = [
  {
    key: 'company',
    label: '公司名',
    summary: '顶部圆弧主标题',
    fields: [
      { key: 'companyName', label: '公司名', control: 'text' },
      { key: 'companyFontSize', label: '字号', control: 'number' },
      { key: 'companyBold', label: '加粗', control: 'boolean' },
      { key: 'companyLetterSpacing', label: '字间距', control: 'number' },
      { key: 'companyOffsetY', label: '距外圈', control: 'number' },
      { key: 'companyStretchY', label: '上下拉伸', control: 'number', step: 0.1 },
      { key: 'companyFontFamily', label: '字体', control: 'select', options: FONT_OPTIONS }
    ]
  },
  {
    key: 'sealName',
    label: '章名',
    summary: '下方章名与位置',
    fields: [
      { key: 'sealName', label: '章名', control: 'text' },
      { key: 'sealNameFontSize', label: '字号', control: 'number' },
      { key: 'sealNameBold', label: '加粗', control: 'boolean' },
      { key: 'sealNameLetterSpacing', label: '字间距', control: 'number' },
      { key: 'sealNameStretchY', label: '上下拉伸', control: 'number', step: 0.1 },
      { key: 'sealNameOffsetX', label: '水平偏移', control: 'number' },
      { key: 'sealNameOffsetY', label: '垂直偏移', control: 'number' },
      { key: 'sealNameFontFamily', label: '字体', control: 'select', options: FONT_OPTIONS }
    ]
  },
  {
    key: 'center',
    label: '中心',
    summary: '中心字符或图形',
    fields: [
      { key: 'centerText', label: '中心内容', control: 'text' },
      { key: 'centerFontSize', label: '字号', control: 'number' },
      { key: 'centerBold', label: '加粗', control: 'boolean' },
      { key: 'centerLetterSpacing', label: '字间距', control: 'number' },
      { key: 'centerStretchY', label: '上下拉伸', control: 'number', step: 0.1 },
      { key: 'centerFontFamily', label: '字体', control: 'select', options: FONT_OPTIONS }
    ]
  },
  {
    key: 'security',
    label: '防伪码',
    summary: '底部弧线微缩文字',
    fields: [
      { key: 'securityCode', label: '防伪码', control: 'text' },
      { key: 'securityBold', label: '加粗', control: 'boolean' },
      { key: 'securityLetterSpacing', label: '字间距', control: 'number' },
      { key: 'securityOffsetY', label: '距外圈', control: 'number' },
      { key: 'securityStretchY', label: '上下拉伸', control: 'number', step: 0.1 },
      { key: 'securityFlipX', label: '左右反转', control: 'boolean' },
      { key: 'securityFlipY', label: '上下反转', control: 'boolean' },
      { key: 'securityFontFamily', label: '字体', control: 'select', options: FONT_OPTIONS }
    ]
  },
  {
    key: 'border',
    label: '边框',
    summary: '尺寸、颜色和边线',
    fields: [
      { key: 'color', label: '印章颜色', control: 'color' },
      { key: 'diameter', label: '印章尺寸', control: 'number' },
      { key: 'outerBorderWidth', label: '外边线', control: 'number' },
      { key: 'innerBorderWidth', label: '内边线', control: 'number' },
      { key: 'innerBorderOffset', label: '内边距', control: 'number' }
    ]
  },
  {
    key: 'aging',
    label: '老化',
    summary: '磨损和噪点质感',
    fields: [
      { key: 'roughnessEnabled', label: '印章老化', control: 'boolean' },
      { key: 'roughnessLevel', label: '老化强度', control: 'number' },
      { key: 'roughnessDensity', label: '老化密度', control: 'number' },
      { key: 'roughnessNoise', label: '噪点强度', control: 'number' }
    ]
  }
]
