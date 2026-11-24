# Themes

> **Two surfaces, one accent — inherited from my-portfolio.**
> Phosphor is the canonical experience. Paper mirrors my-portfolio's light reading surface.

## Theme Catalog

| Theme | ID | Mode | my-portfolio equivalent | Default? |
|-------|-----|------|-------------------------|----------|
| Phosphor | `phosphor` | Dark | `[data-surface="phosphor"]` — CRT void + amber | ✅ Yes |
| Paper | `paper` | Light | Paper reading surface — warm cream + zinc + dark amber | No |

Both themes share the same semantic token names. Switching themes swaps values; components remain unchanged.

Do not add a third theme unless my-portfolio introduces the surface first.

## Switching Themes

```tsx
import { useTheme } from '../hooks/useTheme';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  // theme: 'phosphor' | 'paper'
  return <button onClick={() => setTheme('paper')}>Paper</button>;
}
```

The hook:
1. Reads from `localStorage` on mount; unknown or legacy ids (`one-dark`, `light`, `ayu`, `github-dark`) fall back to `phosphor` via `getTheme`.
2. Sets `data-theme` on `<html>` and the matching `<meta name="theme-color">`.
3. Persists to `localStorage`.
4. Triggers the CSS variable cascade — no re-render needed.

## FOUC Prevention

Applied before hydration by an inline script in `index.astro`:

```html
<script is:inline define:vars={{ paperColor }}>
  const isPaper = localStorage.getItem("theme") === "paper";
  document.documentElement.setAttribute("data-theme", isPaper ? "paper" : "phosphor");
  if (isPaper) {
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", paperColor);
  }
</script>
```

## Theme Files

- [phosphor.md](phosphor.md) — Default theme
- [paper.md](paper.md) — Light theme

## Token Coverage Per Theme

`:root` holds the palette primitives (`--palette-*`) and the Phosphor values. `[data-theme="paper"]` overrides the semantic roles:

```css
[data-theme="paper"] {
  color-scheme: light;
  --terminal-bg / -bg-secondary / -bg-elevated / -header-bg
  --terminal-border
  --terminal-text / -text-secondary / -text-tertiary
  --terminal-accent / -prompt / -warning / -error / -success / -cursor
  --grid-line / --grid-alpha
  --terminal-overlay / --shadow-terminal
  --avatar-*
  --scrollbar-track / -thumb / -thumb-hover
  --selection-bg
}
```

Semantic values reference primitives (`var(--palette-primary-700)`), never new hex. Translucency uses `color-mix()` or Tailwind opacity modifiers (`bg-terminal-accent/10`) — there are no `-rgb` triplets.

## Tailwind

Semantic tokens are exposed with `@theme inline` so utilities resolve to the active theme:

```tsx
<button className="bg-terminal-bg text-terminal-text border-terminal-border">
```

## Theme Quality Checklist

1. **All semantic roles assigned** in both themes.
2. **Values come from `--palette-*`.** New colors are added as primitives first.
3. **WCAG AA contrast** (≥ 4.5:1 text, ≥ 3:1 UI). Tertiary text is exempt only for placeholders/disabled.
4. **Shell shadow** reads correctly (paper overrides `--shadow-terminal` with a soft zinc shadow).
5. **Matrix rain readable** in both.
6. **Focus rings visible** against background and border.

## Anti-Patterns

❌ **Banned**: Auto-inverting phosphor to create paper. Paper uses darker amber shades deliberately.
❌ **Banned**: Hues outside amber + zinc (only exception: error red).
❌ **Banned**: Different radii or typography per theme.
❌ **Banned**: Themes with broken WCAG AA contrast.
