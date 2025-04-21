import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";
import { z } from "zod";

export const mapTaskToPayload = (
  task: Task,
  overrides?: Partial<TaskCreatePayload>,
): TaskCreatePayload => {
  return {
    title: task.title,
    description: task.description,
    status: task.status.id,
    assignee: task.assignee.id,
    epic: task.epic.id,
    sprint: task.sprint.id,
    priority: task.priority.id,
    tags: task.tags.map((tag) => tag.id),
    created_by: task.created_by.id,
    ...overrides,
  };
};

export const titleSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title cannot exceed 50 characters"),
});
