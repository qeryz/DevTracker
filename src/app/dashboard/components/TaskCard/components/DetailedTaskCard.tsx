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
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full h-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
              <AssigneeSection task={task} /> {task.assignee.first_name}{" "}
              {task.assignee.last_name}
            </div>
            <div className="flex w-full">Status: {task.status.title}</div>
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0">Priority:</span>
              <div className="flex-grow">
                <PriorityList task={task} />
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center border-t-1 sm:border-l-1 sm:border-t-0 border-gray-200 sm:pl-4">
            <div className="mt-4 sm:mt-0 pl-0">Testing</div>
          </div>
        </div>
      }
      onClose={handleCloseModal}
      showCloseButton={true}
    />
  );
};

export default DetailedTaskCard;
