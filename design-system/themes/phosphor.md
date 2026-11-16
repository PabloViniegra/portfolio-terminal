# Phosphor (Default)

> **CRT void + amber.** The terminal as a my-portfolio phosphor surface — a tool, independent of the host page's light/dark mode.

## Identity

| Property | Value | Notes |
|----------|-------|-------|
| Mode | Dark | `color-scheme: dark` |
| Source | my-portfolio `[data-surface="phosphor"]` | Same bg, text and accent |
| Canvas | `zinc-950` `#09090b` | Never pure black |
| Accent | `primary-500` `#ff9500` | CRT amber, signature color |
| Prompt / success / cursor | `primary-400` / `primary-500` | Bright amber |
| Warning | `accent-500` `#f59e0b` | Gold |
| Error | `#f87171` | Only non-amber hue |

## Token Definition

```css
:root {
  --terminal-bg: var(--palette-zinc-950);
  --terminal-bg-secondary: var(--palette-zinc-900);
  --terminal-bg-elevated: var(--palette-zinc-800);
  --terminal-header-bg: var(--palette-surface-void);

  --terminal-border: color-mix(in srgb, var(--palette-primary-500) 28%, transparent);

  --terminal-text: var(--palette-zinc-100);
  --terminal-text-secondary: var(--palette-zinc-400);
  --terminal-text-tertiary: var(--palette-zinc-500);

  --terminal-accent: var(--palette-primary-500);
  --terminal-prompt: var(--palette-primary-400);
  --terminal-warning: var(--palette-accent-500);
  --terminal-error: var(--palette-error-dark);
  --terminal-success: var(--palette-primary-400);
  --terminal-cursor: var(--palette-primary-500);
}
```

## Contrast (WCAG 2.2)

| Pair | Ratio | Status |
|------|-------|--------|
| text on bg | 18.1:1 | AAA |
| text-secondary on bg | 7.8:1 | AAA |
| text-tertiary on bg | 4.1:1 | Placeholders/disabled only |
| accent on bg | 9.1:1 | AAA |
| prompt on bg | 11.9:1 | AAA |
| warning on bg | 9.3:1 | AAA |
| error on bg | 7.2:1 | AAA |

## Character

Matches the my-portfolio terminal window that embeds this app: the iframe boundary disappears because panel, border (`amber @ 28–32%`) and shadow (`black` + `amber glow @ 10%`) are the same.
