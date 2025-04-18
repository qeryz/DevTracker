import React from "react";
import { Task } from "@/lib/types/api/tasks";
import UserList from "./components/UserList";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <UserList task={task} />
      <p className="text-sm text-gray-500">Priority: {task.priority.title}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {task.tags.map((tag, index) => (
          <span
            key={index}
            className={`${
              index % 2 === 0
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            } text-xs font-bold px-2.5 py-0.5 rounded-full uppercase`}
          >
            {tag.name}
          </span>
        ))}
      </div>
      <div className="text-right">
        <p className="inline-block text-right text-xs text-gray-500 uppercase cursor-default">
          {task.epic.title}-{task.id}
        </p>
        <span className="relative group">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"
            alt="avatar"
            width={20}
            height={20}
            className="inline-block rounded-full ml-2"
          />
          <span className="absolute bottom-full text-left left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1">
            {task.assignee.first_name} {task.assignee.last_name}
          </span>
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
