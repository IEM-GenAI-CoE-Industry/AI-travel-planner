import React from 'react';
import { Sparkles, User } from 'lucide-react';
import { PromptSuggestions } from './PromptSuggestions';
import { TripCardPreview } from './TripCardPreview';

export const ChatMessage = ({ message }) => {
  const { isAi, sender, timestamp, text, suggestedPills, generatedTrip } = message;

  if (!isAi) {
    return (
      <div className="flex justify-end mb-6">
        <div className="flex items-start gap-3 max-w-xl">
          <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-xs shadow-sm">
            <p className="text-sm leading-relaxed">{text}</p>
            <span className="text-[10px] text-on-primary-container block text-right mt-1.5 opacity-80">{timestamp}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center shrink-0 text-xs font-bold">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-6">
      <div className="flex items-start gap-3 max-w-2xl">
        <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-primary to-secondary text-white flex items-center justify-center shrink-0 shadow-md">
          <Sparkles className="w-5 h-5 text-secondary-fixed-dim" />
        </div>

        <div className="bg-surface-container-lowest border-l-4 border-l-secondary p-5 rounded-2xl rounded-tl-xs ambient-shadow border-y border-r border-outline-variant/20 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-xs text-primary uppercase tracking-wider">{sender}</span>
            <span className="text-[10px] text-outline">{timestamp}</span>
          </div>

          <p className="text-sm text-on-surface leading-relaxed mb-4">{text}</p>

          {/* Generated Trip Card Preview if present */}
          {generatedTrip && (
            <TripCardPreview trip={generatedTrip} />
          )}

          {/* Suggested Pills */}
          {suggestedPills && suggestedPills.length > 0 && (
            <PromptSuggestions pills={suggestedPills} />
          )}
        </div>
      </div>
    </div>
  );
};
