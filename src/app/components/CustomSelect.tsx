import { useState, useRef, ReactNode } from "react";
import useClickOutside from "@/hooks/useClickOutside";

interface CustomSelectOption {
  id: number;
  label: string;
  icon?: ReactNode; // Optional icon for each option
}

interface CustomSelectProps {
  label: string;
  options: CustomSelectOption[];
  outlined?: boolean; // Optional prop to control outline style
  selectedId: number;
  onChange: (id: number) => void;
}

const CustomSelect = ({
  label,
  options,
  outlined = false,
  selectedId,
  onChange,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.id === selectedId);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-900">{label}</label>
      <div className="relative mt-2">
        <button
          type="button"
          className={`grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 ${
            !outlined ? "" : "outline-1 -outline-offset-1 outline-gray-300"
          } focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            {selectedOption?.icon && selectedOption.icon}
            <span className="block truncate">
              {selectedOption?.label || "Select an option"}
            </span>
          </span>
          {outlined && (
            <svg
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option.id}
                className={`relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-gray-100 ${
                  selectedId === option.id ? "font-semibold" : "font-normal"
                }`}
                role="option"
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  {option.icon && option.icon}
                  <span className="block truncate">{option.label}</span>
                </div>
                {selectedId === option.id && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                    <svg
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
