// pages/articles/[slug].tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import axios from "axios";
import { useArticleStore } from "@/store/clients/useArticleStore"; // Zustand store you create
import { useEffect } from "react";
import { Article } from "../../../../../../type";
import ArticleMainPage from "@/components/articles/Article";

// const fetchArticle = async (slug: string) => {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/articles/${slug}`);
//   return res.data.data; // adjust to your API shape
// };
const fetchArticle = async (slug: string) => {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      : window.location.origin;
  const res = await axios.get(`${baseUrl}/api/news/${slug}`);
  return res.data.data;
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;
  if (!slug) return { notFound: true };

  // Server-side fetch minimal article for OG/meta tags
  try {
    const article = await fetchArticle(slug);

    if (!article) return { notFound: true };

    // Optionally: you can compute full canonical URL here
    const siteUrl = `${process.env.NEXT_PUBLIC_API_URL}` || "/api";
    const canonical = `${siteUrl}/${article.categorySlug}/articles/${article.slug}`;
    return {
      props: {
        article,
        canonical,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};

export default function ArticlePage({ article, canonical }: { article: Article; canonical: string }) {
  // Hydrate Zustand with the server-provided article so client uses it immediately
  const setArticle = useArticleStore((s) => s.setArticle);
  // set on mount for safety
  useEffect(() => {
    if (article) setArticle(article);
  }, [article, setArticle]);

  console.log(canonical)
  
  // Optionally use React Query to keep client fresh or pre-fetch additional content
  // Query key uses slug. It will find server state if you used dehydrate (optional).
  const { data: clientArticle } = useQuery({
    queryKey: ["article", article.slug],
    queryFn: () => fetchArticle(article.article.slug),
    initialData: article, // easy hydrate
  });

  return (
    <>
      <Head>
        <title>{article.article.title} — Ecometrics</title>
        <meta name="description" content={article.article.summary || ""} />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.article.title} />
        <meta property="og:description" content={article.article.summary || ""} />
        {article.article.imageUrl && <meta property="og:image" content={article.article.imageUrl} />}
        <meta property="og:url" content={canonical} />
        {article.article.publishedDate && <meta property="article:published_time" content={article.article.publishedDate} />}
        {article.article.author?.name && <meta property="article:author" content={article.article.author.name} />}
        {article.article.categoryName && <meta property="article:section" content={article.article.categoryName} />}

        {/* Twitter */}
        <meta name="twitter:card" content={article.article.imageUrl ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={article.article.title} />
        <meta name="twitter:description" content={article.article.summary || ""} />
        {article.article.imageUrl && <meta name="twitter:image" content={article.article.imageUrl} />}
      </Head>

      <main>
        <article>
          {/* <h1>{clientArticle.article.title}</h1> */}
          {/* render the rest */}
          <ArticleMainPage />
        </article>
      </main>
    </>
  );
}
