import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const HowItWorks = () => {
  const { setActiveTab } = useApp();

  const steps = [
    {
      num: "01",
      title: "Prompt Your Travel Vision",
      desc: "Tell Venture AI your group size, budget, and vibe (e.g. 'Royal heritage in Udaipur with private boat rides')."
    },
    {
      num: "02",
      title: "AI Crafts Structured Plan",
      desc: "Receive a day-by-day interactive itinerary complete with curated hotels, authentic dining, and route maps."
    },
    {
      num: "03",
      title: "Vote & Coordinate as a Group",
      desc: "Companions upvote their favorite palace stays and sunset cruises. Consensus locks in your reservations."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="bg-linear-to-r from-primary to-primary-container text-white rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-fixed-dim/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary-fixed-dim">Effortless Workflow</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">
                How Venture AI Works
              </h2>
              <p className="text-on-primary-container text-sm mt-3">
                From idea to coordinated group adventure in 3 seamless steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-primary/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 relative">
                  <span className="text-4xl font-black text-secondary-fixed-dim/40 absolute top-4 right-4">
                    {step.num}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-secondary-fixed-dim text-primary flex items-center justify-center font-bold text-sm mb-4 shadow-sm">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-xs text-on-primary-container leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                variant="turquoise"
                size="lg"
                onClick={() => setActiveTab('chat')}
                icon={Sparkles}
              >
                Start Planning Free Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
