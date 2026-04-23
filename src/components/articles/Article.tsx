/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout";
import ShareDialog from "@/components/ShareDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Bookmark, Loader2, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useArticleData } from "@/hooks/mutatiion/clients/useArticleData";
import { useClientUrl } from "@/hooks/mutatiion/clients/useBreakingNewsRotation";
import DOMPurify from "dompurify";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { ErrorState } from "@/components/ui/error-state";
import EmptyState from "@/components/EmptyState";
import { useSaveArticle } from "@/hooks/mutatiion/clients/useSaveArticle";
import { useAuthStore } from "@/store/clients/useAuthStore";
import { useLoginModalStore } from "@/store/useLoginModalStore";
import Link from "next/link";
import { DataCon } from "../../../type";
import { formatQuillContent } from "@/lib/quill-converter";

const ArticleMainPage = () => {
  const { currentUrl, origin } = useClientUrl();
  const { mutate: saveArticle, isPending } = useSaveArticle();
  const { token, isAuthenticated } = useAuthStore();
  const { openLogin } = useLoginModalStore();

  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params?.slug;

  const { data, isLoading, isError, refetch } = useArticleData(slug!, {
    enabled: !!slug, // ✅ prevents running before category exists
  });

  if (!slug) return null; // or show loader while waiting for router params
  if (isLoading) return <ArticleSkeleton />;
  if (isError) return (
    <ErrorState
      message="Failed to fetch article details."
      onRetry={() => refetch()}
    />
  );

  // ✅ safely extract data from your API structure
  const articleResponse = (data?.data ?? {}) as Partial<DataCon>;
  const { article, related, views } = articleResponse;
  const articleData = article;

  const cleanContent = formatQuillContent(articleData?.content || "");

  const handleClick = () => {
    if (!token || !isAuthenticated) {
      openLogin()
    } else {
      saveArticle(articleData?.id || 0)
    }
  };
  
  return (
    <Layout>
      <div className="bg-surface-alt min-h-screen font-sans pb-24">
        {/* Dark Navy Hero Header */}
        <section className="bg-navy pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <button 
                onClick={() => router.back()} 
                className="inline-flex items-center gap-2 text-white/50 hover:text-gold font-bold mb-6 transition-colors group text-sm uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
              </button>
              {articleData?.categoryName && (
                <Badge className="mb-6 bg-gold text-navy hover:bg-gold/90 font-bold uppercase tracking-wider">
                  {articleData.categoryName}
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-8 tracking-tight leading-tight">
                {articleData?.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{articleData?.adminName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(articleData?.createdAt || '').toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-xl shadow-navy/5 border border-border-color">
            
            {/* Actions Bar */}
            <div className="flex flex-wrap gap-4 items-center mb-8 border-b border-border-color pb-6">
              <ShareDialog
                title={articleData?.title ?? ''}
                url={currentUrl}
                image={articleData?.imageUrl}
              />
              <Button
                variant="outline"
                size="sm"
                className="border-border-color text-navy hover:bg-primary/5 hover:text-primary transition-colors h-10"
                disabled={isPending}
                onClick={handleClick}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Bookmark className="h-4 w-4 mr-2" />
                )}
                Save Article
              </Button>
            </div>

            {/* Featured Image */}
            {articleData?.imageUrl && (
              <div className="mb-10 rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={articleData.imageUrl} 
                  alt={articleData?.title} 
                  className="w-full h-auto max-h-[500px] object-cover" 
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy prose-a:text-primary hover:prose-a:text-primary/80 prose-p:text-text-base mb-16 marker:text-primary">
              <p className="text-xl text-navy font-medium mb-8 leading-relaxed border-l-4 border-primary/30 pl-6">
                {articleData?.summary}
              </p>

              {articleData?.content ? (
                <div
                  dangerouslySetInnerHTML={{ __html: cleanContent }}
                  className="article-content"
                />
              ) : (
                <EmptyState onRefresh={refetch} />
              )}
            </div>

            {/* Related Articles */}
            {related && related.length > 0 && (
              <div className="mt-16 pt-12 border-t border-border-color">
                <h3 className="text-3xl font-heading font-black text-navy mb-8">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {related.map((item, index) => (
                    <Link href={`/${item?.categoryName}/article/1/${item?.slug}`} key={index}>
                      <div className="group border border-border-color rounded-2xl p-6 bg-surface hover:bg-white hover:shadow-xl hover:shadow-navy/5 transition-all duration-300 h-full flex flex-col cursor-pointer object-cover">
                        <Badge className="w-fit mb-4 bg-primary/10 text-primary border-0 group-hover:bg-primary group-hover:text-white transition-colors">
                          {item?.categorySlug}
                        </Badge>
                        <h4 className="text-xl font-heading font-bold text-navy mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {item?.title}
                        </h4>
                        <p className="text-text-muted text-sm line-clamp-3 mb-4 flex-grow">
                          {item?.summary}
                        </p>
                        <span className="text-primary text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                          Read Full Article →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticleMainPage;