import React from 'react';
import Layout from '@/components/layout';
import SEO from '@/components/SEO';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const ServiceDetailsPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Formatting slug to title
  const title = slug ? String(slug).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Service Details';

  return (
    <Layout>
      <SEO 
        title={`${title} | Services | Ikosi-Ejinrin LCDA`}
        description={`Learn more about our ${title} services provided by the Ikosi-Ejinrin Local Council Development Area.`}
      />
      <div className="bg-surface-alt min-h-screen font-sans pb-24">
        {/* Simple Dark Navy Hero Header */}
        <section className="bg-navy pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="flex flex-col items-center text-center">
               <Link href="/services" className="inline-flex items-center gap-2 text-white/50 hover:text-gold font-bold mb-6 transition-colors group text-sm uppercase tracking-wider">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  All Services
               </Link>
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 tracking-tight">
                  {title}
               </h1>
             </div>
          </div>
        </section>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl shadow-navy/5 border border-border-color">
            <h2 className="text-3xl font-heading font-bold text-navy mb-6">Service Overview</h2>
            <p className="text-lg text-text-base leading-relaxed mb-8 border-l-4 border-primary/20 pl-6">
              The Ikosi-Ejinrin LCDA is fully committed to delivering world-class {title.toLowerCase()} to our residents. 
              Our focus ensures that democratic dividends reach the grassroots, promoting sustainable development and an improved quality of life.
            </p>

            <h3 className="text-2xl font-heading font-bold text-navy mb-6 mt-12">Key Initiatives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-base">
              {/* Mock items */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-surface rounded-xl border border-border-color">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="font-medium">Strategic policy implementation and community-driven expansion.</span>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-primary/5 rounded-3xl border border-primary/10 text-center">
              <h3 className="text-2xl font-heading font-bold text-navy mb-4">Need Assistance?</h3>
              <p className="text-text-muted mb-6">Our dedicated officers are available to help you navigate our services.</p>
              <Link href="/contact" className="btn-primary">
                Contact Office
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ServiceDetailsPage;
