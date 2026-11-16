# Paper

> **Warm cream + zinc + dark amber.** my-portfolio's light reading surface, for visitors who prefer light UIs or open the terminal standalone.

## Identity

| Property | Value | Notes |
|----------|-------|-------|
| Mode | Light | `color-scheme: light` |
| Source | my-portfolio paper surface (`--bg: 255 252 245`) | |
| Canvas | paper `#fffcf5` | Never pure white |
| Panels | `#ffffff` | Raised surfaces only |
| Accent | `primary-700` `#b45309` | my-portfolio light-mode accent |
| Prompt / success | `primary-800` `#92400e` | |
| Warning | `primary-700` `#b45309` | `accent-500` fails contrast on cream |
| Error | `#b91c1c` | Only non-amber hue |

## Token Definition

```css
[data-theme="paper"] {
  --terminal-bg: var(--palette-paper);
  --terminal-bg-secondary: #ffffff;
  --terminal-bg-elevated: #ffffff;
  --terminal-header-bg: var(--palette-primary-50);

  --terminal-border: var(--palette-zinc-300);

  --terminal-text: var(--palette-ink);
  --terminal-text-secondary: var(--palette-zinc-600);
  --terminal-text-tertiary: var(--palette-zinc-500);

  --terminal-accent: var(--palette-primary-700);
  --terminal-prompt: var(--palette-primary-800);
  --terminal-warning: var(--palette-primary-700);
  --terminal-error: var(--palette-error-light);
  --terminal-success: var(--palette-primary-800);
  --terminal-cursor: var(--palette-primary-700);

  --shadow-terminal: 0 28px 80px -34px color-mix(in srgb, var(--palette-zinc-900) 22%, transparent);
}
```

## Contrast (WCAG 2.2)

| Pair | Ratio | Status |
|------|-------|--------|
| text on bg | 16.0:1 | AAA |
| text-secondary on bg | 7.5:1 | AAA |
| text-tertiary on bg | 4.7:1 | AA |
| accent on bg | 4.9:1 | AA |
| prompt on bg | 6.9:1 | AA |
| error on bg | 6.3:1 | AA |

## Character

Grid backdrop at amber `primary-700` 5% alpha, like my-portfolio's light body. Shadows are soft zinc, not black.
