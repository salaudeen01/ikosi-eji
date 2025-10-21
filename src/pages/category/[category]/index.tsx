/* eslint-disable @typescript-eslint/no-explicit-any */
import ArticleCard from "@/components/ArticleCard";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Layout from "@/components/layout";
import { useArticleCategoryStore } from "@/store/clients/useArticleCategoryStore";
import { useCategoryArticles } from "@/hooks/mutatiion/clients/useCategoryArticles";
import EmptyState from "@/components/EmptyState";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { ErrorState } from "@/components/ui/error-state";

const CategoryPage = () => {
  
const { page, setPage } = useArticleCategoryStore();
const params = useParams<{ category: string }>();
const category = params?.category;

const { data, isLoading, isError, refetch } = useCategoryArticles(category!, {
  enabled: !!category, // ✅ prevents running before category exists
});

if (!category) return null; // or show loader while waiting for router params

if (isLoading) return <ArticleSkeleton />;
if (isError) return (
  <ErrorState
    message="Failed to fetch article details."
    onRetry={() => refetch()}
  />
);

  return (
    <Layout>
      <div>
        {/* Hero Section */}
        {data?.category && (
          <section className="relative h-[400px] overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${data?.category.imageUrl})` }}
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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 uppercase animate-fade-in">
                {data?.category.name}
              </h1>
              <p className="text-lg text-white/90 max-w-2xl animate-fade-in">
                {data?.category.description}
              </p>
            </div>
          </section>
        )}

        <div className="container mx-auto px-4 py-12">
          {data?.articles.length === 0 ? 
            <EmptyState onRefresh={refetch} />:
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.articles.map((article, index) => (
                  <ArticleCard key={index} data={article} category={category} />
                ))}
              </div>
              {data?.pagination && (
                <div className="mt-6 flex justify-between items-center text-sm">
                  <span>
                    Page {page} of {data?.pagination.totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                      className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <button
                      disabled={page >= data?.pagination.totalPages}
                      onClick={() => setPage(page + 1)}
                      className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;