
import React from 'react';

interface IconProps {
  className?: string;
}

export const PlusSquareIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className || "w-6 h-6"} 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m-9 3V6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3z" />
  </svg>
);
