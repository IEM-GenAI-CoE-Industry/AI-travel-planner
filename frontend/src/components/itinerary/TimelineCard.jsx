import React from 'react';
import { Clock, MapPin, DollarSign, ThumbsUp, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

export const TimelineCard = ({ activity }) => {
  const categoryStyles = {
    STAY: "bg-blue-50 text-blue-700 border-blue-200",
    DINING: "bg-amber-50 text-amber-700 border-amber-200",
    CULTURE: "bg-purple-50 text-purple-700 border-purple-200",
    EXCURSION: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ACTIVITY: "bg-teal-50 text-teal-700 border-teal-200",
  };

  return (
    <div className="relative pl-8 pb-8 group last:pb-0">
      {/* Timeline vertical connector */}
      <div className="timeline-line group-last:hidden" />
      
      {/* Timeline Dot */}
      <div className="timeline-dot shadow-xs" />

      {/* Card Body */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl ambient-shadow border border-outline-variant/30 hover:border-secondary/50 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                categoryStyles[activity.category] || "bg-surface-container text-primary"
              }`}>
                {activity.category}
              </span>
              
              <span className="text-xs font-semibold text-outline flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {activity.time}
              </span>

              {activity.status && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-secondary-container/60 text-on-secondary-container">
                  {activity.status}
                </span>
              )}
            </div>

            <h4 className="text-base font-bold text-primary mb-1">{activity.title}</h4>

            <p className="text-xs text-secondary font-medium flex items-center gap-1 mb-2">
              <MapPin className="w-3.5 h-3.5" /> {activity.location}
            </p>

            <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
              {activity.description}
            </p>

            <div className="flex items-center gap-4 text-xs">
              <span className="font-bold text-primary flex items-center">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> ₹{activity.cost?.toLocaleString()}
              </span>

              {activity.votes && (
                <span className="text-outline flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5 text-secondary" /> {activity.votes.up} votes
                </span>
              )}
            </div>
          </div>

          {/* Activity Image */}
          {activity.image && (
            <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0 shadow-xs">
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
