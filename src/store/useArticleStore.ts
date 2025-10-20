import { create } from "zustand";
import { ArticleFilterState } from "../../type";

export const useArticleStore = create<ArticleFilterState>((set) => ({
  search: "",
  status: "",
  categoryId: undefined,
  adminId: undefined,
  startDate: undefined,
  endDate: undefined,
  page: 1,
  limit: 10,

  setSearch: (search) => set({ search, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
  setCategory: (categoryId) => set({ categoryId, page: 1 }),
  setAdmin: (adminId) => set({ adminId, page: 1 }),
  setDateRange: (startDate, endDate) => set({ startDate, endDate, page: 1 }),
  setPage: (page) => set({ page }),
  resetFilters: () =>
    set({
      search: "",
      status: "",
      categoryId: undefined,
      adminId: undefined,
      startDate: undefined,
      endDate: undefined,
      page: 1,
      limit: 10,
    }),
}));
