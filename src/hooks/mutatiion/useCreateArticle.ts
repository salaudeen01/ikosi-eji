"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createArticle, fetchArticleBySlug, fetchArticles, patchArticle, patchCategory, updateArticle, updateCategory } from "@/api/admin";
import { useToast } from "@/hooks/use-toast";
import { CreateArticlePayload, CreateCategoryPayload } from "../../../type";
import { useRouter } from "next/navigation";
import { useArticleStore } from "@/store/useArticleStore";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface UseCreateOptions {
  onSuccessCallback?: () => void;
}

// ✅ CREATE ADMIN HOOK
export const useCreateArticle = ({ onSuccessCallback }: UseCreateOptions = {}) => {
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
export const useUpdateArticle = ({ onSuccessCallback }: UseCreateOptions = {}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError, CreateArticlePayload>({
    mutationFn: updateArticle,
    onSuccess: async (_, variables) => {
      toast({
        title: "Category updated successfully ✅",
        description: `${variables.title} has been updated.`,
      });

      // 👇 refresh list after update too
      await queryClient.invalidateQueries({ queryKey: ["articles"] });

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
export const usePatchArticle = ({ onSuccessCallback }: UseCreateOptions = {}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError, CreateArticlePayload>({
    mutationFn: patchArticle,
    onSuccess: async (_, variables) => {
      toast({
        title: "Article updated successfully ✅",
        description: `${variables.title} has been updated.`,
      });

      // 👇 refresh list after update too
      await queryClient.invalidateQueries({ queryKey: ["articles"] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast({
        title: "Error updating article",
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

export const useArticle = () => {
  const { slug } = useArticleStore();

  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticleBySlug(slug!),
    enabled: !!slug, // only run if slug is set
  });
};
