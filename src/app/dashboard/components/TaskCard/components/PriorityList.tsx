import { useState } from "react";
import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";
import { useMutation, useQueryClient } from "react-query";
import { updateTask } from "@/lib/api/tasks";
import { mapTaskToPayload, PriorityIcon } from "./utils";
import useMiscStore from "@/store/useMiscStore";
import CustomSelect from "@/app/components/CustomSelect";

interface PriorityListProps {
  task: Task;
}

const PriorityList = ({ task }: PriorityListProps) => {
  const queryClient = useQueryClient();
  const updateTaskMutation = useMutation(
    ({ id, updates }: { id: number; updates: TaskCreatePayload }) =>
      updateTask(id, updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    },
  );

  const { priorities } = useMiscStore();
  const [selectedPriority, setSelectedPriority] = useState(task.priority.id);

  const handlePriorityChange = (priorityId: number) => {
    setSelectedPriority(priorityId);

    const updatedTask = mapTaskToPayload(task, { priority: priorityId });
    updateTaskMutation.mutate({ id: task.id, updates: updatedTask });
  };

  const priorityOptions = priorities.map((priority) => ({
    id: priority.id,
    label: priority.title,
    icon: <PriorityIcon priority={priority.title} />,
  }));

  return (
    <div className="py-2">
      <CustomSelect
        label=""
        options={priorityOptions}
        selectedId={selectedPriority}
        onChange={handlePriorityChange}
      />
    </div>
  );
};

export default PriorityList;
