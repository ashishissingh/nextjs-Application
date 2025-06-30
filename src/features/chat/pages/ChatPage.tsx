'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { mockAgents } from '@/lib/mock-data';
import { ChatPageHeader } from '../../../components/chat/ChatPageHeader';
import { ChatSidebar, ChatArea } from '../components';
import { useChatState } from '../hooks/useChatState';

const ChatPage = () => {
  const router = useRouter();
  const {
    currentBot,
    messages,
    isLoading,
    chatPreviews,
    sendMessage,
    selectChat,
    startNewChat,
  } = useChatState(mockAgents);

  const handleBack = () => router.push('/bots');

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-background dark:from-primary/20 dark:via-accent/15 dark:to-background/90">
      <ChatPageHeader 
        botName={currentBot?.name || 'Loading...'} 
        onBack={handleBack}
        onStartNewChat={startNewChat}
      />
      <div className="flex flex-1 min-h-0">
        <ChatSidebar
          bots={mockAgents}
          chatPreviews={chatPreviews}
          currentBotId={currentBot?.id}
          onSelectChat={selectChat}
        />
        <ChatArea
          currentBot={currentBot}
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;