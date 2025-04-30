import { useQuery } from "react-query";
import { getPriorities } from "@/lib/api/priority";
import useMiscStore from "@/store/useMiscStore";

export const usePriorities = () => {
  const { setPriorities } = useMiscStore();

  return useQuery("priorities", getPriorities, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => setPriorities(data || []),
  });
};
