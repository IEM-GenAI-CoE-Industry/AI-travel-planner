import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronRight } from 'lucide-react';

export const PromptSuggestions = ({ pills }) => {
  const { sendChatMessage } = useApp();

  return (
    <div className="pt-3 border-t border-outline-variant/20 mt-3">
      <span className="text-[11px] font-semibold text-outline block mb-2">Suggested Actions:</span>
      <div className="flex flex-wrap gap-2">
        {pills.map((pill, idx) => (
          <button
            key={idx}
            onClick={() => sendChatMessage(pill)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-xs font-medium text-primary hover:bg-secondary-container hover:text-on-secondary-container transition border border-outline-variant/30 active:scale-95"
          >
            <span>{pill}</span>
            <ChevronRight className="w-3 h-3 text-secondary" />
          </button>
        ))}
      </div>
    </div>
  );
};
