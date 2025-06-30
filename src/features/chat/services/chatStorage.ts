import { ChatMessage } from '../types';
import { CHAT_CONSTANTS } from '../constants';

export class ChatStorageService {
  private static getStorageKey(botId: string): string {
    return `${CHAT_CONSTANTS.STORAGE_KEYS.CHAT_MESSAGES}${botId}`;
  }

  static saveMessages(botId: string, messages: ChatMessage[]): void {
    try {
      localStorage.setItem(this.getStorageKey(botId), JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save messages:', error);
    }
  }

  static loadMessages(botId: string): ChatMessage[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey(botId));
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    } catch (error) {
      console.error('Failed to load messages:', error);
      return [];
    }
  }

  static clearMessages(botId: string): void {
    try {
      localStorage.removeItem(this.getStorageKey(botId));
    } catch (error) {
      console.error('Failed to clear messages:', error);
    }
  }

  static saveLastActiveBot(botId: string): void {
    try {
      localStorage.setItem(CHAT_CONSTANTS.STORAGE_KEYS.LAST_ACTIVE_BOT, botId);
    } catch (error) {
      console.error('Failed to save last active bot:', error);
    }
  }

  static getLastActiveBot(): string | null {
    try {
      return localStorage.getItem(CHAT_CONSTANTS.STORAGE_KEYS.LAST_ACTIVE_BOT);
    } catch (error) {
      console.error('Failed to get last active bot:', error);
      return null;
    }
  }
}