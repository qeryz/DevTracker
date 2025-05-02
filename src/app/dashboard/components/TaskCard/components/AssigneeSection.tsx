import { useRef, useState, useEffect } from "react";
import { Task } from "@/lib/types/api/tasks";
import { DefaultAvatar } from "@/app/components";
import UserList from "./UserList";

interface AssigneeSectionProps {
  task: Task;
}

const AssigneeSection = ({ task }: AssigneeSectionProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <span className="relative group" ref={buttonRef}>
      <button onClick={() => setIsFocused((prev) => !prev)}>
        <DefaultAvatar height={20} width={20} />
      </button>
      <div
        className={`absolute bottom-full text-left left-1/2 -translate-x-1/2 mb-1 hidden group-hover:${
          isFocused ? "hidden" : "block"
        } bg-gray-700 text-white text-xs rounded`}
      >
        {task.assignee.first_name} {task.assignee.last_name}
      </div>
      {isFocused && (
        <div
          ref={dropdownRef}
          className="absolute bottom-full text-left left-1/2 -translate-x-10 translate-y-19 rounded-lg mb-4 z-10"
        >
          <UserList task={task} />
        </div>
      )}
    </span>
  );
};

export default AssigneeSection;
