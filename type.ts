// types/admin.ts
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
    status: string;
    summary: string;
    categoryId: string;
    content: string;
    type: string;
    videoUrl: string;
    id: string
  }

  export interface Article {
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
  
  export interface FetchArticlesResponse {
    message: string;
    data: Article[];
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
  startDate?: string;
  endDate?: string;
  page: number;
  limit: number;

  // Actions
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
    setAuth: (token: string, user: User) => void;
    logout: () => void;
  }


