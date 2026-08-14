import commands from './commands/data.json';
import general from './general/data.json';
import profile from './profile/data.json';
import aiEngineering from './ai-engineering/data.json';
import certifications from './certifications/data.json';
import github from './github/data.json';
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

  it('contains the published portfolio sections required by the extended terminal', () => {
    expect(profile).toHaveLength(1);
    expect(profile[0].bio).not.toBe('');
    expect(profile[0].categories).not.toHaveLength(0);

    expect(aiEngineering).toHaveLength(1);
    expect(aiEngineering[0].metrics).not.toHaveLength(0);
    expect(aiEngineering[0].agentSkills).not.toHaveLength(0);

    expect(certifications).toHaveLength(2);
    expect(github).toHaveLength(1);
    expect(github[0].contributions).toBeGreaterThan(0);
    expect(github[0].months).not.toHaveLength(0);
  });
});
