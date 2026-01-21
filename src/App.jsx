import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useHabitStore } from './store/useHabitStore';
import Login from './components/Login';
import ProgressOrbit from './components/ProgressOrbit'; // Don't forget this!
import Heatmap from './components/Heatmap';
import WarriorTemplates from './components/WarriorTemplates';
import { Shield, Flame, Lock } from 'lucide-react';

function App() {
  const { habits, toggleHabit, userProfile, setUserId, checkTrialStatus } = useHabitStore();
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setLoading(false);
    });

    checkTrialStatus();
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen bg-iron-900 flex items-center justify-center text-blood-600 font-black italic">LOADING...</div>;

  // Agar user logged in nahi hai
  if (!userProfile.uid) return <Login />;

  // Paywall Logic (If 15 days over)
  if (userProfile.trialEnded && !userProfile.isPremium) {
    return (
      <div className="min-h-screen bg-iron-900 flex items-center justify-center p-6 text-center">
        <div className="border-2 border-blood-600 p-8 max-w-sm">
          <Lock className="w-16 h-16 text-blood-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black uppercase italic">Trial Over</h2>
          <p className="text-iron-500 my-4 text-sm">15 days of discipline is enough for a trial. Pay ₹99 for Lifetime Access.</p>
          <a 
            href="https://instagram.com/yourhandle" 
            className="block w-full py-3 bg-blood-600 font-bold uppercase tracking-widest text-white"
          >
            DM to Unlock (₹99)
          </a>
        </div>
      </div>
    );
  }

  // Dashboard calculations
  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completedDays.includes(today)).length;

  return (
    <div className="min-h-screen bg-iron-900 text-white p-4 pb-20 max-w-md mx-auto">
      {/* Header section... (Same as before) */}
      
      <main>
        {/* Step 10 wala Progress Orbit yahan daalna hai */}
        <div className="flex flex-col items-center my-8 bg-iron-800/30 p-6 rounded-xl border border-iron-800">
           <ProgressOrbit completed={completedToday} total={totalHabits} />
           <p className="mt-4 text-xs font-bold uppercase tracking-widest text-iron-500">Daily Dominance</p>
        </div>

        {/* Habits List & Templates (Same as your screenshot) */}
        <div className="space-y-4 mt-6">
           {/* map habits here... */}
        </div>
        <WarriorTemplates />
      </main>
    </div>
  );
}

export default App;
