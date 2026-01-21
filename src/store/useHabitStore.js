import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const useHabitStore = create(
  persist(
    (set, get) => ({
      habits: [
        { id: '1', name: 'COLD SHOWER', completedDays: [], targetDays: 30 },
        { id: '2', name: 'DEEP WORK (4 HOURS)', completedDays: [], targetDays: 21 },
        { id: '3', name: '5 AM WAKEUP', completedDays: [], targetDays: 60 }
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

      addHabit: async (name, target = 30) => {
        const newHabit = {
          id: Date.now().toString(),
          name: name.toUpperCase(),
          completedDays: [],
          targetDays: Number(target)
        };
        const updatedHabits = [...get().habits, newHabit];
        set({ habits: updatedHabits });
        await get().syncToFirebase(updatedHabits);
      },

      deleteHabit: async (habitId) => {
        const updatedHabits = get().habits.filter(h => h.id !== habitId);
        set({ habits: updatedHabits });
        await get().syncToFirebase(updatedHabits);
      },

      toggleHabit: async (habitId, date) => {
        const updatedHabits = get().habits.map(habit => {
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

      checkTrialStatus: () => {
        const { joinDate, isPremium } = get().userProfile;
        const diffInDays = Math.floor((new Date() - new Date(joinDate)) / (1000 * 60 * 60 * 24));
        if (diffInDays > 15 && !isPremium) {
          set((state) => ({
            userProfile: { ...state.userProfile, trialEnded: true }
          }));
        }
      },

      getWarriorTitle: (percentage) => {
        if (percentage <= 20) return "NOVICE";
        if (percentage <= 40) return "SOLDIER";
        if (percentage <= 60) return "COMMANDER";
        if (percentage <= 80) return "ELITE";
        return "BEAST";
      }
    }),
    { name: 'iron-discipline-storage' }
  )
);
