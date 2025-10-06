import ArticleCard from "@/components/ArticleCard";
import CategorySection from "@/components/CategorySection";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Layout from "@/components/layout";

const Index = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const featuredArticles = [
    {
      image: "https://res.cloudinary.com/orestech/image/upload/v1759767960/hero-market_tmjban.jpg",
      category: "Featured",
      title: "Nigerian Economy Projected to Grow 3.8% in 2025 as Reforms Take Hold",
      excerpt:
        "World Bank forecasts robust growth for Nigeria as fiscal reforms, improved security, and higher oil production boost economic prospects for the coming year.",
      date: "September 30, 2025",
    },
    {
      image: "https://res.cloudinary.com/orestech/image/upload/v1759767960/business-skyline_cwsedf.jpg",
      category: "Featured",
      title: "Lagos Emerges as Africa's Leading Financial Hub",
      excerpt:
        "Major international banks expand operations in Lagos as city strengthens position in continental finance sector with improved infrastructure and regulations.",
      date: "September 29, 2025",
    },
    {
      image: "https://res.cloudinary.com/orestech/image/upload/v1759767960/naira-currency_snbzhq.jpg",
      category: "Featured",
      title: "Nigerian Tech Sector Attracts $2.5B in Foreign Investment",
      excerpt:
        "Global venture capital firms pour billions into Nigeria's thriving tech ecosystem, cementing the country's status as Africa's innovation powerhouse.",
      date: "September 28, 2025",
    },
  ];

  const breakingNews = [
    "FG removes 5% telecom tax on voice, data services - Full details inside",
    "NSE All-Share Index surges past 75,000 points as banking stocks rally",
    "Naira strengthens to ₦745/$1 at official market amid improved dollar supply",
    "Nigeria's inflation rate drops to 22.5% in September, lowest in 2025",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [breakingNews.length]);

  const economyArticles = [
    {
      image: "https://res.cloudinary.com/orestech/image/upload/v1759767960/naira-currency_snbzhq.jpg",
      category: "Economy",
      title: "Naira Appreciates to ₦750/$1 at Official Market",
      excerpt:
        "Nigerian currency strengthens as CBN's forex reforms boost investor confidence and dollar inflows.",
      date: "September 22, 2025",
    },
    {
      image: "https://res.cloudinary.com/orestech/image/upload/v1759767960/business-meeting_zxlxgu.jpg",
      category: "Policy",
      title: "Federal Government Unveils New Tax Reform Framework",
      excerpt:
        "Finance Minister announces comprehensive tax policy aimed at broadening revenue base and supporting SMEs.",
      date: "September 21, 2025",
    },
    {
      image: "https://res.cloudinary.com/orestech/image/upload/v1759767960/oil-industry_aat83r.jpg",
      category: "Trade",
      title: "Nigeria's Non-Oil Exports Grow 35% Year-on-Year",
      excerpt:
        "Agricultural products and manufactured goods drive export diversification efforts in 2025.",
      date: "September 20, 2025",
    },
  ];

  return (
    <Layout>
      <div>
        {/* Hero Section Slider */}
        <section className="container mx-auto px-4 py-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {featuredArticles.map((article, index) => (
                <CarouselItem key={index}>
                  <ArticleCard
                    featured
                    image={article.image}
                    category={article.category}
                    title={article.title}
                    excerpt={article.excerpt}
                    date={article.date}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>

        {/* Breaking News Banner with Auto-Rotation */}
        <div className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-3 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              <span className="font-bold mr-4 whitespace-nowrap">BREAKING:</span>
              <div className="relative flex-1 h-5">
                {breakingNews.map((news, index) => (
                  <p
                    key={index}
                    className={`text-sm absolute inset-0 transition-all duration-500 ${
                      index === currentNewsIndex
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                  >
                    {news}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        
        <div className="container mx-auto px-4">

          {/* Economy Section */}
          <CategorySection title="Economy" articles={economyArticles} categorySlug="economy" />
          <CategorySection title="Technology" articles={economyArticles} categorySlug="tech-sector" />
        </div>

        {/* Footer */}
      </div>
    </Layout>
  );
};

export default Index;
