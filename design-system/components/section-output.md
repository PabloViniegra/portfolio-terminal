# Section Output

> **Renders structured content based on the active command.**
> One renderer, four content types: experience, projects, skills, contact.

## Purpose

The SectionOutput is a router component. It receives a `section` prop (which command was run) and the data for that section, then renders the appropriate sub-component.

The renderer is intentionally thin — each section has its own component with its own visual treatment. The router exists to keep the command logic in `Terminal.tsx` clean.

## Anatomy

```
$ inspect projects.registry                        4 builds
─                                              ─
FEATURED BUILDS                                ─
────────────────────────────────────────────────────────────
TYPE         PROJECT NAME                         LINKS
primary      Project One                          Live →  Repo →
              Scope text
              Description text
              React · TypeScript · Astro

TYPE         Project Two                          Live →  Repo →
              Scope text
              ...
────────────────────────────────────────────────────────────
ARCHIVE
────────────────────────────────────────────────────────────
TYPE         PROJECT NAME                         LINKS
              Scope text                          Live →  Repo →
```

## Variants

### Experience Section
Renders work history as a vertical timeline.

```
$ inspect experience.log                          3 entries
──────────────────────────────────────────────────────
2024 - 2025  Senior Engineer @ Company
              Description of role and impact.
              [React] [TypeScript] [Astro] [Postgres]
```

### Projects Section
Renders projects grouped by `featured` status (Featured builds, Archive).

### Skills Section
Renders knowledge categories with ratings + soft skills list.

### Contact Section
Renders contact items (email, GitHub, LinkedIn) with a CTA message.

## Tokens Used

### Section Header
| Token | Where |
|-------|-------|
| `--terminal-text` | "$" and command text |
| `--terminal-prompt` | "$" symbol color |
| `--terminal-accent` | Command verb (`inspect`, `cat`, etc.) |
| `--terminal-text-secondary` | Argument text (path-like) |
| `--font-mono` | All header text |
| `--font-size-sm` | Header size |
| `--space-4` | Bottom margin |

### Section Eyebrow
| Token | Where |
|-------|-------|
| `--terminal-text-secondary` | Eyebrow text color |
| `--font-mono` | Eyebrow font |
| `--font-size-xs` | Eyebrow size (11px) |
| `--tracking-widest` | Letter spacing (0.22em) |

### Dividers
| Token | Where |
|-------|-------|
| `--terminal-border` | 40% opacity for section dividers |
| `1px` height | Hairline divider |

### Project Cards (Featured)
| Token | Where |
|-------|-------|
| `--terminal-text` | Project title |
| `--terminal-text-secondary` | Scope, description, technologies |
| `--terminal-accent` | Type badge, links on hover |
| `--terminal-border` | 60% opacity for top border |

### Project Cards (Archive)
Same tokens as Featured, but:
- Reduced padding (`py-3` vs `py-5`)
- Reduced font sizes (`text-sm` vs `text-lg`)
- Border at 30% opacity (lighter divider)

### Skills
| Token | Where |
|-------|-------|
| `--terminal-text-secondary` | Category label |
| `--terminal-text` | Skill name |
| `--terminal-accent` | Skill rating indicator (filled portion) |
| `--terminal-border` | Skill rating track (unfilled portion) |

### Contact
| Token | Where |
|-------|-------|
| `--terminal-text` | Contact item title |
| `--terminal-text-secondary` | Contact item description |
| `--terminal-accent` | Link color, hover state |

## Behavior

### Loading State
- Inherited from terminal command processing (250-600ms random delay simulates shell behavior)
- During this time, the input is disabled
- The section appears when the delay completes

### Empty State
- If a section has no data (e.g., no projects), the section header renders but the body is empty
- Future improvement: add empty state with "no projects yet" message

### Error State
- Not currently handled at the section level (errors are at the command level for "command not found")
- Future improvement: handle per-section loading errors with retry

## Accessibility

### Structure
- Each section uses semantic HTML (`<section>`, `<article>`, `<h2>`, `<h3>`, `<h4>`)
- Heading hierarchy: h3 for section title (under page h1), h4 for individual items
- Lists use `<ul>` with `<li>` for technology tags, contact items

### ARIA
- Section roots have no explicit role (default `<section>` is sufficient)
- Links have descriptive `aria-label` when icon-only (currently uses text labels)
- Status count (e.g., "4 builds") uses `<span>` with `aria-label` or visible text

### Keyboard
- All links and buttons in sections are natively keyboard-focusable
- No custom keyboard handling needed at this level (the terminal handles global keys)

## Implementation

```tsx
const SectionOutput = ({ section, data }: SectionOutputProps) => {
  switch (section) {
    case 'home':
      return <WelcomeMessage {...data} />;
    case 'experience':
      return <ExperienceSection experiences={data.experiences} />;
    case 'projects':
      return <ProjectsSection projects={data.projects} />;
    case 'skills':
      return <SkillsSection {...data} />;
    case 'contact':
      return <ContactSection {...data} />;
    default:
      return null;
  }
};
```

## Section Components

Each section lives in `src/components/sections/`:

### ExperienceSection
Vertical list with date range, role, company, description, tags.

### ProjectsSection
Two-tier: Featured builds (rich cards) + Archive (compact rows).

### SkillsSection
Knowledge categories (technical skills with rating) + soft skills list.

### ContactSection
Contact items as cards with CTA message.

## Anti-Patterns

❌ **Banned**: Loading all sections eagerly — the parent (`Terminal.tsx`) controls render timing.
❌ **Banned**: Inline styles for theme-aware elements — use tokens.
❌ **Banned**: Section components that ignore their data prop (always render based on props, never hardcoded content).
❌ **Banned**: Inconsistent heading hierarchy — sections use h2, items use h3, sub-items use h4. No skipping levels.
❌ **Banned**: Mixing markdown and JSX content in a single section — pick one source of truth (currently JSON via Content Collections).
❌ **Banned**: Section that does not respond to its `data` prop changes (must re-render when new data arrives).
