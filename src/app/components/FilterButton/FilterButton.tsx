import { useEffect, useRef, useState } from "react";
import useTaskStore from "@/store/useTaskStore";
import useMiscStore from "@/store/useMiscStore";
import useUsersStore from "@/store/useUsersStore";
import { Sprint } from "@/lib/types/api/tasks";
import { returnUniqueSprints, FilterType } from "../utils";
import { FilterTypeList } from "./components/FilterTypeList";
import { FilterOptions } from "./components/FilterOptions";
import { FunnelIcon } from "@heroicons/react/24/outline";
import useClickOutside from "@/hooks/useClickOutside";

const FilterButton = () => {
  const { tasks, filter, setFilter, resetFilter } = useTaskStore();
  const { statuses, priorities } = useMiscStore();
  const { users } = useUsersStore();

  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [uniqueSprints, setUniqueSprints] = useState<Sprint[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-indigo-600 text-white py-1.5 px-3 mb-2 rounded flex items-center hover:cursor-pointer"
      >
        <FunnelIcon className="h-5 w-5 mr-2" />
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
