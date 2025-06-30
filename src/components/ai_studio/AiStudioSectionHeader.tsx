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
  
  // Create button props
  showCreateButton?: boolean;
  createButtonText?: string;
  onCreateClick?: () => void;
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
  showCreateButton,
  createButtonText,
  onCreateClick,
}) => {
  return (
    <div className="">
      <div className="">
        <div className={`p-4 sm:p-4 relative overflow-hidden`} style={{backgroundImage: 'url(/images/backgrounds/ai-image1.png)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}>
          <div className="absolute inset-0 bg-black/30"></div>
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

          </div>
        </div>

        {showSearchBar && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <div className="flex gap-4 items-center mt-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type="search"
                  placeholder={searchPlaceholder || "Search..."}
                  value={searchTerm}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 py-3 rounded-lg shadow-sm border border-border bg-input text-foreground placeholder:text-form-description focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all text-base"
                  aria-label={searchPlaceholder || "Search"}
                />
              </div>
              {showCreateButton && (
                <button
                  onClick={onCreateClick}
                  className="flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75 transition-colors duration-200 font-medium whitespace-nowrap"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {createButtonText || "Create New"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiStudioSectionHeader;
