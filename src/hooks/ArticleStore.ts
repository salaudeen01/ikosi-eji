import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SimpleArticle } from "../../type";



interface ArticleStore {
  article: SimpleArticle | null;
  setArticle: (article: SimpleArticle) => void;
  clearArticle: () => void;
}

// Zustand store with persistence
export const useSimpleArticleStore = create<ArticleStore>()(
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
