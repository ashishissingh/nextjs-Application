import React, { useState } from 'react';
// Reusing SearchIcon for send, or create a specific SendIcon if preferred
import { SearchIcon as SendIcon } from '../icons/SearchIcon'; 

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-ai-studio-border bg-ai-studio-sidebar-bg shrink-0">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2.5 border border-ai-studio-border rounded-lg focus:ring-1 focus:ring-ai-chat-orange-focus focus:border-ai-chat-orange-focus text-sm shadow-sm"
          disabled={isLoading}
          aria-label="Chat message input"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="p-2.5 rounded-lg bg-ai-studio-button-action-blue text-ai-studio-text-white hover:bg-ai-studio-button-action-blue-hover disabled:opacity-50 transition-colors"
          aria-label={isLoading ? "Sending message" : "Send message"}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <SendIcon className="w-5 h-5 transform rotate-90" /> // Rotated SearchIcon as Send
          )}
        </button>
      </div>
    </form>
  );
};