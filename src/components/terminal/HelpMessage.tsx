import type { ContentCommand } from '../../types/content';

const CATEGORY_LABELS = {
  navigation: 'Comienza aquí',
  info: 'Más información',
  utility: 'Herramientas',
  special: 'Experimento',
} satisfies Record<ContentCommand['category'], string>;

const CATEGORY_ORDER: ContentCommand['category'][] = [
  'navigation',
  'info',
  'utility',
  'special',
];

export const HelpMessage = ({
  commands,
  helpTitle,
  helpTip,
  onRun,
}: {
  onRun: (command: string) => void;
  commands: ContentCommand[];
  helpTitle: string;
  helpTip: string;
}) => {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: commands.filter((cmd) => cmd.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="terminal-output font-sans">
      <h2 className="mb-5 text-lg font-semibold text-terminal-accent md:text-xl">
        {helpTitle}
      </h2>

      <div className="space-y-6">
        {grouped.map((group) => (
          <section key={group.category}>
            <div className="mb-3 flex items-center gap-3">
              <h3 className="font-pixel text-mono-sm uppercase tracking-[0.16em] text-terminal-text-secondary">
                {CATEGORY_LABELS[group.category]}
              </h3>
              <span className="h-px flex-1 bg-terminal-border/40"></span>
              <span className="font-pixel text-mono-sm uppercase tracking-[0.16em] text-terminal-text-secondary/70">
                {group.items.length}
              </span>
            </div>
            <ul className="border-y border-terminal-border/40">
              {group.items.map((cmd) => (
                <li key={cmd.command} className="border-t border-terminal-border/30 first:border-t-0">
                  <button
                    type="button"
                    onClick={() => onRun(cmd.command)}
                    className="help-row"
                  >
                    <span className="font-mono text-sm font-semibold text-terminal-accent">
                      {cmd.command}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-terminal-text">{cmd.description}</span>
                      {cmd.hint && (
                        <span className="mt-1 block text-sm text-terminal-text-secondary">
                          {cmd.hint}
                        </span>
                      )}
                    </span>
                    <span className="help-row__run" aria-hidden="true">
                      ejecutar ↵
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-6 text-sm text-terminal-text-secondary">{helpTip}</div>
    </div>
  );
};
