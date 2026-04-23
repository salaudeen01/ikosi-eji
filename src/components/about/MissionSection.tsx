"use client";

import { motion } from "framer-motion";
import { Eye, Target, Heart, CheckCircle2 } from "lucide-react";

export default function MissionSection() {
  const values = [
    "Transparency & Accountability",
    "Grassroots Development",
    "Social Justice & Equity",
    "Environmental Sustainability",
    "Excellence in Service Delivery"
  ];

  return (
    <section id="mission" className="py-24 bg-navy relative font-sans overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-heading font-black text-4xl sm:text-5xl text-white mb-6"
          >
            Our Core Blueprint
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-white/70 text-lg"
          >
            Guided by a commitment to the people, we operate on a set of fundamental principles that ensure progress and equity for all wards.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-gold/30 to-gold/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
              <Eye className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-white mb-4">Our Vision</h3>
            <p className="text-white/70 leading-relaxed">
              To be the premier, most developed, and economically vibrant Local Council Development Area in Lagos State, where every resident enjoys an optimal standard of living and equitable access to modern amenities.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors relative overflow-hidden group"
          >
            {/* Active Highlight */}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/50 to-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                <Target className="w-8 h-8 text-primary-light" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-white mb-4">Our Mission</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                To proactively deliver comprehensive dividends of democracy through innovative governance, robust infrastructure development, accessible healthcare, and strategic socio-economic empowerment.
              </p>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-white mb-6">Core Values</h3>
            <ul className="space-y-4">
              {values.map((val, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-white/80 font-medium">{val}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
