/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { useCategoryArticles } from "@/hooks/mutatiion/clients/useCategoryArticles";

interface ProjectsSectionProps {
  projects?: any[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["all", "ongoing", "completed"];

  // Placeholder data if no array provided
  const dummyProjects = [
    { id: 1, title: "Rehabilitation of Market Road", description: "Full paving and drainage construction along the major market axis to ease transportation.", status: "Ongoing", progress: 65, location: "Ejinrin Ward", date: "Oct 2023", image: "/images/assets/hero-bg.jpg" },
    { id: 2, title: "Agbowa Primary Healthcare Upgrade", description: "Equipping the Agbowa PHC with modern diagnostic tools and an expanded maternity wing.", status: "Completed", progress: 100, location: "Agbowa", date: "Aug 2023", image: "/images/assets/logo.jpeg" },
    { id: 3, title: "Ikosi Rural Electrification", description: "Installation of 50 solar streetlights across Ikosi town to improve night security.", status: "Ongoing", progress: 40, location: "Ikosi Town", date: "Nov 2023", image: "/images/assets/hero-bg.jpg" },
  ];

  const displayProjects = projects && projects.length > 0 ? projects : dummyProjects;
  
  const filteredProjects = activeTab === "all" 
    ? displayProjects 
    : displayProjects.filter(p => p.progStatus === activeTab);

  return (
    <section className="py-10 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block"
            >
              Development In Focus
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-heading font-black text-4xl sm:text-5xl text-navy leading-tight"
            >
              Projects Transforming Our Community
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 p-1.5 bg-surface-alt rounded-2xl border border-border-color shrink-0"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl font-bold capitalize text-sm transition-all duration-200 ${
                  activeTab === tab 
                    ? "bg-primary text-white shadow-md" 
                    : "text-text-muted hover:text-navy hover:bg-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white rounded-2xl border border-border-color overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="w-full aspect-video relative overflow-hidden bg-slate-100">
                <img 
                  src={project.image || project.imageUrl || "/images/assets/hero-bg.jpg"} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  {project.progStatus === "completed" ? (
                    <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md backdrop-blur-md">
                      Completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gold text-navy text-xs font-bold uppercase tracking-wider rounded-lg shadow-md backdrop-blur-md">
                      Ongoing
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center text-xs font-semibold text-text-muted mb-3 uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-primary mr-1" />
                  {project.location || "Ikosi-Ejinrin"}
                </div>
                
                <h3 className="font-heading font-bold text-xl text-navy mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-text-muted text-sm line-clamp-2 mb-6 flex-1">
                  {project.description || project.summary}
                </p>

                {/* Progress Bar for Ongoing */}
                {project.status !== "Completed" && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-bold text-navy mb-2">
                      <span>Completion</span>
                      <span className="text-primary">{project.progress || 50}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-alt rounded-full overflow-hidden border border-border-color/50">
                      <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${project.progress || 50}%` }}></div>
                    </div>
                  </div>
                )}

                <div className="border-t border-border-color pt-4 flex items-center justify-between mt-auto">
                  <div className="flex items-center text-sm font-medium text-text-muted">
                    <Calendar className="w-4 h-4 mr-1.5 opacity-60" />
                    {project.date || new Date().toLocaleDateString()}
                  </div>
                  <Link href={`/projects/${project.slug || project.id}`} className="inline-flex items-center text-sm font-bold text-primary group-hover:underline">
                    View Project <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects" className="btn-outline border-border-color text-navy hover:border-primary hover:text-white px-8">
            View All Development Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
