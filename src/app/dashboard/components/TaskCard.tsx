import React from "react";

interface TaskCardProps {
  name: string;
  assignee: string;
  priority: string;
  dueDate: string;
  status: string; // Added status field
}

const TaskCard: React.FC<TaskCardProps> = ({
  name,
  assignee,
  priority,
  dueDate,
  status,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">Assignee: {assignee}</p>
      <p className="text-sm text-gray-500">Priority: {priority}</p>
      <p className="text-sm text-gray-500">Due Date: {dueDate}</p>
      <p className="text-sm font-semibold mt-2">Status: {status}</p>{" "}
      {/* Display status */}
    </div>
  );
};

export default TaskCard;
