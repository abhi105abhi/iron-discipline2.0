import React, { useState } from 'react';
import { Plus, Zap } from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';

const templates = [
  "No Fap / Celibacy",
  "100 Pushups Daily",
  "Read 10 Pages",
  "Meditation (20m)",
  "No Junk Food",
  "Cold Shower"
];

const WarriorTemplates = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addFromTemplate } = useHabitStore();

  return (
    <div className="mt-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 border-2 border-dashed border-iron-700 text-iron-500 font-bold flex items-center justify-center gap-2 hover:border-blood-600 hover:text-blood-600 transition-all"
      >
        <Plus className="w-5 h-5" />
        ADD NEW MISSION
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 gap-2 mt-4 animate-in fade-in slide-in-from-top-4">
          {templates.map(t => (
            <button
              key={t}
              onClick={() => {
                addFromTemplate(t);
                setIsOpen(false);
              }}
              className="bg-iron-800 p-4 text-left border-l-2 border-transparent hover:border-blood-600 flex justify-between items-center group"
            >
              <span className="font-bold uppercase text-sm tracking-widest">{t}</span>
              <Zap className="w-4 h-4 text-iron-700 group-hover:text-blood-600" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WarriorTemplates;
