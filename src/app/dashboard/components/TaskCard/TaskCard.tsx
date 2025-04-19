import { useState } from "react";
import { Task } from "@/lib/types/api/tasks";
import { DefaultAvatar, TagsList } from "@/app/components";
import UserList from "./components/UserList";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-500">Priority: {task.priority.title}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <TagsList tags={task?.tags} />
      </div>
      <div className="text-right">
        <p className="inline-block text-right text-xs text-gray-500 uppercase cursor-default mr-2">
          {task.epic.title}-{task.id}
        </p>
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
      </div>
    </div>
  );
};

export default TaskCard;
