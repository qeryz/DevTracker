import { useState } from "react";
import {
  CheckIcon,
  XMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "react-query";
import { updateTask } from "@/lib/api/tasks";
import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";
import { mapTaskToPayload } from "./utility";
import { z } from "zod";

interface EditableTitleProps {
  task: Task;
}

const EditableTitle = ({ task }: EditableTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, updates }: { id: number; updates: TaskCreatePayload }) =>
      updateTask(id, updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks"); // Refresh tasks data
      },
    },
  );

  const titleSchema = z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title cannot exceed 50 characters");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewTitle(task.title);
    setError(null);
  };

  const handleSaveClick = () => {
    try {
      titleSchema.parse(newTitle);
      const updatedTask = mapTaskToPayload(task, { title: newTitle });
      mutation.mutate({ id: task.id, updates: updatedTask });
      setIsEditing(false);
      setError(null);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message); // Set the first validation error
      }
    }
  };

  return (
    <h3 className="flex text-md font-medium items-start">
      {isEditing ? (
        <div className="flex flex-col gap-2">
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
          {error && <p className="text-xs text-red-500">{error}</p>}
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
  );
};

export default EditableTitle;
