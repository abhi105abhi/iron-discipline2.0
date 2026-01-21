import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useHabitStore } from './store/useHabitStore';
import Login from './components/Login';
import ProgressOrbit from './components/ProgressOrbit';
import Heatmap from './components/Heatmap';
import WarriorTemplates from './components/WarriorTemplates';
import Insights from './components/Insights';
import Modal from './components/Modal';
import { Flame, Lock, User, LayoutDashboard, BarChart3, Trash2, Edit3, Sword } from 'lucide-react';

function App() {
  const { habits, toggleHabit, deleteHabit, updateHabit, userProfile, setUserId, checkTrialStatus } = useHabitStore();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('missions');
  const [editingHabit, setEditingHabit] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', target: 30 });
  
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) { setUserId(user.uid); } else { setUserId(null); }
      setLoading(false);
    });
    checkTrialStatus();
    return () => unsubscribe();
  }, []);

  const handleEditClick = (habit) => {
    setEditingHabit(habit);
    setEditForm({ name: habit.name, target: habit.targetDays });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateHabit(editingHabit.id, editForm.name, editForm.target);
    setEditingHabit(null);
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-blood-600 font-black italic animate-pulse tracking-[0.5em] text-[10px]">RECALIBRATING...</div>
    </div>
  );

  if (!userProfile.uid) return <Login />;

  const completedToday = habits.filter(h => h.completedDays.includes(today)).length;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 pb-32 max-w-md mx-auto font-sans">
      <header className="flex justify-between items-center mb-10 p-2">
        <div className="flex items-center gap-3">
          {/* NAYA LOGO INTEGRATION */}
          <img 
            src="/logo.png" 
            alt="Iron Discipline Logo" 
            className="w-10 h-10 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] object-contain"
          />
          <h1 className="text-2xl font-black uppercase tracking-tighter italic leading-tight">
            Iron<br/><span className="text-blood-600">Discipline</span>
          </h1>
        </div>
        <div className="bg-iron-800/40 p-1.5 rounded-full border border-iron-800 flex items-center gap-2 pr-4 shadow-inner">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-blood-600/50">
             <img src="/logo.png" className="w-full h-full object-cover" alt="user" />
          </div>
          <span className="text-[10px] font-black uppercase text-iron-400 tracking-widest italic">Commander</span>
        </div>
      </header>

      <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {activeTab === 'missions' ? (
          <>
            <section className="flex flex-col items-center my-6 bg-gradient-to-b from-iron-800/30 to-black p-12 rounded-[3.5rem] border border-iron-800/50 relative overflow-hidden">
               <div className="absolute top-6 right-8 text-[9px] font-black text-iron-700 tracking-widest uppercase italic text-right leading-tight">
                 Siege<br/>Active
               </div>
               <ProgressOrbit completed={completedToday} total={habits.length} />
               <div className="mt-8 text-center">
                 <h2 className="text-3xl font-black uppercase italic tracking-tighter">Day <span className="text-blood-600 italic">One</span></h2>
                 <p className="text-[10px] text-iron-600 font-bold uppercase tracking-[0.4em] mt-3">Objective: {completedToday}/{habits.length} Locked</p>
               </div>
            </section>

            <div className="flex justify-between items-end mb-8 px-5">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-iron-700 italic border-b-2 border-blood-600/30 pb-1">Current Missions</h2>
              <Flame className="w-5 h-5 text-orange-600 animate-pulse" />
            </div>
            
            <div className="space-y-5">
              {habits.map(habit => (
                <div key={habit.id} className="bg-iron-900/60 border border-iron-800/80 p-6 flex justify-between items-center rounded-[2.5rem] group hover:border-blood-600/50 transition-all duration-700 relative overflow-hidden">
                  <div className="space-y-4 flex-grow">
                    <div className="flex justify-between items-start pr-4">
                      <h3 className="font-black uppercase italic tracking-tighter text-xl group-hover:text-blood-600 transition-colors duration-500">{habit.name}</h3>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={() => handleEditClick(habit)} className="text-iron-700 hover:text-white p-2 scale-110"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => { if(window.confirm(`Warrior, confirm termination?`)) deleteHabit(habit.id) }} className="text-iron-700 hover:text-blood-600 p-2 scale-110"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <Heatmap completedDays={habit.completedDays} />
                  </div>
                  <button 
                    onClick={() => toggleHabit(habit.id, today)}
                    className={`w-16 h-16 rounded-[1.5rem] border-2 flex items-center justify-center transition-all duration-500 active:scale-90 ${
                      habit.completedDays.includes(today) 
                        ? 'bg-blood-600 border-blood-600 shadow-[0_15px_40px_rgba(220,38,38,0.5)]' 
                        : 'border-iron-800 bg-black/40 hover:border-blood-600/40'
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

      <Modal isOpen={!!editingHabit} onClose={() => setEditingHabit(null)} title="Reconfigure Mission">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-iron-600 uppercase tracking-widest ml-1">New Objective</label>
            <input 
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full bg-black border border-iron-800 p-4 rounded-xl text-sm font-black uppercase focus:border-blood-600 focus:outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-iron-600 uppercase tracking-widest ml-1">New Target Days</label>
            <input 
              type="number"
              value={editForm.target}
              onChange={(e) => setEditForm({ ...editForm, target: e.target.value })}
              className="w-full bg-black border border-iron-800 p-4 rounded-xl text-sm font-black focus:border-blood-600 focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-blood-600 py-4 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-blood-700 shadow-lg">
            <Sword className="w-4 h-4" /> RECONFIGURE
          </button>
        </form>
      </Modal>

      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[80%] bg-iron-900/40 border border-iron-700/30 backdrop-blur-3xl flex justify-around p-3 rounded-[2.5rem] z-40 shadow-[0_30px_60px_rgba(0,0,0,0.9)]">
        <button onClick={() => setActiveTab('missions')} className={`flex items-center gap-3 px-8 py-3 rounded-2xl transition-all duration-700 ${activeTab === 'missions' ? 'bg-blood-600 text-white shadow-[0_0_25px_rgba(220,38,38,0.5)]' : 'text-iron-700'}`}>
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">{activeTab === 'missions' ? 'Missions' : ''}</span>
        </button>
        <button onClick={() => setActiveTab('insights')} className={`flex items-center gap-3 px-8 py-3 rounded-2xl transition-all duration-700 ${activeTab === 'insights' ? 'bg-blood-600 text-white shadow-[0_0_25px_rgba(220,38,38,0.5)]' : 'text-iron-700'}`}>
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">{activeTab === 'insights' ? 'War Room' : ''}</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
