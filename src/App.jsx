import React, { useEffect } from 'react';
import { Shield, Flame, Lock } from 'lucide-react';
import { useHabitStore } from './store/useHabitStore';
import Heatmap from './components/Heatmap';

function App() {
  const { habits, toggleHabit, userProfile, checkTrialStatus } = useHabitStore();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    checkTrialStatus();
  }, []);

  if (userProfile.trialEnded && !userProfile.isPremium) {
    return (
      <div className="min-h-screen bg-iron-900 flex items-center justify-center p-6 text-center">
        <div className="border-2 border-blood-600 p-8 max-w-sm">
          <Lock className="w-16 h-16 text-blood-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black uppercase italic">Trial Over</h2>
          <p className="text-iron-500 my-4">15 din ho gaye, par discipline nahi aaya? Pay ₹99 to unlock your destiny.</p>
          <button className="w-full py-3 bg-blood-600 font-bold uppercase tracking-widest">Pay Now (DM Instagram)</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-iron-900 text-white p-4 pb-20">
      <header className="flex justify-between items-center mb-10 border-b border-iron-800 pb-4">
        <div className="flex items-center gap-2">
          <Shield className="text-blood-600 w-6 h-6" />
          <h1 className="text-xl font-black uppercase tracking-tighter italic">Iron Discipline</h1>
        </div>
        <div className="bg-iron-800 px-3 py-1 rounded-full flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-bold">STREAK: 05</span>
        </div>
      </header>

      <main className="space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-iron-500">Active Missions</h2>
        
        {habits.map(habit => (
          <div key={habit.id} className="bg-iron-800 border-l-4 border-blood-600 p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{habit.name}</h3>
              <Heatmap completedDays={habit.completedDays} />
            </div>
            <button 
              onClick={() => toggleHabit(habit.id, today)}
              className={`w-12 h-12 flex items-center justify-center border-2 transition-all ${
                habit.completedDays.includes(today) 
                  ? 'bg-blood-600 border-blood-600' 
                  : 'border-iron-700'
              }`}
            >
              {habit.completedDays.includes(today) ? '✔' : ''}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
