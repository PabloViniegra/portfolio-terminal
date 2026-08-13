import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import CommandInput from './CommandInput';
import type { Suggestion } from '../constants/suggestions';

const suggestions: Suggestion[] = [
  { command: '/projects', description: 'Muestra mis proyectos' },
  { command: '/skills', description: 'Muestra mis habilidades' },
  { command: '/contact', description: 'Muestra mis datos de contacto' },
];

const renderInput = (overrides: Partial<React.ComponentProps<typeof CommandInput>> = {}) => {
  const onCommand = vi.fn();
  const onHistoryNavigate = vi.fn(() => '');

  render(
    <CommandInput
      onCommand={onCommand}
      onHistoryNavigate={onHistoryNavigate}
      suggestions={suggestions}
      {...overrides}
    />,
  );

  return {
    input: screen.getByRole('combobox', { name: 'Comando de terminal' }),
    onCommand,
    onHistoryNavigate,
  };
};

describe('CommandInput', () => {
  it('shows only matching commands while typing a prefix', async () => {
    const user = userEvent.setup();
    const { input } = renderInput();

    await user.type(input, '/pro');

    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveTextContent('/projects');
    expect(listbox).not.toHaveTextContent('/skills');
    expect(listbox).not.toHaveTextContent('/contact');
  });

  it('uses Tab to select the active suggestion', async () => {
    const user = userEvent.setup();
    const { input } = renderInput();

    await user.type(input, '/s');
    fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });

    expect(input).toHaveValue('/skills');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('wraps suggestion navigation with the arrow keys', async () => {
    const user = userEvent.setup();
    const { input } = renderInput();

    await user.type(input, '/');
    fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });

    expect(screen.getByRole('option', { name: /\/contact/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(screen.getByRole('option', { name: /\/projects/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('hides suggestions with Escape and submits the command', async () => {
    const user = userEvent.setup();
    const { input, onCommand } = renderInput();

    await user.type(input, '/help');
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    fireEvent.submit(input.closest('form')!);

    expect(onCommand).toHaveBeenCalledWith('/help');
    expect(input).toHaveValue('');
  });

  it('restores draft input after navigating back down through history', () => {
    const onHistoryNavigate = vi.fn((direction: 'up' | 'down') =>
      direction === 'up' ? '/projects' : '',
    );
    const { input } = renderInput({ onHistoryNavigate });

    fireEvent.change(input, { target: { value: 'draft command' } });
    fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(input).toHaveValue('/projects');

    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(input).toHaveValue('draft command');
    expect(onHistoryNavigate).toHaveBeenNthCalledWith(1, 'up');
    expect(onHistoryNavigate).toHaveBeenNthCalledWith(2, 'down');
  });

  it('does not erase a draft when moving down before entering history', () => {
    const { input } = renderInput();

    fireEvent.change(input, { target: { value: 'draft command' } });
    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });

    expect(input).toHaveValue('draft command');
  });

  it('does not submit or navigate while disabled', () => {
    const onHistoryNavigate = vi.fn(() => '/projects');
    const { input, onCommand } = renderInput({ disabled: true, onHistoryNavigate });

    fireEvent.change(input, { target: { value: '/help' } });
    fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });
    fireEvent.submit(input.closest('form')!);

    expect(input).toBeDisabled();
    expect(onCommand).not.toHaveBeenCalled();
    expect(onHistoryNavigate).not.toHaveBeenCalled();
  });
});
