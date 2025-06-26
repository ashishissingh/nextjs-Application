import React from 'react';
import { MagnifyingGlassIcon } from '../../../constants';

interface AiStudioSectionHeaderProps {
  title: string;
  subtitle?: string;
  backgroundColorClasses?: string;
  textColorClasses?: string;
  decorativeIcon?: React.ReactElement<{ className?: string }>;

  // Search bar props
  showSearchBar?: boolean;
  searchPlaceholder?: string;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

const AiStudioSectionHeader: React.FC<AiStudioSectionHeaderProps> = ({
  title,
  subtitle,
  backgroundColorClasses = 'bg-gradient-to-r from-slate-800 via-indigo-900 to-purple-900',
  textColorClasses = 'text-white',
  decorativeIcon,
  showSearchBar,
  searchPlaceholder,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="pt-6 mb-6 md:mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-6 sm:p-8 rounded-xl shadow-xl relative overflow-hidden ${backgroundColorClasses}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
            <div>
              <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight ${textColorClasses}`}>
                {title}
              </h1>
              {subtitle && (
                <p className={`mt-2 text-lg ${textColorClasses} opacity-80 max-w-2xl`}>
                  {subtitle}
                </p>
              )}
            </div>
            {decorativeIcon && (
              <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
                {React.cloneElement(decorativeIcon, {
                  className: `w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 ${textColorClasses} opacity-90 ${decorativeIcon.props.className || ''}`.trim(),
                })}
              </div>
            )}
          </div>
        </div>

        {showSearchBar && (
          <div className="relative mt-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
              type="search"
              placeholder={searchPlaceholder || "Search..."}
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full h-12 pl-12 pr-4 py-3 rounded-lg shadow-sm border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all text-base"
              aria-label={searchPlaceholder || "Search"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AiStudioSectionHeader;
