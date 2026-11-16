---
name: Portfolio Terminal
description: A working terminal-themed developer portfolio. Inherits the my-portfolio design system (CRT amber phosphor + warm paper, Geist), two themes, restrained motion.
source-of-truth: ~/vscode/my-portfolio/DESIGN.md
colors:
  canvas: "#09090b"
  canvas-elevated: "#18181b"
  surface-lift: "#27272a"
  header-bar: "#03030a"
  border: "rgb(255 149 0 / 0.28)"
  text-primary: "#f4f4f5"
  text-secondary: "#a1a1aa"
  text-tertiary: "#71717a"
  accent: "#ff9500"
  prompt: "#fbbf24"
  warning: "#f59e0b"
  error: "#f87171"
  success: "#fbbf24"
typography:
  display:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: "3.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  pixel:
    fontFamily: "'Geist Pixel Square', 'Geist Mono', monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.12em"
    textTransform: "uppercase"
  label:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0.22em"
    textTransform: "uppercase"
  mono:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: "0"
  full: "9999px"
spacing:
  0: "0"
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
components:
  terminal-shell:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "0"
  terminal-header:
    backgroundColor: "{colors.header-bar}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  command-input-shell:
    backgroundColor: "{colors.canvas-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  prompt-symbol:
    textColor: "{colors.prompt}"
    typography: "{typography.mono}"
  command-output:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    typography: "{typography.mono}"
    rounded: "{rounded.none}"
  status-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.none}"
    padding: "4px 12px"
  quick-command-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  link-default:
    textColor: "{colors.text-secondary}"
  link-hover:
    textColor: "{colors.accent}"
  button-theme-trigger:
    backgroundColor: "{colors.canvas-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
---

# Design System: Portfolio Terminal

## Overview

**Creative North Star: "The Working Shell."**

A developer portfolio that ships as a working artifact. The terminal is the interface; every command reflects a real piece of information about the engineer. Mono is the grid, semantic colors carry meaning, dark is the canonical mode, and motion exists only when it answers "what just changed?"

**This project is a satellite of `my-portfolio`.** It is embedded in my-portfolio's terminal window dialog (`src/sections/terminal-window/`) via iframe, so it must read as the same product. `~/vscode/my-portfolio/DESIGN.md` is the source of truth: when the two documents disagree, my-portfolio wins and this file gets updated.

In my-portfolio terms, the terminal is a **phosphor surface** — a tool, not editorial content: CRT void + amber, Geist Mono, no glassmorphism, no re-drawn OS chrome. The **paper** theme exists so the terminal can also match my-portfolio's light reading surface when opened standalone.

**Key Characteristics:**
- **Shared palette**: amber `primary-50…950` + zinc neutrals, copied verbatim from my-portfolio's `tailwind.config.mjs`.
- **Shared type family**: Geist Variable (body), Geist Mono (functional), Geist Pixel Square (short uppercase markers).
- **Semantic color tokens**: components consume `--terminal-*` roles, never palette primitives or hex.
- **Two themes**: `phosphor` (default, dark) and `paper` (light). Nothing else.
- **Pixel-aligned rectangles**: radius `0` everywhere except status dots.
- **No decorative motion**: cursor blinks, loading dots signal "still working", theme switch fades. Durations and easings mirror my-portfolio.

## Colors

Two surfaces, one accent. Monochrome amber; no blue, mint, purple or cyan. Values are defined once as primitives (`--palette-*`) in `src/styles/global.css` and assigned to semantic roles per theme.

### Phosphor (default)

| Role | Token | Value | Contrast on canvas |
|---|---|---|---|
| Canvas | `--terminal-bg` | `zinc-950` `#09090b` | — |
| Panel | `--terminal-bg-secondary` | `zinc-900` `#18181b` | — |
| Elevated | `--terminal-bg-elevated` | `zinc-800` `#27272a` | — |
| Header bar | `--terminal-header-bg` | `surface.void` `#03030a` | — |
| Border | `--terminal-border` | `primary-500` @ 28% | — |
| Text | `--terminal-text` | `zinc-100` `#f4f4f5` | 18.1:1 |
| Text secondary | `--terminal-text-secondary` | `zinc-400` `#a1a1aa` | 7.8:1 |
| Text tertiary | `--terminal-text-tertiary` | `zinc-500` `#71717a` | 4.1:1 (placeholders/disabled only) |
| Accent | `--terminal-accent` | `primary-500` `#ff9500` | 9.1:1 |
| Prompt / success | `--terminal-prompt` | `primary-400` `#fbbf24` | 11.9:1 |
| Warning | `--terminal-warning` | `accent-500` `#f59e0b` | 9.3:1 |
| Error | `--terminal-error` | `#f87171` | 7.2:1 |

### Paper

| Role | Token | Value | Contrast on canvas |
|---|---|---|---|
| Canvas | `--terminal-bg` | paper `#fffcf5` | — |
| Panel / elevated | `--terminal-bg-secondary` | `#ffffff` | — |
| Header bar | `--terminal-header-bg` | `primary-50` `#fffbeb` | — |
| Border | `--terminal-border` | `zinc-300` `#d4d4d8` | — |
| Text | `--terminal-text` | ink `#221f1b` | 16.0:1 |
| Text secondary | `--terminal-text-secondary` | `zinc-600` `#52525b` | 7.5:1 |
| Text tertiary | `--terminal-text-tertiary` | `zinc-500` `#71717a` | 4.7:1 |
| Accent / warning | `--terminal-accent` | `primary-700` `#b45309` | 4.9:1 |
| Prompt / success | `--terminal-prompt` | `primary-800` `#92400e` | 6.9:1 |
| Error | `--terminal-error` | `#b91c1c` | 6.3:1 |

### Named Rules
**The One-Accent Rule.** Amber is the only hue. Prompt, accent, warning and success are shades of the same family; hierarchy comes from shade and position, not from new hues.

**The Error Exception.** my-portfolio has no error color, but a shell must say "command not found" unambiguously. Error red (`#f87171` / `#b91c1c`) is the single non-amber hue and is reserved for errors.

**The Accent-Restraint Rule.** The accent appears on verbs (commands, links, active states), never on nouns inside prose. When amber fills more than ~10% of a viewport, hierarchy is lost.

**The Never-Pure-Black/White Rule.** Phosphor uses `zinc-950`/`surface.void`, paper uses `#fffcf5`. Never `#000` or `#fff` as canvas (white is allowed only for raised panels on paper).

## Typography

- **Body / UI:** Geist Variable (400 base, 500–600 emphasis), tracking `-0.01em`.
- **Mono:** Geist Mono — commands, prompts, metadata, code, the hero `./pablo` line. The workhorse.
- **Pixel display:** Geist Pixel Square (500) — hero `./pablo`, section verbs, header title and every uppercase label. Labels `0.16em` tracking at 12px; display sizes tighten to negative tracking.

All three are self-hosted from `/public/fonts/` (OFL 1.1, Vercel) with `@font-face` + `font-display: swap`; Geist and Geist Mono are preloaded in `TerminalLayout.astro`. Never load from a CDN.

### Hierarchy
- **Display** (mono semibold, `text-4xl`→`md:text-6xl`, `tracking-tight`): welcome hero only.
- **Body** (`1rem`, line-height `1.5`): narrative copy. Mono body sits at `0.875rem`.
- **Label** (mono `0.6875rem`/11px, uppercase, tracking `0.16–0.22em`): eyebrows, status, hints. The 11px floor is the readability minimum.
- **Pixel** (`font-pixel`, ≥12px uppercase, tracking `0.16em`): one-line markers and display. Never for sentences.

### Named Rules
**The Geist-Family Rule.** Geist, Geist Mono and Geist Pixel Square are the only typefaces. Don't ship a fourth.

**The Pairing-Discipline Rule.** Rhythm is mono label → sans/mono content → mono metadata. Pixel never carries running text.

**No italics on headings.** Emphasis is weight or accent color.

## Layout

Single-page surface. The terminal shell is the entire layout. Outer page padding (`24px` desktop, `8px` mobile); shell is `80vh`, max `800px`, container `max-w-5xl`.

Inside the shell, three regions stack vertically:
1. **Header**: amber signal dot, title + pixel subtitle, status pill, theme switcher, fullscreen, avatar.
2. **Body** (`flex: 1`, scrollable): command history.
3. **Footer**: command input shell.

The page background is the my-portfolio backdrop grid (`body::before`, 32px cells, amber at 6% alpha (paper 5%), as in my-portfolio), hidden under `prefers-reduced-motion`.

Spacing: 4px base, 8px rhythm (`4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64px`). Hairlines are `1px` of `--terminal-border` at 40–90% opacity.

## Elevation & Depth

**The Flat-By-Default Rule.** Depth comes from tonal steps (`bg` → `bg-secondary` → `bg-elevated`). Only the shell and dropdowns cast a shadow, both via `--shadow-terminal` (`.terminal` and the `shadow-(--shadow-terminal)` utility, so paper's override applies):

- Phosphor: `0 28px 90px -34px` black @ 90% + `0 0 40px` amber @ 10% — identical to my-portfolio's `.terminal-window__panel`.
- Paper: `0 28px 80px -34px` `zinc-900` @ 22%.

`shadow-glow-sm` (amber @ 22%) is reserved for status indicators (header signal dot). No glassmorphism (`backdrop-blur`) on chrome; the only blur is the content scrim while Matrix rain is active.

## Shapes

Pixel-aligned rectangles: radius `0` on the shell, panels, pills, buttons and dropdowns (matches my-portfolio's command palette and terminal window). `rounded-full` survives only on small status dots (signal, status pill dot, theme swatch, loader bars). Borders are always `1px`.

## Components

### Terminal Shell
- Rectangular, 1px `--terminal-border`, `--shadow-terminal`, canvas background; header uses `--terminal-header-bg`.
- **No traffic-light dots** (my-portfolio: "don't re-draw OS chrome"). A single amber signal dot with `shadow-glow-sm` marks the live session.
- States: Loading, Ready, Executing (input disabled + loading dots), Rain Active.

### Command Input
- Rectangular panel, `--terminal-bg-secondary` @ 60%, border @ 80%, focus-within border `--terminal-accent` @ 40%.
- `$` in `--terminal-prompt`, caret `--terminal-cursor`.

### Section Output
- Command header: `$` prompt + pixel uppercase accent verb + secondary args + `.section-rule` + pixel meta.
- Nested cards: rectangular, border @ 60–70%, panel @ 60%.

### Theme Switcher
- Trigger and dropdown rectangular. Swatches use palette utilities: `bg-primary-500` (Phosphor), `bg-paper ring-1 ring-primary-700` (Paper).
- Selected item: accent @ 10% background, accent text.

### Status Pill / Quick Command
- Rectangular, 1px border, mono label typography. Status dot stays round.

## Do's and Don'ts

### Do:
- **Do** use semantic utilities (`bg-terminal-bg`, `text-terminal-accent`, `border-terminal-border`) in components; palette utilities (`bg-primary-500`, `bg-paper`) only for theme identity.
- **Do** add new colors as `--palette-*` primitives first, then assign a semantic role in both themes.
- **Do** check my-portfolio's DESIGN.md before introducing a new token or pattern.
- **Do** verify every component in both themes (WCAG AA: 4.5:1 text, 3:1 UI).
- **Do** list transition properties explicitly (`transition-[color,border-color]`).
- **Do** gate decorative effects behind `prefers-reduced-motion`.

### Don't:
- **Don't** use raw hex or `rgb()` in components.
- **Don't** add blue/mint/purple/cyan or gradients on text, borders or surfaces.
- **Don't** add `transition-all`, bounce or elastic easings.
- **Don't** draw traffic lights, URL pills or other OS chrome.
- **Don't** use `backdrop-blur` on chrome or rounded corners on panels.
- **Don't** add themes beyond `phosphor` and `paper` unless my-portfolio adds the surface first.
- **Don't** add durations outside the `--motion-*` tokens (`instant 100`, `fast 160`, `base 200`, `medium 300`, `cursor 1100ms`).
- **Don't** use emoji as icons. Symbols (`$`, `→`, `·`, `×`) and SVG only.
