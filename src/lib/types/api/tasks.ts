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

export type TaskCreatePayload = Omit<Task, "id">;
