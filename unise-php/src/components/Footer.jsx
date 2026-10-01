import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Link2, 
  Camera, 
  KeyRound, 
  Siren, 
  Video, 
  ShieldCheck, 
  Flame, 
  Fingerprint, 
  Network, 
  Wrench,
  Plane,
  Building2,
  Fuel,
  Building,
  HeartPulse,
  Home,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

export default function Footer() {
  const [footerConfig, setFooterConfig] = useState({
    email: 'sales@unisparkinnovation.com',
    emailLabel: 'Sales',
    phone: '+971 50 288 5874',
    phoneLabel: 'Call',
    officeLocation: 'Empire Heights A- 16F-A-04, Office 4-C-42, Business Bay, Dubai, United Arab Emirates',
    serviceAreasLabel: 'Service Areas:',
    serviceAreas: 'Dubai | Abu Dhabi | Sharjah | UAE Nationwide',
    whatsappNumber: '971502885874',
    copyrightText: 'UniSpark Innovation Security Systems. All rights reserved.'
  });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');
        const res = await fetch(`${apiBase}/footer`);
        const data = await res.json();
        if (data.success && data.data) {
          setFooterConfig(prev => ({
            ...prev,
            email: data.data.email || prev.email,
            emailLabel: data.data.emailLabel || prev.emailLabel,
            phone: data.data.phone || prev.phone,
            phoneLabel: data.data.phoneLabel || prev.phoneLabel,
            officeLocation: (data.data.officeLocation && data.data.officeLocation.includes('Business Bay')) ? data.data.officeLocation : (prev.officeLocation || data.data.officeLocation),
            serviceAreasLabel: data.data.serviceAreasLabel || prev.serviceAreasLabel,
            serviceAreas: data.data.serviceAreas || prev.serviceAreas,
            whatsappNumber: data.data.whatsappNumber || prev.whatsappNumber,
            copyrightText: data.data.copyrightText || prev.copyrightText
          }));
        }
      } catch (e) {
        // fallback
      }
    };
    fetchFooter();
  }, []);

  const whatsappUrl = `https://wa.me/${footerConfig.whatsappNumber || '971502885874'}`;

  return (
    <footer className="relative overflow-hidden bg-[#014B78] text-slate-100 py-10 font-sans">
      {/* Floating Chat Support & WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
        <div 
          onClick={() => window.open(whatsappUrl, '_blank')}
          className="w-16 md:w-24 cursor-pointer rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 drop-shadow-md m-auto"
        >
          <img 
            alt="Chat Support" 
            src="/images/chat-support.png" 
            className="w-full h-auto" 
          />
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex items-center gap-2 font-semibold text-[0.85rem] text-white px-[20px] py-[10px] rounded-[15px] border border-white/50 shadow-[0px_4px_10px_rgba(0,0,0,0.15)] drop-shadow-[2px_3px_0px_rgba(0,0,0,0.44)] bg-gradient-to-r from-[#00b008] to-[#006719] transition duration-300 active:scale-95 hover:scale-[1.02]"
        >
          <i className="fa-brands fa-whatsapp text-lg"></i>
          <span>Chat With Us</span>
        </a>
      </div>

      <div className="max-w-[1200px] mx-auto p-5 py-0 px-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start pb-10 border-b border-white/10">
            
            {/* Col 1: Brand Info */}
            <div className="col-span-12 lg:col-span-4 pr-0 lg:pr-8">
              <div className="flex flex-col">
                <Link to="/" className="inline-flex items-center gap-2 mb-4">
                  <img
                    src="/images/logo.png"
                    alt="UniSpark Innovation Logo"
                    className="max-w-[200px] brightness-0 invert"
                    onError={(e) => { e.target.src = '/images/logo.png'; }}
                  />
                </Link>

                <h6 className="text-white text-sm font-semibold mb-2">
                  UniSpark Innovation Security Systems &amp; Equipment Trading L.L.C
                </h6>

                <p className="text-[13px] leading-relaxed mb-4 opacity-85 text-white">
                  Next-generation enterprise protection and cyber-physical infrastructure logic designed for global digital business velocity.
                </p>

                <div className="mb-4">
                  <span className="bg-white text-slate-900 text-xs px-2 py-1 rounded-full inline-block mb-2 font-medium">
                    Group Companies:
                  </span>
                  <nav className="flex flex-col space-y-1.5 opacity-70 text-xs">
                    <a
                      href="https://horizonhivetechnology.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white hover:text-white inline-flex items-center transition-colors"
                    >
                      <Link2 className="w-3 h-3 me-1.5" /> Horizon Hive Technology L.L.C
                    </a>
                    <a
                      href="https://usihr.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white hover:text-white inline-flex items-center transition-colors"
                    >
                      <Link2 className="w-3 h-3 me-1.5" /> UniSpark Innovations HR Consultants L.L.C
                    </a>
                  </nav>
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.facebook.com/UnisparkInnovation/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900/30 hover:bg-[#0a6eab] text-white flex items-center justify-center transition-all"
                    aria-label="Facebook"
                  >
                    <i className="fa-brands fa-facebook-f text-sm"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/unispark_innovation/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900/30 hover:bg-[#0a6eab] text-white flex items-center justify-center transition-all"
                    aria-label="Instagram"
                  >
                    <i className="fa-brands fa-instagram text-sm"></i>
                  </a>
                  <a
                    href="https://x.com/unispark_inn"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900/30 hover:bg-[#0a6eab] text-white flex items-center justify-center transition-all"
                    aria-label="X-Twitter"
                  >
                    <i className="fa-brands fa-x-twitter text-sm"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/unispark-innovation/posts/?feedView=all"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900/30 hover:bg-[#0a6eab] text-white flex items-center justify-center transition-all"
                    aria-label="LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin-in text-sm"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Col 2: Solutions */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <h6 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-white/20 pb-2">
                Solutions
              </h6>
              <nav className="flex flex-col space-y-2 text-[13px]">
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/solutions/cctv-and-ip-camera-systems">
                  <Camera className="w-4 h-4 text-slate-400" />
                  <span>CCTV &amp; IP Camera Systems</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/solutions/access-control-systems">
                  <KeyRound className="w-4 h-4 text-slate-400" />
                  <span>Access Control Systems</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/solutions/intruder-alarm-and-detection-systems">
                  <Siren className="w-4 h-4 text-slate-400" />
                  <span>Intruder Alarm &amp; Detection</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/solutions/video-intercom-and-door-entry-systems">
                  <Video className="w-4 h-4 text-slate-400" />
                  <span>Video Intercom &amp; Door Entry</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/solutions/perimeter-security-and-fencing-systems">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span>Perimeter Security &amp; Fencing</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/solutions/fire-alarm-and-detection-systems">
                  <Flame className="w-4 h-4 text-slate-400" />
                  <span>Fire Alarm &amp; Detection Systems</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/solutions/biometric-and-smart-security-systems">
                  <Fingerprint className="w-4 h-4 text-slate-400" />
                  <span>Biometric &amp; Smart Security</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/solutions/system-integration-and-control-room-setup">
                  <Network className="w-4 h-4 text-slate-400" />
                  <span>System Integration &amp; Control Room</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/solutions/maintenance-contracts">
                  <Wrench className="w-4 h-4 text-slate-400" />
                  <span>Maintenance Contracts (AMC)</span>
                </Link>
              </nav>
            </div>

            {/* Col 3: Industries */}
            <div className="col-span-12 md:col-span-3 lg:col-span-3">
              <h6 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-white/20 pb-2">
                Industries
              </h6>
              <nav className="flex flex-col space-y-2 text-[13px]">
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/industries/aviation-security">
                  <Plane className="w-4 h-4 text-slate-400" />
                  <span>Aviation Security</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/industries/real-estate-security">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>Real Estate Security</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/industries/oil-and-gas-security">
                  <Fuel className="w-4 h-4 text-slate-400" />
                  <span>Oil &amp; Gas Security</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/industries/hospitality-security">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span>Hospitality Security</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/industries/healthcare-security">
                  <HeartPulse className="w-4 h-4 text-slate-400" />
                  <span>Healthcare Security</span>
                </Link>
                <Link className="flex items-center gap-2 text-slate-300 hover:text-white transition" to="/industries/consumer-security">
                  <Home className="w-4 h-4 text-slate-400" />
                  <span>Consumer Security</span>
                </Link>
              </nav>
            </div>

            {/* Col 4: Quick Links */}
            <div className="col-span-12 md:col-span-3 lg:col-span-2">
              <h6 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-white/20 pb-2">
                Quick Links
              </h6>
              <nav className="flex flex-col space-y-2 text-[13px]">
                <Link className="text-slate-300 hover:text-white transition flex items-center gap-1.5" to="/">
                  <span className="text-slate-400 font-normal">›</span> Home
                </Link>
                <Link className="text-slate-300 hover:text-white transition flex items-center gap-1.5" to="/about-us">
                  <span className="text-slate-400 font-normal">›</span> About Us
                </Link>
                <Link className="text-slate-300 hover:text-white transition flex items-center gap-1.5" to="/solutions">
                  <span className="text-slate-400 font-normal">›</span> Solutions
                </Link>
                <Link className="text-slate-300 hover:text-white transition flex items-center gap-1.5" to="/industries">
                  <span className="text-slate-400 font-normal">›</span> Industries
                </Link>
                <Link className="text-slate-300 hover:text-white transition flex items-center gap-1.5" to="/contact-us">
                  <span className="text-slate-400 font-normal">›</span> Contact Us
                </Link>
              </nav>
            </div>

          </div>

          {/* Contact Strip (Service Areas, Dubai Skyline & Address, Sales & Call) */}
          <div className="my-8 rounded-2xl bg-[#00385e]/80 border border-white/10 px-6 sm:px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-white shadow-sm">
            
            {/* Left: Service Areas */}
            <div className="flex-shrink-0 text-center lg:text-left">
              <span className="bg-white text-slate-900 text-xs px-3 py-1 rounded-full font-bold inline-block mb-2 shadow-sm">
                {footerConfig.serviceAreasLabel || 'Service Areas:'}
              </span>
              <div className="text-xs font-semibold text-white/90 leading-relaxed max-w-[240px]">
                {footerConfig.serviceAreas || 'Dubai | Abu Dhabi | Sharjah | UAE Nationwide'}
              </div>
            </div>

            {/* Center: Dubai Skyline & Office Location */}
            <div className="flex flex-col items-center text-center max-w-lg">
              <img
                src="/images/dubai.svg"
                alt="Dubai Skyline"
                className="h-10 w-auto mb-2 object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="flex items-center justify-center gap-1.5 text-xs text-white/90 font-medium">
                <i className="fa-solid fa-location-dot text-cyan-300 text-sm shrink-0"></i>
                <span>{footerConfig.officeLocation || 'Empire Heights A- 16F-A-04, Office 4-C-42, Business Bay, Dubai, United Arab Emirates'}</span>
              </div>
            </div>

            {/* Right: Sales & Call Direct Line */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-xs text-white">
              <div className="flex items-center gap-2.5">
                <i className="fa-regular fa-envelope text-lg text-cyan-300"></i>
                <div className="text-left">
                  <span className="text-[11px] text-slate-300 block">{footerConfig.emailLabel || 'Sales'}:</span>
                  <a href={`mailto:${footerConfig.email}`} className="font-semibold text-white hover:underline block leading-tight">
                    {footerConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <i className="fa-solid fa-phone text-lg text-cyan-300"></i>
                <div className="text-left">
                  <span className="text-[11px] text-slate-300 block">{footerConfig.phoneLabel || 'Call'}:</span>
                  <a href={`tel:${footerConfig.phone?.replace(/\s+/g, '')}`} className="font-semibold text-white hover:underline block leading-tight">
                    {footerConfig.phone}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 opacity-80 border-t border-white/10">
            <div>
              &copy; {new Date().getFullYear()} {footerConfig.copyrightText || 'UniSpark Innovation Security Systems. All rights reserved.'}
            </div>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="hover:text-white transition">Terms &amp; Conditions</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
