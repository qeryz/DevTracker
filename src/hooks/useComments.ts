import { getComments } from "@/lib/api/comments";
import { Comments } from "@/lib/types/api/tasks";
import { useQuery } from "react-query";
import useMiscStore from "@/store/useMiscStore";

export const useComments = () => {
  const { setComments, setCommentsByTaskId } = useMiscStore();

  return useQuery("comments", getComments, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const comments = data || [];
      setComments(comments);

      // Organize comments by task ID
      const commentsByTaskId: Record<number, Comments[]> = {};

      comments.forEach((comment) => {
        if (comment.category === "task") {
          const taskId = comment.commented_object.id;
          if (!commentsByTaskId[taskId]) {
            commentsByTaskId[taskId] = [];
          }
          commentsByTaskId[taskId].push(comment);
        }
      });

      setCommentsByTaskId(commentsByTaskId);
    },
  });
};
