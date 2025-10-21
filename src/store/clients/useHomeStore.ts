import { create } from "zustand";
import { Banner, BreakingNews, HomeCategory } from "../../../type";

interface HomeState {
  categories: HomeCategory[];
  breakingNews: BreakingNews[];
  banners: Banner[];
  setHomeData: (data: {
    categories: HomeCategory[];
    breakingNews: BreakingNews[];
    banners: Banner[];
  }) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  categories: [],
  breakingNews: [],
  banners: [],
  setHomeData: (data) => set(data),
}));
