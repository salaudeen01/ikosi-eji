/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { useArticleStore } from "@/store/clients/useArticleStore";
import { useEffect } from "react";
import { fetchArticleBySlug } from "@/hooks/mutatiion/clients/fetchers/article";

interface Props {
  slug: string;
  initialData?: any;
}

export default function ArticleMainPage({ slug, initialData }: Props) {
  const setArticleData = useArticleStore((s) => s.setArticleData);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticleBySlug(slug),
    initialData,
  });

  useEffect(() => {
    if (data) {
      setArticleData({
        article: data.article,
        related: data.related,
        views: data.views,
      });
    }
  }, [data, setArticleData]);

  if (isLoading) return <p>Loading article...</p>;
  if (isError) return <p>Failed to load article.</p>;

  const { article, related, views } = data;

  return (
    <div className="article-container">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-2">{article.summary}</p>
      {article.imageUrl && (
        <img src={article.imageUrl} alt={article.title} className="rounded-xl mb-4" />
      )}
      <div dangerouslySetInnerHTML={{ __html: article.content || "" }} />
    </div>
  );
}
