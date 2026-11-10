import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { withBase } from '~/utils/site-url';

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: 'CoderEden',
    description: 'Notes from the workshop of a stolen fire.',
    site: new URL(withBase('/'), context.site!),
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      link: withBase(`/blog/${p.slug}/`),
      pubDate: p.data.date,
    })),
    customData: `<language>zh-CN</language>`,
  });
};
