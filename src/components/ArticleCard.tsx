/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useArticleStore } from "@/hooks/ArticleStore";

interface ArticleCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  featured?: boolean;
}

const ArticleCard = ({
  image,
  category,
  title,
  excerpt,
  date,
  featured = false,
}: ArticleCardProps) => {
  const router = useRouter();
  const { setArticle } = useArticleStore();

  const handleClick = () => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setArticle({
      image,
      category,
      title,
      excerpt,
      date,
      author: "Editorial Team",
    });
    router.push(`/${category}/article/1/${slug}`);
  };

  if (featured) {
    return (
      <Card
        className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
        onClick={handleClick}
      >
        <div className="relative h-[500px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <Badge className="mb-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--news-hover))]">
              {category}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
              {title}
            </h2>
            <p className="text-lg text-white/90 mb-4 line-clamp-2">{excerpt}</p>
            <div className="flex items-center text-sm text-white/80">
              <Calendar className="h-4 w-4 mr-2" />
              {date}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden border border-[hsl(var(--border))] hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <Badge className="mb-2 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/20 border-0">
          {category}
        </Badge>
        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[hsl(var(--primary))] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3 line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center text-xs text-[hsl(var(--muted-foreground))]">
          <Calendar className="h-3 w-3 mr-1" />
          {date}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
