import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Calendar, DollarSign, Users, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const TripCardPreview = ({ trip }) => {
  const { setActiveTab, setItinerary } = useApp();

  const handleOpenItinerary = () => {
    setItinerary(trip);
    setActiveTab('itinerary');
  };

  return (
    <div className="my-4 bg-linear-to-br from-surface-container-lowest to-surface-container-low rounded-2xl p-4 border border-secondary/30 shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-outline-variant/30">
        <div>
          <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">AI Generated Itinerary</span>
          <h4 className="font-bold text-primary text-base">{trip.title}</h4>
        </div>
        <Button
          variant="turquoise"
          size="sm"
          onClick={handleOpenItinerary}
          icon={ArrowRight}
        >
          View Full Itinerary
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <MapPin className="w-4 h-4 text-secondary shrink-0" />
          <span>{trip.destination}</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Calendar className="w-4 h-4 text-primary shrink-0" />
          <span>{trip.startDate} - {trip.endDate}</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Est. ₹{trip.budget?.totalEstimated || 65000}</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Users className="w-4 h-4 text-primary shrink-0" />
          <span>{trip.travelers?.length || 4} Travelers</span>
        </div>
      </div>
    </div>
  );
};
