import ArticleCard from '@/components/ArticleCard';
import ArticleSkeleton from '@/components/ArticleSkeleton';
import EmptyState from '@/components/EmptyState';
import Layout from '@/components/layout'
import { ErrorState } from '@/components/ui/error-state';
import { useCategoryArticles, useCategoryProjects } from '@/hooks/mutatiion/clients/useCategoryArticles';
import { useArticleCategoryStore } from '@/store/clients/useArticleCategoryStore';
import React from 'react'

const Index = () => {
  const category = "projects"; // hardcoded for now, can be dynamic later
  // const { data, isLoading, isError, refetch } = useCategoryProjects();
  const { data, isLoading, isError, refetch } = useCategoryArticles(category!, {
    enabled: !!category, // ✅ prevents running before category exists
  });
  // const { data, isLoading, isError, refetch } = useCategoryProjects();
  const { page, setPage } = useArticleCategoryStore();

  if (isLoading) return <ArticleSkeleton />;
  if (isError) return (
    <ErrorState
      message="Failed to fetch projects details."
      onRetry={() => refetch()}
    />
  );
  return (
    <Layout
      pageTitle="Projects & Infrastructure"
      pageDescription="Explore the latest community development projects, infrastructure expansions, and community empowerment programs."
    >
      <div className="bg-surface-alt min-h-screen font-sans">
        {/* Simple Dark Navy Hero Header */}
        <section className="bg-navy pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="flex flex-col items-center text-center">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 tracking-tight">
                  Projects & Infrastructure
               </h1>
               <p className="text-white/70 text-lg max-w-2xl mx-auto">
                 Explore the latest community development projects, infrastructure expansions, and community empowerment programs.
               </p>
             </div>
          </div>
        </section>
        <div className="container mx-auto px-4 py-8">
          {data?.articles.length === 0 ?
            <EmptyState onRefresh={refetch} /> :
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.articles.map((article, index) => (
                  <ArticleCard key={index} data={article} />
                ))}
              </div>
              {data?.pagination && (
                <div className="mt-6 text-slate-600 dark:text-slate-300 flex justify-between items-center text-sm font-medium">
                  <span className="bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
                    Page {page} of {data?.pagination.totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                      className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full disabled:opacity-50 hover:bg-sky-50 transition"
                    >
                      Prev
                    </button>
                    <button
                      disabled={page >= data?.pagination.totalPages}
                      onClick={() => setPage(page + 1)}
                      className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full disabled:opacity-50 hover:bg-sky-50 transition"
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
  )
}

export default Index