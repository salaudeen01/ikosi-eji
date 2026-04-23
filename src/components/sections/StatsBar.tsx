"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, Building2, MapPin, Smile } from "lucide-react";

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { stiffness: 100, damping: 15 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function StatsBar() {
  const stats = [
    { label: "Residents", value: 120000, suffix: "+", icon: Users },
    { label: "Projects", value: 45, suffix: "+", icon: Building2 },
    { label: "Communities", value: 12, suffix: "", icon: MapPin },
    { label: "Satisfaction", value: 98, suffix: "%", icon: Smile },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-r from-primary to-primary-dark overflow-hidden z-20 font-sans">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_11px)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col items-center text-center ${idx !== stats.length - 1 ? 'md:border-r md:border-gold/20' : ''}`}
            >
              <stat.icon className="w-8 h-8 text-white mb-4 opacity-80" />
              <h3 className="font-heading text-4xl md:text-5xl font-black text-gold mb-2 tracking-tighter">
                <AnimatedCounter value={stat.value} />{stat.suffix}
              </h3>
              <p className="text-white/80 font-medium text-sm md:text-base tracking-wide uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
