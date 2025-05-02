import { create } from "zustand";
import { Comments, Status, Priority } from "@/lib/types/api/tasks";

interface MiscStore {
  statuses: Status[];
  setStatuses: (statuses: Status[]) => void;
  priorities: Priority[];
  setPriorities: (priorities: Priority[]) => void;
  comments: Comments[];
  commentsByTaskId: Record<number, Comments[]>;
  setComments: (comments: Comments[]) => void;
  setCommentsByTaskId: (commentsByTaskId: Record<number, Comments[]>) => void;
}

const useMiscStore = create<MiscStore>((set) => ({
  statuses: [],
  setStatuses: (statuses) => set({ statuses }),
  priorities: [],
  setPriorities: (priorities) => set({ priorities }),
  comments: [],
  setComments: (comments) => set({ comments }),
  commentsByTaskId: {},
  setCommentsByTaskId: (commentsByTaskId) => set({ commentsByTaskId }),
}));

export default useMiscStore;
