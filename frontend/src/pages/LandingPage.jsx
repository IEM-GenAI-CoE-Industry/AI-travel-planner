import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { DestinationsGrid } from '../components/landing/DestinationsGrid';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { HowItWorks } from '../components/landing/HowItWorks';

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <DestinationsGrid />
      <FeaturesSection />
      <HowItWorks />
    </div>
  );
};
