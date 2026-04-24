export interface SealTemplateMeta {
  code: string
  name: string
  category: string
  preview: string
  tags?: string[]
  enabled: boolean
}

export interface SealConfig {
  companyName: string
  sealName: string
  centerText: string
  securityCode: string
  companyFontFamily: string
  sealNameFontFamily: string
  centerFontFamily: string
  securityFontFamily: string
  companyFontSize: number
  companyLetterSpacing: number
  companyStretchY: number
  companyOffsetY: number
  companyBold: boolean
  sealNameFontSize: number
  sealNameLetterSpacing: number
  sealNameStretchY: number
  sealNameOffsetX: number
  sealNameOffsetY: number
  sealNameBold: boolean
  centerFontSize: number
  centerLetterSpacing: number
  centerStretchY: number
  centerBold: boolean
  securityFontSize: number
  securityLetterSpacing: number
  securityOffsetY: number
  securityStretchY: number
  securityBold: boolean
  securityFlipX: boolean
  securityFlipY: boolean
  outerBorderWidth: number
  innerBorderWidth: number
  color: string
  diameter: number
  roughnessEnabled: boolean
  roughnessLevel: number
  roughnessDensity: number
  roughnessNoise: number
}

export interface SealRenderResult {
  svgMarkup: string
  width: number
  height: number
}

export interface SealPreset {
  id: string
  name: string
  templateCode: string
  config: SealConfig
  createdAt: string
  updatedAt: string
}
