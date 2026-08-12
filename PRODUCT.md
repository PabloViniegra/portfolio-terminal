# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

- **Framework**: Astro 5 (static-first, islands architecture)
- **UI Library**: React 19 (island components for interactive parts)
- **Styling**: Tailwind CSS 4 (CSS-first config, no PostCSS plugin)
- **Content**: Astro Content Collections (JSON, Zod-validated)
- **Language**: TypeScript (strict, end-to-end)
- **Build**: Vite (via Astro)
- **Package Manager**: pnpm

## Users

**Primary**: technical recruiters, engineering hiring managers, and technical peers evaluating a fullstack engineer for hire or collaboration. They scan a portfolio in under 90 seconds, looking for: signal of craft (does the engineer sweat details?), stack fluency (do the technologies match the role?), and contact path (how do I reach out?).

**Secondary**: fellow developers who land here from GitHub, blog posts, or word of mouth. They explore deeper - reading project descriptions, checking the GitHub links, sometimes activating the Matrix rain easter egg.

**Tertiary**: the project owner (Pablo Viniegra), maintaining and updating his own portfolio. The Content Collections JSON structure must be editable without touching React code.

## Product Purpose

A terminal-interactive portfolio that demonstrates a fullstack engineer's craft by making the portfolio itself a working artifact. The terminal is not decoration - it is the interface. Every command reflects a real piece of information about the engineer (experience, projects, skills, contact). The product succeeds when a visitor understands both **who Pablo is** and **how he builds** within 30 seconds of landing.

## Positioning

The portfolio is the artifact. Most developer portfolios are LLM-generated card grids; this one ships a real interactive command surface with autocompletion, history navigation, theme switching, and a Matrix rain easter egg - the kind of detail that proves the engineer actually built the thing rather than copying a template. The interactive terminal is the differentiation mechanism: a category-default portfolio would not truthfully claim "I shipped this and you can drive it with `/projects`."

## Operating Context

- **Surface**: single-page application rendered by Astro, hydrated as a React island.
- **Viewport**: desktop-first (terminal metaphor assumes a real keyboard and screen real estate). Mobile shows a warning overlay recommending desktop use, but the terminal still works on mobile.
- **Browser**: modern evergreen browsers (Chrome, Edge, Firefox, Safari). No IE / legacy support.
- **State**: in-memory React state per session. Theme persists in `localStorage`. No server, no auth, no backend.
- **Loading**: skeleton loader while the React island hydrates; theme applied before hydration to avoid FOUC.

## Capabilities and Constraints

- **Commands**: `/home`, `/experience`, `/projects`, `/skills`, `/contact`, `/cv`, `/rain`, `/help`, `/clear`
- **Themes**: 4 built-in themes (One Dark default, Light, Ayu, GitHub Dark) with user-switchable runtime
- **Features**: command autocompletion (Tab), history navigation (arrow keys), command suggestions dropdown, Matrix rain easter egg (Ctrl+C to exit), theme switcher, terminal-style loading delays
- **Content management**: JSON files in `src/content/` (experience, projects, skills, contact, commands, general) validated with Zod schemas
- **Accessibility**: ARIA roles (`application`, `log`, `menu`, `menuitem`), keyboard navigation, screen reader announcements via `aria-live`
- **Performance**: lazy-loaded Matrix rain, skeleton-first render, GPU-friendly animations (transform/opacity only)

## Brand Commitments

- **Aesthetic identity**: terminal-first, monospace-driven, dark by default. The product IS the metaphor.
- **Voice**: bilingual (Spanish UI strings, English technical terminology). Spanish for narrative, English for labels, commands, and technical keywords.
- **Visual restraint**: no decorative gradients, no glow effects, no playful illustrations. Functional decoration only - the prompt symbol `$` is decoration; ASCII rules are decoration that serves alignment.
- **Personality**: confident but understated. The interaction model is the personality, not the copy.
- **No emoji**: zero emoji in code, markup, or visible text. Symbol work goes through semantic tokens or SVG icons only.

## Evidence on Hand

- Real content: experience, projects, skills, and contact data live in `src/content/*.json` - editable, owned, real.
- Real artifact: the portfolio itself, deployed, hydrating as a working terminal.
- GitHub: `https://github.com/PabloViniegra` - linked from `/contact` and project cards.
- LinkedIn: `https://linkedin.com/in/pabloviniegra` - linked from `/contact`.
- CV: `/cv/CV_2026.pdf` - opens on `/cv` command.

Future work must NOT fabricate: customer logos, testimonials, awards, follower counts, or press mentions. The product does not claim them.

## Product Principles

1. **The interface is the artifact.** Every command must do something real. No `/coffee` placeholder. No fake-loading screens for non-actions.
2. **Content is editable, code is owned.** Recruiters and the owner update JSON, not React. Type safety prevents silent breakage.
3. **Dark by default, light on demand.** The terminal metaphor inherits from dark-first interfaces. Light theme is a courtesy, not an inversion of dark.
4. **Performance IS craft.** Lazy-loaded easter eggs, GPU-friendly animations, no scroll jank. A portfolio that lags undermines its own pitch.
5. **Spanish narrative, English mechanism.** Spanish for prose and greetings (the audience is Spanish-speaking), English for technical terminology (it is the lingua franca of the stack). Never mix within a single sentence.

## Accessibility & Inclusion

- WCAG 2.1 AA contrast in all 4 themes (verified per theme; light and dark variants checked independently).
- Keyboard-only operation: every action reachable without a mouse. Tab for autocomplete, arrows for history, Enter to submit, Esc to close suggestions, Ctrl+C to exit rain.
- Screen reader support: terminal announces its role (`application`), output area uses `aria-live="polite"`, command menu uses `role="menu"` with `menuitem` children.
- Mobile fallback: explicit warning that the experience is optimized for desktop, but terminal still usable. No "use desktop" gate.
- Reduced motion: future work should respect `prefers-reduced-motion` for the Matrix rain and any added animation.
