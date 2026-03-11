import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Group {
  _id: string;
  name: string;
  inviteCode: string;
  members: string[];
}

interface GroupState {
  activeGroup: Group | null;
  setActiveGroup: (group: Group | null) => void;
}

export const useGroupStore = create<GroupState>()(
  persist(
    (set) => ({
      activeGroup: null,
      setActiveGroup: (group) => set({ activeGroup: group }),
    }),
    {
      name: 'habit-squad-group',
    }
  )
);
