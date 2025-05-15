import Dashboard from "../components/Dashboard/Dashboard";
import { useTasks } from "@/hooks/useTasks";
import { useStatuses } from "@/hooks/useStatuses";
import { useUsers } from "@/hooks/useUsers";
import { usePriorities } from "@/hooks/usePriorities";
import { useComments } from "@/hooks/useComments";

const DashboardContainer = () => {
  const { isLoading: tasksLoading, error: tasksError } = useTasks();
  const { isLoading: statusesLoading, error: statusesError } = useStatuses();
  const { isLoading: usersLoading, error: usersError } = useUsers();
  const { isLoading: prioritiesLoading, error: prioritiesError } =
    usePriorities();
  const { isLoading: commentsLoading, error: commentsError } = useComments();

  if (
    tasksLoading ||
    statusesLoading ||
    usersLoading ||
    prioritiesLoading ||
    commentsLoading
  ) {
    return <div>Loading...</div>;
  }

  const errors = [
    tasksError,
    statusesError,
    usersError,
    prioritiesError,
    commentsError,
  ].filter(Boolean);
  const firstError = errors.find((error) => error instanceof Error);

  if (firstError && firstError instanceof Error) {
    console.error("Error fetching data:", firstError.message);
    return <div>Error: {firstError.message}</div>;
  }
  return <Dashboard />;
};

export default DashboardContainer;
