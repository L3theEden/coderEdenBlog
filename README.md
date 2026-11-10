# CoderEden Blog

> Notes from the workshop of a stolen fire.

Personal blog of **CoderEden** — engineering notes with a mythological spine (Greek myth × Faust).
Built with Astro, Tailwind, and a warm-literary design system adapted from Anthropic Claude.

## Dev

    npm install
    npm run dev       # http://localhost:4321/coderEdenBlog/
    npm run check     # Astro type + content collection checks
    npm run build     # static output to ./dist
    npm run verify:build # verify built links, assets, feeds and sitemap
    npm run preview

## Deployment

Live site: [CoderEden](https://l3theeden.github.io/coderEdenBlog/).

GitHub Pages serves the static output from the `Deploy to GitHub Pages` workflow.
Every push to `main` installs the locked dependencies, checks types and content,
builds the site, verifies the generated URLs, and deploys after those checks pass.
You can also run the workflow manually from GitHub Actions.

The deployment uses `site: 'https://l3theeden.github.io'` and
`base: '/coderEdenBlog'` in `astro.config.mjs`. Component links use
`withBase()` from `src/utils/site-url.ts`. Keep Markdown/MDX links and `scholia.href`
site-relative (for example `/blog/example/`); the renderer adds the base.
For a future custom domain, update `site` and `base` together rather than editing
every article. No custom domain is currently configured.

Local development and preview use the same `/coderEdenBlog/` prefix. Preview serves
the last build, so rebuild after changing source files. Before pushing, run:

    npm run check && npm run build && npm run verify:build

## Project Map

- `src/content/posts/` — blog posts (MDX)
- `src/content/fragments/` — aphorisms
- `src/data/series.ts` — five series metadata
- `src/styles/tokens.css` — color + typography tokens (light/dark)
- `docs/superpowers/specs/` — design specs and durable decisions
- `docs/superpowers/plans/` — implementation plans
- `.agents/skills/codereden-blog-dev/` — project-local development skill for agents
- `.agents/skills/summarize-doc-to-post/` — source-to-post drafting skill
