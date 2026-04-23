"use client";

import Layout from '@/components/layout'
import React from 'react'
import { teamMembers } from '../../../data'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

const Index = () => {
  return (
    <Layout>
      <div className="bg-surface-alt min-h-screen font-sans pb-24">
        
        {/* Dark Navy Premium Hero */}
        <section className="bg-navy pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover opacity-5"></div>
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
             <span className="text-gold font-bold tracking-widest text-sm uppercase mb-4 block">Administration</span>
             <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white mb-6 tracking-tight">
                Management Team
             </h1>
             <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto font-medium">
               The driven technocrats and advisors coordinating and executing the day-to-day operations and public services of the LCDA.
             </p>
          </div>
        </section>

        {/* Team Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="h-full group"
              >
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-navy/5 border border-border-color hover:shadow-2xl transition-all duration-500 h-full flex flex-col items-center relative p-6">
                  
                  {/* Subtle Top Border */}
                  <div className="absolute top-0 left-0 w-full h-[5px] bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                  <div className="relative w-32 h-32 mb-6 mt-4">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-md group-hover:bg-primary/20 transition-all duration-500"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 z-10">
                       {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                       ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface-alt">
                           <Briefcase className="w-10 h-10 text-primary/30" />
                        </div>
                       )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center flex-grow text-center">
                    <h3 className="text-xl font-heading font-black text-navy mb-2 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4 border-b border-border-color pb-4 inline-block">
                      {member.role}
                    </p>
                    {member.description && (
                      <p className="text-sm font-medium text-text-muted mt-2">
                        {member.description}
                      </p>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Index
