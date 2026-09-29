import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ShieldAlert, Truck, Cpu, ArrowRight } from 'lucide-react';

export default function DivisionsSection({ onOpenEnquiry }) {
  const [sec4Config, setSec4Config] = useState({
    title: 'Our Two Divisions',
    headingPrefix: 'One Partner.',
    headingGradient: 'Two Specialist Divisions.',
    cards: [
      {
        id: 'div-1',
        title: 'Installation & Maintenance',
        description: 'Professional design, supply, installation, commissioning, and AMC/PMC services across all physical security systems. SLA-governed, UAE-wide coverage.',
        buttonText: 'Explore Installation Services',
        buttonLink: '/solutions'
      },
      {
        id: 'div-2',
        title: 'Security Equipment Trading',
        description: 'Supply of globally-recognised security hardware — cameras, recorders, access control, alarm panels, biometric devices, cabling — with UAE stock for fast delivery.',
        buttonText: 'Request a Survey',
        buttonLink: '/contact-us'
      }
    ]
  });

  const loadSection4FromBackend = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');
      const res = await fetch(`${apiBase}/section4`);
      const data = await res.json();
      if (data.success && data.data) {
        setSec4Config((prev) => ({
          ...prev,
          title: data.data.title || prev.title,
          cards: Array.isArray(data.data.cards) && data.data.cards.length > 0 ? data.data.cards : prev.cards
        }));
      }
    } catch (err) {
      console.warn('unise-php DivisionsSection: Error fetching section4 config:', err);
    }
  };

  useEffect(() => {
    loadSection4FromBackend();
    const handleFocus = () => loadSection4FromBackend();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadSection4FromBackend, 5000);
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-16 sm:px-10">
      <div className="max-w-[1200px] mx-auto p-5 py-2 px-2 px-5 md:px-6 lg:px-2">
        <div className="relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 text-xs font-semibold tracking-wide uppercase text-[#1380c2] bg-[#1380c2]/10 border border-[#1380c2]/20 rounded-full">
              <Wrench className="w-3.5 h-3.5" /> {sec4Config.title}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              One Partner. <br />
              <span className="bg-gradient-to-r from-[#1380c2] to-[#0c5683] bg-clip-text text-transparent">
                Two Specialist Divisions.
              </span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            
            {/* Division 1 */}
            <div className="group flex flex-col justify-between bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#1380c2]/30 transition-all duration-300 min-h-[220px]">
              <div>
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#1380c2]/10 text-[#1380c2] mb-4 group-hover:bg-[#1380c2] group-hover:text-white transition-all duration-300">
                  <Wrench className="w-[22px] h-[22px] absolute group-hover:opacity-0 transition-opacity duration-300" />
                  <ShieldAlert className="w-[22px] h-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1380c2] transition-colors duration-300">
                  {sec4Config.cards[0]?.title || 'Installation & Maintenance'}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {sec4Config.cards[0]?.description || 'Professional design, supply, installation, commissioning, and AMC/PMC services across all physical security systems. SLA-governed, UAE-wide coverage.'}
                </p>
              </div>
              <div className="mt-5">
                <Link
                  to={sec4Config.cards[0]?.buttonLink || '/solutions'}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1380c2] hover:text-[#0f6ba3] transition-colors duration-300 group/btn"
                >
                  <span>{sec4Config.cards[0]?.buttonText || 'Explore Installation Services'}</span>
                  <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Division 2 */}
            <div className="group flex flex-col justify-between bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#1380c2]/30 transition-all duration-300 min-h-[220px]">
              <div>
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#1380c2]/10 text-[#1380c2] mb-4 group-hover:bg-[#1380c2] group-hover:text-white transition-all duration-300">
                  <Truck className="w-[22px] h-[22px] absolute group-hover:opacity-0 transition-opacity duration-300" />
                  <Cpu className="w-[22px] h-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1380c2] transition-colors duration-300">
                  {sec4Config.cards[1]?.title || 'Security Equipment Trading'}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {sec4Config.cards[1]?.description || 'Supply of globally-recognised security hardware — cameras, recorders, access control, alarm panels, biometric devices, cabling — with UAE stock for fast delivery.'}
                </p>
              </div>
              <div className="mt-5">
                <Link
                  to={sec4Config.cards[1]?.buttonLink || '/contact-us'}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1380c2] hover:text-[#0f6ba3] transition-colors duration-300 group/btn"
                >
                  <span>{sec4Config.cards[1]?.buttonText || 'Request a Survey'}</span>
                  <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
