import { Task } from "@/lib/types";
import { CustomModal, DefaultAvatar } from "@/app/components";
import AssigneeSection from "./AssigneeSection";
import EditableTitle from "./EditableTitle";
import PriorityList from "./PriorityList";
import { CommentsSection } from "./CommentsSection";

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
        <div className="flex flex-col sm:flex-row h-full flex-grow text-gray-600">
          <div className="flex flex-col gap-4 w-full flex-grow pr-4">
            <div className="flex items-center gap-2">
              <AssigneeSection task={task} /> {task.assignee.first_name}{" "}
              {task.assignee.last_name}
            </div>
            <div className="flex w-full font-medium">
              Status:{" "}
              <span className="ml-2 font-normal">{task.status.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0 font-medium">Priority:</span>
              <div className="flex-grow">
                <PriorityList task={task} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0 font-medium">Sprint:</span>
              <div className="flex-grow">
                {task.sprint ? task.sprint.title : "No sprint assigned"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0">Description:</span>
              <div className="flex-grow">
                {task.description ? task.description : "No details provided"}
              </div>
            </div>
          </div>
          <div className="flex w-full items-start justify-center border-t-1 sm:border-l-1 sm:border-t-0 border-gray-200 sm:pl-4">
            <div className="flex w-full mt-4 sm:mt-0 pl-0">
              <CommentsSection taskId={task.id} />
            </div>
          </div>
        </div>
      }
      onClose={handleCloseModal}
      showCloseButton={true}
    />
  );
};

export default DetailedTaskCard;
