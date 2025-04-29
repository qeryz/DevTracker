"use client";

import { useMutation, useQueryClient } from "react-query";
import { updateTask } from "@/lib/api/tasks";
import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";
import { mapTaskToPayload } from "./utils";
import useUsersStore from "@/store/useUsersStore";

interface UserListProps {
  task: Task;
}

const UserList = ({ task }: UserListProps) => {
  const { users } = useUsersStore((state) => state);
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

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAssigneeId = parseInt(e.target.value, 10);
    const updatedTask = mapTaskToPayload(task, { assignee: newAssigneeId });
    mutation.mutate({ id: task.id, updates: updatedTask });
  };

  return (
    <div className="flex items-center justify-end">
      <select
        id={`assignee-${task.id}`}
        defaultValue={task.assignee?.id ?? ""}
        onChange={handleAssigneeChange}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-1.5 w-auto items-center hover:bg-gray-50 cursor-pointer transition-colors"
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
