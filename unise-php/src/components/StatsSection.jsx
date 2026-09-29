import React, { useState, useEffect } from 'react';
import { MapPin, Building2, Network, FileText } from 'lucide-react';

const defaultStats = [
  {
    title: "UAE-Wide",
    subtitle: "Service Coverage",
    caption: "Dubai · Abu Dhabi · Sharjah & Beyond",
    icon: MapPin,
    hasPing: true
  },
  {
    title: "6 Industries",
    subtitle: "Sectors Served",
    caption: "Aviation to Healthcare",
    icon: Building2,
    hasPing: false
  },
  {
    title: "9 Categories",
    subtitle: "Service Range",
    caption: "CCTV to System Integration",
    icon: Network,
    hasPing: false
  },
  {
    title: "AMC/PMC",
    subtitle: "Operational Ready",
    caption: "Annual & Preventive Contracts Available",
    icon: FileText,
    hasPing: false
  }
];

export default function StatsSection() {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');
        const res = await fetch(`${apiBase}/stats`);
        const data = await res.json();
        if (data.success && data.data && Array.isArray(data.data.statsList) && data.data.statsList.length > 0) {
          const icons = [MapPin, Building2, Network, FileText];
          setStats(data.data.statsList.map((item, idx) => ({
            title: item.title,
            subtitle: item.subtitle,
            caption: item.caption,
            icon: icons[idx % icons.length],
            hasPing: idx === 0
          })));
        }
      } catch (e) {
        // fallback
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#f1f5f9] py-12 md:py-16">
      <div className="absolute top-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#1380c2]/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[300px] h-[300px] bg-[#1380c2]/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
      
      <div className="max-w-[1200px] mx-auto p-5 py-2 px-5 md:px-6 lg:px-2">
        <div className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, idx) => {
              const IconComp = item.icon || MapPin;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#1380c2]/30 transition-all duration-300 min-h-[180px]"
                >
                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gray-300/40 group-hover:border-[#1380c2]/40 transition-colors"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gray-300/40 group-hover:border-[#1380c2]/40 transition-colors"></div>
                  
                  <div className="flex flex-col h-full justify-between">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#1380c2]/10 text-[#1380c2] mb-4 group-hover:bg-[#1380c2] group-hover:text-white transition-all duration-300 shrink-0">
                      <IconComp className="w-5 h-5" />
                      {item.hasPing && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                      )}
                    </div>
                    <div className="mt-auto">
                      <h3 className="text-xl font-black font-bold text-[#1380c2] tracking-tight mb-1 group-hover:text-[#1380c2] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-gray-700 tracking-wide uppercase mb-1">
                        {item.subtitle}
                      </p>
                      <p className="text-xs text-gray-400 font-medium leading-normal line-clamp-1">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
