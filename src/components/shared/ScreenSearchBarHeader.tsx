import React from 'react';
import { MagnifyingGlassIcon } from '../../../constants';

interface ScreenSearchBarHeaderProps {
  placeholderText: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ScreenSearchBarHeader: React.FC<ScreenSearchBarHeaderProps> = ({ placeholderText, value, onChange }) => {
  return (
    <div className="relative mb-6 md:mb-8"> {/* Restored bottom margin */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
      </div>
      <input
        type="search"
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white/70 backdrop-blur-md text-slate-700 placeholder-slate-500"
        aria-label={placeholderText}
      />
    </div>
  );
};

export default ScreenSearchBarHeader;
