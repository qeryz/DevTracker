import { useQuery } from "react-query";
import { getTasks } from "@/lib/api/tasks";
import { getStatuses } from "@/lib/api/status";
import Dashboard from "../components/Dashboard/Dashboard";
import useTaskStore from "@/store/useTaskStore";
import useStatusStore from "@/store/useStatusStore";

const DashboardContainer = () => {
  const { setTasks } = useTaskStore();
  const { setStatuses } = useStatusStore();

  const { data: tasks, isLoading: tasksLoading } = useQuery("tasks", getTasks, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => setTasks(data || []),
  });

  const { data: statuses, isLoading: statusesLoading } = useQuery(
    "statuses",
    getStatuses,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => setStatuses(data || []),
    },
  );

  if (tasksLoading || statusesLoading) return <div>Loading...</div>;

  if (tasks instanceof Error || statuses instanceof Error) {
    const error =
      tasks instanceof Error
        ? tasks
        : statuses instanceof Error
          ? statuses
          : null;
    console.error("Error fetching data:", error?.message || "Unknown error");
    return <div>Error: {error?.message || "Unknown error"}</div>;
  }

  return <Dashboard />;
};

export default DashboardContainer;
