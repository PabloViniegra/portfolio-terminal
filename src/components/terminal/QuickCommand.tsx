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
    className={`inline-flex min-h-11 items-center gap-2 border px-3 py-1.5 font-mono text-xs transition-[color,background-color,border-color,transform] duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-terminal-accent/50 active:scale-[0.96] ${
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
    <span className="font-pixel text-mono-sm uppercase tracking-[0.12em] text-terminal-text-secondary">{label}</span>
  </button>
);
