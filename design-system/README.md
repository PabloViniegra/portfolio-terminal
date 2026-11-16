# Design System

> **Design system for the `portfolio-terminal` project, derived from my-portfolio.**
> CRT amber phosphor + warm paper · Geist · semantic tokens · two themes · restrained motion.

## What This Folder Is

The full design system documentation for this project. It is the single source of truth for design decisions: tokens, themes, components, and the principles that tie them together. When code and docs disagree, the docs win; when the docs are silent, the code wins. Above both sits `~/vscode/my-portfolio/DESIGN.md`: this terminal is embedded in my-portfolio and must follow its system.

## Index

| File | What it covers |
|------|----------------|
| [principles.md](principles.md) | Design philosophy — Google Labs lens, applied to terminal semantics |
| [tokens/](tokens/) | The atomic layer: colors, type, spacing, motion, elevation |
| [themes/](themes/) | Phosphor (default) and Paper |
| [components/](components/) | The composite layer: how tokens compose into UI |

## Quick Start

**I want to add a new color.**
1. Check my-portfolio's palette first; add the raw value as a `--palette-*` primitive in `src/styles/global.css`.
2. Assign the semantic role in `:root` (Phosphor) and `[data-theme="paper"]`.
3. Register it in the `@theme inline` block so Tailwind utilities derive from it.
4. Document it in `tokens/colors.md`.

**I want to add a new component.**
1. Read `principles.md` and `components/README.md`.
2. Use semantic tokens only — never raw hex.
3. Verify in both themes.
4. Document in `components/<name>.md` using the standard anatomy.

**I want to add a new theme.**
Don't, unless my-portfolio adds the surface first. Then follow `themes/README.md`: document `themes/<id>.md` with contrast, add the `[data-theme="..."]` block, add metadata in `src/constants/themes.ts` and the id to the inline script in `index.astro`.

**I want to tune motion.**
1. Read `tokens/motion.md` for the rules.
2. Reuse the `--motion-*` durations and `--ease-*` easings (mirrors of my-portfolio).
3. Use them in component CSS or inline styles.

## Visual Identity

| Property | Value |
|----------|-------|
| Typefaces | Geist Mono + Geist + Geist Pixel Square — self-hosted OFL |
| Default theme | Phosphor |
| Canvas | `#09090b` (zinc-950) / `#fffcf5` (paper) |
| Accent | `#ff9500` (CRT amber) / `#b45309` (dark amber) |
| Prompt | `#fbbf24` / `#92400e` |
| Corner radius | `0` everywhere; `full` only on status dots |
| Motion | Restrained, 100-300ms, my-portfolio easings |
| Iconography | Symbols and SVG, never emoji |

## Principles At A Glance

1. **Function defines form.** No element without a job.
2. **Monospace is the grid.** Mono for functional, sans for narrative.
3. **Color is semantic, never decorative.** One amber accent, semantic roles, never raw hex.
4. **Dark is default, light is a courtesy.** Don't invert dark to make light.
5. **Motion communicates, never performs.** ≤ 300ms, no decorative loops.
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
