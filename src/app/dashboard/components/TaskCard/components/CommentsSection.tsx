import { useTaskComments } from "@/hooks/useTaskComments";
import { formatDateAndTime } from "./utils";
import { DefaultAvatar } from "@/app/components";
export const CommentsSection = ({ taskId }: { taskId: number }) => {
  const comments = useTaskComments(taskId);

  return (
    <div className="flex flex-col items-center flex-grow w-full gap-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      {comments.length > 0 ? (
        <ul className="flex flex-col items-start space-y-2 w-full">
          {comments.map((comment) => (
            <li key={comment.id} className="p-4 bg-gray-100 rounded-md w-full">
              <div className="flex items-center gap-2 mb-2">
                <DefaultAvatar height={15} width={15} />
                <span className="text-sm font-semibold">
                  {comment.user.first_name} {comment.user.last_name}
                </span>
              </div>
              <p className="text-sm text-gray-700 w-full">{comment.content}</p>
              <span className="flex text-xs text-gray-500 w-full justify-end mt-2">
                {formatDateAndTime(comment.created_at)}
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
