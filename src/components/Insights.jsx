import React from 'react';
import { useHabitStore } from '../store/useHabitStore';
import ProgressOrbit from './ProgressOrbit';
import { Trophy, Target, Zap, TrendingUp, ChevronRight, Activity } from 'lucide-react';

const Insights = () => {
  const { habits, getWarriorTitle } = useHabitStore();

  const totalPossible = habits.reduce((acc, h) => acc + h.targetDays, 0);
  const totalDone = habits.reduce((acc, h) => acc + h.completedDays.length, 0);
  const overallProgress = totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0;
  const title = getWarriorTitle(overallProgress);

  // Master Heatmap Logic: Aggregating all habits
  const getIntensity = (date) => {
    const count = habits.filter(h => h.completedDays.includes(date)).length;
    if (count === 0) return 'bg-iron-800';
    const ratio = count / habits.length;
    if (ratio <= 0.33) return 'bg-blood-900';
    if (ratio <= 0.66) return 'bg-blood-700';
    return 'bg-blood-600 shadow-[0_0_8px_rgba(220,38,38,0.4)]';
  };

  const generateYearDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 83; i >= 0; i--) { // Showing last 12 weeks for mobile view
      const d = new Date();
      d.setDate(today.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-700">
      {/* Master Heatmap Section */}
      <section className="bg-iron-900/50 border border-iron-800 p-6 rounded-[2rem]">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-4 h-4 text-blood-600" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-iron-500">Consistency Matrix</h3>
        </div>
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 justify-start overflow-x-auto pb-2 custom-scrollbar">
          {generateYearDates().map(date => (
            <div 
              key={date} 
              className={`w-3 h-3 rounded-[2px] transition-colors duration-500 ${getIntensity(date)}`}
              title={date}
            />
          ))}
        </div>
        <p className="mt-4 text-[8px] text-iron-700 font-bold uppercase tracking-widest text-center">
          Darker Red = Higher Discipline
        </p>
      </section>

      {/* Overall Status Card */}
      <div className="bg-gradient-to-br from-iron-800 to-iron-900 p-8 border border-blood-600/20 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-blood-600 font-black italic uppercase tracking-[0.2em] text-[10px] mb-1">Rank</h2>
            <p className="text-5xl font-black italic uppercase tracking-tighter">{title}</p>
            <p className="text-xs text-iron-500 font-bold mt-2 uppercase tracking-widest">{overallProgress}% Combat Readiness</p>
          </div>
          <Trophy className="w-16 h-16 text-blood-600 opacity-20 rotate-12" />
        </div>
        <div className="mt-8 h-2.5 bg-black/40 rounded-full overflow-hidden border border-iron-800">
          <div 
            className="h-full bg-blood-600 shadow-[0_0_20px_rgba(220,38,38,0.6)] transition-all duration-1000 ease-out" 
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Habit Orbits Grid */}
      <div className="grid grid-cols-2 gap-4">
        {habits.map(habit => (
          <div key={habit.id} className="bg-iron-800/20 p-5 border border-iron-800/50 rounded-3xl flex flex-col items-center text-center backdrop-blur-sm">
            <ProgressOrbit completed={habit.completedDays.length} total={habit.targetDays} />
            <h3 className="mt-4 text-[10px] font-black uppercase tracking-widest leading-tight h-8">{habit.name}</h3>
            <div className="mt-2 text-[10px] font-black text-iron-500">
              <span className="text-blood-600">{habit.completedDays.length}</span> / {habit.targetDays} <span className="text-[8px]">DAYS</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-iron-800/10 border border-iron-800 p-6 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Zap className="text-orange-500 w-6 h-6" />
            <div>
              <p className="text-[9px] font-bold text-iron-600 uppercase tracking-widest">Grit XP</p>
              <p className="font-black italic text-2xl uppercase tracking-tighter">{totalDone * 100}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-iron-800" />
        </div>
      </div>
    </div>
  );
};

export default Insights;
