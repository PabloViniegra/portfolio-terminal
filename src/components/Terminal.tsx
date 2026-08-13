import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import CommandInput from './CommandInput';
import SectionOutput from './SectionOutput';
import TerminalLoader from './TerminalLoader';
import Avatar from './Avatar';
import ThemeSwitcher from './ThemeSwitcher';
import { COMMANDS, COMMAND_DELAYS } from '../constants/commands';

const MatrixRain = lazy(() => import('./MatrixRain'));

interface CommandEntry {
  input: string;
  output: React.ReactNode;
  timestamp: number;
}

interface ContentCommand {
  command: string;
  description: string;
  category: 'navigation' | 'info' | 'utility' | 'special';
  hint?: string;
}

interface ExperienceItem {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

interface ProjectItem {
  title: string;
  description: string;
  type: string;
  scope: string;
  link?: string;
  github: string;
  technologies: string[];
  featured?: boolean;
}

interface KnowledgeItem {
  name: string;
  rating: number;
}

interface KnowledgeCategory {
  category: string;
  knowledges: KnowledgeItem[];
}

interface SoftSkill {
  name: string;
  rating: number;
}

interface ContactItem {
  title: string;
  content: string;
  link: string;
}

interface ContentData {
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  knowledgeCategories: KnowledgeCategory[];
  softSkills: SoftSkill[];
  contactInfo: ContactItem[];
  commands: ContentCommand[];
  general: {
    ctaMessage: string;
    ctaButtonText: string;
    welcomeMessage: string;
    helpTitle: string;
    helpTip: string;
    contactEmail: string;
  };
}

interface TerminalProps {
  contentData: ContentData;
}

const levenshtein = (a: string, b: string): number => {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const prev = new Array(b.length + 1).fill(0).map((_, i) => i);
  const curr = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        curr[j - 1] + 1,
        prev[j] + 1,
        prev[j - 1] + cost,
      );
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
};

const QuickCommand = ({
  command,
  label,
  onRun,
  primary = false,
}: {
  command: string;
  label: string;
  onRun: (command: string) => void;
  primary?: boolean;
}) => (
  <button
    type="button"
    onClick={() => onRun(command)}
    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-terminal-accent/50 active:scale-[0.96] ${
      primary
        ? 'border-terminal-accent/60 bg-terminal-accent/10 text-terminal-accent hover:border-terminal-accent hover:bg-terminal-accent/15'
        : 'border-terminal-border/70 bg-terminal-bg text-terminal-text-secondary hover:border-terminal-accent/40 hover:text-terminal-accent'
    }`}
    aria-label={`Ejecutar ${command}`}
  >
    <span className="text-terminal-prompt">$</span>
    <span className={primary ? 'text-terminal-accent' : 'text-terminal-text'}>{command}</span>
    <span className="font-sans text-sans-xs text-terminal-text-secondary">{label}</span>
  </button>
);

const AsciiTitle = () => (
  <div className="flex flex-col gap-2 font-mono leading-none">
    <div className="flex items-center gap-3 font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
      <span className="text-terminal-prompt">┌─</span>
      <span>pablo@portfolio.dev</span>
      <span className="hidden sm:inline">·</span>
      <span className="hidden sm:inline">hiring-mode</span>
    </div>
    <div className="flex items-baseline gap-3 [text-wrap:balance]">
      <span className="text-3xl font-semibold text-terminal-prompt md:text-4xl">
        $
      </span>
      <span className="text-4xl font-semibold tracking-tight text-terminal-accent md:text-6xl">
        ./pablo
      </span>
    </div>
    <div className="flex items-center gap-3 font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
      <span className="text-terminal-prompt">└─</span>
      <span>fullstack engineer</span>
      <span className="text-terminal-border">·</span>
      <span>madrid</span>
      <span className="text-terminal-border">·</span>
      <span className="text-terminal-accent">open to roles</span>
    </div>
  </div>
);

const TasteLine = () => (
  <p className="max-w-3xl font-mono text-sm tracking-[0.04em] text-terminal-text-secondary md:text-base">
    <span className="text-terminal-prompt">→</span>{' '}
    Código claro, criterio firme. Producto primero, frameworks después.
  </p>
);

const WelcomeMessage = ({
  welcomeMessage,
  onQuickCommand,
}: {
  welcomeMessage: string;
  onQuickCommand: (command: string) => void;
}) => {
  return (
    <div className="terminal-output font-sans">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <AsciiTitle />

        <div className="flex flex-col gap-3">
          <p className="max-w-3xl text-lg font-semibold leading-snug text-terminal-text md:text-xl">
            {welcomeMessage}
          </p>
          <TasteLine />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <QuickCommand
            command="/contact"
            label="canal"
            onRun={onQuickCommand}
            primary
          />
          <button
            type="button"
            onClick={() => onQuickCommand(COMMANDS.HELP)}
            className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary transition-colors duration-200 hover:text-terminal-accent focus:outline-none focus:ring-1 focus:ring-terminal-accent/50"
          >
            <span className="text-terminal-prompt">$</span>{' '}
            <span>/help</span>{' '}
            <span className="text-terminal-text-secondary">· ver todos los comandos</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ClearRecoveryHint = ({
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

const CATEGORY_LABELS: Record<ContentCommand['category'], string> = {
  navigation: 'Navegación',
  info: 'Información',
  utility: 'Utilidad',
  special: 'Especial',
};

const CATEGORY_ORDER: ContentCommand['category'][] = [
  'navigation',
  'info',
  'utility',
  'special',
];

const HelpMessage = ({
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

const StatusPill = ({ isLoading }: { isLoading: boolean }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-mono-xs uppercase tracking-[0.22em] transition-colors duration-200 max-md:border-0 max-md:bg-transparent max-md:px-0 max-md:py-0 ${
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
    <span aria-live="polite">
      {isLoading ? 'executing' : 'ready'}
    </span>
  </span>
);

const Terminal = ({ contentData }: TerminalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const [welcomeKey, setWelcomeKey] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const commandInFlightRef = useRef(false);

  const handleCommandRef = useRef<(input: string) => Promise<void>>(async () => {});

  useEffect(() => {
    const skeleton = document.getElementById('terminal-skeleton');
    if (!skeleton) return;

    const timeoutId = window.setTimeout(() => {
      skeleton.remove();
    }, 320);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const buildWelcomeEntry = useCallback(
    (key: number): CommandEntry => ({
      input: '',
      output: (
        <WelcomeMessage
          key={`welcome-${key}`}
          welcomeMessage={contentData.general.welcomeMessage}
          onQuickCommand={(command: string) => {
            void handleCommandRef.current(command);
          }}
        />
      ),
      timestamp: Date.now(),
    }),
    [contentData.general.welcomeMessage],
  );

  const [history, setHistory] = useState<CommandEntry[]>(() => [
    buildWelcomeEntry(0),
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const scrollToBottom = useCallback(() => {
    if (historyEndRef.current) {
      requestAnimationFrame(() => {
        historyEndRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, isLoading, scrollToBottom]);

  const suggestClosestCommand = (input: string): string | null => {
    const target = input.trim().toLowerCase().replace(/^\//, '');
    if (!target) return null;
    let best: string | null = null;
    let bestDist = Infinity;
    for (const cmd of contentData.commands.map(({ command }) => command)) {
      const stem = cmd.replace(/^\//, '');
      const dist = levenshtein(target, stem);
      if (dist < bestDist) {
        bestDist = dist;
        best = cmd;
      }
    }
    return bestDist <= 2 ? best : null;
  };

  const processCommand = (input: string): React.ReactNode => {
    if (input.trim() === '') {
      return null;
    }

    const command = input.trim().toLowerCase();

    switch (command) {
      case COMMANDS.RAIN:
        setShowMatrixRain(true);
        return (
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
      case COMMANDS.CLEAR:
        return (
          <ClearRecoveryHint
            onRun={(cmd) => {
              void handleCommandRef.current(cmd);
            }}
            onDismiss={() => setHistory([])}
          />
        );
      case COMMANDS.HOME:
        return null;
      case COMMANDS.HELP:
        return (
          <HelpMessage
            commands={contentData.commands}
            helpTitle={contentData.general.helpTitle}
            helpTip={contentData.general.helpTip}
          />
        );
      case COMMANDS.EXPERIENCE:
        return (
          <SectionOutput
            section="experience"
            data={{ experiences: contentData.experiences }}
          />
        );
      case COMMANDS.PROJECTS:
        return (
          <SectionOutput
            section="projects"
            data={{ projects: contentData.projects }}
          />
        );
      case COMMANDS.SKILLS:
        return (
          <SectionOutput
            section="skills"
            data={{
              knowledgeCategories: contentData.knowledgeCategories,
              softSkills: contentData.softSkills,
            }}
          />
        );
      case COMMANDS.CONTACT:
        return (
          <SectionOutput
            section="contact"
            data={{
              contactInfo: contentData.contactInfo,
              ctaMessage: contentData.general.ctaMessage,
              ctaButtonText: contentData.general.ctaButtonText,
              contactEmail: contentData.general.contactEmail,
            }}
          />
        );
      case COMMANDS.CV: {
        const pdfUrl = '/cv/CV_2026.pdf';
        const opened = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
        return (
          <div className="rounded-xl border border-terminal-border/70 bg-terminal-bg-secondary/60 px-4 py-3 text-sm text-terminal-text">
            {opened ? (
              <>CV 2026 abierto en una nueva pestaña.</>
            ) : (
              <>
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
              </>
            )}
          </div>
        );
      }
      default: {
        const suggestion = suggestClosestCommand(input);
        return (
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
                  onClick={() => {
                    void handleCommandRef.current(suggestion);
                  }}
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
      }
    }
  };

  const handleCommand = async (input: string) => {
    if (input.trim() === '' || commandInFlightRef.current) {
      return;
    }

    commandInFlightRef.current = true;
    setIsLoading(true);

    try {
      const delay =
        COMMAND_DELAYS.MIN +
        Math.random() * (COMMAND_DELAYS.MAX - COMMAND_DELAYS.MIN);
      await new Promise((resolve) => setTimeout(resolve, delay));

      const normalized = input.trim().toLowerCase();
      const output = processCommand(input);

      if (normalized === COMMANDS.HOME) {
        setWelcomeKey((k) => k + 1);
        setHistory([buildWelcomeEntry(welcomeKey + 1)]);
      } else if (normalized === COMMANDS.CLEAR) {
        setHistory([{ input, output, timestamp: Date.now() }]);
      } else if (output !== null) {
        setHistory((prevHistory) => [
          ...prevHistory,
          { input, output, timestamp: Date.now() },
        ]);
      }

      if (output !== null || normalized === COMMANDS.CLEAR || normalized === COMMANDS.HOME) {
        setCommandHistory((prevHistory) => [...prevHistory, input]);
        setHistoryIndex(-1);
      }
    } finally {
      commandInFlightRef.current = false;
      setIsLoading(false);
    }
  };

  handleCommandRef.current = handleCommand;

  const navigateHistory = (direction: 'up' | 'down'): string => {
    if (commandHistory.length === 0) {
      return '';
    }

    const lastIndex = commandHistory.length - 1;
    const currentIndex = historyIndex === -1 ? commandHistory.length : historyIndex;
    const nextIndex =
      direction === 'up'
        ? currentIndex <= 0
          ? 0
          : currentIndex - 1
        : currentIndex >= lastIndex
          ? -1
          : currentIndex + 1;
    setHistoryIndex(nextIndex);
    return nextIndex === -1 ? '' : commandHistory[nextIndex];
  };

  const handleDeactivateRain = useCallback(() => {
    if (showMatrixRain) {
      setShowMatrixRain(false);
      setHistory((prev) => [
        ...prev,
        {
          input: '',
          output: (
            <div className="rounded-xl border border-terminal-border/70 bg-terminal-bg-secondary/60 px-4 py-3 text-sm text-terminal-text-secondary">
              Lluvia Matrix desactivada, shell restaurada.
            </div>
          ),
          timestamp: Date.now(),
        },
      ]);
    }
  }, [showMatrixRain]);

  return (
    <section
      className="terminal relative h-full overflow-hidden bg-terminal-bg text-terminal-text"
      role="application"
      aria-label="Terminal interactiva de portfolio"
    >
      {showMatrixRain && (
        <Suspense
          fallback={
            <div className="p-4 text-sm text-terminal-text-secondary">
              Cargando modo alternativo...
            </div>
          }
        >
          <MatrixRain onDeactivate={handleDeactivateRain} />
        </Suspense>
      )}

      <div
        className={`relative flex h-full flex-col ${showMatrixRain ? 'bg-terminal-bg/90 backdrop-blur-sm' : ''}`}
        style={{ zIndex: 'var(--z-sticky)' }}
      >
        <header
          className="relative flex flex-wrap items-center justify-between gap-4 border-b border-terminal-border/90 bg-terminal-header-bg/90 px-4 py-3 backdrop-blur"
          style={{ zIndex: 'var(--z-dropdown)' }}
          aria-label="Barra de título de la terminal"
        >
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-terminal-dot-close"></span>
              <span className="h-3 w-3 rounded-full bg-terminal-dot-min"></span>
              <span className="h-3 w-3 rounded-full bg-terminal-dot-max"></span>
            </div>
            <div className="min-w-0">
              <div className="truncate font-mono text-sm text-terminal-text">
                terminal@pablo.dev
              </div>
              <div className="truncate font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
                portfolio-shell / hiring-mode
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StatusPill isLoading={isLoading} />
            <ThemeSwitcher />
            <Avatar
              size={48}
              className="opacity-95"
            />
          </div>
        </header>

        <div
          ref={terminalRef}
          className="flex-1 space-y-8 overflow-y-auto px-4 py-5 md:px-6 md:py-6"
          role="log"
          aria-live="polite"
          aria-label="Salida de la terminal"
        >
          {history.map((entry, index) => {
            return (
              <div key={`${entry.timestamp}-${index}`} className="space-y-3">
                {entry.input ? (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 font-mono text-sm">
                      <span className="text-terminal-prompt" aria-hidden="true">
                        $
                      </span>
                      <span className="text-terminal-text">
                        {entry.input}
                      </span>
                    </div>
                    <time className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </time>
                  </div>
                ) : (
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-terminal-border/70 to-transparent"></div>
                )}
                <div className={`animate-appear ${entry.input ? 'pl-5 md:pl-6' : ''}`}>
                  {entry.output}
                </div>
              </div>
            );
          })}
          {isLoading && <TerminalLoader />}
          <div ref={historyEndRef} />
        </div>

        <footer className="border-t border-terminal-border/90 bg-terminal-header-bg/78 p-4 backdrop-blur">
          <CommandInput
            onCommand={handleCommand}
            onHistoryNavigate={navigateHistory}
            suggestions={contentData.commands}
            disabled={isLoading}
          />
        </footer>
      </div>
    </section>
  );
};

export default Terminal;
