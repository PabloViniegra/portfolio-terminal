import { describe, expect, it } from 'vitest';

import { DEFAULT_THEME, getTheme, THEMES } from './themes';

describe('themes', () => {
  it('exposes the four supported themes in user-visible order', () => {
    expect(THEMES.map((theme) => theme.id)).toEqual([
      'one-dark',
      'light',
      'ayu',
      'github-dark',
    ]);
    expect(DEFAULT_THEME).toBe('one-dark');
  });

  it('falls back to One Dark for unknown theme identifiers', () => {
    expect(getTheme('light').id).toBe('light');
    expect(getTheme('not-a-theme').id).toBe(DEFAULT_THEME);
    expect(getTheme(null).id).toBe(DEFAULT_THEME);
    expect(getTheme(undefined).id).toBe(DEFAULT_THEME);
  });
});
