# CoderEden Blog — Scholia Technical Notes Design

**Date:** 2026-05-16
**Status:** Draft for review
**Feature:** `Scholia · 技术注疏`

## 1. Purpose

CoderEden 的主文章仍然保持“文学化技术文章”的形态：技术经验、工程判断和神话/浮士德隐喻交织。`Scholia · 技术注疏` 是每篇文章的可选配套入口，用来把主文里的隐喻拆回机制、代码与结论。

这个入口不表达“正经版”“干货版”或“纯技术版”。它使用 `Scholia` 的古典注疏意味，让直接技术拆解成为主文的旁注，而不是替代主文的另一套站点气质。

## 2. Content Model

在 `posts` collection frontmatter 中增加可选字段：

```yaml
scholia:
  href: "/blog/synchronized-locks-scholia/"
  title: "技术注疏"
  description: "对象头、锁升级、Monitor 与 JIT 边界的直接拆解。"
```

字段规则：

- `scholia` 整体可选。未配置的文章不显示任何注疏入口。
- `href` 必填，支持站内路径和外部 URL。
- `title` 可选，默认展示 `技术注疏`。
- `description` 可选；存在时用于文末 companion block。
- 正文文章和注疏文章可以都继续属于现有 `posts` collection，不新增 collection。

## 3. Placement

### Header Entry

在文章详情页标题区，日期和阅读时长下方显示一个轻量胶囊链接：

```text
Scholia · 技术注疏 →
```

视觉要求：

- 低调，不抢主标题和 epigraph。
- 使用现有 warm tokens，不硬编码组件色值。
- `Scholia` 可使用 serif italic，延续古典注疏感。
- 链接需要清晰可聚焦，遵守现有 `:focus-visible` 行为。

### Ending Block

在正文内容之后、底部系列引文之前，显示一个 companion block：

```text
Scholia
技术注疏

把这一篇里的隐喻拆回机制、代码与结论。
阅读注疏 →
```

如果 `scholia.description` 存在，替换默认说明文字。

视觉要求：

- 使用标准卡片尺度：8px 圆角、token border、ring/whisper depth。
- 不使用营销式 CTA，不使用“正经”“干货”“硬核”等平台化表达。
- 文末 block 是读者路径提示，不是广告卡片。

## 4. Routing And IA

本功能不新增主导航项，不新增 `/technical/` 或 `/scholia/` 列表页。

理由：

- 现有信息架构已经由 `Prologue / Chronicles / Series / Fragments / About` 支撑。
- `Scholia` 是单篇文章的 companion relation，不是新的站点栏目。
- 如果未来注疏文章数量明显增长，再考虑用 tag、collection 或列表页扩展。

站内注疏文章建议继续放在 `/blog/<slug>/` 下，并在标题、标签或 frontmatter 里明确其注疏性质，避免在文章列表中和文学主文混淆。

## 5. Component Boundary

建议新增一个小组件，例如 `src/components/post/ScholiaLink.astro`，由 `PostLayout.astro` 传入 `post.data.scholia` 后复用两种 variant：

- `variant="inline"`：头部胶囊入口。
- `variant="block"`：文末 companion block。

组件只负责展示和链接，不负责查找相关文章、不自动推断 slug、不读取 collection。关系由 frontmatter 显式声明。

## 6. Validation

实现后需要验证：

- 没有 `scholia` 的文章页面不出现入口。
- 配置了 `scholia` 的文章头部和文末都出现入口。
- 站内路径和外部 URL 都能渲染为普通链接。
- `npm run check` 通过 Content Collection 类型校验。
- `npm run build` 成功生成静态页面。
- 浏览器 smoke test 覆盖一个有注疏入口的文章页和一个没有注疏入口的文章页。
