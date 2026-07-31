import React from 'react';
import { Handshake } from 'lucide-react';

export default function PartnersSection() {
  const logos = [
    { src: "/images/pt1.jpg", alt: "Genetec" },
    { src: "/images/pt2.jpg", alt: "Hikvision" },
    { src: "/images/pt3.jpg", alt: "Dahua" },
    { src: "/images/pt4.jpg", alt: "Axis" },
    { src: "/images/pt5.jpg", alt: "Bosch" },
    { src: "/images/pt6.jpg", alt: "ZKTeco" },
    { src: "/images/pt7.jpg", alt: "HID" },
    { src: "/images/pt8.jpg", alt: "Security Brand" },
    { src: "/images/pt9.jpg", alt: "Security Brand" },
  ];

  return (
    <section className="relative py-16 bg-white text-slate-900 overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0080c6] text-xs font-bold uppercase tracking-wider">
          <i className="fa-solid fa-handshake-angle text-xs"></i>
          <span>GLOBAL ALLIANCE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Powered by the World's Leading <span className="text-[#0080c6]">Security Brands</span>
        </h2>
      </div>

      {/* Partner Logo Grid / Marquee */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center justify-center">
          {logos.slice(0, 7).map((partner, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300 flex items-center justify-center h-24 group"
            >
              <img
                src={partner.src}
                alt={partner.alt}
                className="max-h-12 w-auto object-contain transition duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
