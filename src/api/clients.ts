import { publicApi } from "@/lib/axios"; // axios instance without auth headers
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

export const fetchNavbar = async (): Promise<FetchCategoriesResponse> => {
  const res = await publicApi.get("/api/categories/nav");
  return res.data;
};

export const fetchArticlesByCategor = async (
  slug: string,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<Article>> => {
  const res = await publicApi.get(`/api/public/articles/category/${slug}`, {
    params: { page, limit },
  });
  return res.data;
};

export const fetchArticlesByCategory = async (
  slug: string,
  page = 1,
  limit = 20
): Promise<PaginatedResponse<Article>> => {
  const res = await publicApi.get(`/api/categories/${slug}/articles`, {
    params: { page, limit },
  });
  return res.data;
};

export const fetchHomeData = async (): Promise<HomeResponse> => {
  const response = await publicApi.get<HomeResponse>("/api/home");
  return response.data;
};

export const fetchArticleBySlug = async (slug: string): Promise<ArticleResponse> => {
  if (!slug) throw new Error("Missing article slug");

  const response = await publicApi.get<ArticleResponse>(`/api/news/${slug}`);
  return response.data;
};


