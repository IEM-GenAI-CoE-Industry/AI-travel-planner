import React from 'react';
import { Calendar } from 'lucide-react';

export const DaySelector = ({ days, activeDay, onSelectDay }) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6 no-scrollbar">
      {days?.map((day) => {
        const isActive = activeDay === day.dayNumber;
        return (
          <button
            key={day.dayNumber}
            onClick={() => onSelectDay(day.dayNumber)}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-200 shrink-0 text-left ${
              isActive
                ? 'bg-primary text-white shadow-md scale-105'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-outline-variant/30'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
              isActive ? 'bg-secondary-fixed-dim text-primary' : 'bg-surface-container-high text-primary'
            }`}>
              {day.dayNumber}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold">Day {day.dayNumber}</span>
                <span className={`text-[10px] ${isActive ? 'text-secondary-fixed-dim' : 'text-outline'}`}>
                  • {day.activities?.length || 0} stops
                </span>
              </div>
              <p className={`text-[11px] truncate max-w-35 ${isActive ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                {day.date}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
