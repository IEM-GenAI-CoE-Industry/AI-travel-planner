const API_BASE = '/api';

export const apiService = {

  // ==============================
  // CHAT
  // ==============================

  async sendChatMessage(message) {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      throw new Error('Failed to post chat message');
    }

    return res.json();
  },


  // ==============================
  // ITINERARY
  // ==============================

  async getItinerary(tripId = 'udaipur-royal-getaway') {
    const res = await fetch(
      `${API_BASE}/itineraries/${tripId}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch itinerary');
    }

    return res.json();
  },


  async addActivity(tripId, dayNumber, activityData) {
    const res = await fetch(
      `${API_BASE}/itineraries/${tripId}/activities`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dayNumber,
          newActivity: activityData
        }),
      }
    );

    if (!res.ok) {
      throw new Error('Failed to add activity');
    }

    return res.json();
  },


  // ==============================
  // VOTING
  // ==============================

  async getVotingData(roomCode) {
    const res = await fetch(
      `${API_BASE}/voting/${roomCode}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch voting data');
    }

    return res.json();
  },


  async castVote(
    roomCode,
    candidateId,
    voteType,
    user = 'Alex Rivera'
  ) {
    const res = await fetch(
      `${API_BASE}/voting/${roomCode}/vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          candidateId,
          voteType,
          user
        }),
      }
    );

    if (!res.ok) {
      throw new Error('Failed to cast vote');
    }

    return res.json();
  },


  // ==============================
  // DESTINATIONS
  // ==============================

  async getDestinations() {
    const res = await fetch(
      `${API_BASE}/destinations`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch destinations');
    }

    return res.json();
  },


  // ==============================
  // TRIP ROOMS
  // ==============================

  async createRoom() {
    const res = await fetch(
      `${API_BASE}/voting/rooms`,
      {
        method: 'POST',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to create trip room');
    }

    return res.json();
  },


  async getRoom(roomCode) {
    const res = await fetch(
      `${API_BASE}/voting/rooms/${roomCode}`
    );

    if (!res.ok) {
      throw new Error('Trip room not found');
    }

    return res.json();
  }
};