import Layout from '@/components/layout'
import Image from 'next/image'
import React from 'react'
import { councilMembersData, tranditionaRulers } from '../../../data'

const About = () => {
  return (
    <Layout>
      <div className="bg-sky-50 dark:bg-slate-900 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Header */}
          <div className="text-center mb-16 animate-[fade-in_0.5s_ease-out]">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              About Ikosi-Ejinrin LCDA
            </h1>
            <div className="w-32 h-1.5 bg-linear-to-r from-primary-green to-accent-ocean mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Ikosi-Ejinrin Local Council Development Area (LCDA) was created on 23rd October 2003 from the old Epe Local Government, bringing socio-infrastructural development closer to the grassroots.
            </p>
          </div>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-20 relative z-10">
            {[
              { label: "Year of Creation", value: "23rd October 2003" },
              { label: "Geopolitical Location", value: "Epe Division, Lagos" },
              { label: "Headquarters", value: "Agbowa-Ikosi" },
              { label: "Secretariat", value: "Ita Merin, Agbowa" },
              { label: "Executive Chairman", value: "Akogun Wale Raji Anomo" }
            ].map((fact, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border-b-4 border-primary-green hover:-translate-y-1 transition duration-300">
                <h3 className="text-xs md:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                  {fact.label}
                </h3>
                <p className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          {/* History & Origin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative h-112.5 group">
              <Image 
                src="/images/assets/logo.jpeg" 
                alt="Ikosi-Ejinrin Community" 
                fill 
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white font-medium text-xl leading-snug">A rich tapestry of communal life</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-8 relative inline-block">
                Our Origin
                <span className="absolute -bottom-2 left-0 w-1/2 h-1.5 bg-accent-ocean rounded-full"></span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-lg">
                The LCDA was established during the tenure of Asiwaju Bola Ahmed Tinubu as Executive Governor of Lagos State. It was one of thirty-seven (37) LCDAs established to bring socio-infrastructural development closer to the grassroots in Lagos State.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-lg bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border-l-4 border-primary-green">
                The LCDA derives its name from two historically significant colonial districts — <strong className="text-slate-900 dark:text-white font-bold">Ikosi</strong> and <strong className="text-slate-900 dark:text-white font-bold">Ejinrin</strong> — each with unique histories, cultures, and socio-economic strengths that complement one another.
              </p>
            </div>
          </div>

          {/* Districts and Geography */}
          <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 md:p-12 shadow-xl mb-24 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-ocean/5 rounded-full blur-3xl -z-10"></div>
            
            <div className="text-center mb-16 relative z-10">
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Geography & District Structure</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
                Located in the Lagos East Senatorial District, on the north side of the Lekki Lagoon, covering 378 sq km with an estimated population of 320,274. We share boundaries with Epe LG, Eredo LCDA, Imota LCDA, and Ogun State.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="bg-sky-50 dark:bg-slate-900 p-10 rounded-3xl border-t-8 border-primary-green relative overflow-hidden group hover:shadow-lg transition">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary-green/10 rounded-full blur-2xl group-hover:bg-primary-green/20 transition duration-500"></div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Ikosi District</h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  A multi-tribal hub known as &apos;Mini Lagos&apos;, with vibrant festivals and a strong agricultural and fishing economy.
                </p>
              </div>
              <div className="bg-sky-50 dark:bg-slate-900 p-10 rounded-3xl border-t-8 border-accent-ocean relative overflow-hidden group hover:shadow-lg transition">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-accent-ocean/10 rounded-full blur-2xl group-hover:bg-accent-ocean/20 transition duration-500"></div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Ejinrin District</h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  A historic commercial center with deep colonial trade history and strong economic potentials in agriculture, tourism, and logistics.
                </p>
              </div>
            </div>
          </div>

          {/* Guidelines / Traditional Structure & Kingdoms */}
          <div className="mb-24">
             <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Traditional Structure &<br />Kingdoms</h2>
              <div className="w-24 h-1.5 bg-linear-to-r from-primary-green to-accent-ocean mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {councilMembersData.map((item, idx) => (
                <div key={idx} className={`bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg flex flex-col justify-center text-center border-b-4 ${item.isRegent ? 'border-slate-400' : 'border-yellow-500'} hover:-translate-y-2 transition duration-300`}>
                  <div className={`w-16 h-16 mx-auto ${item.isRegent ? 'bg-slate-100 dark:bg-slate-700' : 'bg-yellow-50 dark:bg-yellow-900/20'} rounded-full flex items-center justify-center mb-6`}>
                    <span className="text-3xl">{item.isRegent ? '🛡️' : '👑'}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{item.kingdom}</h3>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    {item.hrm} <br/> <span className="text-sm opacity-80">{item.title}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership History Timeline */}
          <div className="mb-24 bg-linear-to-br from-primary-green/5 to-accent-ocean/5 rounded-[3rem] p-10 md:p-16 border border-white/60 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-primary-green/5 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen"></div>
            <h2 className="text-4xl font-extrabold text-center text-slate-900 dark:text-white mb-20 tracking-tight">Leadership History</h2>
            
            <div className="max-w-4xl mx-auto relative z-10">
              {/* Timeline center line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-linear-to-b from-primary-green via-accent-ocean to-primary-green/30 rounded-full"></div>
              
              <div className="space-y-12">
                {tranditionaRulers.map((leader, idx) => (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="flex-1 w-full relative">
                      <div className={`bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border ${leader.isCurrent ? 'border-primary-green shadow-primary-green/20' : 'border-slate-100 dark:border-slate-700'} ${idx % 2 === 0 ? 'md:ml-12' : 'md:mr-12'} mb-6 md:mb-0 transform transition hover:scale-[1.03] duration-300`}>
                        <div className="inline-block px-4 py-1.5 bg-slate-100 dark:bg-slate-900 rounded-full text-sm font-bold text-accent-ocean mb-4 shadow-inner">{leader.years}</div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{leader.name}</h4>
                        <p className={`font-medium ${leader.isCurrent ? 'text-primary-green' : 'text-slate-500 dark:text-slate-400'}`}>{leader.role}</p>
                      </div>
                    </div>
                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white dark:bg-slate-900 border-4 border-primary-green rounded-full z-10 items-center justify-center shadow-md">
                      {leader.isCurrent && <div className="w-3 h-3 bg-accent-ocean rounded-full animate-pulse"></div>}
                    </div>
                    <div className="flex-1 w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="text-center max-w-5xl mx-auto mb-24 relative">
            <div className="absolute -left-8 -top-8 text-8xl text-slate-200 dark:text-slate-800 opacity-50 font-serif leading-none">&ldquo;</div>
            <div className="bg-white dark:bg-slate-900 p-12 md:p-16 rounded-[3rem] shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800">
              <p className="text-2xl md:text-3xl text-slate-800 dark:text-slate-200 font-light leading-relaxed">
                <span className="font-bold text-primary-green">Ikosi-Ejinrin LCDA</span> stands as a vibrant blend of history, culture, commerce, and potential. It remains a strategic hub for development within Lagos State.
              </p>
            </div>
            <div className="absolute -right-8 -bottom-8 text-8xl text-slate-200 dark:text-slate-800 opacity-50 font-serif leading-none rotate-180">&ldquo;</div>
          </div>

          {/* Map Section */}
          <div className="mb-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Location Map</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Find the LCDA Secretariat in Ita Merin, Agbowa.
              </p>
            </div>
            <div className="w-full h-137.5 rounded-[3rem] overflow-hidden shadow-2xl relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-8 border-white dark:border-slate-800">
              {/* Embedded Google Maps showing Agbowa-Ikosi Lagos */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126830.430852895!2d3.8291416393796856!3d6.643202996582455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039757659dc6315%3A0xe547932c0d8abed6!2sAgbowa-Ikosi%2C%20Lagos!5e0!3m2!1sen!2sng!4v1714545239123!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default About