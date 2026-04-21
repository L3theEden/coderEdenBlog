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
