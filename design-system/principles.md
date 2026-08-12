# Design Principles

> **The Google Labs lens, applied to a terminal.**
> Every rule below has a reason. Every reason ties to either Google Labs craft or terminal semantics. When in doubt, the product's purpose wins.

---

## 1. Function Defines Form

**Rule**: No element exists without a job. Decoration that does not communicate is cut.

**Why (Google Labs)**: Google Labs products (NotebookLM, Experiments, AI Studio) lead with clarity. The interface disappears; the work is the interface. A portfolio terminal takes this literally — the command surface IS the work.

**In practice**:
- `$` symbol = prompt affordance (functional, not decorative)
- Cursor blink = live state (functional, not decorative)
- Scanline overlay = subtle texture that ties to CRT heritage (acceptable decoration: it telegraphs the metaphor)
- Loading delay before command output = functional: simulates real shell behavior, signals "this is a terminal"

**Banned**:
- ❌ Random icon ornaments (no SVG decorations that don't aid recognition)
- ❌ "Aesthetic" glow effects on hover
- ❌ Particle effects outside the Matrix rain easter egg
- ❌ Gradient borders, gradient text, multi-stop shadows

---

## 2. Monospace is the Grid

**Rule**: All functional typography uses monospace. Sans-serif appears only for narrative content where monospace would feel punitive.

**Why (Terminal semantics)**: Monospace is the visual grammar of terminals. Alignment is built-in. Code, paths, commands, and metadata read better in mono. Google's developer tools (Cloud Console, Cloud Shell, Firebase Studio terminal) lean hard into mono for the same reason.

**Hierarchy by mode**:
- **Mono**: commands, prompts, paths, code, timestamps, labels, metadata, eyebrows, status badges, status pills
- **Sans**: welcome prose, section narrative copy, project descriptions, body text

**Type pairing rules**:
- Both fonts at the same optical size feel different. Mono runs ~5% larger visually. Compensate by setting mono one step smaller for the same visual weight, or accept the slight bulk.
- `Montserrat` for narrative is a deliberate choice: humanist, modern, restrained. Not the LLM default of Inter.

---

## 3. Color is Semantic, Never Decorative

**Rule**: Every color carries meaning. Reuse semantic tokens across components; raw hex is reserved for theme definitions only.

**Why (Google Labs)**: Semantic tokens scale. When the brand color changes, every component follows. When accessibility requires a contrast bump, one variable changes. The alternative — raw hex scattered across components — is unmaintainable.

**Semantic color roles** (in this system):
| Token | Role | Where it shows up |
|-------|------|-------------------|
| `--terminal-bg` | Canvas | Terminal body, page background |
| `--terminal-bg-secondary` | Surface | Inner panels, header, command input shell |
| `--terminal-bg-elevated` | Elevated surface | Dropdowns, suggestions |
| `--terminal-border` | Divider | 1px separators, container outlines |
| `--terminal-text` | Primary text | Body content, commands, headlines |
| `--terminal-text-secondary` | Secondary text | Metadata, labels, hints, time stamps |
| `--terminal-text-tertiary` | Tertiary text | Disabled state, placeholder |
| `--terminal-accent` | Interactive | Links, focused inputs, active command |
| `--terminal-prompt` | Affordance | `$` symbol, success states, cursor |
| `--terminal-warning` | Caution | Pending states, soft warnings |
| `--terminal-error` | Destructive | Errors, "command not found" |
| `--terminal-success` | Positive | Confirmations, "command executed" |

**Saturation rule**: Accent colors stay below 80% saturation in light themes and below 90% in dark themes. The terminal metaphor rewards restraint — a fully saturated neon blue would feel like a toy, not a tool.

---

## 4. Dark is Default, Light is a Courtesy

**Rule**: One Dark is the canonical experience. Light mode is offered but never inverted-for-inversion's-sake.

**Why (Terminal semantics + Google Labs)**: Terminals are dark-first interfaces. A light terminal that just inverts dark feels wrong because the relationships between colors change (shadows are less visible, contrast inverts weirdly). Google's developer products respect this: dark is canonical, light exists but reads differently.

**Implementation discipline**:
- Do NOT take a dark theme and invert it. Re-pick colors with the dark theme's relationships in mind.
- Light themes should reduce visual noise: lighter backgrounds, slightly less contrast in the secondary text.
- Both themes must pass WCAG AA independently. Never assume dark colors work in light context.

---

## 5. Motion Communicates, Never Performs

**Rule**: Every animation answers "what just changed?" If the answer is unclear, the animation is decorative — cut it.

**Why (Google Labs)**: Google's design system documentation is explicit: motion should be fast, purposeful, and interruptible. A 400ms fade-in that the user does not register as transition is waste. A bouncing button that draws attention to itself instead of the action is noise.

**Motion budget for this system**:
- Cursor blink: `1s`, infinite (only the cursor; nothing else blinks)
- Command output fade-in: `150-200ms` ease-out (signals "this appeared")
- Theme switch transition: `300ms` on background-color and color (signals "the world changed")
- Hover state: `150ms` color/border transition (signals "this is interactive")
- Loading dots: `1.5s` staggered (functional: signals "still working")
- Matrix rain: only on explicit user activation (`/rain`). Never on load. Never as decoration.

**Banned**:
- ❌ Bouncing animations
- ❌ Spring physics on UI chrome (buttons, links, inputs)
- ❌ Parallax without purpose
- ❌ Infinite decorative loops (Matrix rain is the only allowed loop, and only when activated)
- ❌ Animations > 500ms

**Reduced motion**: respect `prefers-reduced-motion`. Matrix rain collapses to a static field. Cursor blink stops. Hover transitions reduce to instant color change. This is future work but should be designed in.

---

## 6. Density Without Clutter

**Rule**: Pack information tightly, but separate concerns with whitespace, dividers, or surface changes. Never pile text on text without a breathing signal.

**Why (Google Labs + terminal semantics)**: Terminal output is information-dense by nature — `ls -la` lists 50+ rows without complaint. But each row has clear alignment, mono font, and consistent spacing. Density without clarity is noise; density with alignment is power.

**Density discipline**:
- Section padding: `24-32px` between major sections (vertical rhythm)
- Component padding: `12-16px` inside cards, panels, list items
- Inter-element gap: `4-8px` for related items, `12-16px` for unrelated
- Hairline dividers: `1px` at `40-60%` opacity, used to separate rows in lists (projects, commands, suggestions)

**Banned**:
- ❌ Heavy borders on every element (visual noise)
- ❌ Card containers wrapping single lines of text
- ❌ "Trust badges" or "feature lists" stuffed into 1-line components
- ❌ Whitespace as the only separator (use dividers when content is dense)

---

## 7. The Prompt is the Brand

**Rule**: The `$` prompt symbol, the cursor blink, and the command-prompt relationship are the brand identity. They must be implemented consistently and well.

**Why (Terminal semantics)**: A portfolio terminal that does not get the prompt right fails the metaphor. The first thing the visitor sees is the prompt — that is the impression. A weak prompt (no blink, wrong color, wrong weight) signals "this is a fake terminal."

**Prompt quality checklist**:
- Color: `--terminal-prompt` (green by default, theme-respecting)
- Weight: bold
- Spacing: `12px` right margin before input
- Cursor: 2px wide, 1.25rem tall, blink at 1s interval
- Input: mono font, transparent background, accent-colored caret

---

## 8. Content Wins, Interface Recedes

**Rule**: The visitor came to read about Pablo, not to admire the design. The interface's job is to make the content scannable and the interaction delightful — not to be impressive.

**Why (Google Labs Experience mode)**: The visitor is inside the work. The artifact leads. If they remember the terminal 5 minutes after leaving, good; if they remember the projects and how to reach Pablo, better.

**Content-first discipline**:
- Every visible element must answer: "does this help the visitor know Pablo better or contact him?"
- Decorative copy is banned. "Welcome to my awesome portfolio!" → "terminal@pablo.dev / hiring-mode" (functional, not performative)
- Commands must do real work. `/projects` shows projects. `/experience` shows experience. No `/fun-facts` filler.

---

## Anti-Patterns (Never Ship)

These are the AI tells and the terminal cheats we explicitly ban:

1. **AI purple/blue glow gradients on hero text** — banned.
2. **Pure black `#000000`** — use charcoal (`#11151b` or similar) for dark themes.
3. **Pure white `#FFFFFF`** — use off-white (`#f2f4f7` or similar) for light themes.
4. **Emoji as icons** — zero emoji. Symbols and SVG only.
5. **Three identical feature cards in a row** — the LLM default. Break it.
6. **"Used by" logo wall inside the hero** — hero is for the value prop, not fake social proof.
7. **Inter as the default sans** — Montserrat (or a deliberate alternative) instead.
8. **Mixed family emphasis in headlines** — italic or bold of the SAME font for emphasis, never a serif word inside a sans headline.
9. **Bouncing buttons, infinite shimmer, decorative marquees** — motion budget above forbids them.
10. **Random `z-50` everywhere** — use a layered z-index scale (see tokens/elevation.md).

---

## What This Means For A New Component

When you build a new component, run through this checklist:

1. **What job does this component do?** Write the job in one sentence.
2. **What semantic tokens does it consume?** List them. No raw colors.
3. **What motion does it use?** Functional only. < 300ms.
4. **What is its information density?** Match the dial (6: dense but readable).
5. **Does it have an icon?** Probably not. If yes, is it an SVG with consistent stroke weight?
6. **Does it work in both dark and light themes?** Verify both before shipping.
7. **Does it work without keyboard?** Tab, arrows, Enter, Esc must all behave.
8. **Could a senior engineer look at this and say "this is overcomplicated"?** If yes, simplify.
