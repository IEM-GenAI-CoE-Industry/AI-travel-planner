import React from 'react';
import { MessageSquare } from 'lucide-react';

export const CompanionActivityFeed = ({ feed }) => {
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 ambient-shadow border border-outline-variant/30">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/20">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-secondary" />
          <h3 className="font-bold text-primary text-base">Companion Voting Feed</h3>
        </div>
        <span className="text-xs text-outline font-medium">Real-time Group Sync</span>
      </div>

      <div className="space-y-4">
        {feed?.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
            <img 
              src={item.avatar} 
              alt={item.user}
              className="w-8 h-8 rounded-full object-cover border border-white shrink-0"
            />
            <div className="flex-1 text-xs">
              <p className="text-on-surface">
                <span className="font-bold text-primary">{item.user}</span>{' '}
                <span className="text-secondary font-medium">{item.action}</span>{' '}
                <span className="font-semibold text-primary">{item.target}</span>
              </p>
              {item.comment && (
                <p className="text-on-surface-variant bg-surface-container-lowest p-2 rounded-xl mt-1.5 border border-outline-variant/10 text-[11px] italic">
                  "{item.comment}"
                </p>
              )}
              <span className="text-[10px] text-outline mt-1 block">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
