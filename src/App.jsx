import React from 'react';
import { Shield } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-iron-900 p-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Shield className="w-16 h-16 text-blood-600" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">
          Iron <span className="text-blood-600 text-5xl">Discipline</span>
        </h1>
        <p className="mt-4 text-iron-500 font-medium tracking-widest uppercase text-sm">
          Aukat Check: Day 01 / 15
        </p>
        <button className="mt-8 px-8 py-3 bg-blood-600 hover:bg-blood-700 text-white font-bold rounded-none skew-x-[-12deg] transition-all">
          ENTER PORTAL
        </button>
      </div>
    </div>
  );
}

export default App;
