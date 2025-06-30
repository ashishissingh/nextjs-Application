import React from 'react';

interface IconProps {
  className?: string;
}

export const BotsIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className || "w-5 h-5"} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="9" y1="6" x2="15" y2="6"></line>
    <line x1="9" y1="10" x2="15" y2="10"></line>
    <line x1="9" y1="14" x2="15" y2="14"></line>
    <line x1="9" y1="18" x2="15" y2="18"></line>
  </svg>
);
