import { fetchSearchResults } from "@/api/clients";
import { useSearchStore } from "@/store/clients/useSearchStore";
import { useQuery } from "@tanstack/react-query";

export const useSearchData = (page = 1, limit = 10) => {
  const query = useSearchStore((state) => state.query);

  return useQuery({
    queryKey: ["searchResults", query, page, limit],
    queryFn: () => fetchSearchResults(query, page, limit),
    enabled: !!query, // only run if query exists
    staleTime: 60_000,
  });
};
