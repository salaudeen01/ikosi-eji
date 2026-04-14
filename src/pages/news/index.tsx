import ArticleCard from '@/components/ArticleCard';
import ArticleSkeleton from '@/components/ArticleSkeleton';
import EmptyState from '@/components/EmptyState';
import Layout from '@/components/layout'
import { ErrorState } from '@/components/ui/error-state';
import { useCategoryArticles, useCategoryProjects } from '@/hooks/mutatiion/clients/useCategoryArticles';
import { useArticleCategoryStore } from '@/store/clients/useArticleCategoryStore';
import React from 'react'

const Index = () => {
  const category = "news"; // hardcoded for now, can be dynamic later
  // const { data, isLoading, isError, refetch } = useCategoryProjects();
  const { data, isLoading, isError, refetch } = useCategoryArticles(category!, {
    enabled: !!category, // ✅ prevents running before category exists
  });
  const { page, setPage } = useArticleCategoryStore();

  if (isLoading) return <ArticleSkeleton />;
if (isError) return (
  <ErrorState
    message="Failed to fetch news details."
    onRetry={() => refetch()}
  />
);
  return (
    <Layout>
      <div className="bg-sky-50 dark:bg-slate-900 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 px-4 animate-[fade-in_0.5s_ease-out]">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">News</h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary-green to-accent-ocean mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest news, events, and official announcements from the LCDA.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          {data?.articles.length === 0 ? 
            <EmptyState onRefresh={refetch} />:
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
