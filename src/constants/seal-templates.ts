import type { SealTemplateMeta } from '@/types/seal'

export const SEAL_TEMPLATE_LIST: SealTemplateMeta[] = [
  {
    code: 'official-round',
    name: '公章印章',
    category: '圆形印章',
    preview: '',
    enabled: true
  },
  {
    code: 'company-round',
    name: '分公司公章',
    category: '圆形印章',
    preview: '',
    enabled: true
  },
  {
    code: 'contract-seal',
    name: '合同专用章',
    category: '专用印章',
    preview: '',
    enabled: true
  },
  {
    code: 'finance-seal',
    name: '财务章',
    category: '专用印章',
    preview: '',
    enabled: true
  },
  {
    code: 'english-seal',
    name: '英文章',
    category: '外文印章',
    preview: '',
    enabled: true
  },
  {
    code: 'private-seal',
    name: '法人私章',
    category: '私章',
    preview: '',
    enabled: false
  }
]

export const SEAL_TEMPLATE_CATEGORIES = [
  '全部',
  '圆形印章',
  '专用印章',
  '外文印章',
  '私章'
] as const

