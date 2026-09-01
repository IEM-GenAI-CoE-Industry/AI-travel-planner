import React from 'react';
import { Users, ThumbsUp, MessageSquare } from 'lucide-react';

export const CompanionActivityFeed = ({ feed }) => {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl ambient-shadow border border-outline-variant/30">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-secondary" />
        <h3 className="font-bold text-primary text-base">Companion Activity</h3>
      </div>

      <div className="space-y-4">
        {feed?.map((item) => (
          <div key={item.id} className="flex gap-3 text-xs pb-4 border-b border-outline-variant/20 last:border-none last:pb-0">
            <img
              src={item.avatar}
              alt={item.user}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-outline-variant/30 shadow-xs"
            />
            
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-primary">{item.user}</span>
                <span className="text-[10px] text-outline">{item.time}</span>
              </div>

              <p className="text-on-surface-variant text-[11px] mt-0.5">
                <span className="font-semibold text-secondary">{item.action}</span> <span className="font-medium text-primary">{item.target}</span>
              </p>

              {item.comment && (
                <div className="mt-2 bg-surface-container-low p-2 rounded-xl text-on-surface-variant text-[11px] italic border border-outline-variant/20">
                  "{item.comment}"
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
