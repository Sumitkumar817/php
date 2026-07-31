import React from 'react';
import { Link } from 'react-router-dom';

export default function DivisionsSection({ onOpenEnquiry }) {
  return (
    <section className="relative py-20 bg-[#021827] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
            <i className="fa-solid fa-screwdriver-wrench text-xs"></i>
            <span>Our Two Divisions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            One Partner. <br />
            <span className="text-cyan-300">Two Specialist Divisions.</span>
          </h2>
        </div>

        {/* Division Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Division 1 */}
          <div className="p-8 rounded-2xl bg-[#032338] border border-white/10 hover:border-cyan-400/50 transition duration-300 flex flex-col justify-between shadow-xl group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 text-cyan-300 flex items-center justify-center">
                <i className="fa-solid fa-screwdriver-wrench text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition">
                Installation & Maintenance
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Professional design, supply, installation, commissioning, and AMC/PMC services across all physical security systems. SLA-governed, UAE-wide coverage.
              </p>
            </div>

            <div className="pt-8">
              <Link
                to="/solutions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0073b7] hover:bg-[#005a96] text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
              >
                <span>Explore Installation Services</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </div>
          </div>

          {/* Division 2 */}
          <div className="p-8 rounded-2xl bg-[#032338] border border-white/10 hover:border-cyan-400/50 transition duration-300 flex flex-col justify-between shadow-xl group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 text-cyan-300 flex items-center justify-center">
                <i className="fa-solid fa-truck-ramp-box text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition">
                Security Equipment Trading
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Supply of globally-recognised security hardware — cameras, recorders, access control, alarm panels, biometric devices, cabling — with UAE stock for fast delivery.
              </p>
            </div>

            <div className="pt-8">
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 hover:border-white bg-white/5 text-white font-bold text-xs uppercase tracking-wider transition"
              >
                <span>Request a Survey</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
