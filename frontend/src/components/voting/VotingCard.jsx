import React from 'react';
import { ThumbsUp, ThumbsDown, MapPin, Check } from 'lucide-react';
import { ConsensusMeter } from './ConsensusMeter';
import { Badge } from '../common/Badge';

export const VotingCard = ({ candidate, onVote }) => {
  const { id, category, title, location, pricePerNight, image, features, consensusScore, votes, status } = candidate;

  const myVote = votes?.find(v => v.user === "Alex Rivera")?.vote;

  const getStatusBadge = (s) => {
    if (s === "CONFIRMED") return <Badge variant="success">Confirmed Stop</Badge>;
    if (s === "TOP_PICK") return <Badge variant="turquoise">Top Pick</Badge>;
    return <Badge variant="warning">Voting Open</Badge>;
  };

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 ambient-shadow border border-outline-variant/30 hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Card Header & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="info">{category}</Badge>
          {getStatusBadge(status)}
        </div>

        {/* Option Image */}
        <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
            {pricePerNight}
          </div>
        </div>

        <h3 className="font-bold text-primary text-lg mb-1">{title}</h3>
        <p className="text-xs text-secondary font-medium flex items-center gap-1 mb-4">
          <MapPin className="w-3.5 h-3.5" /> {location}
        </p>

        {/* Key Features list */}
        <ul className="space-y-1.5 mb-6 text-xs text-on-surface-variant">
          {features?.map((feat, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Consensus Meter & Actions */}
      <div className="pt-4 border-t border-outline-variant/20 space-y-4">
        <ConsensusMeter score={consensusScore} status={status} />

        <div className="flex items-center justify-between gap-3">
          {/* Vote Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onVote(id, 'UP')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                myVote === 'UP'
                  ? 'bg-secondary text-white shadow-sm'
                  : 'bg-surface-container hover:bg-secondary-container text-primary'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Approve</span>
            </button>

            <button
              onClick={() => onVote(id, 'DOWN')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                myVote === 'DOWN'
                  ? 'bg-error text-white shadow-sm'
                  : 'bg-surface-container hover:bg-error-container text-on-surface-variant'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>Pass</span>
            </button>
          </div>

          {/* Traveler Vote Count */}
          <div className="text-right">
            <span className="text-[10px] text-outline block">Group votes</span>
            <span className="text-xs font-bold text-primary">{votes?.length || 0} cast</span>
          </div>
        </div>
      </div>
    </div>
  );
};
