import { useQuery } from "react-query";
import { getTasks } from "@/lib/api/tasks";
import useTaskStore from "@/store/useTaskStore";

export const useTasks = () => {
  const { setTasks } = useTaskStore();

  return useQuery("tasks", getTasks, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => setTasks(data || []),
  });
};
