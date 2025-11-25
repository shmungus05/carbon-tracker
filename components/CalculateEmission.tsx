import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const CalculateEmission: React.FC = () => {
  const [category, setCategory] = useState<'transport' | 'energy'>('transport');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputValue);
    if (isNaN(val)) return;

    // Mock logic
    let co2 = 0;
    if (category === 'transport') {
        // approx 0.4kg per mile for avg car
        co2 = val * 0.404; 
    } else {
        // approx 0.3kg per kWh
        co2 = val * 0.385;
    }
    setResult(parseFloat(co2.toFixed(2)));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mb-20 md:mb-0">
      <div className="glass-panel rounded-2xl p-8 relative overflow-hidden">
        
        {/* Decorative BG element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg shadow-lg">
                <Calculator className="text-white" size={24} />
            </div>
            <div>
                <h2 className="text-2xl font-bold">Calculator</h2>
                <p className="text-gray-400 text-sm">Estimate impact from usage.</p>
            </div>
        </div>

        <form onSubmit={handleCalculate} className="space-y-6 relative z-10">
            {/* Tabs */}
            <div className="flex p-1 bg-black/20 rounded-xl">
                <button
                    type="button"
                    onClick={() => { setCategory('transport'); setResult(null); }}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${category === 'transport' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                    Transport (Miles)
                </button>
                <button
                    type="button"
                    onClick={() => { setCategory('energy'); setResult(null); }}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${category === 'energy' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                    Energy (kWh)
                </button>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">
                    {category === 'transport' ? 'Distance Driven (Miles)' : 'Electricity Used (kWh)'}
                </label>
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 transition-all text-lg"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/50 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
                Calculate Impact
            </button>
        </form>

        {result !== null && (
            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl animate-fade-in text-center">
                <p className="text-gray-400 text-sm mb-1">Estimated Emission</p>
                <p className="text-4xl font-bold text-white mb-2">{result} <span className="text-lg font-normal text-gray-400">kg CO2e</span></p>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden mt-4">
                    <div 
                        className="h-full bg-gradient-to-r from-green-400 to-rose-500" 
                        style={{ width: `${Math.min(100, (result / 50) * 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-left">
                    {result > 20 ? 'High impact. Consider alternatives.' : 'Moderate impact.'}
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default CalculateEmission;