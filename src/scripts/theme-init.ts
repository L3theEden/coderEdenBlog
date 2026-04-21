export const THEME_INIT = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var mql = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (mql ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`.trim();
