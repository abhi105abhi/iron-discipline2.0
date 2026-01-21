import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const useHabitStore = create(
  persist(
    (set, get) => ({
      habits: [
        { id: '1', name: 'Cold Shower', completedDays: [] },
        { id: '2', name: 'Deep Work (4 Hours)', completedDays: [] },
        { id: '3', name: '5 AM Wakeup', completedDays: [] }
      ],
      userProfile: {
        uid: null,
        joinDate: new Date().toISOString(),
        isPremium: false,
        trialEnded: false
      },

      setUserId: (uid) => set((state) => ({
        userProfile: { ...state.userProfile, uid }
      })),

      // Habits ko toggle karna aur Firebase pe sync karna
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

        // Firebase Sync logic
        const { uid } = get().userProfile;
        if (uid) {
          try {
            await setDoc(doc(db, "users", uid), {
              habits: updatedHabits,
              lastUpdated: new Date().toISOString()
            }, { merge: true });
          } catch (error) {
            console.error("Sync Error:", error);
          }
        }
      },

      // Elite Warrior Templates pick karne ke liye
      addFromTemplate: (templateName) => {
        const newHabit = {
          id: Date.now().toString(),
          name: templateName,
          completedDays: []
        };
        set((state) => ({ habits: [...state.habits, newHabit] }));
      },

      checkTrialStatus: () => {
        const { joinDate, isPremium } = get().userProfile;
        const diffInDays = Math.floor((new Date() - new Date(joinDate)) / (1000 * 60 * 60 * 24));
        if (diffInDays > 15 && !isPremium) {
          set((state) => ({ userProfile: { ...state.userProfile, trialEnded: true } }));
        }
      },
    }),
    { name: 'iron-discipline-storage' }
  )
);
