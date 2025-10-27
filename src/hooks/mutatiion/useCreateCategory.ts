"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, fetchCategories, patchCategory, updateCategory } from "@/api/admin";
import { useToast } from "@/hooks/use-toast";
import { ClientCategory, CreateCategoryPayload, FetchCategoriesResponse } from "../../../type";
import { useRouter } from "next/navigation";
import { useCategoryStore } from "@/store/useCategoryStore";
import { fetchNavbar } from "@/api/clients";

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
export const useCreateCategory = ({ onSuccessCallback }: UseCreateCategoryOptions = {}) => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient(); // 👈 access React Query cache

  return useMutation<unknown, ApiError, CreateCategoryPayload>({
    mutationFn: createCategory,
    onSuccess: async (_, variables) => {
      toast({
        title: "Category created successfully 🎉",
        description: `${variables.name} has been added.`,
      });

      // 👇 automatically refresh the admin list
      await queryClient.invalidateQueries({ queryKey: ["categories"] });

      if (onSuccessCallback) onSuccessCallback();
      router.push("/admin/category");
    },
    onError: (error) => {
      toast({
        title: "Error creating category",
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
export const useFetchCategories = () => {
  const { setCategories, setPagination } = useCategoryStore(); // page, search, 

  return useQuery<FetchCategoriesResponse>({
    queryKey: ["category" ], // 👈 include pagination/search in key page, search
    queryFn: async () => {
      const data = await fetchCategories(); // page, search
      setCategories(data.data);
      setPagination(data.page, data.total);
      return data;
    },
  });
};
