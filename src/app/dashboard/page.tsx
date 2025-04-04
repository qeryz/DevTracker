"use client";

import { useMutation, useQuery } from "react-query";
import { getToken } from "@/lib/api/auth";
import { getTasks, addTask, updateTask } from "@/lib/api/tasks";

const Dashboard = () => {
  const token = getToken();

  const { data: tasks, isLoading, error } = useQuery("tasks", getTasks);
  const addTaskMutation = useMutation(addTask);
  const updateTaskMutation = useMutation(updateTask);

  if (isLoading) return <div>Loading...</div>;

  if (tasks instanceof Error) {
    console.error("Error fetching tasks:", tasks.message);
    return <div>Error: {tasks.message}</div>;
  }

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            {task.name} - {task.status}
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          addTaskMutation.mutate({
            name: "New Task",
            description: "Description",
            status: "Pending",
          })
        }
      >
        Add Task
      </button>
    </div>
  );
};

export default Dashboard;
