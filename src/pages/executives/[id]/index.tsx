import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { executivesData } from "../../../../data";
import Layout from "@/components/layout";
import EmptyState from "@/components/EmptyState";

export default function ExecutiveProfilePage() {
  const param = useParams<{
    id: string; slug: string
}>();
  const resolvedParams = param;
  const execId = resolvedParams?.id ?? '';
  const exec = executivesData.find(e => e.id === execId);

  if (!exec) {
    return <EmptyState />;
  }

  return (
    <Layout>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/executives" className="inline-flex items-center gap-2 text-primary-green font-semibold mb-8 hover:underline">
            &larr; Back to Executives
          </Link>
          
          <div className="bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="col-span-1 md:col-span-2 relative h-125 md:h-145 border-r border-slate-100 dark:border-slate-800">
                {exec && (
                  <Image 
                    src={exec.image} 
                    alt={exec.name} 
                    fill 
                    className="object-cover"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-8 md:hidden">
                  <div>
                    <h2 className="text-accent-ocean font-bold uppercase tracking-widest text-sm mb-1">{exec.role}</h2>
                    <h1 className="text-3xl font-extrabold text-white">{exec.name}</h1>
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-3 p-8 lg:p-12">
                <div className="hidden md:block mb-8">
                  <div className="inline-block px-4 py-1 bg-accent-ocean/10 text-accent-ocean rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-accent-ocean/20">
                    {exec.role}
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {exec.name}
                  </h1>
                </div>

                {exec.sections ? (
                  <div className="space-y-12 mb-12">
                    {exec.sections.map((section, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/5 rounded-full blur-2xl group-hover:bg-primary-green/10 transition-colors"></div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                          <div className="w-2 h-8 bg-linear-to-b from-primary-green to-accent-ocean rounded-full"></div>
                          {section.title}
                        </h3>
                        <div className="space-y-4">
                          {section.content.map((paragraph, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-4">
                              {section.content.length > 2 && paragraph.length < 150 && section.title !== 'Personal Life' ? (
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-ocean mt-2.5 shrink-0 shadow-sm shadow-accent-ocean/50"></div>
                              ) : null}
                              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed m-0 flex-1">
                                {paragraph}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 mb-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/5 rounded-full blur-2xl"></div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                      <div className="w-2 h-8 bg-linear-to-b from-primary-green to-accent-ocean rounded-full"></div>
                      Biography
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-wrap relative z-10">
                      {exec.detailedBio}
                    </p>
                  </div>
                )}

                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-accent-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                    Awards & Recognitions
                  </h3>
                  <ul className="space-y-3">
                    {exec.awards.map((award, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                        <svg className="w-5 h-5 text-primary-green shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="font-medium">{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
