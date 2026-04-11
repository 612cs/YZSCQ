import type { SealConfig } from '@/types/seal'

export const DEFAULT_SEAL_CONFIG: SealConfig = {
  companyName: '好文印章科技有限公司',
  sealName: '合同专用章',
  centerText: '★',
  securityCode: '1234567890123',
  companyFontFamily: 'SimSun',
  sealNameFontFamily: 'SimSun',
  centerFontFamily: 'SimSun',
  securityFontFamily: 'KaiTi',
  companyFontSize: 20,
  companyLetterSpacing: 0,
  companyStretchY: 1,
  companyOffsetY: 4,
  sealNameFontSize: 16,
  sealNameLetterSpacing: 0,
  sealNameStretchY: 1,
  centerFontSize: 50,
  centerLetterSpacing: 0,
  centerStretchY: 1,
  securityFontSize: 10,
  securityLetterSpacing: 2,
  securityStretchY: 1,
  outerBorderWidth: 6,
  innerBorderWidth: 2,
  color: '#ef3f3a',
  diameter: 240,
  roughnessEnabled: false,
  roughnessLevel: 10,
  roughnessDensity: 60
}

export const STORAGE_KEYS = {
  currentTemplate: 'seal.currentTemplate',
  currentConfig: 'seal.currentConfig',
  presetList: 'seal.presetList'
} as const
