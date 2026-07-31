import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building, ArrowLeft, CheckCircle, ShieldAlert, ShieldCheck } from 'lucide-react';
import { industriesData } from '../data/industriesData';
import CtaSection from '../components/CtaSection';

export default function IndustryDetailPage({ onOpenEnquiry }) {
  const { slug } = useParams();
  const industry = industriesData.find((ind) => ind.id === slug) || industriesData[0];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Banner */}
      <section className="relative py-20 bg-slate-900 border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <Link to="/industries" className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> Back to All Industry Sectors
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
              <i className={`fa-solid ${industry.icon} text-lg`}></i>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sector Framework</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            {industry.title} Security Solutions
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            {industry.description}
          </p>
        </div>
      </section>

      {/* Detail Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* Key Industry Challenges */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-amber-400" /> Key Sector Security Challenges
              </h3>
              <div className="space-y-4">
                {industry.keyChallenges.map((challenge, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0">
                      !
                    </span>
                    <span className="text-sm text-slate-300">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Tailored Security Solutions */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-cyan-400" /> Tailored Security Solutions Implemented
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {industry.solutionsProvided.map((sol, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-200">{sol}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-lg font-bold text-white">Need Sector-Specific Advice?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Consult with our specialized sector engineers for SIRA-compliant blueprints and site assessments.
              </p>
              <button
                onClick={() => onOpenEnquiry(`Consultation for ${industry.title}`)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs tracking-wider uppercase transition shadow-glow"
              >
                Request Sector Assessment
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400">Other Industry Sectors</h4>
              <div className="space-y-2">
                {industriesData.filter((i) => i.id !== industry.id).map((item) => (
                  <Link
                    key={item.id}
                    to={`/industries/${item.id}`}
                    className="block p-3 rounded-xl hover:bg-slate-800 transition text-xs font-medium text-slate-300 hover:text-white"
                  >
                    • {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <CtaSection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
}
