import { Task, TaskCreatePayload } from "@/lib/types/api/tasks";
import {
  ChevronDoubleDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronDoubleUpIcon,
  EqualsIcon,
} from "@heroicons/react/24/outline";
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

export const TITLE_MIN_LENGTH = 3;
export const TITLE_MAX_LENGTH = 50;
export const DESCRIPTION_MAX_LENGTH = 250;
export const DESCRIPTION_MIN_LENGTH = 10;
export const TITLE_EXCEEDED_MESSAGE = `Title cannot exceed ${TITLE_MAX_LENGTH} characters`;
export const TITLE_MIN_MESSAGE = `Title must be at least ${TITLE_MIN_LENGTH} characters`;
export const DESCRIPTION_EXCEEDED_MESSAGE = `Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters`;
export const DESCRIPTION_MIN_MESSAGE = `Description must be at least ${DESCRIPTION_MIN_LENGTH} characters`;

export const titleSchema = z.object({
  title: z
    .string()
    .min(TITLE_MIN_LENGTH, TITLE_MIN_MESSAGE)
    .max(TITLE_MAX_LENGTH, TITLE_EXCEEDED_MESSAGE),
});

export const taskSchema = z.object({
  title: titleSchema.shape.title,
  description: z
    .string()
    .min(DESCRIPTION_MIN_LENGTH, DESCRIPTION_MIN_MESSAGE)
    .max(DESCRIPTION_MAX_LENGTH, DESCRIPTION_EXCEEDED_MESSAGE),
});

interface PriorityIconProps {
  priority: "High" | "Medium" | "Low" | string;
}

export const PriorityIcon = ({ priority }: PriorityIconProps) => {
  switch (priority) {
    case "High":
      return <ChevronUpIcon className="h-5 w-5 text-red-500" />;
    case "Medium":
      return <EqualsIcon className="h-5 w-5 text-yellow-500" />;
    case "Low":
      return <ChevronDownIcon className="h-5 w-5 text-green-500" />;
    default:
      return <EqualsIcon className="h-5 w-5 text-gray-500" />;
  }
};
