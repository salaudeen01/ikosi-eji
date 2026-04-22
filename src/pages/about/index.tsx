import Layout from '@/components/layout'
import Image from 'next/image'
import React from 'react'
import { councilMembersData, tranditionaRulers } from '../../../data'

const About = () => {
  return (
    <Layout
      pageTitle="About Us"
      pageDescription="Learn about the rich history, geography, and traditional kingdoms of Ikosi-Ejinrin LCDA."
    >
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen overflow-hidden font-sans">
        
        {/* Dynamic Mesh Hero & Floating Facts */}
        <section className="relative pt-24 pb-40 md:pt-32 md:pb-56 overflow-visible z-10">
          {/* Stunning Mesh Background Gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-green/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-pulse-slow"></div>
            <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-sky-300/30 dark:bg-sky-900/40 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
             <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-full text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 border border-white/50 dark:border-slate-700/50 shadow-sm mb-10">
                <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
                Official Overview
             </div>
             <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 dark:text-white mb-8 tracking-tight drop-shadow-sm">
                About Ikosi-Ejinrin
             </h1>
             <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
                Created on 23rd October 2003, bringing socio-infrastructural development closer to the grassroots of Lagos State.
             </p>
          </div>

          {/* Floating Glassmorphic Facts Grid (Overlapping out of the hero) */}
          <div className="absolute left-0 right-0 -bottom-32 md:-bottom-24 px-4 sm:px-6 lg:px-8 z-20">
             <div className="max-w-7xl mx-auto">
               <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                 {[
                   { label: "Founded", value: "Oct 2003" },
                   { label: "Location", value: "Epe Division" },
                   { label: "Headquarters", value: "Agbowa-Ikosi" },
                   { label: "Secretariat", value: "Ita Merin" },
                   { label: "Chairman", value: "Hon. Anomo" }
                 ].map((fact, idx) => (
                   <div key={idx} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-700/50 hover:-translate-y-2 transition-transform duration-300">
                     <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 font-bold">
                       {fact.label}
                     </h3>
                     <p className="font-black text-slate-900 dark:text-white text-lg md:text-xl leading-tight font-serif text-shadow-sm">
                       {fact.value}
                     </p>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </section>

        {/* 3D Overlapping History & Origin */}
        <section className="pt-48 pb-24 relative z-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="relative flex flex-col lg:flex-row items-center">
                {/* Cinematic Image Base */}
                <div className="w-full lg:w-3/5 relative h-[500px] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-300 dark:shadow-none z-10">
                  <Image
                    src="/images/assets/logo.jpeg"
                    alt="Ikosi-Ejinrin Community"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-12 left-12 right-12">
                    <p className="text-white font-serif font-bold text-3xl md:text-4xl leading-tight">A rich tapestry of communal life and trade.</p>
                  </div>
                </div>

                {/* Overlapping Glass Panel */}
                <div className="w-full lg:w-[45%] lg:-ml-24 mt-[-100px] lg:mt-0 relative z-20">
                   <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-white dark:border-slate-700/50 hover:shadow-primary-green/10 transition-shadow duration-500">
                     <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900 dark:text-white mb-8 border-b-4 border-primary-green pb-4 inline-block">
                       Our Origin
                     </h2>
                     <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed text-lg lg:text-xl font-medium">
                       Established during the tenure of Asiwaju Bola Ahmed Tinubu as Executive Governor, Ikosi-Ejinrin was one of 37 LCDAs created to bring vital socio-infrastructural development directly to the grassroots.
                     </p>
                     <div className="bg-sky-50/50 dark:bg-slate-800/50 p-6 rounded-2xl border-l-4 border-accent-ocean mt-8">
                       <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                         The LCDA derives its name from two historically significant colonial districts — <strong className="text-primary-green font-black">Ikosi</strong> and <strong className="text-primary-green font-black">Ejinrin</strong> — each holding unique economic strengths.
                       </p>
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Vibrant Geography & Districts (Dark Mode Contrast Block) */}
        <section className="py-32 bg-slate-900 text-white relative">
           {/* Deep atmospheric gradients */}
           <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 right-0 w-[800px] h-[800px] bg-primary-green/10 rounded-full blur-[150px]"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-ocean/10 rounded-full blur-[150px]"></div>
           </div>

           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-24">
                <span className="text-primary-green text-sm font-bold tracking-widest uppercase mb-4 block">Territory Overview</span>
                <h2 className="text-5xl md:text-6xl font-serif font-black mb-8">Geography & Districts</h2>
                <p className="text-slate-400 max-w-3xl mx-auto text-xl leading-relaxed">
                  Located in the Lagos East Senatorial District along the Lekki Lagoon. Traversing 378 sq km with a thriving population of over 320,000 citizens.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                 {/* Ikosi District */}
                 <div className="group relative bg-slate-800/50 backdrop-blur-md border border-slate-700 hover:border-primary-green/50 p-12 rounded-[3rem] overflow-hidden hover:-translate-y-2 transition-all duration-500">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-primary-green/20 rounded-full blur-[100px] group-hover:bg-primary-green/40 transition-colors duration-700 pointer-events-none"></div>
                    <h3 className="text-4xl font-serif font-black mb-6 relative z-10 group-hover:text-primary-green transition-colors">Ikosi District</h3>
                    <p className="text-slate-300 text-xl leading-relaxed relative z-10">
                       A dynamic multi-tribal hub often called <strong className="text-white">&apos;Mini Lagos&apos;</strong>. Renowned for its vibrant cultural festivals and an incredibly strong agricultural and fishing economy.
                    </p>
                 </div>

                 {/* Ejinrin District */}
                 <div className="group relative bg-slate-800/50 backdrop-blur-md border border-slate-700 hover:border-accent-ocean/50 p-12 rounded-[3rem] overflow-hidden hover:-translate-y-2 transition-all duration-500">
                    <div className="absolute left-0 bottom-0 w-64 h-64 bg-accent-ocean/20 rounded-full blur-[100px] group-hover:bg-accent-ocean/40 transition-colors duration-700 pointer-events-none"></div>
                    <h3 className="text-4xl font-serif font-black mb-6 relative z-10 group-hover:text-accent-ocean transition-colors">Ejinrin District</h3>
                    <p className="text-slate-300 text-xl leading-relaxed relative z-10">
                       A historic commercial powerhouse holding deep colonial trade history. Offering immense economic potential in agriculture, tourism, and logistics.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* Traditional Kingdoms (Glowing Glass Cards) */}
        <section className="py-32 relative">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-24">
                <h2 className="text-5xl md:text-6xl font-serif font-black text-slate-900 dark:text-white mb-6">Traditional Kingdoms</h2>
                <div className="w-24 h-2 bg-primary-green mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {councilMembersData.map((item, idx) => (
                  <div key={idx} className="group relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow-500/10 dark:hover:shadow-yellow-500/5 transition-all duration-500 flex flex-col justify-center text-center overflow-hidden">
                    {/* Hover Glow Top Border */}
                    <div className={`absolute top-0 left-0 w-full h-2 ${item.isRegent ? 'bg-slate-400' : 'bg-linear-to-r from-yellow-400 to-yellow-600'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    <div className={`w-20 h-20 mx-auto ${item.isRegent ? 'bg-slate-100 dark:bg-slate-800' : 'bg-yellow-50 dark:bg-yellow-900/20'} rounded-full flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-500`}>
                      {/* Inner Glow */}
                      {!item.isRegent && <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl group-hover:bg-yellow-400/40 transition-colors duration-500"></div>}
                      <span className="text-4xl relative z-10">{item.isRegent ? '🛡️' : '👑'}</span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-serif font-black text-slate-900 dark:text-white mb-4 relative z-10">{item.kingdom}</h3>
                    <p className="text-slate-700 dark:text-slate-300 font-bold text-lg relative z-10">
                      {item.hrm} <br /> <span className="text-sm tracking-widest uppercase font-bold text-slate-500 dark:text-slate-400 mt-2 block opacity-80">{item.title}</span>
                    </p>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* Gamified Leadership Timeline */}
        <section className="py-32 bg-slate-100/50 dark:bg-slate-950/50 border-y border-slate-200 dark:border-slate-800">
           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-24">
                 <h2 className="text-5xl md:text-6xl font-serif font-black text-slate-900 dark:text-white mb-6">Leadership History</h2>
                 <p className="text-slate-600 dark:text-slate-400 text-xl max-w-2xl mx-auto">Tracking the legacy of progressive leadership since creation.</p>
              </div>

              <div className="relative">
                 {/* The Glowing Timeline Line */}
                 <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-2 bg-linear-to-b from-primary-green via-accent-ocean to-indigo-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>

                 <div className="space-y-16">
                    {tranditionaRulers.map((leader, idx) => (
                      <div key={idx} className={`relative flex flex-col md:flex-row items-center group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                         
                         {/* Spacer for alternating layout */}
                         <div className="hidden md:block flex-1 w-full"></div>
                         
                         {/* Center Animated Node */}
                         <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-slate-900 z-10 flex items-center justify-center bg-primary-green shadow-xl transition-transform duration-300 group-hover:scale-150">
                            {leader.isCurrent && <div className="absolute w-12 h-12 rounded-full border-2 border-primary-green animate-ping opacity-75"></div>}
                         </div>

                         {/* Content Card */}
                         <div className="flex-1 w-full relative pl-20 md:pl-0">
                            <div className={`bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-800 ${leader.isCurrent ? 'ring-4 ring-primary-green/30' : ''} ${idx % 2 === 0 ? 'md:ml-16' : 'md:mr-16'} transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
                               <div className="inline-block px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-black uppercase tracking-widest text-slate-500 mb-6 border border-slate-200 dark:border-slate-700">{leader.years}</div>
                               <h4 className={`text-2xl md:text-3xl font-serif font-black mb-2 ${leader.isCurrent ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>{leader.name}</h4>
                               <p className={`font-bold text-lg uppercase tracking-wider ${leader.isCurrent ? 'text-primary-green' : 'text-slate-500'}`}>{leader.role}</p>
                            </div>
                         </div>

                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Cinematic Map Container */}
        <section className="py-32 px-4 sm:px-6 lg:px-8">
           <div className="max-w-[90rem] mx-auto">
              <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900 dark:text-white mb-6">Our Location</h2>
                 <p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">Find the LCDA Secretariat in Ita Merin, Agbowa.</p>
              </div>

              <div className="w-full h-[500px] md:h-[700px] rounded-[4rem] overflow-hidden shadow-2xl relative border-8 border-white dark:border-slate-800 group transform transition-transform duration-[1s] hover:scale-[1.02]">
                 {/* Glowing map drop shadow effect under the border */}
                 <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.1)] pointer-events-none z-10"></div>
                 
                 <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126830.430852895!2d3.8291416393796856!3d6.643202996582455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039757659dc6315%3A0xe547932c0d8abed6!2sAgbowa-Ikosi%2C%20Lagos!5e0!3m2!1sen!2sng!4v1714545239123!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'contrast(1.1) saturation(1.1)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0"
                 ></iframe>

                 {/* Absolute Overlay Tag */}
                 <div className="absolute top-10 left-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/50 z-20">
                    <span className="flex items-center gap-3 font-bold text-slate-900 dark:text-white">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      Ita Merin Secretariat
                    </span>
                 </div>
              </div>
           </div>
        </section>

      </div>
    </Layout>
  )
}

export default About