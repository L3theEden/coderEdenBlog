# CoderEden Blog Project Map

## Current State

The repository is bootstrapped and contains an Astro static site. The original implementation plan is historical context; verify current files before acting.

Core files:

- `package.json` — scripts: `dev`, `build`, `preview`, `check`
- `astro.config.mjs` — Astro integrations and Shiki config
- `tsconfig.json` — strict Astro config and `~/*` alias
- `tailwind.config.mjs` — Tailwind theme mapped to CSS variables
- `AGENTS.md` — Codex-facing project guidance
- `CLAUDE.md` — Claude Code-facing project guidance
- `README.md` — human-facing project overview
- `DESIGN-claude.md` — warm literary visual source of truth
- `docs/superpowers/specs/2026-04-21-coder-eden-blog-design.md` — Chinese design and acceptance spec
- `docs/superpowers/plans/2026-04-21-coder-eden-blog.md` — original task plan, useful for intent and file naming
- `.agents/skills/codereden-blog-dev/` — project development skill
- `.agents/skills/summarize-doc-to-post/` — source-to-post drafting skill

## Architecture

Static blog, no SSR:

- `src/pages/` — Astro routes
- `src/layouts/` — `BaseLayout.astro`, `PostLayout.astro`
- `src/components/` — nav, post, series, decor, home components
- `src/content/` — Content Collections for posts/fragments
- `src/data/series.ts` — series metadata and display order
- `src/styles/` — token and global CSS
- `src/scripts/` — vanilla TypeScript browser enhancements
- `src/utils/reading-time.ts` — mixed Chinese/English reading-time estimate

Routes:

- `/` — Prologue/home
- `/blog/` and `/blog/[slug]/`
- `/series/` and `/series/[series]/`
- `/fragments/`
- `/tags/` and `/tags/[tag]/`
- `/about/`
- `/rss.xml`

## Content Schema

`src/content/config.ts` defines:

- `posts`: `title`, optional `title_en`, `description`, optional `epigraph`, optional `scholia`, `series`, `tags`, `date`, `draft`
- `fragments`: `text_zh`, optional `text_en`, `author`, `date`

`scholia` is an optional companion relation with `href`, optional `title`, and optional `description`. It renders as `Scholia · 技术注疏` on post detail pages and should point to a direct technical annotation for the literary article.

Valid `series` ids:

- `prometheus-fire`
- `fausts-pact`
- `daedalus-labyrinth`
- `sisyphus-stone`
- `orphic-descent`

When adding a series, update both `src/content/config.ts` and `src/data/series.ts`, then audit routes/components that assume the five-series set.

## Design System Notes

The site adapts the Claude/Anthropic warm-literary style:

- light background: parchment
- surfaces: ivory and warm sand
- accent: terracotta
- dark mode: warm charcoal, not blue-black
- type: Fraunces for headings, Inter for UI/body, JetBrains Mono for code
- depth: borders, ring shadows, and whisper shadows

Avoid:

- cool blue-gray neutrals
- hex values in components
- generic saturated palettes
- heavy shadows
- serif font weights above 500
- card-in-card decorative layouts
- marketing-style hero copy when building actual app/blog pages

## Interaction Model

`src/scripts/theme-init.ts` exports the FOUC-safe inline theme initializer used in `BaseLayout.astro`.

`src/scripts/post-enhancements.ts` owns:

- reading progress
- TOC scroll-spy
- code copy buttons

Keep post-page enhancements vanilla unless a strong project reason appears.

## Verification Matrix

Baseline after most changes:

```bash
npm run check
npm run build
```

For visual or interaction changes:

```bash
npm run dev
```

Smoke-test relevant routes:

- home `/`
- changed content route, such as `/blog/<slug>/`
- list page affected by the change
- mobile width around 375px when layout changes
- dark/light theme when tokens, components, or nav are touched

## Growth Notes

When the project gains new durable capabilities, update this reference:

- new routes: add to Routes
- new content collections or frontmatter fields: add to Content Schema
- new scripts or client behavior: add to Interaction Model
- new design tokens or design exceptions: add to Design System Notes
- new verification commands: add to Verification Matrix
- changed onboarding or repo conventions: update `AGENTS.md`, `CLAUDE.md`, and this skill together

Do not copy entire specs or long code snippets here. Link to canonical files and summarize only the details an agent needs to make correct decisions.
