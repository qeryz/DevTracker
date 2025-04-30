import { create } from "zustand";
import { Status, Priority } from "@/lib/types/api/tasks";

interface MiscStore {
  statuses: Status[];
  setStatuses: (statuses: Status[]) => void;
  priorities: Priority[];
  setPriorities: (priorities: Priority[]) => void;
}

const useMiscStore = create<MiscStore>((set) => ({
  statuses: [],
  setStatuses: (statuses) => set({ statuses }),
  priorities: [],
  setPriorities: (priorities) => set({ priorities }),
}));

export default useMiscStore;
