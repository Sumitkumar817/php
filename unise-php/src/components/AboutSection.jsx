import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Atom, Brain, Bolt, ShieldAlert } from 'lucide-react';

export default function AboutSection() {
  const [sec2Config, setSec2Config] = useState({
    title: 'Pioneering the Future of',
    gradientText: 'Secured Intelligence',
    heading: 'Next-Gen Architecture',
    description: 'UniSpark Innovation architectures orchestrate friction-free continuous analysis across critical enterprise vectors, neutralizing vulnerabilities before they cross your network perimeter.',
    card1: {
      title: 'Cognitive Shielding',
      description: 'Self-learning neural vectors adapt instantly to network threats.'
    },
    card2: {
      title: 'Microsecond Latency',
      description: 'Sub-atomic detection layers processing continuous data streams.'
    },
    ecosystemButton: {
      text: 'Our Ecosystem',
      link: '/solutions'
    },
    imageUrl: '/images/about-vision.jpg',
    imageBadge: {
      title: '99.99% Threat Isolation',
      subtitle: 'Continuous Live Matrix'
    }
  });

  const loadSection2FromBackend = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');
      const res = await fetch(`${apiBase}/section2`);
      const data = await res.json();
      if (data.success && data.data) {
        setSec2Config((prev) => ({
          ...prev,
          title: data.data.title || prev.title,
          heading: data.data.heading || prev.heading,
          description: data.data.description || prev.description,
          card1: {
            title: data.data.card1?.title || prev.card1.title,
            description: data.data.card1?.description || prev.card1.description
          },
          card2: {
            title: data.data.card2?.title || prev.card2.title,
            description: data.data.card2?.description || prev.card2.description
          },
          ecosystemButton: {
            text: data.data.ecosystemButton?.text || prev.ecosystemButton.text,
            link: data.data.ecosystemButton?.link || prev.ecosystemButton.link
          },
          imageUrl: data.data.imageUrl || prev.imageUrl
        }));
      }
    } catch (err) {
      console.warn('unise-php AboutSection: Error fetching section2 config:', err);
    }
  };

  useEffect(() => {
    loadSection2FromBackend();
    const handleFocus = () => loadSection2FromBackend();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadSection2FromBackend, 5000);
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-16">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#1380c2]/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#1380c2]/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto p-5 py-4 px-5 md:px-6 lg:px-2">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 text-left">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase text-[#1380c2] bg-[#1380c2]/10 border border-[#1380c2]/20 rounded-full">
                <Atom className="w-3.5 h-3.5 animate-spin-slow" />
                {sec2Config.heading}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Pioneering the Future of <br/>
              <span className="bg-gradient-to-r from-[#1380c2] to-[#0c5683] bg-clip-text text-transparent">
                Secured Intelligence
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed max-w-xl">
              {sec2Config.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3 bg-gray-50/80 p-4 rounded-xl border border-gray-100 shadow-sm hover:border-[#1380c2]/20 transition-all duration-300">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#1380c2]/10 text-[#1380c2]">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-900 mb-1">{sec2Config.card1.title}</h5>
                  <p className="text-xs text-gray-500 leading-normal">{sec2Config.card1.description}</p>
                </div>
              </div>

              <div className="flex gap-3 bg-gray-50/80 p-4 rounded-xl border border-gray-100 shadow-sm hover:border-[#1380c2]/20 transition-all duration-300">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#1380c2]/10 text-[#1380c2]">
                  <Bolt className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-900 mb-1">{sec2Config.card2.title}</h5>
                  <p className="text-xs text-gray-500 leading-normal">{sec2Config.card2.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <Link
                to={sec2Config.ecosystemButton.link || '/solutions'}
                className="inline-flex justify-center items-center px-6 py-3 text-sm font-semibold text-white bg-[#1380c2] hover:bg-[#0f6ba3] rounded-lg transition-all duration-300 shadow-md shadow-[#1380c2]/10 text-center"
              >
                {sec2Config.ecosystemButton.text}
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 p-4 md:p-8 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none mx-auto lg:mx-8">
              <div className="absolute top-[-10px] left-[-10px] w-6 h-6 border-t-2 border-l-2 border-[#1380c2]/60 rounded-tl-sm pointer-events-none"></div>
              <div className="absolute bottom-[-10px] right-[-10px] w-6 h-6 border-b-2 border-r-2 border-[#1380c2]/60 rounded-br-sm pointer-events-none"></div>
              <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-xl z-10 group">
                <img
                  src={sec2Config.imageUrl || '/images/about-vision.jpg'}
                  alt="Futuristic Network Analytics Grid"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.src = '/images/about-vision.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 sm:-left-6 bg-white border border-gray-100 p-3 rounded-xl shadow-lg flex items-center gap-3 z-20 animate-bounce-slow min-w-[220px]">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex-shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-900">{sec2Config.imageBadge.title}</span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">{sec2Config.imageBadge.subtitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
