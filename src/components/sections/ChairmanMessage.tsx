/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function ChairmanMessage() {
  return (
    <section className="py-10 bg-surface-alt overflow-hidden font-sans relative">
      {/* Background Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-bold tracking-widest text-sm uppercase mb-6 block">A Message From The Chairman</span>
          
          <div className="flex justify-center mb-6">
            <Quote className="w-16 h-16 text-gold opacity-50 rotate-180" />
          </div>

          <p className="text-xl md:text-2xl italic leading-relaxed text-text-muted mb-12 font-serif font-medium">
            &quot;I want to personally welcome you to the Ikosi-Ejinrin LCDA platform. Since we took office, my team and I have been on the ground making sure that every single ward—from Agbowa down to every surrounding community—feels the true impact of our work. We&apos;re busy fixing schools, supporting our local farmers, and creating real chances for our youth to succeed, because at the end of the day, this is our home, and we have to build it together.&quot;
          </p>

          <div className="w-24 h-px bg-border-color mx-auto mb-10"></div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gold/30 p-1 mb-6 relative group">
              <div className="absolute inset-0 rounded-full border border-gold/50 scale-[1.05] opacity-0 group-hover:scale-[1.1] group-hover:opacity-100 transition-all duration-500"></div>
              <img 
                src="https://res.cloudinary.com/orestech/image/upload/v1776806117/items/swsbpoz8pg93seded2hael8jh.jpg" 
                alt="Executive Chairman" 
                className="w-full h-full object-cover rounded-full shadow-xl transition-transform duration-500 group-hover:scale-105 z-10 relative"
              />
            </div>
            <h3 className="font-heading font-bold text-2xl text-navy">Wale Raji Anomo</h3>
            <span className="text-primary font-bold text-sm uppercase tracking-wider mt-1">Executive Chairman</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
