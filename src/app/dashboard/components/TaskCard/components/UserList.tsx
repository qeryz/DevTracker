"use client";

import { useQuery, useMutation } from "react-query";
import { getUsers } from "@/lib/api/users";
import { updateTask } from "@/lib/api/tasks";
import { User } from "@/lib/types/api/users";
import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";
import { mapTaskToPayload } from "./utility";

interface UserListProps {
  task: Task;
}

const UserList = ({ task }: UserListProps) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>("users", getUsers, {
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation(
    ({ id, updates }: { id: number; updates: TaskCreatePayload }) =>
      updateTask(id, updates),
    {
      onSuccess: () => {
        console.log("Task updated successfully!");
      },
      onError: (error) => {
        console.error("Error updating task:", error);
      },
    },
  );

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAssigneeId = parseInt(e.target.value, 10);

    // Use the utility function to create the updated payload
    const updatedTask = mapTaskToPayload(task, { assignee: newAssigneeId });

    // Make the API call to update the task
    mutation.mutate({ id: task.id, updates: updatedTask });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Failed to fetch users</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-gray-500">Assignee:</p>
      <select
        id="assignee"
        defaultValue={task.assignee?.id ?? ""}
        onChange={handleAssigneeChange}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-1.5 w-auto"
      >
        <option value="" hidden>
          Select Assignee
        </option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.first_name} {user.last_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserList;
