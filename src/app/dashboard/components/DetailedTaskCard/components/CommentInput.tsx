import { useForm } from "react-hook-form";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "react-query";
import { CommentsCreatePayload } from "@/lib/types/api/tasks";
import { createComment } from "@/lib/api/comments";

interface CommentFormInputs {
  commentInput: string;
}

export const CommentInput = ({ taskId }: { taskId: number }) => {
  const { register, handleSubmit, reset, formState } =
    useForm<CommentFormInputs>();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ updates }: { updates: CommentsCreatePayload }) => createComment(updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    },
  );

  const handleSave = (data: CommentFormInputs) => {
    const updatedTask = {
      user: 1,
      content: data.commentInput,
      category: "task",
      commented_object: taskId,
    };
    mutation.mutate({ updates: updatedTask });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="flex w-full justify-center mt-4"
    >
      <textarea
        {...register("commentInput", { required: true })}
        id="message"
        style={{ resize: "none" }}
        rows={3}
        className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-1 border-gray-200"
        placeholder="Add a comment..."
      />
      {formState.isDirty && formState.isValid && (
        <button
          type="submit"
          className="flex items-center cursor-pointer ml-2 w-8 h-8 p-2 bg-indigo-600 text-white rounded-full hover:bg-blue-600"
          aria-label="Submit Comment"
        >
          <ArrowUpIcon className="h-4 w-4" />
        </button>
      )}
    </form>
  );
};
