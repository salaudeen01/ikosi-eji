"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    { name: "Projects & News", 
      dropdown: [
        { name: "News", href: "/news" },
        { name: "Projects", href: "/projects" }
      ]
    },
    { 
      name: "Councils Teams", 
      dropdown: [
        { name: "Executives", href: "/executives" },
        // { name: "Legislatures", href: "/legislatures" },
        { name: "Management Team", href: "/management-team" }
      ] 
    },
    // { name: "Gallery", href: "/gallery" },
    // { name: "Jobs", href: "/jobs" },
    { name: "Contact Us", href: "/contact" },
  ];

  const handleMobileDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="shrink-0 flex items-center gap-2">
              <div className="w-14 h-14 bg-primary-green rounded-full flex items-center justify-center shadow-md">
                {/* <span className="text-white font-bold text-xl">IE</span> */}
                <img src="/images/assets/logo.jpeg" alt="" />
              </div>
              <span className="font-extrabold text-xl font-serif text-slate-800 tracking-tight">
                Ikosi-Ejinrin LCDA
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <>
                    <button className="px-3 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-primary-green hover:bg-sky-50 transition-colors flex items-center gap-1">
                      {link.name}
                      <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left group-hover:translate-y-0 translate-y-2">
                      <p className="py-2">
                        {link.dropdown.map((sublink) => (
                          <Link
                            key={sublink.name}
                            href={sublink.href}
                            className={`block px-4 py-2 mt-1 mx-2 rounded-lg text-sm font-bold transition-colors ${
                              pathname === sublink.href
                                ? "text-primary-green bg-sky-50"
                                : "text-slate-600 hover:text-primary-green hover:bg-sky-50"
                            }`}
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </p>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-full text-sm font-bold transition-colors ${
                      pathname === link.href
                        ? "text-primary-green bg-sky-50"
                        : "text-slate-600 hover:text-primary-green hover:bg-sky-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-primary-green focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu Side Sheet */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-[80vw] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden overflow-y-auto border-l border-slate-100 shadow-2xl flex flex-col`}>
        <div className="p-6 flex-1">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
            <span className="font-extrabold text-xl font-serif text-slate-800 tracking-tight">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full text-slate-500 hover:text-primary-green hover:bg-sky-50 focus:outline-none transition-colors"
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-3">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => handleMobileDropdown(link.name)}
                      className="w-full flex justify-between items-center px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-primary-green hover:bg-sky-50 transition-colors"
                    >
                      {link.name}
                      <svg className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openDropdown === link.name ? 'max-h-64 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-6 pr-4 py-2 space-y-1 bg-slate-50/80 rounded-xl">
                        {link.dropdown.map((sublink) => (
                          <Link
                            key={sublink.name}
                            href={sublink.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                              pathname === sublink.href
                                ? "text-primary-green bg-white shadow-sm"
                                : "text-slate-600 hover:text-primary-green hover:bg-white"
                            }`}
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                      pathname === link.href
                        ? "text-primary-green bg-sky-50 shadow-sm"
                        : "text-slate-700 hover:text-primary-green hover:bg-sky-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <p className="text-xs text-center text-slate-500 font-medium font-sans">
            © {new Date().getFullYear()} Ikosi-Ejinrin LCDA.
          </p>
        </div>
      </div>
    </nav>
  );
}
