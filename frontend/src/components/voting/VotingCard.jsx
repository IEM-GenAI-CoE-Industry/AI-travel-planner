import React from 'react';
import { ThumbsUp, ThumbsDown, MapPin, Sparkles, Check } from 'lucide-react';
import { ConsensusMeter } from './ConsensusMeter';

export const VotingCard = ({ candidate, onVote }) => {
  const isUpvotedByMe = candidate.votes?.some(v => v.user === "Alex Rivera" && v.vote === "UP");
  const isDownvotedByMe = candidate.votes?.some(v => v.user === "Alex Rivera" && v.vote === "DOWN");

  return (
    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden ambient-shadow border border-outline-variant/30 flex flex-col justify-between group">
      <div>
        {/* Card Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={candidate.image}
            alt={candidate.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/90 text-white backdrop-blur-xs uppercase tracking-wider">
              {candidate.category}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-xs">
            {candidate.pricePerNight}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-4">
          <div>
            <h4 className="text-base font-bold text-primary mb-1">{candidate.title}</h4>
            <p className="text-xs text-secondary font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {candidate.location}
            </p>
          </div>

          {/* Features List */}
          <ul className="space-y-1 text-xs text-on-surface-variant">
            {candidate.features?.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          {/* Consensus Meter */}
          <ConsensusMeter score={candidate.consensusScore} status={candidate.status} />
        </div>
      </div>

      {/* Voting Actions Footer */}
      <div className="p-4 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between gap-3">
        <span className="text-xs text-outline font-medium">Your Vote:</span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onVote(candidate.id, 'DOWN')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
              isDownvotedByMe
                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                : 'bg-surface-container-lowest text-outline hover:text-rose-700 hover:bg-rose-50 border border-outline-variant/30'
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>Pass</span>
          </button>

          <button
            onClick={() => onVote(candidate.id, 'UP')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
              isUpvotedByMe
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-primary text-white hover:bg-primary-container shadow-xs'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5 text-secondary-fixed-dim" />
            <span>{isUpvotedByMe ? 'Approved' : 'Vote Yes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
