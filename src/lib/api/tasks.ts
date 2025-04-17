import axiosInstance from "./axiosInstance";

export type Task = {
  id: number;
  title: string;
  description: string;
  epic: string;
  sprint: string;
  status: string;
  assignee: string;
  priority: string;
  tags: string[];
  created_by: string;
};

export type TaskPayload = Omit<Task, "id">;

type UpdateTaskInput = {
  id: number;
  updates: Partial<TaskPayload>;
};

// Fetch all tasks
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get("/tasks/");
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

// Add a new task
export const addTask = async (task: TaskPayload): Promise<Task> => {
  try {
    const response = await axiosInstance.post("/tasks/", task);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task");
  }
};

// Update an existing task
export const updateTask = async (input: UpdateTaskInput): Promise<Task> => {
  try {
    const response = await axiosInstance.patch(
      `/tasks/${input.id}/`,
      input.updates,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};
