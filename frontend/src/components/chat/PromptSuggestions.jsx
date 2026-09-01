import React from 'react';
import { Compass } from 'lucide-react';

export const PromptSuggestions = ({ suggestions, onSelect }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      <span className="text-[11px] font-semibold text-outline whitespace-nowrap flex items-center gap-1">
        <Compass className="w-3.5 h-3.5" /> Suggestions:
      </span>
      {suggestions.map((s, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(s)}
          className="whitespace-nowrap px-3 py-1 bg-surface-container hover:bg-surface-container-high text-xs text-on-surface-variant hover:text-primary rounded-full transition border border-outline-variant/30 active:scale-95"
        >
          {s}
        </button>
      ))}
    </div>
  );
};
