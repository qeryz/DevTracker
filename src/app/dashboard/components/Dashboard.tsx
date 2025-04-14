import React from "react";
import Column from "./Column";
import { Task, TaskPayload } from "@/lib/api/tasks";

interface DashboardProps {
  tasks: Task[];
  addTaskMutation: {
    mutate: (task: TaskPayload) => void;
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Render columns with respective tasks */}
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
            status: "To Do",
            assignee: " ",
            priority: "Low",
            epic: "Epic 1",
            sprint: "Sprint 1",
            tags: ["new", "task"],
            created_by: "User1",
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
