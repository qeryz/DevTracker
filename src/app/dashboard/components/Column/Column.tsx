import TaskCard from "../TaskCard/TaskCard";
import { Task } from "@/lib/types/api/tasks";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
  title: string;
  tasks: Task[];
}

const Column = ({ title, tasks }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id: title });

  return (
    <div
      ref={setNodeRef}
      data-column-title={title}
      className="flex flex-col bg-gray-100 rounded-lg p-4 shadow-md max-w-80 min-h-50"
    >
      <h2 className="text-sm text-gray-500 mb-4 uppercase color-gray-100">
        {title}
      </h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
