import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { resolveCommand, type CommandResult } from '../commands/resolveCommand';
import { COMMAND_DELAYS } from '../constants/commands';
import type { ContentData } from '../types/content';
import Avatar from './Avatar';
import CommandInput from './CommandInput';
import SectionOutput from './SectionOutput';
import { ClearRecoveryHint } from './terminal/ClearRecoveryHint';
import {
  CvBlockedMessage,
  CvOpenedMessage,
  RainActivatedMessage,
  RainDeactivatedMessage,
  RainReducedMotionMessage,
  UnknownCommandMessage,
} from './terminal/CommandFeedback';
import { HelpMessage } from './terminal/HelpMessage';
import { StatusPill } from './terminal/StatusPill';
import { WelcomeMessage } from './terminal/WelcomeMessage';
import TerminalLoader from './TerminalLoader';
import ThemeSwitcher from './ThemeSwitcher';

const MatrixRain = lazy(() => import('./MatrixRain'));

interface CommandEntry {
  input: string;
  output: React.ReactNode;
  timestamp: number;
}

interface TerminalProps {
  contentData: ContentData;
}

const Terminal = ({ contentData }: TerminalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [welcomeKey, setWelcomeKey] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);
  const lastEntryRef = useRef<HTMLDivElement>(null);
  const commandInFlightRef = useRef(false);
  const toggleFullscreenRef = useRef<HTMLButtonElement>(null);

  const handleCommandRef = useRef<(input: string) => Promise<void>>(async () => {});
  const [history, setHistory] = useState<CommandEntry[]>(() => [
    {
      input: '',
      output: (
        <WelcomeMessage
          key="welcome-0"
          welcomeMessage={contentData.general.welcomeMessage}
          profile={contentData.profile}
          onQuickCommand={(command: string) => {
            void handleCommandRef.current(command);
          }}
        />
      ),
      timestamp: Date.now(),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const runCommand = (command: string) => {
    void handleCommandRef.current(command);
  };

  const renderResult = (result: CommandResult, onClearDismiss: () => void): React.ReactNode => {
      switch (result.kind) {
        case 'empty':
        case 'home':
          return null;
        case 'rain':
          if (showMatrixRain) {
            setShowMatrixRain(false);
            return <RainDeactivatedMessage />;
          }
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return <RainReducedMotionMessage />;
          }
          setShowMatrixRain(true);
          return <RainActivatedMessage />;
        case 'clear':
          return (
            <ClearRecoveryHint
              onRun={runCommand}
              onDismiss={onClearDismiss}
            />
          );
        case 'help':
          return (
            <HelpMessage
              onRun={runCommand}
              commands={contentData.commands}
              helpTitle={contentData.general.helpTitle}
              helpTip={contentData.general.helpTip}
            />
          );
        case 'section':
          return <SectionOutput section={result.section} data={result.data} />;
        case 'cv': {
          // The 'noopener' feature makes window.open return null even on success, so sever opener manually.
          const opened = window.open(result.pdfUrl, '_blank');
          if (opened) opened.opener = null;
          return opened ? (
            <CvOpenedMessage />
          ) : (
            <CvBlockedMessage pdfUrl={result.pdfUrl} />
          );
        }
        case 'unknown':
          return (
            <UnknownCommandMessage
              input={result.input}
              suggestion={result.suggestion}
              onRun={runCommand}
            />
          );
        default: {
          const _exhaustive: never = result;
          return _exhaustive;
        }
      }
  };

  const buildWelcomeEntry = (key: number): CommandEntry => ({
      input: '',
      output: (
        <WelcomeMessage
          key={`welcome-${key}`}
          welcomeMessage={contentData.general.welcomeMessage}
          profile={contentData.profile}
          onQuickCommand={runCommand}
        />
      ),
      timestamp: Date.now(),
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const log = logRef.current;
      const entry = lastEntryRef.current;
      if (!log || !entry) return;
      // Anchor the newest entry's prompt line at the top so long outputs are read from their start;
      // the +8 hides the previous entry's divider behind the header edge.
      log.scrollTo({
        top: history.length === 1 ? 0 : Math.max(0, entry.offsetTop + 8),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [history, isLoading]);

  const handleCommand = async (input: string) => {
    if (input.trim() === '' || commandInFlightRef.current) {
      return;
    }

    commandInFlightRef.current = true;
    setIsLoading(true);
    const pendingEntry: CommandEntry = {
      input,
      output: null,
      timestamp: Date.now(),
    };
    setHistory((prev) => [...prev, pendingEntry]);

    try {
      const delay =
        COMMAND_DELAYS.MIN +
        Math.random() * (COMMAND_DELAYS.MAX - COMMAND_DELAYS.MIN);
      await new Promise((resolve) => setTimeout(resolve, delay));

      const result = resolveCommand(input, contentData);
      const output: React.ReactNode = renderResult(result, () => {
        setHistory((entries) => entries.filter((entry) => entry.output !== output));
      });

      if (result.kind === 'home') {
        setWelcomeKey((k) => k + 1);
        setHistory([buildWelcomeEntry(welcomeKey + 1)]);
      } else if (result.kind === 'clear') {
        setHistory([{ input, output, timestamp: Date.now() }]);
      } else if (output !== null) {
        setHistory((prevHistory) =>
          prevHistory.map((entry) =>
            entry === pendingEntry ? { ...entry, output } : entry,
          ),
        );
      }

      if (output !== null || result.kind === 'clear' || result.kind === 'home') {
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
          output: <RainDeactivatedMessage />,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [showMatrixRain]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;

    document.body.classList.add('is-fullscreen-open');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        setIsFullscreen(false);
        toggleFullscreenRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('is-fullscreen-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  return (
    <section
      id="terminal-shell"
      className={`terminal relative overflow-hidden bg-terminal-bg text-terminal-text ${
        isFullscreen ? 'terminal--fullscreen' : ''
      }`}
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
          className="relative flex flex-nowrap items-center justify-between gap-2 border-b border-terminal-border/90 bg-terminal-header-bg px-3 py-3 md:gap-4 md:px-4"
          style={{ zIndex: 'var(--z-dropdown)' }}
          aria-label="Barra de título de la terminal"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-terminal-accent shadow-glow-sm"
              aria-hidden="true"
            ></span>
            <div className="truncate font-pixel text-sm text-terminal-text">
              pablo@portfolio<span className="text-terminal-text-secondary">:~</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <StatusPill isLoading={isLoading} />
            <ThemeSwitcher />
            <button
              ref={toggleFullscreenRef}
              type="button"
              onClick={toggleFullscreen}
              aria-label={
                isFullscreen ? 'Restaurar tamaño' : 'Pantalla completa'
              }
              aria-controls="terminal-shell"
              aria-pressed={isFullscreen}
              className="header-control"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {isFullscreen ? (
                  <>
                    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                    <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                    <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                    <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                  </>
                ) : (
                  <>
                    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                  </>
                )}
              </svg>
              <span className="hidden md:inline">
                {isFullscreen ? 'restaurar' : 'ampliar'}
              </span>
            </button>
            <Avatar
              size={40}
              className="hidden h-10 w-10 opacity-95 sm:block"
            />
          </div>
        </header>

        <div
          ref={logRef}
          className="relative flex-1 space-y-8 overflow-y-auto overflow-x-hidden px-4 py-5 md:px-6 md:py-7"
          role="log"
          aria-live="polite"
          aria-label="Salida de la terminal"
        >
          {history.map((entry, index) => {
            return (
              <div
                key={`${entry.timestamp}-${index}`}
                ref={index === history.length - 1 ? lastEntryRef : undefined}
                className={`space-y-3 ${index > 0 ? 'border-t border-terminal-border/40 pt-6' : ''}`}
              >
                {entry.input && (
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex min-w-0 items-baseline gap-2 font-mono text-sm">
                      <span className="hidden text-terminal-text-secondary sm:inline" aria-hidden="true">
                        pablo@portfolio:~
                      </span>
                      <span className="text-terminal-prompt" aria-hidden="true">
                        $
                      </span>
                      <span className="truncate text-terminal-text">
                        {entry.input}
                      </span>
                    </div>
                    <time
                      dateTime={new Date(entry.timestamp).toISOString()}
                      className="shrink-0 font-mono text-mono-xs tabular-nums text-terminal-text-secondary"
                    >
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </time>
                  </div>
                )}
                {entry.output !== null ? (
                  <div className={`terminal-stream ${entry.input ? 'pl-5 md:pl-6' : ''}`}>
                    {entry.output}
                  </div>
                ) : isLoading && index === history.length - 1 ? (
                  <div className="pl-5 md:pl-6"><TerminalLoader /></div>
                ) : null}
              </div>
            );
          })}
        </div>

        <footer className="border-t border-terminal-border/90 bg-terminal-header-bg p-3 md:p-4">
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
