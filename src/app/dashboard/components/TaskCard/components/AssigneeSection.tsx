import { useState } from "react";
import { Task } from "@/lib/types/api/tasks";
import { DefaultAvatar } from "@/app/components";
import UserList from "./UserList";

interface AssigneeSectionProps {
  task: Task;
}

const AssigneeSection = ({ task }: AssigneeSectionProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <span className="relative group">
      <button onClick={() => setIsFocused((prev) => !prev)}>
        <DefaultAvatar height={20} width={20} />
      </button>
      <span
        className={`absolute bottom-full text-left left-1/2 -translate-x-1/2 mb-1 hidden group-hover:${
          isFocused ? "hidden" : "block"
        } bg-gray-700 text-white text-xs rounded px-2 py-1`}
      >
        {task.assignee.first_name} {task.assignee.last_name}
      </span>
      <span
        onBlur={() => setIsFocused(false)}
        className={`absolute bottom-full text-left left-1/2 -translate-x-1/2 translate-y-25 bg-white shadow-sm rounded-lg p-4 mb-4 z-10 ${
          isFocused ? "block" : "hidden"
        }`}
      >
        <UserList task={task} />
      </span>
    </span>
  );
};

export default AssigneeSection;
