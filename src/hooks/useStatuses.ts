import { useQuery } from "react-query";
import { getStatuses } from "@/lib/api/status";
import useMiscStore from "@/store/useMiscStore";

export const useStatuses = () => {
  const { setStatuses } = useMiscStore();

  return useQuery("statuses", getStatuses, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => setStatuses(data || []),
  });
};
