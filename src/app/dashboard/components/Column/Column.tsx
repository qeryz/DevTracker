import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import { Task } from "@/lib/types/api/tasks";

interface ColumnProps {
  title: string;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <div className="flex flex-col bg-gray-100 rounded-lg p-4 shadow-md max-w-80">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div>
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
