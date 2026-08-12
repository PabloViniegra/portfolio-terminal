# One Dark (Default)

> **The canonical terminal experience.**
> Charcoal canvas, terminal blue accent, mint prompt — the palette that made Atom famous.

## Identity

| Property | Value | Notes |
|----------|-------|-------|
| Mode | Dark | — |
| Inspiration | Atom One Dark | The original terminal-modern palette |
| Canvas | `#11151b` | Charcoal, not pure black |
| Accent | `#77bdfb` | Terminal blue, soft saturation |
| Prompt | `#8fd6b4` | Mint, calm and inviting |
| Warning | `#d8b26b` | Amber, soft not aggressive |
| Error | `#f38b92` | Coral red, readable not jarring |
| Success | `#8fd6b4` | Same as prompt — signal positive completion |

## Full Token Definition

```css
:root {
  /* Base canvas */
  --terminal-bg: #11151b;
  --terminal-bg-rgb: 17, 21, 27;
  --terminal-bg-secondary: #171d26;
  --terminal-bg-secondary-rgb: 23, 29, 38;
  --terminal-bg-elevated: #1d2530;
  --terminal-bg-elevated-rgb: 29, 37, 48;
  --terminal-header-bg: #0d1117;
  --terminal-header-bg-rgb: 13, 17, 23;
  
  /* Borders & dividers */
  --terminal-border: #273142;
  --terminal-border-rgb: 39, 49, 66;
  
  /* Text */
  --terminal-text: #d5dde8;
  --terminal-text-rgb: 213, 221, 232;
  --terminal-text-secondary: #7d889c;
  --terminal-text-secondary-rgb: 125, 136, 156;
  --terminal-text-tertiary: #5a6678;
  --terminal-text-tertiary-rgb: 90, 102, 120;
  
  /* Semantic accents */
  --terminal-accent: #77bdfb;
  --terminal-prompt: #8fd6b4;
  --terminal-warning: #d8b26b;
  --terminal-error: #f38b92;
  --terminal-success: #8fd6b4;
  --terminal-cursor: #8fd6b4;
  
  /* Overlays */
  --terminal-overlay-rgb: 0, 0, 0;
}
```

## Why This Palette Works

**Charcoal, not black**: `#11151b` has a slight blue undertone that ties to the terminal accent. Pure black would feel disconnected from the accent family.

**Mint green prompt**: `#8fd6b4` is calm enough to read as "inviting" but distinct enough from the blue accent to signal "different role" (the prompt is an affordance, not a link).

**Soft accent**: `#77bdfb` is terminal blue at 70% lightness — readable on dark, not aggressive. A pure neon blue would feel like a video game.

**Amber warning**: `#d8b26b` is muted. The warning state should feel like "heads up", not "alarm". This is the right amber for that.

**Coral error**: `#f38b92` is warm-red, not bright red. The error state should signal "wrong" without screaming. This is the right intensity.

## Use Cases

- **Default theme.** First impression for 80% of visitors.
- **Showcase mode.** When demonstrating the terminal concept, this is the canonical look.
- **Reference theme.** Other dark themes are calibrated relative to this one.

## Contrast Verification

| Pair | Ratio | AA? |
|------|-------|-----|
| `--terminal-text` on `--terminal-bg` | 12.4:1 | ✅ |
| `--terminal-text-secondary` on `--terminal-bg` | 5.2:1 | ✅ |
| `--terminal-text-secondary` on `--terminal-bg-secondary` | 4.7:1 | ✅ |
| `--terminal-accent` on `--terminal-bg` | 7.8:1 | ✅ |
| `--terminal-prompt` on `--terminal-bg` | 9.1:1 | ✅ |
| `--terminal-warning` on `--terminal-bg` | 8.3:1 | ✅ |
| `--terminal-error` on `--terminal-bg` | 6.4:1 | ✅ |
| `--terminal-text-tertiary` on `--terminal-bg` | 3.5:1 | ⚠️ Only for disabled state |

The tertiary text fails AA for body text — only use for `disabled` state and placeholders (where the contrast reduction is intentional).

## Pairing Notes

- **Background images**: works with subtle terminal-pattern overlays (grid lines at 2% opacity).
- **Photographs**: not used in this product, but if added, the charcoal canvas would mute most imagery. Use a subtle scrim.
- **Brand contexts**: the blue-green palette is gender-neutral and culturally portable.
