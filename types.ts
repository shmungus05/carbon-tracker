export interface User {
  id: string;
  name: string;
  totalPoints: number;
  weeklyReduction: number;
  isCurrentUser: boolean;
  dailyLog: number[]; // Array of CO2 saved/logged over 7 days
  totalEmission: number;
}

export interface Activity {
  id: number;
  name: string;
  category: 'Transport' | 'Food' | 'Waste' | 'Energy';
  co2e: number; // Positive = Emission, Negative = Reduction
  points: number;
}

export type ViewState = 'dashboard' | 'log' | 'calculate' | 'leaderboard' | 'ai-swap';

// --- MOCK DATA ---

export const MOCK_USERS: User[] = [
  { 
    id: 'user_1', 
    name: 'You (Dev)', 
    totalPoints: 1250, 
    weeklyReduction: 45, 
    isCurrentUser: true, 
    dailyLog: [15, 12, 10, 8, 9, 11, 7], 
    totalEmission: 72 
  },
  { 
    id: 'user_2', 
    name: 'Jane Doe', 
    totalPoints: 1100, 
    weeklyReduction: 38, 
    isCurrentUser: false, 
    dailyLog: [10, 10, 5, 8, 5, 12, 6],
    totalEmission: 98 
  },
  { 
    id: 'user_3', 
    name: 'Eco_Warrior', 
    totalPoints: 950, 
    weeklyReduction: 30, 
    isCurrentUser: false, 
    dailyLog: [5, 8, 5, 5, 5, 5, 5],
    totalEmission: 110 
  },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 1, name: 'Drive Car (50 mi)', category: 'Transport', co2e: 12.5, points: 20 },
  { id: 2, name: 'Take Public Transit (50 mi)', category: 'Transport', co2e: 4.0, points: 50 },
  { id: 3, name: 'Vegan Meal', category: 'Food', co2e: 0.5, points: 30 },
  { id: 4, name: 'Beef Meal', category: 'Food', co2e: 15.0, points: 10 },
  { id: 5, name: 'Recycle 1 Week Waste', category: 'Waste', co2e: -5.0, points: 75 },
  { id: 6, name: 'Reduce Energy Use (1 day)', category: 'Energy', co2e: -3.0, points: 40 },
];
