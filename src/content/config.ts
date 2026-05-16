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
