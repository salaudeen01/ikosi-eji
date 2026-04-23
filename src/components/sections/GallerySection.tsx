"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  category: string;
  caption: string;
}

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tabs = ["All", "Events", "Projects", "Community"];

  const images: GalleryImage[] = [
    { id: 1, src: "https://res.cloudinary.com/orestech/image/upload/v1775298709/Screenshot_2026-04-04_at_11.12.21_AM_1_sm2ni4.png", category: "Events", caption: "Community Townhall Meeting" },
    { id: 2, src: "/images/assets/hero-bg.jpg", category: "Projects", caption: "Road Construction Phase 1" },
    { id: 3, src: "/images/assets/logo.jpeg", category: "Community", caption: "Youth Empowerment Scheme" },
    { id: 4, src: "/images/assets/hero-bg.jpg", category: "Events", caption: "Cultural Heritage Display" },
    { id: 5, src: "https://res.cloudinary.com/orestech/image/upload/v1775298709/Screenshot_2026-04-04_at_11.12.21_AM_1_sm2ni4.png", category: "Community", caption: "Educational Bursary Award" },
    { id: 6, src: "/images/assets/hero-bg.jpg", category: "Projects", caption: "New Primary Healthcare Center" },
  ];

  const filteredImages = activeTab === "All" 
    ? images 
    : images.filter(img => img.category === activeTab);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  return (
    <section className="py-24 bg-surface-alt font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block"
          >
            Council In Action
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-heading font-black text-4xl sm:text-5xl text-navy leading-tight mb-8"
          >
            Photo Gallery
          </motion.h2>

          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 ${
                  activeTab === tab 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-white text-text-muted hover:text-navy border border-border-color shadow-sm"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>

        {/* CSS Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all border border-border-color"
                onClick={() => openLightbox(idx)}
              >
                <img src={img.src} alt={img.caption} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="px-2.5 py-1 bg-white/20 text-white rounded-md text-xs font-bold uppercase tracking-wider backdrop-blur-sm mb-2 inline-block">
                        {img.category}
                      </span>
                      <h4 className="text-white font-bold font-heading text-lg leading-snug">{img.caption}</h4>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center">
          <button className="btn-outline border-border-color text-navy hover:border-primary hover:text-white px-8">
            View Complete Gallery
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-red-500 text-white transition-colors z-[110]">
              <X className="w-6 h-6" />
            </button>

            <button onClick={handlePrev} className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={handleNext} className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]">
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
            >
              <img 
                src={filteredImages[lightboxIndex].src} 
                alt={filteredImages[lightboxIndex].caption} 
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl" 
              />
              <div className="mt-6 text-center">
                <span className="text-gold font-bold uppercase tracking-wider text-sm mb-2 block">{filteredImages[lightboxIndex].category}</span>
                <p className="text-white font-heading text-xl sm:text-2xl font-bold">{filteredImages[lightboxIndex].caption}</p>
                <p className="text-white/50 text-sm mt-2">{lightboxIndex + 1} of {filteredImages.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
