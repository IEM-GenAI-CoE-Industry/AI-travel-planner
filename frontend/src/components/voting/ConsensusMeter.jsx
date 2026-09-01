import React from 'react';

export const ConsensusMeter = ({ score, status }) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">100% Locked In</span>;
      case 'TOP_PICK':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">Top Pick</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Voting In Progress</span>;
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-outline font-semibold">Group Consensus: <span className="text-primary font-bold">{score}%</span></span>
        {getStatusBadge()}
      </div>

      <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            score === 100 
              ? 'bg-emerald-500' 
              : score >= 75 
              ? 'bg-secondary' 
              : 'bg-amber-500'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};
