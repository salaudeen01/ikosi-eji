import { create } from "zustand";

interface ActivityLogFilterState {
  page: number;
  limit: number;
  search: string;
  action?: string;
  userId?: number;
  adminId?: number;
  setFilters: (filters: Partial<ActivityLogFilterState>) => void;
}

export const useActivityLogStore = create<ActivityLogFilterState>((set) => ({
  page: 1,
  limit: 20,
  search: "",
  action: undefined,
  userId: undefined,
  adminId: undefined,
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
}));
