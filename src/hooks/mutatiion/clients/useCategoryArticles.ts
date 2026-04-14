import { useQuery } from "@tanstack/react-query";
import { fetchArticles, fetchArticlesByCategory } from "@/api/clients";
import { useArticleCategoryStore } from "@/store/clients/useArticleCategoryStore";

// export const useCategoryArticles = (slug: string) => {
//   const { page, limit } = useArticleCategoryStore();

//   return useQuery({
//     queryKey: ["articles", slug, page],
//     queryFn: () => fetchArticlesByCategory(slug, page, limit),
//     staleTime: 1000 * 60, // 1 minute cache
//   });
// };
// import { useQuery } from "@tanstack/react-query";
// import { fetchArticlesByCategory } from "@/lib/api/articles";
// import { useArticlePaginationStore } from "@/store/useArticlePaginationStore";

export const useCategoryArticles = (slug?: string, options?: { enabled?: boolean }) => {
  const { page, limit } = useArticleCategoryStore();

  return useQuery({
    queryKey: ["articles", slug, page],
    queryFn: () => fetchArticlesByCategory(slug!, page, limit),
    enabled: !!slug && (options?.enabled ?? true), // ✅ skip if slug missing
    staleTime: 60_000,
  });
};

export const useCategoryProjects = (slug?: string, options?: { enabled?: boolean }) => {
  const { page, limit } = useArticleCategoryStore();
console.log(slug)
  return useQuery({
    queryKey: ["articles", page],
    queryFn: () => fetchArticles(slug!, page, limit),
    enabled: !!slug && (options?.enabled ?? true), // ✅ skip if slug missing
    staleTime: 60_000,
  });
};
