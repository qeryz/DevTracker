import { ArrowUpIcon } from "@heroicons/react/24/outline";

export const CommentInput = () => {
  return (
    <div className="flex w-full justify-center mt-4">
      <textarea
        id="message"
        style={{ resize: "none" }}
        rows={4}
        className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border-0"
        placeholder="Add a comment..."
      />

      <button className="flex items-center cursor-pointer ml-2 w-8 h-8 p-2 bg-indigo-600 text-white rounded-full hover:bg-blue-600">
        <ArrowUpIcon className="h-8 w-8" />
      </button>
    </div>
  );
};
