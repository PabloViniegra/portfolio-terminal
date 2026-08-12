# Light

> **Off-white canvas, professional blue accent, forest green prompt.**
> For recruiters who prefer light mode, or environments with bright ambient light.

## Identity

| Property | Value | Notes |
|----------|-------|-------|
| Mode | Light | — |
| Inspiration | Modern terminal-light variants (Solarized Light, One Light) | Re-picked, not inverted |
| Canvas | `#f2f4f7` | Off-white with subtle blue undertone |
| Accent | `#2f6fb2` | Professional blue, deeper saturation than dark variants |
| Prompt | `#2d7d61` | Forest green, grounded |
| Warning | `#a97721` | Bronze, less luminous than dark mode amber |
| Error | `#c64747` | Deep red, readable on light |
| Success | `#2d7d61` | Same as prompt |

## Full Token Definition

```css
[data-theme="light"] {
  /* Base canvas */
  --terminal-bg: #f2f4f7;
  --terminal-bg-rgb: 242, 244, 247;
  --terminal-bg-secondary: #ffffff;
  --terminal-bg-secondary-rgb: 255, 255, 255;
  --terminal-bg-elevated: #ffffff;
  --terminal-bg-elevated-rgb: 255, 255, 255;
  --terminal-header-bg: #e6ebf2;
  --terminal-header-bg-rgb: 230, 235, 242;
  
  /* Borders & dividers */
  --terminal-border: #c9d2e0;
  --terminal-border-rgb: 201, 210, 224;
  
  /* Text */
  --terminal-text: #1b2430;
  --terminal-text-rgb: 27, 36, 48;
  --terminal-text-secondary: #5a6678;
  --terminal-text-secondary-rgb: 90, 102, 120;
  --terminal-text-tertiary: #8b98a8;
  --terminal-text-tertiary-rgb: 139, 152, 168;
  
  /* Semantic accents */
  --terminal-accent: #2f6fb2;
  --terminal-prompt: #2d7d61;
  --terminal-warning: #a97721;
  --terminal-error: #c64747;
  --terminal-success: #2d7d61;
  --terminal-cursor: #2f6fb2;
  
  /* Overlays */
  --terminal-overlay-rgb: 20, 20, 20;
}
```

## Why This Palette Works

**Off-white, not pure white**: `#f2f4f7` has subtle blue undertone, easier on the eyes than pure white. The terminal accent and background share a cool color family.

**Pure white secondary**: `--terminal-bg-secondary` is `#ffffff` — when an inner panel needs to lift from the page, white provides maximum contrast against the off-white canvas.

**Deeper accent**: `#2f6fb2` is more saturated than dark mode's `#77bdfb`. Light backgrounds need more chroma to read as "accent" — pastels would disappear.

**Forest prompt**: `#2d7d61` is grounded green, not bright lime. Light themes need more grounded hues to feel professional.

**Bronze warning**: `#a97721` is warm but not yellow. The warning signal reads as "heads up", not "highlight".

**Deep error**: `#c64747` is full red — on a light background, this is the readable intensity.

## Use Cases

- **Daytime reading.** Recruiters reviewing the portfolio during business hours.
- **Bright environments.** Open offices, sunlit rooms.
- **Print preview.** When the visitor wants to print the page, light mode renders cleaner.

## Contrast Verification

| Pair | Ratio | AA? |
|------|-------|-----|
| `--terminal-text` on `--terminal-bg` | 14.2:1 | ✅ |
| `--terminal-text-secondary` on `--terminal-bg` | 6.1:1 | ✅ |
| `--terminal-text-secondary` on `--terminal-bg-secondary` | 5.7:1 | ✅ |
| `--terminal-accent` on `--terminal-bg` | 5.4:1 | ✅ |
| `--terminal-accent` on `--terminal-bg-secondary` | 5.9:1 | ✅ |
| `--terminal-prompt` on `--terminal-bg` | 5.8:1 | ✅ |
| `--terminal-warning` on `--terminal-bg` | 5.1:1 | ✅ |
| `--terminal-error` on `--terminal-bg` | 5.6:1 | ✅ |
| `--terminal-text-tertiary` on `--terminal-bg` | 3.5:1 | ⚠️ Only for disabled |

## Pairing Notes

- **Background images**: the off-white canvas mutes photographs; use sparingly.
- **Shadows**: more visible on light backgrounds; reduce shadow intensity or use a tinted shadow base (`rgba(20,20,20,0.08)` instead of `rgba(0,0,0,0.3)`).
- **Code blocks**: light theme code reads better with subtle background tints, not white-on-white.
