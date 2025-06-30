

import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types';
import { UserOutlineIcon } from '../icons/UserOutlineIcon'; // Default user icon
import { RobotIcon } from '@/components/icons/RobotIcon'; // Specific RobotIcon for bot messages - Updated import path

interface ChatMessageViewProps {
  message: ChatMessageType;
  botName: string;
  botIcon?: React.ElementType; // This prop can still be accepted but won't be used for the message icon itself
}

export const ChatMessageView: React.FC<ChatMessageViewProps> = ({ message, botName, botIcon }) => {
  const isUser = message.sender === 'user';
  // For bot messages, always use RobotIcon. User messages use UserOutlineIcon.
  const IconToRender = isUser ? UserOutlineIcon : RobotIcon;

  if (isUser) {
    // User message rendering
    return (
      <div className="flex justify-end">
        <div className={`flex items-start space-x-2 flex-row-reverse space-x-reverse max-w-xl`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 bg-ai-chat-orange-primary`}>
            <IconToRender className={`w-5 h-5 text-white`} />
          </div>
          <div
            className={`px-4 py-3 rounded-lg shadow-sm text-sm bg-ai-studio-button-action-blue text-ai-studio-text-white rounded-br-none`}
          >
            <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{message.text}</p>
          </div>
        </div>
      </div>
    );
  } else {
    // Bot message rendering with RobotIcon INSIDE the bubble
    return (
      <div className="flex justify-start">
        <div
          className={`px-4 py-3 rounded-lg shadow-sm text-sm bg-ai-studio-sidebar-bg text-ai-studio-text-primary border border-ai-studio-border rounded-bl-none max-w-xl flex items-start space-x-2`}
        >
          <div className="shrink-0 mt-0.5"> {/* Icon container within the bubble */}
            <IconToRender className="w-5 h-5 text-ai-chat-orange-primary" />
          </div>
          <p className="flex-1" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', minWidth: 0 }}>{message.text}</p>
        </div>
      </div>
    );
  }
};