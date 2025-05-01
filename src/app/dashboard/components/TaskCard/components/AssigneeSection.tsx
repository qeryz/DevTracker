import { useEffect, useRef, useState } from "react";
import { Task } from "@/lib/types/api/tasks";
import { DefaultAvatar } from "@/app/components";
import UserList from "./UserList";
import useClickOutside from "@/hooks/useClickOutside";

interface AssigneeSectionProps {
  task: Task;
}

const AssigneeSection = ({ task }: AssigneeSectionProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsFocused(false));

  return (
    <span className="relative group" ref={dropdownRef}>
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
      <div
        className={`absolute bottom-full text-left left-1/2 -translate-x-22 translate-y-19 rounded-lg mb-4 z-10 ${
          isFocused ? "block" : "hidden"
        }`}
      >
        <UserList task={task} />
      </div>
    </span>
  );
};

export default AssigneeSection;
