import React from 'react';
import { Link } from 'react-router-dom';
import { solutionsData } from '../data/solutionsData';
import { industriesData } from '../data/industriesData';

export default function Footer() {
  return (
    <footer className="relative bg-[#004b78] text-slate-200 overflow-hidden pt-16 pb-8 border-t border-white/10 font-sans">
      
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-7 right-7 z-50 flex items-center">
        <a
          href="https://wa.me/971502885874"
          target="_blank"
          rel="noreferrer"
          className="relative w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition duration-300 group"
          aria-label="WhatsApp Business"
        >
          <div className="absolute inset-0 rounded-full bg-[#25D366] whatsapp-pulse-back pointer-events-none"></div>
          <div className="absolute inset-0 rounded-full bg-[#25D366] whatsapp-pulse-front pointer-events-none"></div>
          <i className="fa-brands fa-whatsapp text-2xl relative z-10"></i>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img src="/images/logo.png" alt="UniSpark Innovation Logo" className="h-12 w-auto object-contain brightness-0 invert" />
            </Link>

            <h4 className="text-white text-xs font-bold leading-relaxed uppercase tracking-wider">
              UniSpark Innovation Security Systems & Equipment Trading L.L.C
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed opacity-90">
              Next-generation enterprise protection and cyber-physical infrastructure logic designed for global digital business velocity.
            </p>

            <div className="space-y-2 pt-2">
              <span className="inline-block px-3 py-1 rounded bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider">
                Group Companies:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>
                  <a href="https://horizonhivetechnology.com/" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1.5">
                    <i className="fa-solid fa-link text-[10px]"></i> Horizon Hive Technology L.L.C
                  </a>
                </li>
                <li>
                  <a href="https://usihr.com/" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1.5">
                    <i className="fa-solid fa-link text-[10px]"></i> UniSpark Innovations HR Consultants L.L.C
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Matrix */}
            <div className="flex items-center gap-2 pt-2">
              <a href="https://www.facebook.com/UnisparkInnovation/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#004b78] transition">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a href="https://www.instagram.com/unispark_innovation/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#004b78] transition">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="https://x.com/unispark_inn" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#004b78] transition">
                <i className="fa-brands fa-x-twitter text-sm"></i>
              </a>
              <a href="https://www.linkedin.com/company/unispark-innovation/posts/?feedView=all" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#004b78] transition">
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider border-b border-white/20 pb-2">
              SOLUTIONS
            </h5>
            <ul className="space-y-2 text-xs text-slate-200">
              {solutionsData.map((s) => (
                <li key={s.id}>
                  <Link to={`/solutions/${s.id}`} className="hover:text-white transition flex items-center gap-2">
                    <i className={`fa-solid ${s.icon} text-[10px] opacity-70`}></i>
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Column */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider border-b border-white/20 pb-2">
              INDUSTRIES
            </h5>
            <ul className="space-y-2 text-xs text-slate-200">
              {industriesData.map((ind) => (
                <li key={ind.id}>
                  <Link to={`/industries/${ind.id}`} className="hover:text-white transition flex items-center gap-2">
                    <i className={`fa-solid ${ind.icon} text-[10px] opacity-70`}></i>
                    <span>{ind.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider border-b border-white/20 pb-2">
              QUICK LINKS
            </h5>
            <ul className="space-y-2 text-xs text-slate-200">
              <li><Link to="/" className="hover:text-white transition flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Home</Link></li>
              <li><Link to="/about-us" className="hover:text-white transition flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> About Us</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Solutions</Link></li>
              <li><Link to="/industries" className="hover:text-white transition flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Industries</Link></li>
              <li><Link to="/contact-us" className="hover:text-white transition flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Contact Us</Link></li>
            </ul>
          </div>

        </div>

        {/* Dashboard Contact Panel (Matching Screenshot 1) */}
        <div className="py-6 my-6 bg-white/10 rounded-2xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white">
          <div>
            <span className="inline-block px-3 py-1 rounded bg-white/10 text-white font-bold uppercase text-[10px] mb-1">
              Service Areas:
            </span>
            <div className="font-semibold text-white/90">Dubai | Abu Dhabi | Sharjah | UAE Nationwide</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-base text-cyan-300"></i>
              <div>
                <img src="/images/dubai.svg" alt="Dubai Vector" className="h-6 w-auto mb-0.5 filter invert" />
                <div className="font-semibold">Dubai, United Arab Emirates</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-base text-cyan-300"></i>
              <div>
                <a href="mailto:sales@unisparkinnovation.com" className="font-semibold hover:underline">Sales: sales@unisparkinnovation.com</a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-base text-cyan-300"></i>
              <div className="font-bold">Call: +971 50 288 5874</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-xs text-white/70 gap-4">
          <div>
            © {new Date().getFullYear()} UniSpark Innovation Security Systems & Equipment Trading L.L.C. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
