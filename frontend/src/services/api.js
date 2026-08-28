const API_BASE = '/api';

export const apiService = {
  // Send message to AI Concierge
  async sendChatMessage(message) {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error('Failed to post chat message');
    return res.json();
  },

  // Get current trip itinerary
  async getItinerary(tripId = 'udaipur-royal-getaway') {
    const res = await fetch(`${API_BASE}/itineraries/${tripId}`);
    if (!res.ok) throw new Error('Failed to fetch itinerary');
    return res.json();
  },

  // Add activity item
  async addActivity(tripId, dayNumber, activityData) {
    const res = await fetch(`${API_BASE}/itineraries/${tripId}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dayNumber, newActivity: activityData }),
    });
    if (!res.ok) throw new Error('Failed to add activity');
    return res.json();
  },

  // Get voting data
  async getVotingData(tripId = 'udaipur-royal-getaway') {
    const res = await fetch(`${API_BASE}/voting/${tripId}`);
    if (!res.ok) throw new Error('Failed to fetch voting data');
    return res.json();
  },

  // Cast vote
  async castVote(tripId = 'udaipur-royal-getaway', candidateId, voteType, user = 'Alex Rivera') {
    const res = await fetch(`${API_BASE}/voting/${tripId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidateId, voteType, user }),
    });
    if (!res.ok) throw new Error('Failed to cast vote');
    return res.json();
  },

  // Get destinations
  async getDestinations() {
    const res = await fetch(`${API_BASE}/destinations`);
    if (!res.ok) throw new Error('Failed to fetch destinations');
    return res.json();
  }
};
