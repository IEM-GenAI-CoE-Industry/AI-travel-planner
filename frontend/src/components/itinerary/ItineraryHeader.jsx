import React from 'react';
import { MapPin, Calendar, DollarSign, CloudSun, Share2, Download, Plus } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const ItineraryHeader = ({ itinerary, onAddClick }) => {
  if (!itinerary) return null;

  const { title, destination, startDate, endDate, travelers, budget, weather } = itinerary;
  const budgetPercentage = Math.round((budget.spent / budget.totalEstimated) * 100);

  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl ambient-shadow border border-outline-variant/30 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-outline-variant/20">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="turquoise">Confirmed Itinerary</Badge>
            <span className="text-xs text-outline font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-secondary" /> {destination}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight">{title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-on-surface-variant mt-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-primary" /> {startDate} – {endDate}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
            <span className="flex items-center gap-1.5 font-medium">
              <CloudSun className="w-4 h-4 text-amber-500" /> {weather?.temp || "26°C"} • {weather?.condition || "Sunny"}
            </span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={Share2}>
            Share Trip
          </Button>
          <Button variant="outline" size="sm" icon={Download}>
            Export PDF
          </Button>
          <Button variant="primary" size="sm" onClick={onAddClick} icon={Plus}>
            Add Stop
          </Button>
        </div>
      </div>

      {/* Stats & Travelers Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 items-center">
        {/* Travelers avatars */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {travelers?.map((t, idx) => (
              <img
                key={idx}
                src={t.avatar}
                alt={t.name}
                title={`${t.name} (${t.role})`}
                className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-xs"
              />
            ))}
          </div>
          <div>
            <span className="text-xs font-bold text-primary block">{travelers?.length || 4} Travelers</span>
            <span className="text-[10px] text-outline">Group synced</span>
          </div>
        </div>

        {/* Budget Meter */}
        <div className="bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/20">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-primary flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-emerald-600" /> Spend Radar
            </span>
            <span className="font-semibold text-primary">₹{budget?.spent?.toLocaleString()} / ₹{budget?.totalEstimated?.toLocaleString()}</span>
          </div>
          <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-secondary to-primary rounded-full transition-all duration-500"
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-outline mt-1 block text-right">{budgetPercentage}% of allocated budget</span>
        </div>

        {/* Weather Radar */}
        <div className="flex items-center gap-3 bg-linear-to-r from-secondary-container/40 to-surface-container p-3.5 rounded-2xl border border-secondary/20">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-500 shadow-xs">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">Weather Forecast</span>
            <p className="text-xs font-bold text-primary">{weather?.temp || "26°C"} • {weather?.condition || "Sunny"}</p>
            <span className="text-[10px] text-on-surface-variant">Ideal sightseeing conditions</span>
          </div>
        </div>
      </div>
    </div>
  );
};
