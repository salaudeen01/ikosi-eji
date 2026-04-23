"use client";

import { motion } from "framer-motion";
import { MapPin, Maximize, Users, Sun } from "lucide-react";
import { communities } from "../../../data";

export default function GeographySection() {
  const stats = [
    { icon: MapPin, label: "Location", value: "Eastern Lagos Mainland" },
    { icon: Maximize, label: "Total Area", value: "Approx. 45 sq km" },
    { icon: Users, label: "Population", value: "Estimated 120,000+" },
    { icon: Sun, label: "Climate Info", value: "Tropical Monsoon" },
  ];

  return (
    <section id="geography" className="py-24 bg-surface-alt font-sans scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sub-section 1: Geographic Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block">Geography & Layout</span>
            <h2 className="font-heading font-black text-4xl text-navy mb-8">Where We Are Located</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-border-color flex flex-col">
                  <stat.icon className="w-6 h-6 text-primary mb-3" />
                  <span className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">{stat.label}</span>
                  <span className="font-heading font-bold text-navy text-lg leading-tight">{stat.value}</span>
                </div>
              ))}
            </div>

            <p className="text-text-muted text-lg leading-relaxed">
              Situated predominantly on a low-lying coastal plain, the Ikosi-Ejinrin LCDA features a unique blend of wetlands and creeks interspersed with urban developments. It shares its borders with Ikorodu LGA to the north-east, Kosofe LGA to the west, and is beautifully bounded by the Lagos Lagoon to the south. The region experiences two major rainy seasons—March to July, and September to November—which sustain its notable water bodies including the famous Agboyi Creek.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="w-full h-full min-h-[400px] bg-slate-200 rounded-3xl overflow-hidden shadow-lg border-4 border-white mb-4 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126830.40026210515!2d3.8268!3d6.5888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103977c0c17a5efb%3A0x6b4f71a067ca7b!2sAgbowa-Ikosi%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-0"
              ></iframe>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-sm font-bold text-primary hover:text-navy transition-colors self-end">
              View larger on Google Maps →
            </a>
          </motion.div>
        
        </div>

        {/* Sub-section 2: Communities & Wards */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h3 className="font-heading font-black text-3xl text-navy mb-4">Communities & Wards</h3>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Ikosi-Ejinrin LCDA comprises several distinct communities, each bringing its own unique flavor, history, and economic value to the united council.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((comm, idx) => (
              <motion.div 
                key={comm.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-border-color shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Background Number */}
                <div className="absolute -right-4 -top-8 text-[120px] font-black text-slate-50 opacity-50 select-none group-hover:scale-110 transition-transform duration-500">
                  {comm.id}
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
                      {comm.ward}
                    </span>
                  </div>
                  
                  <h4 className="font-heading font-bold text-2xl text-navy mb-2 group-hover:text-primary transition-colors">
                    {comm.name}
                  </h4>
                  
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gold uppercase tracking-wider mb-4">
                    <MapPin className="w-3.5 h-3.5" /> Landmark: {comm.landmark}
                  </div>
                  
                  <p className="text-text-muted text-sm leading-relaxed mt-auto">
                    {comm.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
