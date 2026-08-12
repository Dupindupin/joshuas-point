export const themeStorageKey = 'jp-theme-preference'

export type ThemePreference = 'dark' | 'light' | 'system'
export type ResolvedTheme = Exclude<ThemePreference, 'system'>

export const themeInitializationScript = `
(function () {
  var saved = null;
  try {
    saved = window.localStorage.getItem('${themeStorageKey}');
  } catch (error) {}

  var preference = saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
  var resolved = preference === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : preference;
  var root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolved;
})();
`
