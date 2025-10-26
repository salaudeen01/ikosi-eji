import { fetchSavedArticles } from "@/api/clients";
import { useAuthStore } from "@/store/clients/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const useSavedArticles = (options?: { enabled?: boolean }) => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["savedArticles"],
    queryFn: fetchSavedArticles,
    enabled: options?.enabled ?? !!token, // only fetch when logged in
    staleTime: 1000 * 60 * 5, // cache for 2 minutes
    retry: 1, // retry once on failure
  });
};
