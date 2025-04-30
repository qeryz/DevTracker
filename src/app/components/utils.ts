import { Task, Sprint } from "@/lib/types";

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
