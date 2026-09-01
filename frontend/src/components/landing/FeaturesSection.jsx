import React from 'react';
import { MessageSquare, MapPin, Users, PieChart, ShieldCheck, Zap } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "AI Concierge & Chat",
      desc: "Conversational domestic planning. Ask for royal suites in Udaipur or backwater houseboats in Kerala with instant structured replies.",
      color: "bg-blue-50 text-blue-700"
    },
    {
      icon: MapPin,
      title: "Leaflet Route Maps",
      desc: "Visual pinpoint maps connecting day-by-day stops, boat cruise routes, and cultural hotspots seamlessly.",
      color: "bg-emerald-50 text-emerald-700"
    },
    {
      icon: Users,
      title: "Group Consensus Hub",
      desc: "Invite travel companions to vote on hotel proposals and activities. Live consensus calculations lock in top choices.",
      color: "bg-purple-50 text-purple-700"
    },
    {
      icon: PieChart,
      title: "Spend Radar in INR",
      desc: "Track real-time spend across Stays, Dining, and Experiences in Indian Rupees with category limits.",
      color: "bg-amber-50 text-amber-700"
    },
    {
      icon: ShieldCheck,
      title: "Direct Local Rates",
      desc: "Vetted boutique stays and heritage properties without middleman booking commissions or inflated rates.",
      color: "bg-teal-50 text-teal-700"
    },
    {
      icon: Zap,
      title: "Live Day Modification",
      desc: "Easily add, reorder, or customize stops on your live itinerary timeline with one-click budget updates.",
      color: "bg-rose-50 text-rose-700"
    }
  ];

  return (
    <section className="py-16 bg-surface-container-lowest border-y border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Intelligent Travel Architecture</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mt-1">
            Engineered for Modern Travel Groups
          </h2>
          <p className="text-on-surface-variant text-sm mt-2">
            Eliminating endless WhatsApp debates and spreadsheets with an integrated AI travel planner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-secondary/40 transition-all ambient-shadow group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color} shadow-xs group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
