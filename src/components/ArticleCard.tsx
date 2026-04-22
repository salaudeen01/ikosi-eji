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
            <h2 className="text-3xl md:text-5xl font-serif font-black mb-4 leading-tight tracking-tight drop-shadow-lg lg:max-w-4xl">
              {data?.title}
            </h2>
            <p className="text-lg md:text-2xl text-white/90 mb-6 line-clamp-2 md:line-clamp-3 font-serif leading-relaxed font-medium max-w-3xl drop-shadow-md">{data?.summary}</p>
            <div className="flex items-center text-sm font-bold uppercase tracking-widest text-white/80">
              {new Date(data.createdAt).toDateString()}
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
      <CardContent className="p-6 md:p-8 flex-grow flex flex-col bg-white">
        <div className="flex items-center text-[11px] md:text-xs font-bold uppercase tracking-widest text-accent-ocean mb-4">
          {new Date(data.createdAt).toDateString()}
        </div>
        <h3 className="text-xl md:text-3xl font-serif font-black text-slate-900 mb-4 line-clamp-3 group-hover:text-primary-green transition-colors leading-snug">
          {data?.title}
        </h3>
        <p className="text-base md:text-lg text-slate-700 mb-8 flex-grow line-clamp-3 leading-relaxed font-serif font-medium">
          {data?.summary}
        </p>
        <span className="mt-auto block w-full text-center py-4 rounded-xl border-2 border-slate-100 text-slate-800 text-sm font-bold uppercase tracking-widest group-hover:border-primary-green group-hover:text-primary-green transition-colors duration-300">
           Read Article
        </span>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
