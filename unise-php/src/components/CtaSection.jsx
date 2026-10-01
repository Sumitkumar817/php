import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Boxes, ArrowRight, Phone } from 'lucide-react';

export default function CtaSection({ data: propData, onOpenEnquiry }) {
  const [internalData, setInternalData] = useState(null);

  useEffect(() => {
    if (!propData) {
      const apiBase = import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');
      fetch(`${apiBase}/about`)
        .then(res => res.json())
        .then(d => {
          if (d.success && d.data) setInternalData(d.data);
        })
        .catch(err => console.warn('Error fetching cta section data:', err));
    }
  }, [propData]);

  const data = propData || internalData;
  const badge = data?.ctaBadge || 'Next-Gen Integration';
  const desc = data?.ctaDesc || 'Contact our team today for a no-obligation site survey and security assessment.';
  const primaryBtnText = data?.ctaPrimaryBtnText || 'Request a Survey';
  const primaryBtnLink = data?.ctaPrimaryBtnLink || '/contact-us';
  const bgImage = data?.ctaBgImage || '/images/cctv-bg.jpg';

  return (
    <section 
      className="relative w-full overflow-hidden bg-slate-900 bg-cover bg-center bg-no-repeat py-12 md:py-16"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px] pointer-events-none z-0"></div>
      <div className="absolute -top-[20%] -left-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      <div className="max-w-[1200px] mx-auto p-5 py-2 px-5 md:px-6 lg:px-2">
        <div className="relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold tracking-wide uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
              <Boxes className="w-3.5 h-3.5" /> {badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Ready to <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-[#1380c2] bg-clip-text text-transparent">Secure Your Site?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light max-w-xl mb-8 leading-relaxed">
              {desc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                to={primaryBtnLink || '/contact-us'}
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-lg shadow-cyan-900/20 transition-all duration-150 border border-cyan-500/30 uppercase tracking-wider"
              >
                <span>{primaryBtnText || 'Request an AMC/PMC Quotation'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
              </Link>
              <a
                href="tel:+971-4-1234567"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-lg transition-all duration-150 uppercase tracking-wider backdrop-blur-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Our Team</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
