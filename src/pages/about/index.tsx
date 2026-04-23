import React from 'react';
import Layout from '@/components/layout';
import BiographySection from '@/components/about/BiographySection';
import GeographySection from '@/components/about/GeographySection';
import PastLeadersSection from '@/components/about/PastLeadersSection';
import TraditionalRulersSection from '@/components/about/TraditionalRulersSection';
import MissionSection from '@/components/about/MissionSection';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SEO from '@/components/SEO';

const About = () => {
  return (
    <Layout>
      <SEO 
        title="About Us | Ikosi-Ejinrin LCDA"
        description="Learn about the rich history, geography, traditional kingdoms, and mission of Ikosi-Ejinrin Local Council Development Area."
      />
      <div className="bg-slate-50 min-h-screen overflow-hidden font-sans">
        
        {/* Simple Dark Navy Hero Header */}
        <section className="bg-navy pt-32 pb-16 relative overflow-hidden">
          {/* Decorative subtle pattern */}
          <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover opacity-5"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="flex flex-col items-center text-center">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 tracking-tight">
                  About Ikosi-Ejinrin
               </h1>
               
               {/* Breadcrumbs */}
               <div className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-white/50">
                 <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                 <ChevronRight className="w-4 h-4" />
                 <span className="text-gold">About Us</span>
               </div>
             </div>
          </div>
        </section>

        {/* The assembled sections */}
        <MissionSection />
        
        <BiographySection />
        
        <GeographySection />
        
        <TraditionalRulersSection />
        
        <PastLeadersSection />
        
      </div>
    </Layout>
  )
}

export default About;