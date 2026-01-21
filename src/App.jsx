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
      <div className="text-blood-600 font-black italic animate-pulse tracking-[0.3em] text-xs">COMMENCING SYSTEM...</div>
    </div>
  );

  if (!userProfile.uid) return <Login />;

  const completedToday = habits.filter(h => h.completedDays.includes(today)).length;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 pb-28 max-w-md mx-auto font-sans selection:bg-blood-600">
      <header className="flex justify-between items-center mb-8 bg-iron-900/50 p-4 rounded-2xl border border-iron-800 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blood-600/10 rounded-lg">
            <Shield className="text-blood-600 w-5 h-5 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
          </div>
          <h1 className="text-lg font-black uppercase tracking-tighter italic leading-none">Iron<br/><span className="text-blood-600">Discipline</span></h1>
        </div>
        <div className="flex gap-2">
          <div className="bg-iron-800/80 px-4 py-2 rounded-xl border border-iron-700 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-black">{completedToday}</span>
          </div>
        </div>
      </header>

      <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {activeTab === 'missions' ? (
          <>
            <section className="relative group flex flex-col items-center my-6 bg-gradient-to-b from-iron-800/40 to-transparent p-8 rounded-[2.5rem] border border-iron-800/50">
               <div className="absolute top-4 right-6 text-[10px] font-black text-iron-700 tracking-widest uppercase">Portal Status</div>
               <ProgressOrbit completed={completedToday} total={habits.length} />
               <div className="mt-6 text-center">
                 <h2 className="text-2xl font-black uppercase italic tracking-tighter">Day One <span className="text-iron-600 text-lg">or One Day</span></h2>
                 <p className="text-[10px] text-iron-500 font-bold uppercase tracking-[0.25em] mt-1">{completedToday}/{habits.length} Missions Secured</p>
               </div>
            </section>

            <div className="flex justify-between items-end mb-6 px-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-iron-600">Current Siege</h2>
              <span className="text-[9px] text-iron-700 font-bold uppercase tracking-widest">Efficiency</span>
            </div>
            
            <div className="space-y-4">
              {habits.map(habit => (
                <div key={habit.id} className="bg-iron-800/30 border border-iron-800/50 p-5 flex justify-between items-center rounded-3xl group hover:border-blood-600/30 transition-all duration-500">
                  <div className="space-y-4 flex-grow">
                    <div className="flex justify-between items-start pr-4">
                      <h3 className="font-black uppercase italic tracking-tight text-lg group-hover:text-blood-600 transition-colors duration-500">{habit.name}</h3>
                      <button 
                        onClick={() => { if(window.confirm(`Warrior, terminate mission?`)) deleteHabit(habit.id) }}
                        className="opacity-0 group-hover:opacity-100 text-iron-700 hover:text-blood-600 p-2 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <Heatmap completedDays={habit.completedDays} />
                  </div>
                  <button 
                    onClick={() => toggleHabit(habit.id, today)}
                    className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 active:scale-90 ${
                      habit.completedDays.includes(today) 
                        ? 'bg-blood-600 border-blood-600 shadow-[0_10px_30px_rgba(220,38,38,0.4)]' 
                        : 'border-iron-700 bg-iron-900/50 hover:border-blood-600'
                    }`}
                  >
                    {habit.completedDays.includes(today) && <span className="text-white font-black text-2xl">✓</span>}
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

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-iron-900/80 border border-iron-700/50 backdrop-blur-2xl flex justify-around p-3 rounded-3xl z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => setActiveTab('missions')}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 ${activeTab === 'missions' ? 'bg-blood-600 text-white shadow-lg' : 'text-iron-500'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">{activeTab === 'missions' ? 'Missions' : ''}</span>
        </button>
        <button 
          onClick={() => setActiveTab('insights')}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 ${activeTab === 'insights' ? 'bg-blood-600 text-white shadow-lg' : 'text-iron-500'}`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">{activeTab === 'insights' ? 'Insights' : ''}</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
