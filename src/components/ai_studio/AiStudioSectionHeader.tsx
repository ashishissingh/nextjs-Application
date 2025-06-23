

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
    <div className="pt-6 mb-6 md:mb-8"> {/* Added pt-6 for space at the top. Overall margin for the header block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* New max-width and centering wrapper */}
        <div 
          className={`p-6 sm:p-8 rounded-xl shadow-xl relative overflow-hidden ${backgroundColorClasses}`}
          // Example for a textured background (like leaves in user's image):
          // style={{ backgroundImage: "url('/path-to-leafy-texture.png')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
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
                  className: `w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 ${textColorClasses} opacity-90 ${decorativeIcon.props.className || ''}`.trim() 
                })}
              </div>
            )}
          </div>
          {/* Subtle pattern overlay if desired, mimicking the noise/texture in the example */}
          {/* <div className="absolute inset-0 z-0 opacity-[0.03]" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6zM26 26c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6zM42 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div> */}
        </div>

        {showSearchBar && (
          <div className="relative mt-4"> {/* Removed px-1 as parent now has padding */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"> {/* Adjusted search icon padding to match input */}
              <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="search"
              placeholder={searchPlaceholder || "Search..."}
              value={searchTerm}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full h-12 pl-12 pr-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-base bg-white placeholder-slate-500"
              aria-label={searchPlaceholder || "Search"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AiStudioSectionHeader;
