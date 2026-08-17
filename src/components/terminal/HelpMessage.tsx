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
}: {
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
      <div className="mb-5">
        <p className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
          índice de comandos
        </p>
        <div className="mt-2 text-lg font-semibold text-terminal-accent md:text-xl">
          {helpTitle}
        </div>
      </div>

      <div className="space-y-6">
        {grouped.map((group) => (
          <section key={group.category}>
            <div className="mb-3 flex items-center gap-3">
              <h3 className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
                {CATEGORY_LABELS[group.category]}
              </h3>
              <span className="h-px flex-1 bg-terminal-border/40"></span>
              <span className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary/70">
                {group.items.length}
              </span>
            </div>
            <div className="space-y-2">
              {group.items.map((cmd) => (
                <div
                  key={cmd.command}
                  className="grid gap-2 rounded-xl border border-terminal-border/60 bg-terminal-bg-secondary/60 px-4 py-3 md:grid-cols-[11rem_minmax(0,1fr)] md:items-start"
                >
                  <div className="font-mono text-sm font-semibold text-terminal-accent">
                    {cmd.command}
                  </div>
                  <div>
                    <p className="text-sm text-terminal-text">{cmd.description}</p>
                    {cmd.hint && (
                      <p className="mt-1 text-sm text-terminal-text-secondary">
                        {cmd.hint}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-6 text-sm text-terminal-text-secondary">{helpTip}</div>
    </div>
  );
};
