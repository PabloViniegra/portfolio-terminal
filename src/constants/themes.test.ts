import { describe, expect, it } from 'vitest';

import { DEFAULT_THEME, getTheme, THEMES } from './themes';

describe('themes', () => {
  it('exposes the phosphor and paper themes in user-visible order', () => {
    expect(THEMES.map((theme) => theme.id)).toEqual(['phosphor', 'paper']);
    expect(DEFAULT_THEME).toBe('phosphor');
  });

  it('falls back to Phosphor for unknown or legacy theme identifiers', () => {
    expect(getTheme('paper').id).toBe('paper');
    expect(getTheme('one-dark').id).toBe(DEFAULT_THEME);
    expect(getTheme('not-a-theme').id).toBe(DEFAULT_THEME);
    expect(getTheme(null).id).toBe(DEFAULT_THEME);
    expect(getTheme(undefined).id).toBe(DEFAULT_THEME);
  });
});
