import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useHabitStore } from './store/useHabitStore';
import Login from './components/Login';
import ProgressOrbit from './components/ProgressOrbit';
import Heatmap from './components/Heatmap';
import WarriorTemplates from './components/WarriorTemplates';
import { Shield, Flame, Lock, User } from 'lucide-react';

function App() {
  const { habits, toggleHabit, userProfile, setUserId, checkTrialStatus } = useHabitStore();
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setLoading(false);
    });

    checkTrialStatus();
    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-iron-900 flex items-center justify-center">
      <div className="text-blood-600 font-black italic animate-pulse tracking-widest">LOADING PORTAL...</div>
    </div>
  );

  if (!userProfile.uid) return <Login />;

  if (userProfile.trialEnded && !userProfile.isPremium) {
    return (
      <div className="min-h-screen bg-iron-900 flex items-center justify-center p-6 text-center">
        <div className="border-2 border-blood-600 p-8 max-w-sm bg-iron-800/50">
          <Lock className="w-16 h-16 text-blood-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black uppercase italic">Trial Over</h2>
          <p className="text-iron-500 my-4 text-sm font-bold">15 DAYS EXPIRED. SHOW YOUR GRIT OR QUIT.</p>
          <a 
            href="https://instagram.com/yourhandle" 
            className="block w-full py-4 bg-blood-600 font-black uppercase tracking-widest text-white hover:bg-blood-700 transition-all"
          >
            UNLOCK DESTINY (₹99)
          </a>
        </div>
      </div>
    );
  }

  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completedDays.includes(today)).length;

  return (
    <div className="min-h-screen bg-iron-900 text-white p-4 pb-24 max-w-md mx-auto font-sans">
      <header className="flex justify-between items-center mb-6 border-b border-iron-800 pb-4">
        <div className="flex items-center gap-2">
          <Shield className="text-blood-600 w-6 h-6" />
          <h1 className="text-xl font-black uppercase tracking-tighter italic">Iron Discipline</h1>
        </div>
        <div className="flex gap-3">
          <div className="bg-iron-800 px-3 py-1 rounded-full flex items-center gap-2 border border-iron-700">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-black">05</span>
          </div>
          <User className="w-6 h-6 text-iron-500" />
        </div>
      </header>

      <main>
        <section className="flex flex-col items-center my-8 bg-iron-800/20 p-6 rounded-2xl border border-iron-800/50 backdrop-blur-sm">
           <ProgressOrbit completed={completedToday} total={totalHabits} />
           <h2 className="mt-4 text-lg font-black uppercase italic tracking-tighter">Daily Dominance</h2>
           <p className="text-[10px] text-iron-500 font-bold uppercase tracking-[0.2em]">{completedToday}/{totalHabits} Missions Secured</p>
        </section>

        <div className="flex justify-between items-end mb-6 px-1">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-iron-500">Active Missions</h2>
          <span className="text-[10px] text-iron-700 font-bold uppercase tracking-widest">Last 7 Days</span>
        </div>
        
        {/* ASLI FIX YAHAN HAI: Mapping the habits properly */}
        <div className="space-y-4">
          {habits.map(habit => (
            <div key={habit.id} className="bg-iron-800 border-l-4 border-blood-600 p-4 flex justify-between items-center shadow-xl group transition-all hover:bg-iron-700/50">
              <div className="space-y-3">
                <h3 className="font-black uppercase italic tracking-tight text-lg group-hover:text-blood-600 transition-colors">{habit.name}</h3>
                <Heatmap completedDays={habit.completedDays} />
              </div>
              <button 
                onClick={() => toggleHabit(habit.id, today)}
                className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-300 active:scale-90 ${
                  habit.completedDays.includes(today) 
                    ? 'bg-blood-600 border-blood-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
                    : 'border-iron-700 hover:border-blood-600'
                }`}
              >
                {habit.completedDays.includes(today) && <span className="text-white font-bold text-xl">✓</span>}
              </button>
            </div>
          ))}
        </div>

        <WarriorTemplates />
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-4 bg-iron-900/90 backdrop-blur-lg border-t border-iron-800">
        <p className="text-[9px] text-center text-iron-600 font-black uppercase tracking-[0.4em]">
          EITHER YOU RUN THE DAY OR THE DAY RUNS YOU.
        </p>
      </footer>
    </div>
  );
}

export default App;
