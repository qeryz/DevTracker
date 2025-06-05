import { useState } from "react";
import dynamic from "next/dynamic";
import { TagsList } from "@/app/components";
import AssigneeSection from "./components/AssigneeSection";
import EditableTitle from "./components/EditableTitle";
import PriorityList from "./components/PriorityList";
import { Task } from "@/lib/types/api/tasks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useTaskStore from "@/store/useTaskStore";
import { OptionsMenu } from "./components/OptionsMenu";
const DetailedTaskCard = dynamic(
  () => import("../DetailedTaskCard/DetailedTaskCard"),
);

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={handleOpenModal}
        className="bg-white shadow-sm rounded-lg p-4 mb-4 hover:bg-gray-200 transition ease-in-out duration-300 cursor-pointer"
        data-task-id={task.id}
        aria-label={`Task: ${task.title}`}
      >
        <div
          className="flex items-center justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <EditableTitle task={task} />
          <OptionsMenu task={task} />
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <PriorityList task={task} />
        </div>
        <TagsList tags={task?.tags} />
        <div className="text-right" onClick={(e) => e.stopPropagation()}>
          <p className="inline-block text-right text-xs text-gray-500 uppercase cursor-default mr-2">
            {task.epic.title}-{task.id}
          </p>
          <AssigneeSection task={task} />
        </div>
      </div>
      {isModalOpen && (
        <DetailedTaskCard task={task} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
};

export default TaskCard;
