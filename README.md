# CoderEden Blog

> Notes from the workshop of a stolen fire.

Personal blog of **CoderEden** — engineering notes with a mythological spine (Greek myth × Faust).
Built with Astro, Tailwind, and a warm-literary design system adapted from Anthropic Claude.

## Dev

    npm install
    npm run dev       # http://localhost:4321
    npm run check     # Astro type + content collection checks
    npm run build     # static output to ./dist
    npm run preview

## Project Map

- `src/content/posts/` — blog posts (MDX)
- `src/content/fragments/` — aphorisms
- `src/data/series.ts` — five series metadata
- `src/styles/tokens.css` — color + typography tokens (light/dark)
- `docs/superpowers/specs/` — design specs and durable decisions
- `docs/superpowers/plans/` — implementation plans
- `.agents/skills/codereden-blog-dev/` — project-local development skill for agents
- `.agents/skills/summarize-doc-to-post/` — source-to-post drafting skill
