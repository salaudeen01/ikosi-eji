import { authApi } from "@/lib/axios";
import { ArticleQueryParams, CreateAdminPayload, CreateArticlePayload, CreateCategoryPayload, FetchAdminsResponse, FetchArticlesResponse, FetchCategoriesResponse } from "../../type";



export const createAdmin = async (payload: CreateAdminPayload) => {
  const { data } = await authApi.post("/api/admin", payload);
  return data;
};

export const updateAdmin = async (payload: CreateAdminPayload) => {
    const { data } = await authApi.put("/api/admin", payload);
    return data;
  };

export const fetchAdmins = async (
    // page: number,
    // search: string
  ): Promise<FetchAdminsResponse> => {
    const { data } = await authApi.get(`/api/admin`,
         {
    //   params: { page, search },
    }
);
    return data;
  };

  // Caategories 
export const createCategory = async (payload: CreateCategoryPayload) => {
  const { data } = await authApi.post("/api/categories", payload);
  return data;
};

  export const updateCategory = async (payload: CreateCategoryPayload) => {
    const { data } = await authApi.put("/api/categories", payload);
    return data;
  };

  export const patchCategory = async (payload: CreateCategoryPayload) => {
    const { data } = await authApi.patch("/api/categories", payload);
    return data;
  };

  export const fetchCategories = async (
      // page: number,
      // search: string
    ): Promise<FetchCategoriesResponse> => {
      const { data } = await authApi.get(`/api/categories`,
           {
      //   params: { page, search },
      }
  );
      return data;
    };




  // Caategories 
  export const createArticle = async (payload: CreateArticlePayload) => {
    const { data } = await authApi.post("/api/articles", payload);
    return data;
  };
  
    // export const updateCategory = async (payload: CreateCategoryPayload) => {
    //   const { data } = await authApi.put("/api/categories", payload);
    //   return data;
    // };
  
    // export const patchCategory = async (payload: CreateCategoryPayload) => {
    //   const { data } = await authApi.patch("/api/categories", payload);
    //   return data;
    // };
  
    export const fetchArticles = async (
        params: ArticleQueryParams,
      ): Promise<FetchArticlesResponse> => {
        const response = await authApi.get(`/api/articles`,
             { params }
    );
        return response.data;
      };