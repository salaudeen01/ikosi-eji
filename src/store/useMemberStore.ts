import { create } from "zustand";
import { MemberState } from "../../type";

export const useMemberStore = create<MemberState>((set) => ({
  search: "",
  role: "",
  slug: "",
  page: 1,
  limit: 10,

  setSlug: (slug) => set({ slug }),
  setSearch: (search) => set({ search, page: 1 }),
  setRole: (role) => set({ role, page: 1 }),
  setPage: (page) => set({ page }),
  resetFilters: () =>
    set({
      search: "",
      role: "",
      page: 1,
      limit: 10,
    }),
}));
