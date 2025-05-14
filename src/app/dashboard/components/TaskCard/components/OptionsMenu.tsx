import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { useMutation, useQueryClient } from "react-query";
import { deleteTask, updateTask } from "@/lib/api/tasks";
import { mapTaskToPayload } from "./utils";
import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import useMiscStore from "@/store/useMiscStore"; // Import the store
import CustomSelect from "@/app/components/CustomSelect"; // Import the CustomSelect component

export interface OptionsMenuProps {
  task: Task;
}

export const OptionsMenu = ({ task }: OptionsMenuProps) => {
  const queryClient = useQueryClient();
  const [showOptions, setShowOptions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const { statuses } = useMiscStore();

  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setIsDeleting(false);
    },
    onError: () => {
      setIsDeleting(false);
    },
  });

  const updateTaskMutation = useMutation(
    ({ id, updates }: { id: number; updates: TaskCreatePayload }) =>
      updateTask(id, updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    },
  );

  const handleDelete = () => {
    setIsDeleting(true);
    deleteTaskMutation.mutate(task.id);
  };

  const handleStatusChange = (newStatusId: number) => {
    if (newStatusId !== task.status.id) {
      const updatedTask = mapTaskToPayload(task, { status: newStatusId });
      updateTaskMutation.mutate({
        id: task.id,
        updates: updatedTask,
      });
    }
  };

  useClickOutside(divRef, () => setShowOptions(false));

  return (
    <div className="relative">
      <EllipsisVerticalIcon
        className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600"
        aria-label="Options"
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions((prev) => !prev);
        }}
      />
      {showOptions && (
        <div
          ref={divRef}
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
        >
          <button
            aria-label="Delete Task"
            className="block cursor-pointer w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:rounded-md"
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <div className="px-4 py-2">
            <CustomSelect
              label="Status"
              options={statuses.map((status) => ({
                id: status.id,
                label: status.title,
              }))}
              selectedId={task.status.id}
              onChange={handleStatusChange}
              aria-label="Change Task Status"
            />
          </div>
        </div>
      )}
    </div>
  );
};
