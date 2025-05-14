import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckIcon,
  XMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "react-query";
import { updateTask } from "@/lib/api/tasks";
import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";
import { mapTaskToPayload, titleSchema } from "./utils";
import useTaskStore from "@/store/useTaskStore";

interface EditableTitleProps {
  task: Task;
}

type TitleFormValues = z.infer<typeof titleSchema>;

const EditableTitle = ({ task }: EditableTitleProps) => {
  const { isEditing, setIsEditing } = useTaskStore();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, updates }: { id: number; updates: TaskCreatePayload }) =>
      updateTask(id, updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TitleFormValues>({
    defaultValues: { title: task.title },
    resolver: zodResolver(titleSchema),
  });

  const handleSave = (data: TitleFormValues) => {
    const updatedTask = mapTaskToPayload(task, { title: data.title });
    mutation.mutate({ id: task.id, updates: updatedTask });
    setIsEditing(task.id, false);
  };

  const handleCancel = () => {
    setIsEditing(task.id, false);
    reset({ title: task.title });
  };

  return (
    <h3 className="flex text-md font-medium items-start">
      {isEditing[task.id] ? (
        <form
          onSubmit={handleSubmit(handleSave)}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-wrap items-center gap-2">
            <input
              {...register("title")}
              onClick={(e) => e.stopPropagation()}
              className={`border-2 rounded px-2 border-indigo-600 flex-wrap py-1 text-sm w-full max-w-full overflow-hidden text-ellipsis ${
                errors.title ? "border-red-500" : ""
              }`}
              style={{ whiteSpace: "nowrap" }}
            />
            <button
              type="submit"
              onClick={(e) => e.stopPropagation()}
              className="text-green-500 hover:text-green-700"
              aria-label="Save title edit"
            >
              <CheckIcon className="w-4 h-4 cursor-pointer" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              className="text-red-500 hover:text-red-700"
              aria-label="Cancel title edit"
            >
              <XMarkIcon className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
          {errors.title && (
            <p className="text-xs text-red-500">{errors.title.message}</p>
          )}
        </form>
      ) : (
        <>
          {task.title}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(task.id, true);
            }}
            className="cursor-pointer"
            aria-label="Edit title"
          >
            <PencilSquareIcon className="inline-block w-4 h-4 ml-2 mb-1 flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors" />
          </button>
        </>
      )}
    </h3>
  );
};

export default EditableTitle;
