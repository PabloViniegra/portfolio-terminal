# Elevation Tokens

> **Borders separate. Shadows signal depth.**
> Most surfaces are flat; the terminal shell is the one element that sits above the page.

## Elevation Scale

| Token | Definition | Used for |
|-------|------------|----------|
| `--elevation-0` | none | Page background, terminal body (flat) |
| `--elevation-1` | subtle inset highlight | Inner panels (`inset 0 1px 0 rgba(255,255,255,0.04)`) |
| `--elevation-2` | panel shadow + inset | Dropdowns (`0 10px 15px -3px rgba(0,0,0,0.1)`) |
| `--elevation-3` | strong shadow | Theme switcher dropdown (`0 28px 80px rgba(3,6,11,0.48)`) |

## The One Heavy Shadow

The terminal shell is the only element with significant elevation. It sits on the page like a card, lifted by:

```css
.terminal {
  box-shadow:
    0 28px 80px rgba(3, 6, 11, 0.48),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
```

- Outer shadow: 28px blur, 80px spread, dark base color (`rgba(3,6,11,0.48)`) — pulls the shell away from the page.
- Inner highlight: 1px from top, white at 4% opacity — catches light, makes the shell feel like glass / CRT.

**The shadow is tinted to the background hue, not pure black.** This avoids the AI-tell of pure-black drop shadows.

## Inset Highlights

Inner panels use inset highlights instead of shadows:

```css
.command-input {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
}
```

This subtle inner stroke makes the panel feel like a recessed input field, consistent with the terminal metaphor.

## Glow Effects

**Banned by default**. No neon glows, no outer glows, no `box-shadow: 0 0 20px var(--accent)`.

If a glow is ever needed (a future feature requiring emphasis):
- Tint to background hue
- Use 2-3px blur max
- Apply at 40-60% opacity
- Never as the default state — only on hover/active

## Translucent Surfaces

For dropdowns, suggestion popovers, and the theme switcher:

```css
.theme-dropdown {
  background: rgba(var(--terminal-bg-rgb), 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid var(--terminal-border);
  box-shadow: 0 28px 80px rgba(3, 6, 11, 0.48);
}
```

- 95% background opacity with backdrop blur (8px) gives "frosted glass" feel without full transparency.
- Border still 1px — keeps the surface grounded.
- Heavy shadow signals "this is floating above".

**Future work**: respect `prefers-reduced-transparency` with a solid fallback.

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
@theme {
  --shadow-terminal: 0 28px 80px rgba(3, 6, 11, 0.48);
}
```
Then `shadow-terminal` becomes available.
