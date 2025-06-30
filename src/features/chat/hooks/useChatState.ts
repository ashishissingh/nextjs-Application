import { useState, useEffect, useCallback } from 'react';
import { Bot, ChatMessage, ChatState, ChatPreview } from '../types';
import { ChatStorageService } from '../services/chatStorage';
import { ChatApiService } from '../services/chatApi';
import { getTruncatedMessage, createInitialMessage, generateMessageId } from '../utils';
import { CHAT_CONSTANTS } from '../constants';

export const useChatState = (bots: Bot[]) => {
  const [state, setState] = useState<ChatState>({
    currentBot: null,
    messages: [],
    isLoading: false,
    chatPreviews: {},
  });

  // Initialize current bot
  useEffect(() => {
    if (bots.length > 0 && !state.currentBot) {
      setState(prev => ({ ...prev, currentBot: bots[0] }));
    }
  }, [bots, state.currentBot]);

  // Load chat previews
  useEffect(() => {
    const previews: Record<string, ChatPreview> = {};
    bots.forEach(bot => {
      const messages = ChatStorageService.loadMessages(bot.id);
      if (messages.length > 0) {
        const lastMsg = messages[messages.length - 1];
        previews[bot.id] = {
          lastMessage: getTruncatedMessage(lastMsg.text),
          timestamp: new Date(lastMsg.timestamp).getTime()
        };
      } else {
        previews[bot.id] = { lastMessage: CHAT_CONSTANTS.MESSAGES.START_CONVERSATION };
      }
    });
    setState(prev => ({ ...prev, chatPreviews: previews }));
  }, [bots, state.currentBot?.id]);

  // Load messages for current bot
  useEffect(() => {
    if (!state.currentBot) return;

    setState(prev => ({ ...prev, isLoading: true }));
    
    const storedMessages = ChatStorageService.loadMessages(state.currentBot.id);
    if (storedMessages.length > 0) {
      setState(prev => ({ ...prev, messages: storedMessages, isLoading: false }));
    } else {
      const initialMessage = createInitialMessage(state.currentBot.name, state.currentBot.id);
      setState(prev => ({ ...prev, messages: [initialMessage], isLoading: false }));
    }
  }, [state.currentBot]);

  // Save messages when they change
  useEffect(() => {
    if (state.currentBot?.id && state.messages.length > 0) {
      ChatStorageService.saveMessages(state.currentBot.id, state.messages);
      ChatStorageService.saveLastActiveBot(state.currentBot.id);
      
      const lastMsg = state.messages[state.messages.length - 1];
      setState(prev => ({
        ...prev,
        chatPreviews: {
          ...prev.chatPreviews,
          [state.currentBot!.id]: {
            lastMessage: getTruncatedMessage(lastMsg.text),
            timestamp: new Date(lastMsg.timestamp).getTime()
          }
        }
      }));
    }
  }, [state.messages, state.currentBot?.id]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !state.currentBot) return;

    const userMessage: ChatMessage = {
      id: generateMessageId(),
      text,
      sender: 'user',
      timestamp: new Date(),
      botId: state.currentBot.id,
    };

    setState(prev => ({ 
      ...prev, 
      messages: [...prev.messages, userMessage],
      isLoading: true 
    }));

    try {
      const botResponse = await ChatApiService.sendMessage(text, state.currentBot);
      setState(prev => ({ 
        ...prev, 
        messages: [...prev.messages, botResponse],
        isLoading: false 
      }));
    } catch (error) {
      console.error('Failed to send message:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state.currentBot]);

  const selectChat = useCallback((bot: Bot) => {
    if (state.currentBot?.id !== bot.id) {
      setState(prev => ({ ...prev, currentBot: bot }));
    }
  }, [state.currentBot?.id]);

  const startNewChat = useCallback(() => {
    if (!state.currentBot) return;

    ChatStorageService.clearMessages(state.currentBot.id);
    const initialMessage = createInitialMessage(state.currentBot.name, state.currentBot.id);
    
    setState(prev => ({
      ...prev,
      messages: [initialMessage],
      chatPreviews: {
        ...prev.chatPreviews,
        [state.currentBot!.id]: {
          lastMessage: getTruncatedMessage(initialMessage.text),
          timestamp: initialMessage.timestamp.getTime()
        }
      }
    }));
  }, [state.currentBot]);

  return {
    ...state,
    sendMessage,
    selectChat,
    startNewChat,
  };
};