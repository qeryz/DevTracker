import useMiscStore from "@/store/useMiscStore";

export const useTaskComments = (taskId: number) => {
  const { commentsByTaskId } = useMiscStore();
  return commentsByTaskId[taskId] || [];
};
