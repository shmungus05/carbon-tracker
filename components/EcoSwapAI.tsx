import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Leaf } from 'lucide-react';
import { getEcoSwaps, EcoSwapSuggestion } from '../services/geminiService';

const EcoSwapAI: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<EcoSwapSuggestion | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setSuggestion(null);
    
    // Simulate slight delay for UX if API is instant, mostly to show the loader
    // In real app, just await directly.
    const result = await getEcoSwaps(input);
    
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mb-20 md:mb-0 h-full flex flex-col justify-center">
      <div className="glass-panel rounded-2xl p-1 relative overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Header Area */}
        <div className="p-8 pb-4 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-2xl mb-4 shadow-lg shadow-purple-500/20">
                <Sparkles className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Eco-Swap Recommender</h2>
            <p className="text-gray-400 max-w-md mx-auto">
                Powered by Gemini 2.5. Describe a daily habit, and I'll find sustainable alternatives for you.
            </p>
        </div>

        {/* Content Area */}
        <div className="flex-grow p-6 flex flex-col items-center">
            
            {/* Input Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-xl relative group z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-eco-primary to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative flex items-center bg-slate-900 rounded-xl border border-white/10 p-1">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., I drive a diesel SUV to work alone..."
                        className="flex-grow bg-transparent text-white px-4 py-3 focus:outline-none placeholder-gray-500"
                    />
                    <button 
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
                    </button>
                </div>
            </form>

            {/* Results Display */}
            <div className="w-full mt-8 max-w-2xl">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400 space-y-4">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-eco-primary/30 border-t-eco-primary rounded-full animate-spin"></div>
                            <Leaf className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-eco-primary w-4 h-4" />
                        </div>
                        <p className="animate-pulse">Analyzing footprint & searching swaps...</p>
                    </div>
                )}

                {suggestion && (
                    <div className="animate-fade-in space-y-6">
                        <div className="text-center mb-6">
                            <span className="text-xs uppercase tracking-widest text-gray-500">Analysis of</span>
                            <h3 className="text-xl font-medium text-white">"{suggestion.originalAction}"</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {suggestion.alternatives.map((alt, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors flex flex-col h-full">
                                    <div className="mb-3">
                                        <div className="text-xs text-eco-primary font-bold uppercase tracking-wider mb-1">Option {i + 1}</div>
                                        <h4 className="font-bold text-lg text-white leading-tight">{alt.title}</h4>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4 flex-grow">{alt.description}</p>
                                    <div className="mt-auto pt-4 border-t border-white/5">
                                        <div className="text-xs text-gray-500 mb-1">Impact</div>
                                        <div className="text-sm text-eco-accent font-semibold">{alt.impact}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default EcoSwapAI;