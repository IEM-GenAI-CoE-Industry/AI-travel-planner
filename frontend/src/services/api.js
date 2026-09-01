const API_BASE = '/api';

export const apiService = {
  // Send message to Venture AI Concierge (with 60s timeout for local LLM models)
  async sendChatMessage(message, threadId = 'default-thread') {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, thread_id: threadId }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to post chat message`);
      return await res.json();
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error('Local model is still generating. Please try sending again.');
      }
      throw err;
    }
  },

  // Get active trip itinerary
  async getItinerary(tripId = 'active') {
    const res = await fetch(`${API_BASE}/itineraries/${tripId}`);
    if (!res.ok) throw new Error('Failed to fetch itinerary');
    return res.json();
  },

  // Add activity item
  async addActivity(tripId = 'active', dayNumber, activityData) {
    const res = await fetch(`${API_BASE}/itineraries/${tripId}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dayNumber, newActivity: activityData }),
    });
    if (!res.ok) throw new Error('Failed to add activity');
    return res.json();
  },

  // Get active group voting data
  async getVotingData(tripId = 'active') {
    const res = await fetch(`${API_BASE}/voting/${tripId}`);
    if (!res.ok) throw new Error('Failed to fetch voting data');
    return res.json();
  },

  // Cast vote on active trip
  async castVote(tripId = 'active', candidateId, voteType, user = 'Alex Rivera') {
    const res = await fetch(`${API_BASE}/voting/${tripId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidateId, voteType, user }),
    });
    if (!res.ok) throw new Error('Failed to cast vote');
    return res.json();
  },

  // Get featured destinations
  async getDestinations() {
    const res = await fetch(`${API_BASE}/destinations`);
    if (!res.ok) throw new Error('Failed to fetch destinations');
    return res.json();
  }
};
