import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ArticleSkeleton from '@/components/ArticleSkeleton';
import EmptyState from '@/components/EmptyState';
import Layout from '@/components/layout';
import { ErrorState } from '@/components/ui/error-state';
import { useCategoryArticles } from '@/hooks/mutatiion/clients/useCategoryArticles';
import { useArticleCategoryStore } from '@/store/clients/useArticleCategoryStore';

const Index = () => {
  const category = 'projects';
  const [activeTab, setActiveTab] = useState('all');
  const tabs = ['all', 'ongoing', 'completed'];

  const { data, isLoading, isError, refetch } = useCategoryArticles(category, {
    enabled: !!category,
    progStatus: activeTab,
  });

  const { page, setPage } = useArticleCategoryStore();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPage(1);
  };

  if (isLoading) return <ArticleSkeleton />;
  if (isError) {
    return (
      <ErrorState
        message="Failed to fetch projects details."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <Layout
      pageTitle="Projects & Infrastructure"
      pageDescription="Explore the latest community development projects, infrastructure expansions, and community empowerment programs."
    >
      <div className="bg-surface-alt min-h-screen font-sans">
        {/* Dark Navy Hero Header */}
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

        <div className="container mx-auto px-4 py-12">
          {/* Tabs Filter */}
          <div className="flex justify-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-border-color shadow-sm shrink-0"
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-6 py-2.5 rounded-xl font-bold capitalize text-sm transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-primary text-white shadow-md'
                      : 'text-text-muted hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>
          </div>

          {data?.articles.length === 0 ? (
            <EmptyState onRefresh={refetch} />
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.articles.map((project, index) => (
                  <motion.div
                    key={project.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-white rounded-2xl border border-border-color overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="w-full aspect-video relative overflow-hidden bg-slate-100">
                      <img
                        src={project.imageUrl || '/images/assets/hero-bg.jpg'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Status Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        {project.progStatus === 'completed' ? (
                          <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md backdrop-blur-md">
                            Completed
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gold text-navy text-xs font-bold uppercase tracking-wider rounded-lg shadow-md backdrop-blur-md">
                            Ongoing
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center text-xs font-semibold text-text-muted mb-3 uppercase tracking-wider">
                        <MapPin className="w-4 h-4 text-primary mr-1" />
                        {project.location || 'Ikosi-Ejinrin'}
                      </div>

                      <h3 className="font-heading font-bold text-xl text-navy  mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-text-muted text-sm line-clamp-2 mb-6 flex-1">
                        {project.summary}
                      </p>

                      {/* Progress Bar for Ongoing */}
                      {project.progStatus !== 'completed' && (
                        <div className="mb-6">
                          <div className="flex justify-between text-xs font-bold text-navy  mb-2">
                            <span>Completion</span>
                            <span className="text-primary">{project.progress || 50}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-surface-alt rounded-full overflow-hidden border border-border-color/50">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-1000"
                              style={{ width: `${project.progress || 50}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="border-t border-border-color pt-4 flex items-center justify-between mt-auto">
                        <div className="flex items-center text-sm font-medium text-text-muted">
                          <Calendar className="w-4 h-4 mr-1.5 opacity-60" />
                          {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                        <Link
                          href={`/projects/article/1/${project.slug}`}
                          className="inline-flex items-center text-sm font-bold text-primary group-hover:underline"
                        >
                          View Project <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {data?.pagination && (
                <div className="mt-12 text-slate-600  flex justify-between items-center text-sm font-medium">
                  <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-border-color">
                    Page {page} of {data?.pagination.totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                      className="px-4 py-2 bg-white border border-border-color rounded-full disabled:opacity-50 hover:bg-sky-50 dark:hover:bg-slate-700 transition"
                    >
                      Prev
                    </button>
                    <button
                      disabled={page >= data?.pagination.totalPages}
                      onClick={() => setPage(page + 1)}
                      className="px-4 py-2 bg-white border border-border-color rounded-full disabled:opacity-50 hover:bg-sky-50 dark:hover:bg-slate-700 transition"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;