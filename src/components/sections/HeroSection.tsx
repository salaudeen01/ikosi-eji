/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Activity } from "lucide-react";

interface HeroSectionProps {
  imageUrl?: string;
  latestNews?: any;
}

export default function HeroSection({ imageUrl = "/images/assets/hero-bg.jpg", latestNews }: HeroSectionProps) {
  const words = ["Building A", "Stronger Smarter", "Ikosi-Ejinrin"];
  
  const typeWriterStrings = [
    "Delivering Infrastructure for All",
    "Transparent Governance at Work",
    "Serving 120,000+ Residents",
  ];
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % typeWriterStrings.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [typeWriterStrings.length]);

  return (
    <section className="relative min-h-screen bg-navy overflow-hidden font-sans pt-24 md:pt-32">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-navy to-navy"></div>
      
      {/* Map Pattern Overlay (CSS-based) */}
      <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      
      {/* Right side image with gradient mask */}
      <div className="absolute inset-y-0 right-0 w-full md:w-3/5 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent z-10"></div>
        <img src={imageUrl} alt="Ikosi-Ejinrin Community" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[calc(100vh-8rem)] flex flex-col md:flex-row items-center py-12 md:py-0">
        
        {/* Left Content */}
        <div className="w-full md:w-[60%] flex flex-col items-start pt-12 md:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">Lagos State | Official Portal</span>
          </motion.div>

          <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl text-white leading-[1.1] mb-6 tracking-tight">
            <motion.span 
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="block"
            >
              Building A
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="block text-primary-light"
            >
              Stronger Smarter
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="block relative inline-block"
            >
              Ikosi-Ejinrin
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-gold" preserveAspectRatio="none" viewBox="0 0 100 10" fill="currentColor"><path d="M0 5 Q 50 10 100 5 Q 50 0 0 5 Z" /></svg>
            </motion.span>
          </h1>

          {/* Typewriter Subtext */}
          <div className="h-8 mb-10 overflow-hidden relative w-full">
            {typeWriterStrings.map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: currentTextIndex === index ? 1 : 0, 
                  y: currentTextIndex === index ? 0 : -20 
                }}
                transition={{ duration: 0.5 }}
                className="absolute text-xl text-white/70 font-medium font-body"
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-12 w-full"
          >
            <Link href="/projects" className="btn-gold shadow-gold/20 shadow-xl group">
              Explore Projects 
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/services" className="px-6 py-3 rounded-xl border border-white text-white font-bold hover:bg-white hover:text-navy transition-colors">
              Our Services
            </Link>
          </motion.div>

          {/* Trust Row */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap items-center gap-6 text-sm font-semibold text-white/80"
          >
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> 45+ Projects</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> 12 Wards</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Est. 2003</span>
          </motion.div>
        </div>

        {/* Right Floating Cards (Hidden on mobile) */}
        <div className="hidden md:flex w-[40%] flex-col relative h-[500px]">
          <motion.div 
            initial={{ opacity: 0, y: 50, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-10 right-4 w-72 bg-white rounded-2xl p-6 shadow-2xl z-20"
          >
            <h3 className="font-heading font-bold text-navy flex items-center gap-2 mb-4">
              <span className="text-xl">🏗️</span> Active Projects
            </h3>
            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                  <motion.path 
                    initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "75, 100" }} transition={{ duration: 1.5, delay: 1 }}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#006B3F" strokeWidth="3" strokeDasharray="75, 100" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-navy">45</div>
              </div>
              <div className="text-sm">
                <p className="text-text-muted">Currently tracking</p>
                <p className="font-bold text-primary">12 completed this year</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50, x: -20 }} animate={{ opacity: 1, y: 0, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-52 right-20 w-80 bg-primary bg-[url('/images/wave-pattern.svg')] bg-cover rounded-2xl p-6 shadow-2xl z-30 border border-primary-light/20"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="px-2.5 py-1 bg-white/20 text-white rounded-md text-xs font-bold uppercase tracking-wider backdrop-blur-sm">Latest News</span>
              <span className="text-2xl">📰</span>
            </div>
            <h4 className="text-white font-bold font-heading mb-4 leading-snug line-clamp-2">
              {latestNews?.title || "Executive Chairman Inspects Ongoing Road Rehabilitation Projects"}
            </h4>
            <Link href={latestNews?.slug ? `/news/article/1/${latestNews.slug}` : "/news"} className="inline-flex items-center text-sm text-gold font-bold hover:text-white transition-colors group">
              Read More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1 }}
            className="absolute bottom-20 right-10 bg-gold px-4 py-3 rounded-xl shadow-lg z-40 flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-navy animate-pulse" />
            <span className="font-bold tracking-tight text-navy text-sm">Council in session</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 w-full leading-none z-10 translate-y-1">
        <svg fill="#FFFFFF" viewBox="0 0 1440 120" className="w-full h-12 md:h-24 object-cover" preserveAspectRatio="none">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}
