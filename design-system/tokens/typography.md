# Typography Tokens

> **One family, three cuts — shared with my-portfolio.**
> Geist Mono for everything functional, Geist for narrative, Geist Pixel Square for short markers.

## Font Families

Defined in the Tailwind `@theme static` block of `src/styles/global.css`:

```css
--font-sans: 'Geist Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
--font-pixel: 'Geist Pixel Square', 'Geist Mono', monospace;
```

Utilities: `font-sans`, `font-mono`, `font-pixel`.

**Why Geist**: it is the my-portfolio type system. The terminal is embedded in my-portfolio, so any other family would make the iframe boundary visible.

**Loading**: self-hosted from `/public/fonts/` (`GeistVF.woff2`, `GeistMonoVF.woff2`, `GeistPixel-Square.woff2`, OFL 1.1 — see `OFL.txt`) via `@font-face` with `font-display: swap`. Geist and Geist Mono are preloaded in `TerminalLayout.astro`. Never load from a CDN.

## Type Scale

A 7-step scale anchored to `--font-size-base` (16px). All other sizes derive from it via `calc()` for consistency.

| Token | Value | Visual role |
|-------|-------|-------------|
| `--font-size-xs` | `0.6875rem` (11px) | Mono labels, eyebrows, metadata, timestamps |
| `--font-size-sm` | `0.8125rem` (13px) | Mono commands, mono list items |
| `--font-size-base` | `1rem` (16px) | Sans body, default input text, narrative copy |
| `--font-size-md` | `1.125rem` (18px) | Sans subtitle, mono command headings |
| `--font-size-lg` | `1.25rem` (20px) | Sans section title (small) |
| `--font-size-xl` | `1.5rem` (24px) | Sans headline (mobile) |
| `--font-size-2xl` | `2rem` (32px) | Sans headline (desktop) |
| `--font-size-3xl` | `2.5rem` (40px) | Display headline (rare, hero only) |

**The 11px minimum is intentional.** Below 11px, mono fonts lose readability. We never go smaller; if it doesn't fit, we truncate, not shrink.

**Tracking on small mono labels**: `tracking-[0.16em]` to `tracking-[0.22em]` (uppercase). Pixel markers use `tracking-[0.12em]` (my-portfolio `label`).

## Weight Scale

| Token | Value | Used for |
|-------|-------|----------|
| `--font-weight-regular` | `400` | Sans body, narrative paragraphs |
| `--font-weight-medium` | `500` | Sans emphasis, mono command text |
| `--font-weight-semibold` | `600` | Sans headlines, mono `$` prompt |
| `--font-weight-bold` | `700` | Mono strong emphasis (rare) |

Mono fonts render heavier than sans at the same weight. We don't compensate by changing weights — instead, we use mono one step smaller for equivalent visual weight.

## Line Heights

| Token | Value | Used for |
|-------|-------|----------|
| `--line-height-tight` | `1.25` | Headlines, large mono headers |
| `--line-height-snug` | `1.4` | Subheads, mono command lines |
| `--line-height-normal` | `1.5` | Sans body text |
| `--line-height-relaxed` | `1.6` | Long-form sans paragraphs |
| `--line-height-loose` | `1.75` | Very dense narrative (rare) |

## Type Pairing Rules

### Sans (Geist) for narrative
- Welcome message (`text-lg md:text-xl`, semibold, leading-snug)
- Section headlines (`text-2xl md:text-3xl`, semibold, leading-tight)
- Body copy (`text-base`, regular, leading-relaxed)
- Project descriptions (`text-sm`, leading-7)
- Card titles (`text-lg font-semibold leading-snug`)

### Mono (Geist Mono) for everything else
- Commands: `text-sm font-medium`
- `$` prompt symbol: `text-lg font-bold` (visually heavier than commands)
- Timestamps, labels: `text-mono-xs uppercase tracking-[0.18em]`
- Eyebrows (above section titles): `text-mono-xs uppercase tracking-[0.22em]`
### Pixel (Geist Pixel Square), as in my-portfolio
- Every uppercase label (status pill, eyebrows, section dividers, "command input", quick-command labels, header subtitle, section meta): `font-pixel text-mono-sm uppercase tracking-[0.16em]`. 12px is the pixel floor; at 11px the glyph grid blurs.
- Display: hero `./pablo` (`font-pixel text-5xl md:text-7xl uppercase tracking-[-0.03em]` + `.pixel-glow` + `.pixel-cursor`), section verbs in `SectionHeader` (`text-xl md:text-2xl uppercase`, followed by `.section-rule`), header title.
- Never for sentences, body copy or anything longer than one line.

The `text-mono-xs` utility maps to the `--text-mono-xs` Tailwind token (`0.6875rem` / 11px — the readability floor). Use the token, not `text-[11px]` literals.

## Tracking Values

| Token | Value | Used for |
|-------|-------|----------|
| `--tracking-tight` | `-0.025em` | Hero `./pablo` (display only) |
| `--tracking-snug` | `-0.01em` | Body default (`body` letter-spacing) |
| `--tracking-normal` | `0` | Default |
| `--tracking-wide` | `0.04em` | Mono command text |
| `--tracking-label` | `0.12em` | Pixel markers |
| `--tracking-wider` | `0.18em` | Mono labels |
| `--tracking-widest` | `0.22em` | Mono eyebrows, status badges |

**Never use positive tracking on sans body text.** Body uses `-0.01em`, like my-portfolio.

## Hierarchy Examples

```tsx
// Welcome headline (sans, large, tight)
<p className="text-lg font-semibold leading-snug text-terminal-text md:text-xl">
  {welcomeMessage}
</p>

// Mono eyebrow above headline (small caps, wide tracking)
<span className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
  Quick start
</span>

// Section title (sans, medium)
<h2 className="text-2xl font-semibold leading-tight text-terminal-text md:text-3xl">
  Featured builds
</h2>

// Pixel metadata (section meta)
<span className="font-pixel text-mono-sm uppercase tracking-[0.16em] text-terminal-text-secondary">
  {projects.length} builds
</span>

// Command line (mono, medium weight)
<span className="font-mono text-sm font-medium text-terminal-accent">
  {cmd.command}
</span>

// $ prompt (mono, bold, larger)
<span className="font-mono text-lg font-bold text-terminal-prompt">$</span>
```

## Anti-Patterns

❌ **Banned**: Any family outside Geist / Geist Mono / Geist Pixel Square.
❌ **Banned**: Mixing serif into the type system. The terminal is mono + sans only.
❌ **Banned**: Italic emphasis by switching families. Use `font-medium` or `font-semibold` of the same family.
❌ **Banned**: Font sizes below 11px (Mono readability floor).
❌ **Banned**: Tight tracking on body text (kills readability, looks performative).
❌ **Banned**: Decorative display fonts in headlines (Fraunces, Playfair, etc.). When a headline needs character, mono large semibold is enough.
❌ **Banned**: Italic display headings (my-portfolio rule).
❌ **Banned**: Loading fonts from any third-party CDN (Google Fonts, Bunny, etc.). Self-host in `/public/fonts/` — the page must never depend on a runtime fetch to render text.

## Accessibility

- **Base size 16px** on mobile (avoids iOS auto-zoom on input focus).
- **Dynamic Type** support: relative units (`rem`) ensure browser zoom and OS text scaling work without breaking layout.
- **Contrast**: all text/background pairs verified WCAG AA (see colors.md).
- **Truncation**: when text overflows, prefer wrapping over truncation. If truncation is required, use ellipsis with `title=` attribute for full content.
