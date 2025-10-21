import { useQuery } from "@tanstack/react-query";
import { useArticleStore } from "@/store/clients/useArticleStore";
import { ArticleResponse } from "../../../../type";
import { fetchArticleBySlug } from "@/api/clients";
import { useEffect } from "react";

export const useArticleData = (slug: string, options?: { enabled?: boolean }) => {
  const setArticleData = useArticleStore((state) => state.setArticleData);

    const query = useQuery<ArticleResponse, Error>({
    queryKey: ["article", slug],
      queryFn: () => fetchArticleBySlug(slug!),
      enabled: !!slug && (options?.enabled ?? true), // ✅ skip if slug missing
      staleTime: 60_000, // 1 min
    });
  
    useEffect(() => {
      if (query.data) {
        setArticleData({
          article: query.data.data.article,
          related: query.data.data.related,
          views: query.data.data.views,
        });
      }
    }, [query.data, setArticleData]);
  
    return query;

};