/**
 * Prerender 脚本 — 在 Vite build 完成后运行
 * 将印章 SVG + 静态外壳注入 dist/index.html，让搜索引擎能抓取到完整页面内容
 *
 * 使用方式: tsx --tsconfig tsconfig.app.json scripts/generate-prerender.ts
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// 直接通过相对路径导入，tsx + tsconfig.app.json 会处理内部的 @/ 别名
import { renderSealSvg } from '../src/components/seal/SealSvgRenderer'
import type { SealConfig } from '../src/types/seal'

const DIST_DIR = resolve(import.meta.dirname, '..', 'dist')
const INDEX_PATH = resolve(DIST_DIR, 'index.html')

const SEO_CONFIG: SealConfig = {
  companyName: '示例科技有限公司',
  sealName: '合同专用章',
  centerText: '★',
  securityCode: '在线印章生成器',
  companyFontFamily: 'SimSun',
  sealNameFontFamily: 'SimSun',
  centerFontFamily: 'SimSun',
  securityFontFamily: 'KaiTi',
  companyFontSize: 20,
  companyLetterSpacing: 0,
  companyStretchY: 1,
  companyOffsetY: 4,
  companyBold: false,
  sealNameFontSize: 16,
  sealNameLetterSpacing: 0,
  sealNameStretchY: 1,
  sealNameOffsetX: 0,
  sealNameOffsetY: 0,
  sealNameBold: false,
  centerFontSize: 50,
  centerLetterSpacing: 0,
  centerStretchY: 1,
  centerBold: false,
  securityFontSize: 10,
  securityLetterSpacing: 2,
  securityOffsetY: 4,
  securityStretchY: 1,
  securityBold: false,
  securityFlipX: false,
  securityFlipY: false,
  outerBorderWidth: 6,
  innerBorderWidth: 2,
  innerBorderOffset: 30,
  color: '#ef3f3a',
  diameter: 240,
  roughnessEnabled: false,
  roughnessLevel: 100,
  roughnessDensity: 200,
  roughnessNoise: 10,
}

function main() {
  console.log('[prerender] Generating static shell...')

  // Pre-checks — fail early with clear messages
  if (!existsSync(DIST_DIR)) {
    throw new Error(`[prerender] dist/ directory not found at ${DIST_DIR}. Run vite build first.`)
  }
  if (!existsSync(INDEX_PATH)) {
    throw new Error(`[prerender] dist/index.html not found at ${INDEX_PATH}.`)
  }

  let html = readFileSync(INDEX_PATH, 'utf-8')

  if (!html.includes('<div id="app"></div>')) {
    throw new Error('[prerender] App mount placeholder <div id="app"></div> not found in dist/index.html.')
  }

  const result = renderSealSvg(SEO_CONFIG)
  const now = new Date().toISOString()

  const staticShell = `
    <style>
      .vue-static-shell {
        display: flex; flex-direction: column; min-height: 100vh;
        background: linear-gradient(180deg, rgba(30,111,117,0.08), transparent 280px), #eef3f6;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      }
      .static-header { padding: 40px 24px 16px; text-align: center; }
      .static-header h1 { font-size: 28px; color: #1e6f75; margin: 0 0 6px; font-weight: 700; }
      .static-header p { font-size: 15px; color: #64748b; margin: 0 6px; }
      .static-features {
        display: flex; justify-content: center; flex-wrap: wrap; gap: 8px 20px;
        padding: 0 24px 20px; max-width: 800px; margin: 0 auto;
      }
      .static-features span {
        font-size: 13px; color: #475569; white-space: nowrap;
      }
      .static-features span::before { content: "✓ "; color: #1e6f75; font-weight: 700; }
      .static-main {
        display: flex; flex: 1; align-items: flex-start; justify-content: center;
        gap: 48px; padding: 24px; flex-wrap: wrap; max-width: 1200px; margin: 0 auto; width: 100%; box-sizing: border-box;
      }
      .static-preview { text-align: center; flex-shrink: 0; }
      .static-preview svg { display: block; margin: 0 auto; max-width: 100%; height: auto; }
      .static-preview .label { font-size: 13px; color: #94a3b8; margin-top: 8px; }
      .static-form-placeholder {
        background: #fff; border-radius: 12px; padding: 28px 32px;
        box-shadow: 0 2px 16px rgba(0,0,0,0.06); min-width: 300px;
      }
      .static-form-placeholder .row {
        display: flex; gap: 12px; margin-bottom: 14px; align-items: center;
      }
      .static-form-placeholder label {
        font-size: 14px; color: #334155; white-space: nowrap; min-width: 60px;
      }
      .static-form-placeholder input, .static-form-placeholder select {
        flex: 1; padding: 6px 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px; color: #334155; background: #f8fafc;
      }
      .static-footer {
        display: flex; justify-content: center; align-items: center; gap: 24px;
        padding: 14px 24px; font-size: 13px; color: #1e6f75;
        border-top: 1px solid rgba(0,0,0,0.04); margin-top: auto;
      }
      .static-footer a { color: #94a3b8; text-decoration: none; }
      .static-footer a:hover { color: #1e6f75; }
      @media (max-width: 720px) {
        .static-main { flex-direction: column; align-items: center; padding: 12px; gap: 24px; }
        .static-header h1 { font-size: 22px; }
        .static-features { gap: 4px 14px; }
        .static-features span { font-size: 12px; }
        .static-form-placeholder { min-width: auto; width: 100%; padding: 20px; }
      }
    </style>
    <div class="vue-static-shell">
      <header class="static-header">
        <h1>印章生成器</h1>
        <p>免费在线电子印章生成工具 — SVG 实时预览，高清 PNG 导出</p>
      </header>
      <div class="static-features">
        <span>在线生成印章</span>
        <span>SVG 实时预览</span>
        <span>高清 PNG 导出</span>
        <span>多种印章模板</span>
        <span>印章老化做旧效果</span>
      </div>
      <main class="static-main">
        <div class="static-preview">
          ${result.svgMarkup}
          <div class="label">SVG 实时预览</div>
        </div>
        <div class="static-form-placeholder">
          <div class="row">
            <label>公司名称</label>
            <input value="${escapeHtml(SEO_CONFIG.companyName)}" readonly />
          </div>
          <div class="row">
            <label>印章类型</label>
            <select><option>${escapeHtml(SEO_CONFIG.sealName)}</option></select>
          </div>
          <div class="row">
            <label>中心文字</label>
            <input value="${escapeHtml(SEO_CONFIG.centerText)}" readonly />
          </div>
          <div class="row">
            <label>安全码</label>
            <input value="${escapeHtml(SEO_CONFIG.securityCode)}" readonly />
          </div>
          <div class="row">
            <label>颜色</label>
            <input value="${escapeHtml(SEO_CONFIG.color)}" readonly style="border-left: 20px solid ${SEO_CONFIG.color};" />
          </div>
        </div>
      </main>
      <footer class="static-footer">
        <span>YZSCQ — 在线印章生成器</span>
        <span>
          <a href="https://github.com/612cs/YZSCQ" target="_blank" rel="noopener">GitHub</a>
          &nbsp;·&nbsp;
          <a href="mailto:13135194467@163.com">联系作者</a>
        </span>
      </footer>
    </div>
  `.replace(/\n\s{4}/g, '\n').trim()

  const injected = html.replace(
    '<div id="app"></div>',
    `<div id="app">${staticShell}</div>`
  )

  if (injected === html || !injected.includes('vue-static-shell')) {
    throw new Error('[prerender] Static shell injection failed — placeholder replacement produced no change.')
  }

  // Verify expected SEO markers are present in the final HTML
  const requiredMarkers = ['vue-static-shell', '印章生成器', '<svg']
  for (const marker of requiredMarkers) {
    if (!injected.includes(marker)) {
      throw new Error(`[prerender] Verification failed — missing expected marker "${marker}" in output.`)
    }
  }

  writeFileSync(INDEX_PATH, injected, 'utf-8')

  const kb = (Buffer.byteLength(injected) / 1024).toFixed(1)
  console.log(`[prerender] Done — ${INDEX_PATH} ${kb} KB (built at ${now})`)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

main()
