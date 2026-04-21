# CoderEden Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a static personal blog "CoderEden" with Astro — warm-literary Claude design system, Greek-mythology-and-Faust structural skeleton, dark-mode toggle, six demo posts.

**Architecture:** Astro 5 static site, Tailwind + custom CSS tokens, Content Collections for posts/fragments, vanilla TypeScript for theme/TOC/progress, shiki for code highlight.

**Tech Stack:** Astro 5 · TypeScript · Tailwind CSS 3 · Fraunces/Inter/JetBrains Mono · shiki · `@astrojs/rss` · `@astrojs/sitemap`

**Spec:** `docs/superpowers/specs/2026-04-21-coder-eden-blog-design.md`

---

## Operating Principles

- Work at the project root: `/Users/l3theeden/Desktop/project/coderEdenBlog`
- `git init` is done in Task 1. Commit at the end of every task with a descriptive message.
- After UI tasks: run `npm run build` to catch type errors; run `npm run dev` and sanity-check in a browser.
- Do not invent filenames or signatures outside this plan. If a task calls a file `PostCard.astro`, later tasks must match.
- All color references go through CSS variables from `tokens.css` — never hard-code hex values in components.
- Chinese-English bilingual: English for titles/epigraphs/section markers, Chinese for body.

---

## Task 1: Bootstrap Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `README.md`
- Directory: `src/`, `public/`

- [ ] **Step 1: Init git & npm**

```bash
cd /Users/l3theeden/Desktop/project/coderEdenBlog
git init
git branch -m main
```

- [ ] **Step 2: Create minimal `package.json`**

```json
{
  "name": "coder-eden-blog",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

- [ ] **Step 3: Install dependencies**

```bash
npm install astro@^5 @astrojs/check@latest typescript@^5 @astrojs/mdx@latest @astrojs/rss@latest @astrojs/sitemap@latest @astrojs/tailwind@latest tailwindcss@^3
```

- [ ] **Step 4: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://codereden.example',
  integrations: [
    mdx(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: true,
    },
  },
});
```

- [ ] **Step 5: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "~/*": ["src/*"] }
  }
}
```

- [ ] **Step 6: Create `.gitignore`**

```
node_modules
dist
.astro
.DS_Store
.env
.env.local
```

- [ ] **Step 7: Create minimal `src/pages/index.astro` to make build pass**

```astro
---
---
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>CoderEden</title>
  </head>
  <body>
    <p>boot</p>
  </body>
</html>
```

- [ ] **Step 8: Verify build**

Run: `npm run build`
Expected: build succeeds, `dist/index.html` exists.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: bootstrap astro project"
```

---

## Task 2: Design tokens (tokens.css)

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css` (imports tokens + resets)
- Create: `tailwind.config.mjs`

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
:root,
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
  --shadow-whisper: 0 4px 24px rgba(0, 0, 0, 0.05);

  --font-serif: "Fraunces", Georgia, serif;
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;

  --max-w: 1200px;

  color-scheme: light;
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
  --shadow-whisper: 0 4px 24px rgba(0, 0, 0, 0.25);

  color-scheme: dark;
}
```

- [ ] **Step 2: Create `src/styles/global.css`**

```css
@import "./tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 200ms ease, color 200ms ease;
}

a {
  color: inherit;
  text-decoration: none;
}

img,
svg {
  display: block;
  max-width: 100%;
}

::selection {
  background: var(--brand);
  color: #faf9f5;
}

:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
```

- [ ] **Step 3: Create `tailwind.config.mjs`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        text: "var(--text)",
        muted: "var(--text-muted)",
        faint: "var(--text-faint)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        brand: "var(--brand)",
        "brand-soft": "var(--brand-soft)",
        ring: "var(--ring)",
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
      maxWidth: {
        layout: "1200px",
      },
      boxShadow: {
        whisper: "var(--shadow-whisper)",
        ring1: "0 0 0 1px var(--ring)",
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Verify build still passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(design): add tokens + tailwind config"
```

---

## Task 3: BaseLayout + font loading + FOUC-safe theme init

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/scripts/theme-init.ts`
- Create: `public/favicon.svg`
- Modify: `src/pages/index.astro` (switch to BaseLayout)

- [ ] **Step 1: Create `public/favicon.svg`** — a terracotta flame

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 3c1 5-5 7-5 13a5 5 0 0010 0c0-2-1-3-2-4 2 1 3 3 3 6a7 7 0 01-14 0c0-6 6-8 8-15z" fill="none" stroke="#c96442" stroke-width="1.6" stroke-linejoin="round"/></svg>
```

- [ ] **Step 2: Create `src/scripts/theme-init.ts`** — a string injected via `set:html` inside `<head>` so it runs before paint

```ts
export const THEME_INIT = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var mql = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (mql ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`.trim();
```

- [ ] **Step 3: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '~/styles/global.css';
import { THEME_INIT } from '~/scripts/theme-init';

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}

const {
  title,
  description = 'CoderEden — notes from the workshop of a stolen fire.',
  ogImage = '/og/default.png',
} = Astro.props;

const canonical = new URL(Astro.url.pathname, Astro.site);
---
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} · CoderEden</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

    <!-- OG -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,500&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
    />

    <!-- FOUC-safe theme -->
    <script is:inline set:html={THEME_INIT}></script>
  </head>
  <body class="min-h-screen">
    <slot name="header" />
    <main>
      <slot />
    </main>
    <slot name="footer" />
  </body>
</html>
```

- [ ] **Step 4: Update `src/pages/index.astro` to use BaseLayout**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
---
<BaseLayout title="Prologue">
  <section class="mx-auto max-w-layout px-6 py-24">
    <h1 class="font-serif text-5xl md:text-6xl leading-[1.1] text-text">
      CoderEden
    </h1>
    <p class="mt-4 text-muted">boot — hero comes in Task 10</p>
  </section>
</BaseLayout>
```

- [ ] **Step 5: Verify**

Run: `npm run dev` (ctrl-C after). Visit http://localhost:4321. Confirm: parchment bg, serif headline renders Fraunces once loaded, no FOUC when toggling `localStorage.theme = 'dark'` + reload.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(layout): BaseLayout + FOUC-safe theme init"
```

---

## Task 4: Content Collections schema + reading-time util

**Files:**
- Create: `src/content/config.ts`
- Create: `src/utils/reading-time.ts`
- Create: `src/content/posts/.gitkeep`
- Create: `src/content/fragments/.gitkeep`

- [ ] **Step 1: Create `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

export const SERIES = [
  'prometheus-fire',
  'fausts-pact',
  'daedalus-labyrinth',
  'sisyphus-stone',
  'orphic-descent',
] as const;

export type SeriesId = typeof SERIES[number];

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    title_en: z.string().optional(),
    description: z.string(),
    epigraph: z
      .object({
        text_en: z.string(),
        text_zh: z.string(),
        source: z.string(),
      })
      .optional(),
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

- [ ] **Step 2: Create `src/utils/reading-time.ts`** — mixed zh/en estimate

```ts
// Count CJK characters as 1 word each; latin words split by whitespace.
// Reading speeds: zh 300 cpm, en 200 wpm -> both roughly 200 units/min.
export function readingTimeMinutes(text: string): number {
  const stripped = text.replace(/```[\s\S]*?```/g, ' ').replace(/[#*_>`~\-\[\]\(\)]/g, ' ');
  const cjk = (stripped.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const latin = stripped
    .replace(/[\u4e00-\u9fff]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = cjk / 300 + latin / 200;
  return Math.max(1, Math.round(minutes));
}

export function readingTimeLabel(minutes: number): string {
  return `${minutes} min read · 约 ${minutes} 分钟`;
}
```

- [ ] **Step 3: Create placeholder keep-files**

Run:
```bash
mkdir -p src/content/posts src/content/fragments
touch src/content/posts/.gitkeep src/content/fragments/.gitkeep
```

- [ ] **Step 4: Verify build**

Run: `npm run check && npm run build`
Expected: PASS (empty collections are fine).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(content): collection schema + reading-time util"
```

---

## Task 5: Series registry + small shared UI utils

**Files:**
- Create: `src/data/series.ts`
- Create: `src/components/decor/OrnamentalDivider.astro`
- Create: `src/components/decor/FlameIcon.astro`

- [ ] **Step 1: Create `src/data/series.ts`** — source of truth for series metadata

```ts
import type { SeriesId } from '~/content/config';

export interface SeriesMeta {
  id: SeriesId;
  label_en: string;
  label_zh: string;
  tagline_en: string;
  tagline_zh: string;
  epigraph_en: string;
  epigraph_zh: string;
  source: string;
}

export const SERIES_META: Record<SeriesId, SeriesMeta> = {
  'prometheus-fire': {
    id: 'prometheus-fire',
    label_en: "Prometheus' Fire",
    label_zh: '普罗米修斯之火',
    tagline_en: 'Audacity, stolen capability, the burn of power.',
    tagline_zh: '大胆、偷来的能力、权力灼手的温度。',
    epigraph_en: 'The fire that was stolen is still warm in our hands.',
    epigraph_zh: '被盗的火，至今仍在我们手中发烫。',
    source: 'After Aeschylus, Prometheus Bound',
  },
  'fausts-pact': {
    id: 'fausts-pact',
    label_en: "Faust's Pact",
    label_zh: '浮士德之契',
    tagline_en: 'Trade-offs, technical debt, the velocity-price.',
    tagline_zh: '权衡、技术债、速度的代价。',
    epigraph_en: 'Zwei Seelen wohnen, ach! in meiner Brust.',
    epigraph_zh: '两个灵魂啊，居于我胸中。',
    source: 'Goethe, Faust I',
  },
  'daedalus-labyrinth': {
    id: 'daedalus-labyrinth',
    label_en: "Daedalus' Labyrinth",
    label_zh: '代达罗斯之迷宫',
    tagline_en: 'Architecture, abstractions, remembered exits.',
    tagline_zh: '架构、抽象、记得来路。',
    epigraph_en: 'He who builds the maze must also remember the way out.',
    epigraph_zh: '造迷宫的人，也要记得来路。',
    source: 'After Ovid, Metamorphoses VIII',
  },
  'sisyphus-stone': {
    id: 'sisyphus-stone',
    label_en: "Sisyphus' Stone",
    label_zh: '西西弗斯之石',
    tagline_en: 'Refactoring, routine, the meditation of repetition.',
    tagline_zh: '重构、日常、重复的冥想。',
    epigraph_en: 'One must imagine Sisyphus happy.',
    epigraph_zh: '应当想象西西弗斯是幸福的。',
    source: 'Camus, Le Mythe de Sisyphe',
  },
  'orphic-descent': {
    id: 'orphic-descent',
    label_en: 'Orphic Descent',
    label_zh: '俄耳甫斯下降',
    tagline_en: 'Debugging, retrieval, the peril of looking back.',
    tagline_zh: '调试、追溯、回首的危险。',
    epigraph_en: 'Look not back, lest the truth dissolve.',
    epigraph_zh: '莫回首，否则真相消散。',
    source: 'After Rilke',
  },
};

export const SERIES_ORDER: SeriesId[] = [
  'prometheus-fire',
  'fausts-pact',
  'daedalus-labyrinth',
  'sisyphus-stone',
  'orphic-descent',
];
```

- [ ] **Step 2: Create `src/components/decor/OrnamentalDivider.astro`**

```astro
---
---
<div class="flex items-center justify-center gap-4 my-12 text-faint" aria-hidden="true">
  <span class="h-px w-16 bg-current opacity-50"></span>
  <svg width="56" height="10" viewBox="0 0 56 10" fill="none">
    <path d="M4 5 L8 1 L12 5 L8 9 Z" stroke="currentColor" stroke-width="0.8" />
    <path d="M24 5 L28 1 L32 5 L28 9 Z" stroke="currentColor" stroke-width="0.8" />
    <path d="M44 5 L48 1 L52 5 L48 9 Z" stroke="currentColor" stroke-width="0.8" />
  </svg>
  <span class="h-px w-16 bg-current opacity-50"></span>
</div>
```

- [ ] **Step 3: Create `src/components/decor/FlameIcon.astro`** — hero decor

```astro
---
interface Props {
  class?: string;
}
const { class: className = '' } = Astro.props;
---
<svg
  class={className}
  width="140"
  height="170"
  viewBox="0 0 140 170"
  fill="none"
  aria-hidden="true"
>
  <path
    d="M70 14c5 22-24 30-24 60 0 22 14 36 24 36s24-14 24-36c0-10-4-16-10-20 10 6 16 16 16 32 0 26-16 44-30 44s-30-18-30-44c0-26 26-36 30-72Z"
    stroke="var(--brand)"
    stroke-width="1.4"
    stroke-linejoin="round"
  />
  <circle cx="70" cy="148" r="4" stroke="var(--brand)" stroke-width="1.4" />
  <path d="M34 160h72" stroke="var(--brand)" stroke-width="1.4" stroke-linecap="round" opacity="0.6" />
  <g stroke="var(--text-faint)" stroke-width="0.8" opacity="0.55">
    <circle cx="24" cy="30" r="8" />
    <path d="M24 22v-6M24 38v6M16 30h-6M32 30h6M18 24l-4-4M30 24l4-4M18 36l-4 4M30 36l4 4" />
  </g>
</svg>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(ui): series registry + ornamental decor"
```

---

## Task 6: Theme toggle + Nav + Footer

**Files:**
- Create: `src/components/nav/ThemeToggle.astro`
- Create: `src/components/nav/Nav.astro`
- Create: `src/components/nav/Footer.astro`
- Modify: `src/layouts/BaseLayout.astro` (slot in Nav + Footer)

- [ ] **Step 1: Create `src/components/nav/ThemeToggle.astro`**

```astro
---
---
<button
  id="theme-toggle"
  type="button"
  aria-label="切换明暗主题"
  class="inline-flex items-center justify-center w-11 h-11 rounded-md text-muted hover:text-text hover:shadow-ring1 transition-[box-shadow,color] duration-200"
>
  <svg class="sun-icon w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
  <svg class="moon-icon w-5 h-5 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
</button>

<script is:inline>
  (function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var sun = btn.querySelector('.sun-icon');
    var moon = btn.querySelector('.moon-icon');
    function sync() {
      var theme = document.documentElement.getAttribute('data-theme') || 'light';
      if (theme === 'dark') {
        sun.classList.add('hidden');
        moon.classList.remove('hidden');
      } else {
        sun.classList.remove('hidden');
        moon.classList.add('hidden');
      }
    }
    sync();
    btn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (_) {}
      sync();
    });
  })();
</script>
```

- [ ] **Step 2: Create `src/components/nav/Nav.astro`**

```astro
---
import ThemeToggle from './ThemeToggle.astro';

const pathname = Astro.url.pathname;
const items = [
  { href: '/',         label_en: 'Prologue',    label_zh: '序章' },
  { href: '/blog/',    label_en: 'Chronicles',  label_zh: '编年' },
  { href: '/series/',  label_en: 'Series',      label_zh: '系列' },
  { href: '/fragments/', label_en: 'Fragments', label_zh: '碎片' },
  { href: '/about/',   label_en: 'About',       label_zh: '关于' },
];

function isActive(href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}
---
<header class="sticky top-0 z-40 backdrop-blur-sm bg-[color:var(--bg)]/85 border-b border-[color:var(--border)]">
  <div class="mx-auto max-w-layout px-5 md:px-8 h-16 flex items-center justify-between">
    <a href="/" class="font-serif text-xl tracking-tight text-text">CoderEden</a>

    <button
      id="nav-toggle"
      type="button"
      class="md:hidden inline-flex items-center justify-center w-11 h-11 text-muted"
      aria-label="导航"
      aria-controls="nav-menu"
      aria-expanded="false"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <path d="M3 6h16M3 11h16M3 16h16" />
      </svg>
    </button>

    <nav id="nav-menu" class="hidden md:flex items-center gap-8 text-[15px]">
      {items.map((item) => (
        <a
          href={item.href}
          class:list={[
            'transition-colors',
            isActive(item.href) ? 'text-text' : 'text-muted hover:text-text',
          ]}
        >
          <span class="font-serif italic mr-1">{item.label_en}</span>
          <span class="text-faint">· {item.label_zh}</span>
        </a>
      ))}
      <ThemeToggle />
    </nav>
  </div>

  <!-- Mobile drawer -->
  <div id="nav-drawer" class="md:hidden hidden border-t border-[color:var(--border)]">
    <nav class="mx-auto max-w-layout px-5 py-4 flex flex-col gap-4 text-[16px]">
      {items.map((item) => (
        <a
          href={item.href}
          class:list={['block', isActive(item.href) ? 'text-text' : 'text-muted']}
        >
          <span class="font-serif italic">{item.label_en}</span>
          <span class="text-faint"> · {item.label_zh}</span>
        </a>
      ))}
      <div class="pt-2"><ThemeToggle /></div>
    </nav>
  </div>
</header>

<script is:inline>
  (function () {
    var btn = document.getElementById('nav-toggle');
    var drawer = document.getElementById('nav-drawer');
    if (!btn || !drawer) return;
    btn.addEventListener('click', function () {
      var open = !drawer.classList.contains('hidden');
      if (open) {
        drawer.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  })();
</script>
```

- [ ] **Step 3: Create `src/components/nav/Footer.astro`**

```astro
---
const year = new Date().getFullYear();
---
<footer class="mt-24 border-t border-[color:var(--border)] bg-[color:var(--surface)]">
  <div class="mx-auto max-w-layout px-5 md:px-8 py-14 grid gap-10 md:grid-cols-3">
    <div>
      <p class="font-serif text-2xl text-text">CoderEden</p>
      <p class="mt-2 text-muted text-[15px] leading-relaxed">
        Notes from the workshop of a stolen fire.<br/>
        <span class="text-faint">偷火者工棚里的笔记。</span>
      </p>
    </div>
    <div>
      <p class="text-xs uppercase tracking-widest text-faint">Sitemap</p>
      <ul class="mt-3 space-y-2 text-[15px] text-muted">
        <li><a href="/blog/" class="hover:text-text">Chronicles · 编年</a></li>
        <li><a href="/series/" class="hover:text-text">Series · 系列</a></li>
        <li><a href="/fragments/" class="hover:text-text">Fragments · 碎片</a></li>
        <li><a href="/about/" class="hover:text-text">About · 关于</a></li>
        <li><a href="/rss.xml" class="hover:text-text">RSS</a></li>
      </ul>
    </div>
    <div>
      <p class="text-xs uppercase tracking-widest text-faint">Colophon</p>
      <p class="mt-3 text-[15px] text-muted leading-relaxed">
        Built with Astro · Fraunces · Inter · JetBrains Mono.
        <span class="text-faint">—— 以文火慢炖。</span>
      </p>
    </div>
  </div>
  <div class="border-t border-[color:var(--border)]">
    <div class="mx-auto max-w-layout px-5 md:px-8 py-6 text-[13px] text-faint flex flex-col md:flex-row justify-between gap-2">
      <span>© {year} CoderEden</span>
      <span class="italic">Wer immer strebend sich bemüht, den können wir erlösen.</span>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Modify `src/layouts/BaseLayout.astro` to render Nav and Footer**

Replace the `<body>` portion with:

```astro
  <body class="min-h-screen">
    <Nav />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
```

And at the top of the frontmatter, add:

```astro
import Nav from '~/components/nav/Nav.astro';
import Footer from '~/components/nav/Footer.astro';
```

Remove the unused `<slot name="header" />` and `<slot name="footer" />` lines.

- [ ] **Step 5: Verify in browser**

Run: `npm run dev`. Click the theme toggle — colors swap without flicker. Resize to <768px — hamburger appears, opens drawer.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(nav): theme toggle + header + footer"
```

---

## Task 7: EpigraphQuote + PostCard + SeriesCard components

**Files:**
- Create: `src/components/post/EpigraphQuote.astro`
- Create: `src/components/post/PostCard.astro`
- Create: `src/components/series/SeriesCard.astro`

- [ ] **Step 1: Create `src/components/post/EpigraphQuote.astro`**

```astro
---
interface Props {
  text_en: string;
  text_zh: string;
  source: string;
}
const { text_en, text_zh, source } = Astro.props;
---
<blockquote class="relative my-10 pl-6 border-l-2 border-[color:var(--brand)]">
  <p class="font-serif italic text-[19px] leading-[1.5] text-text">
    {text_en}
  </p>
  <p class="mt-2 font-serif italic text-[17px] leading-[1.6] text-muted">
    {text_zh}
  </p>
  <p class="mt-3 text-[11px] uppercase tracking-[0.12em] text-faint">
    — {source}
  </p>
</blockquote>
```

- [ ] **Step 2: Create `src/components/post/PostCard.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
import { SERIES_META } from '~/data/series';
import { readingTimeMinutes, readingTimeLabel } from '~/utils/reading-time';

interface Props {
  post: CollectionEntry<'posts'>;
  body: string;
}
const { post, body } = Astro.props;
const series = SERIES_META[post.data.series];
const minutes = readingTimeMinutes(body);
const dateLabel = post.data.date.toLocaleDateString('zh-CN', {
  year: 'numeric', month: 'short', day: 'numeric',
});
---
<a
  href={`/blog/${post.slug}/`}
  class="group block rounded-md bg-[color:var(--surface)] border border-[color:var(--border)] p-6 md:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-ring1"
>
  <div class="flex items-center gap-3 text-[11px] uppercase tracking-[0.12em]">
    <span class="text-[color:var(--brand)] font-medium">{series.label_en}</span>
    <span class="text-faint">·</span>
    <span class="text-faint">{dateLabel}</span>
    <span class="text-faint">·</span>
    <span class="text-faint">{readingTimeLabel(minutes)}</span>
  </div>
  <h3 class="mt-3 font-serif text-[26px] leading-[1.2] text-text group-hover:text-[color:var(--brand)] transition-colors">
    {post.data.title}
  </h3>
  {post.data.title_en && (
    <p class="mt-1 font-serif italic text-[15px] text-muted">{post.data.title_en}</p>
  )}
  <p class="mt-3 text-[15px] leading-[1.7] text-muted line-clamp-3">
    {post.data.description}
  </p>
  {post.data.tags.length > 0 && (
    <div class="mt-4 flex flex-wrap gap-2">
      {post.data.tags.map((t) => (
        <span class="text-[11px] uppercase tracking-[0.08em] text-faint">#{t}</span>
      ))}
    </div>
  )}
</a>
```

`line-clamp-3` is supported natively in Tailwind 3.3+ (this plan uses `tailwindcss@^3` ≥ 3.4), so no plugin install is needed.

- [ ] **Step 3: Create `src/components/series/SeriesCard.astro`**

```astro
---
import type { SeriesMeta } from '~/data/series';

interface Props {
  meta: SeriesMeta;
  count?: number;
}
const { meta, count } = Astro.props;
---
<a
  href={`/series/${meta.id}/`}
  class="group block rounded-lg bg-[color:var(--surface)] border border-[color:var(--border)] p-7 transition-all duration-200 hover:shadow-ring1"
>
  <div class="flex items-baseline justify-between">
    <h3 class="font-serif text-[28px] leading-[1.15] text-text group-hover:text-[color:var(--brand)] transition-colors">
      {meta.label_en}
    </h3>
    {count !== undefined && (
      <span class="text-[11px] uppercase tracking-[0.12em] text-faint">{count} · 篇</span>
    )}
  </div>
  <p class="mt-1 font-serif italic text-[16px] text-muted">{meta.label_zh}</p>
  <p class="mt-5 text-[15px] leading-[1.7] text-muted">{meta.tagline_zh}</p>
  <p class="mt-5 font-serif italic text-[15px] text-[color:var(--brand-soft)]">
    “{meta.epigraph_en}”
  </p>
</a>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS (components unused — that's fine).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(ui): epigraph + post card + series card"
```

---

## Task 8: Write six demo posts

**Files:**
- Create: `src/content/posts/prometheus-stolen-fire.mdx`
- Create: `src/content/posts/faust-any-pact.mdx`
- Create: `src/content/posts/daedalus-microservice.mdx`
- Create: `src/content/posts/sisyphus-rebase.mdx`
- Create: `src/content/posts/orphic-core-dump.mdx`
- Create: `src/content/posts/walpurgisnacht-git-blame.mdx`

**Format for every file:**

Frontmatter fields: `title`, `title_en`, `description`, `epigraph {text_en, text_zh, source}`, `series`, `tags`, `date`, (optional `draft`).

Each post: ~600–1200 characters of Chinese body with 2–4 `##` headings, 1 code block where relevant, 1 pull quote or `>` blockquote mid-article.

- [ ] **Step 1: Write `prometheus-stolen-fire.mdx`**

```mdx
---
title: "偷来的火也要有人看管"
title_en: "Keeper of the Stolen Fire"
description: "AI 协作工具普及之后，生产力的火种烫在谁的手上？一次对自己的发问。"
epigraph:
  text_en: "Prometheus, bringer of fire, who first gave it to mortals — what was his second gift?"
  text_zh: "普罗米修斯把火带给凡人之后，第二样礼物是什么？"
  source: "After Aeschylus, Prometheus Bound"
series: "prometheus-fire"
tags: ["engineering-culture", "tooling", "ai"]
date: 2026-03-28
---

## 一、被盗的不是火，是责任

我用 AI 助手写下一段代码时，那一刻的体感接近偷窃：它替我生成了五十行我不愿亲手敲完的样板。我按下 Tab，五十行接收——像火苗落在凡人的掌心。

> 火一旦被偷走，看守者的席位就空出来了。

偷火这件事在神话里不是终点。真正决定命运的是：偷来之后，谁来看守？谁来确保火不烧了村子？

## 二、守护者的工作清单

- **Review 不是 Review**：不是看语法，是问"这段代码回答了谁的问题"。
- **测试不是验证**：是给后来的人留下一枚"此处确曾燃烧过"的火种标记。
- **命名不是命名**：是替火取一个不让下一个人误以为是灰烬的名字。

```ts
// 这段是 AI 给的。我问自己：我真的懂它为何不用 Promise.allSettled 吗？
const results = await Promise.all(tasks.map((t) => t.run()));
```

我删掉这行，换成自己写的五行——慢了，但我成了火的看守者而不只是携带者。

## 三、凡人学会与火共处，需要第二种勇气

第一种勇气让我们接过火。第二种勇气让我们在它灼手的时候仍旧不松开。我越发觉得，后一种才是工程师与 AI 协作时真正稀缺的品质。
```

- [ ] **Step 2: Write `faust-any-pact.mdx`**

```mdx
---
title: "我与 any 的契约"
title_en: "My Pact with `any`"
description: "TypeScript 里最甜美的魔鬼交易：只需一个 any，你可以今晚就下班。"
epigraph:
  text_en: "Werd' ich zum Augenblicke sagen: Verweile doch! du bist so schön!"
  text_zh: "若我向瞬间呼唤：停一停吧！你真美！"
  source: "Goethe, Faust I"
series: "fausts-pact"
tags: ["typescript", "tech-debt"]
date: 2026-04-05
---

## 一、Mephistopheles 的 compile-time

昨夜我写下：

```ts
function dispatch(payload: any) {
  handlers[payload.type](payload.value);
}
```

键盘上响起的不是错误红线，是一段低沉的德语。那是 Mephistopheles 的声音，他说：**"现在就下班。"**

我下班了。代码跑得好好的。直到三周后——

## 二、付账的那一页

线上告警。`payload.value` 实际上是字符串。`handlers[payload.type]` 不存在。栈底有一行再熟悉不过的日志：`cannot read properties of undefined`。

> 魔鬼从不在签约当夜讨债。他等你忘了合同在哪一页。

## 三、赎回

我写了一个类型收窄的 dispatcher：

```ts
type Events =
  | { type: 'click'; value: { x: number; y: number } }
  | { type: 'submit'; value: string };

function dispatch(event: Events) {
  switch (event.type) {
    case 'click': return handlers.click(event.value);
    case 'submit': return handlers.submit(event.value);
  }
}
```

它让我今晚多下班了半小时。但下次我再写 `any`，我会听见德语诗句——那是我自己写给自己的契约副本。
```

- [ ] **Step 3: Write `daedalus-microservice.mdx`**

```mdx
---
title: "微服务迷宫的入口必须比出口醒目"
title_en: "Make the Entrance Brighter Than the Exit"
description: "代达罗斯造迷宫时记得了线团，但我们造服务网时，常常把监控藏在最深处。"
epigraph:
  text_en: "Ingenium, ait, inclusit. — He shut his genius inside."
  text_zh: "他把自己的天才关了进去。"
  source: "Ovid, Metamorphoses VIII"
series: "daedalus-labyrinth"
tags: ["architecture", "microservices", "observability"]
date: 2026-04-10
---

## 一、我们都造过迷宫

第一年我造了一个 7 服务的小世界。第二年变成 23 个。第三年我在自己的代码库里迷路了。

代达罗斯造迷宫之前，会先给忒修斯一个线团。我们呢？通常先写 Dockerfile。

## 二、线团是什么？

- **一个可以 grep 到全链路的 trace-id**
- **一张不需要登录三个系统就能看见的调用图**
- **一段让新人第一天能跑起来的 `make dev`**

没有这三样，你造的不是架构，是给同事的惩罚。

> 迷宫的精妙与否，不看它多弯，看它能不能让人走得出来。

## 三、入口要比出口亮

新人看到仓库的第一眼，是 README 还是 200 个 YAML？

我现在的习惯：**README 第一屏必须能启动，第二屏必须能调试**。理由很简单——忒修斯下到迷宫，是靠他从入口带下去的那根线。不是靠他在迷宫中央灵光一现。
```

- [ ] **Step 4: Write `sisyphus-rebase.mdx`**

```mdx
---
title: "每天推一次主分支，如同推石上山"
title_en: "Pushing main, pushing the stone"
description: "rebase、解冲突、重推——如果这就是日常，它值得被当成一种冥想。"
epigraph:
  text_en: "The struggle itself toward the heights is enough to fill a man's heart."
  text_zh: "向高处的奋斗本身，足以填满一颗人心。"
  source: "Camus, Le Mythe de Sisyphe"
series: "sisyphus-stone"
tags: ["git", "workflow", "mindfulness"]
date: 2026-04-14
---

## 一、每日早晨的仪式

```bash
git fetch origin
git rebase origin/main
# conflict.
git mergetool
git rebase --continue
git push --force-with-lease
```

四年前我为这套流程愤怒。三年前习惯。两年前麻木。今年——我终于学会了把它读作一种冥想。

## 二、石头是一种同伴

Camus 的西西弗斯不是苦役者，是"带着石头的人"。他每天推，不是因为命令，是因为那已经是他与世界之间最确定的一件事。

工程师与他的 main 分支之间，其实也是这样一层关系。

> 我开始相信：rebase 是一种最小单位的忠诚。

## 三、下山的那几秒钟

Camus 最重要的观察不是登顶，是下山。西西弗斯走下山去再推那块石头时，他是自由的——因为他知道自己在做什么。

`--force-with-lease` 之后的几秒钟，我看着 CI 亮起，是我一天里最接近这种自由的时刻。
```

- [ ] **Step 5: Write `orphic-core-dump.mdx`**

```mdx
---
title: "向 core dump 里下降时，请不要回头"
title_en: "Do Not Look Back, Going Down"
description: "一次 memory corruption 的调试笔记。对话体复盘，以及俄耳甫斯教我的事。"
epigraph:
  text_en: "Sie war schon Wurzel. / She was already root."
  text_zh: "她已成根。"
  source: "Rilke, Orpheus. Eurydike. Hermes."
series: "orphic-descent"
tags: ["debugging", "postmortem", "c++"]
date: 2026-04-17
---

## 一、下降

周四 23:41，告警从 pager 进来：一个服务的 tail latency 掉到地底。我点开 grafana，像俄耳甫斯提起里拉琴——向下走。

```
#0  memcpy (dest=0x0, src=0x7fabc0..., n=4096)
#1  serialize_frame (f=<optimized out>) at frame.cc:87
#2  0x00007f... in std::thread::_Invoker<...>::operator()()
```

`dest=0x0`——这不是 bug，这是一句谶语。

## 二、回头的诱惑

> 每个 debugger 都知道一个秘密：往上翻两帧就能看见出事的地方。但 Rilke 告诉你——别回头。

第一次我翻到 frame 2，看到一个自信的断言 `assert(state == READY)`。我以为自己找到了。我 merge 了修复——状态机加了一把锁。

她还是死在根里。

## 三、第二次下降

这一次我没有往上翻。我继续下降到 frame 0——memcpy 本身。我在它前一行读 dest 的来源：

```cpp
auto* dest = pool.acquire(size);   // returns nullptr when exhausted
memcpy(dest, src, size);           // 我从未检查
```

池空了。我只是没看。

俄耳甫斯回头，因为他不信任死者会跟上。我回头，因为我不信任机器会告诉我真相。两种不信任，代价一样。

## 四、尾声

修复只有一行——`if (!dest) throw PoolExhausted{};`。但我把这一次事故的日期刻在墙上了。
```

- [ ] **Step 6: Write `walpurgisnacht-git-blame.mdx`**

```mdx
---
title: "凌晨三点的 git blame"
title_en: "Walpurgisnacht at git blame"
description: "散文。一段恶意优化代码的作者，是三年前的我。"
epigraph:
  text_en: "Die Lüfte rauschen, die Wälder brausen."
  text_zh: "风在长啸，林在喧响。"
  source: "Goethe, Faust II — Walpurgisnacht auf dem Brocken"
series: "fausts-pact"
tags: ["essay", "late-night", "git"]
date: 2026-04-20
---

## 一、山顶之夜

凌晨三点。Bug 在一段我看不懂的 bit-twiddling 里。我 `git blame`：

```
^7b2af1c (CoderEden 2023-05-11 02:47)  // trust me future self
```

信我，未来的我。

落款者是我自己。那夜我做过什么样的交易？

## 二、魔鬼夜宴

Walpurgisnacht 是女巫的盛会，浮士德在布罗肯山顶看见一切混乱的幻影。三年前的那个夜里，我大概也是那种混乱的一员——我拒绝写注释，我让未来的自己去猜。我甚至在提交信息里写了"trust me"。

> 那一刻我相信未来的我智商比现在高两倍。事实证明，只是睡得比现在少两倍。

## 三、破晓

我在那段 bit-twiddling 旁边补上 40 行注释、写了一个单元测试、一次 safe rewrite。提交信息这次是：**"for the next 3AM."**

给下一个在布罗肯山上醒着的人——不管他是不是我自己。
```

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: PASS. Astro shows "Processing 6 entries in 'posts' collection".

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "content: six demo posts across five series"
```

---

## Task 9: Write fragments

**Files:**
- Create: `src/content/fragments/01-stolen-fire.md` (through `10-…`)

- [ ] **Step 1: Create each fragment file**

Create `src/content/fragments/01-stolen-fire.md`:
```md
---
text_zh: "被盗的火，至今仍在我们手中发烫。"
text_en: "The fire that was stolen is still warm in our hands."
author: "CoderEden"
date: 2026-03-28
---
```

Create `src/content/fragments/02-two-souls.md`:
```md
---
text_zh: "两个灵魂啊，居于我胸中：一个写代码，一个看着它。"
text_en: "Two souls dwell in my chest: one writing, one watching."
author: "CoderEden, after Goethe"
date: 2026-04-01
---
```

Create `src/content/fragments/03-labyrinth.md`:
```md
---
text_zh: "造迷宫的人，也要记得来路。"
text_en: "He who builds the maze must also remember the way out."
author: "CoderEden"
date: 2026-04-03
---
```

Create `src/content/fragments/04-sisyphus.md`:
```md
---
text_zh: "每一次 rebase 都是一次最小单位的忠诚。"
text_en: "Every rebase is a smallest unit of loyalty."
author: "CoderEden"
date: 2026-04-14
---
```

Create `src/content/fragments/05-orpheus.md`:
```md
---
text_zh: "莫回首，否则真相消散。"
text_en: "Look not back, lest the truth dissolve."
author: "CoderEden"
date: 2026-04-17
---
```

Create `src/content/fragments/06-any.md`:
```md
---
text_zh: "`any` 是最甜美的魔鬼交易——它在签约当夜从不讨账。"
text_en: "`any` is the sweetest pact — never billed on signing night."
author: "CoderEden"
date: 2026-04-05
---
```

Create `src/content/fragments/07-readme.md`:
```md
---
text_zh: "README 的第一屏必须能启动，第二屏必须能调试。"
text_en: "First screen: it runs. Second: it debugs."
author: "CoderEden"
date: 2026-04-10
---
```

Create `src/content/fragments/08-trust-me.md`:
```md
---
text_zh: "提交信息里写 trust me 的，都是在向未来的自己借高利贷。"
text_en: "'Trust me' in a commit is a loan from your future self at usury."
author: "CoderEden"
date: 2026-04-20
---
```

Create `src/content/fragments/09-camus.md`:
```md
---
text_zh: "应当想象西西弗斯是幸福的。"
text_en: "One must imagine Sisyphus happy."
author: "— Camus"
date: 2026-04-14
---
```

Create `src/content/fragments/10-goethe.md`:
```md
---
text_zh: "奋然不已者，我们可以拯救。"
text_en: "Wer immer strebend sich bemüht, den können wir erlösen."
author: "— Goethe, Faust II"
date: 2026-04-21
---
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS, "Processing 10 entries in 'fragments' collection".

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "content: ten initial fragments"
```

---

## Task 10: Homepage (/)

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/home/Hero.astro`

- [ ] **Step 1: Create `src/components/home/Hero.astro`**

```astro
---
import FlameIcon from '~/components/decor/FlameIcon.astro';
---
<section class="relative mx-auto max-w-layout px-5 md:px-8 pt-20 md:pt-32 pb-16 md:pb-24">
  <div class="grid md:grid-cols-[1fr_auto] gap-12 items-end">
    <div>
      <p class="text-[11px] uppercase tracking-[0.28em] text-[color:var(--brand)]">Prologue · 序章</p>
      <h1 class="mt-5 font-serif text-[44px] sm:text-[56px] md:text-[72px] leading-[1.04] tracking-tight text-text">
        notes from the workshop<br/>of a <span class="italic">stolen fire</span>.
      </h1>
      <p class="mt-6 max-w-[52ch] font-serif text-[20px] leading-[1.55] text-muted">
        我是 CoderEden。在这里我写代码，也记下偷火时手心的温度——
        把工程、神话与浮士德放在同一张案几上。
      </p>
      <p class="mt-3 max-w-[52ch] text-[15px] leading-[1.7] text-faint italic">
        An engineer's notebook in which Greek demigods and Goethe occasionally visit.
      </p>
      <div class="mt-10 flex flex-wrap gap-3">
        <a href="/blog/" class="inline-flex items-center rounded-md bg-[color:var(--brand)] text-[#faf9f5] px-5 h-11 text-[15px] font-medium hover:opacity-95">
          Read the chronicles ↗
        </a>
        <a href="/series/" class="inline-flex items-center rounded-md bg-[color:var(--surface-2)] text-[color:var(--text)] px-5 h-11 text-[15px] font-medium hover:shadow-ring1">
          Enter a series
        </a>
      </div>
    </div>
    <div class="hidden md:block">
      <FlameIcon />
    </div>
  </div>
</section>
```

- [ ] **Step 2: Rewrite `src/pages/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '~/layouts/BaseLayout.astro';
import Hero from '~/components/home/Hero.astro';
import SeriesCard from '~/components/series/SeriesCard.astro';
import PostCard from '~/components/post/PostCard.astro';
import OrnamentalDivider from '~/components/decor/OrnamentalDivider.astro';
import { SERIES_META, SERIES_ORDER } from '~/data/series';

const posts = (await getCollection('posts', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const recent = posts.slice(0, 3);

const countsBySeries = Object.fromEntries(
  SERIES_ORDER.map((id) => [id, posts.filter((p) => p.data.series === id).length])
);

const fragments = (await getCollection('fragments'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);
---
<BaseLayout title="Prologue">
  <Hero />

  <section class="mx-auto max-w-layout px-5 md:px-8 py-16">
    <div class="flex items-baseline justify-between">
      <h2 class="font-serif text-[32px] md:text-[40px] text-text">Series · 系列</h2>
      <a href="/series/" class="text-[14px] text-muted hover:text-text">all →</a>
    </div>
    <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {SERIES_ORDER.map((id) => (
        <SeriesCard meta={SERIES_META[id]} count={countsBySeries[id]} />
      ))}
    </div>
  </section>

  <OrnamentalDivider />

  <section class="mx-auto max-w-layout px-5 md:px-8 py-8">
    <div class="flex items-baseline justify-between">
      <h2 class="font-serif text-[32px] md:text-[40px] text-text">Recent · 近作</h2>
      <a href="/blog/" class="text-[14px] text-muted hover:text-text">all chronicles →</a>
    </div>
    <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {recent.map((p) => <PostCard post={p} body={p.body} />)}
    </div>
  </section>

  <OrnamentalDivider />

  <section class="mx-auto max-w-layout px-5 md:px-8 py-8 pb-24">
    <div class="flex items-baseline justify-between">
      <h2 class="font-serif text-[32px] md:text-[40px] text-text">Fragments · 碎片</h2>
      <a href="/fragments/" class="text-[14px] text-muted hover:text-text">all →</a>
    </div>
    <div class="mt-8 grid gap-5 md:grid-cols-3">
      {fragments.map((f) => (
        <figure class="rounded-md bg-[color:var(--surface)] border border-[color:var(--border)] p-6">
          <blockquote class="font-serif italic text-[17px] leading-[1.55] text-text">
            “{f.data.text_zh}”
          </blockquote>
          {f.data.text_en && (
            <p class="mt-2 font-serif italic text-[14px] text-muted">{f.data.text_en}</p>
          )}
          <figcaption class="mt-4 text-[11px] uppercase tracking-[0.12em] text-faint">— {f.data.author}</figcaption>
        </figure>
      ))}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Verify**

Run: `npm run dev`. Visit `/`. Confirm hero renders, 5 series cards + fragments cell, 3 recent posts, 3 fragments.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(home): hero + series grid + recent + fragments"
```

---

## Task 11: Blog list page (/blog)

**Files:**
- Create: `src/pages/blog/index.astro`

- [ ] **Step 1: Create `src/pages/blog/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '~/layouts/BaseLayout.astro';
import PostCard from '~/components/post/PostCard.astro';

const posts = (await getCollection('posts', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

// Group by year
const byYear = new Map<number, typeof posts>();
for (const p of posts) {
  const y = p.data.date.getFullYear();
  if (!byYear.has(y)) byYear.set(y, []);
  byYear.get(y)!.push(p);
}
const years = [...byYear.keys()].sort((a, b) => b - a);

const allTags = [...new Set(posts.flatMap((p) => p.data.tags))].sort();
---
<BaseLayout title="Chronicles" description="CoderEden 的编年文章。">
  <section class="mx-auto max-w-layout px-5 md:px-8 pt-16 pb-10">
    <p class="text-[11px] uppercase tracking-[0.28em] text-[color:var(--brand)]">Chronicles</p>
    <h1 class="mt-4 font-serif text-[48px] md:text-[60px] leading-[1.08] text-text">编年 · 依时间而下</h1>
    <p class="mt-4 max-w-[56ch] text-[17px] leading-[1.75] text-muted">
      按年份倒序排列。每一篇是某一夜的火种、一次下降、或一次与自己的契约。
    </p>
  </section>

  <section class="mx-auto max-w-layout px-5 md:px-8 pb-6">
    <p class="text-[11px] uppercase tracking-[0.12em] text-faint mb-3">Tags · 标签</p>
    <div class="flex flex-wrap gap-2">
      {allTags.map((t) => (
        <a href={`/tags/${t}/`} class="text-[12px] rounded-full border border-[color:var(--border-strong)] px-3 h-7 inline-flex items-center text-muted hover:text-text hover:shadow-ring1">
          #{t}
        </a>
      ))}
    </div>
  </section>

  <section class="mx-auto max-w-layout px-5 md:px-8 pb-24">
    {years.map((year) => (
      <div class="mt-12">
        <h2 class="font-serif text-[28px] text-text">{year}</h2>
        <div class="mt-6 grid gap-5 md:grid-cols-2">
          {byYear.get(year)!.map((p) => <PostCard post={p} body={p.body} />)}
        </div>
      </div>
    ))}
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verify**

Run: `npm run dev`. Visit `/blog/`. Confirm all 6 posts appear under 2026, tags chips render above.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(blog): chronicles list page"
```

---

## Task 12: PostLayout + blog detail + TOC + progress + code copy

**Files:**
- Create: `src/layouts/PostLayout.astro`
- Create: `src/pages/blog/[slug].astro`
- Create: `src/components/post/PostToc.astro`
- Create: `src/components/post/ReadingProgress.astro`
- Create: `src/scripts/post-enhancements.ts`

- [ ] **Step 1: Create `src/components/post/ReadingProgress.astro`**

```astro
---
---
<div id="reading-progress" class="fixed top-0 left-0 h-[2px] bg-[color:var(--brand)] z-50 transition-[width] duration-75" style="width:0"></div>
```

- [ ] **Step 2: Create `src/components/post/PostToc.astro`**

```astro
---
interface Heading { depth: number; slug: string; text: string; }
interface Props { headings: Heading[]; }
const { headings } = Astro.props;
const filtered = headings.filter((h) => h.depth === 2 || h.depth === 3);
---
{filtered.length > 0 && (
  <nav aria-label="目录" class="post-toc">
    <p class="text-[11px] uppercase tracking-[0.12em] text-faint mb-3">Contents · 目录</p>
    <ul class="space-y-2 text-[14px] leading-[1.6]">
      {filtered.map((h) => (
        <li class:list={[h.depth === 3 ? 'pl-4' : '']}>
          <a
            href={`#${h.slug}`}
            data-toc-link={h.slug}
            class="text-muted hover:text-text transition-colors"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)}
```

- [ ] **Step 3: Create `src/scripts/post-enhancements.ts`** — client logic

```ts
// Reading progress + TOC scroll-spy + code copy buttons.
function initProgress() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

function initToc() {
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]');
  if (!links.length) return;
  const linkBySlug = new Map<string, HTMLAnchorElement>();
  links.forEach((l) => linkBySlug.set(l.dataset.tocLink!, l));
  const headings = [...document.querySelectorAll<HTMLElement>('article h2, article h3')].filter(
    (h) => h.id && linkBySlug.has(h.id)
  );
  if (!headings.length) return;

  const mark = (slug: string) => {
    links.forEach((l) => {
      l.classList.toggle('text-[color:var(--brand)]', l.dataset.tocLink === slug);
      l.classList.toggle('font-medium', l.dataset.tocLink === slug);
    });
  };

  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) mark(visible.target.id);
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: [0, 1] }
  );
  headings.forEach((h) => obs.observe(h));
}

function initCopyButtons() {
  document.querySelectorAll<HTMLElement>('article pre').forEach((pre) => {
    if (pre.querySelector('[data-copy]')) return;
    pre.style.position = 'relative';
    const btn = document.createElement('button');
    btn.setAttribute('data-copy', '');
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.className =
      'absolute top-3 right-3 text-[11px] uppercase tracking-[0.12em] px-2 py-1 rounded-sm bg-[color:var(--surface-2)] text-muted hover:text-text';
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code.innerText);
        btn.textContent = 'Copied';
        setTimeout(() => (btn.textContent = 'Copy'), 1600);
      } catch {
        btn.textContent = 'Failed';
        setTimeout(() => (btn.textContent = 'Copy'), 1600);
      }
    });
    pre.appendChild(btn);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initProgress();
  initToc();
  initCopyButtons();
});
```

- [ ] **Step 4: Create `src/layouts/PostLayout.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
import BaseLayout from './BaseLayout.astro';
import EpigraphQuote from '~/components/post/EpigraphQuote.astro';
import ReadingProgress from '~/components/post/ReadingProgress.astro';
import PostToc from '~/components/post/PostToc.astro';
import OrnamentalDivider from '~/components/decor/OrnamentalDivider.astro';
import { SERIES_META } from '~/data/series';
import { readingTimeMinutes, readingTimeLabel } from '~/utils/reading-time';

interface Props {
  post: CollectionEntry<'posts'>;
  headings: { depth: number; slug: string; text: string }[];
}
const { post, headings } = Astro.props;
const series = SERIES_META[post.data.series];
const minutes = readingTimeMinutes(post.body);
const dateLabel = post.data.date.toLocaleDateString('zh-CN', {
  year: 'numeric', month: 'long', day: 'numeric',
});
---
<BaseLayout title={post.data.title} description={post.data.description}>
  <ReadingProgress />
  <article class="mx-auto max-w-layout px-5 md:px-8 pt-14 pb-24">
    <a href={`/series/${series.id}/`} class="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--brand)] hover:opacity-80">
      <span class="inline-block w-6 h-px bg-current"></span>
      {series.label_en} · {series.label_zh}
    </a>

    <h1 class="mt-5 font-serif text-[36px] sm:text-[44px] md:text-[56px] leading-[1.1] text-text">
      {post.data.title}
    </h1>
    {post.data.title_en && (
      <p class="mt-3 font-serif italic text-[18px] text-muted">{post.data.title_en}</p>
    )}
    <p class="mt-5 text-[13px] text-faint uppercase tracking-[0.12em]">
      {dateLabel} · {readingTimeLabel(minutes)}
    </p>

    {post.data.epigraph && (
      <EpigraphQuote
        text_en={post.data.epigraph.text_en}
        text_zh={post.data.epigraph.text_zh}
        source={post.data.epigraph.source}
      />
    )}

    <div class="grid lg:grid-cols-[minmax(0,1fr)_220px] gap-12 mt-10">
      <div class="post-body font-serif text-[17px] leading-[1.85] text-text">
        <slot />
      </div>
      <aside class="hidden lg:block">
        <div class="sticky top-[100px]">
          <PostToc headings={headings} />
        </div>
      </aside>
    </div>

    <OrnamentalDivider />

    <p class="text-center text-[13px] italic text-faint">
      {series.epigraph_en} <br/>
      <span class="not-italic">{series.epigraph_zh}</span>
    </p>
  </article>

  <script>
    import '~/scripts/post-enhancements';
  </script>
</BaseLayout>

<style is:global>
  .post-body h2 {
    font-family: var(--font-serif);
    font-size: 28px;
    line-height: 1.25;
    margin: 2.4em 0 0.6em;
    color: var(--text);
    scroll-margin-top: 96px;
  }
  .post-body h3 {
    font-family: var(--font-serif);
    font-size: 22px;
    line-height: 1.3;
    margin: 2em 0 0.4em;
    color: var(--text);
    scroll-margin-top: 96px;
  }
  .post-body p { margin: 1em 0; }
  .post-body a { color: var(--brand); text-decoration: underline; text-underline-offset: 3px; }
  .post-body blockquote {
    border-left: 2px solid var(--brand);
    padding-left: 1rem;
    font-style: italic;
    color: var(--text-muted);
    margin: 1.6em 0;
  }
  .post-body ul, .post-body ol { padding-left: 1.4rem; margin: 1em 0; }
  .post-body li { margin: 0.3em 0; }
  .post-body pre {
    font-family: var(--font-mono);
    font-size: 14.5px;
    line-height: 1.6;
    background: var(--surface-2);
    border-radius: 16px;
    padding: 1.1em 1.25em;
    overflow-x: auto;
    margin: 1.6em 0;
  }
  .post-body code:not(pre code) {
    font-family: var(--font-mono);
    font-size: 0.92em;
    padding: 0.1em 0.4em;
    background: var(--surface);
    border: 1px solid var(--border-strong);
    border-radius: 6px;
  }
</style>
```

- [ ] **Step 5: Create `src/pages/blog/[slug].astro`**

```astro
---
import { getCollection, type CollectionEntry } from 'astro:content';
import PostLayout from '~/layouts/PostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

interface Props { post: CollectionEntry<'posts'>; }
const { post } = Astro.props;
const { Content, headings } = await post.render();
---
<PostLayout post={post} headings={headings}>
  <Content />
</PostLayout>
```

- [ ] **Step 6: Verify**

Run: `npm run dev`. Visit `/blog/prometheus-stolen-fire/`. Confirm:
- Epigraph renders with left bar
- Body serif, lh generous
- Desktop shows sticky right TOC
- Scrolling highlights current h2 in TOC and fills progress bar
- Each `<pre>` gets a "Copy" button

Run: `npm run build`
Expected: PASS, 6 post pages generated.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(post): post layout + TOC + progress + code copy"
```

---

## Task 13: Series index + series detail

**Files:**
- Create: `src/pages/series/index.astro`
- Create: `src/pages/series/[series].astro`

- [ ] **Step 1: Create `src/pages/series/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '~/layouts/BaseLayout.astro';
import SeriesCard from '~/components/series/SeriesCard.astro';
import { SERIES_META, SERIES_ORDER } from '~/data/series';

const posts = await getCollection('posts', ({ data }) => !data.draft);
const counts = Object.fromEntries(
  SERIES_ORDER.map((id) => [id, posts.filter((p) => p.data.series === id).length])
);
---
<BaseLayout title="Series" description="五大系列，五种降临。">
  <section class="mx-auto max-w-layout px-5 md:px-8 pt-16 pb-10">
    <p class="text-[11px] uppercase tracking-[0.28em] text-[color:var(--brand)]">Series</p>
    <h1 class="mt-4 font-serif text-[48px] md:text-[60px] leading-[1.08] text-text">系列 · 五种降临</h1>
    <p class="mt-4 max-w-[56ch] text-[17px] leading-[1.75] text-muted">
      每个系列借来一位人物——半神、造匠、偷火者或魔鬼——作为那一组文章的引力中心。
    </p>
  </section>

  <section class="mx-auto max-w-layout px-5 md:px-8 pb-24 grid gap-6 md:grid-cols-2">
    {SERIES_ORDER.map((id) => (
      <SeriesCard meta={SERIES_META[id]} count={counts[id]} />
    ))}
  </section>
</BaseLayout>
```

- [ ] **Step 2: Create `src/pages/series/[series].astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '~/layouts/BaseLayout.astro';
import PostCard from '~/components/post/PostCard.astro';
import EpigraphQuote from '~/components/post/EpigraphQuote.astro';
import { SERIES_META, SERIES_ORDER } from '~/data/series';
import type { SeriesId } from '~/content/config';

export async function getStaticPaths() {
  return SERIES_ORDER.map((id) => ({ params: { series: id } }));
}

const { series } = Astro.params as { series: SeriesId };
const meta = SERIES_META[series];
const posts = (await getCollection('posts', ({ data }) => !data.draft && data.series === series))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<BaseLayout title={meta.label_en} description={meta.tagline_zh}>
  <section class="mx-auto max-w-layout px-5 md:px-8 pt-16 pb-8">
    <p class="text-[11px] uppercase tracking-[0.28em] text-[color:var(--brand)]">Series · 系列</p>
    <h1 class="mt-4 font-serif text-[48px] md:text-[64px] leading-[1.08] text-text">{meta.label_en}</h1>
    <p class="mt-2 font-serif italic text-[22px] text-muted">{meta.label_zh}</p>

    <div class="mt-8">
      <EpigraphQuote text_en={meta.epigraph_en} text_zh={meta.epigraph_zh} source={meta.source} />
    </div>
  </section>

  <section class="mx-auto max-w-layout px-5 md:px-8 pb-24">
    {posts.length === 0 ? (
      <p class="text-muted italic">（该系列暂无文章。）</p>
    ) : (
      <div class="grid gap-5 md:grid-cols-2">
        {posts.map((p) => <PostCard post={p} body={p.body} />)}
      </div>
    )}
  </section>
</BaseLayout>
```

- [ ] **Step 3: Verify**

Run: `npm run build`. Visit `/series/` and `/series/fausts-pact/`. Confirm fausts-pact shows 2 posts (any-pact + walpurgisnacht).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(series): series index + detail pages"
```

---

## Task 14: Fragments page

**Files:**
- Create: `src/pages/fragments/index.astro`

- [ ] **Step 1: Create `src/pages/fragments/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '~/layouts/BaseLayout.astro';

const fragments = (await getCollection('fragments'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<BaseLayout title="Fragments" description="思想碎片、读书札记、格言。">
  <section class="mx-auto max-w-layout px-5 md:px-8 pt-16 pb-10">
    <p class="text-[11px] uppercase tracking-[0.28em] text-[color:var(--brand)]">Fragments</p>
    <h1 class="mt-4 font-serif text-[48px] md:text-[60px] leading-[1.08] text-text">碎片 · 未成文</h1>
    <p class="mt-4 max-w-[56ch] text-[17px] leading-[1.75] text-muted">
      未成章的句子、读书的折角、深夜的笔记——以短句保存下来。
    </p>
  </section>

  <section class="mx-auto max-w-layout px-5 md:px-8 pb-24">
    <div class="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
      {fragments.map((f) => (
        <figure class="break-inside-avoid mb-5 rounded-md bg-[color:var(--surface)] border border-[color:var(--border)] p-6">
          <blockquote class="font-serif italic text-[18px] leading-[1.55] text-text">“{f.data.text_zh}”</blockquote>
          {f.data.text_en && (
            <p class="mt-2 font-serif italic text-[14px] text-muted">{f.data.text_en}</p>
          )}
          <figcaption class="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-faint">
            <span>— {f.data.author}</span>
            <time>{f.data.date.toLocaleDateString('zh-CN', { year:'numeric', month:'short', day:'numeric' })}</time>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verify**

Run: `npm run dev`. Visit `/fragments/`. Confirm 10 cards in masonry layout.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(fragments): fragments index page"
```

---

## Task 15: Tags pages

**Files:**
- Create: `src/pages/tags/index.astro`
- Create: `src/pages/tags/[tag].astro`

- [ ] **Step 1: Create `src/pages/tags/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '~/layouts/BaseLayout.astro';

const posts = await getCollection('posts', ({ data }) => !data.draft);
const counts = new Map<string, number>();
for (const p of posts) for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);

const items = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
const max = Math.max(...items.map(([, c]) => c), 1);

function sizeFor(c: number) {
  const t = c / max;
  return 14 + Math.round(t * 22); // 14..36 px
}
---
<BaseLayout title="Tags" description="按标签浏览。">
  <section class="mx-auto max-w-layout px-5 md:px-8 pt-16 pb-10">
    <p class="text-[11px] uppercase tracking-[0.28em] text-[color:var(--brand)]">Tags</p>
    <h1 class="mt-4 font-serif text-[48px] md:text-[60px] leading-[1.08] text-text">标签 · 索引</h1>
    <p class="mt-4 max-w-[56ch] text-[17px] leading-[1.75] text-muted">
      字号 ∝ 频次。越大的词，写得越多、也想得越久。
    </p>
  </section>
  <section class="mx-auto max-w-layout px-5 md:px-8 pb-24">
    <div class="flex flex-wrap gap-x-5 gap-y-3 items-baseline">
      {items.map(([t, c]) => (
        <a
          href={`/tags/${t}/`}
          class="font-serif text-text hover:text-[color:var(--brand)] transition-colors"
          style={`font-size:${sizeFor(c)}px`}
        >
          #{t} <span class="text-faint text-[12px]">({c})</span>
        </a>
      ))}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Create `src/pages/tags/[tag].astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '~/layouts/BaseLayout.astro';
import PostCard from '~/components/post/PostCard.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const tags = new Set<string>();
  for (const p of posts) for (const t of p.data.tags) tags.add(t);
  return [...tags].map((tag) => ({ params: { tag } }));
}

const { tag } = Astro.params as { tag: string };
const posts = (await getCollection('posts', ({ data }) => !data.draft && data.tags.includes(tag)))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<BaseLayout title={`#${tag}`} description={`标签 ${tag} 下的全部文章。`}>
  <section class="mx-auto max-w-layout px-5 md:px-8 pt-16 pb-10">
    <p class="text-[11px] uppercase tracking-[0.28em] text-[color:var(--brand)]">Tag</p>
    <h1 class="mt-4 font-serif text-[44px] md:text-[56px] leading-[1.1] text-text">#{tag}</h1>
  </section>
  <section class="mx-auto max-w-layout px-5 md:px-8 pb-24">
    <div class="grid gap-5 md:grid-cols-2">
      {posts.map((p) => <PostCard post={p} body={p.body} />)}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Verify**

Run: `npm run build`. Visit `/tags/` and `/tags/typescript/`. Cloud renders, tag page lists matching posts.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(tags): tag cloud + tag detail pages"
```

---

## Task 16: About page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create `src/pages/about.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import EpigraphQuote from '~/components/post/EpigraphQuote.astro';
import OrnamentalDivider from '~/components/decor/OrnamentalDivider.astro';

const timeline = [
  {
    year: '2017',
    title: '第一次偷火',
    text: '我在一台旧 ThinkPad 上写完第一个上线的脚本。凌晨三点，风扇像旧船的锚链。',
    myth: 'Prometheus brought the ember.',
  },
  {
    year: '2019',
    title: '进入迷宫',
    text: '从单体搬进微服务。我学会了在 7 个 repo 间 grep，像代达罗斯的徒弟学着读风。',
    myth: 'Daedalus began the walls.',
  },
  {
    year: '2021',
    title: '签下第一笔 any',
    text: '为赶一次发布，我给核心类型标了 any。三年后的我仍在偿还那一行。',
    myth: 'The Pact was struck in a small font.',
  },
  {
    year: '2023',
    title: '下降',
    text: '一次线上事故教我：debugger 的向导不是栈帧，是耐心本身。莫回首。',
    myth: 'Orpheus, reminded.',
  },
  {
    year: '2026',
    title: '开始写这些',
    text: '决定把代码与神话放在同一张案几上。博客是自己立给自己的石碑。',
    myth: 'A stone, to push willingly.',
  },
];
---
<BaseLayout title="About" description="CoderEden — 自述与独白。">
  <section class="mx-auto max-w-layout px-5 md:px-8 pt-16 pb-10">
    <p class="text-[11px] uppercase tracking-[0.28em] text-[color:var(--brand)]">About</p>
    <h1 class="mt-4 font-serif text-[48px] md:text-[64px] leading-[1.08] text-text">关于 · 两个灵魂</h1>
  </section>

  <section class="mx-auto max-w-layout px-5 md:px-8 pb-6 grid md:grid-cols-2 gap-12">
    <div>
      <p class="text-[11px] uppercase tracking-[0.2em] text-faint mb-4">工程师 · The Engineer</p>
      <p class="font-serif text-[18px] leading-[1.75] text-text">
        我写代码已经 <strong>九年</strong>。主战场是后端工程、可靠性与工具链；偶尔越界到编辑器插件和前端。
        我相信——<em>代码是一种可以被反复证伪的写作</em>——所以我努力把每一次提交都当作一句话来遣词。
      </p>
    </div>
    <div>
      <p class="text-[11px] uppercase tracking-[0.2em] text-faint mb-4">沉思者 · The Contemplator</p>
      <p class="font-serif text-[18px] leading-[1.75] text-text">
        同一个九年里，我在读荷马、歌德、里尔克、加缪。他们让我相信——<em>抽象不是代码独有的产业</em>——
        古希腊人拿神话做抽象，浮士德拿灵魂做抽象，我拿类型系统做抽象。都是造一个小宇宙以维持清醒。
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-layout px-5 md:px-8">
    <EpigraphQuote
      text_en="Zwei Seelen wohnen, ach! in meiner Brust, die eine will sich von der andern trennen."
      text_zh="两个灵魂啊，居于我胸中，一个想要从另一个身上离开。"
      source="Goethe, Faust I"
    />
  </section>

  <OrnamentalDivider />

  <section class="mx-auto max-w-layout px-5 md:px-8 pb-10">
    <h2 class="font-serif text-[32px] md:text-[40px] text-text">旅程 · A Small Chronicle</h2>
    <ol class="mt-8 space-y-8">
      {timeline.map((t) => (
        <li class="grid md:grid-cols-[120px_1fr] gap-6 items-baseline">
          <span class="font-serif text-[28px] text-[color:var(--brand)]">{t.year}</span>
          <div>
            <p class="font-serif text-[22px] text-text">{t.title}</p>
            <p class="mt-1 text-[16px] leading-[1.75] text-muted">{t.text}</p>
            <p class="mt-1 font-serif italic text-[13px] text-faint">— {t.myth}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>

  <OrnamentalDivider />

  <section class="mx-auto max-w-layout px-5 md:px-8 pb-24">
    <h2 class="font-serif text-[32px] md:text-[40px] text-text">独白 · A Closing Monologue</h2>
    <div class="mt-8 grid md:grid-cols-2 gap-10">
      <div>
        <p class="font-serif italic text-[17px] leading-[1.8] text-muted whitespace-pre-line">
{`I write because I forget.
I code because I remember wrong.
Prometheus did not steal the fire,
he stole the need to watch it.
I walk down into the core dump
and promise, this time,
not to turn around
until she is whole.`}
        </p>
      </div>
      <div>
        <p class="font-serif text-[17px] leading-[1.9] text-text whitespace-pre-line">
{`我写作，因为我遗忘。
我写代码，因为我记错。
普罗米修斯偷的不是火——
是看守火的义务。
我下降到 core dump 里，
许下一个诺言：这一次，
不回头，
直到她完好如初。`}
        </p>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verify**

Run: `npm run dev`. Visit `/about/`. Check two-column layout, epigraph, timeline, closing monologue.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(about): manifesto + timeline + closing monologue"
```

---

## Task 17: RSS + 404

**Files:**
- Create: `src/pages/rss.xml.ts`
- Create: `src/pages/404.astro`

- [ ] **Step 1: Create `src/pages/rss.xml.ts`**

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: 'CoderEden',
    description: 'Notes from the workshop of a stolen fire.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      link: `/blog/${p.slug}/`,
      pubDate: p.data.date,
    })),
    customData: `<language>zh-CN</language>`,
  });
};
```

- [ ] **Step 2: Create `src/pages/404.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
---
<BaseLayout title="Lost — 404" description="页面遗失。">
  <section class="mx-auto max-w-layout px-5 md:px-8 py-32 text-center">
    <p class="text-[11px] uppercase tracking-[0.28em] text-[color:var(--brand)]">404</p>
    <h1 class="mt-4 font-serif text-[64px] md:text-[80px] leading-[1.05] text-text">Lost in the Labyrinth</h1>
    <p class="mt-4 font-serif italic text-[18px] text-muted">迷宫里走散了。</p>
    <p class="mt-10 font-serif italic text-[15px] text-faint max-w-[44ch] mx-auto">
      "Wer immer strebend sich bemüht, den können wir erlösen."<br/>
      奋然不已者，我们可以拯救。
    </p>
    <a href="/" class="mt-10 inline-flex items-center rounded-md bg-[color:var(--brand)] text-[#faf9f5] px-5 h-11 text-[15px] font-medium hover:opacity-95">
      Back to Prologue ↩
    </a>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`. Confirm `dist/rss.xml` exists and `dist/404.html` exists.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: rss feed + 404 page"
```

---

## Task 18: Final verification + README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Write `README.md`**

```md
# CoderEden Blog

> Notes from the workshop of a stolen fire.

Personal blog of **CoderEden** — engineering notes with a mythological spine (Greek myth × Faust).
Built with Astro, Tailwind, and a warm-literary design system adapted from Anthropic Claude.

## Dev

    npm install
    npm run dev       # http://localhost:4321
    npm run build     # static output to ./dist
    npm run preview

## Structure

- `src/content/posts/` — blog posts (MDX)
- `src/content/fragments/` — aphorisms
- `src/data/series.ts` — five series metadata
- `src/styles/tokens.css` — color + typography tokens (light/dark)
- `docs/superpowers/specs/` — design spec
- `docs/superpowers/plans/` — implementation plan
```

- [ ] **Step 2: Full build + link sanity**

Run:
```bash
npm run check
npm run build
```
Expected: both PASS with no errors.

Use `ls -R dist` to confirm pages: `index.html`, `about/index.html`, `blog/index.html`, 6 post dirs, `series/index.html` + 5 series dirs, `fragments/index.html`, `tags/index.html` + tag dirs, `rss.xml`, `sitemap-index.xml`, `404.html`.

- [ ] **Step 3: Manual smoke test**

Run: `npm run preview` and visit:
- `/` — hero + series grid + recent + fragments
- `/blog/` — tags cloud + 2026 group with 6 cards
- `/blog/prometheus-stolen-fire/` — epigraph + TOC highlight on scroll + progress bar + code copy button
- `/series/fausts-pact/` — 2 posts
- `/fragments/` — masonry 10 cards
- `/tags/typescript/` — 1 post
- `/about/` — two-column + timeline + monologue
- Toggle dark mode on every page — no flicker, persists after reload
- Resize to 375px — no horizontal scroll anywhere

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "docs: readme + final verification"
```

---

## Acceptance Criteria (match the spec)

1. `npm run dev` and `npm run build` succeed
2. 6 demo posts, 10 fragments, complete About page
3. Theme toggle has no FOUC, persists via localStorage
4. Desktop post pages show sticky TOC with current-section highlight
5. Reading progress bar updates on scroll
6. Code blocks have working copy button
7. Mobile (375px) — no horizontal overflow on any page
8. RSS feed at `/rss.xml` and sitemap at `/sitemap-index.xml`

---

## Self-Review Notes

- **Spec coverage:** All 12 spec sections have tasks. Tokens (§4) → Task 2. Nav/Footer (§3/§5) → Task 6. TOC/progress/code (§5) → Task 12. Content (§8) → Tasks 8 & 9. About (§3) → Task 16. RSS + 404 (§10) → Task 17. Acceptance (§12) → Task 18.
- **No placeholders:** All code blocks contain complete implementations.
- **Type consistency:** `SeriesId` from `src/content/config.ts` is reused everywhere. `CollectionEntry<'posts'>` props match in `PostCard`, `PostLayout`, and dynamic routes. `SERIES_META` keys are exhaustive over `SeriesId`.
- **Known tweak during build:** Task 7 relies on Tailwind's native `line-clamp-3`, available in 3.3+; no plugin install required.
