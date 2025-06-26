import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { 
  HomeIcon, 
  ServerStackIcon, 
  CpuChipIcon, 
  RocketLaunchIcon, 
  WrenchScrewdriverIcon, 
  ChartPieIcon, 
  IdentificationIcon,
} from '../../../constants';

export type K8sNavId = 'k8sDashboard' | 'clusters' | 'nodes' | 'deployments' | 'services' | 'monitoring' | 'moduleKits';

interface K8sSidebarProps {
  activeNav: K8sNavId;
  setActiveNav: (navId: K8sNavId) => void;
}

const navItems = [
  { id: 'k8sDashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'clusters', label: 'Clusters', icon: ServerStackIcon },
  { id: 'nodes', label: 'Nodes', icon: CpuChipIcon },
  { id: 'deployments', label: 'Deployments', icon: RocketLaunchIcon },
  { id: 'services', label: 'Services', icon: WrenchScrewdriverIcon },
  { id: 'monitoring', label: 'Monitoring', icon: ChartPieIcon },
  { id: 'moduleKits', label: 'Module Kits', icon: IdentificationIcon },
] as const;


const K8sSidebar: React.FC<K8sSidebarProps> = ({ activeNav, setActiveNav }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavClick = (navId: K8sNavId) => {
    setActiveNav(navId);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-24 left-4 z-50 p-2 bg-sidebar rounded-md shadow-lg border border-sidebar-border"
        aria-label="Toggle K8s Menu"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        w-60 min-w-[15rem] bg-sidebar shadow-lg flex flex-col flex-shrink-0 p-4 space-y-3 border-r border-sidebar-border
        md:relative md:translate-x-0
        ${isMobileOpen ? 'fixed inset-y-0 left-0 z-50 translate-x-0' : 'fixed inset-y-0 left-0 z-50 -translate-x-full md:translate-x-0'}
        transition-transform duration-300 ease-in-out
      `}>
      
      <div className="py-4 px-2 mb-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
          K8s Mgmt
        </h1>
      </div>

      <nav className="flex-grow w-full pt-2">
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out group focus:outline-none focus:ring-2 focus:ring-blue-400
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-700 hover:bg-blue-100/70 hover:text-blue-700'
                    }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'}`} />
                  <span className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      </div>
    </>
  );
};

export default K8sSidebar;