import { create } from "zustand";
import { AdminState } from "../../type";

export const useAdminStore = create<AdminState>((set) => ({
    admins: [],
    page: 1,
    total: 0,
    search: "",
  
    setAdmins: (admins) => set({ admins }),
    setPagination: (page, total) => set({ page, total }),
    setSearch: (search) => set({ search, page: 1 }),
    nextPage: () => set((state) => ({ page: state.page + 1 })),
    prevPage: () => set((state) => ({ page: Math.max(1, state.page - 1) })),
  }));