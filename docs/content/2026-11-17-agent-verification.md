# 2026-11-17 · Agent verification paired posts

## Articles

- Literary: `src/content/posts/daedalus-walls-remember.mdx`
- Technical: `src/content/posts/agent-verification-scholia.mdx`
- Both belong to `daedalus-labyrinth`; each links to its companion.
- The review scene in the literary post is explicitly hypothetical.

## Sources and editorial choices

The user supplied [@0x_kaize's article](https://x.com/0x_kaize/article/2121540306822701393). Its text was extracted with Defuddle. The [official Lauren Tan talk page](https://ai.engineer/code/2026/talks/lauren-tan) was used to check the talk date and reported statistics.

- Preserve attribution for the team's self-reported outcomes. Correct the secondary article's “rejected” wording to “reverted”; neither metric proves causality.
- The title epigraph is a short quotation from the secondary article, not an independently verified verbatim line from the talk.
- Explain the exceptions in [pstack's comment policy](https://github.com/cursor/plugins/blob/main/pstack/agents/comment-sicko.md), rather than adopting its instructions as this repository's policy.
- Cross-check technical claims with the linked official ESLint, React, Bombadil, TLC and Lean documentation.
- The static-import example and verification diagram are original teaching material. No Dune implementation or conference slide is reproduced.
- Technical references were checked on 2026-11-17. Main-branch documentation can change later.

## Illustration

- Source asset: `src/assets/posts/agent-verification/walls-remember.png` (1536 × 1024).
- Generated with the built-in `image_gen` tool; no reference image was supplied.
- The post explicitly labels the illustration as AI-generated.
- Astro's existing asset pipeline emits an optimized WebP for the page, retaining intrinsic dimensions.

Exact generation prompt:

```text
Use case: illustration-story
Asset type: original editorial illustration for a Chinese literary software-engineering blog essay titled "Let the Walls Remember".
Primary request: A quiet metaphor for an architect making a repeated wrong turn impossible: a small hand-built labyrinth on a wooden worktable, one misleading passage carefully closed with a newly fitted terracotta brick, while a continuous dark thread follows the remaining open passage toward daylight. Only a craftsman's hand setting the brick is visible; the architecture and the path are the subjects.
Style/medium: restrained pen-and-ink drawing, tactile dry brush and sparse gouache, irregular handmade contours, delicate crosshatching, printed on warm uncoated ivory paper. Literary journal illustration, modest and thoughtful.
Composition/framing: landscape approximately 3:2, elevated three-quarter view of the miniature labyrinth, generous paper margin, readable at article-column size, no separate panels.
Lighting/mood: soft afternoon daylight; practical, calm, human craftsmanship.
Color palette: warm ivory and parchment, charcoal-brown ink, restrained terracotta brick accents; no cool blue or neon.
Constraints: no words, no lettering, no logos, no watermark, no robots, no screens, no glowing circuitry, no infographic symbols, no fantasy spectacle. Original image, not a reproduction of a conference slide.
```

## Technical diagram

- Editable source: `public/images/posts/agent-verification/verification-path.drawio`.
- Published asset: `public/images/posts/agent-verification/verification-path.svg`.
- Drawn with draw.io Desktop 29.7.9; warm colors follow `src/styles/tokens.css` at the time of creation.
- The SVG embeds its editable diagram. It is an original explanatory diagram, not a recreation of the talk's trust pyramid.
- Inspect the PNG preview before exporting SVG; only the source and final SVG are retained in the repository.

## Example verification

Code blocks were extracted from the MDX into a temporary directory outside the repository; the blog's dependencies were not changed.

Runtime: Node.js 26.0.0; ESLint 10.15.0.

- The article's invalid static import failed with exit code 1 and `no-restricted-imports`.
- The replacement pure function passed with exit code 0.
- Bare `fs`, bare `fs/promises`, `node:fs`, static re-exports and a local disable directive were also rejected.
- Dynamic `import()` passed, confirming the documented limitation rather than claiming comprehensive isolation.

Bombadil, TLC and Lean are discussed from their official documentation; no experiment with those tools is claimed.

## Site verification

- `npm run check`: 39 files, zero errors, warnings or hints.
- `npm run build`: 49 pages; the illustration was optimized to a roughly 427 KB WebP.
- `npm run verify:build`: 1,470 local page, asset, feed and sitemap URLs checked.
- Both companion links, image alternative text, RSS entries and sitemap entries were checked in the built HTML/XML.
- Browser preview: both images loaded, navigation worked in both directions, and the current 319 px viewport had no page-wide horizontal overflow. The technical table gained scoped cell spacing and row separators after visual review.
- Local preview: `http://127.0.0.1:4324/coderEdenBlog/`.

## Publication

The repository's GitHub Pages workflow publishes these articles and their assets when the content commit reaches `main`:

- [Literary post](https://l3theeden.github.io/coderEdenBlog/blog/daedalus-walls-remember/)
- [Technical post](https://l3theeden.github.io/coderEdenBlog/blog/agent-verification-scholia/)
