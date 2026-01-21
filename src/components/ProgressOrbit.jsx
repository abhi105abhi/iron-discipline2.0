import React from 'react';

const ProgressOrbit = ({ completed, total }) => {
  const percentage = total === 0 ? 0 : (completed / total) * 100;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      {/* Background Circle (The Iron Ring) */}
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-iron-800"
        />
        {/* Progress Circle (The Blood Flow) */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          style={{ 
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 0.8s ease-in-out'
          }}
          strokeLinecap="round"
          className="text-blood-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
        />
      </svg>
      
      {/* Percentage Center */}
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-black italic">{Math.round(percentage)}%</span>
        <span className="text-[8px] font-bold uppercase tracking-widest text-iron-500">Grit</span>
      </div>
    </div>
  );
};

export default ProgressOrbit;
