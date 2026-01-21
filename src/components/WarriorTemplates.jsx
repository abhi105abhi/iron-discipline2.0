import React, { useState } from 'react';
import { Plus, Zap, Sword } from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';
import Modal from './Modal';

const templates = [
  { name: "NO FAP / CELIBACY", target: 90 },
  { name: "100 PUSHUPS DAILY", target: 30 },
  { name: "READ 10 PAGES", target: 21 },
  { name: "MEDITATION (20M)", target: 30 }
];

const WarriorTemplates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customTarget, setCustomTarget] = useState(30);
  const { addHabit } = useHabitStore();

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customName.trim()) {
      addHabit(customName, customTarget);
      setCustomName('');
      setCustomTarget(30);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="mt-8">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full py-5 bg-iron-800/30 border-2 border-dashed border-iron-700 text-iron-500 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:border-blood-600 hover:text-blood-600 transition-all rounded-3xl group"
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        INITIATE NEW MISSION
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Mission Briefing"
      >
        <form onSubmit={handleCustomSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-iron-600 uppercase tracking-widest ml-1">Objective</label>
            <input 
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="ENTER MISSION NAME..."
              className="w-full bg-black border border-iron-800 p-4 rounded-xl text-sm font-black uppercase focus:border-blood-600 focus:outline-none transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-iron-600 uppercase tracking-widest ml-1">Siege Duration (Days)</label>
            <input 
              type="number"
              value={customTarget}
              onChange={(e) => setCustomTarget(e.target.value)}
              className="w-full bg-black border border-iron-800 p-4 rounded-xl text-sm font-black focus:border-blood-600 focus:outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blood-600 py-4 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-blood-700 shadow-[0_10px_20px_rgba(220,38,38,0.2)]"
          >
            <Sword className="w-4 h-4" /> LOCK MISSION
          </button>
        </form>

        <div className="flex items-center gap-2 my-8">
          <div className="h-[1px] bg-iron-800 flex-grow"></div>
          <span className="text-[9px] font-black text-iron-700 uppercase tracking-[0.4em]">Elite Presets</span>
          <div className="h-[1px] bg-iron-800 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
          {templates.map(t => (
            <button
              key={t.name}
              onClick={() => { addHabit(t.name, t.target); setIsModalOpen(false); }}
              className="bg-black/50 p-4 text-left border border-iron-800 hover:border-blood-600 rounded-xl flex justify-between items-center group transition-all"
            >
              <div>
                <span className="font-black uppercase text-[11px] tracking-widest">{t.name}</span>
                <p className="text-[9px] text-blood-600 font-bold mt-0.5 uppercase italic">{t.target} DAYS</p>
              </div>
              <Zap className="w-4 h-4 text-iron-700 group-hover:text-blood-600" />
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default WarriorTemplates;
