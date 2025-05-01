import { TagsList } from "@/app/components";
import AssigneeSection from "./components/AssigneeSection";
import EditableTitle from "./components/EditableTitle";
import PriorityList from "./components/PriorityList";
import { Task } from "@/lib/types/api/tasks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useTaskStore from "@/store/useTaskStore";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { isEditing } = useTaskStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: isEditing });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white shadow-sm rounded-lg p-4 mb-4 hover:bg-gray-200 transition ease-in-out duration-300 cursor-pointer"
    >
      <EditableTitle task={task} />
      <PriorityList task={task} />
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
