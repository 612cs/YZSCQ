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
  sealNameFontSize: number
  sealNameLetterSpacing: number
  sealNameStretchY: number
  centerFontSize: number
  centerLetterSpacing: number
  centerStretchY: number
  securityFontSize: number
  securityLetterSpacing: number
  securityStretchY: number
  outerBorderWidth: number
  innerBorderWidth: number
  color: string
  diameter: number
  roughnessEnabled: boolean
  roughnessLevel: number
  roughnessDensity: number
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
