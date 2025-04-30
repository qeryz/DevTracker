import { create } from "zustand";
import { Task } from "@/lib/types/api/tasks";

interface TaskStore {
  tasks: Task[];
  isEditing: Record<number, boolean>;
  filter: {
    assignee?: number[];
    sprint?: number[];
    status?: number[];
    priority?: number[];
  };
  setTasks: (tasks: Task[]) => void;
  setIsEditing: (taskId: number, isEditing: boolean) => void;
  setFilter: (filter: Partial<TaskStore["filter"]>) => void;
  resetFilter: () => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isEditing: {},
  filter: {},
  setTasks: (tasks) => set({ tasks }),
  setIsEditing: (taskId, isEditing) =>
    set((state) => ({
      isEditing: { ...state.isEditing, [taskId]: isEditing },
    })),
  setFilter: (filter) =>
    set((state) => {
      const newFilter = { ...state.filter };

      (Object.keys(filter) as Array<keyof typeof newFilter>).forEach((key) => {
        const currentValues = newFilter[key] || [];
        const incomingValues = filter[key] || [];

        // Toggle each value in incomingValues
        incomingValues.forEach((value) => {
          if (currentValues.includes(value)) {
            // Remove the value if it exists
            newFilter[key] = currentValues.filter((v) => v !== value);
          } else {
            // Add the value if it doesn't exist
            newFilter[key] = [...currentValues, value];
          }
        });
      });

      return { filter: newFilter };
    }),
  resetFilter: () => set({ filter: {} }),
}));

export default useTaskStore;
