# Elevation Tokens

> **Borders separate. Shadows signal depth.**
> Most surfaces are flat; the terminal shell and its dropdowns are the only elements that sit above the page. Mirrors my-portfolio: no box-shadow elevation on dark surfaces except the panel glow.

## Shadow Tokens

Defined in Tailwind `@theme static`. Tailwind inlines shadow values into `shadow-*` utilities, so per-theme overrides only apply through the variable: use `shadow-(--shadow-terminal)`, never `shadow-terminal`.

| Token | Phosphor | Paper | Used for |
|-------|----------|-------|----------|
| `--shadow-terminal` | `0 28px 90px -34px` black @ 90% + `0 0 40px` amber @ 10% | `0 28px 80px -34px` zinc-900 @ 22% | Terminal shell, theme dropdown |
| `--shadow-glow-sm` | `0 0 12px` amber @ 22% | same | Status indicators only (header signal dot) |

The phosphor shell shadow is the same as my-portfolio's `.terminal-window__panel`, so the embedded terminal and its host dialog read as one object.

## Tonal Layering

Panels do not cast shadows. They step lightness: `--terminal-bg` → `--terminal-bg-secondary` → `--terminal-bg-elevated`. No inset highlights.

## Glow Effects

Only `shadow-glow-sm`, only on status indicators. No glows on buttons, text or hover states.

## Translucent Surfaces

No glassmorphism on chrome (my-portfolio rule): header, footer, dropdowns and the mobile notice use opaque backgrounds (`bg-terminal-header-bg`, `bg-terminal-bg/95` at most). The only blur is the content scrim while Matrix rain is active.

## Z-Index Scale

A layered z-index system. Never use arbitrary `z-50`.

| Token | Value | Used for |
|-------|-------|----------|
| `--z-base` | `0` | Default content |
| `--z-sticky` | `10` | Terminal shell relative stacking |
| `--z-dropdown` | `40` | Dropdowns, suggestion popovers |
| `--z-overlay` | `100` | Modal scrims, Matrix rain canvas |
| `--z-modal` | `1000` | True modal dialogs (future) |
| `--z-toast` | `1100` | Toast notifications (future) |

In code:
```tsx
<div className="z-[var(--z-dropdown)]">     {/* explicit */}
<div className="z-40">                        {/* equivalent */}
```

## Borders as Separation

Most separation is achieved with `1px` borders at 40-60% opacity, not with shadows:

```tsx
{/* List item separation */}
<article className="border-t border-terminal-border/40 py-4 first:border-t-0">

{/* Section divider */}
<span className="h-px flex-1 bg-terminal-border/40"></span>
```

Borders at 40% opacity read as "dividers" without becoming heavy lines.

## Hairlines

A separate concept from `--terminal-border`: hairlines are even subtler, used for visual rhythm within dense content:

```css
.hairline {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--terminal-border),
    transparent
  );
  opacity: 0.7;
}
```

Used in:
- Section dividers between major content blocks
- "Quick start" separator above the suggestion pills

## Anti-Patterns

❌ **Banned**: Multiple heavy shadows on stacked elements (visual chaos).
❌ **Banned**: Pure black drop shadows (`box-shadow: 0 4px 8px #000`).
❌ **Banned**: Outer glow effects (neon aesthetic, AI tell).
❌ **Banned**: Arbitrary `z-50` everywhere. Use the scale.
❌ **Banned**: Shadow as the only depth signal. Pair with a 1px border and a slight inset highlight.
❌ **Banned**: `box-shadow` on text. Text shadows hurt readability and look performative.

## Implementation Note

Tailwind v4 + arbitrary values for shadows:
```tsx
<div className="shadow-[0_28px_80px_rgba(3,6,11,0.48)]">
```

For most use cases, register an `@theme` entry:
```css
@theme static {
  --shadow-example: 0 28px 80px color-mix(in srgb, var(--terminal-overlay) 48%, transparent);
}
```
Then `shadow-example` becomes available. If the value changes per theme, consume it as `shadow-(--shadow-example)`.
