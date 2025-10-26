"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { useSearchStore } from "@/store/clients/useSearchStore";
import { useSearchData } from "@/hooks/mutatiion/clients/useSearchData";
import { ErrorState } from "@/components/ui/error-state";
import Layout from "@/components/layout";


const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);
  const [page, setPage] = useState(1);

  const { query , setQuery } = useSearchStore();
  const { data, isLoading, isError, refetch } = useSearchData(page, 20);

  // keep Zustand query in sync with URL param
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery, setQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      setHasSearched(true);
      setQuery(searchQuery.trim());
      router.push(`?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

    if (isError) return (
        <ErrorState
        message="Failed to fetch article details."
        onRetry={() => refetch()}
        />
    );

  const results = data?.data || [];

  return (
    <Layout>
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-6">Search Articles</h1>

            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search by title, content, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <SearchIcon className="h-5 w-5" />
                )}
              </Button>
            </form>
          </div>

          {/* Loader */}
          {isLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* No Results */}
          {!isLoading && hasSearched && results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No articles found for &quot;{searchQuery}&quot;
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Try different keywords or browse our categories
              </p>
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <>
              <div className="mb-4">
                <p className="text-muted-foreground">
                  Found {results.length} article
                  {results.length !== 1 ? "s" : ""} for &quot;{searchQuery || query}&quot;
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((article, index) => (
                  <ArticleCard
                    key={index}
                    data={article}
                    category={article.categoryName}
                  />
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
            </>
          )}

          {/* Initial Empty State */}
          {!hasSearched && initialQuery == "" && (
            <div className="text-center py-12">
              <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                Enter a search term to find articles
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
