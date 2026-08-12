# Tokens Overview

> **The atomic layer of the design system.**
> Tokens are named values, not variables. Every color, every space, every duration in this system has a name, a role, and a context where it applies.

## Layering

```
Primitive tokens    →   Semantic tokens   →   Component tokens
(raw values)             (role-based)          (component-specific)
```

**Primitive**: `--neutral-900: #11151b;` (a raw color, never used in components)
**Semantic**: `--terminal-bg: var(--neutral-900);` (assigned to a role)
**Component**: (rarely needed in this system; the semantic layer usually suffices)

We define primitives and semantics in `src/styles/global.css` per theme. Components consume semantics. A component using `--neutral-900` directly is a code smell.

## Token Categories

| Category | File | What it covers |
|----------|------|----------------|
| Color | [colors.md](colors.md) | Semantic colors, primitive palette, contrast, dark/light discipline |
| Typography | [typography.md](typography.md) | Font families, scale, weights, line-heights, tracking |
| Spacing | [spacing.md](spacing.md) | 4px base scale, section rhythm, component padding |
| Motion | [motion.md](motion.md) | Durations, easings, animation tokens |
| Elevation | [elevation.md](elevation.md) | Shadows, glows, z-index scale |

## Quick Map

When you reach for color, ask: **"what role does this color play?"**

```
"primary text"       → --terminal-text
"secondary text"     → --terminal-text-secondary
"link, interactive"  → --terminal-accent
"affordance, prompt" → --terminal-prompt
"error"              → --terminal-error
"warning"            → --terminal-warning
"success"            → --terminal-success
"divider, border"    → --terminal-border
"main background"    → --terminal-bg
"surface, panel"     → --terminal-bg-secondary
"elevated surface"   → --terminal-bg-elevated
```

When you reach for spacing, ask: **"what relationship is this gap expressing?"**

```
"tight, related"     → 4-8px  (--space-1, --space-2)
"normal, grouped"    → 12-16px (--space-3, --space-4)
"section separator"  → 24-32px (--space-6, --space-8)
"page rhythm"        → 48-64px (--space-12, --space-16)
```

When you reach for motion, ask: **"what just changed?"**

```
"instant feedback"   → 0ms (color change on press)
"hover, focus"       → 150ms ease-out (--motion-fast)
"state transition"   → 200-300ms ease-out (--motion-base)
"content appears"    → 200ms ease-out, fade+translate (--motion-enter)
"theme switch"       → 300ms ease-in-out (--motion-theme)
```

## File Conventions

- Token names use **kebab-case**: `--terminal-bg-secondary`, never `--terminalBgSecondary` or `--terminal_bg_secondary`.
- Token categories are **prefixed**: `--terminal-*` for colors, `--font-*` for typography, `--space-*` for spacing, `--motion-*` for motion.
- Theme overrides use the **same name** as the base token; only the value changes.
- Document each token in its category file with: name, role, used by, never-use-instead-of, example.

## How Tokens Map to Tailwind v4

In `global.css`, define the tokens as CSS custom properties on `:root`. In Tailwind v4, the `@theme` block generates utility classes from these:

```css
@theme {
  --color-terminal-bg: var(--terminal-bg);
  --color-terminal-accent: var(--terminal-accent);
  /* ... */
}
```

This gives us `bg-terminal-bg`, `text-terminal-accent`, etc. as utility classes, with full theme support.

For values that don't fit a Tailwind utility (radii, z-index, etc.), use arbitrary value notation: `bg-[var(--terminal-bg)]` or define the `@theme` entry to register them.
