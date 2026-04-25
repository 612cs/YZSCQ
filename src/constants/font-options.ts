export interface FontOption {
  label: string
  value: string
}

export const FONT_OPTIONS: FontOption[] = [
  { label: '宋体', value: 'SimSun' },
  { label: '仿宋', value: 'FangSong' },
  { label: '楷体', value: 'KaiTi' },
  { label: '黑体', value: 'SimHei' },
  { label: '汉仪长宋简', value: 'HYChangSongJ' },
]

export function resolveFontFamily(fontKey: string) {
  const fontMap: Record<string, string> = {
    SimSun: "'SimSun', '宋体', 'STSong', 'Songti SC', serif",
    FangSong: "'FangSong', '仿宋', 'STFangsong', serif",
    KaiTi: "'KaiTi', '楷体', 'STKaiti', serif",
    SimHei: "'SimHei', '黑体', 'Microsoft YaHei', sans-serif",
    HYChangSongJ: "'HYChangSongJ', '汉仪长宋简', 'STSong', serif",
  }

  return fontMap[fontKey] ?? fontMap.SimSun
}
