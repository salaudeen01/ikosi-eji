import { useQuery } from "@tanstack/react-query";
import { fetchNavbar } from "@/api/clients";
import { useClientCategoryStore } from "@/store/clients/useNavbarStore";

export const useClientCategories = () => {
  const { setCategories, categories } = useClientCategoryStore();

  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetchNavbar();
      setCategories(res.data); // Sync Zustand once
      return res.data;
    },
    staleTime: 1000 * 60 * 10, // 10 min (prevents re-fetching)
    refetchOnWindowFocus: false, // Don’t refetch on tab change
    initialData: categories.length ? categories : undefined,
  });
};
