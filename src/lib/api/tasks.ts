import axiosInstance from "./axiosInstance";
import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";

// Fetch all tasks
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get("/tasks/");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

// Add a new task
export const addTask = async (task: TaskCreatePayload): Promise<Task> => {
  try {
    const response = await axiosInstance.post("/tasks/", task);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task");
  }
};

// Update an existing task
export const updateTask = async (
  id: number,
  task: TaskCreatePayload,
): Promise<Task> => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}/`, task);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};
