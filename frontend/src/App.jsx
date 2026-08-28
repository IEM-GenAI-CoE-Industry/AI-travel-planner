import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { ChatPage } from './pages/ChatPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { VotingPage } from './pages/VotingPage';

const AppContent = () => {
  const { activeTab, toastMessage } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background selection:bg-secondary-container">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'chat' && <ChatPage />}
        {activeTab === 'itinerary' && <ItineraryPage />}
        {activeTab === 'voting' && <VotingPage />}
      </main>

      <Footer />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-secondary-fixed-dim/40 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
