/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout";
import ShareDialog from "@/components/ShareDialog";
// import CommentSection from "@/components/CommentSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Bookmark } from "lucide-react";
import { useArticleStore } from "@/hooks/ArticleStore";

const Article = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [origin, setOrigin] = useState("");
  const { article } = useArticleStore();

  // Fallback data if no article is passed
  const articleData = article || {
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

  const fullImageUrl = `/${origin}${articleData.image}`;

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
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {articleData.excerpt}
              </p>

              <p className="mb-4">
                  The World Bank has released its latest economic outlook for Nigeria, projecting
                  a GDP growth rate of 3.8% for 2025. This optimistic forecast comes on the heels
                  of significant structural reforms implemented by the federal government over the
                  past year.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Key Growth Drivers</h2>
              
              <p className="mb-4">
                  Several factors are contributing to this positive economic trajectory. The
                  government&apos;s fiscal reforms have begun to show tangible results, with improved
                  revenue collection and more efficient public spending. The naira&apos;s recent
                  appreciation has also bolstered investor confidence.
              </p>

              <p className="mb-4">
                  Security improvements across the country, particularly in oil-producing regions,
                  have led to a significant increase in crude oil production. Nigeria is now
                  producing approximately 1.8 million barrels per day, the highest level in 18 months.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Sectoral Analysis</h2>

              <p className="mb-4">
                  The non-oil sector continues to be a bright spot in Nigeria&apos;s economy. Agricultural
                  exports have grown by 35% year-on-year, while the technology and telecommunications
                  sectors are experiencing unprecedented growth.
              </p>

              <p className="mb-4">
                  The banking sector has shown remarkable resilience, with major banks reporting
                  strong earnings in Q3 2025. The Nigerian Stock Exchange has responded positively,
                  with the All-Share Index gaining 2.5% in recent weeks.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Challenges Ahead</h2>

              <p className="mb-4">
                  Despite the positive outlook, analysts caution that challenges remain. Inflation,
                  while moderating, still stands at 23.8% - well above the Central Bank&apos;s target
                  range. Infrastructure deficits, particularly in power supply, continue to hamper
                  business operations.
              </p>

              <p className="mb-4">
                  &quot;While the reforms are moving in the right direction, sustained implementation
                  will be crucial,&quot; noted the World Bank&apos;s country director. &quot;Nigeria has the
                  potential to achieve even higher growth rates if these policies are maintained
                  and expanded.&quot;
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Investment Outlook</h2>

              <p className="mb-4">
                  Foreign direct investment has shown signs of recovery, with several multinational
                  corporations announcing new projects in Nigeria. The government&apos;s efforts to
                  improve the business environment and streamline regulatory processes are paying
                  dividends.
              </p>

              <p className="mb-4">
                  Market analysts remain cautiously optimistic about Nigeria&apos;s economic prospects.
                  With continued policy reforms and improved security, the country is well-positioned
                  to meet or exceed the World Bank&apos;s growth projections for 2025.
              </p>
              </div>
          </div>

          {/* <CommentSection /> */}

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t border-[hsl(var(--border))]">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[hsl(var(--border))] rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <Badge className="mb-2 bg-primary/10 text-[hsl(var(--primary))] hover:bg-primary/20 border-0">
                Economy
              </Badge>
              <h4 className="font-bold mb-2">
                CBN Maintains Interest Rate at 18.5% Amid Inflation Concerns
              </h4>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                The Central Bank of Nigeria holds rates steady as inflation moderates...
              </p>
            </div>
            <div className="border border-[hsl(var(--border))] rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <Badge className="mb-2 bg-primary/10 text-[hsl(var(--primary))] hover:bg-primary/20 border-0">
                Market News
              </Badge>
              <h4 className="font-bold mb-2">
                Nigerian Stock Exchange Records Highest Trading Volume in Q3
              </h4>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                The NSE All-Share Index gained 2.5% as investors showed renewed confidence...
              </p>
            </div>
          </div>
        </div>
        </article>
      </div>
    </Layout>
  );
};

export default Article;
