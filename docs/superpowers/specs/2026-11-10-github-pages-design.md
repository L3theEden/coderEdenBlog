# GitHub Pages 部署

## 目标与授权

- 将现有 Astro 静态博客发布到 `https://l3theeden.github.io/coderEdenBlog/`。
- 用户已明确同意将 `L3theEden/coderEdenBlog` 设为公开仓库；当前套餐不支持该私有仓库的 Pages。
- 保留原有路由、文章内容和视觉设计，使用 GitHub Actions 构建和部署。

## 路径与发布约定

- `astro.config.mjs` 设置站点 origin、`/coderEdenBlog` base 和尾斜杠。
- Astro 组件中的站内链接使用 `withBase()`；不要在内容里硬编码仓库前缀。
- Markdown/MDX 链接、图片和引用式链接由 remark 插件在构建时补前缀。
- canonical、OG 图片、RSS、sitemap、robots、favicon 都需要正确的部署地址。
- `main` 推送或手动触发工作流后，依次安装锁定依赖、检查、构建、验证产物、上传并部署。
- 工作流通过 GitHub 自带的令牌与 OIDC 部署，不添加个人访问令牌。

## 验收

- `npm run check && npm run build && npm run verify:build` 通过。
- 所有生成页面的站内链接、资源和目录锚点都有目标；RSS/sitemap 使用项目路径。
- 文艺正文和 Scholia 的双向链接在项目路径下正常工作。
- GitHub Pages 部署成功，公开地址的首页、文章、CSS 和图片能访问。
- 浏览器验证导航、文章阅读及文艺正文与技术注疏的双向跳转。
