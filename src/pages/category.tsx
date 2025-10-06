/* eslint-disable @typescript-eslint/no-explicit-any */
import ArticleCard from "@/components/ArticleCard";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Layout from "@/components/layout";

const CategoryPage = () => {
  // const { category } = useParams<{ category: string }>();
  const category  = "";

  const categoryArticles: Record<string, any[]> = {
    "market-news": [
      {
        image: "/images/assets/business-skyline.jpg",
        category: "Market News",
        title: "Nigerian Stock Exchange Records Highest Trading Volume in Q3 2025",
        excerpt: "The NSE All-Share Index gained 2.5% as investors showed renewed confidence in the banking sector.",
        date: "September 28, 2025",
      },
      {
        image: "/images/assets/hero-market.jpg",
        category: "Market News",
        title: "Banking Stocks Lead Market Rally as Investors Return",
        excerpt: "Top five banks account for 60% of market gains as sector outlook improves significantly.",
        date: "September 27, 2025",
      },
      {
        image: "/images/assets/business-meeting.jpg",
        category: "Market News",
        title: "Foreign Portfolio Investment Surges 45% in September",
        excerpt: "International investors increase stake in Nigerian equities amid improved macroeconomic indicators.",
        date: "September 26, 2025",
      },
      {
        image: "/images/assets/naira-currency.jpg",
        category: "Market News",
        title: "Bond Yields Drop to 14% as Inflation Expectations Ease",
        excerpt: "Government securities become more attractive as investors bet on monetary policy easing.",
        date: "September 25, 2025",
      },
      {
        image: "/images/assets/business-skyline.jpg",
        category: "Market News",
        title: "Market Capitalization Crosses ₦45 Trillion Mark",
        excerpt: "NSE market cap reaches new milestone driven by strong corporate earnings and investor sentiment.",
        date: "September 24, 2025",
      },
      {
        image: "/images/assets/tech-startup.jpg",
        category: "Market News",
        title: "Oil and Gas Stocks Rally on Crude Price Gains",
        excerpt: "Energy sector leads market performance as Brent crude stabilizes above $90 per barrel.",
        date: "September 23, 2025",
      },
    ],
    business: [
      {
        image: "/images/assets/tech-startup.jpg",
        category: "Technology",
        title: "Nigerian Fintech Unicorn Raises $200M in Series C Funding",
        excerpt: "Leading digital payment platform expands operations across West Africa with fresh capital injection.",
        date: "September 25, 2025",
      },
      {
        image: "/images/assets/business-meeting.jpg",
        category: "Business",
        title: "Dangote Refinery Begins Full Commercial Operations",
        excerpt: "Africa's largest refinery starts producing 650,000 barrels per day, set to transform petroleum sector.",
        date: "September 24, 2025",
      },
      {
        image: "/images/assets/business-skyline.jpg",
        category: "Real Estate",
        title: "Lagos Property Market Shows Strong Recovery in H2 2025",
        excerpt: "Commercial and residential property prices surge as demand outpaces supply in major cities.",
        date: "September 23, 2025",
      },
      {
        image: "/images/assets/tech-startup.jpg",
        category: "Business",
        title: "Nigerian E-commerce Sector Grows 50% Year-on-Year",
        excerpt: "Online retail platforms report record sales as digital adoption accelerates across demographics.",
        date: "September 22, 2025",
      },
      {
        image: "/images/assets/business-meeting.jpg",
        category: "Business",
        title: "Major Airlines Expand Routes to Nigeria Amid Tourism Boom",
        excerpt: "International carriers add flights as business travel and tourism show strong recovery.",
        date: "September 21, 2025",
      },
      {
        image: "/images/assets/tech-startup.jpg",
        category: "Business",
        title: "Manufacturing Sector PMI Hits 56.2, Strongest Growth in 3 Years",
        excerpt: "Local production increases as manufacturers benefit from improved power supply and policy support.",
        date: "September 20, 2025",
      },
    ],
    economy: [
      {
        image: "/images/assets/naira-currency.jpg",
        category: "Economy",
        title: "Naira Appreciates to ₦750/$1 at Official Market",
        excerpt: "Nigerian currency strengthens as CBN's forex reforms boost investor confidence and dollar inflows.",
        date: "September 22, 2025",
      },
      {
        image: "/images/assets/business-meeting.jpg",
        category: "Policy",
        title: "Federal Government Unveils New Tax Reform Framework",
        excerpt: "Finance Minister announces comprehensive tax policy aimed at broadening revenue base and supporting SMEs.",
        date: "September 21, 2025",
      },
      {
        image: "/images/assets/tech-startup.jpg",
        category: "Trade",
        title: "Nigeria's Non-Oil Exports Grow 35% Year-on-Year",
        excerpt: "Agricultural products and manufactured goods drive export diversification efforts in 2025.",
        date: "September 20, 2025",
      },
      {
        image: "/images/assets/hero-market.jpg",
        category: "Economy",
        title: "GDP Growth Accelerates to 3.8% in Q3 2025",
        excerpt: "Nigerian economy shows resilience as services and agriculture sectors post strong gains.",
        date: "September 19, 2025",
      },
      {
        image: "/images/assets/naira-currency.jpg",
        category: "Economy",
        title: "Foreign Reserves Climb to $38 Billion, Highest Since 2022",
        excerpt: "CBN reserves strengthen on improved oil receipts and diaspora remittances.",
        date: "September 18, 2025",
      },
      {
        image: "/images/assets/business-skyline.jpg",
        category: "Economy",
        title: "Unemployment Rate Falls to 31.5% as Job Creation Improves",
        excerpt: "NBS reports declining unemployment as tech sector and SMEs drive new employment opportunities.",
        date: "September 17, 2025",
      },
    ],
    "tech-sector": [
      {
        image: "/images/assets/tech-startup.jpg",
        category: "Technology",
        title: "Nigerian Tech Sector Attracts $2.5B in Foreign Investment",
        excerpt: "Global venture capital firms pour billions into Nigeria's thriving tech ecosystem.",
        date: "September 28, 2025",
      },
      {
        image: "/images/assets/tech-startup.jpg",
        category: "Technology",
        title: "AI Startup Launches First Made-in-Nigeria Language Model",
        excerpt: "Local tech company unveils artificial intelligence system trained on Nigerian languages and contexts.",
        date: "September 26, 2025",
      },
      {
        image: "/images/assets/business-skyline.jpg",
        category: "Technology",
        title: "5G Network Coverage Expands to 15 Major Cities",
        excerpt: "Telecom operators accelerate 5G rollout, promising faster internet speeds and better connectivity.",
        date: "September 24, 2025",
      },
      {
        image: "/images/assets/tech-startup.jpg",
        category: "Technology",
        title: "Digital Banking Adoption Surges Past 70% of Adult Population",
        excerpt: "Mobile and internet banking usage reaches new high as traditional banking declines.",
        date: "September 22, 2025",
      },
      {
        image: "/images/assets/business-meeting.jpg",
        category: "Technology",
        title: "Nigeria's Tech Talent Exports Reach $1.5B Annually",
        excerpt: "Nigerian software developers and IT professionals earn record amounts working remotely for global firms.",
        date: "September 20, 2025",
      },
      {
        image: "/images/assets/tech-startup.jpg",
        category: "Technology",
        title: "Blockchain Platform Partners with Government for Land Registry",
        excerpt: "Technology firm secures contract to digitize property records using distributed ledger technology.",
        date: "September 18, 2025",
      },
    ],
    investing: [
      {
        image: "/images/assets/hero-market.jpg",
        category: "Investing",
        title: "Top 10 Nigerian Stocks to Watch in Q4 2025",
        excerpt: "Financial analysts identify high-potential equities poised for growth based on earnings forecasts and market trends.",
        date: "September 29, 2025",
      },
      {
        image: "/images/assets/business-skyline.jpg",
        category: "Investing",
        title: "Real Estate Investment Trusts Show 25% Returns Year-to-Date",
        excerpt: "REITs outperform traditional investments as property sector rebounds strongly across major cities.",
        date: "September 27, 2025",
      },
      {
        image: "/images/assets/naira-currency.jpg",
        category: "Investing",
        title: "Nigerian Mutual Funds Attract ₦150B in New Investments",
        excerpt: "Retail and institutional investors increase allocation to mutual funds seeking professional portfolio management.",
        date: "September 25, 2025",
      },
      {
        image: "/images/assets/business-meeting.jpg",
        category: "Investing",
        title: "Guide to Building a Diversified Investment Portfolio in Nigeria",
        excerpt: "Expert advisors share strategies for balancing risk and returns across stocks, bonds, and alternative investments.",
        date: "September 23, 2025",
      },
      {
        image: "/images/assets/tech-startup.jpg",
        category: "Investing",
        title: "Energy Sector Offers Best Risk-Adjusted Returns in 2025",
        excerpt: "Investment analysts highlight opportunities in oil, gas, and renewable energy stocks amid sector transformation.",
        date: "September 21, 2025",
      },
      {
        image: "/images/assets/tech-startup.jpg",
        category: "Investing",
        title: "Cryptocurrency Investment Gains Traction Among Nigerian Youth",
        excerpt: "Digital asset adoption grows as young investors seek alternative investment vehicles and portfolio diversification.",
        date: "September 19, 2025",
      },
    ],
  };

  const categoryTitles: Record<string, string> = {
    "market-news": "Market News",
    business: "Business",
    economy: "Economy",
    "tech-sector": "Tech Sector",
    investing: "Investing",
  };

  const categoryHeroData: Record<string, { image: string; description: string }> = {
    "market-news": {
      image: "/images/assets/business-skyline.jpg",
      description: "Stay updated with the latest market trends, stock performance, and trading insights from Nigeria's financial markets.",
    },
    business: {
      image: "/images/assets/business-meeting.jpg",
      description: "Comprehensive coverage of corporate news, startups, real estate developments, and business strategies across Nigeria.",
    },
    economy: {
      image: "/images/assets/naira-currency.jpg",
      description: "In-depth analysis of economic policies, fiscal reforms, trade developments, and macroeconomic indicators shaping Nigeria's economy.",
    },
    "tech-sector": {
      image: "/images/assets/tech-startup.jpg",
      description: "Explore Nigeria's thriving technology ecosystem, innovation hubs, digital transformation, and emerging tech trends.",
    },
    investing: {
      image: "/images/assets/hero-market.jpg",
      description: "Expert investment insights, portfolio strategies, and market analysis to help you make informed investment decisions.",
    },
  };

  const articles = categoryArticles[category || ""] || [];
  const title = categoryTitles[category || ""] || "Articles";
  const heroData = categoryHeroData[category || ""];

  return (
    <Layout>
      <div>
        {/* Hero Section */}
        {heroData && (
          <section className="relative h-[400px] overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroData.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
            </div>
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-white/90 hover:text-white transition-colors mb-6 w-fit"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
                {title}
              </h1>
              <p className="text-lg text-white/90 max-w-2xl animate-fade-in">
                {heroData.description}
              </p>
            </div>
          </section>
        )}

        <div className="container mx-auto px-4 py-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ArticleCard key={index} {...article} category={''} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
