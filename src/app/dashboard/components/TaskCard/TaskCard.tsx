import { useState } from "react";
import { TagsList } from "@/app/components";
import AssigneeSection from "./components/AssigneeSection";
import EditableTitle from "./components/EditableTitle";
import PriorityList from "./components/PriorityList";
import { Task } from "@/lib/types/api/tasks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useTaskStore from "@/store/useTaskStore";
import DetailedTaskCard from "./components/DetailedTaskCard";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("isModalOpen", isModalOpen);
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
      >
        <EditableTitle task={task} />
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
