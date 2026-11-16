import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { useTheme } from './useTheme';

const ThemeProbe = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <output>{theme}</output>
      <button type="button" onClick={() => setTheme('paper')}>
        Use Paper
      </button>
    </div>
  );
};

describe('useTheme', () => {
  it('loads and applies a valid saved theme', async () => {
    localStorage.setItem('theme', 'paper');

    render(<ThemeProbe />);

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('paper'));
    expect(document.documentElement).toHaveAttribute('data-theme', 'paper');
  });

  it('falls back when storage contains an unsupported theme', async () => {
    localStorage.setItem('theme', 'github-dark');

    render(<ThemeProbe />);

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('phosphor'));
    expect(document.documentElement).toHaveAttribute('data-theme', 'phosphor');
  });

  it('persists and applies a theme selected by the user', async () => {
    const user = userEvent.setup();

    render(<ThemeProbe />);
    await user.click(screen.getByRole('button', { name: 'Use Paper' }));

    expect(screen.getByRole('status')).toHaveTextContent('paper');
    expect(localStorage.getItem('theme')).toBe('paper');
    expect(document.documentElement).toHaveAttribute('data-theme', 'paper');
  });
});
