"use client";

import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import { executivesData } from "../../../data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ExecutivesPage() {
  return (
    <Layout>
      <div className="bg-surface-alt min-h-screen font-sans pb-24">

        {/* Dark Navy Premium Hero */}
        <section className="bg-navy pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
            <span className="text-gold font-bold tracking-widest text-sm uppercase mb-4 block">Leadership Council</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white mb-6 tracking-tight">
              Our Executives
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Meet the dedicated leaders and technocrats steering the wheel of progress in Ikosi-Ejinrin LCDA.
            </p>
          </div>
        </section>

        {/* Executive Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executivesData.map((exec, idx) => (
              <motion.div
                key={exec.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={`/executives/${exec.id}`} className="block h-full group">
                  <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-navy/5 border border-border-color hover:border-gold hover:shadow-2xl transition-all duration-500 h-full flex flex-col p-6 relative">

                    {/* Background accent */}
                    <div className="absolute top-0 left-0 w-full h-[5px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                    {/* Image Styling */}
                    <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6 bg-slate-100 group-hover:shadow-inner transition-shadow">
                      <Image
                        src={exec.image}
                        alt={exec.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="flex-grow flex flex-col text-center">
                      <span className="inline-block self-center px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-bold uppercase tracking-widest mb-3">
                        {exec.role}
                      </span>
                      <h3 className="text-2xl font-heading font-black text-navy mb-3 group-hover:text-primary transition-colors">
                        {exec.name}
                      </h3>
                      <p className="text-text-muted text-sm flex-grow font-medium leading-relaxed mb-6">
                        {exec.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-border-color flex justify-center items-center">
                      <span className="text-primary text-sm font-bold flex items-center gap-2 group-hover:text-gold transition-colors">
                        View Profile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
