import React, { useState } from 'react';
import { Plus, Zap, Sword, Target } from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';

const templates = [
  { name: "NO FAP / CELIBACY", target: 90 },
  { name: "100 PUSHUPS DAILY", target: 30 },
  { name: "READ 10 PAGES", target: 21 },
  { name: "MEDITATION (20M)", target: 30 }
];

const WarriorTemplates = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customTarget, setCustomTarget] = useState(30);
  const { addHabit } = useHabitStore();

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customName.trim()) {
      addHabit(customName, customTarget);
      setCustomName('');
      setCustomTarget(30);
      setIsOpen(false);
    }
  };

  return (
    <div className="mt-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 border-2 border-dashed border-iron-700 text-iron-500 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:border-blood-600 hover:text-blood-600 transition-all bg-iron-800/20"
      >
        <Plus className="w-5 h-5" />
        {isOpen ? 'CANCEL MISSION' : 'ADD NEW MISSION'}
      </button>

      {isOpen && (
        <div className="mt-4 p-6 bg-iron-800/80 border border-iron-700 rounded-2xl animate-in fade-in zoom-in duration-300">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blood-600 mb-4">Mission Briefing</h3>
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-iron-500 uppercase tracking-widest ml-1">Objective Name</label>
              <input 
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="E.G. COLD SHOWER"
                className="w-full bg-iron-900 border border-iron-700 p-4 text-sm font-black uppercase focus:border-blood-600 focus:outline-none transition-all placeholder:text-iron-800"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-iron-500 uppercase tracking-widest ml-1">Target Duration (Days)</label>
              <div className="flex items-center gap-3">
                <input 
                  type="number"
                  value={customTarget}
                  onChange={(e) => setCustomTarget(e.target.value)}
                  className="w-1/2 bg-iron-900 border border-iron-700 p-4 text-sm font-black focus:border-blood-600 focus:outline-none"
                />
                <button 
                  type="submit"
                  className="w-1/2 bg-blood-600 py-4 font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-blood-700 active:scale-95 transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                >
                  <Sword className="w-4 h-4" /> LOCK IN
                </button>
              </div>
            </div>
          </form>

          <div className="flex items-center gap-2 my-6">
            <div className="h-[1px] bg-iron-700 flex-grow"></div>
            <span className="text-[8px] font-black text-iron-600 uppercase tracking-[0.4em]">Warrior Presets</span>
            <div className="h-[1px] bg-iron-700 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {templates.map(t => (
              <button
                key={t.name}
                onClick={() => { addHabit(t.name, t.target); setIsOpen(false); }}
                className="bg-iron-900/50 p-4 text-left border border-iron-700 hover:border-blood-600 flex justify-between items-center group transition-all"
              >
                <div>
                  <span className="font-black uppercase text-[11px] tracking-widest">{t.name}</span>
                  <p className="text-[9px] text-iron-600 font-bold mt-1 uppercase italic">{t.target} DAY SIEGE</p>
                </div>
                <Zap className="w-4 h-4 text-iron-700 group-hover:text-blood-600" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WarriorTemplates;
