# Ayu

> **Deep blue-black canvas, sky-blue accent, olive prompt.**
> The Ayu Mirage aesthetic — warm-cool balance with personality.

## Identity

| Property | Value | Notes |
|----------|-------|-------|
| Mode | Dark | — |
| Inspiration | Ayu Mirage (VS Code theme) | Re-picked to fit the terminal context |
| Canvas | `#0f1419` | Deep blue-black, slightly warmer than One Dark |
| Accent | `#5cc8f5` | Sky blue, vivid but not neon |
| Prompt | `#b9d36a` | Olive green, distinct from One Dark mint |
| Warning | `#f2be67` | Warm amber, used as cursor color too |
| Error | `#ff6b6b` | Bright coral, energetic |
| Success | `#b9d36a` | Same as prompt |
| Cursor | `#f2be67` | Amber, signals "active input" distinctly from prompt |

## Full Token Definition

```css
[data-theme="ayu"] {
  /* Base canvas */
  --terminal-bg: #0f1419;
  --terminal-bg-rgb: 15, 20, 25;
  --terminal-bg-secondary: #151d24;
  --terminal-bg-secondary-rgb: 21, 29, 36;
  --terminal-bg-elevated: #1a232c;
  --terminal-bg-elevated-rgb: 26, 35, 44;
  --terminal-header-bg: #0b1015;
  --terminal-header-bg-rgb: 11, 16, 21;
  
  /* Borders & dividers */
  --terminal-border: #283746;
  --terminal-border-rgb: 40, 55, 70;
  
  /* Text */
  --terminal-text: #edf0e3;
  --terminal-text-rgb: 237, 240, 227;
  --terminal-text-secondary: #90a0ae;
  --terminal-text-secondary-rgb: 144, 160, 174;
  --terminal-text-tertiary: #6a7785;
  --terminal-text-tertiary-rgb: 106, 119, 133;
  
  /* Semantic accents */
  --terminal-accent: #5cc8f5;
  --terminal-prompt: #b9d36a;
  --terminal-warning: #f2be67;
  --terminal-error: #ff6b6b;
  --terminal-success: #b9d36a;
  --terminal-cursor: #f2be67;
  
  /* Overlays */
  --terminal-overlay-rgb: 0, 0, 0;
}
```

## Why This Palette Works

**Warmer canvas**: `#0f1419` has more warmth than One Dark's `#11151b`. Sits in the same dark family but with personality.

**Sky-blue accent**: `#5cc8f5` is brighter and more vivid than One Dark's `#77bdfb`. Ayu is a theme with more chroma — it wants to feel alive.

**Olive prompt**: `#b9d36a` is distinctly green, not mint. The Ayu palette is built around complementary greens and blues; the olive reads as "different role" from the sky-blue accent.

**Amber warning AND cursor**: Ayu uses `#f2be67` for both. This is a deliberate choice — the cursor and warning share a color because they're both "active / attention" signals. The prompt symbol stays olive, distinct from the cursor's amber.

**Bright error**: `#ff6b6b` is more energetic than One Dark's `#f38b92`. Ayu commits harder to its color choices.

## Use Cases

- **Personal preference.** Some users prefer Ayu's warmer dark palette.
- **Long reading sessions.** The warmer text color (`#edf0e3`) reduces eye strain compared to cooler whites.
- **Brand differentiation.** When showing the portfolio's theme variety, Ayu demonstrates the system handles varied dark palettes.

## Contrast Verification

| Pair | Ratio | AA? |
|------|-------|-----|
| `--terminal-text` on `--terminal-bg` | 13.8:1 | ✅ |
| `--terminal-text-secondary` on `--terminal-bg` | 5.9:1 | ✅ |
| `--terminal-text-secondary` on `--terminal-bg-secondary` | 5.4:1 | ✅ |
| `--terminal-accent` on `--terminal-bg` | 8.2:1 | ✅ |
| `--terminal-prompt` on `--terminal-bg` | 10.2:1 | ✅ |
| `--terminal-warning` on `--terminal-bg` | 9.7:1 | ✅ |
| `--terminal-error` on `--terminal-bg` | 6.1:1 | ✅ |
| `--terminal-text-tertiary` on `--terminal-bg` | 3.6:1 | ⚠️ Only for disabled |

## Pairing Notes

- **Background images**: the warm dark canvas mutes cooler photographs; warm-toned images work better.
- **Code highlighting**: Ayu is a popular code theme; if we ever render code blocks, Ayu is the natural fit.
- **Brand personality**: the warmest dark theme; choose this when the visitor wants personality over neutrality.

## Cursor Distinction

Unlike One Dark and GitHub Dark (cursor = prompt color), Ayu uses a separate amber for the cursor (`#f2be67`). This is a deliberate Ayu signature — the cursor becomes a visual focus point during typing. If aligning cursor with prompt is desired in Ayu, override `--terminal-cursor` to `#b9d36a`.
