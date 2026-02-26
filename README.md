# Rune Console 产品文档

基于 [VitePress](https://vitepress.dev/) 构建的 Rune Console 产品使用文档站点，支持中英文双语。

## 技术栈

| 工具 | 版本 | 用途 |
|------|------|------|
| VitePress | ^1.6.3 | 静态文档生成 |
| vitepress-plugin-mermaid | ^2.0.17 | Mermaid 图表支持 |
| Mermaid | ^11.4.1 | 流程图/架构图渲染 |
| Playwright | ^1.49.1 | 自动截图 |

## 快速开始

### 环境要求

- **Node.js** >= 18
- **npm** >= 9（或 pnpm）

### 安装与运行

```bash
# 安装依赖
npm install

# 本地开发（热更新）
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

开发服务器默认运行在 `http://localhost:5173`。

## 项目结构

```
docs/
├── README.md                  # 本文件
├── package.json               # 项目配置
├── index.md                   # 中文首页
├── .gitignore
├── .vitepress/
│   ├── config.mts             # VitePress 主配置（导航、侧边栏、多语言）
│   └── theme/
│       ├── index.ts           # 自定义主题入口
│       ├── style.css          # 完整自定义样式（~800行）
│       └── RuneLayout.vue     # 自定义布局组件（首页背景装饰）
├── public/
│   ├── logo/                  # Logo 和 Favicon
│   │   ├── logo.svg
│   │   └── favicon.svg
│   ├── assets/
│   │   └── background/        # 背景图片资源
│   └── screenshots/           # 截图文件（271 张占位图）
├── scripts/
│   └── capture-screenshots.mjs  # Playwright 自动截图脚本
├── guide/                     # 📖 入门指南（4篇）
│   ├── introduction.md
│   ├── quick-start.md
│   ├── architecture.md
│   └── glossary.md
├── auth/                      # 🔐 认证与授权（6篇）
│   ├── login.md
│   ├── register.md
│   ├── reset-password.md
│   ├── select-tenant.md
│   ├── mfa.md
│   └── roles.md
├── console/                   # 🖥️ 控制台文档（34篇）
│   ├── index.md
│   ├── dashboard.md
│   ├── rune/                  # Rune 模块（15篇）
│   ├── moha/                  # Moha 模块（7篇）
│   ├── chatapp/               # ChatApp 模块（5篇）
│   └── iam/                   # IAM 模块（6篇）
├── boss/                      # 🏢 Boss 管理后台文档（29篇）
│   ├── index.md
│   ├── dashboard.md
│   ├── rune/                  # Rune 管理（7篇）
│   ├── moha/                  # Moha 管理（5篇）
│   ├── iam/                   # IAM 管理（2篇）
│   ├── gateway/               # 网关管理（7篇）
│   └── settings/              # 系统设置（6篇）
├── reference/                 # 📚 参考手册（3篇）
│   ├── permissions.md
│   ├── api-overview.md
│   └── faq.md
└── en/                        # 🌐 英文文档（完整镜像，76篇）
    ├── index.md
    ├── guide/
    ├── auth/
    ├── console/
    ├── boss/
    └── reference/
```

**总计**：152 篇 Markdown 文档（中文 76 篇 + 英文 76 篇）

## 文档维护指南

### 编辑现有文档

直接修改对应的 `.md` 文件即可，保存后开发服务器会自动热更新。

所有文档使用标准 Markdown 语法，并支持 VitePress 扩展：

- **提示容器**：`::: tip` / `::: warning` / `::: danger` / `::: info`
- **代码块高亮**：支持行高亮 `{1,3-5}`
- **Mermaid 图表**：使用 ` ```mermaid ` 代码块
- **Badge**：`<Badge type="tip" text="推荐" />`

### 新增文档页面

#### 1. 创建 Markdown 文件

在对应目录下创建 `.md` 文件，文件头部添加 frontmatter：

```markdown
---
title: 页面标题
---

# 页面标题

正文内容...
```

#### 2. 添加到侧边栏

编辑 `.vitepress/config.mts`，找到对应的侧边栏配置函数：

- 中文侧边栏：`zhSidebar()` 函数
- 英文侧边栏：`enSidebar()` 函数

在对应的 `items` 数组中添加条目：

```typescript
{
  text: '页面标题',
  link: '/console/rune/new-page'  // 对应文件路径，无需 .md 后缀
}
```

#### 3. 同步英文版本

在 `en/` 对应目录下创建同名文件，翻译内容后同样添加到 `enSidebar()` 中。

### 新增文档模块

如需新增一个完整模块（如新产品线）：

1. 在根目录下创建文件夹（如 `new-module/`）
2. 创建 `new-module/index.md` 作为模块首页
3. 在 `zhSidebar()` 中新增侧边栏分组
4. 在顶部导航 `zhNav` 中添加链接
5. 在 `en/` 下创建对应的英文镜像
6. 在 `enSidebar()` 和 `enNav` 中添加英文配置

### 截图管理

截图存放在 `public/screenshots/` 目录下，在文档中引用：

```markdown
![功能截图](/screenshots/console-dashboard.png)
```

自动截图脚本（需要先启动开发服务器）：

```bash
# 安装 Playwright 浏览器
npx playwright install chromium

# 执行截图
npm run screenshot
```

## 主题与样式

### 设计体系

文档站点使用与 Rune Console 产品一致的设计体系：

| Token | 值 | 说明 |
|-------|-----|------|
| 品牌主色 | `#6950E8` | 紫色，贯穿全站 |
| 灰色基准 | `#919EAB` | 文本、边框、背景 |
| 圆角基准 | `8px` | 卡片、按钮等 |
| 字体 | Public Sans / Barlow | 正文 / 标题 |

### 修改样式

- **全局样式**：编辑 `.vitepress/theme/style.css`
- **CSS 变量**：在 `:root` 中修改 VitePress 主题变量
- **布局组件**：编辑 `.vitepress/theme/RuneLayout.vue`（首页背景装饰）

### 暗黑模式

已内置完整的暗黑模式支持，所有颜色均通过 CSS 变量在 `.dark` 选择器下覆盖。

## 配置说明

### `.vitepress/config.mts` 关键配置

```typescript
// 站点元信息
title: 'Rune Console',
description: '...',

// 多语言
locales: {
  root: { label: '简体中文', lang: 'zh-CN' },
  en:   { label: 'English',  lang: 'en-US' }
},

// 导航栏
themeConfig: {
  nav: zhNav,
  sidebar: zhSidebar()
}
```

- **ignoreDeadLinks**: 已设为 `true`，避免占位链接报错
- **withMermaid()**: 包裹整个配置以启用 Mermaid 图表

## 构建与部署

### 本地构建

```bash
npm run build
```

构建产物输出到 `.vitepress/dist/`，约 153 个 HTML 页面，耗时 ~40s。

### Docker 部署

```bash
# 构建镜像
docker build -t rune-console-docs .

# 运行容器
docker run -d -p 8080:80 rune-console-docs

# 访问文档
open http://localhost:8080
```

详见项目根目录的 `Dockerfile`。

### 自定义 Nginx 配置

Docker 镜像内置了针对 SPA 的 Nginx 配置，支持：
- Gzip 压缩
- 静态资源长期缓存
- HTML 文件不缓存（保证更新即时生效）
- 404 回落到 index.html

## 常见问题

### 构建报错 dead links

配置中已设置 `ignoreDeadLinks: true`。如需严格检查，可将其改为 `false` 或配置白名单。

### 样式不生效

确认修改的是 `.vitepress/theme/style.css` 而非其他文件。VitePress 的 CSS 变量优先级高于普通样式，建议使用 CSS 变量覆盖。

### Mermaid 图表不渲染

确认在 `config.mts` 中使用了 `withMermaid()` 包裹，且已安装 `vitepress-plugin-mermaid` 和 `mermaid` 依赖。

### 中英文不同步

英文文档位于 `en/` 目录下，结构与中文完全一致。新增或修改中文文档后，请同步更新对应的英文文件。

## 维护清单

- [ ] 定期更新截图以匹配产品最新 UI
- [ ] 新功能上线后及时补充对应文档
- [ ] 保持中英文文档同步
- [ ] 检查并修复失效链接
- [ ] 根据用户反馈完善 FAQ
