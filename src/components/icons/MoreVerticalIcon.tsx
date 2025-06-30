import React from 'react';

interface IconProps {
  className?: string;
}

export const MoreVerticalIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className || "w-4 h-4"} 
    viewBox="0 0 24 24" 
    fill="currentColor" // Using fill for solid dots
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="5" r="2"></circle>
    <circle cx="12" cy="12" r="2"></circle>
    <circle cx="12" cy="19" r="2"></circle>
  </svg>
);
