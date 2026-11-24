export const QuickCommand = ({
  command,
  label,
  onRun,
  primary = false,
  ghost = false,
  showCommand = true,
}: {
  command: string;
  label: string;
  onRun: (command: string) => void;
  primary?: boolean;
  ghost?: boolean;
  showCommand?: boolean;
}) => (
  <button
    type="button"
    onClick={() => onRun(command)}
    data-variant={primary ? 'primary' : ghost ? 'ghost' : 'default'}
    className="quick-command"
    aria-label={`Ejecutar ${command}`}
  >
    <span className="text-terminal-prompt" aria-hidden="true">$</span>
    {showCommand && (
      <span className="font-mono normal-case tracking-normal text-terminal-text">{command}</span>
    )}
    <span>{label}</span>
    <span className="quick-command__arrow" aria-hidden="true">→</span>
  </button>
);
