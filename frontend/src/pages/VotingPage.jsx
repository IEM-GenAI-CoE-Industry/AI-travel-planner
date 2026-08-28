import React from 'react';
import { useApp } from '../context/AppContext';
import { VotingCard } from '../components/voting/VotingCard';
import { CompanionActivityFeed } from '../components/voting/CompanionActivityFeed';
import { Users } from 'lucide-react';

export const VotingPage = () => {
  const { votingData, castVote } = useApp();
  const { candidates, activityFeed } = votingData;

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        {/* Page Header */}
        <div className="bg-linear-to-r from-primary to-primary-container text-white p-8 rounded-3xl mb-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-fixed-dim/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed-dim/20 text-secondary-fixed-dim text-xs font-semibold uppercase tracking-wider mb-3 border border-secondary-fixed-dim/30">
              <Users className="w-3.5 h-3.5" /> Group Decision Hub
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Collaborative Group Voting</h1>
            <p className="text-on-primary-container text-sm leading-relaxed">
              Vote on hotel options, dining spots, and excursions. Companion approval percentages calculate automatically to lock in your top picks.
            </p>
          </div>
        </div>

        {/* Voting Layout: Options Grid (Left) & Feed (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Options Grid */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-secondary tracking-wider">Group Proposals</span>
                <h3 className="text-xl font-bold text-primary">Candidate Options ({candidates?.length || 0})</h3>
              </div>
              <span className="text-xs text-outline font-medium">4 Group Members Active</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {candidates?.map(candidate => (
                <VotingCard
                  key={candidate.id}
                  candidate={candidate}
                  onVote={castVote}
                />
              ))}
            </div>
          </div>

          {/* Activity Feed Column */}
          <div className="lg:col-span-4 sticky top-20">
            <CompanionActivityFeed feed={activityFeed} />
          </div>
        </div>
      </div>
    </div>
  );
};
