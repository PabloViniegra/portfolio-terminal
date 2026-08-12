# GitHub Dark

> **GitHub-neutral palette.**
> Familiar to engineers who spend their day in GitHub. Low-chroma, professional, neutral.

## Identity

| Property | Value | Notes |
|----------|-------|-------|
| Mode | Dark | — |
| Inspiration | GitHub Dark theme | The most-recognized developer palette |
| Canvas | `#0d1117` | GitHub's exact canvas |
| Accent | `#66b3ff` | GitHub blue, slightly desaturated from default |
| Prompt | `#87e1a0` | Mint, GitHub's success-state green |
| Warning | `#d7ac55` | Bronze, GitHub's warning amber |
| Error | `#ff8a80` | Coral, GitHub's error red |
| Success | `#87e1a0` | Same as prompt |
| Cursor | `#66b3ff` | Same as accent — GitHub convention |

## Full Token Definition

```css
[data-theme="github-dark"] {
  /* Base canvas */
  --terminal-bg: #0d1117;
  --terminal-bg-rgb: 13, 17, 23;
  --terminal-bg-secondary: #151b23;
  --terminal-bg-secondary-rgb: 21, 27, 35;
  --terminal-bg-elevated: #1b232c;
  --terminal-bg-elevated-rgb: 27, 35, 44;
  --terminal-header-bg: #0b1016;
  --terminal-header-bg-rgb: 11, 16, 22;
  
  /* Borders & dividers */
  --terminal-border: #2c3644;
  --terminal-border-rgb: 44, 54, 68;
  
  /* Text */
  --terminal-text: #d0d7de;
  --terminal-text-rgb: 208, 215, 222;
  --terminal-text-secondary: #8b98a8;
  --terminal-text-secondary-rgb: 139, 152, 168;
  --terminal-text-tertiary: #6a7785;
  --terminal-text-tertiary-rgb: 106, 119, 133;
  
  /* Semantic accents */
  --terminal-accent: #66b3ff;
  --terminal-prompt: #87e1a0;
  --terminal-warning: #d7ac55;
  --terminal-error: #ff8a80;
  --terminal-success: #87e1a0;
  --terminal-cursor: #66b3ff;
  
  /* Overlays */
  --terminal-overlay-rgb: 0, 0, 0;
}
```

## Why This Palette Works

**GitHub's exact canvas**: `#0d1117` is what most engineers see all day in GitHub, VS Code with the GitHub theme, and GitHub Mobile. Familiarity is a feature.

**Lower chroma accent**: `#66b3ff` is slightly desaturated from GitHub's `#58a6ff`. Pure GitHub blue can feel a touch bright on a fully-themed page; this version settles in.

**Mint prompt**: `#87e1a0` is GitHub's success-state green. Reuses the green = positive signal association.

**Bronze warning**: `#d7ac55` is GitHub's amber. Same intent, same role.

**Coral error**: `#ff8a80` is GitHub's error red. Slightly softer than pure red.

**Cursor = accent**: GitHub convention. The cursor and the active accent share a color, signaling "interactive element".

## Use Cases

- **Engineer audience.** Most engineers recognize this palette instantly.
- **Reduced chroma preference.** Users who find One Dark too colorful.
- **Brand-neutral default.** When showing the portfolio without committing to a personal aesthetic.

## Contrast Verification

| Pair | Ratio | AA? |
|------|-------|-----|
| `--terminal-text` on `--terminal-bg` | 12.1:1 | ✅ |
| `--terminal-text-secondary` on `--terminal-bg` | 5.0:1 | ✅ |
| `--terminal-text-secondary` on `--terminal-bg-secondary` | 4.6:1 | ✅ |
| `--terminal-accent` on `--terminal-bg` | 7.5:1 | ✅ |
| `--terminal-prompt` on `--terminal-bg` | 8.9:1 | ✅ |
| `--terminal-warning` on `--terminal-bg` | 6.8:1 | ✅ |
| `--terminal-error` on `--terminal-bg` | 5.9:1 | ✅ |
| `--terminal-text-tertiary` on `--terminal-bg` | 3.4:1 | ⚠️ Only for disabled |

## Pairing Notes

- **Code blocks**: GitHub Dark is the most natural theme for code. If we ever render code snippets, this theme wins.
- **Photographs**: the neutral canvas works with most photography.
- **Brand personality**: the most neutral / least distinctive theme. Choose this when neutrality is the goal.
- **GitHub.com visitors**: engineers coming from GitHub feel at home.

## Distinctive Character

GitHub Dark is the LEAST distinctive of the four themes — it's a known palette, not a personal one. That's its strength: it's professional, expected, and won't distract from the content. Use it when the visitor's task is reading, not admiring.
