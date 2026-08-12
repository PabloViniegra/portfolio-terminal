# Motion Tokens

> **Motion communicates, never performs.**
> Every animation answers "what just changed?". Decorative motion is banned.

## Duration Tokens

| Token | Value | Used for |
|-------|-------|----------|
| `--motion-instant` | `0ms` | Press feedback (background swap on `:active`) |
| `--motion-fast` | `150ms` | Hover state, focus ring, color transitions |
| `--motion-base` | `200ms` | State transitions (panel open, dropdown show) |
| `--motion-medium` | `300ms` | Theme switch, content fade-in |
| `--motion-slow` | `400ms` | Modal / sheet open (rare in this system) |
| `--motion-cursor` | `1000ms` | Cursor blink (step-end infinite) |

**Default for UI transitions**: `--motion-fast` (150ms). When in doubt, use this. Faster feels broken; slower feels theatrical.

**Maximum duration**: 500ms. Any animation longer than that is performing, not communicating.

## Easing Tokens

| Token | Value | Used for |
|-------|-------|----------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default for enter animations (expo-out) |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Theme switch, bidirectional state changes |
| `--ease-step` | `steps(1, end)` | Cursor blink (hard on/off, no fade) |
| `--ease-linear` | `linear` | Loading dots (consistent timing) |

**Default easing**: `--ease-out` for entering, `--ease-in` for exiting. The exit pattern in this codebase is mostly instant transitions (the cursor leaves the input when command submits, no fade).

**Banned**: linear easing for UI chrome (buttons, links, hovers). It feels mechanical and wrong.

## Animation Patterns

### 1. Hover State
```css
.terminal-link {
  transition: color var(--motion-fast) var(--ease-out);
}
.terminal-link:hover {
  color: var(--terminal-accent);
}
```
- Duration: `--motion-fast` (150ms)
- Easing: `--ease-out`
- Property: `color`, `border-color`, `background-color` only

### 2. Theme Switch
```css
body {
  transition:
    background-color var(--motion-medium) var(--ease-in-out),
    color var(--motion-medium) var(--ease-in-out);
}
```
- Duration: `--motion-medium` (300ms)
- Easing: `--ease-in-out`
- Properties: `background-color`, `color`, `border-color` (via CSS variables)
- Why 300ms: theme switch is a world change, not a state change. Faster feels jarring.

### 3. Cursor Blink
```css
.terminal-cursor {
  animation: blink var(--motion-cursor) var(--ease-step) infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```
- Duration: `--motion-cursor` (1000ms)
- Easing: `--ease-step` (hard transitions, no fade)
- Property: `opacity` only
- Why: real terminals blink; this is one of the few "infinite loops" we permit

### 4. Command Output Appearing
```css
.terminal-output {
  animation: appear var(--motion-base) var(--ease-out) both;
}
@keyframes appear {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
- Duration: `--motion-base` (200ms)
- Easing: `--ease-out`
- Properties: `opacity`, `transform: translateY` only (GPU-friendly)
- Why: signals "new content arrived" without being theatrical

### 5. Loading Dots
```css
.loading-dot {
  animation: pulse var(--motion-base) var(--ease-linear) infinite alternate;
}
```
- Duration: `--motion-base` (200ms), staggered 200ms between dots
- Property: `opacity` only

### 6. Matrix Rain (Easter Egg)
- This is the one allowed infinite decorative loop, and only when explicitly activated via `/rain`.
- Implemented via canvas or DOM rain with `transform: translateY` only (no `top`/`left` animations).
- Respect `prefers-reduced-motion`: collapse to a static field with no animation.
- Exit via `Ctrl+C` keypress — interrupts cleanly without waiting for animation to complete.

## Transform-Only Animation

**Hard rule**: animate `transform` and `opacity` only. Never `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding`.

This is not a preference — it's a performance constraint. Animating layout properties triggers reflow on every frame, drops FPS below 60, and on mobile kills the user experience.

```css
/* ✅ Good: GPU-friendly */
.terminal-panel {
  transform: translateY(0);
  opacity: 1;
  transition: transform 200ms var(--ease-out), opacity 200ms var(--ease-out);
}

/* ❌ Banned: triggers reflow */
.terminal-panel {
  top: 0;
  height: 200px;
  transition: top 200ms, height 200ms;
}
```

## Interruption

**Hard rule**: animations must be interruptible. A user tapping a button mid-animation should override the in-progress animation immediately, not wait for it to finish.

- Hover state: cancel and reverse instantly.
- Theme switch: re-apply the new theme; the transition catches up.
- Loading dots: pause on `disabled`, resume when re-enabled.

## Reduced Motion

Future work: respect `prefers-reduced-motion: reduce`. Design intent:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* Matrix rain should collapse to a static field */
  .matrix-rain-canvas {
    animation: none;
  }
}
```

The cursor blink may stay (low distraction, signals interactivity); loading dots may simplify to a static spinner.

## Anti-Patterns

❌ **Banned**: Bouncing buttons (`@keyframes bounce`).
❌ **Banned**: Spring physics on UI chrome (buttons, links, panels). Save for specific gesture interactions if ever.
❌ **Banned**: Infinite decorative loops (Matrix rain is the only allowed loop, and only on activation).
❌ **Banned**: Animations > 500ms.
❌ **Banned**: `linear` easing on UI chrome.
❌ **Banned**: Animating layout properties (`width`, `height`, `top`, etc.).
❌ **Banned**: Animations that the user cannot cancel or interrupt.
❌ **Banned**: Parallax on hover (perf killer, often disorienting).

## Implementation Note

The codebase uses CSS animations and transitions directly. No animation library (Framer Motion, GSAP) is currently in use. If we add one:
- For React island components only (not Astro pages)
- For orchestrated sequences that would be unwieldy in CSS
- Never for hover states or simple transitions — CSS handles those better
