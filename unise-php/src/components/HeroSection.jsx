import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection({ onOpenEnquiry }) {
  const words = ["Design.", "Supply.", "Installation.", "Maintenance."];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const trustItems = [
    { icon: "fa-id-card-clip", text: "Licensed & UAE-Compliant" },
    { icon: "fa-handshake", text: "Hikvision Authorised Partner" },
    { icon: "fa-certificate", text: "Dahua Partner" },
    { icon: "fa-star", text: "ZKTeco Partner" },
    { icon: "fa-award", text: "10+ Years Field Experience" },
    { icon: "fa-map-location-dot", text: "Dubai · Abu Dhabi · Sharjah" },
    { icon: "fa-building-shield", text: "B2B & B2G Specialists" },
  ];

  return (
    <div className="relative bg-[#021827] text-white overflow-hidden min-h-[85vh] flex flex-col justify-between">
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/images/hero.jpg"
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/images/hero.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#021827] via-[#021827]/80 to-transparent"></div>
      </div>

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 my-auto w-full">
        <div className="max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wide">
            <i className="fa-solid fa-circle-check text-cyan-300"></i>
            <span>Licensed & UAE-Compliant</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            UAE's Trusted Security Systems Partner <br />
            <span className="inline-block text-cyan-300 transition-all duration-500">
              {words[wordIndex]}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-light">
            Protecting businesses, assets, and people across Dubai, Abu Dhabi, Sharjah, and the UAE — with world-class physical security infrastructure, expert engineers, and zero-compromise service.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link
              to="/contact-us"
              className="px-8 py-3.5 rounded-xl bg-[#0073b7] hover:bg-[#005a96] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition"
            >
              Request a Free Site Survey
            </Link>

            <a
              href="tel:+971502885874"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm flex items-center justify-center gap-2 transition"
            >
              <i className="fa-solid fa-phone text-cyan-300"></i>
              <span>Call Us Now: +971 50 288 5874</span>
            </a>
          </div>
        </div>
      </div>

      {/* Trust Bar Marquee */}
      <div className="relative z-10 w-full bg-white text-slate-900 border-t border-slate-200 py-4 overflow-hidden">
        <div className="flex w-[200%] animate-[marquee_25s_linear_infinite] gap-8">
          {[...trustItems, ...trustItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800 whitespace-nowrap shrink-0 px-4">
              <i className={`fa-solid ${item.icon} text-[#0073b7] text-sm`}></i>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
