import React, { useState } from 'react';
import { MOCK_ACTIVITIES } from '../types';
import { PlusCircle, CheckCircle } from 'lucide-react';

const LogEmission: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [logged, setLogged] = useState(false);

  const handleLog = () => {
    if (selectedId) {
      setLogged(true);
      setTimeout(() => {
        setLogged(false);
        setSelectedId(null);
      }, 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mb-20 md:mb-0">
      <div className="glass-panel rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-2">Log Activity</h2>
        <p className="text-gray-400 mb-6">Select an activity to update your carbon footprint.</p>

        <div className="grid grid-cols-1 gap-3 mb-8 max-h-[60vh] overflow-y-auto">
          {MOCK_ACTIVITIES.map((activity) => (
            <button
              key={activity.id}
              onClick={() => setSelectedId(activity.id)}
              className={`
                relative flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200
                ${selectedId === activity.id 
                  ? 'bg-eco-primary/20 border-eco-primary shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'}
              `}
            >
              <div>
                <span className="font-semibold block text-gray-100">{activity.name}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">{activity.category}</span>
              </div>
              <div className="text-right">
                <span className={`block font-bold ${activity.co2e > 0 ? 'text-rose-400' : 'text-eco-primary'}`}>
                  {activity.co2e > 0 ? '+' : ''}{activity.co2e} kg
                </span>
                <span className="text-xs text-eco-accent">+{activity.points} pts</span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleLog}
          disabled={!selectedId || logged}
          className={`
            w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300
            ${logged 
              ? 'bg-eco-primary text-white scale-100' 
              : selectedId 
                ? 'bg-gradient-to-r from-eco-primary to-teal-500 hover:shadow-lg hover:shadow-teal-500/30 text-white scale-100' 
                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'}
          `}
        >
          {logged ? (
            <>
              <CheckCircle size={24} /> Logged Successfully
            </>
          ) : (
            <>
              <PlusCircle size={24} /> Add to Log
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LogEmission;