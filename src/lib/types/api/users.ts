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

export type UserPayload = {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};
