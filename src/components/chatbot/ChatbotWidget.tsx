
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Paperclip, Send, Loader2, MessageSquareDashed, Bot } from 'lucide-react';
import { ChatMessage, ChatMessageProps } from './ChatMessage';
import { chatbotContextualAwareness, ChatbotContextualAwarenessInput } from '@/ai/flows/chatbot-contextual-awareness';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatbotWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);
  
  // Initial greeting message from bot
  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        text: "Hello! I'm your Axcess Utils assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
  }, []);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create context from previous messages
      const previousInteractions = messages
        .slice(-5) // Use last 5 messages for context
        .map(msg => `${msg.sender === 'user' ? 'User' : 'Bot'}: ${msg.text}`)
        .join('\n');

      const contextualAwarenessInput: ChatbotContextualAwarenessInput = {
        query: userMessage.text,
        previousInteractions: previousInteractions || undefined,
      };
      
      const aiResponse = await chatbotContextualAwareness(contextualAwarenessInput);

      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: aiResponse.response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get response from chatbot. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl flex flex-col h-[70vh] min-h-[400px]">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-headline flex items-center">
          <MessageSquareDashed className="mr-2 h-5 w-5 text-primary" />
          Axcess Chatbot
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          {messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
           {isLoading && (
             <div className="flex justify-start items-start gap-3 mb-4 animate-pulse">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot size={18} className="text-primary" />
                </div>
                <div className="max-w-[70%] rounded-xl px-4 py-3 shadow-md bg-card border rounded-bl-none">
                    <div className="h-4 w-20 bg-muted rounded"></div>
                </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <Button variant="ghost" size="icon" type="button" aria-label="Attach file" disabled>
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
            aria-label="Chat input"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Send message">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
