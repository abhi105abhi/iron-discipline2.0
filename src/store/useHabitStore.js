import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useHabitStore = create(
  persist(
    (set, get) => ({
      habits: [
        { id: 1, name: 'Cold Shower', completedDays: [] },
        { id: 2, name: 'Deep Work (4 Hours)', completedDays: [] },
        { id: 3, name: '5 AM Wakeup', completedDays: [] }
      ],
      userProfile: {
        joinDate: new Date().toISOString(),
        isPremium: false,
        trialEnded: false
      },

      // Habit toggle karne ka logic
      toggleHabit: (habitId, date) => set((state) => ({
        habits: state.habits.map(habit => {
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
        })
      })),

      // Trial check logic (15 din ki aukaat check)
      checkTrialStatus: () => {
        const { joinDate, isPremium } = get().userProfile;
        const diffInDays = Math.floor((new Date() - new Date(joinDate)) / (1000 * 60 * 60 * 24));
        
        if (diffInDays > 15 && !isPremium) {
          set((state) => ({
            userProfile: { ...state.userProfile, trialEnded: true }
          }));
        }
      },

      addHabit: (name) => set((state) => ({
        habits: [...state.habits, { id: Date.now(), name, completedDays: [] }]
      })),
    }),
    {
      name: 'iron-discipline-storage', // LocalStorage mein save rahega data
    }
  )
);
