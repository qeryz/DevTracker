"use client";

import { useMutation, useQueryClient } from "react-query";
import { updateTask } from "@/lib/api/tasks";
import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";
import { mapTaskToPayload } from "./utils";
import useUsersStore from "@/store/useUsersStore";
import CustomSelect from "@/app/components/CustomSelect";
import { DefaultAvatar } from "@/app/components";

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

  // Handle selection change
  const handleAssigneeChange = (userId: number) => {
    const updatedTask = mapTaskToPayload(task, { assignee: userId });
    mutation.mutate({ id: task.id, updates: updatedTask });
  };

  // Map users to CustomSelect options
  const userOptions = users.map((user) => ({
    id: user.id,
    label: `${user.first_name} ${user.last_name}`,
    icon: <DefaultAvatar width={20} height={20} />,
  }));

  return (
    <div
      style={{
        minWidth: `calc(100% + 36px)`,
      }}
      className="flex items-center justify-center rounded-md shadow-sm min-w-[max-content] bg-white"
    >
      <CustomSelect
        label=""
        options={userOptions}
        selectedId={task.assignee?.id || 0}
        onChange={handleAssigneeChange}
      />
    </div>
  );
};

export default UserList;
