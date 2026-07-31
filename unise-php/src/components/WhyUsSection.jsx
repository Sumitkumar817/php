import React from 'react';
import { Link } from 'react-router-dom';

export default function WhyUsSection() {
  const pillars = [
    {
      icon: "fa-building-shield",
      title: "UAE Regulatory Compliance",
      desc: "All systems designed and installed in accordance with UAE Civil Defence, NESA, and DESC standards."
    },
    {
      icon: "fa-network-wired",
      title: "Multi-Brand Expertise",
      desc: "We are not tied to one manufacturer. We select the right technology from Hikvision, Dahua, Bosch, ZKTeco, HID, and more."
    },
    {
      icon: "fa-handshake-angle",
      title: "End-To-End Ownership",
      desc: "From site survey and design to installation, commissioning, handover, and annual maintenance. One partner, full accountability."
    },
    {
      icon: "fa-user-clock",
      title: "Rapid Response SLA",
      desc: "SLA-governed emergency response, remote health monitoring, and preventive maintenance across all contracted sites."
    }
  ];

  return (
    <section className="relative py-20 bg-[#f1f5f9] text-slate-900 overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0073b7] text-xs font-bold uppercase tracking-wider">
            <i className="fa-solid fa-award text-xs"></i>
            <span>WHY CHOOSE UNISPARK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Technical Authority. <span className="text-[#0073b7]">Trusted Delivery.</span>
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We combine regulatory expertise, multi-vendor technology integration, and lifecycle ownership to keep your critical assets protected.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center">
                  <i className={`fa-solid ${p.icon} text-lg`}></i>
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#0073b7] hover:bg-[#005a96] text-white font-bold text-sm shadow-md transition"
          >
            <span>View All Services</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>

      </div>
    </section>
  );
}
