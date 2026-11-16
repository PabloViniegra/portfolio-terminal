import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import ThemeSwitcher from './ThemeSwitcher';

describe('ThemeSwitcher', () => {
  it('opens the theme menu and applies the selected theme', async () => {
    const user = userEvent.setup();

    render(<ThemeSwitcher />);

    const trigger = screen.getByRole('button', { name: 'Cambiar tema' });
    const menu = screen.getByRole('menu');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(menu).toHaveAttribute('data-state', 'closed');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(menu).toHaveAttribute('data-state', 'open');

    await user.click(screen.getByRole('menuitem', { name: 'Cambiar al tema Paper' }));

    expect(document.documentElement).toHaveAttribute('data-theme', 'paper');
    expect(localStorage.getItem('theme')).toBe('paper');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
