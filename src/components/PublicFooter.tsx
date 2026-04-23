"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Clock, ShieldAlert, ArrowRight, Bell } from "lucide-react";

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="font-sans flex flex-col mt-auto bg-navy text-white">
      {/* Top Strip - Newsletter */}
      <div className="bg-primary-light border-b-2 border-primary/20 py-12 text-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="font-heading font-extrabold text-2xl text-primary mb-2 flex items-center gap-2">
              <Bell className="w-6 h-6" /> Stay Informed
            </h3>
            <p className="text-sm font-medium text-text-muted">
              Subscribe to our newsletter for the latest community updates, council news, and development projects.
            </p>
          </div>
          <form className="flex w-full md:w-auto max-w-lg gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 w-full sm:w-72 bg-white border border-border-color text-text-base px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm shadow-sm"
              required
            />
            <button type="button" className="btn-gold whitespace-nowrap hidden sm:inline-flex shadow-sm">
              Subscribe
            </button>
            <button type="button" className="btn-gold whitespace-nowrap p-3 px-4 sm:hidden">
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center p-1 border border-white/20">
                <img src="https://res.cloudinary.com/orestech/image/upload/v1776174319/items/nev42bp1usbt3nezyri273jpc.jpg" alt="Logo" className="rounded-full object-cover w-full h-full" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-widest leading-none">
                IKOSI-<br />EJINRIN
              </span>
            </Link>
            
            <div className="inline-flex max-w-fit items-center gap-1.5 px-2.5 py-1 text-xs border border-white/20 rounded-md bg-white/5 font-medium">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Official Lagos Council
            </div>
            
            <p className="text-white/60 text-sm leading-relaxed mb-1">
              Delivering responsive, transparent, and people-centered governance to every resident.
            </p>

            <div className="flex gap-2">
              <a href="#" className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-white/70 hover:text-white" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-white/70 hover:text-white" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-white/70 hover:text-white" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-white/70 hover:text-white" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white border-b border-white/10 pb-3 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm font-medium text-white/70 hover:text-gold transition-colors flex items-center gap-2 group"><span className="text-transparent group-hover:text-gold transition-colors text-xs">→</span> About Us</Link></li>
              <li><Link href="/projects" className="text-sm font-medium text-white/70 hover:text-gold transition-colors flex items-center gap-2 group"><span className="text-transparent group-hover:text-gold transition-colors text-xs">→</span> Projects & News</Link></li>
              <li><Link href="/executives" className="text-sm font-medium text-white/70 hover:text-gold transition-colors flex items-center gap-2 group"><span className="text-transparent group-hover:text-gold transition-colors text-xs">→</span> Leadership</Link></li>
              <li><Link href="/gallery" className="text-sm font-medium text-white/70 hover:text-gold transition-colors flex items-center gap-2 group"><span className="text-transparent group-hover:text-gold transition-colors text-xs">→</span> Event Gallery</Link></li>
              <li><Link href="/contact" className="text-sm font-medium text-white/70 hover:text-gold transition-colors flex items-center gap-2 group"><span className="text-transparent group-hover:text-gold transition-colors text-xs">→</span> Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white border-b border-primary pb-3 inline-block">Our Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services/health" className="text-sm font-medium text-white/70 hover:text-gold transition-colors flex items-center gap-2 group"><span className="text-transparent group-hover:text-gold transition-colors text-xs">→</span> Primary Healthcare</Link></li>
              <li><Link href="/services/infrastructure" className="text-sm font-medium text-white/70 hover:text-gold transition-colors flex items-center gap-2 group"><span className="text-transparent group-hover:text-gold transition-colors text-xs">→</span> Public Works</Link></li>
              <li><Link href="/services/education" className="text-sm font-medium text-white/70 hover:text-gold transition-colors flex items-center gap-2 group"><span className="text-transparent group-hover:text-gold transition-colors text-xs">→</span> Education</Link></li>
              <li><Link href="/pay" className="text-sm font-medium text-white/70 hover:text-gold transition-colors flex items-center gap-2 group"><span className="text-transparent group-hover:text-gold transition-colors text-xs">→</span> Revenue & Levies</Link></li>
              <li><Link href="/services/environment" className="text-sm font-medium text-white/70 hover:text-gold transition-colors flex items-center gap-2 group"><span className="text-transparent group-hover:text-gold transition-colors text-xs">→</span> Waste Management</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="font-heading font-bold text-lg mb-6 text-white border-b border-white/10 pb-3 inline-block">Contact Info</h4>
            <ul className="space-y-4 text-sm text-white/70 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">LCDA Secretariat,<br />Itamerin Junction, Agbowa-Ikosi,<br />Lagos State.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+234 (0) 800 LCDA EPE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@ikosiejinrin.lg.gov.ng</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span>Mon-Fri: 8:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Emergency */}
          <div className="lg:col-span-1">
            <h4 className="font-heading font-bold text-lg mb-6 text-white border-b border-destructive pb-3 inline-block text-red-400">Emergency</h4>
            <p className="text-sm font-medium text-white/70 mb-4">
              For rapid community response or security cases, contact our local team.
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:112" className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-destructive" />
                  <span className="text-sm font-bold">Lagos Emergency</span>
                </div>
                <span className="font-mono text-sm text-white/90">112</span>
              </a>
              <a href="https://wa.me/234800000000" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary hover:bg-primary-dark transition-colors font-bold text-sm shadow-lg shadow-primary/20">
                {/* SVG WhatsApp icon replacement since it isn't in lucide default easily */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 text-white/50 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Ikosi-Ejinrin LCDA. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6 font-medium">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
