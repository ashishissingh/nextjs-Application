export const CHAT_CONSTANTS = {
  MAX_MESSAGE_LENGTH: 30,
  STORAGE_KEYS: {
    CHAT_MESSAGES: 'chatMessages_',
    LAST_ACTIVE_BOT: 'lastActiveBotId',
  },
  MESSAGES: {
    NO_ACTIVITY: 'No activity yet.',
    START_CONVERSATION: 'Start a conversation!',
    ERROR_LOADING: 'Error loading preview',
    NO_MESSAGES: 'No messages yet',
    BOT_THINKING: 'Bot is thinking...',
  },
  API: {
    MOCK_DELAY: 1000,
  },
} as const;