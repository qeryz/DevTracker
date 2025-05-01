import { useMutation, useQueryClient } from "react-query";
import { addTask } from "@/lib/api/tasks";

const TaskForm = () => {
  const queryClient = useQueryClient();

  const addTaskMutation = useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const handleAddTask = () => {
    addTaskMutation.mutate({
      title: "New Task",
      description: "Description",
      status: 1,
      assignee: 1,
      priority: 1,
      epic: 1,
      sprint: 1,
      tags: [1],
      created_by: 1,
    });
  };

  return (
    <button
      onClick={handleAddTask}
      className="mt-6 bg-blue-500 text-white py-1.5 px-3 rounded"
    >
      Add Task
    </button>
  );
};

export default TaskForm;
