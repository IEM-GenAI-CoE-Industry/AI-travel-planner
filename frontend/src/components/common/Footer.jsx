import React from 'react';
import { Sparkles, Globe, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white border-t border-primary-container mt-auto">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed-dim flex items-center justify-center text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Venture AI</span>
            </div>
            <p className="text-on-primary-container text-sm leading-relaxed mb-4">
              Your AI-driven local travel concierge. Crafting bespoke Indian luxury itineraries, seamless group collaboration, and direct vendor connections.
            </p>
            <div className="flex gap-4 text-secondary-fixed-dim text-xs">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Vetted Local Vendors</span>
              <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> All India Coverage</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary-fixed-dim mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-on-primary-container">
              <li><a href="#" className="hover:text-white transition">AI Local Concierge</a></li>
              <li><a href="#" className="hover:text-white transition">Interactive Route Maps</a></li>
              <li><a href="#" className="hover:text-white transition">Collaborative Voting</a></li>
              <li><a href="#" className="hover:text-white transition">Spend Radar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary-fixed-dim mb-4">Indian Destinations</h4>
            <ul className="space-y-2 text-sm text-on-primary-container">
              <li><a href="#" className="hover:text-white transition">Udaipur, Rajasthan</a></li>
              <li><a href="#" className="hover:text-white transition">Kerala Backwaters</a></li>
              <li><a href="#" className="hover:text-white transition">South Goa Riviera</a></li>
              <li><a href="#" className="hover:text-white transition">Manali & Himachal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary-fixed-dim mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-on-primary-container">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Concierge Support</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-container/60 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-on-primary-container">
          <p>© 2026 Venture AI Inc. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Engineered with <Heart className="w-3.5 h-3.5 text-secondary-fixed-dim fill-secondary-fixed-dim" /> for luxury domestic travelers.
          </p>
        </div>
      </div>
    </footer>
  );
};
