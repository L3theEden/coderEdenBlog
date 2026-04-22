---
name: summarize-doc-to-post
description: Use when the user wants to turn an external source (pasted text, local file path, or URL) into a CoderEden blog post draft — bilingual zh/en, reframed through one of 5 mythological series (Prometheus / Faust / Daedalus / Sisyphus / Orpheus)
---

# Summarize a Document into a CoderEden Post

> "Zwei Seelen wohnen, ach! in meiner Brust."
> 两个灵魂啊，居于我胸中。
> — Goethe, *Faust I*

## Overview

A post on CoderEden is not a summary of a source — it is a **translation** of the source into a mythic frame. The reader should leave not with "X is true" but with "I've been here before, in an older story."

This skill drafts such a post, under four commitments:

- **Bilingual** — Chinese body, English title / epigraph / section markers
- **One of 5 series** — each is a philosophical stance, not a topic bucket
- **Short and hammered** — within 5000 zh chars, 2–7 `##` sections numbered 一、二、三、四、五、六、七; one claim, driven through the myth
- **Review before write** — always present the draft in chat; write the `.mdx` only after the user says 就这样写入

## The Mythic Lens

The skill's central act is **reframing**. Before drafting, ask one question of the source:

> *Which older story is this technical claim a restatement of?*

Compare:

| Source claim                                | Shallow rephrasing (reject)          | Mythic reframe (aim for)                                                  |
| ------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| "I used Copilot to generate boilerplate."   | "AI 工具让我写代码更快。"              | "火苗落在凡人的掌心——让渡燃烧的权利之后，守火的义务变重。"                    |
| "We refactored the monolith into services." | "我们拆成了微服务。"                   | "造迷宫的人，也要记得入口的线团——我们切走了墙，却忘了发线。"                   |
| "I broke prod and rolled back."             | "我出了事故，回滚了。"                  | "我下降到 core dump 里，停住脚。Rilke 提醒我：她已成根。不要回头。"             |

If the draft reads like option 2, it has not yet been written.

## When to Use

User asks any of:
- "把这篇/这段/这个 URL 总结成一篇博客"
- "改写 <source> 成博客格式"
- "帮我基于这个文档写一篇"

Skip if: user only wants a one-sentence aphorism — that belongs in `src/content/fragments/` (see `新增使用说明.md` §二).

## Inputs

| Mode        | How to ingest                                       |
| ----------- | --------------------------------------------------- |
| Pasted text | Source is in the user's message                    |
| Local file  | Read with the Read tool (md / txt / mdx / pdf)     |
| URL         | Fetch with WebFetch; ask it to return the text      |

For PDFs over 10 pages, pass `pages: "1-20"` to Read.

If the user pastes a broken or noisy local path, repair it before giving up. Common cases: duplicated path segments, line-wrap corruption, or punctuation pasted into the middle of the path. State the repaired path briefly, then continue.

## Workflow

1. **Ingest** the source. Note: central claim, any quotable line, the emotional temperature (is the author tired? proud? rueful?).

2. **Ask the mythic question** (above). Name the series + a one-line philosophical rationale:
   > "建议系列：`fausts-pact` — 原文讲用 `any` 换取 sprint 的速度，典型签约当夜不讨账的合同。改吗？"

   Accept user override without argument.

3. **Draft frontmatter**:
   - `title` — Chinese, evocative not literal  *("偷来的火也要有人看管"，不是"关于 AI 工具的讨论")*
   - `title_en` — English companion, short and punched
   - `description` — one sentence, 60–100 zh chars
   - `epigraph` — **prefer a line extracted from the source**; fall back to the series' canonical `epigraph_en` / `epigraph_zh` / `source` in `src/data/series.ts`. A genuine internal quote beats a borrowed famous line.
   - `series` — the chosen id
   - `tags` — 2–4 kebab-case; reuse existing tags where possible (`ls src/content/posts/` then scan frontmatter)
   - `date` — today's ISO date
   - `draft` — omit (defaults to `false`)

4. **Outline** 2–7 `##` sections numbered 一、二、三、四、五、六、七. Never use `#` — `title` renders it. Each section headline is a *phrase*, not a label: ✓ "山顶之夜" ✗ "背景介绍".

5. **Draft body** — the principle is **one claim, hammered**:
   - Bias for one concrete scene over three abstract points
   - One fenced code block *if* the source carries a snippet that matters — not for decoration
   - One `>` blockquote mid-article — a single punchy sentence, often the post's thesis distilled
   - End with a short landing section that resolves the mythic tension (see `prometheus-stolen-fire.mdx` §三, `sisyphus-rebase.mdx` §三, `orphic-core-dump.mdx` §四)
   - Occasional inline English where it lands better than translation

6. **Humanize before presenting** (optional but recommended). If the draft reads too smooth, too balanced, or too "well-composed," do one anti-AI pass:
   - cut summary-like throat-clearing
   - remove inflated significance language
   - vary paragraph rhythm
   - keep one honest claim, one concrete scene
   - preserve the writer's intention; do not flatten the voice into generic "natural" prose

7. **Present the draft** in the chat with target path:
   ```
   目标路径：src/content/posts/<slug>.mdx
   [full frontmatter + body]
   ```
   Ask: 就这样写入？

8. **On confirm only**: write the file, then run `npm run check`. Schema error → fix → re-run. Never leave a broken entry in `src/content/posts/`.

9. **If the user wants to view the post locally**, distinguish the two Astro paths clearly:
   - `npm run dev` shows source changes live
   - `npm run preview` serves the last built `dist/`

   So after writing a post:
   - if verifying schema only, `npm run check` is enough
   - if the user will open `preview`, run `npm run build` first
   - if `preview` was already running before the new post existed, tell the user they may need to rebuild and restart preview

10. **Close the loop**. After write/verification, tell the user:
   - target file path
   - expected URL `/blog/<slug>/`
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
- File: `src/content/posts/<slug>.mdx` · URL: `/blog/<slug>/`
- Check no collision before writing: `ls src/content/posts/`

## Voice Cues

Read the six existing posts once to calibrate — they are the canon. In brief:

- **Open in medias res.** `## 一、山顶之夜` not `## 一、背景介绍`. Drop the reader on the scene.
- **First-person, confessional.** The narrator is the one who made the choice, not the one explaining it.
- **Literary quotes are rationed.** Epigraph at the top carries one. At most one more classical reference in the body (Goethe, Rilke, Camus, Aeschylus, Ovid) — otherwise the mythic frame becomes costume.
- **Concrete verbs, zero corporate vocabulary.** No 赋能 / 闭环 / 最佳实践. "Ship" not "enable delivery." The blog's taste is 手工作坊, not 会议室。
- **Code is sparse, meaningful.** One snippet that earns its place beats three that illustrate.
- **The closing section lands the tension.** Not "综上所述" — instead, one image, one line, or one action the narrator takes *after* the story ends.

## Common Mistakes

| Mistake                                                 | Fix                                                         |
| ------------------------------------------------------- | ----------------------------------------------------------- |
| Summarizing instead of reframing                        | Apply the Mythic Lens test; rewrite §一 first                |
| Writing `# 主标题` inside the body                       | Delete — `title` frontmatter renders it                     |
| Using a `series` id not in `src/data/series.ts`         | Only 5 valid — see rubric or ask user                        |
| Borrowing a famous epigraph when the source has a line  | Extract from source; fame is not authority here              |
| Stuffing three classical references into one post       | Ration to ≤1 in body; one at epigraph is enough              |
| Ending with a bullet-list or "综上"                      | End with an image or an action — one last concrete thing     |
| Writing the file before user confirms                    | Always present draft first; `Write` only on 确认              |
| Slug collides with existing post                         | Rename before writing                                        |
| User cannot see the new post in `preview`                | `preview` reads `dist/`; run `npm run build` before preview  |
| Treating a noisy pasted path as unreadable immediately   | Repair obvious path corruption before failing                |
| Draft sounds polished but bloodless                      | Run one humanizing pass before presenting                    |

## Quick Reference

```
Ingest → Repair path if needed → Mythic question → Name series (+ rationale) →
Frontmatter → 2–7 sections (一、二、三、四、五、六、七) → Hammer one claim →
Humanize pass → Present draft + target path → [await 确认] →
Write → npm run check → npm run build if user will use preview
```

## Verification

```bash
npm run check
```

Expect 0 errors. If the schema fails, fix and re-run — do not commit a draft that fails the check.

---

> "Wer immer strebend sich bemüht, den können wir erlösen."
> 奋然不已者，我们可以拯救。
> — Goethe, *Faust II*
