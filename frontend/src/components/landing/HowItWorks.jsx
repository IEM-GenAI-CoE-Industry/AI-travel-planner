import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Users, MapPin, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const HowItWorks = () => {
  const { setActiveTab } = useApp();

  const steps = [
    {
      step: "01",
      icon: MessageSquare,
      title: "Chat with AI Concierge",
      desc: "Prompt Venture AI with your budget, duration, and dream experiences. Get a complete itinerary draft in seconds."
    },
    {
      step: "02",
      icon: Users,
      title: "Vote & Refine with Companions",
      desc: "Invite your travel group. Companions upvote stay and activity candidates to finalize the perfect itinerary effortlessly."
    },
    {
      step: "03",
      icon: MapPin,
      title: "Explore with Live Maps",
      desc: "Access your interactive daily route map, location markers, reservation details, and weather guidance on the go."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Simple 3-Step Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mt-1">
            How Venture AI Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative bg-surface-container-lowest p-8 rounded-2xl ambient-shadow border border-outline-variant/30 text-center">
                <div className="absolute top-4 right-6 text-3xl font-extrabold text-primary/10">
                  {item.step}
                </div>

                <div className="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Icon className="w-7 h-7 text-secondary" />
                </div>

                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setActiveTab('chat')}
            icon={Sparkles}
          >
            Start Planning Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};
