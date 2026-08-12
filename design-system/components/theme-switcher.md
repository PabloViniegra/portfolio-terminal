# Theme Switcher

> **A small dropdown that lets the visitor change the world.**
> Lives in the terminal header. One of four themes, switchable at any time.

## Purpose

The ThemeSwitcher is the only persistent UI control that lets the visitor change the product. It's deliberately understated — a colored dot + theme name + the literal word "theme" — so visitors know it exists but it's not visually loud.

## Anatomy

```
┌──────────────────────┐
│ ● One Dark  theme  ▾ │ ← button (closed state)
└──────────────────────┘
   ↓ (when open)
┌──────────────────────┐
│ ● One Dark           │
│ ● Light              │ ← dropdown (open state)
│ ● Ayu                │
│ ● GitHub             │
└──────────────────────┘
```

## Tokens Used

### Trigger Button
| Token | Where |
|-------|-------|
| `--terminal-border` | Button border (70% opacity) |
| `--terminal-bg-secondary` | Button background (60% opacity) |
| `--terminal-text` | Button text |
| `--terminal-text-secondary` | "theme" label |
| `--terminal-accent` | Border on hover (40% opacity), text on hover |
| `--radius-md` | Button border radius (8px) |
| `--motion-fast` | Hover transition (150ms) |

### Dropdown
| Token | Where |
|-------|-------|
| `--terminal-bg` | Background (95% opacity + backdrop-blur 8px) |
| `--terminal-border` | Border (80% opacity) |
| `--terminal-text-secondary` | Default item text |
| `--terminal-accent` | Selected item text + bg (12% opacity) |
| `--terminal-bg-secondary` | Hover item background (80% opacity) |
| `--space-1` | Vertical padding (4px) |
| `--radius-lg` | Dropdown border radius (12px) |

### Color Dot
The colored dot is a Tailwind utility class per theme:
- One Dark: `bg-[#61afef]` (terminal blue)
- Light: `bg-[#e5c07b]` (bronze warning)
- Ayu: `bg-[#ffb454]` (Ayu amber)
- GitHub Dark: `bg-[#58a6ff]` (GitHub blue)

These are the canonical "preview" colors that represent each theme — they are the only place a raw hex appears in the component layer (acceptable: they are part of the theme metadata, not theme application).

## Behavior

### Closed State
- Shows the current theme's dot + name + "theme" label
- Hover: border becomes accent (40% opacity), text becomes accent
- Click: opens dropdown

### Open State
- Dropdown slides down (no animation — instant for now)
- Each item shows: dot + theme name
- Selected item: highlighted with accent background (12% opacity) and accent text
- Hover (non-selected): bg-secondary background (80% opacity)
- Click: changes theme, closes dropdown
- Click outside: closes dropdown

### Theme Change
When the user selects a theme:
1. `useTheme().setTheme(newTheme)` is called
2. The hook updates React state and `data-theme` attribute on `<html>`
3. CSS variables cascade, all components re-style automatically
4. `localStorage.theme` is updated
5. The 300ms transition on `body` smooths the change

## Accessibility

### ARIA
- Button has `aria-label="Cambiar tema"`
- Button has `aria-expanded={isOpen}`
- Dropdown has `role="menu"` and `aria-label="Selector de tema"`
- Each item has `role="menuitem"`
- Selected item has `aria-pressed={true}`

### Keyboard
- Button is natively focusable
- Enter/Space opens dropdown
- Tab navigates between items (native menu behavior)
- Escape closes dropdown (could be added — currently relies on click-outside)
- Arrow keys could navigate items (currently relies on Tab)

### Focus
- Button receives focus on Tab
- After selection, focus returns to button
- After click-outside, focus is unchanged

### Screen Reader
- Button announces "Cambiar tema, expanded/collapsed"
- Items announce "Cambiar al tema One Dark, pressed/not pressed"

## Variants

### Trigger Display
On mobile (< lg breakpoint), the trigger shows only:
- Color dot
- "theme" label (no theme name)

This reduces horizontal space when the header is constrained.

On desktop (≥ lg), the trigger shows:
- Color dot
- Theme name
- "theme" label

## Implementation

```tsx
<div className="relative" ref={dropdownRef}>
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex items-center gap-2 rounded-lg border border-terminal-border/70 bg-terminal-bg-secondary/60 px-3 py-2 text-sm text-terminal-text transition-all duration-200 hover:border-terminal-accent/40 hover:text-terminal-accent focus:outline-none focus:ring-1 focus:ring-terminal-accent/50"
    aria-label="Cambiar tema"
    aria-expanded={isOpen}
  >
    <span className={`h-3 w-3 rounded-full ${currentThemeData.color}`} aria-hidden="true" />
    <span className="hidden lg:inline">{currentThemeData.name}</span>
    <span className="text-xs text-terminal-text-secondary">theme</span>
  </button>

  {isOpen && (
    <div
      className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-terminal-border/80 bg-terminal-bg py-1 shadow-xl backdrop-blur-sm"
      role="menu"
      aria-label="Selector de tema"
    >
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          onClick={() => handleThemeChange(theme.id)}
          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-all duration-150 ${
            currentTheme === theme.id
              ? 'bg-terminal-accent/12 text-terminal-accent font-medium'
              : 'text-terminal-text hover:bg-terminal-bg-secondary/80'
          }`}
          role="menuitem"
          aria-label={`Cambiar al tema ${theme.name}`}
          aria-pressed={currentTheme === theme.id}
        >
          <span className={`h-3 w-3 rounded-full ${theme.color}`} aria-hidden="true" />
          <span>{theme.name}</span>
        </button>
      ))}
    </div>
  )}
</div>
```

## Anti-Patterns

❌ **Banned**: Custom dropdown without menu role (must use `role="menu"` + `menuitem`).
❌ **Banned**: Re-rendering the entire page on theme change (CSS variables handle this — no React re-render needed).
❌ **Banned**: Showing the same theme as a "selected" indicator with just bold text — use a clear visual signal (background, weight, accent color).
❌ **Banned**: Hiding the dropdown after a timeout (close on click outside or selection, not timer).
❌ **Banned**: Theme names that don't match the metadata in `themes.ts` — keep them in sync.
❌ **Banned**: Adding new themes without verifying contrast in all 4 themes — every new theme ships with WCAG AA.
