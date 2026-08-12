import type { ThemeType } from '../hooks/useTheme';

/**
 * Theme metadata for the portfolio terminal.
 *
 * Each theme is documented in `/design-system/themes/<id>.md` with full token
 * values, contrast verification, and character description. This file holds the
 * runtime metadata (id, name, preview color, character) used by the
 * ThemeSwitcher.
 *
 * @module constants/themes
 */

/**
 * Theme preview color: a Tailwind utility class for the dot rendered in the
 * theme switcher. These are the only raw hex values allowed in components —
 * they represent theme identity at the picker, not theme application.
 */
export interface Theme {
  id: ThemeType;
  name: string;
  color: string;
  mode: 'dark' | 'light';
  character: string;
}

/**
 * Available themes.
 *
 * Order is the user-visible order in the ThemeSwitcher. One Dark first because
 * it is the default and the canonical experience; the rest follow.
 */
export const THEMES: readonly Theme[] = [
  {
    id: 'one-dark',
    name: 'One Dark',
    color: 'bg-[#61afef]',
    mode: 'dark',
    character: 'Charcoal canvas, terminal blue accent, mint prompt.',
  },
  {
    id: 'light',
    name: 'Light',
    color: 'bg-[#e5c07b]',
    mode: 'light',
    character: 'Off-white canvas, professional blue accent, forest green prompt.',
  },
  {
    id: 'ayu',
    name: 'Ayu',
    color: 'bg-[#ffb454]',
    mode: 'dark',
    character: 'Deep blue-black canvas, sky-blue accent, olive prompt.',
  },
  {
    id: 'github-dark',
    name: 'GitHub',
    color: 'bg-[#58a6ff]',
    mode: 'dark',
    character: 'GitHub-neutral palette, blue accent, mint prompt.',
  },
] as const;

/** Theme applied on first load (no localStorage entry). */
export const DEFAULT_THEME: ThemeType = 'one-dark';

/** Lookup a theme by id. Falls back to the default theme. */
export function getTheme(id: ThemeType | string | null | undefined): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
