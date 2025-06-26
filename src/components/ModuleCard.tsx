import React from 'react';
import type { Module } from '../../types';

interface ModuleCardProps {
  module: Module;
  onExplore: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onExplore }) => {
  return (
    <div 
      className="
        bg-card/70 backdrop-blur-md
        p-6 rounded-xl shadow-lg
        hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1
        flex flex-col
      "
      role="listitem"
      aria-labelledby={`module-title-${module.id}`}
    >
      <div className="flex items-center mb-4">
        {module.icon && (
          <div
            className="
              mr-4 p-3
              bg-gradient-to-br from-background to-card
              rounded-full shadow-inner flex-shrink-0
            "
          >
            {React.cloneElement(module.icon, { className: "w-7 h-7 text-primary" })}
          </div>
        )}
        <h2
          id={`module-title-${module.id}`}
          className="text-xl font-semibold text-foreground leading-tight"
        >
          {module.name}
        </h2>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
        {module.description}
      </p>
      <button 
        className="
          mt-6 w-full py-2 px-4
          bg-primary text-primary-foreground
          rounded-lg
          hover:bg-primary/90
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75
          transition-colors duration-200 text-sm font-medium
        "
        aria-label={`Explore ${module.name}`}
        onClick={onExplore}
      >
        Explore Module
      </button>
    </div>
  );
};
