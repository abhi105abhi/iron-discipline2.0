import React, { useState } from 'react';
import { Plus, Zap, Sword } from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';

const templates = [
  "No Fap / Celibacy",
  "100 Pushups Daily",
  "Read 10 Pages",
  "Meditation (20m)",
  "No Junk Food"
];

const WarriorTemplates = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const { addHabit } = useHabitStore();

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customName.trim()) {
      addHabit(customName);
      setCustomName('');
      setIsOpen(false);
    }
  };

  return (
    <div className="mt-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 border-2 border-dashed border-iron-700 text-iron-500 font-bold flex items-center justify-center gap-2 hover:border-blood-600 hover:text-blood-600 transition-all"
      >
        <Plus className="w-5 h-5" />
        {isOpen ? 'CLOSE PORTAL' : 'ADD NEW MISSION'}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-4">
          {/* CUSTOM INPUT FIELD */}
          <form onSubmit={handleCustomSubmit} className="relative group">
            <input 
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="ENTER CUSTOM MISSION..."
              className="w-full bg-iron-900 border-2 border-iron-700 p-4 pr-12 text-sm font-black uppercase tracking-widest focus:border-blood-600 focus:outline-none transition-all"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-3 bg-iron-800 text-blood-600 group-focus-within:bg-blood-600 group-focus-within:text-white transition-all"
            >
              <Sword className="w-5 h-5" />
            </button>
          </form>

          <div className="flex items-center gap-2 py-2">
            <div className="h-[1px] bg-iron-800 flex-grow"></div>
            <span className="text-[10px] font-bold text-iron-700 tracking-[0.3em]">OR ELITE TEMPLATES</span>
            <div className="h-[1px] bg-iron-800 flex-grow"></div>
          </div>

          {/* TEMPLATE LIST */}
          <div className="grid grid-cols-1 gap-2">
            {templates.map(t => (
              <button
                key={t}
                onClick={() => {
                  addHabit(t);
                  setIsOpen(false);
                }}
                className="bg-iron-800 p-4 text-left border-l-2 border-transparent hover:border-blood-600 flex justify-between items-center group active:scale-95 transition-all"
              >
                <span className="font-bold uppercase text-xs tracking-widest">{t}</span>
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
