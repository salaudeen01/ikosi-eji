import Layout from '@/components/layout'
import React, { useState } from 'react'
import { Facebook, Twitter, Phone, Mail, MapPin, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Message sent successfully! We'll get back to you soon.")
      ;(e.target as HTMLFormElement).reset()
    }, 1500)
  }

  return (
    <Layout>
      <div className="bg-sky-50 dark:bg-slate-900 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16 animate-[fade-in_0.5s_ease-out]">
            <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Contact Us
            </h1>
            <div className="w-32 h-1.5 bg-linear-to-r from-primary-green to-accent-ocean mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Have questions, feedback, or need assistance? Reach out to us through any of the channels below or send us a message directly from the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            
            {/* Contact Information & Socials */}
            <div>
              <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border-t-8 border-primary-green space-y-8 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl -z-10"></div>
                
                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white border-b pb-4 dark:border-slate-700">
                  Get In Touch
                </h3>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <a href="tel:+2348000000000" className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-primary-green transition group bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-primary-green group-hover:text-white transition shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Phone Number</p>
                      <p className="text-lg">+234 (0) 800 000 0000</p>
                    </div>
                  </a>
                  
                  {/* Email */}
                  <a href="mailto:info@ikosiejinrinlcda.gov.ng" className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-primary-green transition group bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex flex-shrink-0 items-center justify-center group-hover:bg-primary-green group-hover:text-white transition shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-semibold text-slate-900 dark:text-white">Email Address</p>
                      <p className="text-lg truncate">info@ikosiejinrinlcda.gov.ng</p>
                    </div>
                  </a>

                  {/* Facebook */}
                  <a href="#" className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition group bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shadow-sm">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Facebook</p>
                      <p className="text-lg">@IkosiEjinrinLCDA</p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a href="https://wa.me/2348000000000" className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-green-500 transition group bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition shadow-sm">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">WhatsApp</p>
                      <p className="text-lg">+234 (0) 800 000 0000</p>
                    </div>
                  </a>

                  {/* Twitter / X */}
                  <a href="#" className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition group bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition shadow-sm">
                      <Twitter className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">X (Twitter)</p>
                      <p className="text-lg">@IkosiEjinrin</p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex flex-shrink-0 items-center justify-center text-primary-green shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Office Address</p>
                      <p className="text-md">LCDA Secretariat, Ita Merin, Agbowa, Lagos State, Nigeria.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <div>
              <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl space-y-8 flex flex-col h-full border border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">Send us a Message</h3>
                  <p className="text-slate-500 dark:text-slate-400">Fill out the form below and our team will get back to you immediately.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Full Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-green transition placeholder:text-slate-400" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Email Address</label>
                      <input required type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-green transition placeholder:text-slate-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Subject</label>
                    <input required type="text" placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-green transition placeholder:text-slate-400" />
                  </div>
                  
                  <div className="space-y-2 flex-1 flex flex-col">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Message</label>
                    <textarea required placeholder="Write your message here..." className="w-full h-full min-h-[150px] px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-green transition resize-none placeholder:text-slate-400"></textarea>
                  </div>
                  
                  <button type="submit" disabled={isSubmitting} className="w-full bg-primary-green hover:bg-green-700 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg shadow-primary-green/30 disabled:opacity-70 disabled:cursor-not-allowed mt-auto">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* Map Section */}
          <div className="mb-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-extrabold text-slate-900 dark:text-white mb-4">Location Map</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Find the LCDA Secretariat in Ita Merin, Agbowa.
              </p>
            </div>
            <div className="w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-8 border-white dark:border-slate-800">
              {/* Embedded Google Maps showing Agbowa-Ikosi Lagos */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126830.430852895!2d3.8291416393796856!3d6.643202996582455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039757659dc6315%3A0xe547932c0d8abed6!2sAgbowa-Ikosi%2C%20Lagos!5e0!3m2!1sen!2sng!4v1714545239123!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
