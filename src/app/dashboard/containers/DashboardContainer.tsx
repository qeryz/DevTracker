import { useQuery, useMutation } from "react-query";
import { getTasks, addTask } from "@/lib/api/tasks";
import Dashboard from "../components/Dashboard/Dashboard";
import useTaskStore from "@/store/useTaskStore";

const DashboardContainer = () => {
  const { setTasks } = useTaskStore();
  const { data: tasks, isLoading } = useQuery("tasks", getTasks, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => setTasks(data || []),
  });

  if (isLoading) return <div>Loading...</div>;

  if (tasks instanceof Error) {
    console.error("Error fetching tasks:", tasks.message);
    return <div>Error: {tasks.message}</div>;
  }

  return <Dashboard />;
};

export default DashboardContainer;
