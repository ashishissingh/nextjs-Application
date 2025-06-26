import React from 'react';
import { MagnifyingGlassIcon } from '../../../constants';

interface ScreenSearchBarHeaderProps {
  placeholderText: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ScreenSearchBarHeader: React.FC<ScreenSearchBarHeaderProps> = ({ placeholderText, value, onChange }) => {
  return (
    <div className="relative mb-6 md:mb-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="w-5 h-5 text-muted-foreground" />
      </div>
      <input
        type="search"
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 border border-border rounded-xl shadow-sm bg-card/70 backdrop-blur-md text-foreground placeholder-muted-foreground focus:ring-accent focus:border-accent transition-colors"
        aria-label={placeholderText}
      />
    </div>
  );
};

export default ScreenSearchBarHeader;
