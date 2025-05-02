import { useTaskComments } from "@/hooks/useTaskComments";
import { CommentItem } from "./components/CommentItem";
import { CommentInput } from "./components/CommentInput";

export const CommentsSection = ({ taskId }: { taskId: number }) => {
  const comments = useTaskComments(taskId);

  return (
    <div className="flex flex-col items-center flex-grow w-full gap-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      {comments.length > 0 ? (
        <ul className="flex flex-col items-start space-y-2 w-full">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
      <CommentInput />
    </div>
  );
};
