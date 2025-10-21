import { Category } from "@/api/clients";
import { create } from "zustand";

interface CategoryState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useClientCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));
