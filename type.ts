// types/admin.ts
import { RowDataPacket } from "mysql2";

  export interface Admin {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    phone: string;
    createdAt: string;
  }

  export interface AdminStore {
    admins: Admin[];
    total: number;
    page: number;
    limit: number;
    search: string;

    setAdmins: (admins: Admin[]) => void;
    setPagination: (page: number, total: number) => void;
    setSearch: (search: string) => void;
    resetAdmins: () => void;
  }

  export interface AdminState {
    admins: Admin[];
    page: number;
    total: number;
    search: string;
  
    // Actions
    setAdmins: (admins: Admin[]) => void;
    setPagination: (page: number, total: number) => void;
    setSearch: (search: string) => void;
    nextPage: () => void;
    prevPage: () => void;
  }
  
  export interface FetchAdminsResponse {
    admins: Admin[];
    page: number;
    total: number;
  }
  
  export interface SimpleArticle {
    image: string;
    category: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
  }

  export interface CreateAdminPayload {
    name: string;
    email: string;
    password: string;
    status: string;
    phone: string;
    role: string;
    id: string
  }

  export interface Category {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
    status: string;
    description: string;
    createdAt: string;
  }
  
  export interface FetchCategoriesResponse {
    data: Category[];
    page: number;
    total: number;
  }

  export interface CreateCategoryPayload {
    name: string;
    slug: string;
    imageUrl: string;
    status: string;
    description: string;
    id: string
  }

  export interface CategoryState {
    categories: Category[];
    page: number;
    total: number;
    search: string;
  
    // Actions
    setCategories: (categories: Category[]) => void;
    setPagination: (page: number, total: number) => void;
    setSearch: (search: string) => void;
    nextPage: () => void;
    prevPage: () => void;
  }

  export interface CreateArticlePayload {
    title: string;
    slug: string;
    imageUrl: string;
    isBreak: string;
    status: string;
    summary: string;
    categoryId: string;
    content: string;
    type: string;
    videoUrl: string;
    id: string
  }

  export interface Article {
    [x: string]: any;
    id: number;
    title: string;
    slug: string;
    summary: string;
    imageUrl: string;
    videoUrl: string;
    content: string;
    status: string;
    type: string;
    categoryId: number;
    categoryName: string;
    adminName: string;
    adminEmail: string;
    createdAt: string;
  }
  
  export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  export interface Stats {
    total: number;
    published: number;
    draft: number;
  }
  
  export interface FetchArticlesResponse {
    message: string;
    data: Article[];
    stats: Stats
    pagination: Pagination;
  }
  
  export interface ArticleQueryParams {
    slug?: string;
    search?: string;
    status?: string;
    categoryId?: number;
    adminId?: number;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }

  export interface ArticleFilterState {
    search: string;
    status: string;
    categoryId?: number;
    adminId?: number;
    slug: string;
    startDate?: string;
    endDate?: string;
    page: number;
    limit: number;

    // Actions
    setSlug: (slug: string) =>void;
    setSearch: (search: string) => void;
    setStatus: (status: string) => void;
    setCategory: (categoryId?: number) => void;
    setAdmin: (adminId?: number) => void;
    setDateRange: (startDate?: string, endDate?: string) => void;
    setPage: (page: number) => void;
    resetFilters: () => void;
  }

  // src/type/index.ts
  export interface LoginPayload {
    email: string;
    password: string;
  }

  export interface LoginResponse {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }

  export interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    setAuth: (token: string, user: User) => void;
    logout: () => void;
  }

  export interface Article {
    id: number;
    title: string;
    slug: string;
    summary: string;
    imageUrl: string;
    videoUrl: string;
    content: string;
    type: string;
    status: string;
    categoryId: number;
    shareNo: string;
    viewNo: string;
    createdAt: string;
    categoryName: string;
    adminName: string;
  }

  export interface FetchArticleResponse {
    message: string;
    data: {
      article: Article;
      related: Article[];
    };
  }
  
  // ✅ Category table
  export interface ClientCategory extends RowDataPacket {
    id: number;
    name: string;
    slug: string;
    imageUrl: string | null;
    description: string | null;
    status?: string;
  }
  
  // ✅ Article table
  export interface ClientArticle extends RowDataPacket {
    id: number;
    title: string;
    slug: string;
    summary: string | null;
    imageUrl: string | null;
    content: string | null;
    status: "draft" | "published" | "archived";
    categoryId: number;
    adminId: number;
    createdAt: string;
    updatedAt?: string;
    type?: string;
    videoUrl?: string | null;
    shareNo?: number;
    viewNo?: number;
  }
  
  // ✅ Generic count result for COUNT(*)
  export interface CountResult extends RowDataPacket {
    total: number;
  }
  
  // ✅ Stats for article dashboards
  export interface ArticleStats extends RowDataPacket {
    total: number;
    published: number;
    draft: number;
  }
  
  // ✅ Example for location or pricing (optional, expand as needed)
  export interface Location extends RowDataPacket {
    id: number;
    location_name: string;
    status: string;
  }
  
  export interface ArticleSummary {
    id: number;
    title: string;
    slug: string;
    summary: string;
    imageUrl: string;
    createdAt: string;
  }
  
  export interface HomeCategory {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    articles: ArticleSummary[];
  }
  
  export interface BreakingNews {
    id: number;
    title: string;
    slug: string;
    categoryName: string;
    categorySlug: string;
    imageUrl: string;
  }
  
  export interface Banner {
    id: number;
    title: string;
    slug: string;
    categoryName: string;
    categorySlug: string;
    summary: string;
    imageUrl: string;
    createdAt: string;
  }
  
  export interface HomeResponse {
    message: string;
    categories: HomeCategory[];
    breakingNews: BreakingNews[];
    banners: Banner[];
  }

  export interface RelatedArticle {
    id: number;
    title: string;
    slug: string;
    summary: string;
    categoryName: string;
    categorySlug: string;
  }
  
  // export interface Article {
  //   id: number;
  //   title: string;
  //   slug: string;
  //   viewNo: string;
  // }
  
  export interface ArticleViews {
    total: number;
    unique: number;
  }

  export interface DataCon {
    article: Article;
    related: RelatedArticle[];
    views: ArticleViews;
  }
  
  export interface ArticleResponse {
    message: string;
    data: DataCon;
  }
  

  // activitylog

export interface ActivityLog {
  id: number;
  userName: string | null;
  adminName: string | null;
  userEmail: string | null;
  adminEmail: string | null;
  action: string;
  ipAddress: string;
  userAgent: string;
  description: string;
  createdAt: string;
}

export interface ActivityLogResponse {
  message: string;
  data: ActivityLog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}