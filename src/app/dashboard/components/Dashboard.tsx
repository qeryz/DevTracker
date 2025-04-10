import React from "react";
import Column from "./Column";

interface DashboardProps {
  tasks: {
    id: string;
    name: string;
    assignee: string;
    priority: string;
    dueDate: string;
    status: string;
  }[];
  addTaskMutation: {
    mutate: (task: {
      name: string;
      description: string;
      status: string;
      assignee: string;
      priority: string;
      dueDate: string;
    }) => void;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, addTaskMutation }) => {
  // Categorize tasks by their status
  const toDoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const inReviewTasks = tasks.filter((task) => task.status === "In Review");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Render columns with respective tasks */}
        <Column title="To Do" tasks={toDoTasks} />
        <Column title="In Progress" tasks={inProgressTasks} />
        <Column title="In Review" tasks={inReviewTasks} />
        <Column title="Done" tasks={doneTasks} />
      </div>

      <button
        onClick={() =>
          addTaskMutation.mutate({
            name: "New Task",
            description: "Description",
            status: "To Do",
            assignee: " ",
            priority: "Low",
            dueDate: new Date().toISOString().split("T")[0],
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
