import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Search, MapPin, Calendar } from 'lucide-react';
import { Button } from '../common/Button';

export const HeroSection = () => {
  const { setActiveTab, sendChatMessage } = useApp();
  const [prompt, setPrompt] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    sendChatMessage(prompt);
    setActiveTab('chat');
  };

  const samplePrompts = [
    "6 days in Udaipur heritage palaces under ₹65,000",
    "Kerala backwater houseboat & tea estate tour",
    "South Goa luxury beach & private yacht charter"
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-surface-container-low via-surface to-background pt-12 pb-20 border-b border-outline-variant/20">
      {/* Subtle ambient lighting spheres */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-surface-container-high/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/80 text-on-secondary-container text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>AI Local Travel Concierge</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight leading-tight mb-6">
            Explore India's Finest. <br className="hidden md:inline" />
            <span className="bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
              Designed by Intelligence.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            Craft tailored domestic itineraries across royal heritage, pristine backwaters, and Himalayan retreats with zero middleman markup.
          </p>
        </div>

        {/* Hero Interactive Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearchSubmit} className="glass-panel p-2.5 rounded-2xl shadow-xl border border-white/60 flex flex-col md:flex-row items-center gap-2">
            <div className="flex items-center gap-3 px-3 py-2 w-full text-on-surface">
              <Search className="w-5 h-5 text-secondary shrink-0" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask Venture: 'Plan 6 days in Udaipur palace stays for 4 people...'"
                className="w-full bg-transparent border-none outline-none text-sm md:text-base placeholder:text-outline text-on-surface"
              />
            </div>
            
            <Button 
              type="submit" 
              variant="turquoise"
              size="lg"
              className="w-full md:w-auto shrink-0"
              icon={Sparkles}
            >
              Generate Trip
            </Button>
          </form>

          {/* Quick Prompt Recommendation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-outline font-medium">Try asking:</span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(p);
                  sendChatMessage(p);
                  setActiveTab('chat');
                }}
                className="px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition border border-outline-variant/30"
              >
                "{p}"
              </button>
            ))}
          </div>
        </div>

        {/* Hero Banner Feature Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <div className="glass-panel p-5 rounded-2xl ambient-shadow flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-base">Instant AI Itineraries</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Generates real-time day-by-day schedules with curated local hotels, dining, & maps.</p>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl ambient-shadow flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-base">Interactive Local Maps</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Pinpoint heritage routes, boating paths, and local stop nodes visually.</p>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl ambient-shadow flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-base">Group Voting Hub</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Collaboratively upvote local stay and experience options with companion consensus.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
