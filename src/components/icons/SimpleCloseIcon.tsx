import React from 'react';

interface IconProps {
  className?: string;
}

export const SimpleCloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className || "w-6 h-6"}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);