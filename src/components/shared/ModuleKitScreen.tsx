import React from 'react';
import { CheckIcon, ChevronRightIcon, PlusCircleIcon, SparklesIcon } from '../../../constants';
// SectionBanner is no longer imported or rendered by this component directly

interface ModuleKitScreenProps {
  moduleName: string;
  kitName: string;
  featurePoints: string[];
  // bannerText and bannerIcon props removed, as banner is handled globally
  primaryAction: { text: string; onClick: () => void; icon?: React.ReactElement<{ className?: string }> };
  secondaryAction?: { text: string; onClick: () => void; };
  existingKitsPlaceholderText?: string;
}

const ModuleKitScreen: React.FC<ModuleKitScreenProps> = ({
  moduleName,
  kitName,
  featurePoints,
  primaryAction,
  secondaryAction,
  existingKitsPlaceholderText = `You don't have any ${kitName}s yet. Create one to get started!`,
}) => {
  // SectionBanner related logic (subtitle, icon cloning) is removed.
  // The component is now rendered within AiStudioDashboard's scrollable <main> which has padding.

  return (
    // Removed <main className="flex-1 p-6 ... overflow-y-auto bg-slate-100/70">
    // SectionBanner rendering is removed from here.
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2">
            Ready to set up your {kitName}?
          </h2>
          <p className="text-slate-600 mb-6">
            Easily set up, manage, and grow your {moduleName.toLowerCase()} with all your ingredients, assets, controls, and workflows in one place.
          </p>
          <ul className="space-y-3 mb-8">
            {featurePoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{point}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={primaryAction.onClick}
              className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors duration-200 font-medium text-base"
            >
              {primaryAction.icon ? React.cloneElement(primaryAction.icon, {className: "w-5 h-5 mr-2"}) : <PlusCircleIcon className="w-5 h-5 mr-2" />}
              {primaryAction.text}
            </button>
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="flex items-center justify-center px-6 py-3 bg-transparent text-purple-600 rounded-lg hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors duration-200 font-medium text-base group"
              >
                {secondaryAction.text}
                <ChevronRightIcon className="w-5 h-5 ml-1 transform transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">Your {kitName}s</h3>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center min-h-[200px] flex flex-col items-center justify-center">
            {/* Default icon can be shown here or passed as a prop if needed */}
            <SparklesIcon className="w-12 h-12 text-slate-400 mb-3" /> 
            <p className="text-slate-500">{existingKitsPlaceholderText}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleKitScreen;