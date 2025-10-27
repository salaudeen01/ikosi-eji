// src/hooks/mutation/admin/useAdminDashboard.ts
"use client";

import { authApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const { data } = await authApi.get("/dashboard/stats");
      return data;
    },
    retry: 1,
    staleTime: 1000 * 60 * 2, // cache for 2 min
  });
};
