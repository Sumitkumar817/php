import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Building2, Network, Handshake, ShieldAlert, ArrowRight } from 'lucide-react';

const iconMap = {
  0: Building2,
  1: Network,
  2: Handshake,
  3: ShieldAlert
};

const defaultCards = [
  {
    id: 'why-1',
    title: 'UAE Regulatory Compliance',
    desc: 'All systems designed and installed in accordance with UAE Civil Defence, NESA, and DESC standards.'
  },
  {
    id: 'why-2',
    title: 'Multi-Brand Expertise',
    desc: 'We are not tied to one manufacturer. We select the right technology from Hikvision, Dahua, Bosch, ZKTeco, HID, and more.'
  },
  {
    id: 'why-3',
    title: 'End-To-End Ownership',
    desc: 'From site survey and design to installation, commissioning, handover, and annual maintenance. One partner, full accountability.'
  },
  {
    id: 'why-4',
    title: 'Rapid Response SLA',
    desc: 'SLA-governed emergency response, remote health monitoring, and preventive maintenance across all contracted sites.'
  }
];

export default function WhyUsSection() {
  const [sec6Config, setSec6Config] = useState({
    title: 'WHY CHOOSE UNISPARK',
    headingPrefix: 'Technical Authority.',
    headingGradient: 'Trusted Delivery.',
    description: 'We combine regulatory expertise, multi-vendor technology integration, and lifecycle ownership to keep your critical assets protected.',
    button: {
      text: 'View All Services',
      link: '/solutions'
    },
    cards: defaultCards
  });

  const loadSection6FromBackend = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');
      const res = await fetch(`${apiBase}/section6`);
      const data = await res.json();
      if (data.success && data.data) {
        setSec6Config((prev) => ({
          ...prev,
          title: data.data.title || prev.title,
          description: data.data.description || prev.description,
          button: {
            text: data.data.button?.text || prev.button.text,
            link: data.data.button?.link || prev.button.link
          },
          cards: Array.isArray(data.data.cards) && data.data.cards.length > 0
            ? data.data.cards.map(c => ({
                id: c._id || c.id,
                title: c.title,
                desc: c.description || c.desc
              }))
            : prev.cards
        }));
      }
    } catch (err) {
      console.warn('unise-php WhyUsSection: Error fetching section6 config:', err);
    }
  };

  useEffect(() => {
    loadSection6FromBackend();
    const handleFocus = () => loadSection6FromBackend();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadSection6FromBackend, 5000);
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-16">
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#1380c2]/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
      
      <div className="max-w-[1200px] mx-auto p-5 py-2 px-5 md:px-6 lg:px-2">
        <div className="relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 text-xs font-semibold tracking-wide uppercase text-[#1380c2] bg-[#1380c2]/10 border border-[#1380c2]/20 rounded-full">
              <Award className="w-3.5 h-3.5" /> {sec6Config.title}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Technical Authority. <span className="bg-gradient-to-r from-[#1380c2] to-[#0c5683] bg-clip-text text-transparent">Trusted Delivery.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed max-w-2xl">
              {sec6Config.description}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sec6Config.cards.map((card, idx) => {
              const IconComp = iconMap[idx] || Building2;
              return (
                <div
                  key={card.id || idx}
                  className="group flex flex-col justify-between bg-white p-5 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#1380c2]/30 transition-all duration-300 min-h-[160px]"
                >
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1380c2]/10 text-[#1380c2] mb-4 group-hover:bg-[#1380c2] group-hover:text-white transition-all duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h5 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#1380c2] transition-colors duration-300">
                      {card.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Button */}
          <div className="flex justify-center mt-10">
            <Link
              to={sec6Config.button?.link || '/solutions'}
              className="inline-flex justify-center items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1380c2] hover:bg-[#0f6ba3] rounded-lg transition-all duration-300 shadow-md shadow-[#1380c2]/10 group text-center"
            >
              <span>{sec6Config.button?.text || 'View All Services'}</span>
              <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
