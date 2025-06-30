
import React from 'react';

interface IconProps {
  className?: string;
}

export const LockIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className || "w-5 h-5"} 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path 
      fillRule="evenodd" 
      d="M10 2a4 4 0 00-4 4v2H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm0 2a2 2 0 00-2 2v2h4V6a2 2 0 00-2-2z" 
      clipRule="evenodd" 
    />
  </svg>
);
