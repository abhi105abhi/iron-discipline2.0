import React from 'react';

const Heatmap = ({ completedDays }) => {
  // Aaj se pichle 7 din nikalne ka logic
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  return (
    <div className="flex gap-2 items-center">
      {last7Days.map(date => {
        const isDone = completedDays.includes(date);
        return (
          <div 
            key={date}
            className={`w-4 h-4 rounded-sm transition-all duration-500 ${
              isDone 
                ? 'bg-blood-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' 
                : 'bg-iron-700'
            }`}
            title={date}
          />
        );
      })}
    </div>
  );
};

export default Heatmap;
