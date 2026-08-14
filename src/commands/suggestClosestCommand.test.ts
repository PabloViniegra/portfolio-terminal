import { describe, expect, it } from 'vitest';

import { levenshtein, suggestClosestCommand } from './suggestClosestCommand';

const commands = ['/projects', '/experience', '/help', '/cv'];

describe('levenshtein', () => {
  it('returns 0 for identical strings', () => {
    expect(levenshtein('projects', 'projects')).toBe(0);
  });

  it('returns the other length when one side is empty', () => {
    expect(levenshtein('', 'help')).toBe(4);
    expect(levenshtein('cv', '')).toBe(2);
  });

  it('counts a single substitution', () => {
    expect(levenshtein('projecs', 'projects')).toBe(1);
  });
});

describe('suggestClosestCommand', () => {
  it('suggests the nearest command for a close typo', () => {
    expect(suggestClosestCommand('/projecs', commands)).toBe('/projects');
  });

  it('ignores a leading slash and casing', () => {
    expect(suggestClosestCommand('  /HELP  ', commands)).toBe('/help');
  });

  it('returns null when the input is empty or too far', () => {
    expect(suggestClosestCommand(' / ', commands)).toBeNull();
    expect(suggestClosestCommand('/zzzzzzzz', commands)).toBeNull();
  });
});
