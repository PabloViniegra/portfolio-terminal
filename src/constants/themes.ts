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
 * theme switcher, using palette tokens shared with my-portfolio.
 */
export interface Theme {
  id: ThemeType;
  name: string;
  color: string;
  browserColor: string;
}

/**
 * Available themes.
 *
 * Order is the user-visible order in the ThemeSwitcher. Phosphor first because
 * it is the default and matches my-portfolio's tool surface.
 */
export const THEMES: readonly Theme[] = [
  {
    id: 'phosphor',
    name: 'Fósforo',
    color: 'bg-primary-500',
    browserColor: '#09090b',
  },
  {
    id: 'paper',
    name: 'Papel',
    color: 'bg-paper ring-1 ring-primary-700',
    browserColor: '#fffcf5',
  },
] as const;

/** Theme applied on first load (no localStorage entry). */
export const DEFAULT_THEME: ThemeType = 'phosphor';

/** Lookup a theme by id. Falls back to the default theme. */
export function getTheme(id: ThemeType | string | null | undefined): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
