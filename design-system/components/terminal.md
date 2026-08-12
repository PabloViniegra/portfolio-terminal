# Terminal Shell

> **The frame of the entire product.**
> Everything lives inside the terminal shell. It defines the product's outer boundaries and gives every page element a consistent container.

## Purpose

The terminal shell is the outermost container. It:
1. Establishes the product as "a terminal running on a page" rather than "a webpage"
2. Holds the header (title bar, theme switcher, avatar), body (scrollable output), and footer (command input)
3. Provides the only significant elevation on the page (the shadow that lifts it from the page background)

The shell is a Card pattern, not a Browser Window pattern. It does not pretend to be a window — no resize handles, no minimize/close buttons. The three colored dots in the header are a tasteful nod to native window chrome, not literal controls.

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│ ● ● ●  terminal@pablo.dev              [theme]  [ready] [○] │ ← header
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [scrollable output area]                                   │
│                                                             │ ← body
│  $ ./pablo                                                  │
│  fullstack engineer                                         │
│                                                             │
│  v0.1 · Aug 12, 2026 · open to roles                        │
│                                                             │
│  Quick start                                                │
│  [/experience] [/projects] [/skills] [/contact]             │
│                                                             │
│  $ /projects                                                │
│  > 4 builds                                                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  command input                                              │ ← footer
│  $ [_________________________________]                       │
│  tab · autocomplete · ↑↓ · history                          │
└─────────────────────────────────────────────────────────────┘
```

## Tokens Used

| Token | Where it appears |
|-------|------------------|
| `--terminal-bg` | Body background, page background |
| `--terminal-bg-secondary` | Inner panels, command input shell |
| `--terminal-bg-elevated` | Dropdown (theme switcher), suggestions |
| `--terminal-border` | Header bottom border, footer top border, container border |
| `--terminal-text` | Title text, body content |
| `--terminal-text-secondary` | Subtitle, "ready" pill, divider labels |
| `--terminal-accent` | "open to roles" status, links |
| `--terminal-prompt` | (Reserved for input shell, not used in shell chrome) |
| `--terminal-warning` | (Reserved for amber status) |
| `--font-mono` | Title, subtitle, status pills |
| `--font-sans` | Welcome message prose |
| `--space-5` | Body padding (desktop) |
| `--space-2` | Body padding (mobile) |
| `--space-6` | Outer page padding |
| `--radius-xl` | Outer shell border radius (18px) |
| `--radius-lg` | Mobile shell border radius (16px) |
| `--motion-medium` | Theme switch transition (300ms) |

## Visual Structure

### Container
```tsx
<section
  className="terminal relative h-full overflow-hidden bg-terminal-bg text-terminal-text"
  role="application"
  aria-label="Terminal interactiva de portfolio"
>
  {/* children: header, main, footer */}
</section>
```

### Header
- Background: `--terminal-header-bg` (slightly darker than body, or same as body)
- Bottom border: 1px `--terminal-border`
- Padding: `--space-4` horizontal, `--space-3` vertical
- Layout: traffic lights (3 colored dots) on left, title + subtitle in middle, status pills + theme switcher + avatar on right

### Body
- Background: `--terminal-bg`
- Padding: `--space-5` (desktop), `--space-2` (mobile)
- Overflow-y: auto (scrollable)
- Custom scrollbar styled to match theme

### Footer
- Background: `--terminal-bg-header` with backdrop-blur (translucent)
- Top border: 1px `--terminal-border`
- Padding: `--space-4` all sides
- Contains: command input shell

## Behavior

### Loading State
- A skeleton loader (`terminal-skeleton` in `index.astro`) shows while the React island hydrates.
- Skeleton matches the shell structure: header dots + title placeholder, body lines at varying widths.
- When React mounts, the skeleton is hidden (`#terminal-skeleton` `display: none`).

### Empty State (initial load)
- Welcome message renders in the body.
- Status pill shows "ready" in the header.
- Command input is focused, prompt blinks.

### Active State (after first command)
- Body shows command history (input + output pairs).
- Status pill in header may show "executing…" or "ready" depending on whether a command is processing.
- Body auto-scrolls to bottom on new content (`scrollIntoView({ behavior: 'smooth' })`).

### Matrix Rain State
- An overlay canvas (MatrixRain component) renders above the terminal.
- Body content gets a backdrop blur (`bg-terminal-bg/90 backdrop-blur-sm`).
- Exits via Ctrl+C keypress (interrupts cleanly).

## Accessibility

### Roles
- `role="application"` on the shell — signals to screen readers that this is an interactive application, not static content.
- `aria-label="Terminal interactiva de portfolio"` — describes the application's purpose.

### Header
- The traffic light dots are decorative (`aria-hidden="true"`).
- The title + subtitle region has no explicit role; it's read as part of the page header.
- Theme switcher is a button with `aria-label`, `aria-expanded`.

### Body
- `role="log"` — announces new content as it appears.
- `aria-live="polite"` — defers announcements until current speech ends.
- `aria-label="Salida de la terminal"` — describes the output area.

### Footer
- Command input has `aria-label="Comando de terminal"`.
- Placeholder provides usage hint.
- Auto-focus on mount (`autoFocus`).

### Focus Management
- Initial focus: command input.
- After command submit: focus returns to input (via `inputRef.current?.focus()`).
- During loading (`isLoading`): input is `disabled`, focus remains but no input is accepted.

## Variants

### By Theme
The shell adapts to all 4 themes via CSS variable cascade. No theme-specific styles in the component.

### By State
- **Loading**: skeleton shows
- **Ready**: status pill says "ready"
- **Executing**: command input disabled, "loading dots" animation visible
- **Rain active**: matrix rain overlay, blurred body content
- **Error**: input not blocked, error message in output

## Implementation

```tsx
<section
  className="terminal relative h-full overflow-hidden bg-terminal-bg text-terminal-text"
  role="application"
  aria-label="Terminal interactiva de portfolio"
>
  <header className="flex flex-wrap items-center justify-between gap-4 border-b border-terminal-border/90 bg-terminal-header-bg/90 px-4 py-3 backdrop-blur">
    {/* header content */}
  </header>

  <main
    className="flex-1 space-y-8 overflow-y-auto px-4 py-5 md:px-6 md:py-6"
    role="log"
    aria-live="polite"
    aria-label="Salida de la terminal"
  >
    {/* scrollable output */}
  </main>

  <footer className="border-t border-terminal-border/90 bg-terminal-header-bg/78 p-4 backdrop-blur">
    {/* command input */}
  </footer>
</section>
```

## Anti-Patterns

❌ **Banned**: Browser window chrome (resize handles, minimize buttons). The shell is a Card, not a window.
❌ **Banned**: Random `z-index` values inside the shell. Use the elevation scale (`tokens/elevation.md`).
❌ **Banned**: Theme-specific CSS in the shell component. All theming via tokens.
❌ **Banned**: Pure black header (loses the warmth of charcoal canvas).
❌ **Banned**: Heavy drop shadow that overwhelms the page. The shell should sit on the page, not dominate it.
