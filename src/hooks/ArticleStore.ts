import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Article {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
}

interface ArticleStore {
  article: Article | null;
  setArticle: (article: Article) => void;
  clearArticle: () => void;
}

// Zustand store with persistence
export const useArticleStore = create<ArticleStore>()(
  persist(
    (set) => ({
      article: null,
      setArticle: (article) => set({ article }),
      clearArticle: () => set({ article: null }),
    }),
    {
      name: "article-storage", // key in localStorage
    }
  )
);
