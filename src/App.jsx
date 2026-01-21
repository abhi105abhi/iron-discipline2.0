import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useHabitStore } from './store/useHabitStore';
import Login from './components/Login';
import ProgressOrbit from './components/ProgressOrbit';
import Heatmap from './components/Heatmap';
import WarriorTemplates from './components/WarriorTemplates';
import Insights from './components/Insights';
import { Shield, Flame, Lock, User, LayoutDashboard, BarChart3 } from 'lucide-react';

function App() {
  const { habits, toggleHabit, userProfile, setUserId, checkTrialStatus } = useHabitStore();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('missions');
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
      <div className="text-blood-600 font-black italic animate-pulse tracking-widest">INITIALIZING PORTAL...</div>
    </div>
  );

  if (!userProfile.uid) return <Login />;

  if (userProfile.trialEnded && !userProfile.isPremium) {
    return (
      <div className="min-h-screen bg-iron-900 flex items-center justify-center p-6 text-center animate-in zoom-in duration-500">
        <div className="border-2 border-blood-600 p-8 max-w-sm bg-iron-800/50 backdrop-blur-md">
          <Lock className="w-16 h-16 text-blood-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Trial Over</h2>
          <p className="text-iron-500 my-4 text-sm font-bold uppercase">15 DAYS OF MERCY IS OVER. PAY TO BECOME A WARRIOR.</p>
          <a 
            href="https://instagram.com/yourhandle" 
            className="block w-full py-4 bg-blood-600 font-black uppercase tracking-widest text-white hover:bg-blood-700 shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all"
          >
            UNLOCK PORTAL (₹99)
          </a>
        </div>
      </div>
    );
  }

  const completedToday = habits.filter(h => h.completedDays.includes(today)).length;

  return (
    <div className="min-h-screen bg-iron-900 text-white p-4 pb-24 max-w-md mx-auto font-sans">
      <header className="flex justify-between items-center mb-6 border-b border-iron-800 pb-4">
        <div className="flex items-center gap-2">
          <Shield className="text-blood-600 w-6 h-6 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
          <h1 className="text-xl font-black uppercase tracking-tighter italic">Iron Discipline</h1>
        </div>
        <div className="flex gap-3">
          <div className="bg-iron-800 px-3 py-1 rounded-full border border-iron-700 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-black tracking-tighter">05</span>
          </div>
          <User className="w-6 h-6 text-iron-500" />
        </div>
      </header>

      <main className="animate-in fade-in slide-in-from-bottom-2 duration-700">
        {activeTab === 'missions' ? (
          <>
            <section className="flex flex-col items-center my-8 bg-iron-800/20 p-6 rounded-2xl border border-iron-800/50 backdrop-blur-sm shadow-xl">
               <ProgressOrbit completed={completedToday} total={habits.length} />
               <h2 className="mt-4 text-lg font-black uppercase italic tracking-tighter">Daily Target</h2>
               <p className="text-[10px] text-iron-500 font-black uppercase tracking-[0.2em]">{completedToday}/{habits.length} Missions Secured</p>
            </section>

            <div className="flex justify-between items-end mb-6 px-1">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-iron-600">Active Missions</h2>
              <span className="text-[9px] text-iron-700 font-bold uppercase tracking-widest">Last 7 Days</span>
            </div>
            
            <div className="space-y-4">
              {habits.map(habit => (
                <div key={habit.id} className="bg-iron-800 border-l-4 border-blood-600 p-4 flex justify-between items-center shadow-xl group hover:bg-iron-700/30 transition-all">
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
          </>
        ) : (
          <Insights />
        )}
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 w-full bg-iron-900/95 border-t border-iron-800/50 backdrop-blur-xl flex justify-around p-3 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => setActiveTab('missions')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'missions' ? 'text-blood-600 scale-110' : 'text-iron-500'}`}
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-widest">Missions</span>
        </button>
        <button 
          onClick={() => setActiveTab('insights')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'insights' ? 'text-blood-600 scale-110' : 'text-iron-500'}`}
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-widest">Insights</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
