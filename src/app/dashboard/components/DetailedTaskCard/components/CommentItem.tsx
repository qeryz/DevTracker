import { DefaultAvatar } from "@/app/components";
import { formatDateAndTime } from "@/app/components/utils";

export const CommentItem = ({ comment }: { comment: any }) => {
  return (
    <li key={comment.id} className="p-4 bg-gray-100 rounded-md w-full">
      <div className="flex items-center gap-2 mb-2">
        <DefaultAvatar height={15} width={15} />
        <span className="text-sm font-semibold">
          {comment.user.first_name} {comment.user.last_name}
        </span>
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
