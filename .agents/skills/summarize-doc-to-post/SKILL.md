---
name: summarize-doc-to-post
description: Use when the user provides source material or asks to transform pasted text, URLs, local files, notes, documents, articles, or existing posts into a CoderEden long-form post, Scholia technical note, or paired article draft.
---

# Draft CoderEden Posts and Scholia

> "Zwei Seelen wohnen, ach! in meiner Brust."
> 两个灵魂啊，居于我胸中。
> — Goethe, *Faust I*

## Overview

A literary post on CoderEden is not a summary of a source — it is a **translation** of the source into a mythic frame. The reader should leave not with "X is true" but with "I've been here before, in an older story." A Scholia note is the companion form: it turns that frame back into mechanisms, code, constraints, versions, and references.

This skill is for long-form posts and companion technical notes in `src/content/posts/`. It is not for fragments, typo fixes, frontmatter-only edits, tag plumbing, or blank scaffolds unless the user explicitly asks to turn a source into a post later.

For literary posts, this skill drafts under four commitments:

- **Bilingual** — Chinese title/body, English `title_en` / epigraph / section markers
- **One of 5 series** — each is a philosophical stance, not a topic bucket
- **Short and hammered** — within 5000 zh chars, 2–7 `##` sections numbered 一、二、三、四、五、六、七; one claim, driven through the myth
- **Draft gate by default** — present the draft before writing unless the user explicitly asks to write, implement, or update the files now

## Post Modes

Choose the mode before drafting:

| Mode | Use when | Output |
| --- | --- | --- |
| `literary` | User asks for a CoderEden post, literary technical article, mythic framing, or a source-to-blog transformation. | One mythic long-form post. |
| `scholia` | User asks for a standalone 正经技术版, 技术注疏, Scholia, or direct technical article with no main-post link. | One direct technical note that explains mechanisms, code, limits, versions, and references. |
| `paired` | User asks for both a literary article and a corresponding serious technical version, asks to add a companion note to an existing literary post, or asks for jump links between them. | A literary post with `scholia` frontmatter plus a linked Scholia technical note. |

Default to `literary` for generic "write a blog post" requests. Default to `scholia` when the user asks for a standalone 正经技术文章, 技术版, 注疏, or Scholia. Use `paired` when there is an existing main post, when drafting both pieces together, when the user says companion/对应/配套, or when the user wants the main article and the technical article to jump to each other.

## The Mythic Lens

For `literary` and the literary half of `paired`, the central act is **reframing**. Before drafting, ask one question of the source:

> *Which older story is this technical claim a restatement of?*

Compare:

| Source claim                                | Shallow rephrasing (reject)          | Mythic reframe (aim for)                                                  |
| ------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| "I used Copilot to generate boilerplate."   | "AI 工具让我写代码更快。"              | "火苗落在凡人的掌心——让渡燃烧的权利之后，守火的义务变重。"                    |
| "We refactored the monolith into services." | "我们拆成了微服务。"                   | "造迷宫的人，也要记得入口的线团——我们切走了墙，却忘了发线。"                   |
| "I broke prod and rolled back."             | "我出了事故，回滚了。"                  | "我下降到 core dump 里，停住脚。Rilke 提醒我：她已成根。不要回头。"             |

If the draft reads like option 2, it has not yet been written.

Do not force this lens into `scholia`. A technical note may keep one quiet callback to the main article, but its job is to make the mechanism falsifiable and useful.

## When to Use

Use when the user asks any of:

- "把这篇/这段/这个 URL 总结成一篇博客"
- "改写 <source> 成博客格式"
- "帮我基于这个文档写一篇"
- "把这些笔记整理成一篇 CoderEden 文章"
- "根据这个文件/链接写一篇长文"
- "给这篇文章补一个正经技术版/技术注疏"
- "写 Scholia / companion technical note"
- "把文艺主文和技术注疏成对写出来"

Skip when:

- user only wants a one-sentence aphorism — that belongs in `src/content/fragments/` (see repo-root `新增使用说明.md` §二)
- user asks only for a slug, tag, typo, frontmatter, or layout edit
- user wants a blank post scaffold with no source or claim

## Inputs

| Mode | How to ingest |
| --- | --- |
| Pasted text | Source is in the user's message. Preserve concrete details, code, and any quotable lines. |
| Local markdown/text/MDX | Read the file directly from the workspace with the normal file tools. |
| Local PDF/DOCX | Use the project-available PDF/DOCX workflow or extraction tool, then work from the extracted text. |
| URL | Use the available URL extraction/browser workflow; in this Codex setup, prefer the `defuddle` skill for ordinary web pages and official/docs sources when applicable. |

For large sources, extract only the sections needed for the post. Do not paste or reproduce long copyrighted passages; summarize and quote sparingly.

If the user pastes a broken or noisy local path, repair it before giving up. Common cases: duplicated path segments, line-wrap corruption, or punctuation pasted into the middle of the path. State the repaired path briefly, then continue.

## Workflow

1. **Ingest** the source. Note: central claim, any quotable line, the emotional temperature (is the author tired? proud? rueful?), and whether the user wants `literary`, `scholia`, or `paired`.

2. **Choose the mode and series.** For `literary` or `paired`, ask the mythic question (above). For `scholia`, identify the technical surface: language/runtime/library, version range, core mechanism, and claims that need sources. If the series fit is obvious, state the series + one-line rationale and continue. If two series are genuinely plausible, ask the user to choose before drafting:
   > "建议系列：`fausts-pact` — 原文讲用 `any` 换取 sprint 的速度，典型签约当夜不讨账的合同。若要换系列，告诉我。"

   Accept user override without argument.

3. **Draft frontmatter**:
   - `title` — Chinese. For `literary`, evocative not literal *("偷来的火也要有人看管"，不是"关于 AI 工具的讨论")*. For `scholia`, direct and technical, e.g. "`synchronized` 的技术注疏".
   - `title_en` — English companion, short and punched. For `scholia`, prefer `Scholia for <topic>` or a plain technical title.
   - `description` — one sentence, 60–100 zh chars
   - `epigraph` — for `literary`, **prefer a short line extracted from the source**; fall back to the series' canonical `epigraph_en` / `epigraph_zh` / `source` in `src/data/series.ts`. For `scholia`, prefer a short specification/API/doc quote or omit epigraph if no precise source fits. A genuine internal quote beats a borrowed famous line.
   - `series` — the chosen id
   - `tags` — 2–4 kebab-case; reuse existing tags where possible (`rg '^tags:' src/content/posts`)
   - `date` — current ISO date from the active environment
   - `draft` — omit (defaults to `false`)

   For a `paired` draft, add `scholia` only to the literary post:
   ```yaml
   scholia:
     href: "/blog/<technical-slug>/"
     title: "技术注疏"
     description: "从 <mechanism/code/version> 拆解 <topic>。"
   ```

   The Scholia note is a normal post in the same collection. Do not add `scholia` to it unless it has its own deeper companion.

4. **Choose the slug(s)**:
   - Literary post: English, lowercase, kebab-case, 2–5 words; echo the myth when natural.
   - Scholia note: English, lowercase, kebab-case, usually `<topic>-scholia`, `<topic>-technical-note`, or `<topic>-locks-scholia`.
   - Check collisions before writing: `ls src/content/posts/`.

5. **Outline**. Never use `#` — `title` renders it.
   - `literary`: 2–7 `##` sections numbered 一、二、三、四、五、六、七; each headline is a *phrase*, not a label: ✓ "山顶之夜" ✗ "背景介绍".
   - `scholia`: 4–8 direct `##` sections numbered 一、二、三; headings may be explanatory, such as "先看字节码" or "版本边界". Include "参考" when external sources matter.
   - `paired`: outline both pieces; the technical note should not repeat the literary essay's emotional arc.

6. **Draft literary body** — the principle is **one claim, hammered**:
   - Bias for one concrete scene over three abstract points
   - One fenced code block *if* the source carries a snippet that matters — not for decoration
   - One `>` blockquote mid-article — a single punchy sentence, often the post's thesis distilled
   - End with a short landing section that resolves the mythic tension (see `prometheus-stolen-fire.mdx` §三, `sisyphus-rebase.mdx` §三, `orphic-core-dump.mdx` §四)
   - Occasional inline English where it lands better than translation

7. **Draft Scholia body** when mode is `scholia` or `paired`:
   - Start with a restrained backlink when attached to a main post: `对应主文：[《...》](/blog/<main-slug>/)。`
   - State that the note turns the main article's metaphor back into mechanisms, not that it is the "correct" version.
   - Prefer concrete mechanics: runtime behavior, data structures, API contracts, bytecode, protocols, invariants, failure modes.
   - Add version boundaries for unstable implementation details. For current language/runtime/library facts, verify against primary sources or official docs before asserting them.
   - Use code blocks, tables, and bullet lists when they clarify the mechanism. Scholia can be denser than the literary post.
   - End with a compact judgment table or operational rule when the topic supports it.
   - Include a `## 参考` section for authoritative sources. Keep direct quotes short and cite links.
   - Avoid the word "正经" in UI-facing copy unless the user explicitly wants that tone. Prefer "技术注疏", "Scholia", or a concrete title.

8. **Humanize before presenting** (conditional, but expected for most literary drafts). After the literary rewrite is complete, use the `humanizer` skill when available and when the draft reads too smooth, too balanced, too explanatory, or too "well-composed." Keep this as a final editing pass, not the source-ingestion or series-selection step. For Scholia, humanize for clarity and rhythm, not for mythic atmosphere. If `humanizer` is unavailable, continue with the manual anti-AI pass:
   - cut summary-like throat-clearing
   - remove inflated significance language
   - vary paragraph rhythm
   - keep one honest claim, one concrete scene
   - preserve the writer's intention; do not flatten the voice into generic "natural" prose

9. **Present or write the draft** with target path(s):
   ```
   目标路径：src/content/posts/<slug>.mdx
   [full frontmatter + body]
   ```
   Default: present the full draft and ask `就这样写入？`. For `paired`, show both paths and make the `scholia.href` / backlink visible.

   If the user explicitly asked to write, implement, update, or execute now, write the file(s) directly after drafting instead of waiting for a second confirmation.

10. **Write and verify**: after confirmation, or immediately when the user already asked for execution, write the file(s), then run `npm run check`. In Codex, use normal file-editing tools such as `apply_patch`; do not leave a broken entry in `src/content/posts/`. Schema error → fix → re-run.

11. **If the user wants to view the post locally**, distinguish the two Astro paths clearly:
   - `npm run dev` shows source changes live
   - `npm run preview` serves the last built `dist/`

   So after writing a post:
   - if verifying schema only, `npm run check` is enough
   - if the user will open `preview`, run `npm run build` first
   - if `preview` was already running before the new post existed, tell the user they may need to rebuild and restart preview

12. **Close the loop**. After write/verification, tell the user:
   - target file path
   - expected URL `/blog/<slug>/`
   - paired link status when `scholia` is involved
   - if they do not see it in `preview`, rebuild first

## Series Rubric — a Philosophical Map

Each series answers a different question about the engineer's condition. Match the **question** your source raises, not just its topic:

| Series                | Underlying question                                                  | Surface topics                                                   |
| --------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `prometheus-fire`     | *I received a new power — who bears the burden of its use?*          | AI tools, new capabilities, audacity, power-suddenly-in-hand     |
| `fausts-pact`         | *I got speed now. When does the bill arrive?*                        | Tech debt, `any`, shortcuts, trade-offs, velocity-price          |
| `daedalus-labyrinth`  | *I built a structure. Can I still find my way out?*                  | Architecture, abstractions, microservices, onboarding, complexity |
| `sisyphus-stone`      | *This task will never end. Can the repetition itself carry meaning?* | Refactor, routine, daily workflow, small disciplines             |
| `orphic-descent`      | *I need to know what happened. Can I retrieve it without destroying it?* | Debugging, postmortem, tracing, retrieval, patience             |

When torn: read the `tagline_zh` and `epigraph_zh` of candidate series in `src/data/series.ts`. Match the **emotional arc** of the source, not its vocabulary.

## Slug Naming

- English, lowercase, kebab-case, 2–5 words
- Echo the myth when natural (`prometheus-stolen-fire`, `sisyphus-rebase`, `orphic-core-dump`, `walpurgisnacht-git-blame`)
- For Scholia notes, prefer a plain technical slug ending in `-scholia` when it reads well.
- File: `src/content/posts/<slug>.mdx` · URL: `/blog/<slug>/`
- Check no collision before writing: `ls src/content/posts/`

## Voice Cues

When the voice feels uncertain, read 2–3 representative existing posts to calibrate. Useful anchors: `prometheus-stolen-fire.mdx`, `faust-any-pact.mdx`, `sisyphus-rebase.mdx`, `orphic-core-dump.mdx`. In brief:

- **Open in medias res.** `## 一、山顶之夜` not `## 一、背景介绍`. Drop the reader on the scene.
- **First-person, confessional.** The narrator is the one who made the choice, not the one explaining it.
- **Literary quotes are rationed.** Epigraph at the top carries one. At most one more classical reference in the body (Goethe, Rilke, Camus, Aeschylus, Ovid) — otherwise the mythic frame becomes costume.
- **Concrete verbs, zero corporate vocabulary.** No 赋能 / 闭环 / 最佳实践. "Ship" not "enable delivery." The blog's taste is 手工作坊, not 会议室。
- **Code is sparse, meaningful.** One snippet that earns its place beats three that illustrate.
- **The closing section lands the tension.** Not "综上所述" — instead, one image, one line, or one action the narrator takes *after* the story ends.

For Scholia:

- **Mechanism first.** Start from what the language, runtime, library, or protocol actually promises.
- **Versioned claims.** If implementation behavior changes across versions, name the versions and avoid timeless wording.
- **Readable, not lyrical.** Keep the CoderEden warmth, but use direct technical prose and concrete section headings.
- **Useful ending.** A judgment table, checklist, or operational rule is better than a literary landing image.

## Common Mistakes

| Mistake                                                 | Fix                                                         |
| ------------------------------------------------------- | ----------------------------------------------------------- |
| Summarizing instead of reframing                        | Apply the Mythic Lens test; rewrite §一 first                |
| Writing `# 主标题` inside the body                       | Delete — `title` frontmatter renders it                     |
| Using a `series` id not in `src/data/series.ts`         | Only 5 valid — see rubric or ask user                        |
| Borrowing a famous epigraph when the source has a line  | Extract from source; fame is not authority here              |
| Stuffing three classical references into one post       | Ration to ≤1 in body; one at epigraph is enough              |
| Ending with a bullet-list or "综上"                      | End with an image or an action — one last concrete thing     |
| Writing when the user only asked for a draft              | Present draft first; write after 确认                         |
| Using unavailable tool names from another agent runtime   | Use the tools available in the current Codex session          |
| Quoting a long article too heavily                        | Summarize; keep direct quotes short and necessary             |
| Slug collides with existing post                         | Rename before writing                                        |
| User cannot see the new post in `preview`                | `preview` reads `dist/`; run `npm run build` before preview  |
| Treating a noisy pasted path as unreadable immediately   | Repair obvious path corruption before failing                |
| Draft sounds polished but bloodless                      | Use `humanizer` as a final editing pass before presenting    |
| `humanizer` is unavailable                               | Continue with the manual anti-AI pass                         |
| Forcing the mythic lens into Scholia                      | Keep the note direct; one quiet callback is enough            |
| Forgetting the paired link                                | Literary post owns `scholia`; Scholia note links back in the first paragraph |
| Writing stale technical facts                             | Check primary sources or official docs for version-sensitive claims |
| Putting "正经" in the public label by default             | Use `Scholia` / `技术注疏` unless the user explicitly asks otherwise |

## Quick Reference

```
Ingest → Repair path if needed → Choose mode (literary/scholia/paired) →
Name series (+ rationale) → Frontmatter (+ scholia for paired) → Slug(s) →
Draft literary body and/or Scholia body → Humanizer/clarity pass →
Present draft + target path(s), unless user asked to write now →
Write → npm run check → npm run build if user will use preview
```

## Verification

```bash
npm run check
```

Expect 0 errors. If the schema fails, fix and re-run — do not commit a draft that fails the check. For paired posts, run `npm run build` and verify the generated main page contains the Scholia link and the generated Scholia page contains the backlink.

---

> "Wer immer strebend sich bemüht, den können wir erlösen."
> 奋然不已者，我们可以拯救。
> — Goethe, *Faust II*
