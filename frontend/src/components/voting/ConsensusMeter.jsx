import React from 'react';

export const ConsensusMeter = ({ score, status }) => {
  const getMeterColor = (score) => {
    if (score >= 90) return 'from-emerald-500 to-teal-400';
    if (score >= 70) return 'from-secondary to-secondary-fixed-dim';
    return 'from-amber-500 to-amber-300';
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
        <span className="text-primary flex items-center gap-1">
          Group Consensus
        </span>
        <span className="text-secondary">{score}% Agreed</span>
      </div>
      <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden p-0.5 border border-outline-variant/20">
        <div 
          className={`h-full bg-linear-to-r ${getMeterColor(score)} rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};
