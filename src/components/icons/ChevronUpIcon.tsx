
import React from 'react';

interface IconProps {
  className?: string;
}

export const ChevronUpIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className || "w-5 h-5"}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);
