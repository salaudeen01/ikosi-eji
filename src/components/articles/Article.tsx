/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout";
import ShareDialog from "@/components/ShareDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Bookmark, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useArticleData } from "@/hooks/mutatiion/clients/useArticleData";
import { useClientUrl } from "@/hooks/mutatiion/clients/useBreakingNewsRotation";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { ErrorState } from "@/components/ui/error-state";
import EmptyState from "@/components/EmptyState";
import { useSaveArticle } from "@/hooks/mutatiion/clients/useSaveArticle";
import { useAuthStore } from "@/store/clients/useAuthStore";
import { useLoginModalStore } from "@/store/useLoginModalStore";
import Link from "next/link";
import { DataCon } from "../../../type";

const ArticleMainPage = () => {
  const { currentUrl, origin } = useClientUrl();
  const { mutate: saveArticle, isPending } = useSaveArticle();  
  const { token, isAuthenticated } = useAuthStore();
  const { openLogin } = useLoginModalStore();

  const params = useParams<{ slug: string}>();
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


  const handleClick = () => {
    if (!token || !isAuthenticated) {
      openLogin()
    }else{
      saveArticle(articleData?.id || 0)
    }
  };
  return (
    <Layout>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Badge className="mb-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--news-hover))]">
            {articleData?.categoryName}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))] mb-6 leading-tight">
            {articleData?.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[hsl(var(--muted-foreground))] mb-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{articleData?.adminName}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {/* <span>{articleData?.createdAt}</span> */}
              <span>{new Date(articleData?.createdAt || '').toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <ShareDialog
              title={articleData?.title ?? ''}
              url={currentUrl}
              image={articleData?.imageUrl}
            />
            <Button 
              variant="outline" 
              size="sm"
              disabled={isPending}
              onClick={() => handleClick()}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Bookmark className="h-4 w-4 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>

        <div className="mb-8 rounded-lg overflow-hidden">
          <img src={articleData?.imageUrl} alt={articleData?.title} className="w-full h-auto" />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed">
            {articleData?.summary}
          </p>

          {articleData?.content ? (
            <div 
              dangerouslySetInnerHTML={{ __html: articleData?.content }}
              className="article-content"
            />
          ) : (
            <EmptyState onRefresh={refetch} />
          )}

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t border-[hsl(var(--border))]">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            {related?.length === 0 ?
              <p>No Article Found</p>:
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related?.map((item, index)=>(
                  <div key={index} className="border border-[hsl(var(--border))] rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <Link href={`/${item?.categoryName}/article/1/${item?.slug}`}>
                      <Badge className="mb-2 bg-primary/10 text-[hsl(var(--primary))] hover:bg-primary/20 border-0">
                        {item?.categorySlug}
                      </Badge>
                      <h4 className="font-bold mb-2">
                        {item?.title}
                      </h4>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        {item?.summary}
                      </p>
                    </Link>
                  </div>
                ))}
                {/* `/${category}/article/1/${data?.slug}` */}
                {/* <div className="border border-[hsl(var(--border))] rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <Badge className="mb-2 bg-primary/10 text-[hsl(var(--primary))] hover:bg-primary/20 border-0">
                    Market News
                  </Badge>
                  <h4 className="font-bold mb-2">
                    Nigerian Stock Exchange Records Highest Trading Volume in Q3
                  </h4>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    The NSE All-Share Index gained 2.5% as investors showed renewed confidence...
                  </p>
                </div> */}
              </div>
            }
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ArticleMainPage;
