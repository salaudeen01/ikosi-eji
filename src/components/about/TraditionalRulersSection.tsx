"use client";

import { motion } from "framer-motion";
import { tranditionaRulers } from "../../../data";

export default function TraditionalRulersSection() {

  return (
    <section id="traditional-rulers" className="py-10 bg-surface-alt font-sans scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="text-gold font-bold tracking-widest text-sm uppercase mb-3 block">Royal Heritage</span>
          <h2 className="font-heading font-black text-4xl text-navy mb-4">Our Traditional Rulers</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto mb-8">
            Honoring the revered kings and chiefs who serve as the custodians of our culture, traditions, and peace.
          </p>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </div>

        {/* Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-8 pb-8 hide-scrollbar snap-x snap-mandatory">
          {tranditionaRulers.map((ruler, idx) => (
            <motion.div
              key={ruler.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="min-w-[300px] w-[85%] lg:w-auto shrink-0 snap-center bg-white rounded-t-full rounded-b-3xl border-2 border-gold/20 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col items-center p-8 group relative"
            >
              {/* Ornate Background Pattern */}
              <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity"></div>

              {/* Image Container with Gold Border */}
              <div className="w-48 h-48 rounded-full border-4 border-gold p-1 shadow-lg mb-8 relative z-10">
                <img src={ruler.imageUrl} alt={ruler.kingdom} className="w-full h-full object-cover rounded-full" />

                {/* Crown Icon / Accent */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full border border-gold shadow-sm">
                  <span className="text-gold font-bold text-xs uppercase tracking-widest whitespace-nowrap">{ruler.kingdom}</span>
                </div>
              </div>

              <div className="text-center relative z-10 mt-2">
                <h3 className="font-heading font-bold text-2xl text-navy mb-2 group-hover:text-gold transition-colors">{ruler.hrm}</h3>
                <p className="text-primary font-bold text-sm uppercase tracking-wider">{ruler.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
