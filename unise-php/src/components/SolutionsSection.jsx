import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Video, 
  IdCard, 
  Bell, 
  Flame, 
  Fingerprint, 
  MonitorSmartphone, 
  ArrowRight 
} from 'lucide-react';

const iconMap = {
  'cctv-and-ip-camera-systems': Video,
  'access-control-systems': IdCard,
  'intruder-alarm-and-detection-systems': Bell,
  'fire-alarm-and-detection-systems': Flame,
  'biometric-and-smart-security-systems': Fingerprint,
  'system-integration-and-control-room-setup': MonitorSmartphone
};

const defaultServices = [
  {
    id: "cctv-and-ip-camera-systems",
    title: "CCTV & IP Camera Systems",
    desc: "HD surveillance, remote monitoring, and smart analytics for complete site visibility."
  },
  {
    id: "access-control-systems",
    title: "Access Control Systems",
    desc: "Card, biometric, and multi-factor access control for every door, gate, and perimeter."
  },
  {
    id: "intruder-alarm-and-detection-systems",
    title: "Intruder Alarm & Detection",
    desc: "Motion, vibration, and perimeter detection systems connected to central monitoring."
  },
  {
    id: "fire-alarm-and-detection-systems",
    title: "Fire Alarm & Detection",
    desc: "UAE Civil Defence-compliant fire detection and alarm systems for all building types."
  },
  {
    id: "biometric-and-smart-security-systems",
    title: "Biometric & Smart Security",
    desc: "Fingerprint, face recognition, and iris scan systems integrated with HR and payroll."
  },
  {
    id: "system-integration-and-control-room-setup",
    title: "System Integration & Control Room Setup",
    desc: "Unified security management platforms, SOC design, and video walls."
  }
];

export default function SolutionsSection() {
  const [sec3Config, setSec3Config] = useState({
    badgeText: 'WHAT WE DO',
    mainHeading: 'End-to-End',
    gradientHeading: 'Physical Security Solutions',
    description: 'From initial site survey and system design through to professional installation, commissioning, and long-term maintenance — UniSpark delivers complete security infrastructure for every environment.',
    viewAllButton: {
      text: 'View All Services',
      link: '/solutions'
    },
    services: defaultServices
  });

  const loadSection3FromBackend = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');
      const res = await fetch(`${apiBase}/section3`);
      const data = await res.json();
      if (data.success && data.data) {
        setSec3Config((prev) => ({
          ...prev,
          badgeText: data.data.badgeText || prev.badgeText,
          description: data.data.description || prev.description,
          viewAllButton: {
            text: data.data.viewAllButton?.text || prev.viewAllButton.text,
            link: data.data.viewAllButton?.link || prev.viewAllButton.link
          },
          services: Array.isArray(data.data.services) && data.data.services.length > 0
            ? data.data.services
            : prev.services
        }));
      }
    } catch (err) {
      console.warn('unise-php SolutionsSection: Error fetching section3 config:', err);
    }
  };

  useEffect(() => {
    loadSection3FromBackend();
    const handleFocus = () => loadSection3FromBackend();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadSection3FromBackend, 5000);
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#f1f5f9] py-12 md:py-16">
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#1380c2]/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
      
      <div className="max-w-[1200px] mx-auto p-5 py-2 px-5 md:px-6 lg:px-2">
        <div className="relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 text-xs font-semibold tracking-wide uppercase text-[#1380c2] bg-[#1380c2]/10 border border-[#1380c2]/20 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> {sec3Config.badgeText}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              End-to-End <span className="bg-gradient-to-r from-[#1380c2] to-[#0c5683] bg-clip-text text-transparent">Physical Security Solutions</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed max-w-2xl">
              {sec3Config.description}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sec3Config.services.map((item) => {
              const IconComp = iconMap[item.id] || Video;
              return (
                <Link
                  key={item.id}
                  to={`/solutions/${item.id}`}
                  className="group flex flex-col justify-between bg-white p-5 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#1380c2]/30 transition-all duration-300 min-h-[160px]"
                >
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1380c2]/10 text-[#1380c2] mb-4 group-hover:bg-[#1380c2] group-hover:text-white transition-all duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h5 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#1380c2] transition-colors duration-300">
                      {item.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Button */}
          <div className="flex justify-center mt-10">
            <Link
              to={sec3Config.viewAllButton.link || '/solutions'}
              className="inline-flex justify-center items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1380c2] hover:bg-[#0f6ba3] rounded-lg transition-all duration-300 shadow-md shadow-[#1380c2]/10 group text-center"
            >
              <span>{sec3Config.viewAllButton.text}</span>
              <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
