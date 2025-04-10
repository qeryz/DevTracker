import React from "react";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
  tasks: {
    name: string;
    assignee: string;
    priority: string;
    dueDate: string;
    status: string;
  }[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <div className="flex flex-col bg-gray-100 rounded-lg p-4 shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div>
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            name={task.name}
            assignee={task.assignee}
            priority={task.priority}
            dueDate={task.dueDate}
            status={task.status} // Pass status to TaskCard
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
