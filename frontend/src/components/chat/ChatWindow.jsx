import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from './ChatMessage';
import { Send, Sparkles, Loader2, Compass } from 'lucide-react';

export const ChatWindow = () => {
  const { chatMessages, sendChatMessage, loading } = useApp();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendChatMessage(input);
    setInput('');
  };

  const quickPrompts = [
    "Plan 6 days in Udaipur palace stays under ₹65,000",
    "Show me luxury backwater houseboats in Kerala",
    "Add a private Shikara boat sunset cruise on Day 2",
    "Suggest top heritage boutique stays in South Goa"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-container-max mx-auto px-4 md:px-margin-desktop py-6">
      {/* Header Info */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl ambient-shadow border border-outline-variant/30 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-primary to-secondary text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-secondary-fixed-dim" />
          </div>
          <div>
            <h2 className="font-bold text-primary text-base">Venture AI Concierge (FastAPI Backend)</h2>
            <p className="text-xs text-on-surface-variant">Active Agent • Local Travel Intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">Online & Ready</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-4">
        {chatMessages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-secondary p-4 bg-surface-container-lowest rounded-2xl max-w-sm ambient-shadow border border-outline-variant/20">
            <Loader2 className="w-5 h-5 animate-spin text-secondary" />
            <span className="text-xs font-semibold text-primary">Venture Concierge is crafting domestic travel plans...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 no-scrollbar">
        <span className="text-[11px] font-semibold text-outline whitespace-nowrap flex items-center gap-1">
          <Compass className="w-3.5 h-3.5" /> Domestic Prompts:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => sendChatMessage(prompt)}
            className="whitespace-nowrap px-3 py-1 bg-surface-container hover:bg-surface-container-high text-xs text-on-surface-variant hover:text-primary rounded-full transition border border-outline-variant/30 active:scale-95"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSubmit} className="relative glass-panel p-2 rounded-2xl ambient-shadow border border-white/80">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your travel request (e.g. 'Add a tea garden tour in Munnar on Day 3')..."
            className="flex-1 bg-transparent px-4 py-3 text-sm text-on-surface placeholder:text-outline outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-container disabled:opacity-50 transition shadow-sm active:scale-95 shrink-0"
          >
            <Send className="w-5 h-5 text-secondary-fixed-dim" />
          </button>
        </div>
      </form>
    </div>
  );
};
