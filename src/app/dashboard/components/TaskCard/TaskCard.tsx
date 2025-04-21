import { TagsList } from "@/app/components";
import AssigneeSection from "./components/AssigneeSection";
import EditableTitle from "./components/EditableTitle";
import { Task } from "@/lib/types/api/tasks";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
      <EditableTitle task={task} />
      <p className="text-sm text-gray-500">Priority: {task.priority.title}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <TagsList tags={task?.tags} />
      </div>
      <div className="text-right">
        <p className="inline-block text-right text-xs text-gray-500 uppercase cursor-default mr-2">
          {task.epic.title}-{task.id}
        </p>
        <AssigneeSection task={task} />
      </div>
    </div>
  );
};

export default TaskCard;
