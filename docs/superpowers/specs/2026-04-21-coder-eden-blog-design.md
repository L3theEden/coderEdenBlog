# CoderEden Blog — Design Spec

**Date:** 2026-04-21
**Author:** CoderEden (with Claude)
**Design inspiration:** `DESIGN-claude.md`（Anthropic Claude warm-literary design system）
**Philosophical skeleton:** Greek mythology × Faust（交织神话，approach A）

---

## 1. 项目定位

CoderEden 的个人博客。核心气质是**温暖的书卷**（羊皮纸底色 + 衬线书写）与**偷来的火**（偷自神话与浮士德的哲学骨架）的叠加。

- 内容主线：**代码为主，哲学为气质**。工程笔记、架构随想、工具文化，借神话/浮士德的形象为每一篇找一个"引力中心"。
- 读者定位：同为工程师但愿意多看两眼引文的人。
- 站点语言：**中英混排**。正文以中文为主，标题 / 引文 / 系列名用英文或希腊文作副线。

## 2. 技术架构

| 类别 | 选择 | 原因 |
|---|---|---|
| 框架 | Astro 5.x + TypeScript | 静态生成、Content Collections、原生 MDX |
| 样式 | Tailwind CSS + 自定义 tokens.css | Tailwind 提速，但 DESIGN 系统的色值 / 字体走 CSS 变量以保持单一来源 |
| 内容 | `.md` / `.mdx` via Content Collections | frontmatter 自动类型校验 |
| 字体 | Google Fonts Fraunces（Serif 替代） + Inter（Sans） + JetBrains Mono（Mono） | Fraunces 最接近 Anthropic Serif 的"书名质感" |
| 交互 | vanilla TypeScript | 主题切换、TOC 高亮、阅读进度、代码复制——不引入 React |
| 构建产物 | 纯静态 HTML / CSS / JS | 部署到任意静态托管（Vercel / Netlify / GitHub Pages） |

**无站内搜索**（v1 不做）。

**文件结构**
```
src/
  content/
    posts/            # 博文 .md/.mdx
    fragments/        # 思想碎片 .md（每条一句格言）
    config.ts         # Collection schema（zod）
  components/
    nav/
      Nav.astro
      ThemeToggle.astro
    post/
      PostCard.astro
      PostMeta.astro
      PostToc.astro
      ReadingProgress.astro
      EpigraphQuote.astro
      CodeBlock.astro   # 带复制按钮
    series/
      SeriesCard.astro
    decor/
      OrnamentalDivider.astro
      FlameIcon.astro   # hero 装饰
  layouts/
    BaseLayout.astro
    PostLayout.astro
    PageLayout.astro
  pages/
    index.astro
    about.astro
    blog/
      index.astro       # 文章列表
      [slug].astro      # 文章详情
    series/
      index.astro
      [series].astro
    fragments/
      index.astro
    tags/
      index.astro
      [tag].astro
  styles/
    tokens.css
    typography.css
    global.css
  scripts/
    theme-init.ts       # FOUC 前 inline
    toc.ts
    progress.ts
    copy-code.ts
public/
  fonts/
  og/                   # Open Graph 图占位
  favicon.svg
```

## 3. 信息架构

### 顶部导航

- **左**：`CoderEden` wordmark（Fraunces 20px / w500）
- **中**：`Prologue` ｜ `Chronicles` ｜ `Series` ｜ `Fragments` ｜ `About`
- **右**：主题切换按钮（太阳 / 月亮 内联 SVG，44×44px 触控目标）

移动端：中部折叠为 hamburger。

### 五大系列

| 系列 | 中文名 | 主题 | 引文（中英） |
|---|---|---|---|
| Prometheus' Fire | 普罗米修斯之火 | 大胆实验、偷窃而来的能力 | *"The fire that was stolen is still warm in our hands."*<br/>被盗的火，至今仍在我们手中发烫。 |
| Faust's Pact | 浮士德之契 | 技术债、权衡、速度与代价 | *"Zwei Seelen wohnen, ach! in meiner Brust."*<br/>两个灵魂啊，居于我胸中。 |
| Daedalus' Labyrinth | 代达罗斯之迷宫 | 架构、抽象、系统边界 | *"He who builds the maze must also remember the way out."*<br/>造迷宫的人，也要记得来路。 |
| Sisyphus' Stone | 西西弗斯之石 | 重构、日常、重复的冥想 | *"One must imagine Sisyphus happy."*<br/>应当想象西西弗斯是幸福的。 |
| Orphic Descent | 俄耳甫斯下降 | 调试、追溯、回忆的危险 | *"Look not back, lest the truth dissolve."*<br/>莫回首，否则真相消散。 |

### 页面职责

#### 首页 `/` (Prologue)
- **Hero**：Fraunces 64px 标题 `CoderEden — notes from the workshop of a stolen fire`；副标中英双行；terracotta 线描火焰 + 齿轮 SVG
- 五系列入口卡片（2×3 网格，最后一格放碎片入口）
- 最近 3 篇文章 `PostCard` 列表
- 3 条精选碎片（短引用卡）
- Footer

#### 文章列表 `/blog` (Chronicles)
- 左：按年份分组的时间线
- 右：标签筛选芯片（URL query 同步）
- 每条 `PostCard`

#### 文章详情 `/blog/[slug]`
- 顶部 2px 阅读进度条
- Epigraph 引文块（左 2px terracotta 竖线，serif italic）
- `PostMeta`：系列徽章 / 日期 / 阅读时长
- 正文区（Fraunces 17px / lh 1.75）
- 桌面端右栏 sticky TOC（`top: 100px`，当前段落圆点高亮）
- 移动端顶部 `<details>` 折叠 TOC
- 底部"同系列文章"3 卡横滑

#### 系列 `/series`, `/series/[id]`
- 列表页：5 大系列卡 + 引文
- 系列专页：系列封面大题 + 引文 + 本系列文章倒序

#### 碎片 `/fragments`
- 瀑布流卡片（CSS columns 布局，3 列桌面 / 1 列移动）
- 每卡：一句格言 + 作者 + 日期

#### 关于 `/about`
- **上半 Manifesto**（~200 字）：为何写代码 / 为何写博客
- **中部分隔引文**：Faust I "Zwei Seelen..."
- **下半时间线**：4–5 段职业节点（年份 + 一句 Faust/Greek 隐喻）
- **文末自白**：8 行原创独白（中英双行）

#### 标签 `/tags`, `/tags/[tag]`
- 索引页：标签云（字号 ∝ 频次）
- 单标签页：该标签下文章列表

## 4. 视觉 Token（对接 DESIGN-claude.md）

`src/styles/tokens.css`：

```css
:root[data-theme="light"] {
  --bg: #f5f4ed;
  --surface: #faf9f5;
  --surface-2: #e8e6dc;
  --text: #141413;
  --text-muted: #5e5d59;
  --text-faint: #87867f;
  --border: #f0eee6;
  --border-strong: #e8e6dc;
  --brand: #c96442;
  --brand-soft: #d97757;
  --ring: #d1cfc5;
  --focus: #3898ec;
}

:root[data-theme="dark"] {
  --bg: #141413;
  --surface: #30302e;
  --surface-2: #3d3d3a;
  --text: #faf9f5;
  --text-muted: #b0aea5;
  --text-faint: #87867f;
  --border: #30302e;
  --border-strong: #3d3d3a;
  --brand: #d97757;
  --brand-soft: #c96442;
  --ring: #3d3d3a;
  --focus: #3898ec;
}
```

**圆角**：8 / 12 / 16 / 24 / 32 px（对应 DESIGN 系统 "comfortably → maximum"）
**阴影**：
- Ring：`0 0 0 1px var(--ring)`（按钮、卡片 hover）
- Whisper：`0 4px 24px rgba(0,0,0,0.05)`（特色卡、封面）

## 5. 关键组件行为

### `ThemeToggle`
- 按钮 44×44px，内联太阳 / 月亮 SVG
- 点击：切换 `<html data-theme>`，写入 `localStorage.theme`
- 首屏：`scripts/theme-init.ts` 在 `<head>` 内联执行，先读 localStorage，其次 `matchMedia('(prefers-color-scheme: dark)')`，避免 FOUC

### `PostToc`
- 构建期从 MDX 标题提取 h2/h3 生成树
- 运行期 `IntersectionObserver` 监听正文 `h2/h3`，当前段落对应 TOC 项加 `--brand` 文字与圆点

### `ReadingProgress`
- 监听 `scroll`，宽度 = `window.scrollY / (document.body.scrollHeight - window.innerHeight)`
- `position: fixed; top: 0; height: 2px; background: var(--brand)`

### `EpigraphQuote`
- Props：`text`（可含换行）、`source`
- 左边 2px terracotta 竖线，文本 Fraunces italic 18px，来源行 overline 样式 `— GOETHE, FAUST I`

### `CodeBlock`
- shiki 高亮（Astro 内置），warm 配色（Rose Pine Moon 或自定义主题）
- 右上角复制按钮，点击复制并切换文案 "Copy" → "Copied"

### `PostCard`
- Ivory 底，`1px solid var(--border)`，8px 圆角
- hover：`0 0 0 1px var(--ring)` + `translateY(-2px)`，180ms
- 系列徽章：10px overline，terracotta 文字

### `OrnamentalDivider`
- 手绘感 SVG：三个小菱形 + 横线，stroke = `var(--text-faint)`

## 6. 字体加载

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,500i&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

`font-display: swap`，关键字重 400 / 500 / 500-italic。

## 7. Content Collection Schema

`src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const SERIES = [
  'prometheus-fire',
  'fausts-pact',
  'daedalus-labyrinth',
  'sisyphus-stone',
  'orphic-descent',
] as const;

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    title_en: z.string().optional(),
    description: z.string(),
    epigraph: z.object({
      text_en: z.string(),
      text_zh: z.string(),
      source: z.string(),
    }).optional(),
    series: z.enum(SERIES),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const fragments = defineCollection({
  type: 'content',
  schema: z.object({
    text_zh: z.string(),
    text_en: z.string().optional(),
    author: z.string().default('CoderEden'),
    date: z.coerce.date(),
  }),
});

export const collections = { posts, fragments };
```

`reading_time` 构建期计算（字数 / 中文 300 wpm、英文 200 wpm 取混合估算）。

## 8. 演示内容

**6 篇完整演示文章**（每篇 600–1200 字）：

1. **《Prometheus' Fire · 偷来的火也要有人看管》**
   - series: prometheus-fire｜tags: engineering-culture, tooling
   - AI 协作工具普及后，生产力之"火"如何不烫伤使用者
   - epigraph: Aeschylus *Prometheus Bound*

2. **《Faust's Pact · 我与 any 的契约》**
   - series: fausts-pact｜tags: typescript, tech-debt
   - TypeScript 滥用 `any` 是最甜美的魔鬼交易——含代码前后对比
   - epigraph: Goethe *Faust I*

3. **《Daedalus' Labyrinth · 微服务迷宫的入口必须比出口醒目》**
   - series: daedalus-labyrinth｜tags: architecture, microservices
   - 架构边界与可观测性
   - epigraph: Ovid *Metamorphoses*

4. **《Sisyphus' Stone · 每天推一次主分支，如同推石上山》**
   - series: sisyphus-stone｜tags: git, workflow
   - 日常 rebase 循环读作冥想练习
   - epigraph: Camus *Le Mythe de Sisyphe*

5. **《Orphic Descent · 向 core dump 里下降时，请不要回头》**
   - series: orphic-descent｜tags: debugging, postmortem
   - memory corruption 的调试笔记，对话体复盘
   - epigraph: Rilke *Orpheus. Eurydike. Hermes.*

6. **《Walpurgisnacht · 凌晨三点的 git blame》**
   - series: fausts-pact｜tags: essay, late-night
   - 深夜复盘一段自己写下的恶意优化代码
   - epigraph: Goethe *Faust II*（山巅之夜段）

**碎片 8–10 条**：从上述 6 篇中抽最锋利的句子，外加 2–3 条独立原创格言。

**About 页完整撰写**：Manifesto 200 字 + 时间线 4–5 节点 + 结尾 8 行独白。

## 9. 响应式断点

| 断点 | 宽度 | 变化 |
|---|---|---|
| sm | <640px | 单列，hamburger，hero 标题 36px，TOC 折叠 |
| md | 640–1024px | 2 列系列卡，nav 水平，TOC 折叠 |
| lg | ≥1024px | 3 列系列卡网格，桌面 TOC sticky 右栏，hero 标题 64px |

## 10. 非功能性

- **可访问性**：所有按钮 44×44px 最小；颜色对比 AA（羊皮纸 + Near Black 对比 > 15:1）；`:focus-visible` 用 Focus Blue ring
- **性能**：首屏 CSS inline；图片 lazy；字体 `display: swap`；Lighthouse 目标 Performance ≥ 95
- **SEO**：每页 OG 图（可占位）、meta description、JSON-LD BlogPosting
- **RSS**：Astro `@astrojs/rss`，`/rss.xml`
- **站点地图**：`@astrojs/sitemap`
- **404 页**：引 Faust "Wer immer strebend sich bemüht..."

## 11. 范围外（v1 不做）

- 评论系统
- 站内搜索（用 Pagefind 后续补）
- 多语言切换（只做中英混排，不做语言切换器）
- CMS / 后台
- 订阅邮件列表

## 12. 验收标准

1. `npm run dev` 可启动
2. `npm run build` 无错误
3. 6 篇演示文章、8–10 条碎片、About 完整可见
4. 明暗切换无闪烁，localStorage 记忆
5. 文章详情桌面 TOC sticky 且高亮当前段落
6. 阅读进度条随滚动平滑更新
7. 代码块复制按钮可用
8. 移动端（375px）所有页面无横向滚动
9. Lighthouse Performance / Accessibility / Best Practices / SEO 均 ≥ 90
