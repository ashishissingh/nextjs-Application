import React from 'react';

interface IconProps {
  className?: string;
}

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className || "w-5 h-5"} 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="2" 
    stroke="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);
