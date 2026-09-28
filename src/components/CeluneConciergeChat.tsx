import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, RefreshCw, Minus } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const N8N_WEBHOOK_URL = 'https://deepika16.app.n8n.cloud/webhook/697b9a8e-cc34-48bd-978a-f1b734b920a7/chat';

export const CeluneConciergeChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    try {
      const stored = localStorage.getItem('celune_concierge_session_id');
      if (stored) return stored;
      const newId = `celune-session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('celune_concierge_session_id', newId);
      return newId;
    } catch {
      return `celune-session-${Date.now()}`;
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: 'Greetings. I am the Célune Atelier Concierge. How may I assist you with our celestial collections, constellation alignments, or custom bond creations today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputMessage.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send chat payload to n8n webhook
      // Standard n8n chat node expects { chatInput: message, sessionId } or { message, sessionId }
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          chatInput: trimmed,
          message: trimmed,
          text: trimmed,
          sessionId: sessionId,
          metadata: {
            brand: 'Célune',
            source: 'web_storefront'
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Concierge service responded with status ${response.status}`);
      }

      const data = await response.json().catch(async () => {
        const text = await response.text();
        return { output: text };
      });

      // Extract response message string gracefully from different n8n chat node return shapes
      let botResponseText = '';
      if (typeof data === 'string') {
        botResponseText = data;
      } else if (data && typeof data.output === 'string') {
        botResponseText = data.output;
      } else if (data && typeof data.response === 'string') {
        botResponseText = data.response;
      } else if (data && typeof data.text === 'string') {
        botResponseText = data.text;
      } else if (data && typeof data.message === 'string') {
        botResponseText = data.message;
      } else if (Array.isArray(data) && data.length > 0) {
        const first = data[0];
        botResponseText = first.output || first.text || first.response || JSON.stringify(first);
      } else {
        botResponseText = JSON.stringify(data);
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText || 'Thank you for consulting Célune. How else may I assist your celestial discovery?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('n8n concierge chat error:', err);
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'Our atelier connection is momentarily faint under heavy celestial transit. Please try again in a moment, or visit our Salon on Place Vendôme.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: 'The conversation has been reset. How may I assist your celestial journey?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3.5 bg-[#0D1322] border border-[#D6B27C]/50 text-[#F8F9FA] hover:text-[#D6B27C] hover:border-[#D6B27C] shadow-2xl shadow-black/80 transition-all duration-300 backdrop-blur-md cursor-pointer"
          aria-label="Open Célune Atelier Concierge"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-[#D6B27C] animate-pulse" />
          </div>
          <div className="text-left">
            <span className="block text-[9px] uppercase tracking-[0.25em] text-[#D6B27C]">Atelier Concierge</span>
            <span className="block font-serif text-sm text-[#F8F9FA] group-hover:text-[#D6B27C] transition-colors leading-tight">
              Ask Célune
            </span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_8px_#34d399]" />
        </button>
      )}

      {/* Floating Luxury Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] h-[580px] max-h-[85vh] bg-[#070B14] border border-[#D6B27C]/35 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-[#0B101E] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#D6B27C]/40 bg-[#070B14] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#D6B27C]" />
              </div>
              <div>
                <h3 className="font-serif text-base text-[#F8F9FA] font-light tracking-wide leading-tight">
                  Célune Concierge
                </h3>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#D6B27C] font-light flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Live Atelier Advisor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#94A3B8]">
              <button
                onClick={handleClearHistory}
                title="Restart conversation"
                className="p-1.5 hover:text-[#D6B27C] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Guidance Prompt Chips */}
          <div className="px-4 py-2 bg-[#080D18] border-b border-white/[0.05] flex items-center gap-2 overflow-x-auto scrollbar-none text-[10px] text-[#94A3B8]">
            <span className="text-[#64748B] uppercase tracking-wider shrink-0">Try:</span>
            {[
              'Recommend a necklace',
              'Two Skies, One Moon set',
              'What is my constellation?',
              'Order status'
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setInputMessage(chip);
                }}
                className="px-2.5 py-1 border border-white/10 hover:border-[#D6B27C]/50 hover:text-[#D6B27C] bg-[#0B101E] whitespace-nowrap transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Flow */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#070B14]/95 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 leading-relaxed font-light ${
                    msg.sender === 'user'
                      ? 'bg-[#D6B27C]/20 border border-[#D6B27C]/40 text-[#F8F9FA]'
                      : 'bg-[#0B101E] border border-white/10 text-[#CBD5E1]'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[9px] text-[#64748B] mt-1 px-1 font-mono">{msg.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-[#D6B27C] text-xs p-3 bg-[#0B101E] border border-white/10 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B27C] animate-ping" />
                <span className="font-light italic text-[11px]">Consulting the atelier archives...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#0B101E] border-t border-white/[0.08] flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about jewels, pairings, or constellations..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-[#070B14] border border-white/15 px-3 py-2.5 text-xs text-[#F8F9FA] placeholder:text-[#475569] focus:outline-none focus:border-[#D6B27C] font-light transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 bg-[#D6B27C] hover:bg-[#E5C79A] disabled:opacity-40 disabled:hover:bg-[#D6B27C] text-[#070B14] transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quiet Trust Bar */}
          <div className="px-3 py-1.5 bg-[#060910] text-[9px] text-center text-[#64748B] tracking-wider uppercase font-light">
            Powered by Célune n8n Intelligent Agent
          </div>

        </div>
      )}
    </div>
  );
};
