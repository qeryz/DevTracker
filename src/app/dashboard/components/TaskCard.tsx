import React from "react";
import { Task } from "@/lib/types/api/tasks";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">Assignee:</p>
        <select
          id="assignee"
          defaultValue={task.assignee ?? " "}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-1.5 w-auto"
        >
          <option value=" " hidden>
            {" "}
          </option>
          <option value="Marcos Padilla">Marcos Padilla</option>
          <option value="Kevin Reeves">Kevin Reeves</option>
          <option value="David Brahms">David Brahms</option>
        </select>
      </div>
      <p className="text-sm text-gray-500">Priority: {task.priority}</p>
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
            {tag}
          </span>
        ))}
      </div>
      <div className="text-right">
        <p className="inline-block text-right text-xs text-gray-500 uppercase cursor-default">
          {task.epic}
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
            {task.assignee}
          </span>
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
