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
  const historyEndRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const skeleton = document.getElementById('terminal-skeleton');
    if (!skeleton) return;

    const timeoutId = window.setTimeout(() => {
      skeleton.remove();
    }, 320);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const runCommand = (command: string) => {
    void handleCommandRef.current(command);
  };

  const renderResult = (result: CommandResult): React.ReactNode => {
      switch (result.kind) {
        case 'empty':
        case 'home':
          return null;
        case 'rain':
          setShowMatrixRain(true);
          return <RainActivatedMessage />;
        case 'clear':
          return (
            <ClearRecoveryHint
              onRun={runCommand}
              onDismiss={() => setHistory([])}
            />
          );
        case 'help':
          return (
            <HelpMessage
              commands={contentData.commands}
              helpTitle={contentData.general.helpTitle}
              helpTip={contentData.general.helpTip}
            />
          );
        case 'section':
          return <SectionOutput section={result.section} data={result.data} />;
        case 'cv': {
          const opened = window.open(result.pdfUrl, '_blank', 'noopener,noreferrer');
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
    requestAnimationFrame(() => {
      historyEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    });
  }, [history, isLoading]);

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

      const result = resolveCommand(input, contentData);
      const output = renderResult(result);

      if (result.kind === 'home') {
        setWelcomeKey((k) => k + 1);
        setHistory([buildWelcomeEntry(welcomeKey + 1)]);
      } else if (result.kind === 'clear') {
        setHistory([{ input, output, timestamp: Date.now() }]);
      } else if (output !== null) {
        setHistory((prevHistory) => [
          ...prevHistory,
          { input, output, timestamp: Date.now() },
        ]);
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
      if (event.key === 'Escape') {
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
          className="relative flex flex-nowrap items-center justify-between gap-2 border-b border-terminal-border/90 bg-terminal-header-bg/90 px-3 py-3 backdrop-blur md:gap-4 md:px-4"
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
              <div className="hidden truncate font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary sm:block">
                portfolio-shell / hiring-mode
              </div>
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
              className="flex items-center gap-2 rounded-lg border border-terminal-border/70 bg-terminal-bg-secondary/60 px-3 py-2 text-sm text-terminal-text transition-all duration-200 hover:border-terminal-accent/40 hover:text-terminal-accent focus:outline-none focus:ring-1 focus:ring-terminal-accent/50 active:scale-[0.96]"
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
                {isFullscreen ? 'restaurar' : 'fullscreen'}
              </span>
            </button>
            <Avatar
              size={48}
              className="h-9 w-9 opacity-95 md:h-12 md:w-12"
            />
          </div>
        </header>

        <div
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

        <footer className="border-t border-terminal-border/90 bg-terminal-header-bg/75 p-4 backdrop-blur">
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
