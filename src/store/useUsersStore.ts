import { create } from "zustand";
import { User } from "@/lib/types/api/users";

interface UsersStore {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: number) => void;
  setUsers: (users: User[]) => void;
}

const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  setUsers: (users) => set(() => ({ users })),
}));

export default useUsersStore;
