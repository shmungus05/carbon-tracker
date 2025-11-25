import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Leaf, Calculator, Trophy, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'log', label: 'Log', icon: Leaf },
    { id: 'calculate', label: 'Calc', icon: Calculator },
    { id: 'leaderboard', label: 'Rank', icon: Trophy },
    { id: 'ai-swap', label: 'AI Swap', icon: Sparkles },
  ];

  return (
    <>
      {/* Desktop Navbar (Top Sticky) */}
      <nav className="hidden md:flex sticky top-0 z-50 w-full glass-panel border-x-0 border-t-0 border-b mb-6">
        <div className="max-w-7xl mx-auto px-6 h-16 w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Leaf className="text-eco-primary w-6 h-6 fill-current" />
                <span className="font-bold text-xl tracking-tight">EcoPulse</span>
            </div>
            
            <div className="flex gap-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id as ViewState)}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium
                            ${currentView === item.id 
                                ? 'bg-eco-primary/20 text-eco-primary border border-eco-primary/30' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'}
                        `}
                    >
                        <item.icon size={16} />
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
      </nav>

      {/* Mobile Navbar (Bottom Fixed) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-b-0 border-x-0 border-t pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setView(item.id as ViewState)}
                    className={`
                        flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 w-full
                        ${currentView === item.id 
                            ? 'text-eco-primary' 
                            : 'text-gray-400 hover:text-gray-200'}
                    `}
                >
                    <item.icon size={20} className={currentView === item.id ? "fill-current/20" : ""} />
                    <span className="text-[10px] font-medium mt-1">{item.label}</span>
                </button>
            ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;