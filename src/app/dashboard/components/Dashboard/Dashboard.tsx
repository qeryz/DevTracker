import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "../Column/Column";
import TaskCard from "../TaskCard/TaskCard";
import { useMutation, useQueryClient } from "react-query";
import { addTask, updateTask } from "@/lib/api/tasks";
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

  const addTaskMutation = useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

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

  const allTaskIds = tasks.map((task) => task.id);

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

    const newStatusId = statusMap[over.id];
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
        <SortableContext
          items={allTaskIds}
          strategy={verticalListSortingStrategy}
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
        </SortableContext>

        {/* DragOverlay to keep the dragged item visible */}
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

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
