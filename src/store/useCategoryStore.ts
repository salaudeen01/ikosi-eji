import { create } from "zustand";
import { CategoryState } from "../../type";

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    page: 1,
    total: 0,
    search: "",
  
    setCategories: (categories) => set({ categories }),
    setPagination: (page, total) => set({ page, total }),
    setSearch: (search) => set({ search, page: 1 }),
    nextPage: () => set((state) => ({ page: state.page + 1 })),
    prevPage: () => set((state) => ({ page: Math.max(1, state.page - 1) })),
  }));