# Design System

> **Google Labs-inspired design system for the `portfolio-terminal` project.**
> Terminal aesthetic · semantic tokens · four themes · restrained motion.

## What This Folder Is

The full design system documentation for this project. It is the single source of truth for design decisions: tokens, themes, components, and the principles that tie them together. When code and docs disagree, the docs win; when the docs are silent, the code wins.

## Index

| File | What it covers |
|------|----------------|
| [principles.md](principles.md) | Design philosophy — Google Labs lens, applied to terminal semantics |
| [tokens/](tokens/) | The atomic layer: colors, type, spacing, motion, elevation |
| [themes/](themes/) | The four user-switchable theme variants |
| [components/](components/) | The composite layer: how tokens compose into UI |

## Quick Start

**I want to add a new color.**
1. Add the semantic token to `/home/pablo/vscode/portfolio-terminal/src/styles/global.css` under `:root` (One Dark default).
2. Add it to all 4 themes (`[data-theme="..."]` blocks).
3. Register it in the `@theme` block so Tailwind utilities derive from it.
4. Document it in `tokens/colors.md`.

**I want to add a new component.**
1. Read `principles.md` and `components/README.md`.
2. Use semantic tokens only — never raw hex.
3. Verify in all 4 themes.
4. Document in `components/<name>.md` using the standard anatomy.

**I want to switch a theme or add a new one.**
1. Read `themes/README.md` for the contract.
2. Document the new theme in `themes/<id>.md` with contrast verification.
3. Add the `[data-theme="..."]` block in `global.css` with all 12 semantic tokens + RGB variants.
4. Add metadata in `src/constants/themes.ts`.

**I want to tune motion.**
1. Read `tokens/motion.md` for the rules.
2. Add duration/easing tokens to `:root` in `global.css`.
3. Use them in component CSS or inline styles.

## Visual Identity

| Property | Value |
|----------|-------|
| Primary typeface | JetBrains Mono (mono) + Montserrat (sans) |
| Default theme | One Dark |
| Canvas | `#11151b` (charcoal) |
| Accent | `#77bdfb` (terminal blue) |
| Prompt | `#8fd6b4` (mint) |
| Corner radius | Mostly `0`, occasionally `12-18px` on shell containers |
| Motion | Restrained, 150-300ms, purpose-driven |
| Iconography | Symbols and SVG, never emoji |

## Principles At A Glance

1. **Function defines form.** No element without a job.
2. **Monospace is the grid.** Mono for functional, sans for narrative.
3. **Color is semantic, never decorative.** 12 named roles, never raw hex.
4. **Dark is default, light is a courtesy.** Don't invert dark to make light.
5. **Motion communicates, never performs.** 150-300ms, no decorative loops.
6. **Density without clutter.** Use dividers and spacing, not cards everywhere.
7. **The prompt is the brand.** Get the `$` right.
8. **Content wins, interface recedes.**

Full reasoning in [principles.md](principles.md).

## Implementation Files

```
src/styles/global.css        ← tokens, themes, base reset, animations
src/constants/themes.ts      ← theme metadata, defaults, lookup
src/hooks/useTheme.ts        ← theme persistence + DOM application
```

## Version

1.0 — Initial creation. See `../PRODUCT.md` for product context, `../DESIGN.md` for the system overview.
