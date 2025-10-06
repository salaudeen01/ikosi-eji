"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout";
import ShareDialog from "@/components/ShareDialog";
import CommentSection from "@/components/CommentSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Bookmark } from "lucide-react";

const Article = () => {
  const params = useParams();
  const [currentUrl, setCurrentUrl] = useState("");
  const [origin, setOrigin] = useState("");

  // Fallback data if no article is passed
  const articleData = {
    title: "Nigerian Economy Projected to Grow 3.8% in 2025 as Reforms Take Hold",
    category: "Economy",
    date: "September 30, 2025",
    author: "Ugodre Obi-Chukwu",
    image: "/images/assets/hero-market.jpg",
    excerpt:
      "World Bank forecasts robust growth for Nigeria as fiscal reforms, improved security, and higher oil production boost economic prospects for the coming year.",
  };

  // ✅ Only run this in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      setOrigin(window.location.origin);
    }
  }, []);

  const fullImageUrl = `${origin}${articleData.image}`;

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{articleData.title} | Nairametrics</title>
          <meta name="description" content={articleData.excerpt} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={currentUrl} />
          <meta property="og:title" content={articleData.title} />
          <meta property="og:description" content={articleData.excerpt} />
          <meta property="og:image" content={fullImageUrl} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={currentUrl} />
          <meta name="twitter:title" content={articleData.title} />
          <meta name="twitter:description" content={articleData.excerpt} />
          <meta name="twitter:image" content={fullImageUrl} />
        </Helmet>

        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
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
              <ShareDialog title={articleData.title} url={currentUrl} image={articleData.image} />
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={articleData.image}
              alt={articleData.title}
              className="w-full h-auto"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed">
              {articleData.excerpt}
            </p>

            {/* ...rest of your article text... */}
          </div>

          <CommentSection />
        </article>
      </div>
    </Layout>
  );
};

export default Article;
