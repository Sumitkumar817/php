import React, { useState, useEffect } from 'react';

export default function PartnersSection() {
  const [partnerConfig, setPartnerConfig] = useState({
    badgeText: 'GLOBAL ALLIANCE',
    headingText: 'Powered by the World\'s Leading Security Brands',
    partnersList: [
      { name: 'Genetec', logoUrl: '/images/pt1.jpg', link: '' },
      { name: 'Hikvision', logoUrl: '/images/pt2.jpg', link: '' },
      { name: 'Dahua', logoUrl: '/images/pt3.jpg', link: '' },
      { name: 'Axis', logoUrl: '/images/pt4.jpg', link: '' },
      { name: 'Bosch', logoUrl: '/images/pt5.jpg', link: '' },
      { name: 'ZKTeco', logoUrl: '/images/pt6.jpg', link: '' },
      { name: 'HID', logoUrl: '/images/pt7.jpg', link: '' }
    ]
  });

  const loadPartnersFromBackend = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/partners');
      const data = await res.json();
      if (data.success && data.data) {
        setPartnerConfig({
          badgeText: data.data.badgeText || 'GLOBAL ALLIANCE',
          headingText: data.data.headingText || 'Powered by the World\'s Leading Security Brands',
          partnersList: Array.isArray(data.data.partnersList) && data.data.partnersList.length > 0 ? data.data.partnersList : partnerConfig.partnersList
        });
      }
    } catch (err) {
      console.warn('Error fetching partner config:', err);
    }
  };

  useEffect(() => {
    loadPartnersFromBackend();

    const handleFocus = () => loadPartnersFromBackend();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadPartnersFromBackend, 5000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative py-16 bg-white text-slate-900 overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0080c6] text-xs font-bold uppercase tracking-wider">
          <i className="fa-solid fa-handshake-angle text-xs"></i>
          <span>{partnerConfig.badgeText}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {partnerConfig.headingText.includes('Security Brands') ? (
            <>
              {partnerConfig.headingText.split('Security Brands')[0]}
              <span className="text-[#0080c6]">Security Brands</span>
              {partnerConfig.headingText.split('Security Brands')[1]}
            </>
          ) : (
            partnerConfig.headingText
          )}
        </h2>
      </div>

      {/* Partner Logo Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center justify-center">
          {partnerConfig.partnersList.map((partner, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300 flex items-center justify-center h-24 group"
            >
              {partner.link ? (
                <a href={partner.link} target="_blank" rel="noreferrer">
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-12 w-auto object-contain transition duration-300 group-hover:scale-105"
                  />
                </a>
              ) : (
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="max-h-12 w-auto object-contain transition duration-300 group-hover:scale-105"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
