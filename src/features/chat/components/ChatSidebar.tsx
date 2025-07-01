import React from 'react';
import { Bot, ChatPreview } from '../types';
import { ChatSidebarItem } from '../../../components/chat/ChatSidebarItem';
import { CHAT_CONSTANTS } from '../constants';

interface ChatSidebarProps {
  bots: Bot[];
  chatPreviews: Record<string, ChatPreview>;
  currentBotId?: string;
  onSelectChat: (bot: Bot) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  bots,
  chatPreviews,
  currentBotId,
  onSelectChat,
}) => {
  return (
    <div className="w-80 flex-shrink-0 border-r border-sidebar-border bg-background overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
      </div>
      <div className="p-2 space-y-1">
        {bots.map((bot) => (
          <ChatSidebarItem
            key={bot.id}
            bot={bot}
            preview={chatPreviews[bot.id] || { lastMessage: CHAT_CONSTANTS.MESSAGES.NO_ACTIVITY }}
            isActive={bot.id === currentBotId}
            onClick={() => onSelectChat(bot)}
          />
        ))}
      </div>
    </div>
  );
};