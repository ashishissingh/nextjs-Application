import { ChatMessage, Bot } from '../types';
import { generateMessageId } from '../utils';
import { CHAT_CONSTANTS } from '../constants';

export class ChatApiService {
  static async sendMessage(message: string, bot: Bot): Promise<ChatMessage> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, CHAT_CONSTANTS.API.MOCK_DELAY));
    
    // Mock response - replace with actual API call
    return {
      id: generateMessageId(),
      text: `This is a mock response from ${bot.name} to: "${message}". Real AI integration is pending.`,
      sender: 'bot',
      timestamp: new Date(),
      botId: bot.id,
    };
  }
}