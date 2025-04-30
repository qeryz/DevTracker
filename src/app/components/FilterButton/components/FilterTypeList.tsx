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
);
