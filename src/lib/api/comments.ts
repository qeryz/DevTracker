import axiosInstance from "./axiosInstance";
import { Comments, CommentsCreatePayload } from "@/lib/types/api/tasks";

export const getComments = async (): Promise<Comments[]> => {
  const response = await axiosInstance.get(`/comments/`);
  return response.data;
};

export const createComment = async (
  payload: CommentsCreatePayload,
): Promise<Comments> => {
  const response = await axiosInstance.post("/comments/", payload);
  return response.data;
};

export const updateComment = async (
  id: number,
  payload: Partial<CommentsCreatePayload>,
): Promise<Comments> => {
  const response = await axiosInstance.put(`/comments/${id}/`, payload);
  return response.data;
};

export const deleteComment = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/comments/${id}/`);
};
