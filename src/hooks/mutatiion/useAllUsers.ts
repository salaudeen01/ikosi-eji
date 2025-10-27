// src/hooks/query/admin/useAllUsers.ts
"use client";

import { authApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data } = await authApi.get("/users");
      return data;
    },
    staleTime: 1000 * 60, // cache for 1 min
    retry: 1,
  });
};
