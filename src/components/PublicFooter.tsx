import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center">
                {/* <span className="text-white font-bold text-xl">IE</span> */}
                <img src="/images/assets/logo.jpeg" alt="" className="rounded-full" />
              </div>
              <span className="font-extrabold text-xl font-serif text-white tracking-widest">IKOSI-EJINRIN</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Official Digital Portal of Ikosi-Ejinrin Local Council Development Area, Agbowa. Committed to grassroots development, empowerment, and excellence.
            </p>
          </div>

          <div>
            <h3 className="text-white font-serif font-bold mb-4 text-xl border-b border-primary-green pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-400 hover:text-primary-green transition-colors text-sm">About LCDA</Link></li>
              <li><Link href="/projects" className="text-slate-400 hover:text-primary-green transition-colors text-sm">Projects & News</Link></li>
              <li><Link href="/executives" className="text-slate-400 hover:text-primary-green transition-colors text-sm">Our Executives</Link></li>
              <li><Link href="/gallery" className="text-slate-400 hover:text-primary-green transition-colors text-sm">Event Gallery</Link></li>
              <li><Link href="/jobs" className="text-slate-400 hover:text-primary-green transition-colors text-sm">Job Opportunities</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-bold mb-4 text-xl border-b border-accent-ocean pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>LCDA Secretariat,<br />Itamerin Junction,<br />Agbowa-Ikosi, Epe Division,<br />Lagos State.</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>info@ikosiejinrin.lg.gov.ng</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span>+234 (0) 800 LCDA EPE</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-bold mb-4 text-xl border-b border-primary-green pb-2 inline-block">Newsletter</h3>
            <p className="text-slate-400 text-sm mb-4">Subscribe to receive updates on projects and announcements.</p>
            <form className="flex flex-col gap-2" action="#">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-md focus:outline-none focus:border-primary-green focus:ring-1 focus:ring-primary-green text-sm"
              />
              <button
                type="button"
                className="bg-primary-green hover:bg-secondary-green text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8 text-center md:flex md:justify-between md:items-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Ikosi-Ejinrin LCDA. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4 md:mt-0">
            {/* Social Icons Placeholders */}
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-green transition-colors cursor-pointer">
              <span className="sr-only">Facebook</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-green transition-colors cursor-pointer">
              <span className="sr-only">Twitter</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
