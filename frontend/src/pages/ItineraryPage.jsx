import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ItineraryHeader } from '../components/itinerary/ItineraryHeader';
import { DaySelector } from '../components/itinerary/DaySelector';
import { TimelineCard } from '../components/itinerary/TimelineCard';
import { MapView } from '../components/itinerary/MapView';
import { Plus, X, MapPin } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ItineraryPage = () => {
  const { itinerary, addActivity } = useApp();
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStop, setNewStop] = useState({
    title: '',
    location: '',
    category: 'ACTIVITY',
    time: '04:00 PM',
    cost: '2500',
    description: ''
  });

  if (!itinerary) {
    return (
      <div className="max-w-container-max mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">No Active Itinerary Loaded</h2>
        <p className="text-sm text-on-surface-variant mb-6">Use the AI Concierge chat to generate a personalized trip schedule.</p>
      </div>
    );
  }

  const currentDay = itinerary.days?.find(d => d.dayNumber === selectedDayNumber) || itinerary.days?.[0];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newStop.title.trim()) return;
    addActivity(selectedDayNumber, newStop);
    setIsAddModalOpen(false);
    setNewStop({ title: '', location: '', category: 'ACTIVITY', time: '04:00 PM', cost: '2500', description: '' });
  };

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        {/* Itinerary Header */}
        <ItineraryHeader 
          itinerary={itinerary} 
          onAddClick={() => setIsAddModalOpen(true)} 
        />

        {/* Day Selection Tabs */}
        <DaySelector
          days={itinerary.days}
          activeDay={selectedDayNumber}
          onSelectDay={setSelectedDayNumber}
        />

        {/* Main Content Layout: Timeline (Left) & Leaflet Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Timeline Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase text-secondary tracking-wider">Day {currentDay?.dayNumber} Overview</span>
                <h3 className="text-xl font-bold text-primary">{currentDay?.title}</h3>
              </div>
              <span className="text-xs text-outline font-medium">{currentDay?.activities?.length || 0} Scheduled Stops</span>
            </div>

            <div className="space-y-2">
              {currentDay?.activities?.map((activity) => (
                <TimelineCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          {/* Leaflet Map Column */}
          <div className="lg:col-span-5 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase text-secondary tracking-wider">Interactive Route Map</span>
              <span className="text-xs text-outline font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-secondary" /> {currentDay?.activities?.length || 0} Pins
              </span>
            </div>

            <MapView activities={currentDay?.activities} />
          </div>
        </div>
      </div>

      {/* Add Stop Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 ambient-shadow border border-outline-variant/30 relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container text-outline hover:text-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-primary mb-4">Add Custom Stop to Day {selectedDayNumber}</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-primary block mb-1">Activity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunset Cocktails at Ambrai Ghat"
                  value={newStop.title}
                  onChange={(e) => setNewStop({ ...newStop, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="font-semibold text-primary block mb-1">Location / Address</label>
                <input
                  type="text"
                  placeholder="e.g. Jagdish Temple Ghat, Udaipur"
                  value={newStop.location}
                  onChange={(e) => setNewStop({ ...newStop, location: e.target.value })}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 outline-none focus:border-secondary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-primary block mb-1">Time</label>
                  <input
                    type="text"
                    value={newStop.time}
                    onChange={(e) => setNewStop({ ...newStop, time: e.target.value })}
                    className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="font-semibold text-primary block mb-1">Est. Cost (₹)</label>
                  <input
                    type="number"
                    value={newStop.cost}
                    onChange={(e) => setNewStop({ ...newStop, cost: e.target.value })}
                    className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-primary block mb-1">Description / Notes</label>
                <textarea
                  rows={3}
                  placeholder="Notes for companions..."
                  value={newStop.description}
                  onChange={(e) => setNewStop({ ...newStop, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 outline-none focus:border-secondary"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="turquoise" icon={Plus}>
                  Add Activity
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
