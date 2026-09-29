import React, { useState, useEffect } from 'react';
import { 
  IdCard, 
  Handshake, 
  ShieldCheck, 
  Star, 
  Award, 
  MapPin, 
  Building 
} from 'lucide-react';

const defaultTrustItems = [
  { text: 'Licensed & UAE-Compliant', icon: IdCard },
  { text: 'Hikvision Authorised Partner', icon: Handshake },
  { text: 'Dahua Partner', icon: ShieldCheck },
  { text: 'ZKTeco Partner', icon: Star },
  { text: '10+ Years Field Experience', icon: Award },
  { text: 'Dubai · Abu Dhabi · Sharjah', icon: MapPin },
  { text: 'B2B & B2G Specialists', icon: Building },
];

export default function MarqueeSection() {
  const [speed, setSpeed] = useState(30);

  const getApiBase = () => {
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return 'http://localhost:5000/api';
    }
    return import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');
  };

  useEffect(() => {
    const fetchSpeed = async () => {
      try {
        const res = await fetch(`${getApiBase()}/marquee`);
        const data = await res.json();
        if (data.success && data.data && data.data.speed) {
          setSpeed(Number(data.data.speed) || 30);
        }
      } catch (e) {
        // fallback default 30s
      }
    };
    fetchSpeed();
  }, []);

  // Double list for infinite loop
  const displayItems = [...defaultTrustItems, ...defaultTrustItems, ...defaultTrustItems];

  return (
    <section className="w-full bg-gray-50 border-y border-gray-200 overflow-hidden">
      <div className="max-w-[1200px] mx-auto p-5 py-5 px-5">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-track {
            display: flex;
            width: max-content;
            animation: marquee ${speed}s linear infinite;
          }
          .animate-marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="w-full relative py-2 overflow-hidden">
          <div className="animate-marquee-track gap-8 md:gap-12">
            {displayItems.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm min-w-max transition-all duration-300 hover:border-[#1380c2]/30 hover:shadow-md"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1380c2]/10 text-[#1380c2]">
                    <IconComp className="w-[18px] h-[18px]" strokeWidth={2.2} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 tracking-wide whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
