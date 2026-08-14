import { COMMANDS } from '../../constants/commands';
import type { ProfileItem } from '../../types/content';
import { QuickCommand } from './QuickCommand';

const AsciiTitle = ({ profile }: { profile?: ProfileItem }) => (
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
      <span>{profile?.role ?? 'fullstack engineer'}</span>
      <span>{profile?.location ?? 'madrid'}</span>
      <span className="text-terminal-text-tertiary">·</span>
      <span className="text-terminal-accent">{profile?.status ?? 'open to roles'}</span>
    </div>
  </div>
);

const TasteLine = ({ profile }: { profile?: ProfileItem }) => (
  <p className="max-w-3xl font-mono text-sm tracking-[0.04em] text-terminal-text-secondary md:text-base">
    <span className="text-terminal-prompt">→</span>{' '}
    {profile?.availability ?? 'Código claro, criterio firme. Producto primero, frameworks después.'}
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
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <AsciiTitle profile={profile} />

      <div className="flex flex-col gap-3">
        <p className="max-w-3xl text-lg font-semibold leading-snug text-terminal-text md:text-xl">
          {welcomeMessage}
        </p>
        <TasteLine profile={profile} />
      </div>

      <p className="font-mono text-mono-xs uppercase tracking-[0.18em] text-terminal-text-secondary">
        Escribe un comando o elige una sección.
      </p>
      <div className="flex flex-wrap items-center gap-2 pt-1">
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
          label="canal"
          onRun={onQuickCommand}
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
