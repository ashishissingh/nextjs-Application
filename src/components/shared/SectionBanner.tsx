import React from 'react';

interface SectionBannerProps {
  title: string;
  subtitle: string;
  iconElement?: React.ReactElement<{ className?: string }>; 
  imageUrl?: string;
}

const SectionBanner: React.FC<SectionBannerProps> = ({ title, subtitle, iconElement, imageUrl }) => {
  const defaultTitleClass = "text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground";

  return (
    <div className="mb-8 md:mb-12 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-primary to-chart-1 text-primary-foreground shadow-xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
        <div>
          <h1 className={defaultTitleClass}>{title}</h1>
          <p className="mt-2 text-lg text-primary-foreground/70 max-w-2xl">{subtitle}</p>
        </div>
        <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${title} banner image`}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg shadow-md opacity-90"
            />
          ) : iconElement ? (
            React.cloneElement(iconElement, {
              className: `w-20 h-20 sm:w-24 sm:h-24 text-primary-foreground/50 opacity-75 ${iconElement.props.className || ''}`.trim()
            })
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SectionBanner;
