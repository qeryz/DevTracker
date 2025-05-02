import { Task } from "@/lib/types";
import { CustomModal, DefaultAvatar } from "@/app/components";
import AssigneeSection from "./AssigneeSection";
import EditableTitle from "./EditableTitle";
import PriorityList from "./PriorityList";

interface DetailedTaskCardProps {
  task: Task;
  handleCloseModal: () => void;
}

const DetailedTaskCard = ({
  task,
  handleCloseModal,
}: DetailedTaskCardProps) => {
  return (
    <CustomModal
      title={<EditableTitle task={task} />}
      body={
        <div className="flex flex-row gap-4 items-center">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
              <AssigneeSection task={task} /> {task.assignee.first_name}{" "}
              {task.assignee.last_name}
            </div>
            <div>Status: {task.status.title}</div>
            <div className="flex items-center gap-2">
              Priority: <PriorityList task={task} />
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            <h3>Testing</h3>
          </div>
        </div>
      }
      onClose={handleCloseModal}
      showCloseButton={true}
    />
  );
};

export default DetailedTaskCard;
