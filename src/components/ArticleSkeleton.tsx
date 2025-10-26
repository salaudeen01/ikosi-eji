import { Skeleton } from "@/components/ui/skeleton";
import Layout from "./layout";
import { Loader2 } from "lucide-react";

export default function ArticleSkeleton() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 animate-pulse">
        {/* Title */}
        <Skeleton className="h-8 w-3/4 mb-4" />

        {/* Meta Info */}
        <div className="flex items-center space-x-2 mb-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Image */}
        <Skeleton className="h-64 w-full rounded-lg mb-6" />
        <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>

        {/* Paragraph lines */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-8/12" />
        </div>
      </div>
    </Layout>
  );
}
