export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_superuser: boolean;
  last_login: string | null;
  date_joined: string;
};

export type Status = {
  id: number;
  title: string;
  category: string;
  order: number;
  is_default: boolean;
  color: string | null;
  created_at: string;
  modified_at: string;
};

export type Epic = {
  id: number;
  title: string;
  description: string;
  status: Status;
  creator: User;
  created_at: string;
  modified_at: string;
};

export type Sprint = {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  created_by: User;
  created_at: string;
  modified_at: string;
};

export type Tag = {
  id: number;
  name: string;
  created_at: string;
  modified_at: string;
};

export type Priority = {
  id: number;
  title: string;
  order: number;
  color: string | null;
  is_default: boolean;
  category: string;
  created_at: string;
  modified_at: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  status: Status;
  epic: Epic;
  sprint: Sprint;
  assignee: User;
  created_by: User;
  tags: Tag[];
  priority: Priority;
  created_at: string;
  modified_at: string;
};

export type TaskCreatePayload = {
  title: string;
  description: string;
  status: number;
  epic: number;
  sprint: number;
  assignee: number;
  priority: number;
  tags: number[];
  created_by: number;
};
