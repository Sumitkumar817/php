import React from 'react';
import { Link } from 'react-router-dom';

export default function OurGroupSection() {
  return (
    <section className="relative py-20 bg-[#f8fafc] text-slate-900 overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0073b7] text-xs font-bold uppercase tracking-wider">
            OUR GROUP
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Three Entities, <span className="text-[#0073b7]">One Vision</span>
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our group operates through three specialised entities covering IT, HR, and Security — all under one unified group identity, delivering integrated enterprise solutions across the UAE and GCC.
          </p>
        </div>

        {/* Group Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: UniSpark Security */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                UniSpark Security Systems & Equipment Trading L.L.C
              </h3>
              <p className="text-xs text-slate-500 font-medium my-3">
                Security Equipment, Systems Installation & Trading
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100 list-disc pl-4">
                <li>CCTV & IP Camera Systems</li>
                <li>Access Control Systems</li>
                <li>Intruder Alarm & Detection Systems</li>
                <li>Video Intercom & Door Entry Systems</li>
                <li>Perimeter Security & Fencing Systems</li>
                <li>Fire Alarm & Detection Systems</li>
                <li>Biometric & Smart Security Systems</li>
                <li>System Integration & Control Room Setup</li>
                <li>Maintenance Contracts — AMC & PMC</li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                to="/solutions"
                className="text-xs font-bold uppercase tracking-wider text-[#0073b7] hover:text-[#005a96] flex items-center gap-1 transition"
              >
                <span>EXPLORE SOLUTIONS →</span>
              </Link>
            </div>
          </div>

          {/* Card 2: UniSpark HR */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                UniSpark Innovations HR Consultants L.L.C
              </h3>
              <p className="text-xs text-slate-500 font-medium my-3">
                HR, Payroll, HRMS & Staff Augmentation
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100 list-disc pl-4">
                <li>HR Consulting & Strategy</li>
                <li>Payroll Management</li>
                <li>HRMS Implementation</li>
                <li>Staff Augmentation</li>
                <li>Talent Acquisition</li>
                <li>Workforce Planning</li>
              </ul>
            </div>

            <div className="pt-8 space-y-3">
              <p className="text-[11px] text-slate-400 italic leading-snug">
                You are being redirected to UniSpark Innovations HR Consultants L.L.C, a sister entity of UniSpark Security Systems & Equipment Trading L.L.C.
              </p>
              <a
                href="https://usihr.com/"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold uppercase tracking-wider text-[#0073b7] hover:text-[#005a96] flex items-center gap-1 transition"
              >
                <span>VISIT WEBSITE →</span>
              </a>
            </div>
          </div>

          {/* Card 3: Horizon Hive */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                Horizon Hive Technology L.L.C
              </h3>
              <p className="text-xs text-slate-500 font-medium my-3">
                <strong>Lead Entity</strong> — IT, Cybersecurity & Digital Transformation
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100 list-disc pl-4">
                <li>Advisory as a Service</li>
                <li>Cybersecurity Services</li>
                <li>Managed IT Services</li>
                <li>Aviation IT Services</li>
                <li>Video Analytics & AI Surveillance</li>
                <li>Digital Employee Experience</li>
                <li>Network Infrastructure & Security</li>
                <li>End User Support</li>
                <li>Unified Audio & Video Solutions</li>
              </ul>
            </div>

            <div className="pt-8 space-y-3">
              <p className="text-[11px] text-slate-400 italic leading-snug">
                You are being redirected to Horizon Hive Technology L.L.C, a sister entity of UniSpark Security Systems & Equipment Trading L.L.C.
              </p>
              <a
                href="https://www.horizonhivetechnology.com/"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold uppercase tracking-wider text-[#0073b7] hover:text-[#005a96] flex items-center gap-1 transition"
              >
                <span>VISIT WEBSITE →</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
