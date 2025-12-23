'use client';

import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useUIStore } from '@/store/ui-store';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  '📊 Analyze my productivity trends',
  '✅ Show my overdue tasks',
  '🎯 Help me prioritize today',
  '📝 Draft a team update',
  '🔍 Find documents about...',
  '📅 What\'s on my calendar?',
];

export function CopilotPanel() {
  const { copilotOpen, setCopilotOpen } = useUIStore();
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Hi! I\'m your Quantum Forge AI assistant. I can help you manage tasks, analyze data, draft content, and more. What would you like to work on?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = React.useState('');
  const [isThinking, setIsThinking] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I understand you\'d like help with that. This is a demo response - AI integration coming soon! In production, I\'ll connect to your choice of AI provider (OpenAI, Anthropic, Azure OpenAI, etc.) to provide intelligent assistance.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const handleSuggestion = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <Dialog.Root open={copilotOpen} onOpenChange={setCopilotOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content 
          className="fixed top-0 right-0 h-full w-full max-w-2xl bg-background border-l border-border z-50 animate-in slide-in-from-right duration-300 flex flex-col"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-ai-glow flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="heading-2">Quantum Copilot</h2>
                <p className="caption text-muted-foreground">Your AI-powered work assistant</p>
              </div>
            </div>
            <Dialog.Close asChild>
              <button className="p-2 rounded-lg hover:bg-accent/10 transition-colors" aria-label="Close Copilot">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role !== 'user' && (
                  <div className="w-8 h-8 rounded-full gradient-ai-glow flex-shrink-0 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-[20px] px-4 py-3',
                    message.role === 'user' && 'bg-primary text-primary-foreground ml-auto',
                    message.role === 'system' && 'bg-accent/10 border border-accent/20',
                    message.role === 'assistant' && 'glass-panel'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="caption text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-medium text-sm">
                    U
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                <div className="w-8 h-8 rounded-full gradient-ai-glow flex-shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="glass-panel rounded-[20px] px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-primary animate-bounce animate-delay-0"></div>
                    <div className="w-2 h-2 rounded-full bg-accent-primary animate-bounce animate-delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-accent-primary animate-bounce animate-delay-300"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions (show only if no messages yet or system welcome message) */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4">
              <p className="caption text-muted-foreground mb-3">Try asking about:</p>
              <div className="grid grid-cols-2 gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSuggestion(prompt)}
                    className="text-left px-3 py-2 text-sm rounded-lg glass-panel hover:bg-accent/10 transition-colors animate-smooth"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-6 border-t border-border">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask Copilot anything..."
                className="flex-1 px-4 py-3 rounded-lg glass-panel border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isThinking}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors animate-smooth font-medium"
              >
                Send
              </button>
            </div>
            <p className="caption text-muted-foreground mt-2">
              Copilot can make mistakes. Verify important information.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Floating Action Button
export function CopilotFAB() {
  const { toggleCopilot } = useUIStore();

  return (
    <button
      onClick={toggleCopilot}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-ai-glow shadow-elevation-high hover:scale-110 transition-transform animate-smooth z-40 flex items-center justify-center group"
      aria-label="Open Copilot"
    >
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-success animate-pulse"></span>
    </button>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
