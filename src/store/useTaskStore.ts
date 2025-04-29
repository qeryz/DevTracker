import { create } from "zustand";
import { Task } from "@/lib/types/api/tasks";

interface TaskStore {
  tasks: Task[];
  isEditing: Record<number, boolean>;
  setTasks: (tasks: Task[]) => void;
  setIsEditing: (taskId: number, isEditing: boolean) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isEditing: {},
  setTasks: (tasks) => set({ tasks }),
  setIsEditing: (taskId, isEditing) =>
    set((state) => ({
      isEditing: { ...state.isEditing, [taskId]: isEditing },
    })),
}));

export default useTaskStore;
