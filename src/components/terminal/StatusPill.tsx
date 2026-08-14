export const StatusPill = ({ isLoading }: { isLoading: boolean }) => (
  <span
    aria-label={isLoading ? 'Estado: ejecutando' : 'Estado: listo'}
    className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-mono-xs uppercase tracking-[0.22em] transition-colors duration-200 ${
      isLoading
        ? 'border-terminal-accent/60 bg-terminal-accent/10 text-terminal-accent'
        : 'border-terminal-border/70 bg-terminal-bg text-terminal-text-secondary'
    }`}
  >
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full align-middle ${
        isLoading ? 'bg-terminal-accent animate-pulse' : 'bg-terminal-success'
      }`}
      aria-hidden="true"
    />
    <span className="status-label sr-only md:not-sr-only md:inline" aria-live="polite">
      {isLoading ? 'executing' : 'ready'}
    </span>
  </span>
);
