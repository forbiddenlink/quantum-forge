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
  'Analyze my productivity trends',
  'Show my overdue tasks',
  'Help me prioritize today',
  'Draft a team update',
  'Find documents about...',
  'What\'s on my calendar?',
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
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in" />
        <Dialog.Content 
          className="fixed right-0 top-0 z-50 flex size-full max-w-2xl flex-col border-l border-border bg-background duration-300 animate-in slide-in-from-right"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="gradient-ai-glow flex size-10 items-center justify-center rounded-full">
                <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="heading-2">Quantum Copilot</h2>
                <p className="caption text-muted-foreground">Your AI-powered work assistant</p>
              </div>
            </div>
            <Dialog.Close asChild>
              <button className="rounded-lg p-2 transition-colors hover:bg-accent/10" aria-label="Close Copilot">
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3 duration-300 animate-in fade-in slide-in-from-bottom-2',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role !== 'user' && (
                  <div className="gradient-ai-glow flex size-8 shrink-0 items-center justify-center rounded-full">
                    <svg className="size-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-xl px-4 py-3',
                    message.role === 'user' && 'ml-auto bg-primary text-primary-foreground',
                    message.role === 'system' && 'border border-accent/20 bg-accent/10',
                    message.role === 'assistant' && 'glass-panel'
                  )}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  <p className="caption mt-2 text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                    U
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                <div className="gradient-ai-glow flex size-8 shrink-0 items-center justify-center rounded-full">
                  <svg className="size-4 animate-pulse text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="glass-panel rounded-xl px-4 py-3">
                  <div className="flex gap-2">
                    <div className="animate-delay-0 size-2 animate-bounce rounded-full bg-accent-primary"></div>
                    <div className="animate-delay-150 size-2 animate-bounce rounded-full bg-accent-primary"></div>
                    <div className="animate-delay-300 size-2 animate-bounce rounded-full bg-accent-primary"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions (show only if no messages yet or system welcome message) */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4">
              <p className="caption mb-3 text-muted-foreground">Try asking about:</p>
              <div className="grid grid-cols-2 gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSuggestion(prompt)}
                    className="glass-panel animate-smooth rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent/10"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-6">
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
                className="glass-panel flex-1 rounded-lg border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isThinking}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="animate-smooth rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </div>
            <p className="caption mt-2 text-muted-foreground">
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
      className="gradient-ai-glow shadow-elevation-high animate-smooth group fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full transition-transform hover:scale-110"
      aria-label="Open Copilot"
    >
      <svg className="size-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <span className="absolute -right-1 -top-1 size-3 animate-pulse rounded-full bg-accent-success"></span>
    </button>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
