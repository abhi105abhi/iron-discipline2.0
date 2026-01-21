// ... existing imports

export const useHabitStore = create(
  persist(
    (set, get) => ({
      // ... existing state (habits, userProfile)

      // Generic sync function for cleaner code
      syncToFirebase: async (updatedHabits) => {
        const { uid } = get().userProfile;
        if (uid) {
          try {
            await setDoc(doc(db, "users", uid), {
              habits: updatedHabits,
              lastUpdated: new Date().toISOString()
            }, { merge: true });
          } catch (error) {
            console.error("Firebase Sync Error:", error);
          }
        }
      },

      // Updated Add Habit with Sync
      addHabit: async (name) => {
        const newHabit = {
          id: Date.now().toString(),
          name: name.toUpperCase(), // Warrior style: All Caps
          completedDays: []
        };
        const updatedHabits = [...get().habits, newHabit];
        set({ habits: updatedHabits });
        await get().syncToFirebase(updatedHabits);
      },

      // Templates add karte waqt bhi sync hoga
      addFromTemplate: async (templateName) => {
        await get().addHabit(templateName);
      },

      // ... toggleHabit should also use get().syncToFirebase(updatedHabits)
    }),
    { name: 'iron-discipline-storage' }
  )
);
