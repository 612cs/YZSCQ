<!-- SEO Meta Tags
Description: 基于 Vue 3、TypeScript 与 Vite 构建的在线印章生成器，支持模板切换、参数编辑、SVG 实时预览、本地缓存与高清 PNG 导出。
Keywords: 印章生成器, 在线印章生成, Vue 3, TypeScript, Vite, SVG, PNG 导出, 电子印章
author: Local Workspace
canonical: local/yinzhangshengchengqi
-->

<!-- Open Graph / Facebook
og:type: website
og:url: local/yinzhangshengchengqi
og:title: 印章生成器 - 在线电子印章前端项目
og:description: 一个基于 Vue 3 + TypeScript + Vite 的电子印章生成工具，聚焦模板选择、参数编辑、实时预览与 PNG 导出。
og:image: docs/preview.png
og:image:alt: 印章生成器项目预览图
og:site_name: 印章生成器
og:locale: zh_CN
-->

<!-- Twitter Card
twitter:card: summary_large_image
twitter:url: local/yinzhangshengchengqi
twitter:title: 印章生成器 - 在线电子印章前端项目
twitter:description: 支持模板切换、SVG 实时渲染、老化效果、本地缓存和高清 PNG 导出的印章生成器。
twitter:image: docs/preview.png
twitter:creator: @local
-->

<!-- GitHub Metadata
topics: seal-generator, stamp-generator, vue3, typescript, vite
languages: TypeScript, Vue, SCSS
homepage: local
-->

<div align="center">

# 印章生成器

### 基于 Vue 3 + TypeScript + Vite 的在线电子印章生成项目

![Version](https://img.shields.io/badge/version-0.1.0-brightgreen)
![Vue](https://img.shields.io/badge/vue-3.5.13-42b883?logo=vue.js)
![TypeScript](https://img.shields.io/badge/typescript-5.8.3-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-5.4.18-646cff?logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/pinia-3.0.3-ffd859)
![Status](https://img.shields.io/badge/status-MVP-orange)

</div>

---

## 目录

- [项目简介](#项目简介)
- [核心功能](#核心功能)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [使用说明](#使用说明)
- [项目结构](#项目结构)
- [核心实现](#核心实现)
- [页面路由](#页面路由)
- [开发文档](#开发文档)
- [后续规划](#后续规划)
- [说明](#说明)

---

## 项目简介

`印章生成器` 是一个面向在线电子印章场景的前端项目，当前实现以纯前端 MVP 为主，围绕“模板选择 -> 参数编辑 -> 实时预览 -> PNG 导出”这一核心链路展开。项目适合继续扩展为企业印章工具站、电子章工作台、模板 SaaS 产品或后续接入账号体系与商业化功能的前端基础工程。

仓库当前已经具备可运行页面与核心渲染能力，不是仅有文档的空壳工程。根据现有源码，项目已包含模板分类、印章参数面板、SVG 渲染器、导出模块、本地缓存、基础页面路由，以及会员中心、历史记录、我的模板等二阶段页面占位。

适用场景包括：

- 在线生成公司公章、合同专用章、财务章、英文章等印章效果
- 作为电子印章前端原型或演示站点
- 作为后续接入后端接口、支付、模板云存储的工程基础

---

## 核心功能

### 已实现

- 支持多种模板元数据管理，当前内置公章印章、分公司公章、合同专用章、财务章、英文章等模板
- 支持编辑公司名、章名、中心内容、防伪码、字号、字间距、拉伸比例、边框粗细、颜色、尺寸等参数
- 使用 `SVG` 进行实时预览渲染，适合表达印章中的圆弧文字、边线与中心内容
- 支持印章老化效果开关，并可调节老化强度和密度
- 使用 `Canvas` 将 `SVG` 转为高清 `PNG`，便于下载使用
- 使用 `localStorage` 持久化当前模板和最近一次配置，刷新后可恢复
- 提供首页、工作台、登录页、我的模板、历史记录、会员中心等路由结构

### 当前特征

- 纯前端运行，无需后端即可体验核心流程
- 自研基础组件为主，不依赖重量级 UI 组件库
- 代码结构按领域拆分，便于继续扩展模板、导出能力和用户系统

---

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 前端框架 | `Vue 3` |
| 开发语言 | `TypeScript` |
| 构建工具 | `Vite` |
| 路由 | `Vue Router` |
| 状态管理 | `Pinia` |
| 样式方案 | `SCSS / Sass` |
| 渲染方案 | `SVG + Canvas` |
| 数据存储 | `localStorage` |

### 依赖概览

```json
{
  "dependencies": {
    "pinia": "^3.0.3",
    "vue": "^3.5.13",
    "vue-router": "^4.5.1"
  },
  "devDependencies": {
    "@types/node": "^22.14.1",
    "@vitejs/plugin-vue": "^5.2.3",
    "sass": "^1.86.3",
    "typescript": "^5.8.3",
    "vite": "^5.4.18",
    "vue-tsc": "^2.2.8"
  }
}
```

---

## 快速开始

### 环境要求

- `Node.js` 18 及以上版本
- `npm` 9 及以上版本

### 安装依赖

```bash
npm install
```

### 启动开发环境

```bash
npm run dev
```

启动后访问：

```text
http://localhost:5173
```

### 生产构建

```bash
npm run build
```

### 本地预览构建结果

```bash
npm run preview
```

---

## 使用说明

1. 打开首页后进入印章编辑工作区。
2. 在右侧表单中调整公司名、章名、字号、颜色、印章尺寸等参数。
3. 预览区域会基于 `SealSvgRenderer` 实时更新印章效果。
4. 如需模拟磨损印章，可开启“印章老化”并调节强度、密度。
5. 点击“下载印章”后，系统会将当前 `SVG` 渲染结果转换为高清 `PNG` 并自动下载。

当前导出文件命名规则为：

```text
公司名_模板名_YYYYMMDDHHmmss.png
```

---

## 项目结构

```text
yinzhangshengchengqi/
├─ docs/                    # 项目开发文档与结构说明
├─ src/
│  ├─ api/                  # 接口占位封装
│  ├─ assets/               # 图片、图标、静态资源
│  ├─ components/
│  │  ├─ common/            # 基础通用组件
│  │  ├─ layout/            # 布局组件
│  │  └─ seal/              # 印章领域组件与渲染实现
│  ├─ composables/          # 可复用逻辑
│  ├─ constants/            # 模板、默认值、字体等常量
│  ├─ router/               # 路由配置
│  ├─ stores/               # Pinia 状态管理
│  ├─ styles/               # 全局样式与变量
│  ├─ types/                # TypeScript 类型定义
│  ├─ utils/                # 下载、格式化、ID 等工具
│  └─ views/                # 页面视图
├─ index.html
├─ package.json
└─ README.md
```

---

## 核心实现

### 1. 状态管理

`src/stores/seal.ts` 负责管理当前模板、印章配置、渲染结果和本地缓存同步。页面刷新后，会自动从 `localStorage` 恢复上次编辑状态，减少重复输入。

### 2. SVG 渲染

`src/components/seal/SealSvgRenderer.ts` 是印章渲染核心。当前实现包含：

- 外圈、内圈边线绘制
- 顶部圆弧文字排版
- 中部文字渲染
- 底部防伪码路径文字
- 纵向拉伸控制
- 基于伪随机种子的老化遮罩生成

这种实现方式把视觉渲染逻辑从 Vue 组件中抽离出来，方便后续增加新模板或扩展为 `SVG / PDF` 导出。

### 3. PNG 导出

`src/components/seal/SealCanvasExporter.ts` 会将 `SVG` 先转成图片，再绘制到 `Canvas` 中导出为 `PNG Blob`。当前实现会根据设备像素比和目标尺寸自动放大导出倍率，以提升清晰度。

### 4. 配置持久化

`src/composables/useLocalCache.ts` 使用 `localStorage` 保存：

- 当前模板 `seal.currentTemplate`
- 当前配置 `seal.currentConfig`
- 预留的模板预设列表 `seal.presetList`

---

## 页面路由

当前项目已配置以下页面：

| 路径 | 页面 | 说明 |
| --- | --- | --- |
| `/` | 首页 | 当前承载主编辑工作区 |
| `/workspace/:templateCode` | 模板工作台 | 预留模板路由入口 |
| `/login` | 登录页 | 二阶段功能占位 |
| `/my-templates` | 我的模板 | 二阶段功能占位 |
| `/history` | 历史记录 | 二阶段功能占位 |
| `/vip` | 会员中心 | 商业化页面占位 |

---

## 开发文档

仓库内已包含两份中文文档，可与本 README 配合使用：

- [项目开发文档](./docs/印章生成器项目开发文档.md)
- [项目目录结构说明](./docs/项目目录结构说明.md)

如果你准备继续开发，这两份文档适合用于梳理 MVP 边界、页面规划、目录职责和后续商业化路线。

---

## 后续规划

基于当前仓库结构，后续比较自然的扩展方向包括：

- 接入登录注册、会员权限和支付能力
- 增加模板收藏、模板预设保存、历史记录同步
- 扩展英文章、椭圆章、法人私章等模板类型
- 增加 `SVG`、`PDF`、批量导出、批量盖章能力
- 接入后端 API 与云端存储，形成完整业务系统

---

## 说明

- 当前仓库未检测到 `LICENSE` 文件，如需开源发布，建议补充明确的许可证
- 当前 README 基于仓库实际代码、现有文档和项目结构编写，避免了未落地功能的虚假描述
- 如果后续补充项目截图、演示 GIF 或部署地址，README 的展示效果会更完整

<div align="center">

印章生成器 · Built with Vue 3, TypeScript and Vite

</div>
