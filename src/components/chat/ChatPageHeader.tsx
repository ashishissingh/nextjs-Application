
import React from 'react';
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon';
import { RefreshIcon } from '../icons/RefreshIcon';
import { Button } from '@/components/ui/button'; 

interface ChatPageHeaderProps {
  botName: string;
  onBack: () => void;
  onStartNewChat: () => void; 
}

export const ChatPageHeader: React.FC<ChatPageHeaderProps> = ({ botName, onBack, onStartNewChat }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-ai-studio-border bg-ai-studio-sidebar-bg sticky top-0 z-10 shrink-0 h-16">
      <Button
        onClick={onBack}
        variant="ghost"
        size="sm"
        className="hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
        aria-label="Back to bots list"
      >
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        <span className="text-sm font-medium">Back to Bots</span>
      </Button>
      <h1 className="text-lg font-semibold text-ai-studio-text-primary text-center flex-1 truncate px-2" title={`Chat with ${botName}`}>
        Chat with {botName}
      </h1>
      <div className="flex items-center space-x-2">
        <Button
          onClick={onStartNewChat}
          variant="outline"
          size="sm"
          className="hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
          aria-label="Start new chat with current bot"
          title="Start new chat with current bot"
        >
          New Chat
        </Button>
        <Button
          onClick={onStartNewChat}
          variant="outline"
          size="sm"
          className="hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
          aria-label="Refresh and start new chat"
          title="Refresh and start new chat"
        >
          <RefreshIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
