import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'chat' | 'itinerary' | 'voting'
  const [itinerary, setItinerary] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [votingData, setVotingData] = useState({ candidates: [], activityFeed: [] });
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Venture Concierge",
      timestamp: "10:30 AM",
      text: "Namaste! Welcome to Venture AI. I'm your AI Travel Concierge for Indian luxury destinations. Where would you like to explore? I can craft royal heritage itineraries, houseboat cruises, and coordinate group votes.",
      isAi: true
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load initial data from FastAPI backend
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [itineraryRes, destinationsRes, votingRes] = await Promise.all([
          apiService.getItinerary().catch(() => null),
          apiService.getDestinations().catch(() => []),
          apiService.getVotingData().catch(() => ({ candidates: [], activityFeed: [] }))
        ]);
        if (itineraryRes) setItinerary(itineraryRes);
        if (destinationsRes) setDestinations(destinationsRes);
        if (votingRes) setVotingData(votingRes);
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const sendChatMessage = async (text) => {
    const userMsg = {
      id: Date.now(),
      sender: "You",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
      isAi: false
    };

    setChatMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await apiService.sendChatMessage(text);
      const aiMsg = {
        id: Date.now() + 1,
        sender: response.sender || "Venture Concierge",
        timestamp: response.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: response.text,
        suggestedPills: response.suggestedPills,
        generatedTrip: response.generatedTrip,
        isAi: true
      };
      setChatMessages(prev => [...prev, aiMsg]);
      if (response.generatedTrip) {
        setItinerary(response.generatedTrip);
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to connect to FastAPI AI Concierge service.");
    } finally {
      setLoading(false);
    }
  };

  const castVote = async (candidateId, voteType) => {
    try {
      const res = await apiService.castVote('udaipur-royal-getaway', candidateId, voteType);
      setVotingData({
        candidates: res.candidates,
        activityFeed: res.activityFeed
      });
      showToast(`Vote recorded! Group consensus: ${res.candidate.consensusScore}%`);
    } catch (err) {
      console.error(err);
      showToast("Error submitting vote.");
    }
  };

  const addActivity = async (dayNumber, activityData) => {
    try {
      const res = await apiService.addActivity('udaipur-royal-getaway', dayNumber, activityData);
      setItinerary(res.itinerary);
      showToast("New activity stop added to your itinerary!");
    } catch (err) {
      console.error(err);
      showToast("Error adding activity stop.");
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        itinerary,
        setItinerary,
        destinations,
        votingData,
        chatMessages,
        sendChatMessage,
        castVote,
        addActivity,
        loading,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
