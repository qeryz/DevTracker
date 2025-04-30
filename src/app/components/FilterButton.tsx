import { useEffect, useState } from "react";
import useTaskStore from "@/store/useTaskStore";
import useMiscStore from "@/store/useMiscStore";
import useUsersStore from "@/store/useUsersStore";
import { Sprint } from "@/lib/types/api/tasks";
import { filterTypes, returnUniqueSprints } from "./utils";

const FilterButton = () => {
  const { tasks, filter, setFilter, resetFilter } = useTaskStore();
  console.log("filter", filter);
  const { statuses, priorities } = useMiscStore();
  const { users } = useUsersStore();

  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [uniqueSprints, setUniqueSprints] = useState<Sprint[]>([]);

  useEffect(() => {
    // Extract unique sprints from tasks
    const uniqueSprints = returnUniqueSprints(tasks);
    setUniqueSprints(uniqueSprints);
  }, [tasks]);

  const handleFilterChange = (key: keyof typeof filter, value: number) => {
    const currentValues = filter[key] || [];
    setFilter({ [key]: [...currentValues, value] });
  };

  const handleClearFilters = () => {
    resetFilter();
    setActiveFilter(null);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Filter
      </button>
      {isOpen && (
        <div className="absolute bg-white shadow-lg rounded p-4 mt-2 z-10 flex">
          {/* Left Panel */}
          <div className={`w-48 ${activeFilter && "border-r"} pr-4`}>
            <h3 className="text-sm font-bold mb-2">Filter By</h3>
            <div className="flex flex-col gap-2">
              {filterTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`text-gray-700 hover:text-blue-500 ${
                    activeFilter === type ? "font-bold" : ""
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
              <button
                onClick={handleClearFilters}
                className="text-gray-700 hover:text-red-500"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 pl-4">
            {activeFilter === "assignee" && (
              <div>
                <h4 className="text-sm font-bold mb-2">Select Assignee</h4>
                <div className="flex flex-col gap-2">
                  {users.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleFilterChange("assignee", user.id)}
                      className={`text-gray-700 hover:text-blue-500 ${
                        filter.assignee?.includes(user.id) ? "font-bold" : ""
                      }`}
                    >
                      {user.first_name} {user.last_name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {activeFilter === "sprint" && (
              <div>
                <h4 className="text-sm font-bold mb-2">Select Sprint</h4>
                <div className="flex flex-col gap-2">
                  {uniqueSprints.map((sprint) => (
                    <button
                      key={sprint.id}
                      onClick={() => handleFilterChange("sprint", sprint.id)}
                      className={`text-gray-700 hover:text-blue-500 ${
                        filter.sprint?.includes(sprint.id) ? "font-bold" : ""
                      }`}
                    >
                      {sprint.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {activeFilter === "status" && (
              <div>
                <h4 className="text-sm font-bold mb-2">Select Status</h4>
                <div className="flex flex-col gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => handleFilterChange("status", status.id)}
                      className={`text-gray-700 hover:text-blue-500 ${
                        filter.status?.includes(status.id) ? "font-bold" : ""
                      }`}
                    >
                      {status.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {activeFilter === "priority" && (
              <div>
                <h4 className="text-sm font-bold mb-2">Select Priority</h4>
                <div className="flex flex-col gap-2">
                  {priorities.map((priority) => (
                    <button
                      key={priority.id}
                      onClick={() =>
                        handleFilterChange("priority", priority.id)
                      }
                      className={`text-gray-700 hover:text-blue-500 ${
                        filter.priority?.includes(priority.id)
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      {priority.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
