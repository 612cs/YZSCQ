# 工作台整改页 Flex/Grid 布局重构计划

日期：2026-04-24

## 背景

当前项目是 Vue 3、TypeScript、Vite、Pinia、SCSS 技术栈的印章生成器。工作台页面已经完成过第一轮专业化改造，核心结构为：

- `src/views/HomeView.vue`
- `src/components/layout/WorkspacePanel.vue`
- `src/components/seal/SealPreview.vue`
- `src/components/seal/SealEditorForm.vue`
- `src/components/common/*`

这次整改不改变业务能力，不调整 `SealConfig`，不改 Pinia store、SVG 渲染、PNG 导出和本地缓存逻辑。目标是把页面布局职责进一步整理清楚：用 CSS Grid 负责页面骨架，用 Flex 负责局部排列。

## 重构目标

1. 保持工作台作为专业工具界面，而不是营销页或普通表单页。
2. 桌面端形成稳定的预览区 + Inspector 双栏布局。
3. 移动端自然降级为单列，不出现横向滚动、遮挡或控件挤压。
4. 让布局代码更容易被后续 Agent 维护，减少隐式高度和临时尺寸。
5. 保持现有视觉基调：中性色面、青绿色主色、红色印章/危险语义、紧凑工具感。

## 页面结构蓝图

### 桌面端

```text
┌───────────────────────────────────────────────┬─────────────────┐
│ Preview Header / Actions                      │ Inspector Header│
├───────────────────────────────────────────────┤                 │
│                                               ├─────────────────┤
│                                               │ Category Tabs   │
│                Preview Canvas                 ├─────────────────┤
│                                               │ Field Groups    │
│                                               │ Scroll Area     │
└───────────────────────────────────────────────┴─────────────────┘
```

### 平板与移动端

```text
┌───────────────────────────────┐
│ Preview Header / Actions      │
├───────────────────────────────┤
│ Preview Canvas                │
├───────────────────────────────┤
│ Inspector Header              │
├───────────────────────────────┤
│ Category Tabs                 │
├───────────────────────────────┤
│ Field Groups                  │
└───────────────────────────────┘
```

## Flex 与 Grid 分工

| 区域 | 推荐布局 | 说明 |
| --- | --- | --- |
| 页面外层 | Grid 或 Flex column | 负责视口高度、页面 padding、最大宽度 |
| 工作区外壳 | CSS Grid | 负责 preview 与 inspector 的主区域切换 |
| 预览区 | Flex column | header 固定，canvas 占据剩余空间 |
| 预览画布 | CSS Grid | `place-items: center` 保持印章居中 |
| Inspector 外壳 | Flex column | header、tabs 固定，字段区滚动 |
| Tabs | CSS Grid | 3 列、2 列、1 列响应式切换 |
| 字段行 | CSS Grid | label + control 两列，窄屏改为单列 |
| 按钮组/工具栏 | Flex | 支持换行、右对齐、移动端左对齐 |
| 数字输入/颜色输入 | Grid/Flex | 保持控件内部尺寸稳定 |

## 具体文件计划

### 1. `src/views/HomeView.vue`

当前关注点：

- `.page` 使用 `min-height: 100vh`。
- `.page-main` 使用 `height: 100%`，但父级没有明确高度链路，后续可能造成布局高度不稳定。

建议整改：

- 使用 `min-height: 100dvh` 作为移动端更稳定的视口高度。
- `.page-main` 改成页面级布局容器，负责 `max-width`、`margin`、`padding`、`min-height`。
- 使用 `display: grid` 或 `display: flex` 承载 `WorkspacePanel`，让工作区可以自然撑满可用空间。

验收点：

- 1440px 桌面端工作区居中且不会过宽。
- 375px 移动端没有横向滚动。
- 页面背景与工作区边界保持清晰。

### 2. `src/components/layout/WorkspacePanel.vue`

当前关注点：

- `.workspace-panel` 已经使用 Grid 双栏。
- 当前只有 `grid-template-columns`，区域语义不够明确。
- 1080px 以下直接单列，方向正确，但可读性还有增强空间。

建议整改：

- 增加 `grid-template-areas`，明确 `preview` 和 `inspector`。
- 桌面端使用 `minmax(0, 1fr)` + `clamp(360px, 30vw, 440px)` 控制 Inspector 宽度。
- 中小屏切换为单列：preview 在上，inspector 在下。
- 保留 `min-width: 0`、`min-height: 0`，防止 Grid/Flex 子项撑破容器。
- 根据响应式状态切换边框方向：桌面 inspector 用左边框，移动端用上边框。

验收点：

- 双栏状态下 preview 和 inspector 不互相挤压。
- inspector 宽度稳定，不因字段内容变化跳动。
- 移动端布局顺序符合编辑流程。

### 3. `src/components/seal/SealPreview.vue`

当前关注点：

- `.seal-preview` 已经是 Flex column。
- `.canvas-shell` 使用 Grid 居中，方向正确。
- `min-height: 520px` 在小屏下可能压迫后续内容。

建议整改：

- 继续保留 Flex column：header + canvas。
- 将 canvas 高度改为响应式约束，例如通过 `min-height`、`clamp()`、`aspect-ratio` 组合控制。
- `.preview-header` 使用 Flex，桌面端左右分布，移动端 column。
- `.toolbar` 使用 Flex wrap，按钮在窄屏下可以自然换行。
- 保持印章 SVG 的 `width: 100%; height: auto;`，避免拉伸变形。

验收点：

- 印章始终居中。
- 下载与恢复默认按钮不遮挡标题。
- 小屏预览区不过度占用首屏高度。

### 4. `src/components/seal/SealEditorForm.vue`

当前关注点：

- Inspector 外层已经使用 Flex column。
- tabs 已经使用 Grid。
- 字段行已经使用 Grid 两列。
- 窄屏下字段行还没有明确单列降级。

建议整改：

- `.seal-editor` 继续使用 Flex column。
- `.editor-header` 使用 Flex，保留标题和恢复默认按钮的稳定间距。
- `.category-tabs` 保持 Grid，桌面 3 列，中屏 2 列，极窄屏 1 列或横向滚动。
- `.editor-section` 作为唯一滚动区，避免页面内部出现多个冲突滚动区域。
- `.field-row` 桌面使用 `grid-template-columns: minmax(92px, 0.42fr) minmax(0, 1fr)`。
- 在窄屏下改为单列：label 在上，control 在下。
- 对 boolean、color、number 类型保留稳定尺寸，避免控件宽度随内容跳动。

验收点：

- 中文标签不被截断或挤压。
- 输入框、选择框、颜色选择器宽度一致。
- tabs 的数量角标不挤压分组名称。
- 键盘焦点状态仍然可见。

### 5. `src/components/common/*`

涉及组件：

- `BaseButton.vue`
- `BaseInput.vue`
- `BaseNumberInput.vue`
- `BaseSelect.vue`
- `ColorPicker.vue`

建议整改：

- 不改变组件 API。
- 统一基础控件高度，建议保持在 `40px` 到 `44px`。
- 保持 hover、focus-visible、disabled 状态清晰。
- 数字输入内部继续使用 Grid，按钮列宽固定，输入列自适应。
- 颜色选择器继续使用 Flex，色块与文本之间保持稳定 gap。

验收点：

- 控件不会因为 hover、focus、active 改变布局尺寸。
- 移动端可点击区域不小于 44px。
- 所有可交互控件都能通过键盘看到焦点。

## 响应式断点建议

| 断点 | 行为 |
| --- | --- |
| `>= 1080px` | 双栏工作区，preview 左侧，inspector 右侧 |
| `920px - 1079px` | 可继续双栏但收窄 inspector，或提前单列，取决于实际视觉验收 |
| `<= 920px` | 工作区单列，inspector 移到 preview 下方 |
| `<= 720px` | 预览 header 改为 column，工具栏左对齐 |
| `<= 520px` | 字段行单列，tabs 可改 1-2 列，按钮允许满宽 |

## 设计与体验约束

- 不做大面积渐变、装饰图形或营销页式 hero。
- 不引入新的视觉主题，保持现有专业工具感。
- 不使用 emoji 作为结构性图标。
- 不移除 focus ring。
- 不让 hover 成为唯一反馈方式。
- 不使用固定宽度导致移动端横向滚动。
- 不创建嵌套卡片式结构，工作区保持工具面板语义。
- 不把 `SealConfig` 字段映射逻辑移出当前轻架构，避免扩大重构范围。

## 可访问性与质量检查

实现完成后至少检查：

- 正常文本对比度不低于 4.5:1。
- 交互目标不小于 44px。
- tab 顺序符合视觉顺序。
- 所有按钮、输入、选择框保留可见焦点。
- 移动端没有横向滚动。
- 字段说明、标签、控件不重叠。
- `prefers-reduced-motion` 不应受到新增布局动画影响；本次不建议新增复杂动画。

## 验证清单

后续 Agent 完成代码后，应执行：

```bash
npm run test
npm run build
```

建议人工或浏览器检查这些宽度：

- 375px
- 720px
- 920px
- 1080px
- 1440px

重点观察：

- preview 与 inspector 是否重叠。
- SVG 印章是否居中且不变形。
- 工具栏按钮是否换行自然。
- Inspector 字段是否可读、可点、可滚动。
- 页面是否出现横向滚动条。

## 非目标

- 不实现新的模板管理能力。
- 不增加字段说明、字段范围限制、单项重置等新交互。
- 不改 SVG 渲染算法。
- 不改导出文件命名和下载逻辑。
- 不引入新的 UI 框架或图标库。
- 不迁移到 React。

## 已知限制

- 当前环境中 `openspec` 命令不可用，但仓库已有 `openspec/changes/improve-workspace-experience/` 相关文档。
- `ui-ux-pro-max` skill 文档中提到的脚本路径在当前机器上不是可执行目录，因此本计划基于现有页面代码和 skill 规则整理。

## 建议执行顺序

1. 先调整 `HomeView.vue` 与 `WorkspacePanel.vue`，把页面骨架稳定下来。
2. 再调整 `SealPreview.vue`，确保画布高度和工具栏响应式正常。
3. 再调整 `SealEditorForm.vue`，处理 tabs、字段行和滚动区。
4. 最后微调 `common` 基础控件的尺寸与焦点状态。
5. 运行测试和构建，再做多视口视觉验收。
