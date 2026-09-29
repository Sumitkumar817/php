import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Mail, 
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
  Home
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const solutionsMenu = [
  {
    id: 'cctv-and-ip-camera-systems',
    title: 'CCTV & IP Camera Systems',
    icon: Camera
  },
  {
    id: 'access-control-systems',
    title: 'Access Control Systems',
    icon: KeyRound
  },
  {
    id: 'intruder-alarm-and-detection-systems',
    title: 'Intruder Alarm & Detection Systems',
    icon: Siren
  },
  {
    id: 'video-intercom-and-door-entry-systems',
    title: 'Video Intercom & Door Entry Systems',
    icon: Video
  },
  {
    id: 'perimeter-security-and-fencing-systems',
    title: 'Perimeter Security & Fencing Systems',
    icon: ShieldCheck
  },
  {
    id: 'fire-alarm-and-detection-systems',
    title: 'Fire Alarm & Detection Systems',
    icon: Flame
  },
  {
    id: 'biometric-and-smart-security-systems',
    title: 'Biometric & Smart Security Systems',
    icon: Fingerprint
  },
  {
    id: 'system-integration-and-control-room-setup',
    title: 'System Integration & Control Room Setup',
    icon: Network
  },
  {
    id: 'maintenance-contracts',
    title: 'Maintenance Contracts',
    icon: Wrench
  }
];

const industriesMenu = [
  {
    id: 'aviation-security',
    title: 'Aviation Security',
    icon: Plane
  },
  {
    id: 'real-estate-security',
    title: 'Real Estate Security',
    icon: Building2
  },
  {
    id: 'oil-and-gas-security',
    title: 'Oil & Gas Security',
    icon: Fuel
  },
  {
    id: 'hospitality-security',
    title: 'Hospitality Security',
    icon: Building
  },
  {
    id: 'healthcare-security',
    title: 'Healthcare Security',
    icon: HeartPulse
  },
  {
    id: 'consumer-security',
    title: 'Consumer Security',
    icon: Home
  }
];

export default function Header({ onOpenEnquiry }) {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
  
  // Header settings fetched live from Backend (Admin Panel -> MongoDB)
  const [headerConfig, setHeaderConfig] = useState({
    email: 'info@unisparkinnovation.com',
    socialLinks: {
      facebook: 'https://www.facebook.com/UnisparkInnovation/',
      instagram: 'https://www.instagram.com/unispark_innovation/',
      twitter: 'https://x.com/unispark_inn',
      linkedin: 'https://www.linkedin.com/company/unispark-innovation/posts/?feedView=all'
    },
    logoUrl: '/images/logo.png'
  });

  const location = useLocation();

  // Fetch header configuration from backend API (MongoDB Atlas)
  const loadBackendHeaderConfig = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');
      const res = await fetch(`${apiBase}/header`);
      const data = await res.json();
      if (data.success && data.data) {
        setHeaderConfig({
          email: data.data.email || 'info@unisparkinnovation.com',
          socialLinks: {
            facebook: data.data.socialLinks?.facebook ?? 'https://www.facebook.com/UnisparkInnovation/',
            instagram: data.data.socialLinks?.instagram ?? 'https://www.instagram.com/unispark_innovation/',
            twitter: data.data.socialLinks?.twitter ?? 'https://x.com/unispark_inn',
            linkedin: data.data.socialLinks?.linkedin ?? 'https://www.linkedin.com/company/unispark-innovation/posts/?feedView=all'
          },
          logoUrl: data.data.logoUrl || '/images/logo.png'
        });
      }
    } catch (err) {
      console.warn('unise-php Header: Error fetching header config from backend:', err);
    }
  };

  useEffect(() => {
    loadBackendHeaderConfig();

    const handleFocus = () => loadBackendHeaderConfig();
    window.addEventListener('focus', handleFocus);

    const interval = setInterval(() => {
      loadBackendHeaderConfig();
    }, 5000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
    setIndustriesDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar (exact usisecuritysystem.com classes) */}
      <div className="bg-[#0a6eab] text-white text-sm px-2">
        <div className="max-w-[1200px] mx-auto p-5 py-3">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
            <a 
              className="hidden md:flex items-center gap-2 hover:text-white transition" 
              href={`mailto:${headerConfig.email}`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{headerConfig.email}</span>
            </a>
            <div className="flex items-center gap-3">
              <span className="text-white text-xs sm:text-sm">Follow us:</span>
              <div className="flex items-center justify-center gap-4">
                {headerConfig.socialLinks.facebook && (
                  <a href={headerConfig.socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition text-white">
                    <i className="fa-brands fa-facebook-f text-sm"></i>
                  </a>
                )}
                {headerConfig.socialLinks.twitter && (
                  <a href={headerConfig.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition text-white">
                    <i className="fa-brands fa-x-twitter text-sm"></i>
                  </a>
                )}
                {headerConfig.socialLinks.linkedin && (
                  <a href={headerConfig.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition text-white">
                    <i className="fa-brands fa-linkedin-in text-sm"></i>
                  </a>
                )}
                {headerConfig.socialLinks.instagram && (
                  <a href={headerConfig.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition text-white">
                    <i className="fa-brands fa-instagram text-sm"></i>
                  </a>
                )}
              </div>
              <div className="border-l border-white/20 pl-3">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar (exact usisecuritysystem.com classes) */}
      <div className="max-w-[1200px] mx-auto p-5 p-2 py-3 px-3 lg:px-3">
        <nav className="">
          <div className="mx-auto">
            <div className="relative flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 shrink-0">
                <img
                  src={headerConfig.logoUrl || '/images/logo.png'}
                  alt="USI Security Logo"
                  width="210"
                  height="80"
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain"
                  onError={(e) => { e.target.src = '/images/logo.png'; }}
                />
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-8">
                <Link 
                  to="/" 
                  className={`font-medium transition ${
                    location.pathname === '/' ? 'text-[#1380c2]' : 'text-[#0f172a] hover:text-[#1380c2]'
                  }`}
                >
                  {t('nav.home')}
                </Link>

                <Link 
                  to="/about-us" 
                  className={`font-medium transition ${
                    location.pathname === '/about-us' ? 'text-[#1380c2]' : 'text-[#0f172a] hover:text-[#1380c2]'
                  }`}
                >
                  {t('nav.about')}
                </Link>

                {/* Solutions Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={() => setSolutionsDropdownOpen(true)}
                  onMouseLeave={() => setSolutionsDropdownOpen(false)}
                >
                  <Link 
                    to="/solutions"
                    className={`flex items-center gap-1 font-medium py-6 transition ${
                      solutionsDropdownOpen || location.pathname.startsWith('/solutions') 
                        ? 'text-[#1380c2]' 
                        : 'text-[#0f172a] hover:text-[#1380c2]'
                    }`}
                  >
                    <span>{t('nav.solutions')}</span>
                    <ChevronDown className={`w-4 h-4 transition duration-150 ${
                      solutionsDropdownOpen ? 'rotate-180 text-[#1380c2]' : ''
                    }`} />
                  </Link>

                  {/* Dropdown popup with exact width:min(56rem, 90vw) */}
                  <div 
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-0 transition-all duration-150 z-50 ${
                      solutionsDropdownOpen 
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                        : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                    }`}
                    style={{ width: 'min(56rem, 90vw)' }}
                  >
                    <div className="bg-white shadow-2xl border border-slate-100 rounded-xl px-6 py-6 grid grid-cols-3 gap-2">
                      {solutionsMenu.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.id}
                            to={`/solutions/${item.id}`}
                            className="flex items-center gap-3 p-3 rounded-lg transition group/item hover:bg-blue-50"
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors shrink-0 bg-slate-100 group-hover/item:bg-[#0a6eab]">
                              <IconComponent className="w-[18px] h-[18px] transition-colors text-slate-600 group-hover/item:text-white" />
                            </div>
                            <span className="text-sm font-medium transition-colors text-slate-800 group-hover/item:text-[#0a6eab]">
                              {item.title}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Industries Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={() => setIndustriesDropdownOpen(true)}
                  onMouseLeave={() => setIndustriesDropdownOpen(false)}
                >
                  <Link 
                    to="/industries"
                    className={`flex items-center gap-1 font-medium py-6 transition ${
                      industriesDropdownOpen || location.pathname.startsWith('/industries') 
                        ? 'text-[#1380c2]' 
                        : 'text-[#3d4551] hover:text-[#1380c2]'
                    }`}
                  >
                    <span>{t('nav.industries')}</span>
                    <ChevronDown className={`w-4 h-4 transition duration-150 ${
                      industriesDropdownOpen ? 'rotate-180 text-[#1380c2]' : ''
                    }`} />
                  </Link>

                  {/* Dropdown popup with exact width:min(40rem, 90vw) */}
                  <div 
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-0 transition-all duration-150 z-50 ${
                      industriesDropdownOpen 
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                        : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                    }`}
                    style={{ width: 'min(40rem, 90vw)' }}
                  >
                    <div className="bg-white shadow-2xl border border-slate-100 rounded-xl px-6 py-6 grid grid-cols-3 gap-2">
                      {industriesMenu.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.id}
                            to={`/industries/${item.id}`}
                            className="flex items-center gap-3 p-3 rounded-lg transition group/item hover:bg-blue-50"
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors shrink-0 bg-slate-100 group-hover/item:bg-[#0a6eab]">
                              <IconComponent className="w-[18px] h-[18px] transition-colors text-slate-600 group-hover/item:text-white" />
                            </div>
                            <span className="text-sm font-medium transition-colors text-slate-800 group-hover/item:text-[#0a6eab]">
                              {item.title}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Us button (exact usisecuritysystem.com) */}
              <Link 
                to="/contact-us"
                className="hidden lg:block bg-[#0a6eab] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#1380c2] transition shrink-0"
              >
                {t('nav.contact')}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-slate-900 p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-6 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`font-semibold py-2 border-b border-slate-50 ${location.pathname === '/' ? 'text-[#1380c2]' : 'text-slate-800'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>

            <Link
              to="/about-us"
              className={`font-semibold py-2 border-b border-slate-50 ${location.pathname === '/about-us' ? 'text-[#1380c2]' : 'text-slate-800'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>

            {/* Mobile Solutions */}
            <div>
              <div 
                className="flex items-center justify-between font-semibold py-2 text-slate-800 cursor-pointer"
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
              >
                <span>{t('nav.solutions')}</span>
                <ChevronDown className={`w-4 h-4 transition ${solutionsDropdownOpen ? 'rotate-180 text-[#1380c2]' : ''}`} />
              </div>
              {solutionsDropdownOpen && (
                <div className="pl-3 py-2 space-y-2.5 bg-slate-50 rounded-xl my-2">
                  {solutionsMenu.map((item) => (
                    <Link
                      key={item.id}
                      to={`/solutions/${item.id}`}
                      className="flex items-center gap-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-[#0a6eab]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-6 h-6 rounded bg-slate-200/80 flex items-center justify-center shrink-0">
                        <item.icon className="w-3.5 h-3.5 text-slate-600" />
                      </div>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Industries */}
            <div>
              <div 
                className="flex items-center justify-between font-semibold py-2 text-slate-800 cursor-pointer"
                onClick={() => setIndustriesDropdownOpen(!industriesDropdownOpen)}
              >
                <span>{t('nav.industries')}</span>
                <ChevronDown className={`w-4 h-4 transition ${industriesDropdownOpen ? 'rotate-180 text-[#1380c2]' : ''}`} />
              </div>
              {industriesDropdownOpen && (
                <div className="pl-3 py-2 space-y-2.5 bg-slate-50 rounded-xl my-2">
                  {industriesMenu.map((item) => (
                    <Link
                      key={item.id}
                      to={`/industries/${item.id}`}
                      className="flex items-center gap-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-[#0a6eab]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-6 h-6 rounded bg-slate-200/80 flex items-center justify-center shrink-0">
                        <item.icon className="w-3.5 h-3.5 text-slate-600" />
                      </div>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contact-us"
              className="w-full text-center py-3 rounded-lg bg-[#0a6eab] hover:bg-[#1380c2] text-white font-bold transition shadow-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
