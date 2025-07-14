import { useState, useEffect, useRef, useCallback } from "react";
import CommandInput from "./CommandInput";
import SectionOutput from "./SectionOutput";
import TerminalLoader from "./TerminalLoader";
import Avatar from "./Avatar";
import MatrixRain from "./MatrixRain";
import ThemeSwitcher from "./ThemeSwitcher";

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

const WelcomeMessage = () => (
  <div className="terminal-output">
    <div className="text-center max-w-2xl mx-auto">
      <AsciiTitle />
      <div className="mb-6 text-terminal-text-secondary text-lg">
        Bienvenido a mi portfolio interactivo en modo terminal
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
          <span>Versión: 1.0.0</span>
        </div>
      </div>
    </div>
  </div>
);

const helpMsg = (
  <div className="terminal-output">
    <div className="text-terminal-accent mb-2">
      === Comandos disponibles ===
    </div>
    <ul className="command-list">
      <li>
        <span className="text-terminal-accent">/rain</span> – Siéntete un hacker
        <div className="text-terminal-text-secondary text-xs ml-8 mt-1">
          Usa <span className="font-mono px-1.5 py-0.5 bg-terminal-bg rounded border border-terminal-border/50">Ctrl+C</span> para desactivar
        </div>
      </li>
      <li>
        <span className="text-terminal-accent">/home</span> – Muestra la página
        de inicio
      </li>
      <li>
        <span className="text-terminal-accent">/experience</span> – Muestra mi
        experiencia laboral
      </li>
      <li>
        <span className="text-terminal-accent">/projects</span> – Muestra mis
        proyectos
      </li>
      <li>
        <span className="text-terminal-accent">/skills</span> – Muestra mis
        habilidades técnicas
      </li>
      <li>
        <span className="text-terminal-accent">/contact</span> – Muestra mis
        datos de contacto
      </li>
      <li>
        <span className="text-terminal-accent">/cv</span> – Descarga mi CV en
        PDF
      </li>
      <li>
        <span className="text-terminal-accent">/clear</span> – Limpia la
        terminal
      </li>
      <li>
        <span className="text-terminal-accent">/help</span> – Muestra esta
        ayuda
      </li>
    </ul>
    <div className="mt-4 text-xs text-terminal-text-secondary">
      <div>
        Consejo: Usa las teclas de flecha arriba/abajo para navegar por el
        historial de comandos.
      </div>
    </div>
  </div>
);

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<Command[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        { input: "", output: <WelcomeMessage />, timestamp: Date.now() },
      ]);
    }
  }, [history.length]);

  // Efecto para manejar el scroll automático
  useEffect(() => {
    if (terminalRef.current) {
      // Usamos requestAnimationFrame para asegurarnos de que el DOM se ha actualizado
      requestAnimationFrame(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTo({
            top: terminalRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
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
        return helpMsg;
      case "/home":
        return <SectionOutput section="home" />;
      case "/experience":
        return <SectionOutput section="experience" />;
      case "/projects":
        return <SectionOutput section="projects" />;
      case "/skills":
        return <SectionOutput section="skills" />;
      case "/contact":
        return <SectionOutput section="contact" />;
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

    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 700)
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
    <div 
      className="terminal relative h-full flex flex-col overflow-hidden" 
      ref={terminalRef}
    >
      {showMatrixRain && <MatrixRain onDeactivate={handleDeactivateRain} />}
      <div className={`relative z-10 ${showMatrixRain ? 'bg-terminal-bg/80' : ''}`}>
        <div className="terminal-header flex justify-between items-center px-4 py-2 border-b border-terminal-border bg-terminal-header-bg rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-terminal-text-secondary ml-2">
              terminal@pablo.dev
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeSwitcher />
            <div className="relative group">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-terminal-border/30 hover:border-terminal-accent/50 transition-colors duration-200">
                <Avatar size={32} className="opacity-80 hover:opacity-100 transition-opacity duration-200" />
              </div>
            </div>
          </div>
        </div>

        <div className="terminal-body relative flex-1 overflow-y-auto p-4">
          {history.map((item, index) => (
            <div key={index} className="mb-4">
              {item.input && (
                <div className="flex items-center">
                  <span className="text-terminal-prompt mr-2">$</span>
                  <span className="text-terminal-text">{item.input}</span>
                </div>
              )}
              <div className="mt-1">{item.output}</div>
              <div className="text-xs text-terminal-text-secondary opacity-50">
                {new Date(item.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isLoading && <TerminalLoader />}
          <CommandInput
            onCommand={handleCommand}
            onHistoryNavigate={navigateHistory}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
