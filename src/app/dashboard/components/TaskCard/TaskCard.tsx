import { useState } from "react";
import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";
import { TagsList } from "@/app/components";
import {
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import AssigneeSection from "./components/AssigneeSection";
import { updateTask } from "@/lib/api/tasks"; // Import the updateTask function
import { useMutation, useQueryClient } from "react-query"; // React Query for API calls
import { mapTaskToPayload } from "./components/utility"; // Utility function to map task to payload

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, updates }: { id: number; updates: TaskCreatePayload }) =>
      updateTask(id, updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks"); // Invalidate tasks query to refresh data
      },
    },
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewTitle(task.title);
  };

  const handleSaveClick = () => {
    const updatedTask = mapTaskToPayload(task, { title: newTitle });
    mutation.mutate({ id: task.id, updates: updatedTask });
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
      <h3 className="flex text-md font-medium items-start">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={handleSaveClick}
              className="text-green-500 hover:text-green-700"
            >
              <CheckIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancelClick}
              className="text-red-500 hover:text-red-700"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {task.title}
            <button onClick={handleEditClick} className="cursor-pointer">
              <PencilSquareIcon className="inline-block w-4 h-4 ml-2 mb-1 flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors" />
            </button>
          </>
        )}
      </h3>
      <p className="text-sm text-gray-500">Priority: {task.priority.title}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <TagsList tags={task?.tags} />
      </div>
      <div className="text-right">
        <p className="inline-block text-right text-xs text-gray-500 uppercase cursor-default mr-2">
          {task.epic.title}-{task.id}
        </p>
        <AssigneeSection task={task} />
      </div>
    </div>
  );
};

export default TaskCard;
