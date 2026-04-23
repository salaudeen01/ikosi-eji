"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Users, Landmark } from "lucide-react";

export default function AboutSection() {
  const features = [
    { icon: ShieldCheck, title: "Transparent Governance", desc: "Open administration with clear accountability to all residents." },
    { icon: Users, title: "Community Development", desc: "Prioritizing grassroots empowerment and standard of living." },
    { icon: Landmark, title: "Accountable Leadership", desc: "Dedicated executives working strictly for public interest." },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Images */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Dot Pattern */}
            <div className="absolute -top-10 -left-10 w-40 h-40 opacity-20 bg-[radial-gradient(#006B3F_2px,transparent_2px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10 w-4/5 ml-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img src="/images/assets/logo.jpeg" alt="Ikosi-Ejinrin Secretariat" className="w-full aspect-[4/5] object-cover" />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 -left-12 bg-white px-6 py-4 rounded-2xl shadow-xl flex flex-col items-center border border-border-color"
              >
                <span className="text-3xl">⭐</span>
                <span className="font-heading font-black text-navy text-xl mt-2">Est. 2003</span>
                <span className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Founding Year</span>
              </motion.div>
            </div>

            {/* Overlapping Secondary Image */}
            <div className="absolute -bottom-10 left-0 w-3/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20">
              <img src="/images/assets/hero-bg.jpg" alt="Community Activity" className="w-full aspect-video object-cover" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 mt-12 lg:mt-0"
          >
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block">About The Council</span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-navy leading-tight mb-6">
              Serving Ikosi-Ejinrin With Pride & Purpose
            </h2>
            <div className="text-text-muted space-y-4 mb-8 text-lg">
              <p>
                Created in 2003, the Ikosi-Ejinrin Local Council Development Area has grown into a progressive, vibrant community balancing its rich cultural heritage with modern development. 
              </p>
              <p>
                Our administration is deeply committed to delivering tangible dividends of democracy through robust infrastructure, accessible healthcare, and inclusive welfare programs that touch every household in our wards.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-10">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-alt transition-colors border border-transparent hover:border-border-color">
                  <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
                    <feat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-lg">{feat.title}</h4>
                    <p className="text-text-muted text-sm mt-1">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bars */}
            <div className="space-y-5 mb-10">
              <div>
                <div className="flex justify-between text-sm font-bold text-navy mb-2">
                  <span>Community Projects Completed</span>
                  <span className="text-primary">78%</span>
                </div>
                <div className="h-2 w-full bg-border-color rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "78%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-primary rounded-full"></motion.div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold text-navy mb-2">
                  <span>Resident Satisfaction</span>
                  <span className="text-primary">94%</span>
                </div>
                <div className="h-2 w-full bg-border-color rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "94%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.7 }} className="h-full bg-gold rounded-full"></motion.div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary">
                Our Full History
              </Link>
              <Link href="/executives" className="btn-outline border-border-color text-navy hover:border-primary">
                Meet Leadership
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
