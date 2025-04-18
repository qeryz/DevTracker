import Column from "../Column/Column";
import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";

interface DashboardProps {
  tasks: Task[];
  addTaskMutation: {
    mutate: (task: TaskCreatePayload) => void;
  };
}

const Dashboard = ({ tasks, addTaskMutation }: DashboardProps) => {
  const toDoTasks = tasks.filter((task) => task.status.title === "To Do");
  const inProgressTasks = tasks.filter(
    (task) => task.status.title === "In Progress",
  );
  const inReviewTasks = tasks.filter(
    (task) => task.status.title === "In Review",
  );
  const doneTasks = tasks.filter((task) => task.status.title === "Done");

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Column title="To Do" tasks={toDoTasks} />
        <Column title="In Progress" tasks={inProgressTasks} />
        <Column title="In Review" tasks={inReviewTasks} />
        <Column title="Done" tasks={doneTasks} />
      </div>

      <button
        onClick={() =>
          addTaskMutation.mutate({
            title: "New Task",
            description: "Description",
            status: 1,
            assignee: 1,
            priority: 1,
            epic: 1,
            sprint: 1,
            tags: [1],
            created_by: 1,
          })
        }
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default Dashboard;
