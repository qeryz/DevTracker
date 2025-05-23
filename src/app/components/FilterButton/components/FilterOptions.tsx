import { Sprint, Status, Priority } from "@/lib/types/api/tasks";
import { User } from "@/lib/types/api/users";
import { FilterType, getFilterOptions } from "@/app/components/utils";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

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
      <h4 className="text-sm font-medium mb-2">
        Select {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
      </h4>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() =>
              handleFilterChange(activeFilter as FilterType, option.id)
            }
            className={`flex items-center py-1 px-6 hover:bg-gray-100 text-sm text-gray-700`}
          >
            {filter[activeFilter as keyof typeof filter]?.includes(
              option.id,
            ) ? (
              <CheckCircleIcon className="h-4 w-4 mr-2 text-indigo-600" />
            ) : (
              <MinusCircleIcon className="h-4 w-4 mr-2 text-gray-400" />
            )}
            <span className="ml-2">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
