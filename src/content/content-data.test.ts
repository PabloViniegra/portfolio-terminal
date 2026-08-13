import commands from './commands/data.json';
import general from './general/data.json';
import { COMMANDS } from '../constants/commands';
import { describe, expect, it } from 'vitest';

describe('content data', () => {
  it('declares every executable command exactly once', () => {
    const declaredCommands = commands.map((entry) => entry.command);
    const executableCommands = Object.values(COMMANDS);

    expect(new Set(declaredCommands).size).toBe(declaredCommands.length);
    expect([...declaredCommands].sort()).toEqual([...executableCommands].sort());
  });

  it('contains the general messages required to build the terminal', () => {
    const requiredKeys = [
      'welcome-message',
      'contact-cta',
      'contact-button',
      'help-title',
      'help-tip',
      'contact-email',
    ];
    const keys = new Set(general.map((entry) => entry.key));
    const requiredEntries = general.filter((entry) => requiredKeys.includes(entry.key));

    expect(keys.size).toBe(general.length);
    expect(requiredEntries).toHaveLength(requiredKeys.length);
    expect(requiredEntries.every((entry) => entry.content.trim() !== '')).toBe(true);
  });
});
