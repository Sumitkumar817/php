import React, { useState, useEffect } from 'react';
import { Handshake } from 'lucide-react';

const defaultPartners = [
  { name: 'Stripe', logoUrl: '/images/pt1.jpg' },
  { name: 'HashiCorp', logoUrl: '/images/pt2.jpg' },
  { name: 'Digital', logoUrl: '/images/pt3.jpg' },
  { name: 'Cloudflare', logoUrl: '/images/pt4.jpg' },
  { name: 'Airbnb', logoUrl: '/images/pt5.jpg' },
  { name: 'Slack', logoUrl: '/images/pt6.jpg' },
  { name: 'Intercom', logoUrl: '/images/pt7.jpg' },
  { name: 'GitHub', logoUrl: '/images/pt8.jpg' },
  { name: 'Figma', logoUrl: '/images/pt9.jpg' }
];

export default function PartnersSection() {
  const [partners, setPartners] = useState(defaultPartners);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');
        const res = await fetch(`${apiBase}/partners`);
        const data = await res.json();
        if (data.success && data.data && Array.isArray(data.data.partnersList) && data.data.partnersList.length > 0) {
          setPartners(data.data.partnersList);
        }
      } catch (e) {
        // fallback
      }
    };
    fetchPartners();
  }, []);

  const marqueeList = [...partners, ...partners];

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto p-5 py-2 px-5 md:px-6 lg:px-2">
        <div className="relative z-10">
          <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 text-xs font-semibold tracking-wide uppercase text-[#1380c2] bg-[#1380c2]/10 border border-[#1380c2]/20 rounded-full">
              <Handshake className="w-3.5 h-3.5" /> Global Alliance
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Powered by the World&#x27;s Leading <span className="bg-gradient-to-r from-[#1380c2] to-[#0c5683] bg-clip-text text-transparent">Security Brands</span>
            </h2>
          </div>
        </div>

        <div className="relative w-full overflow-hidden whitespace-nowrap bg-gray-50/50 py-6 border-y border-gray-100 flex">
          <style>{`
            @keyframes marquee-partner {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-partner-marquee {
              animation: marquee-partner 30s linear infinite;
            }
            .animate-partner-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="flex gap-8 items-center animate-partner-marquee min-w-full shrink-0">
            {marqueeList.map((pt, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center bg-white border border-gray-200/60 shadow-sm rounded-xl p-1 w-[180px] h-[100px] shrink-0 transition-all duration-300 hover:border-[#1380c2]/20 hover:shadow-md"
              >
                <img
                  src={pt.logoUrl || `/images/pt${(idx % 9) + 1}.jpg`}
                  alt={pt.name || 'Partner Logo'}
                  className="max-w-full max-h-full object-contain filter opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  onError={(e) => { e.target.src = `/images/pt${(idx % 9) + 1}.jpg`; }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
