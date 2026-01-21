import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useHabitStore } from '../store/useHabitStore';

const Login = () => {
  const { setUserId } = useHabitStore();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUserId(result.user.uid);
    } catch (error) {
      console.error("Warrior, Entry Denied:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 text-center selection:bg-blood-600">
      <div className="relative group">
        {/* GLOW EFFECT BEHIND LOGO */}
        <div className="absolute inset-0 bg-blood-600/20 blur-[60px] rounded-full group-hover:bg-blood-600/40 transition-all duration-1000"></div>
        <img 
          src="/logo.png" 
          alt="Iron Discipline Logo" 
          className="w-32 h-32 relative z-10 drop-shadow-[0_0_20px_rgba(220,38,38,0.6)] animate-in zoom-in duration-700"
        />
      </div>
      
      <div className="mt-12 space-y-2">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
          Iron<br/><span className="text-blood-600">Discipline</span>
        </h1>
        <p className="text-iron-600 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">
          The Performance Portal
        </p>
      </div>
      
      <button 
        onClick={handleLogin}
        className="mt-16 w-full max-w-xs py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-blood-600 hover:text-white transition-all duration-500 shadow-2xl active:scale-95"
      >
        Initiate Sync
      </button>
      
      <div className="mt-20 border-t border-iron-900 pt-8">
        <p className="text-[9px] text-iron-800 font-black uppercase tracking-[0.5em] italic">
          Forge yourself or be forgotten.
        </p>
      </div>
    </div>
  );
};

export default Login;
