import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { 
  BotIcon, 
  PromptIcon, 
  KnowledgeBaseIcon, 
  ToolsIcon, 
  IdentificationIcon,
  Squares2X2Icon 
} from '../../../constants';

export type AiStudioNavId = 'dashboard' | 'bots' | 'prompts' | 'knowledgeBase' | 'tools';

interface AiStudioSidebarProps {
  activeNav: AiStudioNavId;
  setActiveNav: (navId: AiStudioNavId) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Squares2X2Icon },
  { id: 'bots', label: 'Bots', icon: BotIcon },
  { id: 'prompts', label: 'Prompts', icon: PromptIcon },
  { id: 'knowledgeBase', label: 'Knowledge Base', icon: KnowledgeBaseIcon },
  { id: 'tools', label: 'Tools', icon: ToolsIcon },
  // { id: 'moduleKits', label: 'Module Kits', icon: IdentificationIcon },
] as const;

const AiStudioSidebar: React.FC<AiStudioSidebarProps> = ({ activeNav, setActiveNav }) => {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const handleNavClick = (navId: AiStudioNavId) => {
    const routeMap = {
      dashboard: '/ai-studio',
      bots: '/bots',
      prompts: '/prompts',
      knowledgeBase: '/knowledge-base',
      tools: '/tools'
    };
    
    router.push(routeMap[navId]);
  };
  
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-24 left-4 z-50 p-2 bg-sidebar rounded-md shadow-lg border border-sidebar-border"
        aria-label="Toggle AI Studio Menu"
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
      
      <div className="py-4 px-2 mb-2 border-b">
        <h1 className="text-4xl font-bold text-foreground">
          AI Studio
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
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 ease-in-out group focus:outline-none
                    focus:ring-2 focus:ring-[#1E2548]/50
                    ${
                      isActive
                        ? 'bg-sidebar-accent text-foreground shadow-sm'
                        : 'text-foreground hover:bg-sidebar-accent hover:text-foreground'
                    }
                  `}
                >
                  <Icon className={`
                    w-5 h-5 flex-shrink-0
                    ${
                      isActive
                        ? 'text-foreground'
                        : 'teBxt-foreground group-hover:text-foreground'
                    }
                  `} />
                  <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-foreground'}`}>
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

export default AiStudioSidebar;
