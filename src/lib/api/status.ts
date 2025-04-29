import axiosInstance from "./axiosInstance";
import { Status } from "@/lib/types/api/status";

// Fetch all statuses
export const getStatuses = async (): Promise<Status[]> => {
  try {
    const response = await axiosInstance.get("/statuses/");
    return response.data;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    throw new Error("Failed to fetch statuses");
  }
};
