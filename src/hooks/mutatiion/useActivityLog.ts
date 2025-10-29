import { useQuery } from "@tanstack/react-query";
import { ActivityLogResponse } from "../../../type";
import { fetchActivityLogs } from "@/api/admin";

export const useActivityLogs = (filters: {
  page?: number;
  limit?: number;
  search?: string;
  action?: string;
  userId?: number;
  adminId?: number;
}) => {
  return useQuery<ActivityLogResponse>({
    queryKey: ["activity-logs", filters],
    queryFn: () => fetchActivityLogs(filters),
    placeholderData: (prev) => prev, // 👈 replaces keepPreviousData
    staleTime: 30_000, // 30s cache
  });
};
