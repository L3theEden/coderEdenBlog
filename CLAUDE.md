# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project State

**The repo has not been bootstrapped yet.** It currently contains only design/planning documents; there is no `package.json`, `src/`, or `node_modules/`. Before editing code, read:

- `docs/superpowers/specs/2026-04-21-coder-eden-blog-design.md` — the authoritative design spec (in Chinese) covering information architecture, visual tokens, component behavior, content schema, and acceptance criteria.
- `docs/superpowers/plans/2026-04-21-coder-eden-blog.md` — the 18-task implementation plan. Tasks are sequenced; each task specifies exact file paths, code contents, and a git commit at the end. When executing this plan, use `superpowers:executing-plans` or `superpowers:subagent-driven-development` as noted at the top of the plan.
- `DESIGN-claude.md` — the warm-literary design system adapted from Anthropic Claude. This is the visual source of truth.

## Commands (after bootstrap)

```bash
npm install
npm run dev        # Astro dev server on http://localhost:4321
npm run build      # Static output to ./dist
npm run preview    # Serve the built site
npm run check      # Type-check via @astrojs/check (run before build when types feel off)
```

There is no test suite or linter — verification is `npm run check && npm run build` plus a manual browser smoke test (see Task 18 acceptance criteria).

## Architecture

Static blog built with **Astro 5 + TypeScript**, output is pure HTML/CSS/JS. No React, no SSR, no CMS.

- **Content** lives in `src/content/` as `.md`/`.mdx`, typed via Content Collections (`src/content/config.ts`, zod schemas). Two collections: `posts` and `fragments`.
- **Series** (`src/data/series.ts`) is the single source of truth for the five Greek-mythology-themed groupings (`prometheus-fire`, `fausts-pact`, `daedalus-labyrinth`, `sisyphus-stone`, `orphic-descent`). The `SeriesId` type is exported from `src/content/config.ts` and reused everywhere — posts' frontmatter `series` field is `z.enum(SERIES)`, so adding a series means editing both files.
- **Styling** is Tailwind CSS 3 + custom CSS variables in `src/styles/tokens.css`. Tailwind's theme maps to CSS vars (e.g. `colors.brand: "var(--brand)"`), so dark mode is a single `data-theme="dark"` attribute swap on `<html>` — no Tailwind dark-variant classes in components.
- **Interactivity** is vanilla TypeScript in `src/scripts/` (theme init, TOC scroll-spy, reading progress, code-copy). FOUC-safe theme init is injected as an inline `<script is:inline set:html={THEME_INIT}>` inside `<head>` so it runs before paint.
- **Code highlighting** uses Astro's built-in shiki (configured in `astro.config.mjs`), not a client-side library.
- **Path alias**: `~/*` → `src/*` (configured in `tsconfig.json`).

## Project Conventions

These are non-obvious rules called out in the plan's Operating Principles and spec:

- **Never hard-code hex values in components.** All colors go through CSS variables from `tokens.css` (e.g. `bg-[color:var(--brand)]`, not `bg-[#c96442]`). This is how the theme toggle works without touching component code.
- **Bilingual content.** English for titles, epigraphs, section markers, and navigation labels; Chinese for body copy. Frontmatter often has both `title` (zh) and `title_en`.
- **Serifs at weight 500 only.** All headlines use Fraunces 500 (never 400 or 700). The spec is explicit that single-weight consistency is the typographic identity.
- **Warm-only neutrals.** Every gray has a yellow-brown undertone. No cool blue-grays anywhere. Focus Blue (`#3898ec`) is the *only* cool color, reserved for `:focus-visible` rings.
- **Ring shadows, not drop shadows.** Use `shadow-ring1` (`0 0 0 1px var(--ring)`) or `shadow-whisper` (`0 4px 24px rgba(0,0,0,0.05)`) — never generic drop shadows.
- **File names from the plan are binding.** If a task calls a component `PostCard.astro`, later tasks import exactly that. Don't invent new names mid-implementation.
- **Commit at the end of each plan task** with a descriptive message (the plan specifies each commit message).

## Planning Workflow

This repo uses a spec-then-plan workflow under `docs/superpowers/`:

- `docs/superpowers/specs/YYYY-MM-DD-<slug>.md` — design decisions and acceptance criteria
- `docs/superpowers/plans/YYYY-MM-DD-<slug>.md` — numbered tasks with file-level instructions

When starting new work, check whether a spec/plan already exists before designing from scratch.
