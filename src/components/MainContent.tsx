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
} from '../../constants';

const modulesData: Module[] = [
  { 
    id: 'ai-studio', 
    name: 'AI Studio', 
    description: 'Design, train, and deploy cutting-edge AI models with intuitive tools and powerful infrastructure.', 
    descriptionClassName: 'text-form-description',
    icon: <SparklesIcon className="w-8 h-8 text-primary" /> 
  },
  { 
    id: 'k8s-mgmt', 
    name: 'K8s Management', 
    description: 'Orchestrate and monitor your Kubernetes clusters with ease, ensuring optimal performance and reliability.', 
    descriptionClassName: 'text-form-description',
    icon: <CommandLineIcon className="w-8 h-8 text-primary" /> 
  },
  { 
    id: 'asset-mgmt', 
    name: 'Asset Management', 
    description: 'Track, organize, and optimize your digital and physical assets across their entire lifecycle.', 
    descriptionClassName: 'text-form-description',
    icon: <CubeIcon className="w-8 h-8 text-primary" /> 
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics Suite',
    description: 'Unlock insights from your data with powerful analytics and visualization tools.',
    descriptionClassName: 'text-form-description',
    icon: <ChartPieIcon className="w-8 h-8 text-primary" />
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage Solutions',
    description: 'Securely store and manage your data with scalable cloud storage options.',
    descriptionClassName: 'text-form-description',
    icon: <CubeIcon className="w-8 h-8 text-primary" />
  },
  {
    id: 'devops-pipeline',
    name: 'DevOps CI/CD Pipeline',
    description: 'Automate your software delivery process from code to deployment.',
    descriptionClassName: 'text-form-description',
    icon: <WrenchScrewdriverIcon className="w-8 h-8 text-primary" />
  },
  {
    id: 'iot-platform',
    name: 'IoT Platform',
    description: 'Connect, manage, and analyze data from your Internet of Things devices.',
    descriptionClassName: 'text-form-description',
    icon: <SparklesIcon className="w-8 h-8 text-primary" />
  },
  {
    id: 'security-center',
    name: 'Security Center',
    description: 'Monitor and protect your applications and infrastructure from threats.',
    descriptionClassName: 'text-form-description',
    icon: <ShieldCheckIcon className="w-8 h-8 text-primary" />
  },
  {
    id: 'collaboration-hub',
    name: 'Collaboration Hub',
    description: 'Enhance teamwork with integrated communication and project management tools.',
    descriptionClassName: 'text-form-description',
    icon: <UserGroupIcon className="w-8 h-8 text-primary" />
  },
];

interface MainContentProps {
  onExploreModule: (moduleId: string) => void;
}

const ITEMS_PER_PAGE = 6;
const USERNAME = "Guest";

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
    setCurrentPage(1); 
  };

  return (
    <div className="flex-1 flex flex-col bg-background"> {/* bg-background instead of bg-slate-50 :contentReference[oaicite:0]{index=0} */}
      {/* Header Section */}
      <header 
        className="px-6 sm:px-10 md:px-16 py-16 relative bg-cover bg-center"
        style={{ backgroundImage: 'url("https://source.unsplash.com/random/1600x450?abstract,workspace,modern")' }}
      >
        {/* Overlay using semantic colors: from-primary/70 via-primary/60 to-background/80 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/60 to-background/80"></div> 
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Welcome back, {USERNAME}!
          </h1>
          
          <form onSubmit={handleSearchSubmit} className="max-w-xl w-full relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects, services, tools, or templates..."
              className="
                w-full h-14 pl-12 pr-16 py-3
                border border-border rounded-lg shadow-sm
                focus:ring-2 focus:ring-primary focus:border-primary
                transition-all text-lg bg-card placeholder:text-muted-foreground text-foreground
              "
              aria-label="Search content"
            />
            <button 
              type="submit"
              className="
                absolute inset-y-0 right-0 px-5 flex items-center
                bg-card/70 hover:bg-card/80 rounded-r-lg
                transition-colors
              "
              aria-label="Submit search"
            >
              <ArrowRightIcon className="w-5 h-5 text-primary" />
            </button>
          </form>
        </div>
      </header>

      {/* Middle Scrollable Section */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 lg:p-12">
        <h2 className="text-3xl font-bold text-foreground mb-6 md:mb-8">
          Explore Our Services
        </h2>
        
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
            <MagnifyingGlassIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-xl">
              {searchTerm ? `No modules found for "${searchTerm}".` : "No modules available at the moment."}
            </p>
            {searchTerm && 
              <button 
                onClick={() => {setSearchTerm(''); setCurrentPage(1);}} 
                className="mt-4 text-primary hover:text-primary/90 font-medium"
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
              className="
                p-3 rounded-lg
                bg-card/70 backdrop-blur-md shadow-md
                hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
                text-foreground hover:text-primary
              "
              aria-label="Previous page"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <span className="text-foreground font-medium text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="
                p-3 rounded-lg
                bg-card/70 backdrop-blur-md shadow-md
                hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
                text-foreground hover:text-primary
              "
              aria-label="Next page"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
      
      {/* Footer Section - Fixed */}
      <footer className="p-2 sm:p-2 border-t border-border bg-background text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Project Dashboard. Discover and Innovate.</p>
      </footer>
    </div>
  );
};

export default MainContent;
