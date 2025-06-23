import React from 'react';
import { HomeIcon, BellIcon, LogoutIcon, UserCircleIcon, QuestionMarkCircleIcon } from '../../constants';

interface SidebarProps {
  onNavigateHome?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigateHome }) => {
  return (
    <div className="w-20 min-w-[5rem] bg-white/40 backdrop-blur-lg shadow-xl flex flex-col items-center justify-between py-8 flex-shrink-0">
      {/* Top Icons */}
      <div className="flex flex-col items-center space-y-6">
        <button 
          onClick={onNavigateHome}
          aria-label="Home"
          className="p-3 rounded-xl bg-purple-600 text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <HomeIcon className="w-7 h-7" />
        </button>
      </div>
      
      {/* Bottom Icons */}
      <div className="flex flex-col items-center space-y-6">
        <button
          aria-label="User Profile and Settings"
          className="p-3 rounded-xl text-slate-600 hover:bg-slate-200/70 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <UserCircleIcon className="w-7 h-7" />
        </button>
        <button
          aria-label="Help and Support"
          className="p-3 rounded-xl text-slate-600 hover:bg-slate-200/70 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <QuestionMarkCircleIcon className="w-7 h-7" />
        </button>
        <button
          aria-label="Notifications"
          className="p-3 rounded-xl text-slate-600 hover:bg-slate-200/70 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <BellIcon className="w-7 h-7" />
        </button>
        <button
          aria-label="Logout"
          className="p-3 rounded-xl text-slate-600 hover:bg-slate-200/70 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <LogoutIcon className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;