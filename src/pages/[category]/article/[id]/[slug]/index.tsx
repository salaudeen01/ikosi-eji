/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import ShareDialog from "@/components/ShareDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Bookmark } from "lucide-react";
import { useArticleStore } from "@/hooks/ArticleStore";

const Article = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [origin, setOrigin] = useState("");
  const { article } = useArticleStore();

  const articleData = article || {
    title: "Nigerian Economy Projected to Grow 3.8% in 2025 as Reforms Take Hold",
    category: "Economy",
    date: "September 30, 2025",
    author: "Ugodre Obi-Chukwu",
    image: "https://res.cloudinary.com/orestech/image/upload/v1759767960/hero-market_tmjban.jpg",
    excerpt:
      "World Bank forecasts robust growth for Nigeria as fiscal reforms, improved security, and higher oil production boost economic prospects for the coming year.",
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      setOrigin(window.location.origin);
    }
  }, []);

  const fullImageUrl = articleData.image.startsWith("http")
    ? articleData.image
    : `${origin}${articleData.image.startsWith("/") ? "" : "/"}${articleData.image}`;

    console.log(fullImageUrl)

  return (
    <Layout>
      <Head>
        <title>{articleData.title} | Nairametrics</title>
        <meta name="description" content={articleData.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={articleData.title} />
        <meta property="og:description" content={articleData.excerpt} />
        <meta property="og:image" content={fullImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={articleData.title} />
        <meta name="twitter:description" content={articleData.excerpt} />
        <meta name="twitter:image" content={fullImageUrl} />
        <link rel="canonical" href={currentUrl} />
      </Head>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Badge className="mb-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--news-hover))]">
            {articleData.category}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))] mb-6 leading-tight">
            {articleData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[hsl(var(--muted-foreground))] mb-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{articleData.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{articleData.date}</span>
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <ShareDialog
              title={articleData.title}
              url={currentUrl}
              image={articleData.image}
            />
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="mb-8 rounded-lg overflow-hidden">
          <img src={articleData.image} alt={articleData.title} className="w-full h-auto" />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed">
            {articleData.excerpt}
          </p>

          {/* ...rest of article content */}
        </div>
      </article>
    </Layout>
  );
};

export default Article;
