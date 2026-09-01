import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VotingCard } from '../components/voting/VotingCard';
import { CompanionActivityFeed } from '../components/voting/CompanionActivityFeed';
import { Users, Copy, Check } from 'lucide-react';

export const VotingPage = () => {

  const {
    votingData,
    castVote,
    roomCode,
    createTripRoom,
    joinTripRoom
  } = useApp();

  const { candidates, activityFeed } = votingData;

  const [joinCode, setJoinCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [roomLoading, setRoomLoading] = useState(false);


  // ============================================================
  // CREATE ROOM
  // ============================================================

  const handleCreateRoom = async () => {

    setRoomLoading(true);

    try {
      await createTripRoom();
    } finally {
      setRoomLoading(false);
    }

  };


  // ============================================================
  // JOIN ROOM
  // ============================================================

  const handleJoinRoom = async () => {

    if (!joinCode.trim()) {
      return;
    }

    setRoomLoading(true);

    try {
      const result = await joinTripRoom(joinCode);

      if (result) {
        setJoinCode('');
      }

    } finally {
      setRoomLoading(false);
    }

  };


  // ============================================================
  // COPY ROOM CODE
  // ============================================================

  const copyRoomCode = async () => {

    if (!roomCode) {
      return;
    }

    await navigator.clipboard.writeText(roomCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  };


  // ============================================================
  // ROOM SCREEN
  // ============================================================

  if (!roomCode) {

    return (

      <div className="bg-background min-h-screen py-8">

        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">

          <div className="max-w-2xl mx-auto">

            {/* Header */}

            <div className="bg-linear-to-r from-primary to-primary-container text-white p-8 rounded-3xl mb-8 shadow-lg">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed-dim/20 text-secondary-fixed-dim text-xs font-semibold uppercase tracking-wider mb-4 border border-secondary-fixed-dim/30">

                <Users className="w-3.5 h-3.5" />

                Trip Collaboration

              </div>

              <h1 className="text-3xl font-extrabold tracking-tight mb-2">
                Join Your Trip Room
              </h1>

              <p className="text-on-primary-container text-sm leading-relaxed">
                Create a room for your group or enter a room code shared by your
                travel companions.
              </p>

            </div>


            {/* Room Card */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              {/* CREATE ROOM */}

              <div className="text-center">

                <h2 className="text-xl font-bold text-primary mb-2">
                  Create a New Trip Room
                </h2>

                <p className="text-sm text-outline mb-6">
                  Start a collaborative trip and invite your companions.
                </p>

                <button
                  onClick={handleCreateRoom}
                  disabled={roomLoading}
                  className="w-full bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {roomLoading
                    ? 'Creating Room...'
                    : 'Create Trip Room'}
                </button>

              </div>


              {/* DIVIDER */}

              <div className="flex items-center gap-4 my-8">

                <div className="flex-1 h-px bg-outline/20" />

                <span className="text-xs font-semibold text-outline">
                  OR
                </span>

                <div className="flex-1 h-px bg-outline/20" />

              </div>


              {/* JOIN ROOM */}

              <div>

                <h2 className="text-xl font-bold text-primary mb-2 text-center">
                  Join an Existing Room
                </h2>

                <p className="text-sm text-outline mb-6 text-center">
                  Enter the 6-character room code from your group.
                </p>


                <div className="flex flex-col sm:flex-row gap-3">

                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) =>
                      setJoinCode(
                        e.target.value
                          .toUpperCase()
                          .replace(/[^A-Z0-9]/g, '')
                          .slice(0, 6)
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleJoinRoom();
                      }
                    }}
                    placeholder="ABC123"
                    maxLength={6}
                    className="flex-1 border border-outline/30 rounded-xl px-4 py-3 text-center font-bold tracking-[0.3em] uppercase focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                  <button
                    onClick={handleJoinRoom}
                    disabled={
                      roomLoading ||
                      joinCode.length !== 6
                    }
                    className="bg-secondary text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
                  >
                    {roomLoading
                      ? 'Joining...'
                      : 'Join Room'}
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    );

  }


  // ============================================================
  // ROOM EXISTS → SHOW VOTING PAGE
  // ============================================================

  return (

    <div className="bg-background min-h-screen py-8">

      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">


        {/* ROOM INFORMATION */}

        <div className="bg-white rounded-2xl shadow-sm border border-outline/10 px-5 py-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div>

            <span className="text-xs font-bold uppercase text-secondary tracking-wider">
              Trip Room
            </span>

            <div className="flex items-center gap-3">

              <span className="text-2xl font-extrabold tracking-widest text-primary">
                {roomCode}
              </span>

              <button
                onClick={copyRoomCode}
                className="p-2 rounded-lg hover:bg-background transition"
                title="Copy room code"
              >

                {copied ? (
                  <Check className="w-4 h-4 text-secondary" />
                ) : (
                  <Copy className="w-4 h-4 text-outline" />
                )}

              </button>

            </div>

          </div>


          <div className="text-sm text-outline text-center sm:text-right">

            <div className="font-semibold text-primary">
              Share this code with your group
            </div>

            <div>
              Everyone joining this code shares the same voting room.
            </div>

          </div>

        </div>


        {/* PAGE HEADER */}

        <div className="bg-linear-to-r from-primary to-primary-container text-white p-8 rounded-3xl mb-8 shadow-lg relative overflow-hidden">

          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-fixed-dim/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed-dim/20 text-secondary-fixed-dim text-xs font-semibold uppercase tracking-wider mb-3 border border-secondary-fixed-dim/30">

              <Users className="w-3.5 h-3.5" />

              Group Decision Hub

            </div>

            <h1 className="text-3xl font-extrabold tracking-tight mb-2">
              Collaborative Group Voting
            </h1>

            <p className="text-on-primary-container text-sm leading-relaxed">
              Vote on hotel options, dining spots, and excursions. Companion
              approval percentages calculate automatically to lock in your top picks.
            </p>

          </div>

        </div>


        {/* VOTING LAYOUT */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">


          {/* OPTIONS */}

          <div className="lg:col-span-8 space-y-6">

            <div className="flex items-center justify-between">

              <div>

                <span className="text-xs font-bold uppercase text-secondary tracking-wider">
                  Group Proposals
                </span>

                <h3 className="text-xl font-bold text-primary">
                  Candidate Options ({candidates?.length || 0})
                </h3>

              </div>

              <span className="text-xs text-outline font-medium">
                4 Group Members Active
              </span>

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


          {/* ACTIVITY FEED */}

          <div className="lg:col-span-4 sticky top-20">

            <CompanionActivityFeed
              feed={activityFeed}
            />

          </div>

        </div>

      </div>

    </div>

  );

};