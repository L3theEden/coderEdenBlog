/**
 * Prefix site-root paths while preserving external, relative and fragment URLs.
 * @param {string} path
 * @param {string} base
 */
export function withBasePath(path, base) {
  if (!path.startsWith('/') || path.startsWith('//')) return path;

  const prefix = base.replace(/\/+$/, '');
  const pathname = path.split(/[?#]/, 1)[0];
  if (!prefix || pathname === prefix || pathname.startsWith(`${prefix}/`)) return path;

  return `${prefix}${path}`;
}
