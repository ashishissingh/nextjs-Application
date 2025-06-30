import React from 'react';

interface IconProps {
  className?: string;
}

export const LargeFileTextIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className || "w-20 h-20"} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1" // Thinner stroke for larger icon
    strokeLinecap="round" 
    strokeLinejoin="round" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.5 2H6.5C5.12 2 4 3.12 4 4.5v15C4 20.88 5.12 22 6.5 22h11c1.38 0 2.5-1.12 2.5-2.5V7.5L15.5 2z"></path>
    <polyline points="15 2 15 8 21 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="8" y2="9"></line>
  </svg>
);
