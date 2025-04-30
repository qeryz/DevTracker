import { Sprint, Status, Priority } from "@/lib/types/api/tasks";
import { User } from "@/lib/types/api/users";
import { FilterType, getFilterOptions } from "@/app/components/utils";

interface FilterOptionsProps {
  activeFilter: FilterType | null;
  users: User[];
  uniqueSprints: Sprint[];
  statuses: Status[];
  priorities: Priority[];
  filter: Record<string, number[]>;
  handleFilterChange: (key: FilterType, value: number) => void;
}

export const FilterOptions = ({
  activeFilter,
  users,
  uniqueSprints,
  statuses,
  priorities,
  filter,
  handleFilterChange,
}: FilterOptionsProps) => {
  if (!activeFilter) return null;

  const options = getFilterOptions(
    activeFilter,
    users,
    uniqueSprints,
    statuses,
    priorities,
  );

  return (
    <div>
      <h4 className="text-sm font-bold mb-2">
        Select {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
      </h4>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() =>
              handleFilterChange(activeFilter as FilterType, option.id)
            }
            className={`text-gray-700 hover:text-blue-500 ${
              filter[activeFilter as keyof typeof filter]?.includes(option.id)
                ? "font-bold"
                : ""
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
