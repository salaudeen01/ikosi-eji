import { create } from "zustand";

interface ArticleCategoryState {
  page: number;
  limit: number;
  setPage: (page: number) => void;
}

export const useArticleCategoryStore = create<ArticleCategoryState>((set) => ({
  page: 1,
  limit: 20,
  setPage: (page) => set({ page }),
}));
