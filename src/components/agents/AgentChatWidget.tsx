
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Paperclip, Send, Loader2, MessageSquareText, Sparkles } from 'lucide-react';
import { ChatMessage } from '@/components/chatbot/ChatMessage';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function AgentChatWidget({ agentName }: { agentName: string }) {
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
  
  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        text: `Hello! I am the ${agentName}. How can I assist you?`,
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
  }, [agentName]);


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
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Simulate an AI response for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: `As the ${agentName}, I am processing your request: "${currentInput}". (This is a mock response).`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting agent response:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get response from the agent. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-full shadow-xl flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-headline flex items-center">
          <MessageSquareText className="mr-2 h-5 w-5 text-primary" />
          Chat with Agent
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
                    <Sparkles size={18} className="text-primary" />
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
