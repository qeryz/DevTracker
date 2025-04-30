import { useEffect, useState } from "react";
import useTaskStore from "@/store/useTaskStore";
import useMiscStore from "@/store/useMiscStore";
import useUsersStore from "@/store/useUsersStore";
import { Sprint } from "@/lib/types/api/tasks";
import { returnUniqueSprints, FilterType } from "../utils";
import { FilterTypeList } from "./components/FilterTypeList";
import { FilterOptions } from "./components/FilterOptions";

const FilterButton = () => {
  const { tasks, filter, setFilter, resetFilter } = useTaskStore();
  const { statuses, priorities } = useMiscStore();
  const { users } = useUsersStore();

  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [uniqueSprints, setUniqueSprints] = useState<Sprint[]>([]);

  useEffect(() => {
    // Extract unique sprints from tasks
    const uniqueSprints = returnUniqueSprints(tasks);
    setUniqueSprints(uniqueSprints);
  }, [tasks]);

  const handleFilterChange = (key: FilterType, value: number) => {
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
          <FilterTypeList
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            handleClearFilters={handleClearFilters}
          />
          <div className="flex-1 pl-4">
            <FilterOptions
              activeFilter={activeFilter}
              users={users}
              uniqueSprints={uniqueSprints}
              statuses={statuses}
              priorities={priorities}
              filter={filter}
              handleFilterChange={handleFilterChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
