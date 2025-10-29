import { authApi } from "@/lib/axios";
import { ActivityLogResponse, ArticleQueryParams, CreateAdminPayload, CreateArticlePayload, CreateCategoryPayload, FetchAdminsResponse, FetchArticleResponse, FetchArticlesResponse, FetchCategoriesResponse } from "../../type";



export const createAdmin = async (payload: CreateAdminPayload) => {
  const { data } = await authApi.post("/admin", payload);
  return data;
};

export const updateAdmin = async (payload: CreateAdminPayload) => {
    const { data } = await authApi.put("/admin", payload);
    return data;
  };

  export const patchAdmin = async (payload: CreateAdminPayload) => {
    const { data } = await authApi.patch("/admin", payload);
    return data;
  };

export const fetchAdmins = async (
    // page: number,
    // search: string
  ): Promise<FetchAdminsResponse> => {
    const { data } = await authApi.get(`/admin`,
         {
    //   params: { page, search },
    }
);
    return data;
  };

  // Caategories 
export const createCategory = async (payload: CreateCategoryPayload) => {
  const { data } = await authApi.post("/categories", payload);
  return data;
};

  export const updateCategory = async (payload: CreateCategoryPayload) => {
    const { data } = await authApi.put("/categories", payload);
    return data;
  };

  export const patchCategory = async (payload: CreateCategoryPayload) => {
    const { data } = await authApi.patch("/categories", payload);
    return data;
  };

  export const fetchCategories = async (
      // page: number,
      // search: string
    ): Promise<FetchCategoriesResponse> => {
      const { data } = await authApi.get(`/categories`,
           {
      //   params: { page, search },
      }
  );
      return data;
    };




  // Caategories 
  export const createArticle = async (payload: CreateArticlePayload) => {
    const { data } = await authApi.post("/articles", payload);
    return data;
  };
  
    export const updateArticle = async (payload: CreateArticlePayload) => {
      const { data } = await authApi.put("/articles", payload);
      return data;
    };
  
    export const patchArticle = async (payload: CreateArticlePayload) => {
      const { data } = await authApi.patch("/articles", payload);
      return data;
    };
  
    export const fetchArticles = async (
        params: ArticleQueryParams,
      ): Promise<FetchArticlesResponse> => {
        const response = await authApi.get(`/articles`,
             { params }
    );
        return response.data;
      };


    export const fetchArticleBySlug = async (slug: string): Promise<FetchArticleResponse> => {
      const response = await authApi.get<FetchArticleResponse>(`/articles`, {
        params: { slug },
      });
      return response.data;
    };

    export const fetchActivityLogs = async (params: {
      page?: number;
      limit?: number;
      search?: string;
      action?: string;
      userId?: number;
      adminId?: number;
    }): Promise<ActivityLogResponse> => {
      const { data } = await authApi.get<ActivityLogResponse>("/auth/log", {
        params,
      });
      return data;
    };

