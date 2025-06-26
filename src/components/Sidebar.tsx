import React from 'react';
import {
  HomeIcon,
  BellIcon,
  LogoutIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon
} from '../../constants';

interface SidebarProps {
  onNavigateHome?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigateHome }) => {
  return (
    <div
      className="
        w-20 min-w-[5rem]
        bg-sidebar-bg/40 backdrop-blur-lg shadow-xl
        flex flex-col items-center justify-between py-8 flex-shrink-0
      "
      // If you use a theme toggle, ensure bg-sidebar-bg resolves via CSS variables:
      // e.g., in light mode it might be semi-transparent over a lighter background,
      // in dark mode it remains consistent.
    >
      {/* Top Icons */}
      <div className="flex flex-col items-center space-y-6">
        {/* Home button: primary */}
        <button
          onClick={onNavigateHome}
          aria-label="Home"
          className="
            p-3 rounded-xl
             shadow-md
            hover:bg-primary/90
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75
            transition-all duration-200 ease-in-out transform hover:scale-105
          "
        >
          <HomeIcon className="w-7 h-7" />
        </button>
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col items-center space-y-6">
        {/* Profile */}
        <button
          aria-label="User Profile and Settings"
          className="
            p-3 rounded-xl
            text-muted-foreground
            hover:bg-accent/10 hover:text-accent
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75
            transition-all duration-200 ease-in-out transform hover:scale-105
          "
        >
          <UserCircleIcon className="w-7 h-7" />
        </button>
        {/* Help */}
        <button
          aria-label="Help and Support"
          className="
            p-3 rounded-xl
            text-muted-foreground
            hover:bg-accent/10 hover:text-accent
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75
            transition-all duration-200 ease-in-out transform hover:scale-105
          "
        >
          <QuestionMarkCircleIcon className="w-7 h-7" />
        </button>
        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="
            p-3 rounded-xl
            text-muted-foreground
            hover:bg-accent/10 hover:text-accent
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75
            transition-all duration-200 ease-in-out transform hover:scale-105
          "
        >
          <BellIcon className="w-7 h-7" />
        </button>
        {/* Logout */}
        <button
          aria-label="Logout"
          className="
            p-3 rounded-xl
            text-muted-foreground
            hover:bg-accent/10 hover:text-accent
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75
            transition-all duration-200 ease-in-out transform hover:scale-105
          "
        >
          <LogoutIcon className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
