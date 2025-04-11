export type Task = {
  id: number;
  title: string;
  description: string;
  epic: string;
  sprint: string;
  status: string;
  assignee: string;
  priority: string;
  tags: string[];
  created_by: string;
};

export type TaskPayload = Omit<Task, "id">;

type UpdateTaskInput = {
  id: number;
  updates: Partial<TaskPayload>;
};

const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Complete the feature",
    status: "In Progress",
    epic: "Epic 1",
    sprint: "Sprint 1",
    assignee: "Me",
    priority: "Low",
    created_by: "User1",
    tags: ["feature", "urgent"],
  },
  {
    id: 2,
    title: "Task 2",
    description: "Fix the bug",
    status: "Done",
    epic: "Epic 1",
    sprint: "Sprint 1",
    assignee: "David Brahms",
    priority: "Low",
    created_by: "User1",
    tags: ["bug", "low-priority"],
  },
];

export const getTasks = (): Promise<typeof tasks | Error> => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(tasks), 500);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      reject(new Error("Failed to fetch tasks"));
    }
  });
};

export const addTask = (
  task: TaskPayload,
): Promise<(typeof tasks)[number] | Error> => {
  return new Promise((resolve, reject) => {
    try {
      const newTask = { ...task, id: tasks.length + 1 };
      tasks.push(newTask);
      setTimeout(() => resolve(newTask), 100); // simulate latency
    } catch (error) {
      reject(new Error("Failed to add task"));
    }
  });
};

export const updateTask = (
  input: UpdateTaskInput,
): Promise<(typeof tasks)[number] | undefined | Error> => {
  return new Promise((resolve, reject) => {
    try {
      const task = tasks.find((task) => task.id === input.id);
      if (task) {
        Object.assign(task, input.updates);
        setTimeout(() => resolve(task), 100); // Simulate latency
      } else {
        reject(new Error("Task not found"));
      }
    } catch (error) {
      reject(new Error("Failed to update task"));
    }
  });
};
