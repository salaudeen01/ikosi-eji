"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createArticle, fetchArticles, fetchCategories, patchCategory, updateCategory } from "@/api/admin";
import { useToast } from "@/hooks/use-toast";
import { CreateArticlePayload, CreateCategoryPayload, FetchCategoriesResponse } from "../../../type";
import { useRouter } from "next/navigation";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useArticleStore } from "@/store/useArticleStore";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface UseCreateCategoryOptions {
  onSuccessCallback?: () => void;
}

// ✅ CREATE ADMIN HOOK
export const useCreateArticle = ({ onSuccessCallback }: UseCreateCategoryOptions = {}) => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient(); // 👈 access React Query cache

  return useMutation<unknown, ApiError, CreateArticlePayload>({
    mutationFn: createArticle,
    onSuccess: async (_, variables) => {
      toast({
        title: "Article created successfully 🎉",
        description: `${variables.title} has been added.`,
      });

      // 👇 automatically refresh the admin list
      await queryClient.invalidateQueries({ queryKey: ["articles"] });

      if (onSuccessCallback) onSuccessCallback();
      router.push("/admin/article");
    },
    onError: (error) => {
      toast({
        title: "Error creating article",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
};

// ✅ UPDATE ADMIN HOOK
export const useUpdateCategory = ({ onSuccessCallback }: UseCreateCategoryOptions = {}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError, CreateCategoryPayload>({
    mutationFn: updateCategory,
    onSuccess: async (_, variables) => {
      toast({
        title: "Category updated successfully ✅",
        description: `${variables.name} has been updated.`,
      });

      // 👇 refresh list after update too
      await queryClient.invalidateQueries({ queryKey: ["categories"] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast({
        title: "Error updating category",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
};

// ✅ UPDATE ADMIN HOOK
export const usePatchCategory = ({ onSuccessCallback }: UseCreateCategoryOptions = {}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError, CreateCategoryPayload>({
    mutationFn: patchCategory,
    onSuccess: async (_, variables) => {
      toast({
        title: "Category updated successfully ✅",
        description: `${variables.name} has been updated.`,
      });

      // 👇 refresh list after update too
      await queryClient.invalidateQueries({ queryKey: ["categories"] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast({
        title: "Error updating category",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
};

// ✅ FETCH ADMINS HOOK
export const useFetchArticle = () => {
    const filters = useArticleStore();
    const params = {
    search: filters.search,
    status: filters.status,
    categoryId: filters.categoryId,
    adminId: filters.adminId,
    startDate: filters.startDate,
    endDate: filters.endDate,
    page: filters.page,
    limit: filters.limit,
    }
    return useQuery({
      queryKey: ["articles", params],
      queryFn: () => fetchArticles(params),
      placeholderData: (previousData) => previousData, // ✅ replaces keepPreviousData
      staleTime: 1000 * 60, // optional: cache for 1 minute
    });
};

// const filters: Record<string, string | number | null> = {
//     slug: params.slug ?? null,
//     search: params.search ?? null,
//     status: params.status ?? null,
//     categoryId: params.categoryId ?? null,
//     adminId: params.adminId ?? null,
//     startDate: params.startDate ?? null,
//     endDate: params.endDate ?? null,
//     page: params.page ?? 1,
//     limit: params.limit ?? 10,
//   };

