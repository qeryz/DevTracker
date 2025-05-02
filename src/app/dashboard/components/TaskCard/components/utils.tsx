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

export const titleSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title cannot exceed 50 characters"),
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

export const formatDateAndTime = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleString("en-US", options);
};
