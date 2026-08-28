import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

export const DestinationsGrid = () => {
  const { destinations, setActiveTab, sendChatMessage } = useApp();

  const handleSelectDestination = (dest) => {
    sendChatMessage(`Plan a 6-day luxury vacation in ${dest.name}`);
    setActiveTab('chat');
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Curated Destinations</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mt-1">
              Handpicked Luxury Escapes in India
            </h2>
            <p className="text-on-surface-variant text-sm mt-2 max-w-xl">
              Explore domestic destinations pre-loaded with high-fidelity itinerary templates and concierge recommendations.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('chat')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition"
          >
            Explore all with AI Concierge <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map(dest => (
            <div 
              key={dest.id}
              onClick={() => handleSelectDestination(dest)}
              className="group bg-surface-container-lowest rounded-2xl overflow-hidden ambient-shadow border border-outline-variant/30 hover:border-secondary/50 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-primary flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{dest.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-bold tracking-tight">{dest.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-secondary-fixed-dim mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{dest.duration}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-4">
                  {dest.description}
                </p>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dest.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="info">{tag}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
                    <div>
                      <span className="text-[10px] uppercase text-outline font-semibold tracking-wider">Est. Budget</span>
                      <p className="text-sm font-bold text-primary">{dest.priceRange}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface-container group-hover:bg-secondary group-hover:text-white transition flex items-center justify-center text-primary">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
