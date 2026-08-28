import React from 'react';
import { Clock, MapPin, ThumbsUp, DollarSign } from 'lucide-react';
import { Badge } from '../common/Badge';

export const TimelineCard = ({ activity }) => {
  const { time, category, title, location, description, cost, status, image, votes } = activity;

  return (
    <div className="relative pl-10 pb-8 group">
      {/* Vertical Connecting Timeline Line */}
      <div className="timeline-line" />
      {/* Timeline Dot */}
      <div className="timeline-dot" />

      {/* Activity Card Content */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 ambient-shadow border border-outline-variant/30 hover:border-secondary/50 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-bold text-primary bg-surface-container px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-secondary" /> {time}
            </span>
            <Badge variant="turquoise">{category}</Badge>
            {status && <Badge variant="info">{status}</Badge>}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary flex items-center gap-0.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> ₹{cost?.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded-full text-[11px] font-semibold text-on-surface-variant">
              <ThumbsUp className="w-3 h-3 text-secondary" /> {votes?.up || 0}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start">
          {image && (
            <div className="w-full md:w-36 h-28 rounded-xl overflow-hidden shrink-0">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="flex-1">
            <h4 className="font-bold text-primary text-base mb-1">{title}</h4>
            <p className="text-xs text-secondary font-medium flex items-center gap-1 mb-2">
              <MapPin className="w-3.5 h-3.5" /> {location}
            </p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
