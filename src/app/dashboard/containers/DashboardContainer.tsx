import { useQuery, useMutation } from "react-query";
import { getTasks, addTask, updateTask } from "@/lib/api/tasks";
import Dashboard from "../components/Dashboard/Dashboard";

const DashboardContainer = () => {
  const { data: tasks, isLoading } = useQuery("tasks", getTasks, {
    refetchOnWindowFocus: false,
  });
  const addTaskMutation = useMutation(addTask);

  if (isLoading) return <div>Loading...</div>;

  if (tasks instanceof Error) {
    console.error("Error fetching tasks:", tasks.message);
    return <div>Error: {tasks.message}</div>;
  }

  return <Dashboard tasks={tasks || []} addTaskMutation={addTaskMutation} />;
};

export default DashboardContainer;
