type Task = {
  id: number;
  name: string;
  description: string;
  status: string;
  assignee: string;
  priority: string;
  dueDate: string;
};

type TaskPayload = Omit<Task, "id">;

type UpdateTaskInput = {
  id: number;
  updates: Partial<TaskPayload>;
};

const tasks = [
  {
    id: 1,
    name: "Task 1",
    description: "Complete the feature",
    status: "In Progress",
    assignee: "Me",
    priority: "Low",
    dueDate: "2025-10-15",
  },
  {
    id: 2,
    name: "Task 2",
    description: "Fix the bug",
    status: "Done",
    assignee: "Me",
    priority: "Low",
    dueDate: "2025-10-15",
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
