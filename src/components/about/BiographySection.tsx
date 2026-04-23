/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";

export default function BiographySection() {
  const timelineEvents = [
    { year: "Pre-1800s", title: "Awori Settlers Arrive", desc: "Early fishing communities established along the Lagos Lagoon shoreline." },
    { year: "1861", title: "British Annexation", desc: "Colonial administration begins affecting surrounding local communities and trade." },
    { year: "1967", title: "Lagos State Created", desc: "Ikosi-Ejinrin becomes part of Lagos State under the new federal structure." },
    { year: "1976", title: "Local Govt Reform", desc: "Kosofe LGA established, acting as the parent local government area." },
    { year: "2003", title: "LCDA Creation", desc: "Ikosi-Ejinrin formally created as a Local Council Development Area by Lagos State." },
    { year: "2010s", title: "Urban Expansion", desc: "Infrastructure investment and massive population growth accelerates." },
    { year: "Present", title: "Digital Governance", desc: "Launch of official digital portal to streamline local government services." },
  ];

  return (
    <section id="biography" className="py-24 bg-white font-sans scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block">Origins & Heritage</span>
          <h2 className="font-heading font-black text-4xl text-navy mb-6">Our Historical Journey</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2 space-y-6 text-lg text-text-muted leading-relaxed">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <strong className="text-navy font-bold">Ikosi-Ejinrin</strong> is a vibrant integration of two historically significant locations. Ikosi is a renowned coastal Awori community deeply rooted in traditional values, while Ejinrin is widely celebrated as a famous ancient market town situated on the lush bank of the Lagos Lagoon. Together, they form a formidable Local Council Development Area reflecting the blending of two distinct yet geographically proximate communities united under a shared administrative vision.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
              The earliest settlers of this region were the Awori people, tracing their legendary migration directly from the cradle of Yoruba civilization, Ile-Ife. Historically relying on fishing and farming as primary occupations, the Aworis leveraged the vast resources of the Lagos Lagoon. The waterways not only provided sustenance but also served as critical early trade routes that connected the hinterlands to broader markets.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
              The administrative trajectory of the area changed significantly with the creation of Lagos State in 1967. Originally governed under Kosofe Local Government Area, the distinct geographical and demographic needs of the people led to the eventual creation of the Ikosi-Ejinrin LCDA during the Lagos State local government restructuring exercise of 2003. This marked the beginning of intensive, structured local development.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
              Today, pushed by relentless population growth and urban development pressures from the Lagos Mainland, Ikosi-Ejinrin has rapidly transformed into a thriving mixed residential and commercial hub. Despite this rapid modernization, the LCDA proudly retains its profound cultural roots, keeping the ancient Awori heritage alive.
            </motion.p>
          </div>

          {/* Right: Images Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col gap-4"
          >
            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-border-color shrink-0">
              <img src="/images/assets/hero-bg.jpg" alt="Aerial view of community" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 rounded-2xl overflow-hidden shadow-md border border-border-color">
                <img src="/images/assets/logo.jpeg" alt="Historical artifact" className="w-full h-full object-cover" />
              </div>
              <div className="h-48 rounded-2xl overflow-hidden shadow-md border border-border-color">
                <img src="https://res.cloudinary.com/orestech/image/upload/v1776958835/images_7_ksl9m6.jpg" alt="Cultural display" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline Component */}
        <div className="mt-16 overflow-x-auto pb-8 hide-scrollbar">
          <div className="min-w-[1000px] relative pt-32 pb-32">
            {/* Horizontal Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-border-color -translate-y-1/2"></div>
            
            <div className="flex justify-between w-full relative z-10 px-6">
              {timelineEvents.map((event, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative flex flex-col items-center group w-32 shrink-0 cursor-default"
                  >
                    {/* Node */}
                    <div className="w-12 h-12 rounded-full bg-white border-4 border-primary shadow-lg flex items-center justify-center z-20 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                      <span className="text-[10px] font-bold text-navy group-hover:text-white transition-colors">{event.year}</span>
                    </div>

                    {/* Card (Alternating Top/Bottom) */}
                    <div className={`absolute w-48 bg-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border-color group-hover:border-gold group-hover:-translate-y-1 transition-all duration-300 z-30 ${isEven ? 'bottom-full mb-6' : 'top-full mt-6'}`}>
                      {/* Connecting Line */}
                      <div className={`absolute left-1/2 -translate-x-1/2 w-px h-6 bg-border-color ${isEven ? '-bottom-6' : '-top-6'}`}></div>
                      
                      <h4 className="font-heading font-bold text-navy text-sm mb-1 leading-tight">{event.title}</h4>
                      <p className="text-xs text-text-muted leading-relaxed">{event.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
