import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import Column from "../Column/Column";
import TaskCard from "../TaskCard/TaskCard";
import TaskForm from "../TaskForm/TaskForm";
import { useMutation, useQueryClient } from "react-query";
import { updateTask } from "@/lib/api/tasks";
import { mapTaskToPayload } from "../TaskCard/components/utils";
import { statusMap } from "./utils";
import { useState } from "react";
import useTaskStore from "@/store/useTaskStore";
import useStatusStore from "@/store/useStatusStore";
import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";

const Dashboard = () => {
  const { tasks } = useTaskStore();
  const { statuses } = useStatusStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const queryClient = useQueryClient();
  const updateTaskMutation = useMutation(
    ({ id, updates }: { id: number; updates: TaskCreatePayload }) =>
      updateTask(id, updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    },
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 20,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) return;

    // Ensure `over.id` corresponds to the column's ID
    const overId = statuses.find((status) => status.title === over.id)
      ? over.id
      : tasks.find((task) => task.id === over.id)?.status.title;

    const newStatusId = overId
      ? statuses.find((status) => status.title === overId)?.id
      : undefined;
    if (!newStatusId || activeTask.status.id === newStatusId) return;

    try {
      const updatedTask = mapTaskToPayload(activeTask, { status: newStatusId });
      await updateTaskMutation.mutateAsync({
        id: activeTask.id,
        updates: updatedTask,
      });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statuses.map((status) => {
            const filteredTasks = tasks.filter(
              (task) => task.status.id === status.id,
            );
            return (
              <Column
                key={status.id}
                title={status.title}
                tasks={filteredTasks}
              />
            );
          })}
        </div>

        {/* DragOverlay to keep the dragged item visible */}
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
      <TaskForm />
    </div>
  );
};

export default Dashboard;
