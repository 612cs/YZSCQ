/**
 * SEO 冒烟检查 — 构建后验证 dist/index.html 的关键 SEO 标记
 *
 * 使用方式: tsx --tsconfig tsconfig.app.json scripts/check-seo.ts
 */
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const DIST_DIR = resolve(import.meta.dirname, '..', 'dist')
const INDEX_PATH = resolve(DIST_DIR, 'index.html')

const CHECKS: Array<{ label: string; test: (html: string) => boolean }> = [
  {
    label: 'has single <title>',
    test: (html) => html.split('<title>').length === 2,
  },
  {
    label: 'has meta description',
    test: (html) => html.includes('meta name="description"'),
  },
  {
    label: 'has canonical URL',
    test: (html) => html.includes('canonical'),
  },
  {
    label: 'has JSON-LD',
    test: (html) => html.includes('application/ld+json'),
  },
  {
    label: 'has og:image',
    test: (html) => html.includes('og:image'),
  },
  {
    label: 'has prerender markers',
    test: (html) => html.includes('vue-static-shell'),
  },
  {
    label: 'has no noindex',
    test: (html) => !html.includes('noindex'),
  },
  {
    label: 'has seal SVG',
    test: (html) => html.includes('<svg'),
  },
]

function main() {
  console.log('[check:seo] Running SEO smoke checks...')

  if (!existsSync(INDEX_PATH)) {
    console.error(`[check:seo] ERROR: ${INDEX_PATH} not found. Run build first.`)
    process.exit(1)
  }

  const html = readFileSync(INDEX_PATH, 'utf-8')
  let failed = 0

  for (const { label, test } of CHECKS) {
    if (test(html)) {
      console.log(`  ✓ ${label}`)
    } else {
      console.log(`  ✗ ${label}`)
      failed++
    }
  }

  if (failed > 0) {
    console.error(`\n[check:seo] ${failed} check(s) failed.`)
    process.exit(1)
  }

  console.log('[check:seo] All checks passed.')
}

main()
