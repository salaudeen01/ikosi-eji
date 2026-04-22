"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMember, fetchMember, patchCategory, updatemember } from "@/api/admin";
import { useToast } from "@/hooks/use-toast";
import { CreateCategoryPayload, CreateMemberPayload } from "../../../type";
import { useRouter } from "next/navigation";
import { useMemberStore } from "@/store/useMemberStore";

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
export const useCreateMember = ({ onSuccessCallback }: UseCreateOptions = {}) => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient(); // 👈 access React Query cache

  return useMutation<unknown, ApiError, CreateMemberPayload>({
    mutationFn: createMember,
    onSuccess: async (_, variables) => {
      toast({
        title: "Member created successfully 🎉",
        description: `${variables.name} has been added.`,
      });

      // 👇 automatically refresh the admin list
      await queryClient.invalidateQueries({ queryKey: ["member"] });

      if (onSuccessCallback) onSuccessCallback();
      router.push("/admin/members"); // 👈 navigate back to members list
    },
    onError: (error) => {
      toast({
        title: "Error creating member",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
};

// ✅ UPDATE ADMIN HOOK
export const useUpdateMember = ({ onSuccessCallback }: UseCreateOptions = {}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError, CreateMemberPayload>({
    mutationFn: updatemember,
    onSuccess: async (_, variables) => {
      toast({
        title: "Category updated successfully ✅",
        description: `${variables.name} has been updated.`,
      });

      // 👇 refresh list after update too
      await queryClient.invalidateQueries({ queryKey: ["category"] });

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
export const usePatchCategory = ({ onSuccessCallback }: UseCreateOptions = {}) => {
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
      await queryClient.invalidateQueries({ queryKey: ["category"] });

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

export const useFetchMember = () => {
  const filters = useMemberStore();
  const params = {
  search: filters.search,
  role: filters.role,
  page: filters.page,
  limit: filters.limit,
  }
  return useQuery({
    queryKey: ["members", params],
    queryFn: () => fetchMember(params),
    placeholderData: (previousData) => previousData, // ✅ replaces keepPreviousData
    staleTime: 1000 * 60, // optional: cache for 1 minute
  });
}
