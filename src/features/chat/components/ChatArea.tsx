import React, { useRef, useEffect } from 'react';
import { Bot, ChatMessage } from '../types';
import { ChatMessageView } from '../../../components/chat/ChatMessageView';
import { ChatInput } from '../../../components/chat/ChatInput';
import { RobotIcon } from '@/components/icons/RobotIcon';
import { Footer } from '../../../components/shared/Footer';
import { CHAT_CONSTANTS } from '../constants';

interface ChatAreaProps {
  currentBot: Bot | null;
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  currentBot,
  messages,
  isLoading,
  onSendMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  if (!currentBot) {
    return (
      <div className="w-2/3 xl:w-9/12 flex items-center justify-center bg-ai-studio-bg">
        <p className="text-ai-studio-text-secondary">Select a bot to start chatting</p>
      </div>
    );
  }

  return (
    <div className="w-2/3 xl:w-9/12 flex flex-col bg-card/80 backdrop-blur-md min-h-0">
      <div className="p-4 border-b border-border bg-card shadow-sm shrink-0">
        <div className="flex items-center">
          {currentBot.icon && <currentBot.icon className="w-10 h-10 text-ai-chat-orange-primary mr-3 shrink-0" />}
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">{currentBot.name}</h2>
            <p className="text-xs text-muted-foreground">{currentBot.role}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{currentBot.description}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-4 md:p-6 space-y-4">
          {messages.map((msg) => (
            <ChatMessageView 
              key={msg.id} 
              message={msg} 
              botName={currentBot.name} 
              botIcon={currentBot.icon} 
            />
          ))}
          {isLoading && messages.length > 0 && messages[messages.length-1].sender === 'user' && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 bg-ai-studio-sidebar-bg p-3 rounded-lg rounded-bl-none max-w-xl border border-ai-studio-border">
                <RobotIcon className="w-5 h-5 text-ai-chat-orange-primary shrink-0 mt-0.5" />
                <span className="text-sm text-ai-studio-text-secondary italic">{CHAT_CONSTANTS.MESSAGES.BOT_THINKING}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="shrink-0">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
        <Footer />
      </div>
    </div>
  );
};