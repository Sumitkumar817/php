import React from 'react';
import { Link } from 'react-router-dom';
import { industriesData } from '../data/industriesData';

export default function IndustriesSection() {
  return (
    <section className="relative py-20 bg-white text-slate-900 overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0073b7] text-xs font-bold uppercase tracking-wider">
            INDUSTRIES WE SERVE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Security Solutions Built for Your <span className="text-[#0073b7]">Sector</span>
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Deploying custom, advanced cyber-security, monitoring, and automated safety matrices engineered for enterprise ecosystems.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {industriesData.map((ind) => (
            <div
              key={ind.id}
              className="group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 overflow-hidden transition duration-300 flex flex-col justify-between"
            >
              <div className="relative h-36 overflow-hidden bg-slate-100">
                <img
                  src={ind.image}
                  alt={ind.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0073b7] transition">
                    {ind.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {ind.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    to={`/industries/${ind.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0073b7] hover:text-[#005a96] transition"
                  >
                    <span>Explore</span>
                    <i className="fa-solid fa-arrow-right text-[10px] transition-transform group-hover:translate-x-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
