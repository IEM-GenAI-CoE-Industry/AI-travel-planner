import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, MessageSquare, MapPin, Users, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: 'landing', label: 'Discover', icon: Compass },
    { id: 'chat', label: 'AI Concierge', icon: MessageSquare },
    { id: 'itinerary', label: 'Interactive Itinerary', icon: MapPin },
    { id: 'voting', label: 'Group Voting', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop h-16 flex items-center justify-between">
        {/* Brand logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-secondary-fixed-dim" />
          </div>
          <span className="font-bold text-xl tracking-tight text-primary">
            Venture<span className="text-secondary">.AI</span>
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-secondary-fixed-dim' : ''}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Quick CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('chat')}
            className="flex items-center gap-2 bg-linear-to-r from-secondary to-secondary-container text-primary font-semibold px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all text-sm active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-primary" />
            <span>Plan with AI</span>
          </button>
          
          <div className="w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden cursor-pointer shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Alex Rivera"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden border-t border-outline-variant/20 bg-surface justify-around py-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 text-xs px-3 py-1 rounded-lg ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
