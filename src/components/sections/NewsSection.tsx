/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

interface NewsSectionProps {
  newsData?: any[];
}

export default function NewsSection({ newsData }: NewsSectionProps) {
  // Use passed data or fallback to dummy
  const displayNews = newsData && newsData.length > 0 ? newsData.slice(0, 3) : [
    { slug: "road-rehabilitation", categoryName: "Infrastructure", title: "Executive Chairman Inspects Ongoing Road Rehabilitation", summary: "The executive team toured the 3.5km stretch of the newly commissioned market road, promising timely delivery before the rains.", author: "Press Unit", createdAt: "Oct 12, 2023", imageUrl: "/images/assets/hero-bg.jpg" },
    { slug: "bursary-award", categoryName: "Education", title: "LCDA Distributes Bursary to 500 Indigene Students", summary: "Fulfilling educational promises, the council today issued bursary cheques to verified higher-institution students.", author: "Education Dept", createdAt: "Sep 28, 2023", imageUrl: "https://res.cloudinary.com/orestech/image/upload/v1775298709/Screenshot_2026-04-04_at_11.12.21_AM_1_sm2ni4.png" },
    { slug: "health-outreach", categoryName: "Health", title: "Free Medical Outreach Serves Over 2,000 Wards", summary: "A multi-day mobile clinic provided free consultations, malaria treatments, and eye care across all 12 communities.", author: "Health Dept", createdAt: "Sep 15, 2023", imageUrl: "/images/assets/logo.jpeg" }
  ];

  const featured = displayNews[0];
  const sideArticles = displayNews.slice(1, 3);

  return (
    <section className="py-24 bg-surface-alt font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block"
            >
              Latest Updates
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-heading font-black text-4xl sm:text-5xl text-navy leading-tight"
            >
              News & Announcements
            </motion.h2>
          </div>
          
          <div className="hidden md:block">
            <Link href="/news" className="btn-outline border-border-color text-navy py-2.5 hover:border-primary hover:text-white">
              View All News
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Featured Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-8 flex flex-col group bg-white rounded-3xl overflow-hidden shadow-sm border border-border-color hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-100 shrink-0">
              <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-3 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg">
                  {featured.categoryName || "Top Story"}
                </span>
                <span className="px-3 py-1.5 bg-navy/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1 shadow-lg">
                  <Clock className="w-3 h-3" /> 4 MIN READ
                </span>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-1 justify-center">
              <div className="flex items-center gap-4 text-xs font-bold text-text-muted uppercase tracking-wider mb-4 border-b border-border-color pb-4">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {featured.createdAt}</span>
                <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> {featured.author || "Press Unit"}</span>
              </div>
              
              <h3 className="font-heading font-bold text-3xl sm:text-4xl text-navy mb-4 leading-tight group-hover:text-primary transition-colors">
                {featured.title}
              </h3>
              
              <p className="text-text-muted text-lg line-clamp-3 mb-8">
                {featured.summary}
              </p>
              
              <div className="mt-auto">
                <Link href={`/news/article/1/${featured.slug}`} className="btn-primary inline-flex">
                  Read Full Story <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Side Cards */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {sideArticles.map((article, idx) => (
              <motion.div 
                key={article.slug || idx}
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-border-color hover:shadow-xl transition-all duration-300 flex lg:flex-col sm:flex-row flex-col h-full"
              >
                <div className="relative lg:w-full sm:w-2/5 w-full lg:aspect-video aspect-video shrink-0 overflow-hidden bg-slate-100">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 px-2.5 py-1 bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                    {article.categoryName}
                  </span>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">
                    <Calendar className="w-3.5 h-3.5 mr-1" /> {article.createdAt}
                  </div>
                  <h4 className="font-heading font-bold text-lg leading-snug text-navy mb-3 group-hover:text-primary transition-colors line-clamp-3">
                    {article.title}
                  </h4>
                  <Link href={`/news/article/1/${article.slug}`} className="mt-auto inline-flex items-center text-sm font-bold text-gold hover:text-primary transition-colors group/link">
                    Read Story <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/news" className="btn-outline w-full justify-center">
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
}
