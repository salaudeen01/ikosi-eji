import { ChevronRight } from "lucide-react";
import ArticleCard from "./ArticleCard";
import Link from "next/link";
import { ArticleSummary } from "../../type";

interface CategorySectionProps {
  title: string;
  articles: ArticleSummary[];
  categorySlug: string;
}

const CategorySection = ({ title, articles, categorySlug }: CategorySectionProps) => {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] ">{title}</h2>
        <Link
          // href={`#`}
          href={`/ca/${categorySlug}`}
          className="flex items-center text-sm font-medium text-[hsl(var(--primary))] hover:text-[hsl(var(--news-hover))] transition-colors"
        >
          View All
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard key={index} data={article} category={categorySlug} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
