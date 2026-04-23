"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ChevronDown, ExternalLink } from "lucide-react";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    {
      name: "Council",
      dropdown: [
        { name: "Leadership", href: "/executives" },
        { name: "Legislature", href: "/legislatures" },
        { name: "Our Team", href: "/management-team" },
        { name: "History", href: "/about#biography" },
      ],
    },
    {
      name: "Services",
      dropdown: [
        { name: "Infrastructure", href: "/services/infrastructure" },
        { name: "Health", href: "/services/health" },
        { name: "Education", href: "/services/education" },
        { name: "Revenue", href: "/services/revenue" },
      ],
    },
    { name: "Projects", href: "/projects" },
    { name: "News", href: "/news" },
    { name: "Contact Us", href: "/contact" },
  ];

  const handleMobileDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Animation variants
  const mobileMenuVariants = {
    closed: { x: "100%", transition: { ease: "easeInOut", duration: 0.3 } },
    open: {
      x: 0,
      transition: { ease: "easeInOut", duration: 0.4, staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, display: "none" },
    visible: { opacity: 1, y: 0, display: "block", transition: { duration: 0.2 } },
  };

  return (
    <>
      <nav className="fixed w-full z-50 flex flex-col font-sans">
        {/* TOP BAR (Hidden on mobile) */}
        <div className="hidden md:flex h-9 bg-navy text-white text-xs items-center justify-between px-6 lg:px-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-4 h-4 bg-primary rounded-full inline-block"></span>
              Lagos State Govt
            </span>
            <span className="text-white/30">|</span>
            <span className="font-semibold text-white/90">Ikosi-Ejinrin LCDA</span>
            <span className="text-white/30">|</span>
            <span className="text-white/70">{currentDate}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/transparency" className="hover:text-gold transition-colors font-medium">
              Transparency Portal
            </Link>
            <Link href="/pay" className="text-gold flex items-center gap-1 hover:text-yellow-300 transition-colors font-bold">
              Pay Levies <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* MAIN NAV */}
        <div
          className={`w-full transition-all duration-300 ${
            scrolled || isOpen
              ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border-color text-text-base h-20"
              : "bg-transparent backdrop-blur-sm text-text-base md:text-white h-24"
          }`}
        >
          <div className="flex h-full items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 z-50 group">
              {/* <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white font-heading font-black text-xl tracking-tighter">IE</span>
              </div> */}

              <div className="w-14 h-14 bg-primary-green rounded-full flex items-center justify-center shadow-md">
                {/* <span className="text-white font-bold text-xl">IE</span> */}
                <img src="/images/assets/logo.jpeg" className="rounded-full" alt="" />
              </div>
              <div className={`flex flex-col ${scrolled || isOpen ? "text-navy" : "text-navy md:text-white"}`}>
                <span className="font-heading font-extrabold text-lg leading-tight tracking-tight">Ikosi-Ejinrin</span>
                <span className="text-xs font-semibold tracking-wider uppercase opacity-80">Local Council</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1 h-full">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.dropdown && link.dropdown.some(d => pathname === d.href));
                const textColorClass = scrolled 
                  ? (isActive ? "text-primary" : "text-navy hover:text-primary")
                  : (isActive ? "text-gold" : "text-white hover:text-gold");

                return (
                  <div key={link.name} className="relative group h-full flex items-center px-3">
                    {link.dropdown ? (
                      <span className={`cursor-pointer font-bold text-sm tracking-wide flex items-center gap-1 transition-colors ${textColorClass}`}>
                        {link.name}
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                        {isActive && <span className="absolute bottom-6 left-0 right-0 h-0.5 bg-current mx-2" />}
                      </span>
                    ) : (
                      <Link href={link.href} className={`font-bold text-sm tracking-wide transition-colors relative ${textColorClass}`}>
                        {link.name}
                        {isActive && <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-current rounded-full" />}
                      </Link>
                    )}

                    {/* Dropdown Menu */}
                    {link.dropdown && (
                      <div className="absolute top-[80px] left-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                        <div className="w-56 bg-white rounded-2xl shadow-xl border border-border-color p-2 overflow-hidden">
                          {link.dropdown.map((sublink) => (
                            <Link
                              key={sublink.name}
                              href={sublink.href}
                              className={`block px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                                pathname === sublink.href
                                  ? "bg-primary-light text-primary"
                                  : "text-text-base hover:bg-surface-alt hover:text-primary hover:pl-6"
                              }`}
                            >
                              {sublink.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Actions */}
            {/* <div className="hidden lg:flex items-center gap-6">
              <button aria-label="Search" className={`transition-colors ${scrolled ? "text-navy hover:text-primary" : "text-white hover:text-gold"}`}>
                <Search className="w-5 h-5" />
              </button>
              <Link href="/pay" className="btn-gold py-2.5 px-5 text-sm shadow-md">
                Pay Levies
              </Link>
            </div> */}

            {/* Mobile Menu Toggle */}
            <button
              className={`lg:hidden z-50 p-2 rounded-xl transition-colors ${
                isOpen ? "text-white" : scrolled ? "text-navy bg-surface-alt" : "text-white bg-white/10"
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-navy/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              // variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-navy pt-28 px-6 pb-6 overflow-y-auto border-l border-white/10 shadow-2xl flex flex-col"
            >
              <div className="flex-1 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    {link.dropdown ? (
                      <div className="border-b border-white/10 pb-2">
                        <button
                          onClick={() => handleMobileDropdown(link.name)}
                          className="w-full flex justify-between items-center py-3 text-lg font-heading font-bold text-white tracking-wide"
                        >
                          {link.name}
                          <ChevronDown 
                            className={`w-5 h-5 text-gold transition-transform duration-300 ${openDropdown === link.name ? "rotate-180" : ""}`} 
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdown === link.name && (
                            <motion.div
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              className="pl-4 pb-2 space-y-1"
                            >
                              {link.dropdown.map((sublink) => (
                                <Link
                                  key={sublink.name}
                                  href={sublink.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`block py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                                    pathname === sublink.href
                                      ? "bg-white/10 text-gold"
                                      : "text-white/70 hover:bg-white/5 hover:text-white"
                                  }`}
                                >
                                  {sublink.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-4 border-b border-white/10 text-lg font-heading font-bold tracking-wide transition-colors ${
                          pathname === link.href ? "text-gold bg-gradient-to-r from-gold/10 to-transparent px-3 rounded-xl border-none" : "text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <motion.div variants={linkVariants} className="mt-8 pt-8 border-t border-white/10">
                <Link href="/pay" onClick={() => setIsOpen(false)} className="w-full py-4 bg-gold rounded-xl flex items-center justify-center font-bold text-navy shadow-lg shadow-gold/20 active:scale-95 transition-transform">
                  Pay Levies
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
