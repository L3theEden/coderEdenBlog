# Scholia Technical Notes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add optional `Scholia · 技术注疏` companion links to literary technical posts without changing the main blog information architecture.

**Architecture:** Extend the existing `posts` Content Collection schema with an optional explicit `scholia` relation. Render that relation in `PostLayout.astro` through one focused post component with an inline header variant and a block ending variant. Keep the relationship author-controlled in frontmatter; do not infer related notes automatically or add a new route.

**Tech Stack:** Astro 5, TypeScript, Content Collections, Tailwind CSS 3, CSS variables from `src/styles/tokens.css`.

**Project constraint:** The repository has no test suite or linter. Verification is `npm run check`, `npm run build`, plus a browser smoke test. Do not create commits unless the user explicitly asks; `AGENTS.md` says ordinary changes should stay uncommitted unless requested.

---

## File Structure

- Modify `src/content/config.ts`: add optional `scholia` object to the `posts` schema.
- Create `src/components/post/ScholiaLink.astro`: render both inline and block variants for the optional companion relation.
- Modify `src/layouts/PostLayout.astro`: import `ScholiaLink`, derive `post.data.scholia`, render it in the header and after the body content.
- Modify `.agents/skills/codereden-blog-dev/SKILL.md`: update frontmatter guidance for posts.
- Modify `.agents/skills/codereden-blog-dev/references/project-map.md`: document the new optional schema field.
- Modify `AGENTS.md` and `CLAUDE.md`: keep durable content schema conventions synchronized.
- No production content post receives a `scholia` link in this implementation because no real companion article URL has been supplied yet.

---

### Task 1: Extend The Post Content Schema

**Files:**
- Modify: `src/content/config.ts`

- [ ] **Step 1: Open the current schema**

Run:

```bash
sed -n '1,220p' src/content/config.ts
```

Expected: the `posts` schema includes `title`, `title_en`, `description`, optional `epigraph`, `series`, `tags`, `date`, and `draft`.

- [ ] **Step 2: Add the optional `scholia` object**

In `src/content/config.ts`, replace the `posts` collection definition with this version:

```ts
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
    scholia: z
      .object({
        href: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    series: z.enum(SERIES),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});
```

- [ ] **Step 3: Run schema/type verification**

Run:

```bash
npm run check
```

Expected: command exits 0. Existing posts without `scholia` still validate.

---

### Task 2: Create The Scholia Link Component

**Files:**
- Create: `src/components/post/ScholiaLink.astro`

- [ ] **Step 1: Create `src/components/post/ScholiaLink.astro`**

Add this file:

```astro
---
import type { CollectionEntry } from 'astro:content';

type Scholia = NonNullable<CollectionEntry<'posts'>['data']['scholia']>;

interface Props {
  scholia: Scholia;
  variant: 'inline' | 'block';
}

const { scholia, variant } = Astro.props;
const title = scholia.title ?? '技术注疏';
const description = scholia.description ?? '把这一篇里的隐喻拆回机制、代码与结论。';
---

{variant === 'inline' ? (
  <a
    href={scholia.href}
    class="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)] px-3 py-2 text-[13px] leading-none text-muted transition-all duration-200 hover:text-text hover:shadow-ring1"
  >
    <span class="font-serif italic text-[color:var(--brand)]">Scholia</span>
    <span class="text-faint">·</span>
    <span>{title}</span>
    <span aria-hidden="true">→</span>
  </a>
) : (
  <a
    href={scholia.href}
    class="group mt-12 block rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-ring1 md:p-7"
  >
    <p class="text-[11px] uppercase tracking-[0.18em] text-[color:var(--brand)]">Scholia</p>
    <h2 class="mt-2 font-serif text-[28px] leading-[1.2] text-text">{title}</h2>
    <p class="mt-3 max-w-[58ch] text-[15px] leading-[1.7] text-muted">{description}</p>
    <p class="mt-4 text-[14px] text-muted transition-colors group-hover:text-text">
      阅读注疏 <span aria-hidden="true">→</span>
    </p>
  </a>
)}
```

- [ ] **Step 2: Run type verification**

Run:

```bash
npm run check
```

Expected: command exits 0. The component compiles against the new `scholia` schema type.

---

### Task 3: Wire Scholia Into The Post Layout

**Files:**
- Modify: `src/layouts/PostLayout.astro`

- [ ] **Step 1: Add the component import**

In `src/layouts/PostLayout.astro`, add this import near the other post component imports:

```astro
import ScholiaLink from '~/components/post/ScholiaLink.astro';
```

- [ ] **Step 2: Derive the optional relation once**

Below the existing `const { post, headings } = Astro.props;` block, keep the existing constants and add `scholia`:

```astro
const { post, headings } = Astro.props;
const series = SERIES_META[post.data.series];
const scholia = post.data.scholia;
const minutes = readingTimeMinutes(post.body);
const dateLabel = post.data.date.toLocaleDateString('zh-CN', {
  year: 'numeric', month: 'long', day: 'numeric',
});
```

- [ ] **Step 3: Render the inline header entry**

Immediately after the date/read-time paragraph:

```astro
<p class="mt-5 text-[13px] text-faint uppercase tracking-[0.12em]">
  {dateLabel} · {readingTimeLabel(minutes)}
</p>

{scholia && <ScholiaLink scholia={scholia} variant="inline" />}
```

- [ ] **Step 4: Render the ending block**

Immediately after the `grid` containing the post body and TOC, before `<OrnamentalDivider />`:

```astro
</div>

{scholia && <ScholiaLink scholia={scholia} variant="block" />}

<OrnamentalDivider />
```

- [ ] **Step 5: Run type verification**

Run:

```bash
npm run check
```

Expected: command exits 0. Posts without `scholia` render without the new component.

---

### Task 4: Update Durable Project Documentation

**Files:**
- Modify: `.agents/skills/codereden-blog-dev/SKILL.md`
- Modify: `.agents/skills/codereden-blog-dev/references/project-map.md`
- Modify: `AGENTS.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update the project skill content guidance**

In `.agents/skills/codereden-blog-dev/SKILL.md`, find the frontmatter guidance under “For manual content edits” and ensure it states:

```markdown
- Frontmatter must satisfy `src/content/config.ts`.
- Posts may optionally define `scholia` with `href`, optional `title`, and optional `description` to link a literary post to its `Scholia · 技术注疏` companion.
```

- [ ] **Step 2: Update the project map schema summary**

In `.agents/skills/codereden-blog-dev/references/project-map.md`, update the `posts` schema summary so it includes:

```markdown
- `posts`: `title`, optional `title_en`, `description`, optional `epigraph`, optional `scholia`, `series`, `tags`, `date`, `draft`
```

Then add this bullet directly below the schema summary:

```markdown
`scholia` is an optional companion relation with `href`, optional `title`, and optional `description`. It renders as `Scholia · 技术注疏` on post detail pages and should point to a direct technical annotation for the literary article.
```

- [ ] **Step 3: Update `AGENTS.md` architecture guidance**

In `AGENTS.md`, update the Content bullet so it says:

```markdown
- **Content** lives in `src/content/` as `.md`/`.mdx`, typed via Content Collections (`src/content/config.ts`, zod schemas). Two collections: `posts` and `fragments`. Posts may optionally define `scholia` to link a literary article to a `Scholia · 技术注疏` companion.
```

- [ ] **Step 4: Update `CLAUDE.md` with the same durable rule**

Apply the same Content bullet change in `CLAUDE.md`:

```markdown
- **Content** lives in `src/content/` as `.md`/`.mdx`, typed via Content Collections (`src/content/config.ts`, zod schemas). Two collections: `posts` and `fragments`. Posts may optionally define `scholia` to link a literary article to a `Scholia · 技术注疏` companion.
```

- [ ] **Step 5: Verify docs contain the new term**

Run:

```bash
rg -n "scholia|Scholia|技术注疏" AGENTS.md CLAUDE.md .agents/skills/codereden-blog-dev
```

Expected: output includes the updated schema and guidance entries.

---

### Task 5: Verify Rendering With A Temporary QA Relation

**Files:**
- Temporarily modify, then restore: `src/content/posts/synchronized-as-pact.mdx`

- [ ] **Step 1: Add a temporary `scholia` relation for browser QA**

In `src/content/posts/synchronized-as-pact.mdx`, add this frontmatter block after the `description` field:

```yaml
scholia:
  href: "https://example.com/synchronized-locks"
  title: "技术注疏"
  description: "对象头、锁升级、Monitor 与 JIT 边界的直接拆解。"
```

- [ ] **Step 2: Run verification commands with the temporary relation**

Run:

```bash
npm run check
npm run build
```

Expected: both commands exit 0. The temporary external URL is accepted by the schema.

- [ ] **Step 3: Start the dev server for visual smoke testing**

Run:

```bash
npm run dev
```

Expected: Astro dev server starts on `http://localhost:4321` or the next available local port.

- [ ] **Step 4: Smoke test the configured article**

Open:

```text
http://localhost:4321/blog/synchronized-as-pact/
```

Expected:

- Header shows the small `Scholia · 技术注疏 →` pill below the date/read-time line.
- Footer area shows the `Scholia` companion block after the post body and before the bottom series quote.
- The page remains readable in light and dark themes.
- The layout does not overlap at desktop width and at mobile width around 375px.

- [ ] **Step 5: Smoke test an unconfigured article**

Open:

```text
http://localhost:4321/blog/faust-any-pact/
```

Expected: no `Scholia` entry appears in the header or ending area.

- [ ] **Step 6: Remove the temporary `scholia` block**

Remove these lines from `src/content/posts/synchronized-as-pact.mdx`:

```yaml
scholia:
  href: "https://example.com/synchronized-locks"
  title: "技术注疏"
  description: "对象头、锁升级、Monitor 与 JIT 边界的直接拆解。"
```

- [ ] **Step 7: Re-run final verification**

Run:

```bash
npm run check
npm run build
```

Expected: both commands exit 0 after removing the temporary QA relation.

- [ ] **Step 8: Inspect final diff**

Run:

```bash
git diff -- src/content/config.ts src/components/post/ScholiaLink.astro src/layouts/PostLayout.astro .agents/skills/codereden-blog-dev AGENTS.md CLAUDE.md
```

Expected: the final diff contains schema, component, layout, and documentation changes only. It does not contain the temporary `https://example.com/synchronized-locks` relation.
