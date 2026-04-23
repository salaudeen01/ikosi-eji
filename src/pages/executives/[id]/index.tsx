import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { executivesData } from "../../../../data";
import Layout from "@/components/layout";
import EmptyState from "@/components/EmptyState";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Award, ChevronRight, Briefcase, Mail, Phone, MapPin } from "lucide-react";

export default function ExecutiveProfilePage() {
  const param = useParams<{ id: string; slug: string }>();
  const execId = param?.id ?? '';
  const exec = executivesData.find(e => e.id === execId);

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  if (!exec) {
    return <EmptyState />;
  }

  // Stagger variants for content loading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <Layout>
      <div className="bg-surface-alt min-h-screen font-sans">
        
        {/* Dynamic Abstract Hero Header Header */}
        <section className="bg-navy pt-32 pb-48 relative overflow-hidden">
          <motion.div style={{ y: yBg }} className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover opacity-10"></motion.div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <motion.div style={{ opacity: opacityHero }} className="flex flex-col items-start pt-10">
                <Link href="/executives" className="inline-flex items-center gap-2 text-white/50 hover:text-gold font-bold mb-8 transition-colors group text-sm uppercase tracking-wider">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Executive Council
                </Link>
             </motion.div>
          </div>
        </section>

        {/* Content Section - Pulled up to overlap hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-40 mb-24">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
            
            {/* Left Sidebar: Sticky Image & Quick Info */}
            <div className="w-full lg:w-1/3 shrink-0">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="sticky top-32"
              >
                <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl shadow-navy/5 border border-border-color flex flex-col items-center">
                  
                  {/* Avatar Container with Glow */}
                  <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-8 group bg-slate-100">
                    <Image
                      src={exec.image}
                      alt={exec.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                      priority
                    />
                    {/* Inner elegant gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                      <span className="text-white font-bold tracking-widest uppercase text-xs">Official Portrait</span>
                    </div>
                  </div>

                  <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                    {exec.role}
                  </span>
                  
                  <h1 className="text-3xl xl:text-4xl font-heading font-black text-navy text-center leading-tight mb-2">
                    {exec.name}
                  </h1>

                  <div className="w-16 h-1 bg-gold rounded-full my-6"></div>

                  {/* Contact / Action Buttons */}
                  <div className="w-full space-y-3">
                    <button className="w-full py-4 bg-navy hover:bg-navy/90 text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-navy/20 active:scale-95 group">
                      <Mail className="w-5 h-5 text-gold group-hover:animate-pulse" /> Contact Office
                    </button>
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-surface hover:bg-surface-alt border border-border-color text-text-base rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95">
                        <Phone className="w-4 h-4 text-text-muted" /> Call
                      </button>
                      <button className="flex-1 py-3 bg-surface hover:bg-surface-alt border border-border-color text-text-base rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95">
                        <MapPin className="w-4 h-4 text-text-muted" /> Office
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Content Area: Sections & Details with Framer Motion Stagger */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full lg:w-2/3 flex flex-col gap-8"
            >
              
              {/* Conditional Structure Based on Data source */}
              {exec.sections ? (
                <div className="space-y-8">
                  {exec.sections.map((section, idx) => (
                    <motion.div key={idx} className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl shadow-navy/5 border border-border-color hover:border-primary/20 transition-colors duration-500 overflow-hidden relative group">
                      {/* Artistic corner accent */}
                      <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>

                      <div className="flex gap-6 items-start mb-8 relative z-10">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center shrink-0 border border-primary/10">
                          <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <div className="pt-2">
                          <h2 className="text-3xl font-heading font-black text-navy tracking-tight">
                            {section.title}
                          </h2>
                          <p className="text-text-muted text-sm font-bold uppercase tracking-wider mt-1 block">Overview</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6 text-text-base leading-relaxed text-lg lg:text-xl font-medium relative z-10">
                        {section.content.map((paragraph, pIdx) => (
                          <p key={pIdx} className="m-0 border-l-4 border-primary/20 pl-6 text-slate-700">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl shadow-navy/5 border border-border-color hover:border-primary/20 transition-colors duration-500">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center shrink-0 border border-primary/10">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-heading font-black text-navy tracking-tight">
                        Biography
                      </h2>
                    </div>
                  </div>
                  <div className="text-slate-700 leading-relaxed text-lg lg:text-xl font-medium whitespace-pre-wrap border-l-4 border-primary/20 pl-6">
                    {exec.detailedBio}
                  </div>
                </motion.div>
              )}

              {/* Awards & Recognitions */}
              {exec.awards && exec.awards.length > 0 && (
                <motion.div className="bg-navy rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-navy text-white relative overflow-hidden group">
                  {/* Dark Mode Glowing Accents */}
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-gold/20 via-primary/10 to-transparent rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4 group-hover:from-gold/30 transition-all duration-700"></div>
                  
                  <div className="flex items-center gap-6 mb-10 relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-gold/5 rounded-2xl flex items-center justify-center shrink-0 border border-gold/20">
                      <Award className="w-7 h-7 text-gold drop-shadow-md" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-heading font-black text-white tracking-tight">
                        Awards & Recognitions
                      </h2>
                      <p className="text-white/50 text-sm font-bold uppercase tracking-wider mt-1 block">Honors & Merits</p>
                    </div>
                  </div>

                  <ul className="space-y-4 relative z-10">
                    {exec.awards.map((award, idx) => (
                      <motion.li 
                        key={idx}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md cursor-default"
                      >
                        <ChevronRight className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                        <span className="font-semibold text-white/90 text-lg leading-snug">{award}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
