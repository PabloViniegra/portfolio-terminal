import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { useTheme } from './useTheme';

const ThemeProbe = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <output>{theme}</output>
      <button type="button" onClick={() => setTheme('ayu')}>
        Use Ayu
      </button>
    </div>
  );
};

describe('useTheme', () => {
  it('loads and applies a valid saved theme', async () => {
    localStorage.setItem('theme', 'light');

    render(<ThemeProbe />);

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('light'));
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('falls back when storage contains an unsupported theme', async () => {
    localStorage.setItem('theme', 'not-a-theme');

    render(<ThemeProbe />);

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('one-dark'));
    expect(document.documentElement).toHaveAttribute('data-theme', 'one-dark');
  });

  it('persists and applies a theme selected by the user', async () => {
    const user = userEvent.setup();

    render(<ThemeProbe />);
    await user.click(screen.getByRole('button', { name: 'Use Ayu' }));

    expect(screen.getByRole('status')).toHaveTextContent('ayu');
    expect(localStorage.getItem('theme')).toBe('ayu');
    expect(document.documentElement).toHaveAttribute('data-theme', 'ayu');
  });
});
