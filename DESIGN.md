---
name: Portfolio Terminal
description: A working terminal-themed developer portfolio. Monospace-first, semantic colors, four themes, restrained motion.
colors:
  canvas: "#11151b"
  canvas-elevated: "#171d26"
  surface-lift: "#1d2530"
  header-bar: "#0d1117"
  border: "#273142"
  text-primary: "#d5dde8"
  text-secondary: "#7d889c"
  text-tertiary: "#5a6678"
  accent: "#77bdfb"
  prompt: "#8fd6b4"
  warning: "#d8b26b"
  error: "#f38b92"
  success: "#8fd6b4"
typography:
  display:
    fontFamily: "'Mona Sans', system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Mona Sans', system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: "'Mona Sans', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Mona Sans Mono', ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0.22em"
    textTransform: "uppercase"
  mono:
    fontFamily: "'Mona Sans Mono', ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: "0"
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "18px"
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
    rounded: "{rounded.xl}"
    padding: "0"
  terminal-header:
    backgroundColor: "{colors.header-bar}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  command-input-shell:
    backgroundColor: "{colors.canvas-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
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
    rounded: "{rounded.full}"
    padding: "4px 12px"
  quick-command-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  link-default:
    textColor: "{colors.text-secondary}"
  link-hover:
    textColor: "{colors.accent}"
  button-theme-trigger:
    backgroundColor: "{colors.canvas-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
---

# Design System: Portfolio Terminal

## Overview

**Creative North Star: "The Working Shell."**

A developer portfolio that ships as a working artifact. The terminal is the interface; every command reflects a real piece of information about the engineer. The system is built for visitors who will judge the engineering by the engineering — not by typography that pretends to be editorial, not by motion that performs instead of communicates. Mono is the grid, semantic colors carry meaning, dark is the canonical mode, and motion exists only when it answers "what just changed?"

The aesthetic inherits from terminal heritage (Atom One Dark, Alacritty, Ayu Mirage) rather than from editorial or marketing design. This is a tool-shaped surface: precise, functional, restrained. The decorative moments that exist — the cursor blink, the scanline overlay, the loading dots — are all loaded with meaning, not applied for atmosphere.

Three external references ground the visual world: Google Labs products (clarity over decoration, editorial precision), One Dark / GitHub Dark (familiarity for engineers), and Ayu Mirage (warmth without losing structure). The system commits to the terminal metaphor completely — not "a portfolio that looks like a terminal," but a portfolio that IS a working terminal.

**Key Characteristics:**
- **Mono-first typography**: JetBrains Mono carries every functional element; Montserrat only for narrative prose.
- **Semantic color tokens**: 12 named roles (`accent`, `prompt`, `warning`, `error`, etc.), never raw hex in components.
- **Dark by default**: One Dark is the canonical experience; Light/Ayu/GitHub Dark are first-class variants.
- **Borders separate, shadows signal**: hairlines (`1px @ 40-60%` opacity) for content; one heavy shadow lifts the terminal shell off the page.
- **No decorative motion**: every animation has a job. Cursor blinks. Loading dots signal "still working." Theme switch fades. Nothing else moves without permission.
- **Information density**: dense enough for a recruiter scan in 90 seconds, never cluttered.

## Colors

The palette is dark, low-chroma, and family-bound. Charcoal canvas, terminal blue accent, mint prompt — every color ties back to the same cool/green family so the system reads as one identity even when the eye moves between regions.

### Primary
- **Terminal Blue** (`{colors.accent}` `#77bdfb`): Interactive accents — links on hover, focused inputs, active command verbs, "open to roles" status pill. Used sparingly so its appearance carries weight. Restrained saturation (~70% lightness) reads as professional, not toy.

### Tertiary
- **Mint Prompt** (`{colors.prompt}` / `{colors.success}` `#8fd6b4`): The affordance color. The `$` symbol, the blinking cursor, success states, completed actions. Calm and inviting — never aggressive green. Reserved; never repurposed for emphasis.
- **Soft Amber** (`{colors.warning}` `#d8b26b`): Pending state, soft warnings. Muted amber that signals "heads up" without screaming "alarm."

### Error
- **Coral Red** (`{colors.error}` `#f38b92`): Errors, "command not found", destructive actions. Warm coral, not bright red — readable on dark without becoming hostile.

### Neutral
- **Charcoal Canvas** (`{colors.canvas}` `#11151b`): Terminal body and page background. Slight blue undertone ties to the accent family.
- **Panel Surface** (`{colors.canvas-elevated}` `#171d26`): Inner panels, command input shell, theme switcher trigger.
- **Elevated Surface** (`{colors.surface-lift}` `#1d2530`): Dropdowns, suggestion popovers.
- **Header Bar** (`{colors.header-bar}` `#0d1117`): Terminal title bar — one shade deeper than canvas to feel recessed.
- **Border** (`{colors.border}` `#273142`): 1px separators, container outlines. Always used at reduced opacity (`40-90%`) for visual softness.
- **Primary Text** (`{colors.text-primary}` `#d5dde8`): Body content, commands, headlines.
- **Secondary Text** (`{colors.text-secondary}` `#7d889c`): Metadata, labels, hints, timestamps, eyebrows. The most-used neutral.
- **Tertiary Text** (`{colors.text-tertiary}` `#5a6678`): Disabled state, placeholders only. Fails AA for body text by design — intentional reduction.

### Named Rules
**The Prompt-Reserved Rule.** The mint prompt color (`{colors.prompt}`) belongs only to the `$` symbol, the blinking cursor, and success states. Never use it for emphasis, links, or buttons — its rarity is what makes it signal affordance.

**The Accent-Restraint Rule.** The primary accent appears on verbs, never nouns. `{colors.accent}` highlights commands, links, and active states — not individual words inside prose. When the accent fills more than ~10% of any viewport, the page has lost its hierarchy.

**The Never-Pure-Black Rule.** Charcoal, not `#000000`. Pure black disconnects from the accent family. Every dark surface uses one of the four charcoal tones (`{colors.canvas}`, `{colors.canvas-elevated}`, `{colors.surface-lift}`, `{colors.header-bar}`) to stay within the palette.

## Typography

**Display Font:** Mona Sans (self-hosted, OFL 1.1) — GitHub's variable sans, designed for product UIs adjacent to code. Width, optical size and weight axes; reads precise without being cold. Fallback: `system-ui, -apple-system, 'Segoe UI', sans-serif`.

**Body Font:** Mona Sans (same family as display; weights 400-700).

**Mono Font:** Mona Sans Mono (self-hosted, OFL 1.1) — GitHub's mono companion to Mona Sans. Width and weight axes; ligature-aware, designed to sit next to code. Fallback: `ui-monospace, 'Cascadia Code', 'JetBrains Mono', Menlo, Consolas, monospace`.

**Character:** Mona Sans + Mona Sans Mono were drawn as a pair — the metrics line up, the temperature matches, and a paragraph in sans followed by a mono label sits without a visible seam. The pair reads "engineer-made-this", which is exactly the pitch. Self-hosted, no CDN dependency, no Google Fonts runtime cost.

**Why we moved off Montserrat + JetBrains Mono:** both are defensible but became the LLM-default pair — any random generator picks them. Mona Sans/Mono is a curated choice that says "this engineer picked the typography on purpose" without paying for a foundry license.

### Hierarchy
- **Display** (`{typography.display}`, semibold, `2rem` / `clamp`, line-height `1.25`, tracking `-0.02em`): Hero headlines only. Used in the welcome message; not reused elsewhere.
- **Headline** (`{typography.headline}`, semibold, `1.5rem`, line-height `1.375`): Section titles (project names in cards, section names in `/help`).
- **Body** (`{typography.body}`, regular, `1rem`, line-height `1.5`): Narrative copy — welcome message, project descriptions, contact prose. Body text in mono appears at `0.875rem` (`text-sm`).
- **Label** (`{typography.label}`, regular, `0.6875rem` / 11px, tracking `0.22em`, uppercase): Eyebrows, status pills, metadata, timestamps, small-caps headers. The minimum size for mono readability. Never goes smaller.
- **Mono** (`{typography.mono}`, regular, `0.875rem` / 14px, line-height `1.4`): Commands, command lines, inline metadata, code-adjacent prose. The workhorse of the terminal metaphor.

### Named Rules
**The Pairing-Discipline Rule.** When a paragraph uses sans body, the labels around it (eyebrow, status, count) use mono. Visual rhythm is mono label → sans content → mono metadata. Mixing families inconsistently (mono label with sans body, or vice versa) is amateur.

**The Mona-Pair Rule.** Mona Sans and Mona Sans Mono are the only typefaces for this system. Both are self-hosted from `/public/fonts/`. Loading goes through `@font-face` with `font-display: swap` and a `<link rel="preload">` in the layout — never a CDN, never a Google Fonts import. Inter is not an acceptable substitute (it doesn't pair with Mona Mono); Montserrat, Geist, Söhne, IBM Plex and JetBrains Mono are all acceptable substitutes if the brief explicitly demands them, which this one does not.

## Layout

Single-page surface. The terminal shell is the entire layout — no sidebar, no nav rail, no auxiliary chrome. Outer page padding (`24px` desktop, `8px` mobile) frames the shell; the shell itself fills the remaining space (`80vh`, max-height `800px`).

Inside the shell, three regions stack vertically:
1. **Header** (`48px` tall): traffic-light dots, title + subtitle, status pill, theme switcher, avatar.
2. **Body** (`flex: 1`, scrollable): command history with input + output pairs.
3. **Footer** (`auto`): command input shell.

Container width is `max-w-5xl` (`1024px`). Body inner content caps at `max-w-4xl` (`768px`) for narrative sections; metadata rows use `max-w-3xl` (`768px` column for descriptions). The welcome message column is `max-w-3xl` (`768px`).

Spacing rhythm is a 4px base, 8px rhythm: `4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64px`. Vertical section gaps in dense content are `8px` (`space-2`); between unrelated groups, `24-32px`. Inter-element gap is `4-8px` for related items, `12-16px` for unrelated. Mobile (< 768px) compresses outer padding but never the base scale.

The grid is monospace-driven: command lines, eyebrows, and metadata align on monospace character widths. Hairline dividers (`1px` at 40-60% opacity of `{colors.border}`) separate content groups without becoming heavy lines.

## Elevation & Depth

**The Flat-By-Default Rule.** Surfaces are flat at rest. Depth is conveyed through tonal layering and a single heavy shadow that lifts the terminal shell off the page. Cards, panels, and dropdowns do not cast shadows of their own — they use `{colors.canvas-elevated}` or `{colors.surface-lift}` to differentiate from `{colors.canvas}`.

The terminal shell carries the only significant shadow in the system:

```
box-shadow:
  0 28px 80px rgba(3, 6, 11, 0.48),
  inset 0 1px 0 rgba(255, 255, 255, 0.04);
```

- Outer shadow (`0 28px 80px rgba(3,6,11,0.48)`) lifts the shell from the page. Tinted to a deep near-black (`#03060b`) — never pure `#000`.
- Inner highlight (`inset 0 1px 0 rgba(255,255,255,0.04)`) catches light at the top edge, giving the shell a glass / CRT feel.

Dropdown menus (theme switcher, suggestion popover) use a secondary shadow: `0 10px 15px -3px rgba(0,0,0,0.1)`. Subtler than the shell — dropdowns are auxiliary, the shell is the hero.

No outer glows. No neon. No floating shadows that follow the cursor. Depth is committed: terminal shell lifts, inner panels tone-shift, dropdowns soften.

## Shapes

The form language is mono-grid-aligned. Most surfaces are `radius: 0` — monospace labels, command lines, dividers, and inline metadata carry no rounding. The terminal shell itself is `radius: 18px` (`{rounded.xl}` desktop, `16px` / `{rounded.lg}` mobile) — the only significant corner radius in the system.

Inner panels (command input shell, suggestion popover) use `12-16px` (`{rounded.md}` / `{rounded.lg}`). Pills (status badges, quick command pills) use `9999px` (`{rounded.full}`) — the second and final shape family.

**The Shape-Consistency Rule.** Mono labels are always `radius: 0`. Pills are always full-radius. Inner panels are always `12-16px`. The terminal shell is always `18px`. Mixed shapes within the same component family (rounded pill next to sharp pill) are broken design.

Borders are `1px` at reduced opacity — never bold `2-3px` strokes. The only exceptions are the outer shell border (`1px` solid `{colors.border}`) and the focus ring on interactive elements (`focus:ring-1` with `{colors.accent}` at 50% opacity).

## Components

### Terminal Shell
- **Character:** The frame of the entire product. Everything else lives inside it.
- **Shape:** `radius: 18px` (desktop), `16px` (mobile); 1px border in `{colors.border}`.
- **Color:** `{colors.canvas}` background with the heavy shadow; header bar uses `{colors.header-bar}`.
- **Padding:** outer page padding `24px` (desktop), `8px` (mobile).
- **States:** Loading (skeleton), Ready (welcome message), Executing (input disabled + loading dots), Rain Active (matrix canvas overlay).

### Command Input
- **Character:** The user's primary interaction point. The `$` prompt + text field + suggestion popover.
- **Shape:** Inner shell `radius: 16px`; 1px border in `{colors.border}` at 80% opacity.
- **Color:** shell background `{colors.canvas-elevated}` at 45% opacity over canvas; `$` symbol `{colors.prompt}`; input text `{colors.text-primary}`; caret `{colors.cursor}`.
- **States:** Idle (placeholder visible), Typing (suggestions filter in real-time), Suggestions Open (first item highlighted), Loading (input disabled).

### Section Output
- **Character:** Renders structured content based on the active command. One renderer routes to four content types.
- **Shape:** `radius: 0` for command-line headers; `radius: 12px` for nested cards (used in `/help` command list).
- **Color:** Section header uses prompt + accent + secondary text; dividers use `{colors.border}` at 40-60% opacity.
- **Padding:** Vertical gap between commands `24-32px`; command header bottom margin `20px` (`mb-5`).

### Theme Switcher
- **Character:** The only persistent control that lets the visitor change the world.
- **Shape:** Trigger `radius: 8px`; dropdown `radius: 12px` with `8px` width.
- **Color:** Trigger uses `{colors.canvas-elevated}` at 60% opacity + `{colors.border}` border; dropdown uses `{colors.canvas}` at 95% + backdrop-blur 8px.
- **States:** Closed (shows current theme), Open (dropdown visible), Selected item highlighted with `{colors.accent}` at 12% opacity.

### Status Pill
- **Character:** Small caps badge signaling current state ("ready", "open to roles", "primary").
- **Shape:** `radius: 9999px` (full pill).
- **Color:** Background `{colors.canvas}`; border `{colors.border}` at 70% opacity; text `{colors.text-secondary}`.
- **Padding:** `4px 12px`.
- **Typography:** `{typography.label}` (mono 11px uppercase tracking 0.2em).

### Quick Command Pill
- **Character:** Clickable pill that runs a command. Used in the welcome message for one-click access.
- **Shape:** `radius: 9999px`.
- **Color:** Background `{colors.canvas}`; border `{colors.border}` at 70% opacity; hover border `{colors.accent}` at 40% opacity; hover text `{colors.accent}`.
- **Padding:** `6px 12px`.
- **Typography:** Command mono 12px, label sans 11px.

### Eyebrow (Mono Label)
- **Character:** Small uppercase mono label above section headlines.
- **Shape:** `radius: 0`. No border.
- **Color:** `{colors.text-secondary}`.
- **Typography:** `{typography.label}` (mono 11px uppercase tracking 0.22em).
- **Discipline:** Maximum 1 per 3 sections. Hero counts as 1.

### Hairline Divider
- **Character:** Subtle separator between content groups.
- **Color:** `{colors.border}` at 40-60% opacity.
- **Shape:** 1px height.
- **When:** Between major section groups, between list rows in dense content. Never between adjacent items of the same group.

## Do's and Don'ts

### Do:
- **Do** use semantic tokens (`bg-terminal-bg`, `text-terminal-text`, `border-terminal-border`) for every color application. Tailwind utilities derive from the frontmatter automatically.
- **Do** reach for `{colors.accent}` on verbs, links, and active states — never on nouns within prose.
- **Do** use mono for every functional element (commands, prompts, metadata, labels, eyebrows, code, timestamps). Use sans only for narrative.
- **Do** preserve the 4px base / 8px rhythm spacing scale. Never use arbitrary values (`mt-[13px]`) for layout.
- **Do** verify contrast against `{colors.canvas}` for any new color addition — WCAG AA minimum (`4.5:1` body, `3:1` large text and UI elements).
- **Do** test new components in all 4 themes before shipping. Each theme defines its own token values; verification must happen per-theme.
- **Do** keep the terminal shell as the only heavy shadow on the page. Other surfaces use tonal layering.
- **Do** use the `{typography.label}` pattern (mono 11px uppercase tracking 0.22em) for any new mono label. The 11px floor is the readability minimum.
- **Do** verify `prefers-reduced-motion` for any new animation. Motion above `150ms` must collapse to instant under reduced-motion preference.

### Don't:
- **Don't** use raw hex values in component markup. Reach for the semantic token via Tailwind utility or `var(--terminal-*)`.
- **Don't** add emoji as icons, decorative elements, or in copy. Symbols (`$`, `→`, `·`, `×`) and SVG only.
- **Don't** mix families inconsistently. If a paragraph is sans body, its labels are mono. If a list item is mono, its description can be sans.
- **Don't** use Inter as the default sans. Mona Sans is the default; Inter only when the brief explicitly demands Linear-style neutrality.
- **Don't** load fonts from a third-party CDN (Google Fonts, Bunny, etc.). Self-host in `/public/fonts/` so the page never depends on a runtime fetch to render text.
- **Don't** add multiple heavy shadows on stacked elements. The terminal shell carries the only significant shadow.
- **Don't** introduce gradients on text, borders, or large headers. The terminal metaphor is solid color + subtle inset highlights.
- **Don't** use `linear-gradient` or `radial-gradient` for decorative purposes. The page background uses subtle gradients (terminal grid + radial accent fade) for atmosphere; component surfaces do not.
- **Don't** animate `width`, `height`, `top`, `left`, `margin`, or `padding`. Animate `transform` and `opacity` only — these are GPU-friendly and preserve 60fps.
- **Don't** create infinite decorative loops. The cursor blinks; the Matrix rain animates only on explicit `/rain` activation. Nothing else loops without a user-facing reason.
- **Don't** use arbitrary z-index (`z-50` everywhere). Use the documented elevation scale (`z-base`, `z-sticky`, `z-dropdown`, `z-overlay`, `z-modal`, `z-toast`).
- **Don't** add new motion durations outside the `--motion-*` tokens. The scale (`instant: 0ms`, `fast: 150ms`, `base: 200ms`, `medium: 300ms`, `slow: 400ms`, `cursor: 1000ms`) exists to prevent drift.
