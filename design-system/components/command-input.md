# Command Input

> **The prompt, the input, and the autocomplete.**
> The primary interaction surface. Everything in the portfolio is reachable through this component.

## Purpose

The CommandInput is the user's main interaction point. It:
1. Displays the `$` prompt (the affordance that signals "type here")
2. Accepts text input (the command)
3. Shows real-time autocomplete suggestions
4. Supports keyboard navigation (Tab for autocomplete, ↑↓ for history)
5. Submits on Enter, clears on Escape (when suggestions open)

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│ command input                            /help · tab · hist │
│ $ [type your command here________]                          │
│ tab · autocomplete · ↑↓ · history                           │
└─────────────────────────────────────────────────────────────┘
   ↓ (when suggestions open, popover appears above)
┌─────────────────────────────────────────────────────────────┐
│ /experience     trayectoria                                 │
│ /projects       builds                                      │ ← suggestions
│ /skills         stack                                       │   popover
│ /contact        canal                                       │
└─────────────────────────────────────────────────────────────┘
```

## Tokens Used

### Input Shell
| Token | Where |
|-------|-------|
| `--terminal-bg-secondary` | Shell background (translucent) |
| `--terminal-border` | Shell border (80% opacity) |
| `--terminal-bg` (rgba 3-5%) | Inset highlight (top inner shadow) |
| `--space-4` | Horizontal padding |
| `--space-3` | Vertical padding |

### Prompt Symbol
| Token | Where |
|-------|-------|
| `--terminal-prompt` | `$` color |
| `--font-mono` | `$` font |
| `--font-weight-bold` | `$` weight |
| `--space-3` | Right margin before input |

### Input Field
| Token | Where |
|-------|-------|
| `--terminal-text` | Input text color |
| `--terminal-text-secondary` | Placeholder color (50% opacity) |
| `--terminal-cursor` | Caret color |
| `--font-mono` | Input font |
| `--font-size-base` | Input size (16px — iOS zoom safe) |

### Labels
| Token | Where |
|-------|-------|
| `--terminal-text-secondary` | "command input" label, "tab · autocomplete" hint |
| `--font-mono` | All labels |
| `--font-size-xs` | Label size (11px) |
| `--tracking-widest` | Label letter spacing (0.22em) |

### Suggestions Popover
| Token | Where |
|-------|-------|
| `--terminal-bg` | Background (95% opacity + backdrop-blur) |
| `--terminal-border` | Border (80% opacity) |
| `--terminal-text-secondary` | Default item text |
| `--terminal-accent` | Selected item text + bg (12% opacity) |
| `--terminal-prompt` | Command prefix highlight |
| `--space-3` | Item vertical padding |
| `--space-4` | Item horizontal padding |
| `--radius-md` | Popover radius |
| `--motion-fast` | Item hover transition |

## Behavior

### Input Lifecycle
1. **Mount**: Input auto-focuses, placeholder visible
2. **User types**: Suggestions filter in real-time
3. **User submits (Enter)**: Command sent to parent, input cleared
4. **Loading**: Input disabled, command processed
5. **Complete**: Input re-enabled, focus restored

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Tab` | Autocomplete to selected suggestion (or first suggestion) |
| `↑` (no suggestions) | Navigate command history up |
| `↓` (no suggestions) | Navigate command history down |
| `↑` (with suggestions) | Move selection up in popover |
| `↓` (with suggestions) | Move selection down in popover |
| `Enter` | Submit current input |
| `Escape` | Close suggestions popover |

### Suggestions Logic
- Triggered when input starts with `/`
- Filtered by prefix match against `COMMAND_SUGGESTIONS`
- Empty filter → popover hidden
- Selected suggestion highlighted (first by default)
- Click outside → popover hidden

### History Navigation
- History stored in parent (`Terminal.tsx`)
- `↑` from empty input → loads most recent command
- `↑` again → loads previous
- `↓` → loads newer
- `↓` past most recent → restores temporary input (the text that was being typed before history navigation)

## Accessibility

### ARIA
- Input has `aria-label="Comando de terminal"`
- Suggestions popover uses `role="menu"` with `role="menuitem"` for each suggestion
- Selected item has `aria-selected="true"` (or visually equivalent styling)

### Keyboard
- All functionality reachable via keyboard (no mouse required)
- Tab works as autocomplete
- Arrow keys work for both history and suggestion navigation
- Escape closes suggestions
- Enter submits

### Focus
- Input retains focus throughout interaction
- Suggestions popover does not steal focus (clickable but not focus-stealing)
- Disabled state during loading: input remains in tab order but rejects input

### Screen Reader
- Input field announces placeholder on focus
- Suggestions popover announces count and items via menu role
- Loading state announced via the disabled attribute

## Variants

### State: Idle
- Input enabled, placeholder visible, no suggestions

### State: Typing
- Input shows typed text, suggestions filter in real-time

### State: Suggestions Open
- Popover visible, first item highlighted

### State: Selection Navigated
- Highlighted item changes based on ↑↓

### State: Loading
- Input disabled, `placeholder` shows "Procesando comando..."
- Suggestions hidden

## Implementation

```tsx
<form onSubmit={handleSubmit} className="w-full relative">
  <div className="rounded-2xl border border-terminal-border/80 bg-terminal-bg-secondary/45 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
    <div className="mb-2 flex items-center justify-between gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-terminal-text-secondary">
        command input
      </span>
      <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-terminal-text-secondary md:inline">
        /help · tab autocomplete · history
      </span>
    </div>
    <div className="relative flex items-center">
      <span className="mr-3 font-mono text-lg font-bold text-terminal-prompt">$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoFocus
        aria-label="Comando de terminal"
        placeholder={disabled ? 'Procesando comando...' : 'Prueba con /projects, /experience o /contact'}
        className="command-input flex-1 bg-transparent outline-none text-base"
      />
    </div>
  </div>
</form>
```

## Anti-Patterns

❌ **Banned**: Using `<div onClick>` instead of a real input — breaks keyboard and screen reader support.
❌ **Banned**: Removing the `$` prompt — it IS the affordance. Visitors need to see it.
❌ **Banned**: Showing the prompt in the wrong color — must be `--terminal-prompt`, not the accent.
❌ **Banned**: Auto-hiding the cursor — the blink is part of the terminal metaphor.
❌ **Banned**: Disabling Tab key — Tab is the user's autocomplete affordance.
❌ **Banned**: Showing suggestions when input is empty — feels like spam.
❌ **Banned**: Custom scroll on the suggestions popover — should not need scrolling for 4-8 items.
❌ **Banned**: Form submit on every keystroke — submit on Enter only.
