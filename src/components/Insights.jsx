import React from 'react';
import { useHabitStore } from '../store/useHabitStore';
import ProgressOrbit from './ProgressOrbit';
import { Trophy, Target, Zap, TrendingUp } from 'lucide-react';

const Insights = () => {
  const { habits } = useHabitStore();

  const totalPossible = habits.reduce((acc, h) => acc + h.targetDays, 0);
  const totalDone = habits.reduce((acc, h) => acc + h.completedDays.length, 0);
  const overallProgress = totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0;

  return (
    <div className="space-y-8 pb-10">
      {/* Overall Score Card */}
      <div className="bg-gradient-to-br from-iron-800 to-iron-900 p-6 border border-blood-600/30 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-blood-600 font-black italic uppercase tracking-tighter text-sm">Warrior Level</h2>
            <p className="text-4xl font-black italic uppercase">{overallProgress}% <span className="text-xs text-iron-500">Grit</span></p>
          </div>
          <Trophy className="w-12 h-12 text-blood-600 opacity-50" />
        </div>
        <div className="mt-4 h-1 bg-iron-700 rounded-full overflow-hidden">
          <div className="h-full bg-blood-600 transition-all duration-1000" style={{ width: `${overallProgress}%` }}></div>
        </div>
      </div>

      {/* Individual Habit Rings */}
      <div className="grid grid-cols-2 gap-4">
        {habits.map(habit => (
          <div key={habit.id} className="bg-iron-800/50 p-4 border border-iron-800 rounded-xl flex flex-col items-center text-center">
            <ProgressOrbit completed={habit.completedDays.length} total={habit.targetDays} />
            <h3 className="mt-3 text-[10px] font-black uppercase tracking-widest leading-tight h-8 flex items-center">{habit.name}</h3>
            <div className="mt-2 text-[9px] font-bold text-iron-500 uppercase">
              {habit.completedDays.length} / {habit.targetDays} Days
            </div>
          </div>
        ))}
      </div>

      {/* Meta Stats */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-4 bg-iron-800/20 p-4 border-l-2 border-orange-500">
          <Zap className="text-orange-500 w-5 h-5" />
          <div>
            <p className="text-[10px] font-bold text-iron-600 uppercase">Current Dominance Score</p>
            <p className="font-black italic text-lg">{totalDone * 10} XP</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-iron-800/20 p-4 border-l-2 border-blood-600">
          <TrendingUp className="text-blood-600 w-5 h-5" />
          <div>
            <p className="text-[10px] font-bold text-iron-600 uppercase">Active Missions</p>
            <p className="font-black italic text-lg">{habits.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
