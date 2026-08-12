# Spacing Tokens

> **A 4px base scale, an 8px rhythm.**
> Never guess. Always reach for a token.

## Base Scale

4px increments. Always.

| Token | Value | Used for |
|-------|-------|----------|
| `--space-0` | `0` | Reset, no spacing |
| `--space-1` | `0.25rem` (4px) | Inline icon gap, hairline divider offset |
| `--space-2` | `0.5rem` (8px) | Tight related elements (icon + label, command + timestamp) |
| `--space-3` | `0.75rem` (12px) | List item padding (vertical), inline group gap |
| `--space-4` | `1rem` (16px) | Component inner padding, button padding |
| `--space-5` | `1.25rem` (20px) | Card padding, panel inner padding |
| `--space-6` | `1.5rem` (24px) | Section inner padding, mobile page padding |
| `--space-8` | `2rem` (32px) | Section separator, between major components |
| `--space-10` | `2.5rem` (40px) | Large section gap (rare) |
| `--space-12` | `3rem` (48px) | Page-level vertical rhythm (hero bottom margin) |
| `--space-16` | `4rem` (64px) | Max vertical rhythm (terminal outer padding) |
| `--space-20` | `5rem` (80px) | Whitespace breaks in dense content (rare) |

**Never use odd values** (5px, 7px, 13px). Always reach for a multiple of 4.

## Component Padding Map

| Component | Padding |
|-----------|---------|
| Terminal shell outer | `space-6` (24px) on desktop, `space-2` (8px) on mobile |
| Terminal header | `space-4` horizontal, `space-3` vertical |
| Terminal body | `space-5` (20px) on desktop, `space-2` (8px) on mobile |
| Terminal footer (input) | `space-4` (16px) all sides |
| Command input shell | `space-4` horizontal, `space-3` vertical |
| Section card | `space-4` to `space-5` |
| Suggestion popover item | `space-3` vertical, `space-4` horizontal |
| Theme dropdown item | `space-2.5` vertical, `space-4` horizontal |
| Quick command pill | `space-1.5` vertical, `space-3` horizontal |
| Tab pill | `space-2` vertical, `space-3` horizontal |

## Vertical Rhythm

Major sections separated by 24-32px. Same-section items separated by 4-12px. Inter-card gap is 24px in lists, 16px in dense lists.

```
Section A (32px gap)
  Item 1 (12px gap)
  Item 2 (12px gap)
  Item 3 (12px gap)
Section B (32px gap)
  Item 1 (12px gap)
  ...
```

## Layout Containers

| Container | Max width |
|-----------|-----------|
| Page outer (`<main>` in TerminalLayout) | `1024px` (max-w-5xl) |
| Terminal shell | `100%` within container |
| Terminal body inner | `768px` (max-w-4xl for narrative sections) |
| Welcome message column | `768px` (max-w-3xl) |
| Help command row | `176px` label + flex content (md:grid-cols-[11rem_minmax(0,1fr)]) |
| Project card meta (right column on desktop) | Auto-sized, aligned end |

## Mobile Spacing Overrides

On `< 768px`, the rhythm compresses:
- Outer page padding: `space-2` to `space-3`
- Terminal body padding: `space-2` to `space-3`
- Section gap: `space-6` (down from `space-8`)
- Component padding: `space-3` (down from `space-4` to `space-5`)

The 4px base scale does NOT change on mobile — only the multipliers compress.

## Border Radius

A consistent radius scale. We pick ONE strategy and apply it everywhere.

| Token | Value | Used for |
|-------|-------|----------|
| `--radius-none` | `0` | Mono labels, command lines, dividers, anything terminal-y |
| `--radius-sm` | `6px` | Small pills, status badges (rare) |
| `--radius-md` | `12px` | Inner panels, suggestion popover |
| `--radius-lg` | `16px` | Theme dropdown, mobile terminal shell |
| `--radius-xl` | `18px` | Desktop terminal shell (outer) |
| `--radius-full` | `9999px` | Pills (status, quick commands) |

**Shape Consistency Lock**: Mono labels and command lines are always `radius-none`. Pills are always `radius-full`. Cards/panels are always `radius-md` to `radius-lg`. The terminal shell is always `radius-lg` to `radius-xl`.

**Banned**: Mixed radius strategies within the same component type. Don't have a rounded pill next to a sharp pill. Pick the family and stick.

## Anti-Patterns

❌ **Banned**: Arbitrary spacing values (`mt-[13px]`, `p-[7px]`). Use the scale.
❌ **Banned**: Negative margins to "fix" layout. Restructure the layout instead.
❌ **Banned**: Mixing border radius strategies (rounded buttons inside a sharp terminal look = visual chaos).
❌ **Banned**: Using padding as the only separator when content is dense. Pair padding with a 1px `--terminal-border` divider.

## Implementation Note

Tailwind v4 + arbitrary value notation works for tokens that don't have Tailwind utilities:

```tsx
<div className="p-[var(--space-4)]">       {/* works */}
<div className="p-4">                       {/* works too, equivalent */}
<div className="rounded-[var(--radius-md)]"> {/* works */}
<div className="rounded-xl">                {/* equivalent if registered */}
```

Prefer Tailwind utilities (`p-4`, `rounded-xl`) when they exist; reach for arbitrary values when the design system token is more specific than the Tailwind default.
