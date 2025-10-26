"use client";

import { Loader2 } from "lucide-react";
import { ErrorState } from "@/components/ui/error-state";
import Layout from "@/components/layout";
import { useSavedArticles } from "@/hooks/mutatiion/clients/useSavedArticles";
import { useAuthStore } from "@/store/clients/useAuthStore";
import { useEffect } from "react";
import { useLoginModalStore } from "@/store/useLoginModalStore";
import ArticleCard from "@/components/ArticleCard";

const SavedArticle = () => {
  const { token, isAuthenticated } = useAuthStore();
  const { openLogin, closeLogin } = useLoginModalStore();

  // Fetch only when logged in
  const { data, isLoading, isError, refetch } = useSavedArticles({
    enabled: !!token && isAuthenticated,
  });

  // Handle modal visibility based on auth state
  useEffect(() => {
    if (!token || !isAuthenticated) {
      openLogin();
    } else {
      closeLogin();
    }
  }, [token, isAuthenticated, openLogin, closeLogin]);

  if (isError)
    return (
      <ErrorState
        message="Failed to fetch saved articles."
        onRetry={() => refetch()}
      />
    );

  const results = data?.savedArticles || [];

  return (
    <Layout>
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">Saved Articles</h1>
          </div>

          {/* Loader */}
          {isLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((article, index) => (
                <ArticleCard
                  key={index}
                  data={article}
                  category={article?.categoryName}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SavedArticle;
