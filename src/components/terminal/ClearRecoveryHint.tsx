export const ClearRecoveryHint = ({
  onRun,
  onDismiss,
}: {
  onRun: (command: string) => void;
  onDismiss: () => void;
}) => (
  <div className="relative rounded-xl border border-terminal-border/60 bg-terminal-bg-secondary/60 px-4 py-3 pr-10">
    <button
      type="button"
      onClick={onDismiss}
      aria-label="Cerrar"
      className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded text-terminal-text-secondary transition-colors duration-200 hover:text-terminal-text focus:outline-none focus:ring-1 focus:ring-terminal-accent/50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
    <div className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
      terminal limpio
    </div>
    <p className="mt-1 text-sm text-terminal-text">
      <span className="text-terminal-prompt">→</span> Escribe{' '}
      <button
        type="button"
        onClick={() => onRun('/home')}
        className="font-mono text-terminal-accent underline underline-offset-4 transition-colors duration-200 hover:text-terminal-text focus:outline-none focus:ring-1 focus:ring-terminal-accent/50"
      >
        /home
      </button>{' '}
      para volver al inicio, o{' '}
      <button
        type="button"
        onClick={() => onRun('/help')}
        className="font-mono text-terminal-accent underline underline-offset-4 transition-colors duration-200 hover:text-terminal-text focus:outline-none focus:ring-1 focus:ring-terminal-accent/50"
      >
        /help
      </button>{' '}
      para ver los comandos.
    </p>
  </div>
);
