import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import CommandInput from "./CommandInput";
import SectionOutput from "./SectionOutput";
import TerminalLoader from "./TerminalLoader";
import Avatar from "./Avatar";
import ThemeSwitcher from "./ThemeSwitcher";
import { COMMANDS, COMMAND_DELAYS } from "../constants/commands";

const MatrixRain = lazy(() => import("./MatrixRain"));

interface CommandEntry {
  input: string;
  output: React.ReactNode;
  timestamp: number;
}

interface ContentCommand {
  command: string;
  description: string;
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
    version: string;
    contactEmail: string;
  };
}

interface TerminalProps {
  contentData: ContentData;
}

const QuickCommand = ({
  command,
  label,
  onRun,
}: {
  command: string;
  label: string;
  onRun: (command: string) => void;
}) => (
  <button
    type="button"
    onClick={() => onRun(command)}
    className="inline-flex items-center gap-2 rounded-full border border-terminal-border/70 bg-terminal-bg px-3 py-1.5 font-mono text-xs text-terminal-text-secondary transition-colors duration-200 hover:border-terminal-accent/40 hover:text-terminal-accent focus:outline-none focus:ring-1 focus:ring-terminal-accent/50"
    aria-label={`Ejecutar ${command}`}
  >
    <span className="text-terminal-prompt">$</span>
    <span className="text-terminal-text">{command}</span>
    <span className="font-sans text-[11px] text-terminal-text-secondary">
      {label}
    </span>
  </button>
);

const AsciiTitle = () => (
  <div className="inline-flex flex-wrap items-end gap-3 font-mono">
    <span className="text-3xl font-semibold text-terminal-prompt md:text-4xl">
      $
    </span>
    <span className="text-4xl font-semibold tracking-tight text-terminal-accent md:text-5xl">
      ./pablo
    </span>
    <span className="pb-1 text-sm uppercase tracking-[0.3em] text-terminal-text-secondary">
      fullstack engineer
    </span>
  </div>
);

const WelcomeMessage = ({
  welcomeMessage,
  version,
  onQuickCommand,
}: {
  welcomeMessage: string;
  version: string;
  onQuickCommand: (command: string) => void;
}) => {
  const today = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="terminal-output font-sans">
      <div className="mx-auto flex max-w-4xl flex-col gap-5">
        <AsciiTitle />

        <p className="max-w-3xl text-lg font-semibold leading-snug text-terminal-text md:text-xl">
          {welcomeMessage}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-terminal-text-secondary">
          <span>v{version}</span>
          <span className="text-terminal-border">·</span>
          <span>{today}</span>
          <span className="text-terminal-border">·</span>
          <span className="text-terminal-accent">open to roles</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-terminal-text-secondary">
            Quick start
          </span>
          <QuickCommand
            command="/experience"
            label="trayectoria"
            onRun={onQuickCommand}
          />
          <QuickCommand
            command="/projects"
            label="builds"
            onRun={onQuickCommand}
          />
          <QuickCommand
            command="/skills"
            label="stack"
            onRun={onQuickCommand}
          />
          <QuickCommand
            command="/contact"
            label="canal"
            onRun={onQuickCommand}
          />
        </div>
      </div>
    </div>
  );
};

const HelpMessage = ({
  commands,
  helpTitle,
  helpTip,
}: {
  commands: ContentCommand[];
  helpTitle: string;
  helpTip: string;
}) => (
  <div className="terminal-output font-sans">
    <div className="mb-4 flex items-center justify-between gap-4">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-terminal-text-secondary">
          command index
        </p>
        <div className="mt-2 text-lg font-semibold text-terminal-accent">
          {helpTitle}
        </div>
      </div>
      <span className="rounded-full border border-terminal-border/70 bg-terminal-bg px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-terminal-text-secondary">
        /help
      </span>
    </div>

    <div className="space-y-3">
      {commands.map((cmd) => (
        <div
          key={cmd.command}
          className="grid gap-2 rounded-xl border border-terminal-border/60 bg-terminal-bg-secondary/35 px-4 py-3 md:grid-cols-[11rem_minmax(0,1fr)] md:items-start"
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

    <div className="mt-4 text-sm text-terminal-text-secondary">{helpTip}</div>
  </div>
);

const Terminal = ({ contentData }: TerminalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const skeleton = document.getElementById("terminal-skeleton");
    if (skeleton) {
      skeleton.style.display = "none";
    }
  }, []);

  const createWelcomeEntry = useCallback(
    (): CommandEntry => ({
      input: "",
      output: (
        <WelcomeMessage
          welcomeMessage={contentData.general.welcomeMessage}
          version={contentData.general.version}
          onQuickCommand={(command) => {
            void handleCommand(command);
          }}
        />
      ),
      timestamp: Date.now(),
    }),
    [
      contentData.general.version,
      contentData.general.welcomeMessage,
    ],
  );

  const [history, setHistory] = useState<CommandEntry[]>(() => [
    createWelcomeEntry(),
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const scrollToBottom = useCallback(() => {
    if (historyEndRef.current) {
      requestAnimationFrame(() => {
        historyEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, isLoading, scrollToBottom]);

  const processCommand = (input: string): React.ReactNode => {
    if (input.trim() === "") {
      return null;
    }

    const command = input.toLowerCase();

    switch (command) {
      case COMMANDS.RAIN:
        setShowMatrixRain(true);
        return (
          <div className="rounded-xl border border-terminal-border/70 bg-terminal-bg-secondary/40 px-4 py-3 text-terminal-text">
            <p className="font-medium text-terminal-text">
              Matrix rain activado.
            </p>
            <p className="mt-1 text-sm text-terminal-text-secondary">
              Usa{" "}
              <span className="rounded border border-terminal-border/70 bg-terminal-bg px-1.5 py-0.5 font-mono text-terminal-text">
                Ctrl+C
              </span>{" "}
              para volver al modo normal.
            </p>
          </div>
        );
      case COMMANDS.CLEAR:
        setHistory([]);
        return null;
      case COMMANDS.HELP:
        return (
          <HelpMessage
            commands={contentData.commands}
            helpTitle={contentData.general.helpTitle}
            helpTip={contentData.general.helpTip}
          />
        );
      case COMMANDS.HOME:
        return <SectionOutput section="home" />;
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
      case COMMANDS.CV:
        window.open("/cv/CV_2026.pdf", "_blank");
        return (
          <div className="rounded-xl border border-terminal-border/70 bg-terminal-bg-secondary/35 px-4 py-3 text-sm text-terminal-text">
            Abriendo CV en una nueva pestaña.
            <a
              href="/cv/CV_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 font-medium text-terminal-accent underline underline-offset-4"
            >
              Abrir manualmente
            </a>
          </div>
        );
      default:
        return (
          <div className="rounded-xl border border-terminal-error/40 bg-terminal-bg-secondary/35 px-4 py-3 text-terminal-error">
            <div>
              Comando no reconocido:{" "}
              <span className="font-mono font-semibold text-terminal-text">
                {input}
              </span>
            </div>
            <div className="mt-1 text-sm text-terminal-text-secondary">
              Prueba con{" "}
              <span className="font-mono text-terminal-accent">
                {COMMANDS.HELP}
              </span>{" "}
              para ver los comandos disponibles.
            </div>
          </div>
        );
    }
  };

  const handleCommand = async (input: string) => {
    if (input.trim() === "") {
      return;
    }

    setIsLoading(true);

    const delay =
      COMMAND_DELAYS.MIN +
      Math.random() * (COMMAND_DELAYS.MAX - COMMAND_DELAYS.MIN);
    await new Promise((resolve) => setTimeout(resolve, delay));

    const output = processCommand(input);

    if (output !== null) {
      setHistory((prevHistory) => [
        ...prevHistory,
        { input, output, timestamp: Date.now() },
      ]);
      setCommandHistory((prevHistory) => [...prevHistory, input]);
      setHistoryIndex(-1);
    }

    setIsLoading(false);
  };

  const navigateHistory = (direction: "up" | "down"): string => {
    if (commandHistory.length === 0) {
      return "";
    }

    const lastIndex = commandHistory.length - 1;
    let newIndex = historyIndex;

    if (direction === "up") {
      if (historyIndex === -1) {
        newIndex = lastIndex;
      } else if (historyIndex > 0) {
        newIndex = historyIndex - 1;
      } else {
        return commandHistory[0];
      }
    } else if (historyIndex >= lastIndex) {
      newIndex = -1;
      setHistoryIndex(newIndex);
      return "";
    } else {
      newIndex = historyIndex + 1;
    }

    setHistoryIndex(newIndex);
    return commandHistory[newIndex];
  };

  const handleDeactivateRain = useCallback(() => {
    if (showMatrixRain) {
      setShowMatrixRain(false);
      setHistory((prev) => [
        ...prev,
        {
          input: "",
          output: (
            <div className="rounded-xl border border-terminal-border/70 bg-terminal-bg-secondary/35 px-4 py-3 text-sm text-terminal-text-secondary">
              Matrix rain desactivado, shell establecida de nuevo en modo
              normal.
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
        className={`relative flex h-full flex-col ${showMatrixRain ? "bg-terminal-bg/90 backdrop-blur-sm" : ""}`}
        style={{ zIndex: 10 }}
      >
        <header
          className="flex flex-wrap items-center justify-between gap-4 border-b border-terminal-border/90 bg-terminal-header-bg/90 px-4 py-3 backdrop-blur"
          aria-label="Barra de título de la terminal"
        >
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#ef6a72]"></span>
              <span className="h-3 w-3 rounded-full bg-[#d6ad63]"></span>
              <span className="h-3 w-3 rounded-full bg-[#7bcf9d]"></span>
            </div>
            <div className="min-w-0">
              <div className="truncate font-mono text-sm text-terminal-text">
                terminal@pablo.dev
              </div>
              <div className="truncate font-mono text-[11px] uppercase tracking-[0.18em] text-terminal-text-secondary">
                portfolio-shell / hiring-mode
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-terminal-border/70 bg-terminal-bg px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-terminal-text-secondary md:inline-flex">
              ready
            </span>
            <ThemeSwitcher />
            <div
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-terminal-border/60 bg-terminal-bg-secondary/50"
              role="img"
              aria-label="Avatar de Pablo Viniegra"
            >
              <Avatar size={34} className="opacity-90" />
            </div>
          </div>
        </header>

        <main
          ref={terminalRef}
          className="flex-1 space-y-8 overflow-y-auto px-4 py-5 md:px-6 md:py-6"
          role="log"
          aria-live="polite"
          aria-label="Salida de la terminal"
        >
          {history.map((item, index) => (
            <div key={`${item.timestamp}-${index}`} className="space-y-3">
              {item.input ? (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 font-mono text-sm">
                    <span className="text-terminal-prompt" aria-hidden="true">
                      $
                    </span>
                    <span className="text-terminal-text" role="text">
                      {item.input}
                    </span>
                  </div>
                  <time className="font-mono text-[11px] uppercase tracking-[0.18em] text-terminal-text-secondary">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </time>
                </div>
              ) : (
                <div className="h-px w-full bg-gradient-to-r from-transparent via-terminal-border/70 to-transparent"></div>
              )}
              <div className={item.input ? "pl-5 md:pl-6" : ""}>
                {item.output}
              </div>
            </div>
          ))}
          {isLoading && <TerminalLoader />}
          <div ref={historyEndRef} />
        </main>

        <footer className="border-t border-terminal-border/90 bg-terminal-header-bg/78 p-4 backdrop-blur">
          <CommandInput
            onCommand={handleCommand}
            onHistoryNavigate={navigateHistory}
            disabled={isLoading}
          />
        </footer>
      </div>
    </section>
  );
};

export default Terminal;
