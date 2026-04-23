"use client";

import { motion } from "framer-motion";
import { councilLeader } from "../../../data";

export default function PastLeadersSection() {
  // Placeholder datastore for past leaders
  const leaders = [
    { id: 1, name: "Hon. Samuel Olatunji", tenure: "2003 - 2007", role: "Pioneer Executive Chairman", image: "/images/assets/hero-bg.jpg" },
    { id: 2, name: "Hon. Adeko Babatunde", tenure: "2008 - 2011", role: "Executive Chairman", image: "https://res.cloudinary.com/orestech/image/upload/v1775298709/Screenshot_2026-04-04_at_11.12.21_AM_1_sm2ni4.png" },
    { id: 3, name: "Hon. Mrs. Bola Oshin", tenure: "2011 - 2014", role: "Executive Chairman", image: "/images/assets/logo.jpeg" },
    { id: 4, name: "Engr. Lukman Abiodun", tenure: "2015 - 2019", role: "Sole Administrator", image: "/images/assets/hero-bg.jpg" },
    { id: 5, name: "Hon. Wale Raji Anomo", tenure: "2021 - Present", role: "Current Executive Chairman", image: "https://res.cloudinary.com/orestech/image/upload/v1775298709/Screenshot_2026-04-04_at_11.12.21_AM_1_sm2ni4.png" },
  ];

  return (
    <section id="past-leaders" className="py-24 bg-white font-sans scroll-mt-24 border-t border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block">Legacies & Leadership</span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-navy leading-tight">
              Past & Present Chairmen
            </h2>
          </div>
          <p className="text-text-muted text-sm max-w-sm md:text-right border-l-4 border-primary pl-4 py-1">
            Acknowledging the dedicated leaders who have steered the continuous development of our beloved LCDA.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {councilLeader.map((leader, idx) => (
            <motion.div 
              key={leader.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group bg-white rounded-2xl border border-border-color overflow-hidden hover:border-gold hover:shadow-xl transition-all duration-300"
            >
              <div className="w-full aspect-[4/5] overflow-hidden bg-slate-100 relative">
                <img src={leader.imageUrl} alt={leader.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                
                {/* Current Chairman Badge */}
                {leader.tenure.includes("Present") && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-sm">
                    Active
                  </div>
                )}
              </div>
              
              <div className="p-5 border-t border-border-color group-hover:bg-surface-alt transition-colors">
                <span className="text-xs font-bold text-gold uppercase tracking-wider mb-1 block">{leader.tenure}</span>
                <h3 className="font-heading font-bold text-lg text-navy mb-1 leading-tight">{leader.name}</h3>
                <p className="text-text-muted text-xs font-medium">{leader.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
