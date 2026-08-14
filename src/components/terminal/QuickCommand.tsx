export const QuickCommand = ({
  command,
  label,
  onRun,
  primary = false,
  showCommand = true,
}: {
  command: string;
  label: string;
  onRun: (command: string) => void;
  primary?: boolean;
  showCommand?: boolean;
}) => (
  <button
    type="button"
    onClick={() => onRun(command)}
    className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent/70 active:scale-[0.96] ${
      primary
        ? 'border-terminal-accent/60 bg-terminal-accent/10 text-terminal-accent hover:border-terminal-accent hover:bg-terminal-accent/15'
        : 'border-terminal-border/70 bg-terminal-bg text-terminal-text-secondary hover:border-terminal-accent/40 hover:text-terminal-accent'
    }`}
    aria-label={`Ejecutar ${command}`}
  >
    <span className="text-terminal-prompt">$</span>
    {showCommand && (
      <span className={primary ? 'text-terminal-accent' : 'text-terminal-text'}>{command}</span>
    )}
    <span className="font-sans text-sans-xs text-terminal-text-secondary">{label}</span>
  </button>
);
