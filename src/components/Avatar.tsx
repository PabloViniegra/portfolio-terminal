import React from 'react';

interface AvatarProps {
  className?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ className = '', size = 32 }) => {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 128 128" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="64"
        cy="64"
        r="62"
        fill="#23272E"
        stroke="#7fff00"
        strokeWidth="4"
      />
      <ellipse cx="64" cy="50" rx="36" ry="28" fill="#d4ccb5" />
      <ellipse cx="64" cy="42" rx="30" ry="16" fill="#bab29e" />
      <ellipse cx="64" cy="72" rx="26" ry="28" fill="#F9E7D3" />
      <rect
        x="34"
        y="28"
        width="60"
        height="12"
        rx="6"
        fill="#23272E"
        stroke="#4ADE80"
        strokeWidth="3"
      />
      <ellipse
        cx="28"
        cy="60"
        rx="8"
        ry="16"
        fill="#23272E"
        stroke="#4ADE80"
        strokeWidth="3"
      />
      <ellipse
        cx="100"
        cy="60"
        rx="8"
        ry="16"
        fill="#23272E"
        stroke="#4ADE80"
        strokeWidth="3"
      />
      <ellipse cx="52" cy="76" rx="5" ry="7" fill="#56d364" />
      <ellipse cx="76" cy="76" rx="5" ry="7" fill="#56d364" />
      <ellipse cx="52" cy="78" rx="2" ry="3" fill="#21371B" opacity="0.8" />
      <ellipse cx="76" cy="78" rx="2" ry="3" fill="#21371B" opacity="0.8" />
      <rect x="44" y="65" width="12" height="2.5" rx="1" fill="#b6ad96" />
      <rect x="72" y="65" width="12" height="2.5" rx="1" fill="#b6ad96" />
      <path
        d="M54 93 Q64 100 74 93"
        stroke="#a77b59"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Avatar;
