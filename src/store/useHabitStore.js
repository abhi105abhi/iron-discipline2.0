import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const useHabitStore = create(
  persist(
    (set, get) => ({
      // State: Habits list aur User Profile
      habits: [
        { id: '1', name: 'COLD SHOWER', completedDays: [] },
        { id: '2', name: 'DEEP WORK (4 HOURS)', completedDays: [] },
        { id: '3', name: '5 AM WAKEUP', completedDays: [] }
      ],
      userProfile: {
        uid: null,
        joinDate: new Date().toISOString(),
        isPremium: false,
        trialEnded: false
      },

      // User ID set karna (Google Login ke baad)
      setUserId: (uid) => set((state) => ({
        userProfile: { ...state.userProfile, uid }
      })),

      // Firebase Sync Logic: Har action ke baad database update karega
      syncToFirebase: async (updatedHabits) => {
        const { uid } = get().userProfile;
        if (uid) {
          try {
            await setDoc(doc(db, "users", uid), {
              habits: updatedHabits,
              lastUpdated: new Date().toISOString()
            }, { merge: true });
          } catch (error) {
            console.error("Warrior, Sync failed:", error);
          }
        }
      },

      // Custom Habit add karna (Warrior Style: All Caps)
      addHabit: async (name) => {
        const newHabit = {
          id: Date.now().toString(),
          name: name.toUpperCase(),
          completedDays: []
        };
        const updatedHabits = [...get().habits, newHabit];
        set({ habits: updatedHabits });
        await get().syncToFirebase(updatedHabits);
      },

      // Habit delete karna (Galti sudharne ke liye)
      deleteHabit: async (habitId) => {
        const updatedHabits = get().habits.filter(h => h.id !== habitId);
        set({ habits: updatedHabits });
        await get().syncToFirebase(updatedHabits);
      },

      // Daily toggle logic: Heatmap ke liye dates track karta hai
      toggleHabit: async (habitId, date) => {
        const currentHabits = get().habits;
        const updatedHabits = currentHabits.map(habit => {
          if (habit.id === habitId) {
            const isCompleted = habit.completedDays.includes(date);
            return {
              ...habit,
              completedDays: isCompleted 
                ? habit.completedDays.filter(d => d !== date)
                : [...habit.completedDays, date]
            };
          }
          return habit;
        });

        set({ habits: updatedHabits });
        await get().syncToFirebase(updatedHabits);
      },

      // 15-day Trial Logic (Aukat Check)
      checkTrialStatus: () => {
        const { joinDate, isPremium } = get().userProfile;
        const diffInDays = Math.floor((new Date() - new Date(joinDate)) / (1000 * 60 * 60 * 24));
        
        if (diffInDays > 15 && !isPremium) {
          set((state) => ({
            userProfile: { ...state.userProfile, trialEnded: true }
          }));
        }
      },

      // Premium status update (Manual after payment DM)
      setPremium: (status) => set((state) => ({
        userProfile: { ...state.userProfile, isPremium: status, trialEnded: !status }
      })),
    }),
    {
      name: 'iron-discipline-storage', // Browser refresh pe data nahi jayega
    }
  )
);
