import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LogEmission from './components/LogEmission';
import CalculateEmission from './components/CalculateEmission';
import Leaderboard from './components/Leaderboard';
import EcoSwapAI from './components/EcoSwapAI';
import { ViewState, MOCK_USERS, MOCK_ACTIVITIES } from './types';

// --- Supabase Setup (Stubbed for prompt compliance) ---
// In a real app, use environment variables:
// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
// const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';
// export const supabase = createClient(supabaseUrl, supabaseKey);
//
// NOTE: Application logic below uses MOCK_DATA as requested 
// to ensure full UI functionality without requiring backend credentials.

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  
  // In a real app, we would fetch user from Supabase here
  const currentUser = MOCK_USERS.find(u => u.isCurrentUser) || MOCK_USERS[0];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={currentUser} recentActivities={MOCK_ACTIVITIES} />;
      case 'log':
        return <LogEmission />;
      case 'calculate':
        return <CalculateEmission />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'ai-swap':
        return <EcoSwapAI />;
      default:
        return <Dashboard user={currentUser} recentActivities={MOCK_ACTIVITIES} />;
    }
  };

  return (
    <div className="min-h-screen text-gray-100 font-sans selection:bg-eco-primary selection:text-white pb-10 md:pb-0">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 animate-fade-in-up">
        {renderView()}
      </main>

      {/* Tailwind Custom Animation Injection (Hack for single file CSS requirements) */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        .animate-fade-in {
            animation: fadeInUp 0.5s ease-out forwards;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
        /* Safe area padding for mobile bottom nav */
        .pb-safe {
            padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
};

export default App;