import { COMMANDS } from '../../constants/commands';

export const RainActivatedMessage = () => (
  <div className="rounded-xl border border-terminal-border/70 bg-terminal-bg-secondary/60 px-4 py-3 text-terminal-text">
    <p className="font-medium text-terminal-text">
      Lluvia Matrix activada.
    </p>
    <p className="mt-1 text-sm text-terminal-text-secondary">
      Usa{' '}
      <span className="rounded border border-terminal-border/70 bg-terminal-bg px-1.5 py-0.5 font-mono text-terminal-text">
        Ctrl+C
      </span>{' '}
      para volver al modo normal.
    </p>
  </div>
);

export const RainDeactivatedMessage = () => (
  <div className="rounded-xl border border-terminal-border/70 bg-terminal-bg-secondary/60 px-4 py-3 text-sm text-terminal-text-secondary">
    Lluvia Matrix desactivada, shell restaurada.
  </div>
);

export const CvOpenedMessage = () => (
  <div className="rounded-xl border border-terminal-border/70 bg-terminal-bg-secondary/60 px-4 py-3 text-sm text-terminal-text">
    CV 2026 abierto en una nueva pestaña.
  </div>
);

export const CvBlockedMessage = ({ pdfUrl }: { pdfUrl: string }) => (
  <div className="rounded-xl border border-terminal-border/70 bg-terminal-bg-secondary/60 px-4 py-3 text-sm text-terminal-text">
    El navegador bloqueó la ventana.{' '}
    <a
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir manualmente (enlace externo)"
      className="font-mono text-mono-xs uppercase tracking-[0.18em] text-terminal-accent underline underline-offset-4 transition-colors duration-200 hover:text-terminal-text focus:outline-none focus:ring-1 focus:ring-terminal-accent/50"
    >
      Abrir manualmente
    </a>
  </div>
);

export const UnknownCommandMessage = ({
  input,
  suggestion,
  onRun,
}: {
  input: string;
  suggestion: string | null;
  onRun: (command: string) => void;
}) => (
  <div className="rounded-xl border border-terminal-error/40 bg-terminal-bg-secondary/60 px-4 py-3 text-terminal-error">
    <div>
      Comando no reconocido:{' '}
      <span className="font-mono font-semibold text-terminal-text">
        {input}
      </span>
    </div>
    {suggestion ? (
      <div className="mt-1 text-sm text-terminal-text-secondary">
        ¿Quisiste decir{' '}
        <button
          type="button"
          onClick={() => onRun(suggestion)}
          className="font-mono text-terminal-accent underline underline-offset-4 transition-colors duration-200 hover:text-terminal-text focus:outline-none focus:ring-1 focus:ring-terminal-accent/50"
        >
          {suggestion}
        </button>
        ?
      </div>
    ) : (
      <div className="mt-1 text-sm text-terminal-text-secondary">
        Prueba con{' '}
        <span className="font-mono text-terminal-accent">
          {COMMANDS.HELP}
        </span>{' '}
        para ver los comandos disponibles.
      </div>
    )}
  </div>
);
