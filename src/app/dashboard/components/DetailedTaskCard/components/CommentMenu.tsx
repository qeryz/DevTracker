import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteComment } from "@/lib/api/comments";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import useClickOutside from "@/hooks/useClickOutside";

export interface CommentMenuProps {
  commentId: number;
}

export const CommentMenu = ({ commentId }: CommentMenuProps) => {
  const queryClient = useQueryClient();
  const [showOptions, setShowOptions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const deleteTaskMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      setIsDeleting(false);
    },
    onError: () => {
      setIsDeleting(false);
    },
  });

  const handleDelete = () => {
    setIsDeleting(true);
    deleteTaskMutation.mutate(commentId);
  };

  useClickOutside(buttonRef, () => setShowOptions(false));

  return (
    <div className="relative">
      <EllipsisVerticalIcon
        className="h-5 w-5 text-gray-400 cursor-pointer"
        onClick={() => setShowOptions(!showOptions)}
      />
      {showOptions && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <button
            ref={buttonRef}
            className="block cursor-pointer w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:rounded-md"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
