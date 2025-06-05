import { useTaskComments } from "@/hooks/useTaskComments";
import { CommentItem } from "./components/CommentItem";
import { CommentInput } from "./components/CommentInput";

export const CommentsSection = ({ taskId }: { taskId: number }) => {
  const comments = useTaskComments(taskId);

  return (
    <div className="flex flex-col items-center flex-grow w-full gap-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      {comments.length > 0 ? (
        <ul
          className="flex w-full h-54 overflow-hidden"
          aria-label="Comments List"
        >
          <div className="flex flex-col items-start space-y-2 overflow-y-auto w-full">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </ul>
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
      <CommentInput taskId={taskId} />
    </div>
  );
};
