import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HeroSection({ onOpenEnquiry }) {
  const { t, i18n } = useTranslation();
  
  // Hero settings state synced live with Backend (Admin -> MongoDB Atlas)
  const [heroConfig, setHeroConfig] = useState({
    title: 'Licensed & UAE-Compliant',
    heading: "UAE's Trusted Security Systems Partner",
    words: ["Design.", "Supply.", "Installation.", "Maintenance."],
    description: 'Proactive threat detection, cloud defense, and managed SOC solutions compliant with UAE & Global Security Standards.',
    button1: { text: 'Request a Free Site Survey', link: '/contact-us' },
    button2: { text: 'Call Us Now: +971 50 288 5874', link: 'tel:+971502885874' },
    videoUrl: ''
  });

  const [wordIndex, setWordIndex] = useState(0);

  // Fetch Hero Configuration from Backend API
  const loadHeroConfigFromBackend = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');
      const res = await fetch(`${apiBase}/hero`);
      const data = await res.json();
      if (data.success && data.data) {
        setHeroConfig({
          title: data.data.title || 'Licensed & UAE-Compliant',
          heading: data.data.heading || "UAE's Trusted Security Systems Partner",
          words: Array.isArray(data.data.words) && data.data.words.length > 0 ? data.data.words : ["Design.", "Supply.", "Installation.", "Maintenance."],
          description: data.data.description || 'Proactive threat detection, cloud defense, and managed SOC solutions compliant with UAE & Global Security Standards.',
          button1: {
            text: data.data.button1?.text || 'Request a Free Site Survey',
            link: data.data.button1?.link || '/contact-us'
          },
          button2: {
            text: data.data.button2?.text || 'Call Us Now: +971 50 288 5874',
            link: data.data.button2?.link || 'tel:+971502885874'
          },
          videoUrl: data.data.videoUrl || ''
        });
      }
    } catch (err) {
      console.warn('unise-php Hero: Error fetching hero config from backend:', err);
    }
  };

  useEffect(() => {
    loadHeroConfigFromBackend();

    const handleFocus = () => loadHeroConfigFromBackend();
    window.addEventListener('focus', handleFocus);

    const interval = setInterval(() => {
      loadHeroConfigFromBackend();
    }, 5000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  // Word rotating animation interval
  useEffect(() => {
    if (!heroConfig.words || heroConfig.words.length === 0) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroConfig.words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [heroConfig.words]);

  const currentWord = heroConfig.words[wordIndex % heroConfig.words.length] || "Design.";

  return (
    <section dir="ltr" className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-black py-3 md:py-5">
      {/* Container width matching usisecuritysystem.com */}
      <div className="max-w-[1200px] mx-auto p-5 py-2 px-0 w-full">
        {/* Video Background Layer */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            key={heroConfig.videoUrl || 'default-hero-video'}
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero.jpg"
            className="w-full h-full object-cover"
          >
            {heroConfig.videoUrl ? (
              <source src={heroConfig.videoUrl} />
            ) : (
              <source src="/images/hero.webm" type="video/webm" />
            )}
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-[1]"></div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-start">
            <div className="w-full lg:w-5/6 text-start">
              
              {/* Badge */}
              <div className="animate__animated animate__fadeInDown">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs md:text-sm font-medium tracking-wide uppercase text-[#0a6eab] bg-white border border-emerald-500/30 rounded-full">
                  <i className="fa-solid fa-circle-check text-emerald-400"></i>
                  {heroConfig.title}
                </span>
              </div>

              {/* Title & Rotating Words */}
              <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold text-white leading-tight tracking-tight mb-4 animate__animated animate__fadeInLeft animate__delay-1s">
                {heroConfig.heading}{" "}
                <span className="relative inline-block text-[#0a6eab] min-w-[220px] sm:min-w-[320px] md:min-w-[420px] h-[1.2em] overflow-hidden align-bottom">
                  <span className="absolute start-0 bottom-0 transition-all duration-700 ease-in-out transform origin-start opacity-100 scale-100 translate-y-0 visible">
                    {currentWord}
                  </span>
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mb-8 md:mb-10 leading-relaxed animate__animated animate__fadeInLeft animate__delay-2s">
                {heroConfig.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate__animated animate__fadeInUp animate__delay-3s flex-wrap">
                {heroConfig.button1.link.startsWith('/') ? (
                  <Link
                    to={heroConfig.button1.link}
                    className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#0a6eab] hover:bg-[#085888] border border-[#0a6eab] rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/20 text-center group"
                  >
                    <span>{heroConfig.button1.text}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <a
                    href={heroConfig.button1.link}
                    className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#0a6eab] hover:bg-[#085888] border border-[#0a6eab] rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/20 text-center group"
                  >
                    <span>{heroConfig.button1.text}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                )}

                <a
                  href={heroConfig.button2.link}
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-transparent hover:bg-white/10 border-2 border-white/80 rounded-lg transition-all duration-300 text-center"
                >
                  <i className="fa-solid fa-phone mr-1"></i>
                  <span>{heroConfig.button2.text}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
