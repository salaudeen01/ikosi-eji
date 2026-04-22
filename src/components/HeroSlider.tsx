"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BreakingNews } from "../../type";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

export default function NewsSlider({ newsData }: { newsData: BreakingNews[] }) {
  const [current, setCurrent] = useState(0);


  // const handleClick = () => {
  //   router.push(`/${category}/article/1/${data?.slug}`);
  // };

  // Auto scroll
  useEffect(() => {
    if (!newsData || newsData.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === newsData.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, [newsData]);

  if (!newsData || newsData.length === 0) return null;

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden flex items-center pt-24 bg-slate-900">
      {/* Slides */}
      {newsData.map((news, index) => (
        <div
          key={news.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 z-10"></div>

          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            priority={index === 0}
          />

          <div className="relative z-20 flex flex-col justify-center h-full px-6 md:px-16 w-full max-w-7xl mx-auto">
            <div
              className={`max-w-2xl transition-all duration-700 ease-out bg-slate-900/40 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/10 ${index === current ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
            >
              <span className="inline-block px-3 py-1 mb-4 bg-red-600 text-white font-bold text-xs rounded-full shadow-lg border border-red-500 uppercase tracking-widest">
                Breaking News / Campaign
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-snug drop-shadow-lg">
                {news.title}
              </h1>
              <p className="text-base md:text-lg text-slate-200 font-medium mb-8 drop-shadow-md line-clamp-3">
                {news.summary}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/news/article/1/${news?.slug}`} className="px-6 py-3 bg-primary-green hover:bg-secondary-green text-white rounded-full font-bold shadow-lg transition-all hover:scale-105 text-sm inline-flex items-center justify-center">
                  Read Full Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Line / Dots */}
      <div className="absolute bottom-8 left-0 w-full z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex gap-3">
          {newsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-500 overflow-hidden ${index === current ? "bg-primary-green w-16 md:w-24" : "bg-white/30 hover:bg-white/50 w-6"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
