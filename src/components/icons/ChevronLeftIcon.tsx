import React from 'react';

interface IconProps {
  className?: string;
}

export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className || "w-5 h-5"} 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="2" 
    stroke="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);
