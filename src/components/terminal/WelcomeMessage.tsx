import { COMMANDS } from '../../constants/commands';
import type { ProfileItem } from '../../types/content';
import { QuickCommand } from './QuickCommand';

const AsciiTitle = ({ profile }: { profile?: ProfileItem }) => (
  <div className="flex flex-col gap-2 font-mono leading-none">
    <div className="flex items-center gap-3 font-pixel text-mono-sm uppercase tracking-[0.16em] text-terminal-text-secondary">
      <span className="text-terminal-prompt">┌─</span>
      <span>pablo@portfolio.dev</span>
      <span className="hidden sm:inline">·</span>
      <span className="hidden sm:inline">búsqueda-activa</span>
    </div>
    <div className="flex items-baseline gap-3 py-1 font-pixel font-medium uppercase leading-[0.9] tracking-[-0.03em] [text-wrap:balance]">
      <span className="text-3xl text-terminal-prompt md:text-5xl" aria-hidden="true">
        $
      </span>
      <h1 aria-label="./pablo" className="pixel-glow inline-flex items-baseline text-5xl text-terminal-accent md:text-7xl">
        <span className="terminal-startup-command" aria-hidden="true">
          {'./pablo'.split('').map((character, index) => (
            <span key={index} style={{ animationDelay: `calc(var(--motion-base) * ${index} / 7)` }}>
              {character}
            </span>
          ))}
        </span>
        <span className="pixel-cursor" aria-hidden="true"></span>
      </h1>
    </div>
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-pixel text-mono-sm uppercase leading-normal tracking-[0.16em] text-terminal-text-secondary">
      <span className="text-terminal-prompt">└─</span>
      <span>{profile?.role ?? 'ingeniero full stack'}</span>
      <span className="text-terminal-text-tertiary">·</span>
      <span>{profile?.location ?? 'Madrid'}</span>
      <span className="text-terminal-text-tertiary">·</span>
      <span className="text-terminal-accent">{profile?.status ?? 'abierto a ofertas'}</span>
    </div>
  </div>
);

const TasteLine = ({ profile }: { profile?: ProfileItem }) => (
  <p className="flex max-w-[62ch] gap-2 text-base leading-relaxed text-terminal-text-secondary [text-wrap:pretty]">
    <span className="font-mono text-terminal-prompt" aria-hidden="true">→</span>
    <span>{profile?.availability ?? 'Código claro, criterio firme. Producto primero, frameworks después.'}</span>
  </p>
);

export const WelcomeMessage = ({
  welcomeMessage,
  profile,
  onQuickCommand,
}: {
  welcomeMessage: string;
  profile?: ProfileItem;
  onQuickCommand: (command: string) => void;
}) => (
  <div className="terminal-output font-sans">
    <div className="terminal-welcome mx-auto flex max-w-4xl flex-col gap-6">
      <AsciiTitle profile={profile} />

      <div className="flex flex-col gap-4">
        <p className="max-w-[44ch] text-xl font-medium leading-snug tracking-[-0.015em] text-terminal-text [text-wrap:pretty] md:text-2xl">
          {welcomeMessage}
        </p>
        <TasteLine profile={profile} />
      </div>

      <nav aria-label="Secciones principales" className="flex flex-col gap-3 pt-2">
      <p className="font-pixel text-mono-sm uppercase tracking-[0.16em] text-terminal-text-secondary">
        Escribe un comando o elige una sección.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <QuickCommand
          command="/projects"
          label="proyectos"
          onRun={onQuickCommand}
          primary
          showCommand={false}
        />
        <QuickCommand
          command="/experience"
          label="experiencia"
          onRun={onQuickCommand}
          showCommand={false}
        />
        <QuickCommand
          command="/cv"
          label="CV"
          onRun={onQuickCommand}
          showCommand={false}
        />
        <QuickCommand
          command="/contact"
          label="contacto"
          onRun={onQuickCommand}
          showCommand={false}
        />
        <QuickCommand
          command={COMMANDS.HELP}
          label="todos los comandos"
          onRun={onQuickCommand}
          ghost
        />
      </div>
      </nav>
    </div>
  </div>
);
