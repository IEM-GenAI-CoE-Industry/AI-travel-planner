import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Calendar, Users, DollarSign, Sun, Plus, Vote } from 'lucide-react';
import { Button } from '../common/Button';

export const ItineraryHeader = ({ itinerary, onAddClick }) => {
  const { setActiveTab } = useApp();

  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl ambient-shadow border border-outline-variant/30 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold uppercase tracking-wider">
              {itinerary.destination}
            </span>
            <span className="text-xs text-outline font-medium flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-500" /> {itinerary.weather?.temp} ({itinerary.weather?.condition})
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight mb-2">
            {itinerary.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-secondary" /> {itinerary.startDate} – {itinerary.endDate}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-secondary" /> {itinerary.destination}
            </span>
            <div className="flex items-center gap-1.5 pl-2 border-l border-outline-variant/40">
              <span className="text-outline">Companions:</span>
              <div className="flex -space-x-1.5">
                {itinerary.travelers?.map((t, idx) => (
                  <img
                    key={idx}
                    src={t.avatar}
                    alt={t.name}
                    title={t.name}
                    className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-xs"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Budget Radar and Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 text-xs">
            <div className="flex items-center justify-between gap-4 mb-1">
              <span className="text-outline font-semibold uppercase text-[10px]">Spend Radar</span>
              <span className="font-bold text-primary">₹{itinerary.budget?.spent?.toLocaleString()} / ₹{itinerary.budget?.totalEstimated?.toLocaleString()}</span>
            </div>
            <div className="w-48 h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-secondary to-primary rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (itinerary.budget?.spent / itinerary.budget?.totalEstimated) * 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="md"
              icon={Vote}
              onClick={() => setActiveTab('voting')}
            >
              Group Voting
            </Button>

            <Button
              variant="turquoise"
              size="md"
              icon={Plus}
              onClick={onAddClick}
            >
              Add Stop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
