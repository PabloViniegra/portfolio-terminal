# Themes

> **Four personalities, one system.**
> One Dark is the canonical experience. The others are first-class citizens, not afterthoughts.

## Theme Catalog

| Theme | ID | Mode | Character | Default? |
|-------|-----|------|-----------|----------|
| One Dark | `one-dark` | Dark | Charcoal canvas, terminal blue accent, mint prompt | ✅ Yes |
| Light | `light` | Light | Off-white canvas, professional blue accent, forest green prompt | No |
| Ayu | `ayu` | Dark | Deep blue-black canvas, sky-blue accent, olive prompt | No |
| GitHub Dark | `github-dark` | Dark | GitHub-neutral canvas, blue accent, mint prompt | No |

All four themes share the same semantic token names. Switching themes swaps values; components remain unchanged. This is the entire point of the semantic layer.

## Switching Themes

Themes are switched at runtime via the `useTheme` hook:

```tsx
import { useTheme } from '../hooks/useTheme';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  // theme: 'one-dark' | 'light' | 'ayu' | 'github-dark'
  return <button onClick={() => setTheme('ayu')}>Switch to Ayu</button>;
}
```

The hook:
1. Reads from `localStorage` on mount (with safe fallback to `DEFAULT_THEME`).
2. Sets `data-theme` attribute on `<html>`.
3. Persists to `localStorage`.
4. Triggers the CSS variable cascade — no re-render needed.

The CSS transition on `body` (background-color, color) handles the visual fade between themes.

## FOUC Prevention

Theme is applied BEFORE React hydrates, via an inline script in `index.astro`:

```html
<script is:inline>
  const savedTheme = localStorage.getItem("theme") || "one-dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
</script>
```

This prevents a flash of One Dark theme when a user lands on the page with Light saved. The script runs synchronously before paint.

## Theme Files

- [one-dark.md](one-dark.md) — Default theme
- [light.md](light.md) — Light mode
- [ayu.md](ayu.md) — Ayu palette inspired by the Ayu Mirage theme for VS Code
- [github-dark.md](github-dark.md) — GitHub Dark neutral palette

## Token Coverage Per Theme

Each theme defines these tokens (same names, different values):

```css
[data-theme="one-dark"] {
  --terminal-bg: ...;
  --terminal-bg-rgb: ...;
  --terminal-bg-secondary: ...;
  --terminal-bg-secondary-rgb: ...;
  --terminal-bg-elevated: ...;
  --terminal-bg-elevated-rgb: ...;
  --terminal-border: ...;
  --terminal-border-rgb: ...;
  --terminal-text: ...;
  --terminal-text-rgb: ...;
  --terminal-text-secondary: ...;
  --terminal-text-secondary-rgb: ...;
  --terminal-text-tertiary: ...;
  --terminal-accent: ...;
  --terminal-prompt: ...;
  --terminal-warning: ...;
  --terminal-error: ...;
  --terminal-success: ...;
  --terminal-cursor: ...;
  --terminal-overlay-rgb: ...;
}
```

If a theme is missing a token, it inherits from `:root` (One Dark). The intent: every theme defines all tokens explicitly, so no silent fallback.

## Theme Selection Logic

The default is `one-dark` (terminal heritage). Users switch on demand:

```tsx
const DEFAULT_THEME: ThemeType = 'one-dark';
```

A future feature could auto-detect `prefers-color-scheme: dark` / `light`, but for v1, the default is fixed to match the terminal metaphor.

## Theme Application Examples

### In CSS (global.css)
```css
:root {
  /* defaults = one-dark */
}

[data-theme="light"] {
  /* light overrides */
}
```

### In React
```tsx
<html data-theme={theme}>
```

### In Tailwind
Tokens are mapped to Tailwind utilities via `@theme` block. Tailwind utilities automatically resolve to the current theme's values:

```tsx
<button className="bg-terminal-bg text-terminal-text border-terminal-border">
  {/* All values swap when data-theme changes */}
</button>
```

## Theme Quality Checklist

Before shipping a new theme, verify:

1. **All 12 semantic tokens defined.** No fallback to `:root` (explicit > implicit).
2. **All RGB triplets defined.** For translucent overlays.
3. **WCAG AA contrast.** All text/background pairs ≥ 4.5:1. Verify in browser.
4. **Scrollbar styled.** Custom scrollbar respects the theme, doesn't look broken.
5. **Terminal shell shadow reads correctly.** The dark shadow on light themes needs adjustment (slightly stronger alpha or different base color).
6. **Matrix rain canvas readable.** Light theme may need a darker rain backdrop.
7. **Focus rings visible.** Accent color at focus must contrast with both background and border.

## Anti-Patterns

❌ **Banned**: Auto-inverting a dark theme to create a "light mode". Re-pick colors deliberately.
❌ **Banned**: Different border radii per theme (radius is theme-independent).
❌ **Banned**: Theme-specific typography (the type system is theme-independent).
❌ **Banned**: Themes with broken WCAG AA contrast. If a color is too saturated to meet 4.5:1, desaturate.
❌ **Banned**: Multiple cursor colors that don't relate to the prompt. The cursor and `$` symbol should be the same color (or deliberately different for visual interest).
