import React from 'react';
import { MessageSquare, MapPin, Users, DollarSign, CloudSun, CheckCircle2 } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Conversational AI Concierge",
      desc: "Speak naturally about your domestic travel style. Venture converts open prompts into structured schedules with stays, dining, & transfers."
    },
    {
      icon: MapPin,
      title: "Interactive Route Maps",
      desc: "Visualize every stop on high-resolution maps. Custom pin markers for heritage hotels, restaurants, and daily scenic paths."
    },
    {
      icon: Users,
      title: "Collaborative Group Voting",
      desc: "End group chat debate. Travel companions vote up/down on stays and activities with real-time consensus percentage meters."
    },
    {
      icon: DollarSign,
      title: "Live Spend Radar",
      desc: "Track estimated vs. actual expenses across stays, activities, and dining per traveler in real time."
    },
    {
      icon: CloudSun,
      title: "Weather & Local Insights",
      desc: "Integrated micro-climate weather forecasts and seasonal hints for optimal packing and activity timing."
    },
    {
      icon: CheckCircle2,
      title: "Instant Export & Sync",
      desc: "Export your itinerary to Google Calendar, Apple Wallet, or share a live link with friends in one click."
    }
  ];

  return (
    <section className="py-20 bg-surface-container-low border-y border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Built for Seamless Travel</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mt-1">
            Engineered for Modern Local Travel Intelligence
          </h2>
          <p className="text-on-surface-variant text-sm mt-3 leading-relaxed">
            From initial trip discovery to final group decisions, Venture AI keeps your entire group aligned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-6 rounded-2xl ambient-shadow hover:-translate-y-0.5 transition-all duration-300 border border-white/80"
              >
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary-container text-white flex items-center justify-center mb-5 shadow-sm">
                  <Icon className="w-6 h-6 text-secondary-fixed-dim" />
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">{feat.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
