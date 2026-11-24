export const StatusPill = ({ isLoading }: { isLoading: boolean }) => (
  <span
    aria-label={isLoading ? 'Estado: ejecutando' : 'Estado: listo'}
    className={`hidden min-h-11 items-center gap-2 border px-3 py-1 sm:inline-flex font-pixel text-mono-sm uppercase tracking-[0.16em] transition-colors duration-(--motion-base) ${
      isLoading
        ? 'border-terminal-accent/60 bg-terminal-accent/10 text-terminal-accent'
        : 'border-terminal-border/70 bg-terminal-bg text-terminal-text-secondary'
    }`}
  >
    {isLoading ? (
      <span className="terminal-spinner font-mono text-terminal-accent" aria-hidden="true" />
    ) : (
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-terminal-success" aria-hidden="true" />
    )}
    <span className="status-label sr-only md:not-sr-only md:inline" aria-live="polite">
      {isLoading ? 'executing' : 'ready'}
    </span>
  </span>
);
