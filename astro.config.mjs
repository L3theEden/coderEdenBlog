import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import remarkBaseLinks from './src/utils/remark-base-links.mjs';

const base = '/coderEdenBlog';

export default defineConfig({
  site: 'https://l3theeden.github.io',
  base,
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
  markdown: {
    remarkPlugins: [[remarkBaseLinks, { base }]],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: true,
    },
  },
});
