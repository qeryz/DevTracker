import Dashboard from "../components/Dashboard/Dashboard";
import { useTasks } from "@/hooks/useTasks";
import { useStatuses } from "@/hooks/useStatuses";
import { useUsers } from "@/hooks/useUsers";
import { usePriorities } from "@/hooks/usePriorities";
import { useComments } from "@/hooks/useComments";

const DashboardContainer = () => {
  const queries = [
    { name: "Tasks", ...useTasks(), critical: true },
    { name: "Statuses", ...useStatuses(), critical: true },
    { name: "Users", ...useUsers(), critical: false },
    { name: "Priorities", ...usePriorities(), critical: false },
    { name: "Comments", ...useComments(), critical: false },
  ];

  const criticalQueries = queries.filter((q) => q.critical);
  const failedQueries = queries.filter((q) => q.error);
  const isLoading = criticalQueries.some((q) => q.isLoading);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Only show error if critical queries have failed after all retry attempts
  if (failedQueries.some((q) => q.critical)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            Unable to load application
          </h2>
          <p className="text-gray-600 mb-4">
            Please check your internet connection and refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return <Dashboard />;
};

export default DashboardContainer;
