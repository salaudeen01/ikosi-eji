// import ArticleCard from "@/components/ArticleCard";
// import CategorySection from "@/components/CategorySection";
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Layout from "@/components/layout";
// import { useHomeData } from "@/hooks/mutatiion/clients/useHomeData";
// import { useHomeStore } from "@/store/clients/useHomeStore";
// import Link from "next/link";
// import { useBreakingNewsRotation } from "@/hooks/mutatiion/clients/useBreakingNewsRotation";
// import ArticleSkeleton from "@/components/ArticleSkeleton";
import HomeIndex from "./home";

const Index = () => {
  // const { isLoading } = useHomeData();
  // const { categories, breakingNews, banners } = useHomeStore();


  // // ✅ Custom hook — completely isolated
  // const currentNewsIndex = useBreakingNewsRotation(breakingNews?.length || 0, 5000);

  // if (isLoading) {
  //   return <ArticleSkeleton />;
  // }
  
  return (
    // <Layout>
    //   <div>
    //     {/* Hero Section Slider */}
    //     <section className="container mx-auto px-4 py-8">
    //       <Carousel
    //         opts={{
    //           align: "start",
    //           loop: true,
    //         }}
    //         plugins={[
    //           Autoplay({
    //             delay: 5000,
    //           }),
    //         ]}
    //         className="w-full"
    //       >
    //         <CarouselContent>
    //           {banners?.map((article, index) => (
    //             <CarouselItem key={index}>
    //               <ArticleCard
    //                 featured
    //                 category={article?.categoryName}
    //                 data={article}
    //               />
    //             </CarouselItem>
    //           ))}
    //         </CarouselContent>
    //         <CarouselPrevious className="left-4" />
    //         <CarouselNext className="right-4" />
    //       </Carousel>
    //     </section>

    //     {/* Breaking News Banner with Auto-Rotation */}
    //     <div className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-3 overflow-hidden">
    //       <div className="container mx-auto px-4">
    //         <div className="flex items-center">
    //           <span className="font-bold mr-4 whitespace-nowrap">BREAKING:</span>
    //           <div className="relative flex-1 h-5">
    //             {breakingNews.map((news, index) => (
    //               <Link
    //                 href={`/${news?.categoryName}/article/1/${news?.slug}`}
    //                 key={index}
    //                 className={`text-sm absolute inset-0 transition-all duration-500 ${
    //                   index === currentNewsIndex
    //                     ? "opacity-100 translate-y-0"
    //                     : "opacity-0 -translate-y-2"
    //                 }`}
    //               >
    //                 {news?.title}
    //               </Link>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
        
    //     <div className="container mx-auto px-4">

    //       {/* Economy Section */}
    //       {categories?.map((item)=>(
    //         <CategorySection key={item?.slug} title={item?.name} articles={item?.articles} categorySlug={item?.slug} />
    //       ))}
    //       {/* <CategorySection title="Technology" articles={economyArticles} categorySlug="tech-sector" /> */}
    //     </div>

    //     {/* Footer */}
    //   </div>
    // </Layout>
    <HomeIndex />
  );
};

export default Index;
