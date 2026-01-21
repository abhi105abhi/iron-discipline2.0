import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useHabitStore } from './store/useHabitStore';
import Login from './components/Login';
import ProgressOrbit from './components/ProgressOrbit';
import Heatmap from './components/Heatmap';
import WarriorTemplates from './components/WarriorTemplates';
import Insights from './components/Insights';
import { Shield, Flame, Lock, User, LayoutDashboard, BarChart3, Trash2 } from 'lucide-react';

function App() {
  const { habits, toggleHabit, deleteHabit, userProfile, setUserId, checkTrialStatus } = useHabitStore();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('missions');
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) { setUserId(user.uid); } else { setUserId(null); }
      setLoading(false);
    });
    checkTrialStatus();
    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-blood-600 font-black italic animate-pulse tracking-[0.4em] text-[10px]">SYNCING WARRIOR DATA...</div>
    </div>
  );

  if (!userProfile.uid) return <Login />;

  const completedToday = habits.filter(h => h.completedDays.includes(today)).length;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 pb-32 max-w-md mx-auto font-sans selection:bg-blood-600">
      <header className="flex justify-between items-center mb-8 p-2">
        <div className="flex items-center gap-3">
          <Shield className="text-blood-600 w-6 h-6 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          <h1 className="text-xl font-black uppercase tracking-tighter italic">Iron<span className="text-blood-600">Discipline</span></h1>
        </div>
        <div className="bg-iron-800/50 p-1.5 rounded-full border border-iron-800 flex items-center gap-2 pr-4">
          <div className="w-8 h-8 rounded-full bg-blood-600 flex items-center justify-center font-black text-xs">A</div>
          <span className="text-[10px] font-black uppercase text-iron-500 tracking-widest italic">Warrior</span>
        </div>
      </header>

      <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {activeTab === 'missions' ? (
          <>
            <section className="flex flex-col items-center my-6 bg-gradient-to-br from-iron-800/40 to-black p-10 rounded-[3rem] border border-iron-800/50 relative overflow-hidden group">
               <div className="absolute -top-10 -left-10 w-32 h-32 bg-blood-600/5 blur-[80px] rounded-full"></div>
               <ProgressOrbit completed={completedToday} total={habits.length} />
               <div className="mt-8 text-center">
                 <h2 className="text-2xl font-black uppercase italic tracking-tighter">Daily <span className="text-blood-600">Dominance</span></h2>
                 <p className="text-[10px] text-iron-600 font-bold uppercase tracking-[0.3em] mt-2">{completedToday}/{habits.length} Targets Locked</p>
               </div>
            </section>

            <div className="flex justify-between items-end mb-6 px-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-iron-700 italic underline decoration-blood-600/50 underline-offset-4">Active Siege</h2>
              <Flame className="w-4 h-4 text-orange-600 animate-pulse" />
            </div>
            
            <div className="space-y-4">
              {habits.map(habit => (
                <div key={habit.id} className="bg-iron-900/40 border border-iron-800/80 p-6 flex justify-between items-center rounded-[2rem] group hover:border-blood-600/40 transition-all duration-700">
                  <div className="space-y-4 flex-grow">
                    <div className="flex justify-between items-start pr-4">
                      <h3 className="font-black uppercase italic tracking-tighter text-lg group-hover:text-blood-600 transition-colors duration-500">{habit.name}</h3>
                      <button 
                        onClick={() => { if(window.confirm(`Warrior, confirm termination?`)) deleteHabit(habit.id) }}
                        className="opacity-0 group-hover:opacity-100 text-iron-800 hover:text-blood-600 p-2 transition-all scale-125"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <Heatmap completedDays={habit.completedDays} />
                  </div>
                  <button 
                    onClick={() => toggleHabit(habit.id, today)}
                    className={`w-16 h-16 rounded-[1.25rem] border-2 flex items-center justify-center transition-all duration-500 active:scale-90 ${
                      habit.completedDays.includes(today) 
                        ? 'bg-blood-600 border-blood-600 shadow-[0_15px_35px_rgba(220,38,38,0.4)]' 
                        : 'border-iron-800 bg-black/40 hover:border-blood-600/50'
                    }`}
                  >
                    {habit.completedDays.includes(today) && <span className="text-white font-black text-2xl drop-shadow-lg">✓</span>}
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

      {/* TACTICAL NAVIGATION BAR */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-iron-900/60 border border-iron-700/30 backdrop-blur-3xl flex justify-around p-3 rounded-[2rem] z-40 shadow-[0_25px_50px_rgba(0,0,0,0.8)]">
        <button 
          onClick={() => setActiveTab('missions')}
          className={`flex items-center gap-3 px-8 py-3 rounded-2xl transition-all duration-500 ${activeTab === 'missions' ? 'bg-blood-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'text-iron-600 hover:text-iron-400'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">{activeTab === 'missions' ? 'Siege' : ''}</span>
        </button>
        <button 
          onClick={() => setActiveTab('insights')}
          className={`flex items-center gap-3 px-8 py-3 rounded-2xl transition-all duration-500 ${activeTab === 'insights' ? 'bg-blood-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'text-iron-600 hover:text-iron-400'}`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">{activeTab === 'insights' ? 'War Room' : ''}</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
