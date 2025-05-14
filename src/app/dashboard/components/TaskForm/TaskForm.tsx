import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addTask } from "@/lib/api/tasks";
import { taskSchema } from "../TaskCard/components/utils";
import useClickOutside from "@/hooks/useClickOutside";
import { useForm } from "react-hook-form";
import { CustomModal } from "@/app/components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TaskFormTypes = z.infer<typeof taskSchema>;

const TaskForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormTypes>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(taskSchema),
  });

  const queryClient = useQueryClient();
  const addTaskMutation = useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const handleAddTask = (data: TaskFormTypes) => {
    addTaskMutation.mutate({
      title: data.title,
      description: data.description,
      status: 1,
      assignee: 1,
      priority: 2,
      epic: 1,
      sprint: 1,
      tags: [1],
      created_by: 1,
    });
    reset();
    setIsFormVisible(false);
  };

  const handleOpenForm = () => {
    reset();
    setIsFormVisible(true);
  };

  useClickOutside(formRef, () => setIsFormVisible(false));

  return (
    <div ref={formRef}>
      {isFormVisible && (
        <CustomModal
          title="Add Task"
          onClose={() => setIsFormVisible(false)}
          body={
            <div className="flex flex-grow">
              <form
                onSubmit={handleSubmit(handleAddTask)}
                className="flex flex-col w-full h-full gap-4 p-4"
              >
                <input
                  {...register("title", { required: true })}
                  placeholder="Task Title"
                  className={`border-2 rounded px-2 py-1 text-sm border-gray-300 focus:border-indigo-600 focus:outline-none ${
                    errors.title ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-xs text-red-500">{errors.title.message}</p>
                )}
                <textarea
                  {...register("description")}
                  placeholder="Task Description"
                  style={{ resize: "none" }}
                  rows={3}
                  className={`border-2 rounded px-2 py-1 text-sm border-gray-300 focus:border-indigo-600 focus:outline-none ${
                    errors.description
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-500">
                    {errors.description.message}
                  </p>
                )}
                <div className="flex flex-row justify-center gap-2 items-end">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-1.5 px-3 rounded cursor-pointer min-w-50"
                  >
                    Save Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormVisible(false)}
                    className="bg-gray-500 text-white py-1.5 px-3 rounded cursor-pointer min-w-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          }
        />
      )}
      <button
        onClick={handleOpenForm}
        className="mt-6 bg-indigo-600 text-white py-1.5 px-3 rounded cursor-pointer"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
