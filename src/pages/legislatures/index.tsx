import Layout from '@/components/layout'
import React from 'react'

const Index = () => {
  return (
    <Layout>
      <div className="bg-sky-50 dark:bg-slate-900 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-[fade-in_0.5s_ease-out]">
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Legislatures</h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-primary-green to-accent-ocean mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  Meet the dedicated legislative team representing the various wards of Ikosi-Ejinrin LCDA.
              </p>
            </div>
            
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
                <span className="text-4xl mb-4 block">🏛️</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Legislative Profiles Coming Soon...</h2>
                <p className="text-slate-500 mt-2">Content is being curated for this directory.</p>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index
