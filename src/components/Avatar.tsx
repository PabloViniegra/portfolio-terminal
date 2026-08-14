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
      aria-label="Pablo Viniegra — working shell mark"
    >
      <circle
        cx="64"
        cy="64"
        r="62"
        fill="var(--avatar-fill)"
        stroke="var(--avatar-stroke-strong)"
        strokeWidth="3"
      />
      <path
        d="M20 64a44 44 0 0 1 44-44 44 44 0 0 1 44 44 44 44 0 0 1-44 44 44 44 0 0 1-44-44Z"
        stroke="var(--terminal-accent)"
        strokeOpacity="0.18"
        strokeWidth="1"
        strokeDasharray="2 6"
        aria-hidden="true"
      />
      <rect
        x="17"
        y="27"
        width="94"
        height="74"
        rx="10"
        fill="var(--terminal-bg-secondary)"
        stroke="var(--avatar-stroke)"
        strokeOpacity="0.72"
        strokeWidth="1.5"
      />
      <line
        x1="17"
        y1="43"
        x2="111"
        y2="43"
        stroke="var(--terminal-border)"
        strokeWidth="1"
      />
      <circle cx="26" cy="35" r="2" fill="var(--terminal-dot-close)" />
      <circle cx="34" cy="35" r="2" fill="var(--terminal-dot-min)" />
      <circle cx="42" cy="35" r="2" fill="var(--terminal-dot-max)" />
      <path
        d="M29 57l9 7-9 7M44 71h13"
        stroke="var(--avatar-stroke-strong)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      />
      <path
        d="M66 56h24M66 64h16M66 72h20"
        stroke="var(--terminal-text-secondary)"
        strokeOpacity="0.78"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      />
      <circle cx="94" cy="56" r="3" fill="var(--avatar-accent)" />
      <circle cx="86" cy="64" r="3" fill="var(--terminal-accent)" />
      <circle cx="90" cy="72" r="3" fill="var(--terminal-warning)" />
      <path
        d="M94 56v8h-8M86 64v8h4"
        stroke="var(--terminal-border)"
        strokeWidth="1.5"
        aria-hidden="true"
      />
      <rect
        x="59"
        y="79"
        width="6"
        height="12"
        rx="1"
        fill="var(--avatar-accent)"
        className="avatar-cursor"
        aria-hidden="true"
      />
    </svg>
  );
};

export default Avatar;
