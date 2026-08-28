import React from 'react';
import { Calendar } from 'lucide-react';

export const DaySelector = ({ days, activeDay, onSelectDay }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar border-b border-outline-variant/20">
      {days?.map((day) => {
        const isActive = activeDay === day.dayNumber;
        return (
          <button
            key={day.dayNumber}
            onClick={() => onSelectDay(day.dayNumber)}
            className={`flex flex-col items-start px-5 py-3 rounded-2xl transition-all duration-200 min-w-35 text-left border ${
              isActive
                ? 'bg-primary text-white border-primary shadow-md'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border-outline-variant/30'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-0.5">
              <Calendar className={`w-3.5 h-3.5 ${isActive ? 'text-secondary-fixed-dim' : 'text-secondary'}`} />
              <span>Day {day.dayNumber}</span>
            </div>
            <span className={`text-sm font-extrabold truncate w-full ${isActive ? 'text-white' : 'text-primary'}`}>
              {day.title}
            </span>
            <span className={`text-[10px] mt-0.5 ${isActive ? 'text-on-primary-container' : 'text-outline'}`}>
              {day.date}
            </span>
          </button>
        );
      })}
    </div>
  );
};
