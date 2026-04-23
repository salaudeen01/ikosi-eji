"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Send, CheckCircle2, ChevronDown } from "lucide-react";

export default function ContactSection() {
  const [formState, setFormState] = useState({ state: "idle", error: "" }); // idle | submitting | success | error

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ state: "submitting", error: "" });
    // Simulate API delay
    setTimeout(() => {
      setFormState({ state: "success", error: "" });
    }, 1500);
  };

  return (
    <section className="py-10 bg-white font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block">Get In Touch</span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-navy leading-tight mb-6">
              We're Here To Serve You Better
            </h2>
            <p className="text-text-muted text-lg mb-10">
              Have a question, suggestion, or complaint? Reach out to the council directly. Our resident support team is available during office hours.
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Address</h4>
                  <p className="text-sm text-text-muted leading-relaxed">Itamerin Junction,<br/>Agbowa-Ikosi, Lagos</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Phone</h4>
                  <p className="text-sm text-text-muted">+234 800 LCDA EPE</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Email</h4>
                  <p className="text-sm text-text-muted">info@ikosiejinrin.lg.gov.ng</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Office Hours</h4>
                  <p className="text-sm text-text-muted">Mon-Fri: 8AM - 4PM</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 mb-10">
              <a href="#" className="w-12 h-12 bg-surface-alt rounded-2xl flex items-center justify-center text-navy hover:bg-primary hover:text-white transition-all shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-surface-alt rounded-2xl flex items-center justify-center text-navy hover:bg-primary hover:text-white transition-all shadow-sm">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-surface-alt rounded-2xl flex items-center justify-center text-navy hover:bg-primary hover:text-white transition-all shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Google Maps iframe */}
            <div className="w-full h-48 bg-slate-200 rounded-3xl overflow-hidden shadow-inner border border-border-color relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126830.40026210515!2d3.8268!3d6.5888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103977c0c17a5efb%3A0x6b4f71a067ca7b!2sAgbowa-Ikosi%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ikosi-Ejinrin Map"
                className="absolute inset-0 z-0 grayscale opacity-80 mix-blend-multiply"
              ></iframe>
              <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-xl border border-border-color p-8 sm:p-10 relative overflow-hidden">
              
              {formState.state === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} 
                  className="flex flex-col items-center justify-center text-center py-12 h-full"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-heading font-black text-3xl text-navy mb-4">Message Sent!</h3>
                  <p className="text-text-muted text-lg mb-8">
                    Thank you for reaching out to Ikosi-Ejinrin LCDA. Our team will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setFormState({ state: "idle", error: "" })}
                    className="btn-outline w-full"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                  <div className="mb-2">
                    <h3 className="font-heading font-bold text-2xl text-navy mb-2">Send Us a Message</h3>
                    <p className="text-sm text-text-muted">Fill out the form below and we'll reply as soon as possible.</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Full Name</label>
                    <input type="text" required placeholder="John Doe" className="w-full bg-surface-alt border border-border-color rounded-xl h-12 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-navy placeholder:text-slate-400" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-navy mb-2">Email Address</label>
                      <input type="email" required placeholder="john@example.com" className="w-full bg-surface-alt border border-border-color rounded-xl h-12 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-navy placeholder:text-slate-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-navy mb-2">Phone Number</label>
                      <input type="tel" placeholder="0800 000 0000" className="w-full bg-surface-alt border border-border-color rounded-xl h-12 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-navy placeholder:text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Subject</label>
                    <div className="relative">
                      <select required className="w-full bg-surface-alt border border-border-color rounded-xl h-12 px-4 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-navy">
                        <option value="" disabled selected>Select a subject...</option>
                        <option value="inquiry">General Inquiry</option>
                        <option value="complaint">Complaint</option>
                        <option value="feedback">Feedback / Suggestion</option>
                        <option value="emergency">Community Emergency</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Message</label>
                    <textarea required placeholder="How can we help you?" rows={4} className="w-full bg-surface-alt border border-border-color rounded-xl p-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-navy placeholder:text-slate-400 resize-none"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formState.state === "submitting"}
                    className="btn-gold w-full mt-2 group relative overflow-hidden"
                  >
                    {formState.state === "submitting" ? (
                      <span className="flex items-center gap-2">Sending...</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
