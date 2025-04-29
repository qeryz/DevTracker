import { create } from "zustand";
import { Task } from "@/lib/types/api/tasks";

interface TaskStore {
  tasks: Task[];
  isEditing: boolean;
  setTasks: (tasks: Task[]) => void;
  setIsEditing: (isEditing: boolean) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isEditing: false,
  setTasks: (tasks) => set({ tasks }),
  setIsEditing: (isEditing) => set({ isEditing }),
}));

export default useTaskStore;
