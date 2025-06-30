export interface ChatPreview {
  lastMessage: string;
  timestamp?: number;
}

export interface ChatState {
  currentBot: Bot | null;
  messages: ChatMessage[];
  isLoading: boolean;
  chatPreviews: Record<string, ChatPreview>;
}

export interface ChatActions {
  setCurrentBot: (bot: Bot | null) => void;
  sendMessage: (text: string) => Promise<void>;
  startNewChat: () => void;
  selectChat: (bot: Bot) => void;
}

// Re-export types from main types file
export type { Bot, ChatMessage, MessageSender } from '../../../types';