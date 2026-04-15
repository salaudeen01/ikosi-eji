import Layout from '@/components/layout'
import React from 'react'
import { teamMembers } from '../../../data'
import Image from 'next/image'

const Index = () => {
  return (
    <Layout>
      <div className="bg-sky-50 dark:bg-slate-900 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-[fade-in_0.5s_ease-out]">
              <h1 className="text-5xl md:text-6xl font-serif font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Management Team</h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-primary-green to-accent-ocean mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  The driven management team coordinating and executing the day-to-day operations and public services of the LCDA.
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((exec) => (
              <div  key={exec.id}>
                <div className="bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 text-center card-hover group h-full flex flex-col">
                  <div className="relative w-48 h-48 mx-auto mt-8 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-md group-hover:border-primary-green transition-colors">
                      <Image 
                        src={exec.image} 
                        alt={exec.name} 
                        fill 
                        className="object-cover"
                      />
                  </div>
                  <div className="p-6 grow flex flex-col">
                    <h2 className="text-sm font-bold text-accent-ocean uppercase tracking-wider mb-2">{exec.role}</h2>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-3">{exec.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 grow">
                      {exec.description}
                    </p>
                    {/* <span className="text-primary-green text-sm font-semibold mt-auto flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                        View Profile &rarr;
                    </span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index
