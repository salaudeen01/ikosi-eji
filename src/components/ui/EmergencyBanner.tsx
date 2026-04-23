"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PhoneCall } from "lucide-react";

export default function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage to see if user previously dismissed
    const dismissed = localStorage.getItem("ie_emergency_dismissed");
    if (!dismissed) {
      // Small timeout to allow the rest of the page to load
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("ie_emergency_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 w-full z-[100] font-sans"
        >
          {/* Main Banner */}
          <div className="bg-navy border-t border-primary/30 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Left Side: Alert Text */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  <p className="text-white text-sm sm:text-base font-semibold leading-tight pr-8 sm:pr-0">
                    Need immediate assistance from the Council? Reach our 24/7 support line.
                  </p>
                  
                  {/* Mobile exact close overlay */}
                  <button onClick={handleDismiss} className="absolute right-4 top-3 p-1 sm:hidden text-white/50 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                  <a href="https://wa.me/234800000000" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-primary hover:bg-primary-dark transition-colors font-bold text-white text-sm shadow-md shrink-0 w-full sm:w-auto">
                    <PhoneCall className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                  <button 
                    onClick={handleDismiss} 
                    className="hidden sm:flex p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    aria-label="Dismiss banner"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
