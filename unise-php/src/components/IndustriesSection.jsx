import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight } from 'lucide-react';

const defaultIndustries = [
  {
    id: 'aviation-security',
    title: 'Aviation',
    subtitle: 'Airports, Airlines, MRO Facilities & Cargo Terminals',
    image: '/images/ind1.jpg'
  },
  {
    id: 'real-estate-security',
    title: 'Real Estate',
    subtitle: 'Commercial, Residential, Retail & Developers',
    image: '/images/ind2.jpg'
  },
  {
    id: 'oil-and-gas-security',
    title: 'Oil & Gas',
    subtitle: 'Upstream, Downstream, Refineries & Field Sites',
    image: '/images/ind3.jpg'
  },
  {
    id: 'hospitality-security',
    title: 'Hospitality',
    subtitle: 'Hotels, Resorts, F&B & Entertainment Venues',
    image: '/images/ind4.jpg'
  },
  {
    id: 'healthcare-security',
    title: 'Healthcare',
    subtitle: 'Hospitals, Clinics, Pharmacies & Labs',
    image: '/images/ind5.jpg'
  },
  {
    id: 'consumer-security',
    title: 'Consumer',
    subtitle: 'Villas, Compounds, Retail Outlets, SMEs & Warehouses',
    image: '/images/ind6.jpg'
  }
];

export default function IndustriesSection() {
  const [sec5Config, setSec5Config] = useState({
    title: 'INDUSTRIES WE SERVE',
    headingPrefix: 'Security Solutions Built for Your',
    headingGradient: 'Sector',
    description: 'Deploying custom, advanced cyber-security, monitoring, and automated safety matrices engineered for enterprise ecosystems.',
    cards: defaultIndustries
  });

  const loadSection5FromBackend = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');
      const res = await fetch(`${apiBase}/section5`);
      const data = await res.json();
      if (data.success && data.data) {
        setSec5Config((prev) => ({
          ...prev,
          title: data.data.title || prev.title,
          description: data.data.description || prev.description,
          cards: Array.isArray(data.data.cards) && data.data.cards.length > 0 ? data.data.cards : prev.cards
        }));
      }
    } catch (err) {
      console.warn('unise-php IndustriesSection: Error fetching section5 config:', err);
    }
  };

  useEffect(() => {
    loadSection5FromBackend();
    const handleFocus = () => loadSection5FromBackend();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadSection5FromBackend, 5000);
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#f1f5f9] py-12 md:py-16">
      <div className="absolute top-[10%] left-[-5%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-[#1380c2]/5 rounded-full blur-[70px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-[#1380c2]/5 rounded-full blur-[70px] pointer-events-none z-0"></div>
      
      <div className="max-w-[1200px] mx-auto p-5 py-2 px-5 md:px-6 lg:px-2">
        <div className="relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 text-xs font-semibold tracking-wide uppercase text-[#1380c2] bg-[#1380c2]/10 border border-[#1380c2]/20 rounded-full">
              <Layers className="w-[13px] h-[13px]" /> {sec5Config.title}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Security Solutions Built for Your <span className="bg-gradient-to-r from-[#1380c2] to-[#0c5683] bg-clip-text text-transparent">Sector</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed max-w-2xl">
              {sec5Config.description}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
            {sec5Config.cards.map((ind, index) => (
              <div
                key={ind.id || index}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm hover:shadow-md hover:border-[#1380c2]/30 transition-all duration-300"
              >
                <div>
                  <div className="relative overflow-hidden bg-gray-100 aspect-[4/3] w-full border-b border-gray-100">
                    <img
                      src={ind.image || `/images/ind${(index % 6) + 1}.jpg`}
                      alt={ind.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = `/images/ind${(index % 6) + 1}.jpg`; }}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-base font-bold text-gray-900 mb-1 group-hover:text-[#1380c2] transition-colors duration-300">
                      {ind.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-normal line-clamp-3">
                      {ind.subtitle}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 mt-auto">
                  <Link
                    to={`/industries/${ind.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1380c2] hover:text-[#0f6ba3] transition-colors duration-300 group/btn"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-[13px] h-[13px] transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
