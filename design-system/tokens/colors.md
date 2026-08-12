# Color Tokens

> **Color is semantic, never decorative.**
> Every color has a role. Every role has a token. Every token is used consistently.

## Token Map

### Semantic Colors

The 12 semantic color tokens that components consume. Each one has a defined role; reach for the role, never the raw value.

| Token | Role | Default (One Dark) |
|-------|------|---------------------|
| `--terminal-bg` | Canvas, terminal body, page background | `#11151b` |
| `--terminal-bg-secondary` | Inner panels, header, command input shell | `#171d26` |
| `--terminal-bg-elevated` | Dropdowns, suggestion popovers, modals | `#1d2530` |
| `--terminal-border` | 1px separators, container outlines | `#273142` |
| `--terminal-text` | Primary text, commands, headlines | `#d5dde8` |
| `--terminal-text-secondary` | Metadata, labels, hints, timestamps | `#7d889c` |
| `--terminal-text-tertiary` | Disabled state, placeholder, de-emphasized | `#5a6678` |
| `--terminal-accent` | Links, focused inputs, active command, key | `#77bdfb` |
| `--terminal-prompt` | `$` symbol, cursor, success state | `#8fd6b4` |
| `--terminal-warning` | Pending state, soft warning, amber status | `#d8b26b` |
| `--terminal-error` | Errors, "command not found", destructive | `#f38b92` |
| `--terminal-success` | Positive confirmations, completed states | `#8fd6b4` |

### RGB Variants

For opacity tricks (`rgba()` composition), each background and text token ships an RGB triplet variant:

| Token | Used for |
|-------|----------|
| `--terminal-bg-rgb` | `rgba(var(--terminal-bg-rgb), 0.5)` for translucent overlays |
| `--terminal-bg-secondary-rgb` | Translucent panels, command input shell |
| `--terminal-bg-elevated-rgb` | Translucent dropdowns |
| `--terminal-text-secondary-rgb` | Scrollbar thumbs, muted highlights |
| `--terminal-border-rgb` | Translucent dividers |

**Rule**: Never store `#11151b` or its RGB equivalent inline in components. Always reference the token. The RGB variant is for the rare case where you need `rgba(var(--token-rgb), 0.X)` for translucency.

### Pure / Functional Tokens

A small set of token-shaped values that aren't theme-aware but live alongside the color system:

| Token | Value | Role |
|-------|-------|------|
| `--terminal-cursor` | Same as `--terminal-prompt` | The blinking cursor (separated because some themes shift it independently) |
| `--terminal-overlay-rgb` | `0, 0, 0` (dark) / `0, 0, 0` (light, slightly stronger) | Matrix rain backdrop, modal scrim |
| `--scrollbar-track` | Derived from `--terminal-bg` | Webkit scrollbar track |
| `--scrollbar-thumb` | Derived from `--terminal-text-secondary` at 35% alpha | Webkit scrollbar thumb |
| `--scrollbar-thumb-hover` | Derived from `--terminal-text-secondary` at 55% alpha | Webkit scrollbar thumb on hover |

## Primitive Palette

The raw color values, used to derive semantic tokens. **Never reach for these in components.** They live in `:root` and themes as the source of truth; semantic tokens reference them.

```
--neutral-0:    #ffffff   (pure white, never used as background — use off-white)
--neutral-50:   #f7f8fa
--neutral-100:  #f2f4f7   (light theme canvas)
--neutral-200:  #e6ebf2   (light theme header)
--neutral-300:  #c9d2e0   (light theme border)
--neutral-400:  #8b98a8   (light theme text-secondary)
--neutral-500:  #5a6678   (light theme text-tertiary)
--neutral-600:  #4a5260
--neutral-700:  #2c3644
--neutral-800:  #1d2530   (dark theme bg-elevated)
--neutral-900:  #171d26   (dark theme bg-secondary)
--neutral-950:  #11151b   (dark theme bg)
--neutral-1000: #0d1117   (deepest dark, for Matrix rain scrim)

--blue-300:     #a3c9f5
--blue-400:     #77bdfb   (default accent)
--blue-500:     #5aa9f0
--blue-600:     #2f6fb2   (light theme accent)

--green-300:    #b9d6c0
--green-400:    #8fd6b4   (default prompt / success)
--green-500:    #6fc09a
--green-600:    #2d7d61   (light theme prompt / success)

--amber-400:    #d8b26b   (default warning)
--amber-500:    #b8923f

--red-400:      #f38b92   (default error)
--red-500:      #c64747   (light theme error)

--ayu-blue:     #5cc8f5   (Ayu theme accent)
--ayu-green:    #b9d36a   (Ayu theme prompt)
--ayu-amber:    #f2be67   (Ayu theme warning + cursor)
--ayu-red:      #ff6b6b   (Ayu theme error)
```

## Contrast Discipline

Every text/background pair must pass WCAG 2.1 AA: **4.5:1 for body text, 3:1 for large text (18px+) and UI elements**.

| Pair | One Dark | Light | Ayu | GitHub Dark |
|------|----------|-------|-----|-------------|
| `--terminal-text` on `--terminal-bg` | 12.4:1 ✅ | 14.2:1 ✅ | 13.8:1 ✅ | 12.1:1 ✅ |
| `--terminal-text-secondary` on `--terminal-bg` | 5.2:1 ✅ | 6.1:1 ✅ | 5.9:1 ✅ | 5.0:1 ✅ |
| `--terminal-accent` on `--terminal-bg` | 7.8:1 ✅ | 5.4:1 ✅ | 8.2:1 ✅ | 7.5:1 ✅ |
| `--terminal-prompt` on `--terminal-bg` | 9.1:1 ✅ | 5.8:1 ✅ | 10.2:1 ✅ | 8.9:1 ✅ |
| `--terminal-warning` on `--terminal-bg` | 8.3:1 ✅ | 5.1:1 ✅ | 9.7:1 ✅ | 6.8:1 ✅ |
| `--terminal-error` on `--terminal-bg` | 6.4:1 ✅ | 5.6:1 ✅ | 6.1:1 ✅ | 5.9:1 ✅ |

**Run a contrast check on every theme before shipping.** Don't trust the table — it's the theoretical floor. Verify in browser.

## Color Application Rules

1. **Accent goes on verbs, not nouns.** `--terminal-accent` highlights commands, links, and active states — not words within prose.
2. **Prompt green is sacred.** The `$` symbol and the blinking cursor use `--terminal-prompt`. Don't repurpose it for unrelated emphasis.
3. **Error red is for errors.** Don't use `--terminal-error` as a generic alert color; reserve it for "command not found", "this action failed".
4. **Secondary text earns its place.** If a piece of text is just slightly less important, it doesn't deserve `--terminal-text-secondary`. Use it for actual metadata: timestamps, paths, counts, labels.
5. **Tertiary text is for disabled.** If something is interactive, never de-emphasize it with `--terminal-text-tertiary`. Use that only for `disabled` state, placeholders, or true background labels.
6. **Borders, not shadows, separate.** Use `--terminal-border` for separation, not arbitrary box shadows. Shadows are for the terminal shell itself (depth signaling on the page).
7. **Translucency uses RGB variants.** When you need `rgba(token, 0.X)`, use the RGB variant token. Never inline a hex with an alpha value.

## Anti-Patterns

❌ **Banned**: `text-[#77bdfb]` — reach for `text-terminal-accent`.
❌ **Banned**: `bg-[rgba(125,136,156,0.35)]` — reach for `bg-[rgba(var(--terminal-text-secondary-rgb),0.35)]` or define a token.
❌ **Banned**: Mixed-color gradients on hero text. The terminal is not a marketing page.
❌ **Banned**: Saturated accents above 80% saturation in light themes. Push toward muted, professional variants.
❌ **Banned**: Color-only meaning. Always pair color with a symbol (`$`, `→`, `·`, `×`) or label.
