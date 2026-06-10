---
name: codereden-blog-dev
description: Use when developing, refactoring, reviewing, debugging, or adding content in the CoderEden Blog Astro repository, especially when touching src/, docs/superpowers/, DESIGN-claude.md, AGENTS.md, CLAUDE.md, or project-local skills.
---

# CoderEden Blog Development

## Overview

CoderEden Blog is a static Astro 5 + TypeScript personal blog with a warm literary design system: parchment surfaces, Fraunces serif headings, Greek mythology/Faust series framing, bilingual content, Tailwind CSS backed by CSS variables, and vanilla TypeScript interactions.

This skill is the project entry point for future development. It keeps high-frequency rules close at hand and points to deeper references only when they matter.

## First Move

Start at the repo root:

```bash
cd /Users/l3theeden/Desktop/project/coderEdenBlog
```

Then quickly establish current reality:

```bash
git status --short
rg --files
```

Project entry docs are `AGENTS.md` for Codex and `CLAUDE.md` for Claude Code. If those docs ever disagree with the current files, trust the files and update the docs as part of the change.

For deeper project facts, read [references/project-map.md](references/project-map.md) when:

- adding or moving files
- changing visual design, tokens, content schemas, series, pages, or routing
- adding posts/fragments
- reviewing whether a change fits the site identity
- updating this skill after new architecture is added

## Development Workflow

1. Read the relevant source before editing. Prefer local patterns over new abstractions.
2. If the request changes behavior or UI, use the normal engineering workflow: create focused verification when practical, then implement, then verify.
3. Keep edits scoped. Do not rename planned files or public routes unless the request requires it.
4. Use Astro, TypeScript, Tailwind 3, Content Collections, and vanilla browser scripts. Do not introduce React, SSR, CMS, client-side highlighters, or search unless the user explicitly asks.
5. After edits, run:

```bash
npm run check
npm run build
```

For UI changes, also run `npm run dev` and smoke-test the changed route in a browser when feasible.

## Project Rules

- Colors in components must use CSS variables from `src/styles/tokens.css`, not literal hex values.
- Dark mode is controlled by `data-theme` on `<html>` and token swapping. Avoid Tailwind dark variants in components.
- Headings use Fraunces/serif at weight 500. Do not use serif bold or a cool corporate typography style.
- Keep neutrals warm. `--focus` is the only cool blue and is reserved for focus-visible rings.
- Prefer ring shadows (`shadow-ring1`) and `--shadow-whisper`; avoid generic drop shadows.
- Use the `~/*` alias for `src/*` imports when local code already does.
- English is used for navigation, series names, epigraphs, and the `Scholia` label; Chinese is primary for body copy and may be used for companion titles.
- Content series are constrained to the five ids in `src/content/config.ts` and `src/data/series.ts`.

## Content Additions

For requests to add or draft a long post:

- Use `summarize-doc-to-post` when the user provides or points to source material: pasted text, a URL, a local file, notes, a document, an existing post, or asks for a literary post, Scholia technical note, or paired main article plus companion note.
- For Scholia or version-sensitive technical content, verify current claims against primary sources or official documentation before writing.
- Do not force `summarize-doc-to-post` for fragments, typo fixes, frontmatter-only edits, tag/series plumbing, or UI changes.
- If the user asks for a new post but gives no source or angle, ask for the source/claim first unless they explicitly want a blank/manual scaffold.

For manual content edits:

- Posts live in `src/content/posts/*.mdx`.
- Fragments live in `src/content/fragments/*.md`.
- Frontmatter must satisfy `src/content/config.ts`.
- Posts may optionally define `scholia` with `href`, optional `title`, and optional `description` to link a literary post to its `Scholia · 技术注疏` companion.
- Slugs are lowercase kebab-case and become `/blog/<slug>/`.
- Reuse existing tags where possible; keep new tags lowercase kebab-case.
- Do not write `#` as a body title inside a post. The layout renders the frontmatter title.

## Design Changes

Before changing visual language, read:

- `DESIGN-claude.md`
- `docs/superpowers/specs/2026-04-21-coder-eden-blog-design.md`
- the affected components under `src/components/`

Design changes should preserve the blog's identity: warm paper, editorial rhythm, restrained terracotta accents, organic decoration, bilingual literary tone, and readable long-form content.

## Extending This Skill

Update this skill when a new durable convention appears, not for one-off implementation details.

Use this split:

- Put high-frequency workflow rules in `SKILL.md`.
- Put stable project maps, schemas, route lists, and growth notes in `references/project-map.md`.
- If future content workflows become distinct, create a focused sibling skill instead of overloading this one.

Before finishing a skill update, review it for:

- correct trigger description
- no stale project facts
- no duplicated long material already present in project docs
- clear instructions for verification
- concise enough to load often
- the Codex twin under `.agents/skills/codereden-blog-dev/` updated with the same durable changes
