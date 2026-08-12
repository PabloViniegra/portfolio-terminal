# Components

> **The composite layer.**
> How tokens compose into reusable UI patterns. Each component here is documented with its anatomy, behavior, accessibility, and tokens consumed.

## Component Index

| Component | File | Purpose |
|-----------|------|---------|
| Terminal Shell | [terminal.md](terminal.md) | The outer container — header, body, footer |
| Command Input | [command-input.md](command-input.md) | The prompt + input + suggestions |
| Section Output | [section-output.md](section-output.md) | Renders content sections (projects, experience, etc.) |
| Theme Switcher | [theme-switcher.md](theme-switcher.md) | Theme picker dropdown |
| Matrix Rain | (in code) | Easter egg canvas overlay |
| UI Patterns | [ui-patterns.md](ui-patterns.md) | Reusable patterns: eyebrows, dividers, status badges, etc. |

## Component Principles

1. **Components consume tokens, never raw values.** If a component uses `#77bdfb`, that's a bug.
2. **Components work in all four themes.** If a component is theme-specific, it's not a reusable component.
3. **Components declare their accessibility upfront.** ARIA roles, keyboard support, focus management — not afterthoughts.
4. **Components document their motion.** What animates, why, and for how long.
5. **Components are honest about their state.** Loading, empty, error states are part of the API, not edge cases.

## Component Anatomy Convention

Each component doc uses the same structure:

```
## Purpose         ← what it does, why it exists
## Anatomy         ← visual structure with ASCII or description
## Tokens Used     ← every token it consumes
## Behavior        ← interaction model, state, transitions
## Accessibility   ← ARIA, keyboard, screen reader
## Variants        ← available variants (size, state, theme)
## Implementation  ← code example
## Anti-Patterns   ← what NOT to do
```

## Component Boundaries

The portfolio's components fall into three categories:

### Container Components
- **Terminal Shell** — the outermost wrapper that defines the product's frame
- **Theme Switcher** — global UI, lives in the header

### Interaction Components
- **Command Input** — the primary input mechanism
- **Suggestion Popover** — autocomplete UX

### Content Components
- **Section Output** — renders structured content (projects, experience, skills, contact)
- **Welcome Message** — initial state content
- **Help Message** — `/help` content
- **Matrix Rain** — easter egg overlay

## Component File Locations

```
src/
├── components/
│   ├── Terminal.tsx              ← shell container
│   ├── CommandInput.tsx          ← input + prompt + autocomplete
│   ├── CommandSuggestions.tsx    ← suggestion popover
│   ├── SectionOutput.tsx         ← section renderer
│   ├── ThemeSwitcher.tsx         ← theme picker
│   ├── MatrixRain.tsx            ← easter egg
│   ├── Avatar.tsx                ← profile image
│   ├── TerminalLoader.tsx        ← loading state
│   ├── MobileWarning.astro       ← mobile advisory
│   └── sections/                 ← individual section components
│       ├── ExperienceSection.tsx
│       ├── ProjectsSection.tsx
│       ├── SkillsSection.tsx
│       └── ContactSection.tsx
```

## Component Quality Bar

A component is shippable when:

- [ ] Uses semantic tokens only
- [ ] Works in all 4 themes
- [ ] Keyboard-only operation works
- [ ] ARIA roles and labels are correct
- [ ] Loading, empty, and error states exist
- [ ] Animations have purpose and respect `prefers-reduced-motion`
- [ ] No raw hex values in markup
- [ ] No emoji as icons
- [ ] No `z-50` arbitrary values
- [ ] Documented in this folder
