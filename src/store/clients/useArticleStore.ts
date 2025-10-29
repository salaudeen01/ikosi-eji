import { create } from "zustand";
import { Article, ArticleViews, RelatedArticle } from "../../../type";

// interface ArticleState {
//   article: Article | null;
//   related: RelatedArticle[];
//   views: ArticleViews | null;
//   setArticleData: (payload: {
//     article: Article;
//     related: RelatedArticle[];
//     views: ArticleViews;
//   }) => void;
// }
interface ArticleState {
  article: Article | null;
  related: RelatedArticle[];
  views: ArticleViews | null;
  setArticleData: (payload: {
    article: Article;
    related: RelatedArticle[];
    views: ArticleViews;
  }) => void;
  setArticle: (article: Article) => void; // ✅ new method
}

// export const useArticleStore = create<ArticleState>((set) => ({
//   article: null,
//   related: [],
//   views: null,
//   setArticleData: ({ article, related, views }) => set({ article, related, views }),
// }));
export const useArticleStore = create<ArticleState>((set) => ({
  article: null,
  related: [],
  views: null,
  setArticleData: ({ article, related, views }) => set({ article, related, views }),
  setArticle: (article) => set({ article }), // ✅ added
}));
