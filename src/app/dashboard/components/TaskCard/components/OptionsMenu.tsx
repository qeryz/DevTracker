import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { useMutation, useQueryClient } from "react-query";
import { deleteTask } from "@/lib/api/tasks";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export interface OptionsMenuProps {
  taskId: number;
}
export const OptionsMenu = ({ taskId }: OptionsMenuProps) => {
  const queryClient = useQueryClient();
  const [showOptions, setShowOptions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setIsDeleting(false);
    },
    onError: () => {
      setIsDeleting(false);
    },
  });
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDeleting(true);
    deleteTaskMutation.mutate(taskId);
  };
  useClickOutside(buttonRef, () => setShowOptions(false));
  return (
    <div className="relative">
      <EllipsisVerticalIcon
        className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600"
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions((prev) => !prev);
        }}
      />
      {showOptions && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <button
            ref={buttonRef}
            className="block cursor-pointer w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:rounded-md"
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
};
