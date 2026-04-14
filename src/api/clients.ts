import { clientApi, publicApi } from "@/lib/axios"; // axios instance without auth headers
import { ArticleResponse, HomeResponse, Pagination } from "../../type";

export interface Category {
  id: number;
  name: string;
  slug: string;
  status: string;
  description: string;
  imageUrl: string | null;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  imageUrl: string | null;
  createdAt: string;
}

export interface FetchCategoriesResponse {
  data: Category[];
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
  articles: Article[];
  category: Category;
  total: number;
  currentPage: number;
  totalPages: number;
}
export interface SearchResponse {
  message: string;
  data: {
    id: number;
    title: string;
    slug: string;
    summary: string;
    imageUrl: string;
    categoryName:string
    category: string;
    createdAt: string;
  }[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface SaveArticleResponse {
  success: boolean;
  message: string;
}

export interface SavedArticle {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  imageUrl: string | null;
  categoryName: string;
  createdAt: string;
}

export interface SavedArticlesResponse {
  message: string;
  savedArticles: SavedArticle[];
}

export const fetchNavbar = async (): Promise<FetchCategoriesResponse> => {
  const res = await publicApi.get("/categories/nav");
  return res.data;
};

export const fetchArticlesByCategor = async (
  slug: string,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<Article>> => {
  const res = await publicApi.get(`/public/articles/category/${slug}`, {
    params: { page, limit },
  });
  return res.data;
};

export const fetchArticlesByCategory = async (
  slug: string,
  page = 1,
  limit = 20
): Promise<PaginatedResponse<Article>> => {
  const res = await publicApi.get(`/categories/${slug}/articles`, {
    params: { page, limit },
  });
  return res.data;
};

export const fetchArticles = async (
  slug: string,
  page = 1,
  limit = 20
): Promise<PaginatedResponse<Article>> => {
  const res = await publicApi.get(`/projects/news`, {
    params: { page, limit },
  });
  return res.data;
};

export const fetchHomeData = async (): Promise<HomeResponse> => {
  const response = await publicApi.get<HomeResponse>("/home");
  return response.data;
};

export const fetchArticleBySlug = async (slug: string): Promise<ArticleResponse> => {
  if (!slug) throw new Error("Missing article slug");

  const response = await publicApi.get<ArticleResponse>(`/news/${slug}`);
  return response.data;
};

export const fetchSearchResults = async (query: string, page = 1, limit = 20): Promise<SearchResponse> => {
  const { data } = await publicApi.get(`/news/search`, {
    params: { query, page, limit },
  });
  return data;
};

export const saveArticle = async (articleId: number): Promise<SaveArticleResponse> => {
  const { data } = await clientApi.post("/news/save", { articleId });
  return data;
};

export const fetchSavedArticles = async (): Promise<SavedArticlesResponse> => {
  const { data } = await clientApi.get("/news/save");
  return data;
};


