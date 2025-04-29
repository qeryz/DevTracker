import { create } from "zustand";
import { Status } from "@/lib/types/api/tasks";

interface StatusStore {
  statuses: Status[];
  setStatuses: (statuses: Status[]) => void;
}

const useStatusStore = create<StatusStore>((set) => ({
  statuses: [],
  setStatuses: (statuses) => set({ statuses }),
}));

export default useStatusStore;
