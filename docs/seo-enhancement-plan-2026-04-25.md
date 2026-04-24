# SEO 增强计划

日期：2026-04-25
项目：YZSCQ 在线印章生成器
主域名：https://yzsc.climbersheng.me

## 当前状态

项目已经有不错的 SEO 基础：

- `index.html` 已经包含标题、描述、robots、canonical、Open Graph 和 Twitter Card 元数据。
- `public/robots.txt` 允许搜索引擎抓取，并指向站点地图。
- `public/sitemap.xml` 已经列出首页规范 URL。
- `npm run build` 会先执行 `vite build`，然后执行 `npm run prerender`。
- `scripts/generate-prerender.ts` 会把静态页面外壳、文字内容和 SVG 印章预览注入到 `dist/index.html`。

当前预渲染是有效的，但它不是完整 SSR。它属于“构建后注入静态首页外壳”的方案。对这个纯前端 SPA 来说，这依然有 SEO 价值，因为搜索引擎在执行客户端 Vue 代码之前，就能读到有意义的 HTML 内容。

## 对 Agent 建议的判断

### 1. 添加 JSON-LD 结构化数据

结论：正确，值得做。

Google 推荐在适合的情况下使用 JSON-LD。对本项目来说，`WebApplication` 是合理的结构化数据类型，因为这个站点本质上是一个在线工具。结构化数据必须和页面真实可见内容一致，不能描述页面上没有的能力。

它不能保证带来富摘要或排名提升，但可以帮助搜索引擎更准确地理解：这个页面是一个用于生成印章的 Web 应用。

### 2. 给预渲染脚本添加错误处理

结论：正确，而且很重要。

当前脚本依赖精确替换 `<div id="app"></div>`。如果以后 `index.html` 被格式化，或者 Vite 模板发生变化，脚本可能不会注入静态外壳，但仍然输出成功日志。这样 SEO 预渲染会悄悄失效。

构建过程应该在下面这些情况明确失败：

- `dist/` 目录不存在。
- `dist/index.html` 不存在。
- 找不到 Vue 挂载占位符。
- 最终 HTML 中没有预期的 SEO 静态内容。

这项工作不直接增加 SEO 内容，但可以防止 SEO 能力被意外破坏。

### 3. 生成 `og:image`

结论：正确，但它主要提升社交分享效果，不是直接排名因素。

Open Graph 图片会影响链接被分享到微信、Slack、X、Facebook、LinkedIn、Discord 等平台时显示的预览图。好的预览图可以让链接看起来更可信、更容易被点击。

建议尺寸是 `1200x630`。图片应该能通过公开绝对 URL 访问，并在 `index.html` 中通过 `og:image`、`twitter:image` 和宽高标签引用。

## 实施任务

### 任务 SEO-1：添加 JSON-LD 结构化数据

优先级：高

涉及文件：

- `index.html`

实施方式：

在 `<head>` 中添加 JSON-LD：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "印章生成器",
  "url": "https://yzsc.climbersheng.me",
  "description": "免费在线电子印章生成工具，支持公章、合同章、财务章等模板，SVG 实时预览并导出高清 PNG。",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "inLanguage": "zh-CN",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CNY"
  }
}
</script>
```

验收标准：

- JSON 格式合法。
- 结构化数据与页面真实内容一致。
- URL 使用生产环境规范域名。
- Google Rich Results Test 或 Schema Markup Validator 不报语法错误。

### 任务 SEO-2：加固预渲染脚本

优先级：高

涉及文件：

- `scripts/generate-prerender.ts`

实施方式：

- 读取 `dist/index.html` 前先检查 `dist/` 是否存在。
- 检查 `dist/index.html` 是否存在。
- 只有确认 Vue 挂载占位符存在后才执行替换。
- 如果注入失败，直接让构建失败。
- 校验最终 HTML 中是否包含 `vue-static-shell`、`印章生成器`、`<svg` 等预期标记。

建议检查逻辑：

```ts
if (!existsSync(DIST_DIR)) {
  throw new Error('[prerender] dist directory not found. Run vite build first.')
}

if (!existsSync(INDEX_PATH)) {
  throw new Error('[prerender] dist/index.html not found.')
}

if (!html.includes('<div id="app"></div>')) {
  throw new Error('[prerender] app mount placeholder not found.')
}

if (injected === html || !injected.includes('vue-static-shell')) {
  throw new Error('[prerender] static shell injection failed.')
}
```

验收标准：

- 占位符存在时，`npm run build` 正常成功。
- 手动改坏占位符后，`npm run prerender` 会明确失败。
- 构建产物中的 `#app` 内包含静态外壳。

### 任务 SEO-3：生成生产可用的 Open Graph 图片

优先级：高

涉及文件：

- `public/og-image.png`
- `index.html`
- 可选：`scripts/generate-og-image.ts`

实施方式：

第一阶段可以先使用静态资源：

- 创建 `public/og-image.png`，尺寸为 `1200x630`。
- 图片中包含项目名、印章预览和一句核心卖点。
- 关键文字不要贴近图片边缘，避免被平台裁切。

第二阶段可以考虑脚本生成：

- 复用 `renderSealSvg`。
- 用 SVG 或 Canvas 生成分享卡片。
- 输出到 `public/og-image.png`。

更新 `index.html`：

```html
<meta property="og:image" content="https://yzsc.climbersheng.me/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="印章生成器在线工具预览图" />
<meta name="twitter:image" content="https://yzsc.climbersheng.me/og-image.png" />
```

验收标准：

- `https://yzsc.climbersheng.me/og-image.png` 返回 `200`。
- 图片尺寸为 `1200x630`。
- 链接预览工具能正常显示该图片。
- `robots.txt` 没有阻止图片访问。

### 任务 SEO-4：统一规范域名策略

优先级：中

涉及范围：

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- Vercel 域名设置
- Cloudflare DNS 设置

实施方式：

- 继续使用 `https://yzsc.climbersheng.me` 作为规范 URL。
- 确保 `canonical`、`og:url`、`twitter:url`、`robots.txt`、`sitemap.xml` 都使用同一个 URL。
- 决定 `climbersheng.me` 和 `www.climbersheng.me` 是重定向到 `yzsc.climbersheng.me`，还是继续保留为独立入口。

验收标准：

- 站点只主动声明一个规范 URL。
- 同一页面不会因为多个生产域名被搜索引擎当成重复页面。
- Vercel 中主域名配置显示正常。

### 任务 SEO-5：准备 Google Search Console

优先级：中

涉及范围：

- `index.html` 或 DNS TXT 记录

实施方式：

- 在 Google Search Console 中添加 `yzsc.climbersheng.me` 或完整域名属性 `climbersheng.me`。
- 优先使用 DNS TXT 记录完成验证。
- 提交 `https://yzsc.climbersheng.me/sitemap.xml`。
- 部署后用 URL Inspection 检查首页抓取情况。

验收标准：

- Search Console 验证通过。
- 站点地图提交成功且可读取。
- 首页没有被 robots 或 noindex 阻止抓取。

### 任务 SEO-6：增强静态外壳内容质量

优先级：中

涉及文件：

- `scripts/generate-prerender.ts`

实施方式：

在静态 HTML 中增加一小段真实功能说明，例如：

- 在线生成印章。
- SVG 实时预览。
- PNG 高清导出。
- 多种印章模板。
- 印章老化做旧效果。

注意内容必须和真实功能一致，不要堆关键词。

验收标准：

- `dist/index.html` 中包含真实、有用、可见的说明内容。
- Vue 应用仍然正常接管页面。
- 移动端在 hydration 前也保持可读。

### 任务 SEO-7：添加 SEO 冒烟检查

优先级：低

涉及文件：

- `package.json`
- 可选：`scripts/check-seo.ts`

实施方式：

添加一个构建后检查脚本，用来检查 `dist/index.html`：

- 是否只有一个 `<title>`。
- 是否存在 `meta[name="description"]`。
- 是否存在 canonical URL。
- 是否存在 JSON-LD。
- 是否存在 `og:image`。
- 是否存在预渲染标记。
- 是否没有误加 `noindex`。

可增加脚本：

```json
{
  "scripts": {
    "check:seo": "tsx --tsconfig tsconfig.app.json scripts/check-seo.ts"
  }
}
```

验收标准：

- `npm run build && npm run check:seo` 通过。
- 缺少关键 SEO 标签时检查失败。

## 建议执行顺序

1. SEO-2：先加固预渲染脚本，保护已有 SEO 能力。
2. SEO-1：添加 JSON-LD 结构化数据。
3. SEO-3：添加 `og-image.png` 和图片相关 meta。
4. SEO-4：统一规范域名策略。
5. SEO-5：接入 Google Search Console。
6. SEO-6：增强静态外壳内容。
7. SEO-7：增加 SEO 自动检查。

## 验证清单

本地验证：

```bash
npm run build
rg -n "application/ld\\+json|og:image|vue-static-shell|印章生成器|<svg" dist/index.html
```

线上验证：

```bash
curl -L https://yzsc.climbersheng.me | rg "application/ld\\+json|og:image|vue-static-shell|印章生成器"
curl -I https://yzsc.climbersheng.me/og-image.png
curl -L https://yzsc.climbersheng.me/sitemap.xml
```

外部工具验证：

- Google Rich Results Test
- Schema Markup Validator
- Google Search Console URL Inspection
- 社交平台链接预览调试工具

## 注意事项

- JSON-LD 能帮助搜索引擎理解页面，但不保证出现富摘要。
- `og:image` 主要提升社交分享预览，不应被当成保证排名提升的因素。
- 当前静态外壳预渲染对这个 SPA 是有价值的。如果后续项目扩展出大量内容页，再考虑完整 SSG 或 SSR。
