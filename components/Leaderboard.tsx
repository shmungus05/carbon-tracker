import React from 'react';
import { MOCK_USERS } from '../types';
import { Medal, TrendingUp, User as UserIcon } from 'lucide-react';

const Leaderboard: React.FC = () => {
  // Sort users by points
  const sortedUsers = [...MOCK_USERS].sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className="max-w-3xl mx-auto p-4 mb-20 md:mb-0">
      <div className="glass-panel rounded-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <Medal className="text-yellow-400" /> Leaderboard
            </h2>
            <div className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300">
                Weekly Challenge
            </div>
        </div>

        <div className="space-y-4">
            {sortedUsers.map((user, index) => (
                <div 
                    key={user.id}
                    className={`
                        flex items-center gap-4 p-4 rounded-xl border transition-all duration-300
                        ${user.isCurrentUser 
                            ? 'bg-eco-primary/10 border-eco-primary/40' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10'}
                    `}
                >
                    {/* Rank */}
                    <div className={`
                        flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg
                        ${index === 0 ? 'bg-yellow-400/20 text-yellow-400' : 
                          index === 1 ? 'bg-gray-300/20 text-gray-300' : 
                          index === 2 ? 'bg-amber-700/20 text-amber-600' : 'text-gray-500'}
                    `}>
                        {index + 1}
                    </div>

                    {/* Avatar Mock */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center">
                        <UserIcon size={20} className="text-gray-300" />
                    </div>

                    {/* Details */}
                    <div className="flex-grow">
                        <h3 className={`font-semibold ${user.isCurrentUser ? 'text-eco-primary' : 'text-gray-200'}`}>
                            {user.name} {user.isCurrentUser && '(You)'}
                        </h3>
                        <p className="text-xs text-gray-500">
                             Reduction: <span className="text-eco-accent">{user.weeklyReduction}%</span>
                        </p>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                        <span className="block text-xl font-bold text-white">{user.totalPoints}</span>
                        <span className="text-xs text-gray-500">pts</span>
                    </div>

                    {/* Trend Icon */}
                    <TrendingUp size={16} className="text-eco-primary hidden md:block" />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;