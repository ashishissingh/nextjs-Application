import React, { useState } from 'react';
import { ModuleCard } from './ModuleCard';
import type { Module } from '../../types';
import { 
  SparklesIcon, 
  CommandLineIcon, 
  CubeIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  ChartPieIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  // Removed ChevronDownIcon, ArrowsUpDownIcon, Bars3Icon, PlusIcon
} from '../../constants';

const modulesData: Module[] = [
  { 
    id: 'ai-studio', 
    name: 'AI Studio', 
    description: 'Design, train, and deploy cutting-edge AI models with intuitive tools and powerful infrastructure.', 
    icon: <SparklesIcon className="w-8 h-8 text-pink-500" /> 
  },
  { 
    id: 'k8s-mgmt', 
    name: 'K8s Management', 
    description: 'Orchestrate and monitor your Kubernetes clusters with ease, ensuring optimal performance and reliability.', 
    icon: <CommandLineIcon className="w-8 h-8 text-blue-600" /> 
  },
  { 
    id: 'asset-mgmt', 
    name: 'Asset Management', 
    description: 'Track, organize, and optimize your digital and physical assets across their entire lifecycle.', 
    icon: <CubeIcon className="w-8 h-8 text-emerald-500" /> 
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics Suite',
    description: 'Unlock insights from your data with powerful analytics and visualization tools.',
    icon: <ChartPieIcon className="w-8 h-8 text-yellow-500" />
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage Solutions',
    description: 'Securely store and manage your data with scalable cloud storage options.',
    icon: <CubeIcon className="w-8 h-8 text-sky-500" />
  },
  {
    id: 'devops-pipeline',
    name: 'DevOps CI/CD Pipeline',
    description: 'Automate your software delivery process from code to deployment.',
    icon: <WrenchScrewdriverIcon className="w-8 h-8 text-indigo-500" />
  },
  {
    id: 'iot-platform',
    name: 'IoT Platform',
    description: 'Connect, manage, and analyze data from your Internet of Things devices.',
    icon: <SparklesIcon className="w-8 h-8 text-teal-500" />
  },
  {
    id: 'security-center',
    name: 'Security Center',
    description: 'Monitor and protect your applications and infrastructure from threats.',
    icon: <ShieldCheckIcon className="w-8 h-8 text-red-500" />
  },
  {
    id: 'collaboration-hub',
    name: 'Collaboration Hub',
    description: 'Enhance teamwork with integrated communication and project management tools.',
    icon: <UserGroupIcon className="w-8 h-8 text-purple-500" />
  },
];

interface MainContentProps {
  onExploreModule: (moduleId: string) => void;
}

const ITEMS_PER_PAGE = 6;
const USERNAME = "Guest"; // Reinstated

const MainContent: React.FC<MainContentProps> = ({ onExploreModule }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModules = modulesData.filter(module => 
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredModules.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentModules = filteredModules.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    setCurrentPage(1); 
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header Section */}
      <header 
        className="px-6 sm:px-10 md:px-16 py-16 relative bg-cover bg-center" // Increased py, added relative, bg-cover, bg-center
        style={{ backgroundImage: 'url("https://source.unsplash.com/random/1600x450?abstract,workspace,modern")' }} // Added background image
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/70 via-indigo-800/60 to-slate-900/80"></div> {/* Overlay */}
        
        <div className="relative z-10 flex flex-col items-center text-center"> {/* Content wrapper */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Welcome back, {USERNAME}!</h1> {/* Changed text color, adjusted margin */}
          
          <form onSubmit={handleSearchSubmit} className="max-w-xl w-full relative"> {/* Constrained width for search bar */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects, services, tools, or templates..."
              className="w-full h-14 pl-12 pr-16 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg bg-white placeholder-slate-500"
              aria-label="Search content"
            />
            <button 
              type="submit"
              className="absolute inset-y-0 right-0 px-5 flex items-center bg-slate-100 hover:bg-slate-200 rounded-r-lg transition-colors"
              aria-label="Submit search"
            >
              <ArrowRightIcon className="w-5 h-5 text-purple-600" />
            </button>
          </form>
        </div>
      </header>

      {/* Middle Scrollable Section */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 lg:p-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 md:mb-8">Explore Our Services</h2>
        
        {currentModules.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {currentModules.map((module) => (
              <ModuleCard 
                key={module.id} 
                module={module} 
                onExplore={() => onExploreModule(module.id)} 
              />
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center py-10">
            <MagnifyingGlassIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 text-xl">
              {searchTerm ? `No modules found for "${searchTerm}".` : "No modules available at the moment."}
            </p>
            {searchTerm && 
              <button 
                onClick={() => {setSearchTerm(''); setCurrentPage(1);}} 
                className="mt-4 text-purple-600 hover:text-purple-800 font-medium"
              >
                Clear search
              </button>
            }
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="mt-8 md:mt-12 flex items-center justify-center space-x-4 py-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-3 rounded-lg bg-white/70 backdrop-blur-md shadow-md hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-700 hover:text-purple-600"
              aria-label="Previous page"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <span className="text-slate-700 font-medium text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-3 rounded-lg bg-white/70 backdrop-blur-md shadow-md hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-700 hover:text-purple-600"
              aria-label="Next page"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
      
      {/* Footer Section - Fixed */}
       <footer className="p-4 sm:p-6 border-t border-slate-200 bg-slate-100 text-center text-sm text-slate-600">
        <p>&copy; {new Date().getFullYear()} Project Dashboard. Discover and Innovate.</p>
      </footer>
    </div>
  );
};

export default MainContent;