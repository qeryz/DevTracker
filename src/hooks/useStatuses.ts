import { useQuery } from "react-query";
import { getStatuses } from "@/lib/api/status";
import useStatusStore from "@/store/useStatusStore";

export const useStatuses = () => {
  const { setStatuses } = useStatusStore();

  return useQuery("statuses", getStatuses, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => setStatuses(data || []),
  });
};
