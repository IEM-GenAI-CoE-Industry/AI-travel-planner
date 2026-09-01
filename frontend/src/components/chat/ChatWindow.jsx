import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from './ChatMessage';
import { Send, Sparkles, Loader2, Compass, MapPin, Users, DollarSign, Calendar, Tag } from 'lucide-react';

export const ChatWindow = () => {
  const { chatMessages, sendChatMessage, travelerProfile, loading } = useApp();
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
    const textToSend = input.trim();
    setInput('');
    sendChatMessage(textToSend);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
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
      <div className="bg-surface-container-lowest p-4 rounded-2xl ambient-shadow border border-outline-variant/30 mb-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-primary to-secondary text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-secondary-fixed-dim" />
          </div>
          <div>
            <h2 className="font-bold text-primary text-base">Venture AI Concierge</h2>
            <p className="text-xs text-on-surface-variant">Active Agent • Local Travel Intelligence & State Sync</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">Active Agent Online</span>
        </div>
      </div>

      {/* Real-time Extracted Preference Radar */}
      {travelerProfile && (
        <div className="bg-surface-container-low p-3 rounded-2xl border border-secondary/30 mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-secondary uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-secondary" /> Extracted Profile:
          </span>

          {travelerProfile.destination && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary font-semibold border border-outline-variant/30 shadow-xs">
              <MapPin className="w-3 h-3 text-secondary" /> {travelerProfile.destination}
            </span>
          )}

          {travelerProfile.duration_days && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary font-semibold border border-outline-variant/30 shadow-xs">
              <Calendar className="w-3 h-3 text-primary" /> {travelerProfile.duration_days} Days
            </span>
          )}

          {travelerProfile.group_size && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary font-semibold border border-outline-variant/30 shadow-xs">
              <Users className="w-3 h-3 text-primary" /> {travelerProfile.group_size} Travelers
            </span>
          )}

          {travelerProfile.budget_inr && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-lowest text-emerald-700 font-bold border border-emerald-200 shadow-xs">
              <DollarSign className="w-3 h-3 text-emerald-600" /> ₹{travelerProfile.budget_inr.toLocaleString()}
            </span>
          )}

          {travelerProfile.interests && travelerProfile.interests.length > 0 && (
            <div className="flex items-center gap-1">
              {travelerProfile.interests.slice(0, 3).map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary-container/80 text-[10px] font-semibold text-on-secondary-container">
                  <Tag className="w-2.5 h-2.5" /> {item.replace('_', ' ')}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-2 mb-3 space-y-4">
        {chatMessages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-secondary p-4 bg-surface-container-lowest rounded-2xl max-w-sm ambient-shadow border border-outline-variant/20">
            <Loader2 className="w-5 h-5 animate-spin text-secondary" />
            <span className="text-xs font-semibold text-primary">Venture Concierge is extracting preferences & planning...</span>
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
            type="button"
            onClick={() => sendChatMessage(prompt)}
            className="whitespace-nowrap px-3 py-1 bg-surface-container hover:bg-surface-container-high text-xs text-on-surface-variant hover:text-primary rounded-full transition border border-outline-variant/30 active:scale-95 cursor-pointer"
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
            onKeyDown={handleKeyDown}
            placeholder="Type your travel request (e.g. 'Plan 6 days in Udaipur for 4 people with ₹70,000 budget')..."
            className="flex-1 bg-transparent px-4 py-3 text-sm text-on-surface placeholder:text-outline outline-none"
            autoFocus
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-container disabled:opacity-50 transition shadow-sm active:scale-95 shrink-0 cursor-pointer"
          >
            <Send className="w-5 h-5 text-secondary-fixed-dim" />
          </button>
        </div>
      </form>
    </div>
  );
};
