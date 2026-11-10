import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import config from '../astro.config.mjs';

const dist = path.resolve('dist');
const base = `${config.base.replace(/\/+$/, '')}/`;
const site = new URL(base, config.site);
const failures = new Set();
let checked = 0;

assert.ok(existsSync(dist), 'Run npm run build before verifying the output.');

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(filename) : [filename];
  });
}

function decodeEntities(value) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function checkURL(raw, from, filename) {
  const url = new URL(decodeEntities(raw), from);
  if (url.origin !== site.origin) return;
  checked += 1;

  if (!url.pathname.startsWith(base)) {
    failures.add(`${filename}: URL escapes the deployment base: ${raw}`);
    return;
  }

  const relative = decodeURIComponent(url.pathname.slice(base.length));
  const target = path.join(dist, relative);
  const candidates = [target, path.join(target, 'index.html')];
  if (!path.extname(target)) candidates.push(`${target}.html`);
  const resolved = candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
  if (!resolved) {
    failures.add(`${filename}: Missing linked page or asset: ${raw}`);
    return;
  }

  if (url.hash && resolved.endsWith('.html')) {
    const fragment = decodeURIComponent(url.hash.slice(1));
    const ids = [...readFileSync(resolved, 'utf8').matchAll(/\bid="([^"]+)"/g)]
      .map((match) => decodeEntities(match[1]));
    if (fragment && !ids.includes(fragment)) {
      failures.add(`${filename}: Missing fragment: ${raw}`);
    }
  }
}

const files = filesIn(dist);
const pages = files.filter((filename) => filename.endsWith('.html'));
for (const filename of pages) {
  const relative = path.relative(dist, filename).split(path.sep).join('/');
  const pageURL = new URL(relative.replace(/index\.html$/, ''), site);
  const html = readFileSync(filename, 'utf8');
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  if (!canonical || !canonical[1].startsWith(site.href)) {
    failures.add(`${relative}: Missing or incorrect canonical origin/base`);
  }

  for (const [tag] of html.matchAll(/<(?:a|link|script|img|source|video|audio|iframe)\b[^>]*>/gi)) {
    for (const [, value] of tag.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
      checkURL(value, pageURL, relative);
    }
    for (const [, value] of tag.matchAll(/\bsrcset="([^"]+)"/g)) {
      for (const candidate of value.split(',')) {
        checkURL(candidate.trim().split(/\s+/)[0], pageURL, relative);
      }
    }
  }
  for (const [, image] of html.matchAll(/<meta\b[^>]*property="og:image"[^>]*content="([^"]+)"/g)) {
    checkURL(image, pageURL, relative);
  }
}

for (const filename of files.filter((file) => file.endsWith('.css'))) {
  const cssURL = new URL(path.relative(dist, filename).split(path.sep).join('/'), site);
  for (const [, raw] of readFileSync(filename, 'utf8').matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)) {
    checkURL(raw, cssURL, path.relative(dist, filename));
  }
}

for (const filename of ['rss.xml', 'sitemap-index.xml', 'sitemap-0.xml']) {
  const xml = readFileSync(path.join(dist, filename), 'utf8');
  for (const [, url] of xml.matchAll(/<(?:link|loc)>([^<]+)<\/(?:link|loc)>/g)) {
    checkURL(url, site, filename);
  }
}
const robots = readFileSync(path.join(dist, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${site.href}sitemap-index.xml`)) {
  failures.add('robots.txt must use the deployment base.');
}

if (failures.size) {
  for (const failure of [...failures].slice(0, 20)) console.error(failure);
  console.error(`${failures.size} build verification failures.`);
  process.exit(1);
}
console.log(`Verified ${pages.length} HTML pages and ${checked} internal page, asset, feed and sitemap URLs at ${site.href}`);
