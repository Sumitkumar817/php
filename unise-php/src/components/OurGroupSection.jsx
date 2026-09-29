import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Network, ArrowRight } from 'lucide-react';

export default function OurGroupSection({ data }) {
  return (
    <section className="relative w-full overflow-hidden bg-[#f1f5f9] py-12 md:py-16">
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-[#1380c2]/5 rounded-full blur-[90px] pointer-events-none z-0"></div>
      
      <div className="max-w-[1200px] mx-auto p-5 py-2 px-5 md:px-6 lg:px-2">
        <div className="relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 text-xs font-semibold tracking-wide uppercase text-[#1380c2] bg-[#1380c2]/10 border border-[#1380c2]/20 rounded-full">
              Our Group
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Three Entities, <span className="bg-gradient-to-r from-[#1380c2] to-[#0c5683] bg-clip-text text-transparent">One Vision</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed max-w-3xl">
              Our group operates through three specialised entities covering IT, HR, and Security — all under one unified group identity, delivering integrated enterprise solutions across the UAE and GCC.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Entity 1 */}
            <div className="group flex flex-col justify-between bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#1380c2]/30 transition-all duration-300">
              <div>
                <div className="flex items-start gap-3 border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1380c2]/10 text-[#1380c2] group-hover:bg-[#1380c2] group-hover:text-white transition-all duration-300 shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#1380c2] transition-colors duration-300">
                      UniSpark Security Systems &amp; Equipment Trading L.L.C
                    </h3>
                    <p className="text-xs font-semibold text-[#1380c2] mt-1">
                      Security Equipment, Systems Installation &amp; Trading
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {[
                    'CCTV & IP Camera Systems',
                    'Access Control Systems',
                    'Intruder Alarm & Detection Systems',
                    'Video Intercom & Door Entry Systems',
                    'Perimeter Security & Fencing Systems',
                    'Fire Alarm & Detection Systems',
                    'Biometric & Smart Security Systems',
                    'System Integration & Control Room Setup',
                    'Maintenance Contracts — AMC & PMC'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-normal">
                      <span className="text-[#1380c2] mt-1 shrink-0">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100/60">
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1380c2] hover:text-[#0f6ba3] transition-colors duration-300 group/btn"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Entity 2 */}
            <div className="group flex flex-col justify-between bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#1380c2]/30 transition-all duration-300">
              <div>
                <div className="flex items-start gap-3 border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1380c2]/10 text-[#1380c2] group-hover:bg-[#1380c2] group-hover:text-white transition-all duration-300 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#1380c2] transition-colors duration-300">
                      UniSpark Innovations HR Consultants L.L.C
                    </h3>
                    <p className="text-xs font-semibold text-[#1380c2] mt-1">
                      HR, Payroll, HRMS &amp; Staff Augmentation
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {[
                    'HR Consulting & Strategy',
                    'Payroll Management',
                    'HRMS Implementation',
                    'Staff Augmentation',
                    'Talent Acquisition',
                    'Workforce Planning'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-normal">
                      <span className="text-[#1380c2] mt-1 shrink-0">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100/60">
                <p className="text-[11px] text-gray-400 leading-normal mb-3 whitespace-normal italic">
                  You are being redirected to UniSpark Innovations HR Consultants L.L.C, a sister entity of UniSpark Security Systems &amp; Equipment Trading L.L.C.
                </p>
                <a
                  href="https://usihr.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1380c2] hover:text-[#0f6ba3] transition-colors duration-300 group/btn"
                >
                  <span>Visit Website</span>
                  <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Entity 3 */}
            <div className="group flex flex-col justify-between bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#1380c2]/30 transition-all duration-300">
              <div>
                <div className="flex items-start gap-3 border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1380c2]/10 text-[#1380c2] group-hover:bg-[#1380c2] group-hover:text-white transition-all duration-300 shrink-0">
                    <Network className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#1380c2] transition-colors duration-300">
                      Horizon Hive Technology L.L.C
                    </h3>
                    <p className="text-xs font-semibold text-[#1380c2] mt-1">
                      Lead Entity — IT, Cybersecurity &amp; Digital Transformation
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {[
                    'Advisory as a Service',
                    'Cybersecurity Services',
                    'Managed IT Services',
                    'Aviation IT Services',
                    'Video Analytics & AI Surveillance',
                    'Digital Employee Experience',
                    'Network Infrastructure & Security',
                    'End User Support',
                    'Unified Audio & Video Solutions'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-normal">
                      <span className="text-[#1380c2] mt-1 shrink-0">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100/60">
                <p className="text-[11px] text-gray-400 leading-normal mb-3 whitespace-normal italic">
                  You are being redirected to Horizon Hive Technology L.L.C, a sister entity of UniSpark Security Systems &amp; Equipment Trading L.L.C.
                </p>
                <a
                  href="https://www.horizonhivetechnology.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1380c2] hover:text-[#0f6ba3] transition-colors duration-300 group/btn"
                >
                  <span>Visit Website</span>
                  <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
