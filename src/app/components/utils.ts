import { Task, Sprint } from "@/lib/types";
import { User } from "@/lib/types/api/users";
import { Status, Priority } from "@/lib/types/api/tasks";

export const returnUniqueSprints = (tasks: Task[]) => {
  const uniqueSprints = Array.from(
    tasks
      .map((task) => task.sprint)
      .filter((sprint): sprint is Sprint => Boolean(sprint))
      .reduce(
        (map, sprint) => map.set(sprint.id, sprint),
        new Map<number, Sprint>(),
      )
      .values(),
  );
  return uniqueSprints;
};

export const filterTypes = [
  "assignee",
  "sprint",
  "status",
  "priority",
] as const;

export type FilterType = (typeof filterTypes)[number];

export const getFilterOptions = (
  type: string,
  users: User[],
  uniqueSprints: Sprint[],
  statuses: Status[],
  priorities: Priority[],
) => {
  switch (type) {
    case "assignee":
      return users.map((user) => ({
        id: user.id,
        label: `${user.first_name} ${user.last_name}`,
      }));
    case "sprint":
      return uniqueSprints.map((sprint) => ({
        id: sprint.id,
        label: sprint.title,
      }));
    case "status":
      return statuses.map((status) => ({
        id: status.id,
        label: status.title,
      }));
    case "priority":
      return priorities.map((priority) => ({
        id: priority.id,
        label: priority.title,
      }));
    default:
      return [];
  }
};
