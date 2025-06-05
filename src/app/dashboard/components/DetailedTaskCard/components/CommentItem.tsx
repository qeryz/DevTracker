import { DefaultAvatar } from "@/app/components";
import { formatDateAndTime } from "@/app/components/utils";
import { Comments } from "@/lib/types/api/tasks";
import { CommentMenu } from "./CommentMenu";

export const CommentItem = ({ comment }: { comment: Comments }) => {
  return (
    <li
      key={comment.id}
      className="p-4 bg-gray-100 rounded-md w-full"
      aria-label="Comment Item"
    >
      <div className="flex items-center w-full gap-2 mb-2">
        <div className="flex items-center gap-2 w-[90%]">
          <DefaultAvatar height={15} width={15} />
          <span className="text-sm font-semibold">
            {comment.user.first_name} {comment.user.last_name}
          </span>
        </div>
        <div className="relative flex justify-end">
          <CommentMenu commentId={comment.id} />
        </div>
      </div>
      <p className="flex justify-start text-sm text-gray-700 w-full">
        {comment.content}
      </p>
      <span className="flex text-xs text-gray-500 w-full justify-end mt-2 select-none">
        {formatDateAndTime(comment.created_at)}
      </span>
    </li>
  );
};
