import Layout from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { services } from '../../../data'
import NewsSlider from '@/components/HeroSlider'
import { useHomeData } from '@/hooks/mutatiion/clients/useHomeData'
import { useHomeStore } from '@/store/clients/useHomeStore'
import ArticleSkeleton from '@/components/ArticleSkeleton'

const HomeIndex = () => {
  const { isLoading } = useHomeData();
  const { projects, breakingNews, newsData } = useHomeStore();
  const recentNews = newsData.slice(0, 4);
  const sideNews = projects.slice(1, 4);
  if (isLoading) return <ArticleSkeleton />;
  return (
    <Layout>
       <div className="flex flex-col">
        <NewsSlider newsData={recentNews} />
        <section className="py-16 bg-primary-green relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 drop-shadow-md">
              Moving Ikosi-Ejinrin Forward
            </h2>
            <p className="text-lg md:text-xl font-medium max-w-3xl mx-auto text-white/90">
              Our mission is very simple: we want to keep moving Ikosi-Ejinrin forward. We are fully focused on building better roads, ensuring our kids get decent education, and putting real money back into the hands of our local people.
            </p>
          </div>
        </section>
          <section className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src="https://res.cloudinary.com/orestech/image/upload/v1775298709/Screenshot_2026-04-04_at_11.12.21_AM_1_sm2ni4.png" 
                    alt="Executive Chairman" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-ocean/20 text-accent-ocean rounded-full text-sm font-semibold mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent-ocean"></span>
                    Leadership
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-slate-900 dark:text-white">A Message from the Executive Chairman</h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg leading-relaxed">
                  &quot;I want to personally welcome you to the Ikosi-Ejinrin LCDA platform. Since we took office, my team and I have been on the ground making sure that every single ward—from Agbowa down to every surrounding community—feels the true impact of our work. We&apos;re busy fixing schools, supporting our local farmers, and creating real chances for our youth to succeed, because at the end of the day, this is our home, and we have to build it together.&quot;
                  </p>
                  <Link href="/executives" className="text-primary-green font-bold flex items-center gap-2 hover:gap-4 transition-all">
                    Meet the Executives <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="py-20 bg-sky-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-8 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
                    <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-sm uppercase tracking-wider">Latest Highlights</span>
                    <span className="text-slate-500 font-medium">Top Stories</span>
                  </div>
                  
                  <div className="space-y-8">
                    {breakingNews.map((news) => (
                      <Link href={`/news/article/1/${news?.slug}`} key={news.id} className="group block bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="relative w-full md:w-48 h-48 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                            <Image src={news.imageUrl} alt={news.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-accent-ocean mb-2 uppercase tracking-wide">{new Date(news.createdAt).toDateString()}</div>
                            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-green transition-colors">{news.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{news.summary}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 sticky top-32">
                    <h3 className="text-2xl font-serif font-bold mb-6 text-slate-900 dark:text-white border-l-4 border-primary-green pl-3">More Updates</h3>
                    <div className="space-y-6">
                      {sideNews.map(news => (
                        <Link href={`/projects/article/1/${news?.slug}`} key={news.id} className="block group border-b border-slate-100 dark:border-slate-800 pb-6 last:border-0 last:pb-0">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-primary-green transition-colors">{news.title}</h4>
                          <p className="text-sm text-slate-500 mt-2">{new Date(news.createdAt).toDateString()}</p>
                        </Link>
                      ))}
                    </div>
                    <Link href="/projects" className="block w-full text-center mt-8 py-3 rounded-full bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition-colors">
                      View All Projects
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Services / Manifesto Blocks */}
          <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">Our Core Pillars</h2>
                <div className="w-24 h-1 bg-accent-ocean mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, i) => (
                  <div key={i} className="bg-sky-50 dark:bg-slate-950 p-8 rounded-3xl text-center shadow-sm border border-slate-100 dark:border-slate-800 glass card-hover">
                    <div className="w-16 h-16 mx-auto bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary-green mb-6 shadow-md shadow-primary-green/10">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon}></path></svg>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
       </div>
    </Layout>
  )
}

export default HomeIndex