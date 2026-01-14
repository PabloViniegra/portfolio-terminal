import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import CommandInput from "./CommandInput";
import SectionOutput from "./SectionOutput";
import TerminalLoader from "./TerminalLoader";
import Avatar from "./Avatar";

// Lazy load MatrixRain solo cuando se necesita
const MatrixRain = lazy(() => import("./MatrixRain"));

/**
 * Representa un comando ejecutado en la terminal
 * @interface Command
 * @property {string} input - El comando ingresado por el usuario
 * @property {React.ReactNode} output - La salida renderizada del comando
 * @property {number} timestamp - Timestamp de cuando se ejecutó el comando
 */
interface Command {
  input: string;
  output: React.ReactNode;
  timestamp: number;
}

const AsciiTitle = () => (
  <div className="w-full mb-8 select-none font-mono">
    <div className="relative inline-block px-6 py-4 bg-terminal-header-bg border border-terminal-border rounded-lg shadow-lg">
      <div className="absolute -top-5 left-4 px-3 py-0.5 bg-terminal-bg text-terminal-accent text-xs font-mono rounded-t border border-b-0 border-terminal-border">
        pablo@terminal: ~
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-[#4ec9b0] dark:text-[#4ec9b0] text-3xl sm:text-4xl md:text-5xl font-bold">
          $
        </span>
        <span className="text-terminal-accent text-3xl sm:text-4xl md:text-5xl font-bold">
          ./
        </span>
        <span className="text-terminal-text text-3xl sm:text-4xl md:text-5xl font-bold">
          portfolio
        </span>
        <span className="text-[#ce9178] dark:text-[#ce9178] text-2xl sm:text-3xl md:text-4xl animate-pulse">
          _
        </span>
      </div>
      <div className="absolute -bottom-3 left-4 right-4 h-1 bg-gradient-to-r from-[#4ec9b0] via-[#9cdcfe] to-[#4ec9b0] rounded-b opacity-70"></div>
    </div>
  </div>
);

const WelcomeMessage: React.FC<{ welcomeMessage: string, version: string }> = ({ welcomeMessage, version }) => (
  <div className="terminal-output">
    <div className="text-center max-w-2xl mx-auto">
      <AsciiTitle />
      <div className="mb-6 text-terminal-text-secondary text-lg">
        {welcomeMessage}
      </div>
      <div className="mb-4 p-3 bg-terminal-bg-secondary rounded border border-terminal-border/30">
        <p className="text-sm">Prueba el comando <span className="text-terminal-prompt font-mono font-bold">/rain</span> para un efecto especial</p>
        <p className="text-xs text-terminal-text-secondary mt-1">Usa <span className="font-mono px-1.5 py-0.5 bg-terminal-bg rounded border border-terminal-border/50">Ctrl+C</span> para desactivar</p>
      </div>
      <div className="mb-8 p-4 bg-terminal-bg-secondary rounded-lg border border-terminal-border/50">
        <p className="text-terminal-text mb-3 text-center">
          Escribe{" "}
          <span className="text-terminal-prompt font-mono font-bold">/help</span> para
          ver los comandos disponibles.
        </p>
        <div className="space-y-2 text-xs text-terminal-text-secondary">
          <div className="flex items-center space-x-2">
            <span className="font-mono px-3 py-1 bg-terminal-bg rounded text-terminal-text min-w-[60px] text-center border border-terminal-border/50">
              Tab
            </span>
            <span>para autocompletar comandos</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-mono px-3 py-1 bg-terminal-bg rounded text-terminal-text min-w-[60px] text-center border border-terminal-border/50">
              ↑/↓
            </span>
            <span>para navegar entre sugerencias</span>
          </div>
        </div>
      </div>
      <div className="text-sm text-[#5c6370] mt-8 pt-4 border-t border-[#3e4451]/30">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <span>Última actualización: {new Date().toLocaleDateString()}</span>
          <span className="hidden sm:inline text-[#5c6370]">•</span>
          <span>Versión: {version}</span>
        </div>
      </div>
    </div>
  </div>
);

const HelpMessage: React.FC<{ commands: any[], helpTitle: string, helpTip: string }> = ({ commands, helpTitle, helpTip }) => (
  <div className="terminal-output">
    <div className="text-terminal-accent mb-2">
      {helpTitle}
    </div>
    <ul className="command-list">
      {commands.map((cmd, idx) => (
        <li key={idx}>
          <span className="text-terminal-accent">{cmd.command}</span> – {cmd.description}
          {cmd.hint && (
            <div className="text-terminal-text-secondary text-xs ml-8 mt-1">
              {cmd.hint}
            </div>
          )}
        </li>
      ))}
    </ul>
    <div className="mt-4 text-xs text-terminal-text-secondary">
      <div>
        {helpTip}
      </div>
    </div>
  </div>
);

interface ContentData {
  experiences: any[];
  projects: any[];
  knowledgeCategories: any[];
  softSkills: any[];
  contactInfo: any[];
  commands: any[];
  general: {
    ctaMessage: string;
    ctaButtonText: string;
    welcomeMessage: string;
    helpTitle: string;
    helpTip: string;
    version: string;
  };
}

interface TerminalProps {
  contentData: ContentData;
}

/**
 * Componente principal de la terminal interactiva
 * 
 * Simula una terminal de comandos donde los usuarios pueden ejecutar comandos
 * para navegar por el contenido del portfolio. Incluye características como:
 * - Historial de comandos navegable con flechas arriba/abajo
 * - Autocompletado de comandos con Tab
 * - Efecto Matrix Rain activable
 * - Scroll automático al final del historial
 * 
 * @component
 * @example
 * ```tsx
 * <Terminal client:idle contentData={contentData} />
 * ```
 */
const Terminal: React.FC<TerminalProps> = ({ contentData }) => {
  const [history, setHistory] = useState<Command[]>(() => [
    { 
      input: "", 
      output: <WelcomeMessage 
        welcomeMessage={contentData.general.welcomeMessage} 
        version={contentData.general.version}
      />, 
      timestamp: Date.now() 
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // Efecto para manejar el scroll automático optimizado
  useEffect(() => {
    if (historyEndRef.current) {
      // Usar requestAnimationFrame para mejor rendimiento
      requestAnimationFrame(() => {
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [history, isLoading]);

  const processCommand = (input: string): React.ReactNode => {
    if (input.trim() === "") return null;

    const command = input.toLowerCase();
    
    switch (command) {
      case "/rain":
        setShowMatrixRain(true);
        return (
          <div className="terminal-output">
            <p>Efecto de lluvia de Matrix activado</p>
            <p className="text-sm text-terminal-text-secondary mt-1">
              Presiona <span className="font-mono px-1.5 py-0.5 bg-terminal-bg rounded border border-terminal-border/50">Ctrl+C</span> para desactivar
            </p>
          </div>
        );
      case "/clear":
        setHistory([]);
        return null;
      case "/help":
        return <HelpMessage 
          commands={contentData.commands} 
          helpTitle={contentData.general.helpTitle}
          helpTip={contentData.general.helpTip}
        />;
      case "/home":
        return <SectionOutput section="home" />;
      case "/experience":
        return <SectionOutput 
          section="experience" 
          data={{ experiences: contentData.experiences }}
        />;
      case "/projects":
        return <SectionOutput 
          section="projects" 
          data={{ projects: contentData.projects }}
        />;
      case "/skills":
        return <SectionOutput 
          section="skills" 
          data={{ 
            knowledgeCategories: contentData.knowledgeCategories,
            softSkills: contentData.softSkills 
          }}
        />;
      case "/contact":
        return <SectionOutput 
          section="contact" 
          data={{ 
            contactInfo: contentData.contactInfo,
            ctaMessage: contentData.general.ctaMessage,
            ctaButtonText: contentData.general.ctaButtonText
          }}
        />;
      case "/cv":
        const link = document.createElement('a');
        link.href = '/cv/CV_2024.pdf';
        link.download = 'Pablo_Viniegra_CV_2024.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return (
          <div className="text-terminal-text">
            Descargando CV... Si la descarga no comienza automáticamente, 
            <a 
              href="/cv/CV_2024.pdf" 
              download="Pablo_Viniegra_CV_2024.pdf"
              className="text-terminal-accent underline ml-1"
            >
              haz clic aquí
            </a>
          </div>
        );
      default:
        return (
          <div className="error-message">
            <div>
              Comando no reconocido: <span className="font-bold">{input}</span>
            </div>
            <div>
              Escribe{" "}
              <span className="text-terminal-accent font-bold">/help</span> para
              ver los comandos disponibles.
            </div>
          </div>
        );
    }
  };

  const handleCommand = async (input: string) => {
    if (input.trim() === "") return;

    setIsLoading(true);

    // Delay reducido para mejor UX (200-400ms en lugar de 800-1500ms)
    await new Promise((resolve) =>
      setTimeout(resolve, 200 + Math.random() * 200)
    );

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
    if (commandHistory.length === 0) return "";

    const lastIndex = commandHistory.length - 1;
    let newIndex = historyIndex;

    if (direction === "up") {
      if (historyIndex === -1) {
        newIndex = lastIndex;
      } 
      else if (historyIndex > 0) {
        newIndex = historyIndex - 1;
      }
      else {
        return commandHistory[0];
      }
    } 
    else {
      if (historyIndex >= lastIndex) {
        newIndex = -1;
        setHistoryIndex(newIndex);
        return "";
      } 
      else {
        newIndex = historyIndex + 1;
      }
    }

    setHistoryIndex(newIndex);
    return commandHistory[newIndex];
  };

  const handleDeactivateRain = useCallback(() => {
    if (showMatrixRain) {
      setShowMatrixRain(false);
      setHistory(prev => [
        ...prev, 
        { 
          input: "", 
          output: <div className="text-terminal-text-secondary">Efecto de lluvia de Matrix desactivado</div>, 
          timestamp: Date.now() 
        }
      ]);
    }
  }, [showMatrixRain]);

  return (
    <section 
      className="terminal relative h-full flex flex-col bg-terminal-bg text-terminal-text overflow-hidden"
      role="application"
      aria-label="Terminal interactiva de portfolio"
    >
      {showMatrixRain && (
        <Suspense fallback={<div className="text-terminal-text-secondary">Cargando efecto...</div>}>
          <MatrixRain onDeactivate={handleDeactivateRain} />
        </Suspense>
      )}
      
      <div className={`relative flex flex-col h-full ${showMatrixRain ? 'bg-terminal-bg/90 backdrop-blur-sm' : ''}`} style={{ zIndex: 10 }}>
        <header 
          className="flex justify-between items-center px-4 py-2 border-b border-terminal-border bg-terminal-header-bg"
          aria-label="Barra de título de la terminal"
        >
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5" role="presentation" aria-label="Botones de ventana">
              <div className="w-3 h-3 rounded-full bg-red-500" aria-label="Cerrar" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" aria-label="Minimizar" />
              <div className="w-3 h-3 rounded-full bg-green-500" aria-label="Maximizar" />
            </div>
            <span className="text-xs text-terminal-text-secondary">terminal@pablo.dev</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div 
                className="w-8 h-8 rounded-full overflow-hidden border border-terminal-border/30 hover:border-terminal-accent/50 transition-colors duration-200"
                role="img"
                aria-label="Avatar de Pablo Viniegra"
              >
                <Avatar size={32} className="opacity-80 hover:opacity-100 transition-opacity duration-200" />
              </div>
            </div>
          </div>
        </header>

        <main 
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-terminal-border/30 scrollbar-track-transparent"
          role="log"
          aria-live="polite"
          aria-label="Salida de la terminal"
        >
          {history.map((item, index) => (
            <div key={index} className="command-group">
              {item.input && (
                <div className="flex items-baseline">
                  <span className="text-terminal-prompt font-mono font-bold mr-2" aria-hidden="true">$</span>
                  <span className="text-terminal-text font-mono" role="text">{item.input}</span>
                </div>
              )}
              <div className="pl-4 border-l-2 border-terminal-border my-1">
                {item.output}
              </div>
              <time className="text-xs text-terminal-text-secondary opacity-50 mt-1">
                {new Date(item.timestamp).toLocaleTimeString()}
              </time>
            </div>
          ))}
          {isLoading && <TerminalLoader />}
          <div ref={historyEndRef} />
        </main>

        <footer className="border-t border-terminal-border bg-terminal-bg/90 backdrop-blur-sm p-4 sticky bottom-0 z-10">
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
