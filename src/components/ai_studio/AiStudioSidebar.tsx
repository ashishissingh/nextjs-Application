import React from 'react';
import { 
  BotIcon, 
  PromptIcon, 
  KnowledgeBaseIcon, 
  ToolsIcon, 
  IdentificationIcon,
  Squares2X2Icon 
} from '../../../constants';

export type AiStudioNavId = 'dashboard' | 'bots' | 'prompts' | 'knowledgeBase' | 'tools' | 'moduleKits';

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
  { id: 'moduleKits', label: 'Module Kits', icon: IdentificationIcon },
] as const;


const AiStudioSidebar: React.FC<AiStudioSidebarProps> = ({ activeNav, setActiveNav }) => {

  return (
    <div className="w-60 min-w-[15rem] bg-slate-50 shadow-lg flex flex-col flex-shrink-0 p-4 space-y-3 border-r border-slate-200">
      
      <div className="py-4 px-2 mb-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
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
                  onClick={() => setActiveNav(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out group focus:outline-none focus:ring-2 focus:ring-purple-400
                    ${isActive 
                      ? 'bg-purple-600 text-white shadow-sm' 
                      : 'text-slate-700 hover:bg-purple-100/70 hover:text-purple-700'
                    }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-purple-600'}`} />
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
  );
};

export default AiStudioSidebar;