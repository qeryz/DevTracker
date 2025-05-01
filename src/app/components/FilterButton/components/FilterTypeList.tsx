import { FilterType, filterTypes } from "../../utils";

interface FilterTypeListProps {
  activeFilter: FilterType | null;
  setActiveFilter: (type: FilterType) => void;
  handleClearFilters: () => void;
}

export const FilterTypeList = ({
  activeFilter,
  setActiveFilter,
  handleClearFilters,
}: FilterTypeListProps) => (
  <div className={`w-48 ${activeFilter && "border-r border-gray-300"} pr-4`}>
    <h3 className="text-sm font-medium mb-2">Filter By</h3>
    <div className="flex flex-col gap-2">
      {filterTypes.map((type) => (
        <button
          key={type}
          onClick={() => setActiveFilter(type)}
          className={`text-sm text-gray-700 py-1 hover:bg-gray-100 focus:bg-blue-100 focus:border-l-2 border-blue-400 focus:text-blue-500`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
      <button
        onClick={handleClearFilters}
        className="text-sm text-gray-700 py-1 font-medium hover:bg-gray-100"
      >
        Clear Filters
      </button>
    </div>
  </div>
);
