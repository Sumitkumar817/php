import React from 'react';
import { MapPin, Building2, Network, FileText } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: MapPin,
      title: "UAE-Wide",
      subtitle: "SERVICE COVERAGE",
      caption: "Dubai • Abu Dhabi • Sharjah & Beyond"
    },
    {
      icon: Building2,
      title: "6 Industries",
      subtitle: "SECTORS SERVED",
      caption: "Aviation to Healthcare"
    },
    {
      icon: Network,
      title: "9 Categories",
      subtitle: "SERVICE RANGE",
      caption: "CCTV to System Integration"
    },
    {
      icon: FileText,
      title: "AMC/PMC",
      subtitle: "OPERATIONAL READY",
      caption: "Annual & Preventive Contracts Available"
    }
  ];

  return (
    <section className="relative py-16 bg-[#0073b7] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white text-slate-900 shadow-xl border border-white/20 hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0073b7] flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0073b7] mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-bold text-slate-800 tracking-wide uppercase mb-1">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-500">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
