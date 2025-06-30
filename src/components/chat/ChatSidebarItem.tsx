import React from 'react';
import { Bot } from '../../../types';
import { formatTimestamp } from '../../features/chat/utils';

interface ChatSidebarItemProps {
  bot: Bot;
  preview: {
    lastMessage: string;
    timestamp?: number;
  };
  isActive: boolean;
  onClick: () => void;
}

export const ChatSidebarItem: React.FC<ChatSidebarItemProps> = ({ bot, preview, isActive, onClick }) => {
  const BotIcon = bot.icon;


  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-150 focus:outline-none
        ${isActive ? 'bg-ai-studio-bg' : 'hover:bg-gray-100'}
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {BotIcon && (
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-ai-chat-sidebar-icon-bg mr-3 shrink-0">
          <BotIcon className="w-6 h-6 text-ai-chat-sidebar-icon-color" />
        </div>
      )}
      {!BotIcon && <div className="w-10 h-10 rounded-full bg-ai-chat-sidebar-icon-bg mr-3 shrink-0"></div>}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
            <h3 className={`text-sm font-semibold truncate ${isActive ? 'text-ai-chat-orange-primary' : 'text-ai-studio-text-primary'}`}>
            {bot.name}
            </h3>
            {preview.timestamp && (
                <span className={`text-xs ml-2 shrink-0 ${isActive ? 'text-ai-chat-orange-primary/80' : 'text-ai-studio-text-secondary'}`}>
                    {formatTimestamp(preview.timestamp)}
                </span>
            )}
        </div>
        <p className={`text-xs truncate ${isActive ? 'text-ai-studio-text-secondary' : 'text-ai-studio-text-secondary/90'}`}>
          {preview.lastMessage}
        </p>
      </div>
    </button>
  );
};