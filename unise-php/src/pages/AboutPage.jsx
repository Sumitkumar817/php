import React from 'react';
import { ShieldCheck, Target, Eye, Building2, Wrench, Globe, CheckCircle2, Award } from 'lucide-react';
import OurGroupSection from '../components/OurGroupSection';
import CtaSection from '../components/CtaSection';

export default function AboutPage({ onOpenEnquiry }) {
  const companyGlance = [
    { title: "Registered Location", desc: "Dubai, United Arab Emirates", icon: Building2 },
    { title: "Business Core", desc: "Security Systems Trading, Installation & Maintenance", icon: Wrench },
    { title: "Geographic Coverage", desc: "Dubai, Abu Dhabi, Sharjah & All Northern Emirates", icon: Globe },
    { title: "Target Sectors", desc: "Commercial, Real Estate, Aviation, Oil & Gas, Healthcare", icon: Target },
    { title: "Key Partners", desc: "Hikvision, Dahua, ZKTeco, HID, Bosch, Honeywell", icon: Award },
    { title: "Compliance", desc: "UAE Civil Defence & SIRA Standard Operations", icon: ShieldCheck }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Banner */}
      <section className="relative py-20 bg-slate-900 border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>ABOUT UNISPARK SECURITY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            About <span className="text-gradient">UniSpark Security Systems</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            UniSpark Innovation Security Systems & Equipment Trading L.L.C is a Dubai-registered company specializing in end-to-end physical security solutions — from design and supply to professional installation, commissioning, and long-term AMC maintenance. We serve enterprises, real estate developers, aviation facilities, oil & gas installations, hospitality groups, healthcare institutions, and consumer properties across the UAE.
          </p>
        </div>
      </section>

      {/* Main Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-4">
                WHO WE <span className="text-gradient">ARE</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We are a physical security company built on technical credibility, regulatory compliance, and a deep understanding of the UAE market. Our engineers have hands-on experience across every system category we offer — CCTV, access control, intruder alarms, fire detection, biometrics, perimeter security, and integrated control room design.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">OUR MISSION</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To be the UAE's most reliable security systems partner — delivering design, supply, installation, and maintenance of world-class physical security infrastructure that protects assets and people with zero compromise.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">OUR VISION</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To become a leading UAE security brand — synonymous with technical excellence, rapid response, and uncompromising commitment to safety across every sector we serve.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-800 overflow-hidden bg-slate-900 p-2 shadow-2xl">
              <img
                src="/images/abt-sec.jpg"
                alt="UniSpark Technical Engineering Infrastructure"
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Glance */}
      <section className="py-16 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">QUICK OVERVIEW</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              COMPANY AT A <span className="text-gradient">GLANCE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyGlance.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold uppercase text-white tracking-wide">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <OurGroupSection />
      <CtaSection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
}
