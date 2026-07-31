import React from 'react';
import { Link } from 'react-router-dom';

export default function CtaSection({ onOpenEnquiry }) {
  return (
    <section className="relative py-20 bg-[#030e21] text-white overflow-hidden border-t border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900 border border-slate-700 text-sky-400 text-xs font-semibold uppercase tracking-wider">
          <i className="fa-solid fa-cubes text-xs"></i>
          <span>NEXT-GEN INTEGRATION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Ready to <span className="text-gradient-cyan">Secure Your Site?</span>
        </h2>

        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          Contact our team today for a no-obligation site survey and security assessment.
        </p>

        <div className="flex justify-center pt-4">
          <Link
            to="/contact-us"
            className="px-8 py-3.5 rounded-xl bg-[#0073b7] hover:bg-[#005a96] text-white font-bold text-sm shadow-lg flex items-center gap-2 transition"
          >
            <span>Request a Survey</span>
            <i className="fa-solid fa-arrow-right-long text-xs"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
