import { useTaskComments } from "@/hooks/useTaskComments";

export const CommentsSection = ({ taskId }: { taskId: number }) => {
  const comments = useTaskComments(taskId);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      {comments.length > 0 ? (
        <ul className="space-y-2">
          {comments.map((comment) => (
            <li key={comment.id} className="p-4 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-700">{comment.content}</p>
              <span className="text-xs text-gray-500">
                {new Date(comment.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
};
