import { ChatMessage } from '../types';
import { CHAT_CONSTANTS } from '../constants';

export const getTruncatedMessage = (text: string, maxLength = CHAT_CONSTANTS.MAX_MESSAGE_LENGTH): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const formatTimestamp = (timestamp?: number): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1 && date.getDate() === now.getDate()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays <= 1) {
    return 'Yesterday';
  } else if (diffDays <= 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
  }
};

export const generateMessageId = (): string => crypto.randomUUID();

export const createInitialMessage = (botName: string, botId: string): ChatMessage => ({
  id: generateMessageId(),
  text: `Hello! You are now chatting with ${botName}. How can I help you today?`,
  sender: 'bot',
  timestamp: new Date(),
  botId,
});