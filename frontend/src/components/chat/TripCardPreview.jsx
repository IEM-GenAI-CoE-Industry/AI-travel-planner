import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Calendar, Users, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const TripCardPreview = ({ trip }) => {
  const { setActiveTab, setItinerary } = useApp();

  const handleOpenItinerary = () => {
    setItinerary(trip);
    setActiveTab('itinerary');
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-4 border border-secondary/40 ambient-shadow space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Generated Itinerary Preview</span>
          <h4 className="text-sm font-bold text-primary">{trip.title}</h4>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-md border border-emerald-200">
          Ready
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant">
        <div className="flex items-center gap-1.5 bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/20">
          <MapPin className="w-3.5 h-3.5 text-secondary" />
          <span className="truncate">{trip.destination}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/20">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>{trip.startDate}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/20">
          <Users className="w-3.5 h-3.5 text-primary" />
          <span>{trip.travelers?.length || 4} Companions</span>
        </div>
        <div className="flex items-center gap-1.5 bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/20">
          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          <span>₹{trip.budget?.totalEstimated?.toLocaleString()}</span>
        </div>
      </div>

      <Button
        variant="turquoise"
        size="sm"
        className="w-full justify-between"
        onClick={handleOpenItinerary}
      >
        <span>Open Interactive Itinerary & Route Map</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
