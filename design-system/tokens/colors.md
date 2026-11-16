# Color Tokens

> **Color is semantic, never decorative.**
> Values come from the my-portfolio palette (`~/vscode/my-portfolio/tailwind.config.mjs`). Every color has a role; components reach for the role.

## Layers

```
--palette-*  (primitives, mirror my-portfolio)  →  --terminal-*  (semantic, per theme)  →  Tailwind utilities (@theme inline)
```

## Semantic Colors

| Token | Role | Phosphor | Paper |
|-------|------|----------|-------|
| `--terminal-bg` | Canvas, terminal body, page | `zinc-950` | paper `#fffcf5` |
| `--terminal-bg-secondary` | Panels, command input shell | `zinc-900` | `#ffffff` |
| `--terminal-bg-elevated` | Dropdowns, popovers | `zinc-800` | `#ffffff` |
| `--terminal-header-bg` | Header / footer bars | `surface.void` `#03030a` | `primary-50` |
| `--terminal-border` | 1px separators, outlines | `primary-500` @ 28% | `zinc-300` |
| `--terminal-text` | Primary text | `zinc-100` | ink `#221f1b` |
| `--terminal-text-secondary` | Metadata, labels, hints | `zinc-400` | `zinc-600` |
| `--terminal-text-tertiary` | Disabled, placeholders | `zinc-500` | `zinc-500` |
| `--terminal-accent` | Links, active command, focus | `primary-500` | `primary-700` |
| `--terminal-prompt` | `$` symbol | `primary-400` | `primary-800` |
| `--terminal-cursor` | Caret, blinking cursor | `primary-500` | `primary-700` |
| `--terminal-warning` | Pending, soft warning | `accent-500` | `primary-700` |
| `--terminal-success` | Completed states | `primary-400` | `primary-800` |
| `--terminal-error` | Errors, "command not found" | `#f87171` | `#b91c1c` |

Tailwind utilities: `bg-terminal-bg`, `text-terminal-accent`, `border-terminal-border/70`, etc. Opacity modifiers work on every token (they compile to `color-mix`).

## Palette Primitives

Defined in `:root` of `src/styles/global.css`, identical to my-portfolio:

```
--palette-paper        #fffcf5    --palette-ink          #221f1b
--palette-zinc-50…950  Tailwind zinc
--palette-primary-50   #fffbeb    --palette-primary-500  #ff9500  (CRT amber)
--palette-primary-100  #fef3c7    --palette-primary-600  #ea7c00
--palette-primary-200  #fde68a    --palette-primary-700  #b45309  (light accent)
--palette-primary-300  #fcd34d    --palette-primary-800  #92400e
--palette-primary-400  #fbbf24    --palette-primary-900  #78350f
                                  --palette-primary-950  #451a03
--palette-accent-500   #f59e0b    (gold)
--palette-surface-void #03030a
--palette-error-dark   #f87171    --palette-error-light  #b91c1c   (terminal-only)
```

Palette utilities exposed for theme identity only: `bg-paper`, `primary-500`, `primary-700` (theme swatches).

## Contrast Discipline (WCAG 2.2 AA)

| Pair | Phosphor | Paper |
|------|----------|-------|
| text on bg | 18.1:1 | 16.0:1 |
| text-secondary on bg | 7.8:1 | 7.5:1 |
| text-tertiary on bg | 4.1:1 (disabled/placeholder only) | 4.7:1 |
| accent on bg | 9.1:1 | 4.9:1 |
| prompt on bg | 11.9:1 | 6.9:1 |
| warning on bg | 9.3:1 | 4.9:1 |
| error on bg | 7.2:1 | 6.3:1 |

Verify in browser after any change.

## Color Application Rules

1. **One accent.** Amber is the only hue; hierarchy comes from shade. Error red is the single exception.
2. **Accent goes on verbs, not nouns.**
3. **Error red is for errors** only.
4. **Tertiary text is for disabled/placeholder** — never on interactive elements.
5. **Borders, not shadows, separate.**
6. **Translucency uses opacity modifiers or `color-mix()`** (`bg-terminal-accent/10`, `color-mix(in srgb, var(--terminal-bg) 90%, transparent)`). There are no `-rgb` triplets.
7. **New colors start as `--palette-*` primitives**, ideally already present in my-portfolio.

## Anti-Patterns

❌ **Banned**: `text-[#ff9500]` — use `text-terminal-accent`.
❌ **Banned**: Blue, mint, purple, cyan or pink anywhere.
❌ **Banned**: Gradients on text, borders or surfaces.
❌ **Banned**: Pure `#000` / `#fff` as canvas.
❌ **Banned**: Color-only meaning. Pair color with a symbol (`$`, `→`, `·`, `×`) or label.
