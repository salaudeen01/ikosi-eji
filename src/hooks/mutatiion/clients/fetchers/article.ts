import { publicApi } from "@/lib/axios";
import { Article, ArticleViews, RelatedArticle } from "../../../../../type";

export interface ArticleResponse {
  article: Article;
  related: RelatedArticle[];
  views: ArticleViews;
}

export const fetchArticleBySlug = async (slug: string): Promise<ArticleResponse> => {
  const res = await publicApi.get(`/api/articles/${slug}`);
  return res.data.data;
};
