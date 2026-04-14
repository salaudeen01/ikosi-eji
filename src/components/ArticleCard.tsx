/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { Article } from "@/api/clients";

interface ArticleCardProps {
  category?: string;
  featured?: boolean;
  data: Article
}

const ArticleCard = ({
  category,
  featured = false,
  data
}: ArticleCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${category}/article/1/${data?.slug}`);
  };

  // console.log(featured)

  if (featured) {
    return (
      <Card
        className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
        onClick={handleClick}
      >
        <div className="relative h-[500px] overflow-hidden">
          <img
            src={data?.imageUrl || ''}
            alt={data?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <Badge className="mb-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--news-hover))]">
              {category}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
              {data?.title}
            </h2>
            <p className="text-lg text-white/90 mb-4 line-clamp-2">{data?.summary}</p>
            <div className="flex items-center text-sm text-white/80">
              <Calendar className="h-4 w-4 mr-2" />
              {data?.createdAt}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden glass card-hover bg-sky-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={data?.imageUrl || ''}
          alt={data?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <Badge className="mb-2 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/20 border-0">
          {category}
        </Badge>
        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[hsl(var(--primary))] transition-colors">
          {data?.title}
        </h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3 line-clamp-2">
          {data?.summary}
        </p>
        <div className="flex items-center text-xs text-[hsl(var(--muted-foreground))]">
          <Calendar className="h-3 w-3 mr-1" />
          {new Date(data.createdAt).toDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
