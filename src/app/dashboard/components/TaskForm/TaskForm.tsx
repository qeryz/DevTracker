import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addTask } from "@/lib/api/tasks";
import { taskSchema } from "../TaskCard/components/utils";
import useClickOutside from "@/hooks/useClickOutside";
import { useForm } from "react-hook-form";
import { CustomModal } from "@/app/components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import ActionButtons from "./ActionButtons";

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
                <InputField
                  register={register}
                  name="title"
                  placeholder="Task Title"
                  error={errors.title}
                />
                <TextAreaField
                  register={register}
                  name="description"
                  placeholder="Task Description"
                  error={errors.description}
                />
                <ActionButtons
                  onCancel={() => setIsFormVisible(false)}
                  submitLabel="Save Task"
                  cancelLabel="Cancel"
                />
              </form>
            </div>
          }
        />
      )}
      <button
        onClick={handleOpenForm}
        className="bg-indigo-600 text-white py-1.5 px-3 rounded cursor-pointer"
        aria-label="Add Task"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
