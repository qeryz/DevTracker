import axiosInstance from "./axiosInstance";
import { User, UserPayload } from "@/lib/types";

// Fetch all users
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get("/users/");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

// Fetch a single user by ID
export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/users/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw new Error("Failed to fetch user");
  }
};

// Create a new user
export const createUser = async (user: UserPayload): Promise<User> => {
  try {
    const response = await axiosInstance.post("/users/", user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

// Update an existing user
export const updateUser = async (
  id: number,
  user: UserPayload,
): Promise<User> => {
  try {
    const response = await axiosInstance.patch(`/users/${id}/`, user);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw new Error("Failed to update user");
  }
};
