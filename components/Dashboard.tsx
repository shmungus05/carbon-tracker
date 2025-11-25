import React from 'react';
import { User, Activity } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Droplets, Zap, Car, Leaf } from 'lucide-react';

interface DashboardProps {
  user: User;
  recentActivities: Activity[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, recentActivities }) => {
  
  // Transform dailyLog for the chart
  const chartData = user.dailyLog.map((val, idx) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx],
    saved: val
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 md:p-0 mb-24 md:mb-0">
      
      {/* Welcome & Main Stat - Spans 2 cols */}
      <div className="md:col-span-2 glass-panel rounded-2xl p-6 flex flex-col justify-between h-48 relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-eco-primary/20 rounded-full blur-3xl group-hover:bg-eco-primary/30 transition-all duration-500"></div>
        <div>
            <h2 className="text-2xl font-bold text-white mb-1">Hello, {user.name.split(' ')[0]}</h2>
            <p className="text-gray-400 text-sm">Your weekly eco-impact is looking great.</p>
        </div>
        <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-white">{user.totalPoints}</span>
            <span className="text-eco-primary mb-2 font-medium text-sm">pts</span>
        </div>
      </div>

      {/* Reduction Stat */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col justify-center gap-2 h-48">
        <div className="flex items-center gap-2 text-eco-accent">
            <ArrowUpRight size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">Reduction</span>
        </div>
        <div className="text-3xl font-bold text-white">{user.weeklyReduction}%</div>
        <p className="text-xs text-gray-400">Lower emissions than last week.</p>
      </div>

      {/* CO2 Stat */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col justify-center gap-2 h-48">
         <div className="flex items-center gap-2 text-rose-400">
            <ArrowDownRight size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">Footprint</span>
        </div>
        <div className="text-3xl font-bold text-white">{user.totalEmission} <span className="text-sm font-normal text-gray-400">kg</span></div>
        <p className="text-xs text-gray-400">Total CO2e this month.</p>
      </div>

      {/* Chart - Spans 3 cols on Desktop */}
      <div className="md:col-span-3 glass-panel rounded-2xl p-6 min-h-[300px] flex flex-col">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">Weekly Carbon Savings (kg)</h3>
        <div className="flex-grow w-full h-full">
            <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0f392b', borderColor: '#34d399', borderRadius: '8px', color: 'white' }}
                        itemStyle={{ color: '#34d399' }}
                    />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <YAxis hide />
                    <Area type="monotone" dataKey="saved" stroke="#34d399" strokeWidth={3} fillOpacity={1} fill="url(#colorSaved)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity List - 1 Col */}
      <div className="md:col-span-1 glass-panel rounded-2xl p-6 flex flex-col">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">Recent</h3>
        <div className="space-y-4 overflow-y-auto max-h-[240px] pr-2 custom-scrollbar">
            {recentActivities.slice(0, 4).map((act, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className={`p-2 rounded-full ${act.co2e < 0 ? 'bg-eco-primary/20 text-eco-primary' : 'bg-rose-500/20 text-rose-400'}`}>
                        {act.category === 'Transport' && <Car size={16} />}
                        {act.category === 'Energy' && <Zap size={16} />}
                        {(act.category === 'Food' || act.category === 'Waste') && <Leaf size={16} />}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-200 truncate w-32">{act.name}</p>
                        <p className="text-xs text-gray-500">{act.co2e > 0 ? `+${act.co2e}` : act.co2e} kg CO2e</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;