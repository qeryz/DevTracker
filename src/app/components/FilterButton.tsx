import { useEffect, useState } from "react";
import useTaskStore from "@/store/useTaskStore";
import useMiscStore from "@/store/useMiscStore";
import useUsersStore from "@/store/useUsersStore";
import { Sprint } from "@/lib/types/api/tasks";
import { filterTypes, returnUniqueSprints, getFilterOptions } from "./utils";

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
            {activeFilter && (
              <div>
                <h4 className="text-sm font-bold mb-2">
                  Select{" "}
                  {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
                </h4>
                <div className="flex flex-col gap-2">
                  {getFilterOptions(
                    activeFilter,
                    users,
                    uniqueSprints,
                    statuses,
                    priorities,
                  ).map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        handleFilterChange(
                          activeFilter as keyof typeof filter,
                          option.id,
                        )
                      }
                      className={`text-gray-700 hover:text-blue-500 ${
                        filter[activeFilter as keyof typeof filter]?.includes(
                          option.id,
                        )
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      {option.label}
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
