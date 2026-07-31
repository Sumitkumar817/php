import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="relative py-20 bg-[#f1f5f9] text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0073b7] text-xs font-bold uppercase tracking-wider">
              <i className="fa-solid fa-atom text-xs animate-spin-slow"></i>
              <span>Next-Gen Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Pioneering the Future of <br />
              <span className="text-[#0073b7]">Secured Intelligence</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              UniSpark Innovation architectures orchestrate friction-free continuous analysis across critical enterprise vectors, neutralizing vulnerabilities before they cross your network perimeter.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-brain text-sm"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Cognitive Shielding</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Self-learning neural vectors adapt instantly to network threats.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-bolt text-sm"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Microsecond Latency</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sub-atomic detection layers processing continuous data streams.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/solutions"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#0073b7] hover:bg-[#005a96] text-white font-bold text-sm shadow-md transition"
              >
                <span>Our Ecosystem</span>
              </Link>
            </div>
          </div>

          {/* Right Image Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
              <img
                src="/images/about-vision.jpg"
                alt="Futuristic Network Analytics Grid"
                className="w-full h-auto rounded-2xl object-cover"
              />
              {/* Floating Tech Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 flex items-center gap-4 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-shield-halved text-base"></i>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">99.99% Threat Isolation</div>
                  <div className="text-xs text-slate-500">Continuous Live Matrix</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
