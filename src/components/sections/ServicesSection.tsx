/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, HeartPulse, GraduationCap, MapPin, Calculator, ShieldCheck } from "lucide-react";

interface ServicesSectionProps {
  servicesData?: any[];
}

export default function ServicesSection({ servicesData }: ServicesSectionProps) {
  // Fallback data if none provided, mapped to the requested styles
  const defaultServices = [
    { title: "Infrastructure & Public Works", icon: MapPin, color: "from-blue-500/20 to-blue-500/5", iconColor: "text-blue-600", desc: "Constructing and maintaining robust road networks, drainages, and public facilities across the 12 wards." },
    { title: "Primary Healthcare", icon: HeartPulse, color: "from-green-500/20 to-green-500/5", iconColor: "text-green-600", desc: "Equipping local health centers, providing maternal care, and ensuring affordable medicine for all." },
    { title: "Education & Youth", icon: GraduationCap, color: "from-purple-500/20 to-purple-500/5", iconColor: "text-purple-600", desc: "Renovating schools, providing bursaries, and vocational training for youth empowerment." },
    { title: "Revenue & Levies", icon: Calculator, color: "from-gold/30 to-gold/5", iconColor: "text-yellow-600", desc: "Streamlined, transparent digital payment systems for local taxes, market tolls, and permits." },
    { title: "Environment & Sanitation", icon: Activity, color: "from-teal-500/20 to-teal-500/5", iconColor: "text-teal-600", desc: "Regular waste clearing, market sanitation, and environmental protection initiatives." },
    { title: "Security & Safety", icon: ShieldCheck, color: "from-red-500/20 to-red-500/5", iconColor: "text-red-600", desc: "Collaborating with local vigilance and police to ensure a safe environment for all residents." },
  ];

  const items = servicesData && servicesData.length > 0 ? servicesData : defaultServices;

  return (
    <section className="py-10 bg-surface-alt font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block"
          >
            What We Do For You
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading font-black text-4xl sm:text-5xl text-navy leading-tight mb-4"
          >
            Comprehensive Services For Every Resident
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((service, idx) => {
            const isFeatured = idx === 0;
            const Icon = service.icon || MapPin;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-border-color hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col ${isFeatured ? 'md:col-span-2 lg:col-span-3 flex-col lg:flex-row' : ''}`}
              >
                {/* Border Bottom on Hover Hack via absolute positioning */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-20"></div>

                {isFeatured && (
                  <div className="lg:w-1/2 h-64 lg:h-auto bg-slate-200 relative overflow-hidden">
                    <img src="/images/assets/hero-bg.jpg" alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent flex items-center p-8">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                )}

                <div className={`p-8 flex flex-col flex-1 ${isFeatured ? 'lg:w-1/2 justify-center' : ''}`}>
                  {!isFeatured && (
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color || 'from-primary-light to-white'} flex items-center justify-center mb-6`}>
                      <Icon className={`w-7 h-7 ${service.iconColor || 'text-primary'}`} />
                    </div>
                  )}

                  <h3 className={`font-heading font-bold text-navy mb-3 ${isFeatured ? 'text-3xl' : 'text-xl'}`}>{service.title}</h3>
                  
                  <p className={`text-text-muted ${isFeatured ? 'text-lg mb-8 max-w-md' : 'text-sm mb-6 line-clamp-2 flex-1'}`}>
                    {service.description || service.desc}
                  </p>

                  <Link href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className={`inline-flex items-center font-bold transition-all overflow-hidden ${isFeatured ? 'text-primary text-base' : 'text-primary text-sm mt-auto'}`}>
                    <span className="relative translate-y-0 group-hover:-translate-y-full transition-transform duration-300">Learn More</span>
                    <span className="absolute translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
