# UI Patterns

> **Reusable patterns that span components.**
> Smaller than components, larger than tokens. The connective tissue of the design system.

## Pattern Index

| Pattern | Description |
|---------|-------------|
| [Eyebrow](#eyebrow) | Small uppercase mono label above section headlines |
| [Hairline Divider](#hairline-divider) | Subtle separator line |
| [Status Pill](#status-pill) | Small rounded badge with mono caps |
| [Quick Command Pill](#quick-command-pill) | Pill button for one-click commands |
| [Command Verb Line](#command-verb-line) | Header line for section output (`$ inspect ...`) |
| [Mono ↔ Sans Pairing](#mono--sans-pairing) | How to mix mono labels with sans body |
| [Empty State](#empty-state) | "Nothing here yet" pattern |
| [Loading State](#loading-state) | Loading dots animation |

---

## Eyebrow

A small mono uppercase label that categorizes a section. The visual equivalent of a chapter title in a book — gives the section identity without competing with the headline.

### Anatomy
```
COMMAND INDEX            ← eyebrow
Available commands       ← headline
```

### Tokens
- Font: `--font-mono`
- Size: `--font-size-xs` (11px)
- Weight: regular (400) — not bold
- Tracking: `--tracking-widest` (0.22em)
- Color: `--terminal-text-secondary`
- Case: uppercase

### Implementation
```tsx
<p className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
  command index
</p>
```

### When to use
- Above section headlines (1 per section max — see rules)
- Above command output headers (`$ inspect projects.registry`)

### When NOT to use
- Inline with prose (it's a label, not a phrase)
- Multiple per section (max 1 per section to avoid "eyebrow inflation")
- Above every section in a long page (eyebrow fatigue)

### Eyebrow discipline
Maximum 1 eyebrow per 3 sections (Google Labs-aligned restraint). The hero counts as 1. So a 9-section page may use at most 3 eyebrows.

---

## Hairline Divider

A subtle horizontal line used to separate sections of dense content. Replaces heavy borders.

### Anatomy
```
───── (1px line at 40% border opacity)
```

### Tokens
- Color: `--terminal-border` at 40-60% opacity
- Height: 1px
- Background: solid color (not gradient in most cases)

### Implementation
```tsx
{/* Between section groups */}
<span className="h-px flex-1 bg-terminal-border/40"></span>

{/* As separator between rows */}
<hr className="border-t border-terminal-border/40" />

{/* With gradient fade (for centered or asymmetric dividers) */}
<div className="h-px w-full bg-gradient-to-r from-transparent via-terminal-border/70 to-transparent"></div>
```

### When to use
- Between major section groups (Featured / Archive)
- Between list items in dense lists
- Above/below command output headers

### When NOT to use
- Between every paragraph (too noisy)
- Between two adjacent items of the same group (use spacing instead)

---

## Status Pill

A small rounded badge showing status information. Used for "ready", "executing...", date pills, etc.

### Anatomy
```
┌──────────┐
│  READY   │ ← pill (rounded-full, mono caps)
└──────────┘
```

### Tokens
- Background: `--terminal-bg` (or transparent)
- Border: `--terminal-border` at 70% opacity
- Text: `--terminal-text-secondary`
- Font: `--font-mono`, 11px, uppercase, tracking 0.2em
- Padding: `space-1` vertical, `space-3` horizontal
- Radius: `--radius-full` (9999px)

### Implementation
```tsx
<span className="rounded-full border border-terminal-border/70 bg-terminal-bg px-3 py-1 font-mono text-mono-xs uppercase tracking-[0.2em] text-terminal-text-secondary">
  ready
</span>
```

### Variants
- **Default**: secondary text, subtle border
- **Active**: accent text, accent border (40% opacity)
- **Warning**: warning color
- **Error**: error color
- **Success**: success color

---

## Quick Command Pill

A clickable pill that runs a command. Used in the welcome message for one-click access to common sections.

### Anatomy
```
┌──────────────────────────┐
│ $ /projects        builds │
└──────────────────────────┘
   ↑ prompt      ↑ label
```

### Tokens
- Background: `--terminal-bg`
- Border: `--terminal-border` at 70% opacity
- Hover border: `--terminal-accent` at 40% opacity
- Hover text: `--terminal-accent`
- Command text: `--terminal-text`, mono
- Label text: `--terminal-text-secondary`, sans (small)
- Prompt text: `--terminal-prompt`
- Padding: `space-1.5` vertical, `space-3` horizontal
- Radius: `--radius-full`

### Implementation
```tsx
<button
  type="button"
  onClick={() => onRun(command)}
  className="inline-flex items-center gap-2 rounded-full border border-terminal-border/70 bg-terminal-bg px-3 py-1.5 font-mono text-xs text-terminal-text-secondary transition-colors duration-200 hover:border-terminal-accent/40 hover:text-terminal-accent focus:outline-none focus:ring-1 focus:ring-terminal-accent/50"
  aria-label={`Ejecutar ${command}`}
>
  <span className="text-terminal-prompt">$</span>
  <span className="text-terminal-text">{command}</span>
  <span className="font-sans text-sans-xs text-terminal-text-secondary">
    {label}
  </span>
</button>
```

### When to use
- Welcome message (4-5 quick commands)
- Empty state of a section ("Try /projects instead")
- Anywhere we want one-click command execution

### Anti-patterns
❌ Using a button that looks like a link (visually distinct pill is the right choice)
❌ More than 6 quick commands in a single row (visual noise)

---

## Command Verb Line

A header line that mimics a real shell command. Used at the top of section outputs.

### Anatomy
```
$ inspect projects.registry                      4 builds
↑ verb         ↑ path                       ↑ count
```

### Tokens
- Prompt (`$`): `--terminal-prompt`, mono
- Verb (`inspect`, `cat`, `list`, etc.): `--terminal-accent`, mono
- Argument (path-like): `--terminal-text-secondary`, mono
- Count (`4 builds`): `--terminal-text-secondary`, mono small caps

### Implementation
```tsx
<div className="mb-5 flex items-center justify-between gap-4">
  <div className="flex items-center gap-2 font-mono text-sm">
    <span className="text-terminal-prompt">$</span>
    <span className="text-terminal-accent">inspect</span>
    <span className="text-terminal-text-secondary">projects.registry</span>
  </div>
  <span className="font-mono text-mono-xs uppercase tracking-[0.18em] text-terminal-text-secondary">
    {projects.length} builds
  </span>
</div>
```

### Verbs to use
- `inspect` — for detailed views (projects, skills)
- `cat` — for simple lists (contact)
- `ls` — for directory-style listings
- `tail` — for recent items
- `history` — for log-style content

Pick verbs that match the action; consistency matters less than clarity.

---

## Mono ↔ Sans Pairing

How to mix monospace labels with sans-serif body content without visual chaos.

### Rule
When a paragraph or section uses sans-serif body, the labels around it (eyebrow, status, count) use mono. The visual rhythm is: mono label → sans content → mono metadata.

### Example (good)
```tsx
<div>
  <p className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
    QUICK START
  </p>
  <p className="mt-2 font-sans text-base leading-relaxed text-terminal-text">
    Run any of these commands to explore the portfolio.
  </p>
  <div className="mt-3 flex gap-3">
    {/* quick command pills */}
  </div>
</div>
```

### Example (bad)
```tsx
<div>
  <p className="font-sans text-base font-bold text-terminal-accent">
    Quick Start
  </p>
  <p className="font-mono text-sm text-terminal-text">
    Run any of these commands to explore the portfolio.
  </p>
</div>
```

The bad example mixes the families inconsistently — mono label with sans body is wrong; sans label with mono body is also wrong. Pick a family for each element and stick to it.

---

## Empty State

When a section has no data, show a helpful message + action.

### Anatomy
```
┌────────────────────────────────────────┐
│                                        │
│  $ list projects                       │
│                                        │
│  No projects yet.                      │
│  Run /help to see available commands.  │
│                                        │
└────────────────────────────────────────┘
```

### Tokens
- Mono command line at top
- Sans body message
- Accent link / button for action

### When to use
- Project list is empty
- Experience is empty
- Any section with no data

### Current state
Not implemented for all sections. Future work: add empty state handling for sections with zero data.

---

## Loading State

The terminal shows loading dots during command processing. This is the loading indicator.

### Anatomy
```
● ● ●                    ← three dots, staggered opacity
```

### Implementation
```tsx
{/* TerminalLoader.tsx renders three pulsing dots */}
```

### Tokens
- Color: `--terminal-text-secondary`
- Animation: pulse, 1.5s duration, linear easing, staggered 200ms

### When to use
- During command processing (250-600ms random delay)
- Future: during content loading (currently not needed since content is static JSON)

### Anti-patterns
❌ Generic circular spinner (breaks terminal metaphor)
❌ Full-screen loading overlay (the terminal IS the app — overlay it)

---

## Patterns We Don't Use

- **Cards with shadows** — we use hairlines and surface elevation, not boxed cards
- **Gradient buttons** — solid colors only
- **Tab interfaces** — commands replace tabs
- **Modal dialogs** — content replaces modals (no overlay on top of terminal)
- **Tooltips** — info goes in the visible metadata or placeholder text
- **Breadcrumbs** — single-page app, no navigation hierarchy
- **Avatars as social proof** — only one avatar (the user's) exists, in the header

The patterns we DON'T use are part of the design system too. A portfolio terminal that uses standard web patterns loses its identity.
