"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAdmin, fetchAdmins, updateAdmin } from "@/api/admin";
import { useToast } from "@/hooks/use-toast";
import { useAdminStore } from "@/store/useAdminStore";
import { CreateAdminPayload, FetchAdminsResponse } from "../../../type";
import { useRouter } from "next/navigation";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface UseCreateAdminOptions {
  onSuccessCallback?: () => void;
}

// ✅ CREATE ADMIN HOOK
export const useCreateAdmin = ({ onSuccessCallback }: UseCreateAdminOptions = {}) => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient(); // 👈 access React Query cache

  return useMutation<unknown, ApiError, CreateAdminPayload>({
    mutationFn: createAdmin,
    onSuccess: async (_, variables) => {
      toast({
        title: "Admin created successfully 🎉",
        description: `${variables.name} has been added.`,
      });

      // 👇 automatically refresh the admin list
      await queryClient.invalidateQueries({ queryKey: ["admins"] });

      if (onSuccessCallback) onSuccessCallback();
      router.push("/admin/admins");
    },
    onError: (error) => {
      toast({
        title: "Error creating admin",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
};

// ✅ UPDATE ADMIN HOOK
export const useUpdateAdmin = ({ onSuccessCallback }: UseCreateAdminOptions = {}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError, CreateAdminPayload>({
    mutationFn: updateAdmin,
    onSuccess: async (_, variables) => {
      toast({
        title: "Admin updated successfully ✅",
        description: `${variables.name} has been updated.`,
      });

      // 👇 refresh list after update too
      await queryClient.invalidateQueries({ queryKey: ["admins"] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast({
        title: "Error updating admin",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
};

// ✅ FETCH ADMINS HOOK
export const useFetchAdmins = () => {
  const { setAdmins, setPagination } = useAdminStore(); // page, search, 

  return useQuery<FetchAdminsResponse>({
    queryKey: ["admins" ], // 👈 include pagination/search in key page, search
    queryFn: async () => {
      const data = await fetchAdmins(); // page, search
      setAdmins(data.admins);
      setPagination(data.page, data.total);
      return data;
    },
  });
};
