import axiosInstance from "./axiosInstance";
import { Priority } from "@/lib/types/api/tasks";

// Fetch all priorities
export const getPriorities = async (): Promise<Priority[]> => {
  try {
    const response = await axiosInstance.get("/priorities/");
    return response.data;
  } catch (error) {
    console.error("Error fetching priorities:", error);
    throw new Error("Failed to fetch priorities");
  }
};
