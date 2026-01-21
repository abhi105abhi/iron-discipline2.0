import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Shield } from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';

const Login = () => {
  const { setUserId } = useHabitStore();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUserId(result.user.uid);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-iron-900 flex flex-col items-center justify-center p-6 text-center">
      <Shield className="w-20 h-20 text-blood-600 mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
      <h1 className="text-4xl font-black uppercase italic tracking-tighter">Iron <span className="text-blood-600">Discipline</span></h1>
      <p className="text-iron-500 mt-2 mb-10 font-bold uppercase tracking-widest text-xs">Aukat check starts here.</p>
      
      <button 
        onClick={handleLogin}
        className="w-full max-w-xs py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-blood-600 hover:text-white transition-all duration-300"
      >
        Sign in with Google
      </button>
      
      <p className="mt-8 text-[10px] text-iron-700 font-bold uppercase tracking-[0.4em]">Become the beast or remain a burden.</p>
    </div>
  );
};

export default Login;
