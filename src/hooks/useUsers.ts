import { useQuery } from "react-query";
import { getUsers } from "@/lib/api/users";
import useUsersStore from "@/store/useUsersStore";

export const useUsers = () => {
  const { setUsers } = useUsersStore();

  return useQuery("users", getUsers, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => setUsers(data || []),
  });
};
