import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import { executivesData } from "../../../data";

export default function ExecutivesPage() {
  return (
    <Layout>
      <div className="bg-sky-50 dark:bg-slate-900 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 px-4 animate-[fade-in_0.5s_ease-out]">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Our Executives</h1>
            <div className="w-24 h-1 bg-primary-green mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Meet the dedicated leaders and technocrats steering the wheel of progress in Ikosi-Ejinrin LCDA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {executivesData.map((exec) => (
              <Link href={`/executives/${exec.id}`} key={exec.id}>
                <div className="bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 text-center card-hover group h-full flex flex-col">
                  <div className="relative w-48 h-48 mx-auto mt-8 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-md group-hover:border-primary-green transition-colors">
                      <Image 
                        src={exec.image} 
                        alt={exec.name} 
                        fill 
                        className="object-cover"
                      />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h2 className="text-sm font-bold text-accent-ocean uppercase tracking-wider mb-2">{exec.role}</h2>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{exec.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">
                      {exec.description}
                    </p>
                    <span className="text-primary-green text-sm font-semibold mt-auto flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                        View Profile &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  );
}
