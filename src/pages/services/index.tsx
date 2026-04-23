import React from 'react';
import Layout from '@/components/layout';
import ServicesSection from '@/components/sections/ServicesSection';
import SEO from '@/components/SEO';

const ServicesPage = () => {
  return (
    <Layout>
      <SEO 
        title="Our Services | Ikosi-Ejinrin LCDA"
        description="Discover the comprehensive grassroots services, infrastructure projects, and public utilities provided by the LCDA."
      />
      <div className="bg-surface-alt min-h-screen font-sans">
        {/* Simple Dark Navy Hero Header */}
        <section className="bg-navy pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="flex flex-col items-center text-center">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 tracking-tight">
                  Public Services
               </h1>
               <p className="text-white/70 text-lg max-w-2xl mx-auto">
                 Discover the comprehensive grassroots services, infrastructure coordination, and public utilities provided by the LCDA to ensure an optimal standard of living for all residents.
               </p>
             </div>
          </div>
        </section>
        
        {/* The actual grid, minus the padding top since the hero handles it visually */}
        <div className="-mt-10">
          <ServicesSection />
        </div>
      </div>
    </Layout>
  )
}

export default ServicesPage;
