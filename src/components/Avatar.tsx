import React from 'react';

interface AvatarProps {
  className?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Pablo Viniegra — terminal prompt mark"
    >
      <circle
        cx="64"
        cy="64"
        r="62"
        fill="var(--avatar-fill)"
        stroke="var(--avatar-stroke-strong)"
        strokeWidth="3"
      />
      <rect
        x="18"
        y="34"
        width="92"
        height="60"
        rx="8"
        fill="var(--terminal-bg-secondary)"
        stroke="var(--terminal-border)"
        strokeWidth="1.5"
      />
      <line
        x1="18"
        y1="48"
        x2="110"
        y2="48"
        stroke="var(--terminal-border)"
        strokeWidth="1"
      />
      <circle cx="26" cy="41" r="2" fill="var(--terminal-dot-close)" />
      <circle cx="34" cy="41" r="2" fill="var(--terminal-dot-min)" />
      <circle cx="42" cy="41" r="2" fill="var(--terminal-dot-max)" />
      <text
        x="26"
        y="84"
        fontFamily="'Mona Sans Mono','Cascadia Code',monospace"
        fontSize="22"
        fontWeight="700"
        fill="var(--avatar-stroke-strong)"
        aria-hidden="true"
      >
        $
      </text>
      <text
        x="46"
        y="84"
        fontFamily="'Mona Sans Mono','Cascadia Code',monospace"
        fontSize="22"
        fontWeight="500"
        fill="var(--terminal-text)"
        aria-hidden="true"
      >
        pablo
      </text>
      <rect
        x="100"
        y="70"
        width="8"
        height="16"
        fill="var(--avatar-accent)"
        className="avatar-cursor"
        aria-hidden="true"
      />
    </svg>
  );
};

export default Avatar;
