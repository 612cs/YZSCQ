<div align="center">

# 印章生成器

### 基于 Vue 3 + TypeScript + Vite 的在线电子印章生成工具

![Version](https://img.shields.io/badge/version-0.1.0-brightgreen)
![Vue](https://img.shields.io/badge/vue-3.5.13-42b883?logo=vue.js)
![TypeScript](https://img.shields.io/badge/typescript-5.8.3-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-5.4.18-646cff?logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/pinia-3.0.3-ffd859)

</div>

---

## 项目简介

印章生成器是一个在线电子印章生成工具，基于 Vue 3 Composition API + TypeScript 构建。围绕「参数编辑 → SVG 实时预览 → PNG 高清导出」的核心链路，支持中文印章的圆弧文字、边框样式、老化做旧效果等精细调节。

当前为纯前端 MVP 阶段，聚焦印章单页面编辑工作区体验，已完成 Flex/Grid 布局重构，适配桌面端操作场景。

> 本项目基于 [miaohui789/YZSCQ](https://github.com/miaohui789/YZSCQ) 二次开发，感谢原作者的贡献。

---

## 核心功能

- 支持编辑公司名、章名、中心文字、防伪码、字号、字间距、边框粗细、颜色、尺寸等参数
- 基于 SVG 实时预览渲染，精准还原圆弧文字、边线与中心内容
- 支持印章老化效果，可调节强度和密度（PRNG 散点 + SVG 噪点滤镜）
- 使用 Canvas 将 SVG 转为高清 PNG，支持多倍分辨率导出
- 使用 localStorage 持久化当前配置，刷新后自动恢复编辑状态
- 编辑器表单按类别分组（公司名、章名、中心文字、防伪码、边框、老化），便于快速定位

---

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 前端框架 | Vue 3（Composition API） |
| 开发语言 | TypeScript |
| 构建工具 | Vite |
| 路由 | Vue Router 4 |
| 状态管理 | Pinia |
| 样式方案 | SCSS / Sass |
| 渲染方案 | SVG + Canvas |
| 数据存储 | localStorage |
| 测试 | Vitest |

---

## 快速开始

### 环境要求

- Node.js 18 及以上
- npm 9 及以上

### 安装与启动

```bash
npm install
npm run dev
```

启动后访问 `http://localhost:5173`。

### 其他命令

```bash
npm run build      # 生产构建
npm run preview    # 本地预览构建结果
npm run test       # 运行测试
```

---

## 使用说明

1. 打开首页进入印章编辑工作区，左侧为 SVG 实时预览，右侧为参数编辑表单。
2. 在表单中按分组调整公司名、章名、字号、颜色、印章尺寸等参数。
3. 预览区域基于 `SealSvgRenderer` 实时更新印章效果。
4. 如需模拟磨损印章，展开「印章老化」分组，启用效果并调节强度、密度。
5. 点击「下载印章」将当前 SVG 转为高清 PNG 并自动下载。

导出文件命名规则：`公司名_模板名_YYYYMMDDHHmmss.png`

---

## 项目结构

```text
src/
├── assets/                  # 图片、图标、静态资源
├── components/
│   ├── common/              # 通用表单组件（Button、Input、Select、ColorPicker 等）
│   ├── layout/              # 布局组件（WorkspacePanel）
│   └── seal/                # 印章领域组件与核心渲染引擎
│       ├── SealSvgRenderer.ts        # SVG 渲染核心
│       ├── SealSvgRenderer.test.ts   # 渲染器测试
│       ├── SealCanvasExporter.ts     # PNG 导出
│       ├── SealPreview.vue           # 印章预览组件
│       ├── SealEditorForm.vue        # 参数编辑表单
│       └── seal-editor-fields.ts     # 编辑器字段分组定义
├── composables/             # 可复用逻辑（useLocalCache、useSealExport、useSealRenderer）
├── constants/               # 模板定义、默认配置、字体选项
├── router/                  # 路由配置
├── stores/                  # Pinia 状态管理（seal store）
├── styles/                  # 全局样式、CSS 变量、reset
├── types/                   # TypeScript 类型定义
├── utils/                   # 工具函数（下载、格式化、配置归一化、ID 生成）
├── views/                   # 页面视图（HomeView）
├── App.vue
├── main.ts
└── env.d.ts
```

---

## 核心实现

### 状态管理

`src/stores/seal.ts` — Pinia store 管理印章配置状态，通过 `patchConfig` 进行局部更新，通过计算属性自动生成 SVG 渲染结果，并自动同步到 localStorage。

### SVG 渲染

`src/components/seal/SealSvgRenderer.ts` — 纯函数式 SVG 生成引擎，包含：

- 外圈/内圈边线绘制
- 顶部圆弧文字排版（按弧度计算字符位置）
- 中部文字/中心文字渲染
- 底部防伪码路径文字
- 纵向拉伸控制
- 基于伪随机种子的老化遮罩（散点 + SVG 噪点滤镜）

### PNG 导出

`src/components/seal/SealCanvasExporter.ts` — 将 SVG 转为 Image，绘制到 Canvas 中导出为 PNG Blob，根据设备像素比自动提升导出分辨率。

### 编辑器字段

`src/components/seal/seal-editor-fields.ts` — 将参数按 6 个分组组织（公司名、章名、中心文字、防伪码、边框样式、印章老化），每个分组定义一组控件类型，驱动 `SealEditorForm` 动态渲染。

### 配置持久化

`src/composables/useLocalCache.ts` — 封装 localStorage 的 JSON 读写，存储当前印章配置，刷新后恢复编辑状态。

---

## 路由

| 路径 | 页面 | 说明 |
| --- | --- | --- |
| `/` | HomeView | 印章编辑工作区 |

当前为单页面应用，Vercel 通过 `vercel.json` 配置 catch-all rewrite 支持 SPA 路由。

---

## 后续规划

- 扩展模板体系，支持英文章、椭圆章、法人私章等多种印章类型
- 增加 SVG、PDF 批量导出能力
- 接入用户系统、模板收藏与云端存储
- 添加模板预设管理与历史记录功能

---

## 说明

- 项目使用 MIT 许可证开源
- 已配置 Vercel 部署，通过 `.vercel/project.json` 关联
- 代码使用 Prettier 格式化（无分号、单引号、100 字符宽度）

<div align="center">

---

<a href="https://github.com/612cs/YZSCQ">GitHub</a> &nbsp;·&nbsp; <a href="mailto:13135194467@163.com">联系作者</a>

Built with Vue 3, TypeScript and Vite

</div>
