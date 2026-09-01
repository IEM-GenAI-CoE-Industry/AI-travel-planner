import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('landing');

  const [itinerary, setItinerary] = useState(null);
  const [destinations, setDestinations] = useState([]);

  const [votingData, setVotingData] = useState({
    candidates: [],
    activityFeed: []
  });

  // ============================================================
  // TRIP ROOM
  // ============================================================

  const [roomCode, setRoomCode] = useState(null);

  // This is the actual itinerary ID
  const [tripId, setTripId] = useState('udaipur-royal-getaway');

  // ============================================================
  // CHAT
  // ============================================================

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

  // ============================================================
  // TOAST
  // ============================================================

  const showToast = (msg) => {
    setToastMessage(msg);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // ============================================================
  // CREATE TRIP ROOM
  // ============================================================

  const createTripRoom = async () => {
    try {
      const res = await apiService.createRoom();

      console.log("Created room:", res);

      setRoomCode(res.roomCode);
      setTripId(res.tripId);

      // Load voting data using ROOM CODE
      const votingRes = await apiService.getVotingData(res.roomCode);

      setVotingData(votingRes);

      showToast(`Trip room created: ${res.roomCode}`);

      return res;

    } catch (err) {
      console.error("Create room error:", err);
      showToast("Failed to create trip room.");
    }
  };

  // ============================================================
  // JOIN TRIP ROOM
  // ============================================================

  const joinTripRoom = async (code) => {
    try {
      const res = await apiService.getRoom(code);

      console.log("Joined room:", res);

      setRoomCode(res.roomCode);
      setTripId(res.tripId);

      // Load voting data using ROOM CODE
      const votingRes = await apiService.getVotingData(res.roomCode);

      setVotingData(votingRes);

      showToast(`Joined trip room: ${res.roomCode}`);

      return res;

    } catch (err) {
      console.error("Join room error:", err);
      showToast("Trip room not found.");
    }
  };

  // ============================================================
  // LOAD INITIAL DATA
  // ============================================================
  // IMPORTANT:
  // We load itinerary and destinations immediately.
  // We DO NOT load voting data here because there is no roomCode
  // until the user creates or joins a room.
  // ============================================================

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);

        const [
          itineraryRes,
          destinationsRes
        ] = await Promise.all([
          apiService.getItinerary(tripId).catch(() => null),
          apiService.getDestinations().catch(() => [])
        ]);

        if (itineraryRes) {
          setItinerary(itineraryRes);
        }

        if (destinationsRes) {
          setDestinations(destinationsRes);
        }

      } catch (err) {
        console.error("Initialization error:", err);

      } finally {
        setLoading(false);
      }
    }

    loadInitialData();

  }, [tripId]);

  // ============================================================
  // REAL-TIME VOTING WEBSOCKET
  // ============================================================

  useEffect(() => {

    // No room = don't open WebSocket
    if (!roomCode) {
      console.log("No voting room yet.");
      return;
    }

    console.log(`Connecting to voting room: ${roomCode}`);

    const socket = new WebSocket(
      `ws://localhost:8000/api/voting/ws/${roomCode}`
    );

    socket.onopen = () => {
      console.log(
        `Connected to voting room: ${roomCode}`
      );
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log("WebSocket update:", data);

        if (data.type === 'vote_updated') {

          setVotingData({
            candidates: data.candidates,
            activityFeed: data.activityFeed
          });

        }

      } catch (err) {
        console.error(
          "WebSocket message error:",
          err
        );
      }
    };

    socket.onerror = (error) => {
      console.error(
        "Voting WebSocket error:",
        error
      );
    };

    socket.onclose = () => {
      console.log(
        `Voting WebSocket disconnected: ${roomCode}`
      );
    };

    return () => {
      console.log(
        `Closing WebSocket: ${roomCode}`
      );

      socket.close();
    };

  }, [roomCode]);

  // ============================================================
  // SEND CHAT MESSAGE
  // ============================================================

  const sendChatMessage = async (text) => {

    const userMsg = {
      id: Date.now(),
      sender: "You",
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      text,
      isAi: false
    };

    setChatMessages(prev => [
      ...prev,
      userMsg
    ]);

    setLoading(true);

    try {

      const response =
        await apiService.sendChatMessage(text);

      const aiMsg = {
        id: Date.now() + 1,

        sender:
          response.sender ||
          "Venture Concierge",

        timestamp:
          response.timestamp ||
          new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),

        text: response.text,

        suggestedPills:
          response.suggestedPills,

        generatedTrip:
          response.generatedTrip,

        isAi: true
      };

      setChatMessages(prev => [
        ...prev,
        aiMsg
      ]);

      if (response.generatedTrip) {
        setItinerary(
          response.generatedTrip
        );
      }

    } catch (err) {

      console.error(err);

      showToast(
        "Failed to connect to FastAPI AI Concierge service."
      );

    } finally {

      setLoading(false);

    }
  };

  // ============================================================
  // CAST VOTE
  // ============================================================

  const castVote = async (
    candidateId,
    voteType
  ) => {

    // User must be inside a room
    if (!roomCode) {
      showToast(
        "Please create or join a trip room first."
      );
      return;
    }

    try {

      // IMPORTANT:
      // Voting uses roomCode, NOT tripId
      const res =
        await apiService.castVote(
          roomCode,
          candidateId,
          voteType
        );

      setVotingData({
        candidates: res.candidates,
        activityFeed: res.activityFeed
      });

      showToast(
        `Vote recorded! Group consensus: ${res.candidate.consensusScore}%`
      );

    } catch (err) {

      console.error(
        "Vote error:",
        err
      );

      showToast(
        "Error submitting vote."
      );
    }
  };

  // ============================================================
  // ADD ACTIVITY
  // ============================================================

  const addActivity = async (
    dayNumber,
    activityData
  ) => {

    try {

      // Activities use tripId
      const res =
        await apiService.addActivity(
          tripId,
          dayNumber,
          activityData
        );

      setItinerary(
        res.itinerary
      );

      showToast(
        "New activity stop added to your itinerary!"
      );

    } catch (err) {

      console.error(
        "Add activity error:",
        err
      );

      showToast(
        "Error adding activity stop."
      );
    }
  };

  // ============================================================
  // CONTEXT PROVIDER
  // ============================================================

  return (
    <AppContext.Provider
      value={{

        // UI
        activeTab,
        setActiveTab,

        // Trip Room
        roomCode,
        tripId,
        createTripRoom,
        joinTripRoom,

        // Trip Data
        itinerary,
        setItinerary,
        destinations,

        // Voting
        votingData,
        castVote,

        // Chat
        chatMessages,
        sendChatMessage,

        // Activities
        addActivity,

        // UI State
        loading,
        toastMessage,
        showToast

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ============================================================
// CUSTOM HOOK
// ============================================================

export const useApp = () =>
  useContext(AppContext);