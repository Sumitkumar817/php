import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { solutionsData } from '../data/solutionsData';
import {
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  ListCheck,
  Camera,
  HardDrive,
  Network,
  MonitorSmartphone,
  Sliders,
  Thermometer,
  Cloud,
  Wrench,
  Plane,
  Building2,
  Building,
  Droplet,
  Hotel,
  Activity,
  ShoppingCart,
  Lock,
  IdCard,
  Users,
  Link2,
  UserCheck,
  Clock,
  Shield,
  ShieldCheck,
  Compass,
  DoorClosed,
  Wifi,
  BellRing,
  Store,
  Phone,
  Cpu
} from 'lucide-react';

export default function SolutionDetailPage({ onOpenEnquiry }) {
  const { t } = useTranslation();
  const { slug } = useParams();

  // Primary static solution data directly from solutionsData
  const staticFallback =
    solutionsData.find(
      (s) =>
        s.id === slug ||
        (slug === 'maintenance-contracts' && s.id.startsWith('maintenance-contracts'))
    ) || solutionsData[0];

  const [backendService, setBackendService] = useState(null);

  const loadServiceFromBackend = async () => {
    try {
      const apiBase =
        import.meta.env.VITE_API_BASE_URL ||
        (typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.hostname.startsWith('192.168.'))
          ? 'http://localhost:5000/api'
          : 'https://unispark-backend-api.onrender.com/api');
      const res = await fetch(`${apiBase}/section3`);
      const data = await res.json();
      if (data.success && data.data && Array.isArray(data.data.services)) {
        const found = data.data.services.find(
          (s) =>
            s.id === slug ||
            (slug === 'maintenance-contracts' && s.id.startsWith('maintenance-contracts'))
        );
        if (found) {
          setBackendService(found);
        }
      }
    } catch (err) {
      console.warn('Error loading solution detail from backend:', err);
    }
  };

  useEffect(() => {
    loadServiceFromBackend();
    const handleFocus = () => loadServiceFromBackend();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadServiceFromBackend, 10000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [slug]);

  // Helper: use backend array only if populated properly, otherwise retain full static array
  const pickArray = (backendArr, fallbackArr) => {
    if (Array.isArray(backendArr) && backendArr.length >= (fallbackArr?.length || 1)) {
      return backendArr;
    }
    return fallbackArr || [];
  };

  // Helper: ensure scopeOfWork never accidentally contains whyChooseUs items
  const cleanScope = (scopeList, whyList) => {
    if (!Array.isArray(scopeList)) return [];
    if (!Array.isArray(whyList) || whyList.length === 0) return scopeList;
    const whyTitles = new Set(
      whyList.map((w) => (w.title || '').replace(/&amp;/g, '&').trim().toLowerCase())
    );
    return scopeList.filter(
      (item) => !whyTitles.has((item.title || '').replace(/&amp;/g, '&').trim().toLowerCase())
    );
  };

  // Combine backend CMS data with static fallback
  const solution = {
    ...staticFallback,
    pageTitle: staticFallback.pageTitle || staticFallback.title,
    breadcrumbTitle: staticFallback.breadcrumbTitle || staticFallback.shortTitle || staticFallback.title,
    bannerTagline: backendService?.bannerTagline || staticFallback.bannerTagline || 'Professional Installation · Commissioning · Long-Term Maintenance  |  UAE-Wide Coverage',
    bannerBgImage: (backendService?.bannerBgImage && backendService.bannerBgImage.trim() !== '') ? backendService.bannerBgImage : (staticFallback.bannerBgImage || '/images/cctv-bg.jpg'),
    heroCtaText: backendService?.heroCtaText || staticFallback.heroCtaText || `Request a ${staticFallback.shortTitle || staticFallback.title} Site Survey`,
    heroCtaLink: backendService?.heroCtaLink || staticFallback.heroCtaLink || '/contact-us',
    overviewBadge: backendService?.overviewBadge || staticFallback.overviewBadge || 'SECTOR OVERVIEW',
    overviewHeading: backendService?.overviewHeading || staticFallback.overviewHeading || `COMPLETE ${staticFallback.title}`,
    description: backendService?.description || backendService?.desc || staticFallback.description,
    secImage: (backendService?.secImage && backendService.secImage.trim() !== '') ? backendService.secImage : (staticFallback.secImage || '/images/cctv-sec.jpg'),
    scopeBadge: backendService?.scopeBadge || staticFallback.scopeBadge || 'Scope of Work',
    scopeHeading: backendService?.scopeHeading || staticFallback.scopeHeading || "WHAT'S INCLUDED IN OUR SERVICE",
    scopeOfWork: cleanScope(
      pickArray(backendService?.scopeOfWork, staticFallback.scopeOfWork),
      pickArray(backendService?.whyChooseUs, staticFallback.whyChooseUs)
    ),
    brandsHeading: backendService?.brandsHeading || staticFallback.brandsHeading || 'KEY BRANDS & <span class="bg-clip-text text-transparent" style="background-image:linear-gradient(to right, #0a6eab, #1d4ed8)"> TECHNOLOGY</span>',
    brands: pickArray(backendService?.brands, staticFallback.brands),
    sectorsBadge: backendService?.sectorsBadge || staticFallback.sectorsBadge || 'Targeted Sectors',
    sectorsHeading: backendService?.sectorsHeading || staticFallback.sectorsHeading,
    sectorsBg: staticFallback.sectorsBg || 'py-10 bg-[#F1F5F9]',
    sectorsDesc: backendService?.sectorsDesc || staticFallback.sectorsDesc,
    targetSectors: pickArray(backendService?.targetSectors, staticFallback.targetSectors),
    whyBadge: backendService?.whyBadge || staticFallback.whyBadge || 'Compliance & Expertise',
    whyHeading: backendService?.whyHeading || staticFallback.whyHeading || `WHY UNISPARK FOR <span class="bg-clip-text text-transparent uppercase" style="background-image:linear-gradient(to right, #0a6eab, #1d4ed8)">${staticFallback.shortTitle || staticFallback.title}</span>`,
    whyChooseUs: pickArray(backendService?.whyChooseUs, staticFallback.whyChooseUs),
    ctaHeading: backendService?.ctaHeading || staticFallback.ctaHeading || 'Ready to Discuss Your <span class="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Maintenance Contracts — AMC & PMC Requirements?</span>',
    ctaDesc: backendService?.ctaDesc || staticFallback.ctaDesc || 'Our engineers are available for site surveys across Dubai, Abu Dhabi, Sharjah, and all UAE locations.',
    ctaBtn1Text: backendService?.ctaBtn1Text || staticFallback.ctaBtn1Text || 'Request an AMC/PMC Quotation',
    ctaBtn1Link: backendService?.ctaBtn1Link || staticFallback.ctaBtn1Link || '/contact-us',
    ctaBtn2Text: backendService?.ctaBtn2Text || staticFallback.ctaBtn2Text || 'Call Our Team',
    ctaBtn2Link: backendService?.ctaBtn2Link || staticFallback.ctaBtn2Link || 'tel:+971-4-1234567'
  };

  // Helper to render scope of work icons matching the live site SVG/Lucide
  const renderScopeIcon = (iconName, title) => {
    const str = `${iconName || ''} ${title || ''}`.toLowerCase();
    if (str.includes('design') || str.includes('survey')) {
      return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-5 h-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M20.97 7.27a.996.996 0 0 0 0-1.41l-2.83-2.83a.996.996 0 0 0-1.41 0l-4.49 4.49-3.89-3.89c-.78-.78-2.05-.78-2.83 0l-1.9 1.9c-.78.78-.78 2.05 0 2.83l3.89 3.89L3 16.76V21h4.24l4.52-4.52 3.89 3.89c.95.95 2.23.6 2.83 0l1.9-1.9c.78-.78.78-2.05 0-2.83l-3.89-3.89zM5.04 6.94l1.89-1.9L8.2 6.31 7.02 7.5l1.41 1.41 1.19-1.19 1.2 1.2-1.9 1.9zm11.23 7.44-1.19 1.19 1.41 1.41 1.19-1.19 1.27 1.27-1.9 1.9-3.89-3.89 1.9-1.9zM6.41 19H5v-1.41l9.61-9.61 1.3 1.3.11.11zm9.61-12.44 1.41-1.41 1.41 1.41-1.41 1.41z"></path>
        </svg>
      );
    }
    if (str.includes('camera') || str.includes('video')) return <Camera className="w-5 h-5" />;
    if (str.includes('hard-drive') || str.includes('storage') || str.includes('dvr') || str.includes('nvr')) return <HardDrive className="w-5 h-5" />;
    if (str.includes('network') || str.includes('infrastructure') || str.includes('cable')) return <Network className="w-5 h-5" />;
    if (str.includes('monitor') || str.includes('remote')) return <MonitorSmartphone className="w-5 h-5" />;
    if (str.includes('ptz') || str.includes('programming')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M5 3v16h16"></path><path d="m5 19 6-6"></path><path d="m2 6 3-3 3 3"></path><path d="m18 16 3 3-3 3"></path>
        </svg>
      );
    }
    if (str.includes('thermo')) return <Thermometer className="w-5 h-5" />;
    if (str.includes('cloud')) return <Cloud className="w-5 h-5" />;
    if (str.includes('wrench') || str.includes('lifecycle') || str.includes('care') || str.includes('maintenance')) return <Wrench className="w-5 h-5" />;
    if (str.includes('id-card') || str.includes('reader')) return <IdCard className="w-5 h-5" />;
    if (str.includes('lock')) return <Lock className="w-5 h-5" />;
    if (str.includes('slider') || str.includes('controller') || str.includes('panel')) return <Sliders className="w-5 h-5" />;
    if (str.includes('user-check') || str.includes('visitor')) return <UserCheck className="w-5 h-5" />;
    if (str.includes('users') || str.includes('administration')) return <Users className="w-5 h-5" />;
    if (str.includes('link') || str.includes('integration')) return <Link2 className="w-5 h-5" />;
    if (str.includes('clock') || str.includes('tracking') || str.includes('attendance')) return <Clock className="w-5 h-5" />;
    if (str.includes('door') || str.includes('contact')) return <DoorClosed className="w-5 h-5" />;
    if (str.includes('bell') || str.includes('audible') || str.includes('alarm')) return <BellRing className="w-5 h-5" />;
    if (str.includes('wifi') || str.includes('cms')) return <Wifi className="w-5 h-5" />;
    if (str.includes('shield-check') || str.includes('wireless')) return <ShieldCheck className="w-5 h-5" />;
    if (str.includes('shield') || str.includes('barrier') || str.includes('glass')) return <Shield className="w-5 h-5" />;
    if (str.includes('activity') || str.includes('motion')) return <Activity className="w-5 h-5" />;
    if (str.includes('compass') || str.includes('perimeter')) return <Compass className="w-5 h-5" />;
    return <ShieldAlert className="w-5 h-5" />;
  };

  // Helper to render targeted sectors icons
  const renderSectorIcon = (iconName, title) => {
    const str = `${iconName || ''} ${title || ''}`.toLowerCase();
    if (str.includes('plane') || str.includes('aviation')) return <Plane className="w-5 h-5" />;
    if (str.includes('estate') || str.includes('building')) return <Building2 className="w-5 h-5" />;
    if (str.includes('oil') || str.includes('gas') || str.includes('fuel') || str.includes('droplet')) return <Droplet className="w-5 h-5" />;
    if (str.includes('hotel') || str.includes('hospitality')) return <Hotel className="w-5 h-5" />;
    if (str.includes('health') || str.includes('care') || str.includes('hospital')) return <Activity className="w-5 h-5" />;
    if (str.includes('commercial') || str.includes('store')) return <Store className="w-5 h-5" />;
    if (str.includes('consumer') || str.includes('shopping') || str.includes('cart')) return <ShoppingCart className="w-5 h-5" />;
    return <Building className="w-5 h-5" />;
  };

  // Helper to render why choose us icons
  const renderWhyIcon = (iconName, title) => {
    const str = `${iconName || ''} ${title || ''}`.toLowerCase();
    if (str.includes('camera') || str.includes('thermal') || str.includes('hd')) return <Camera className="w-5 h-5" />;
    if (str.includes('compliance') || str.includes('sira') || str.includes('building') || str.includes('standards')) return <Building2 className="w-5 h-5" />;
    if (str.includes('cpu') || str.includes('analytics') || str.includes('ai')) return <Cpu className="w-5 h-5" />;
    if (str.includes('lock') || str.includes('auth')) return <Lock className="w-5 h-5" />;
    if (str.includes('bell') || str.includes('alert')) return <BellRing className="w-5 h-5" />;
    if (str.includes('shield-check') || str.includes('management')) return <ShieldCheck className="w-5 h-5" />;
    if (str.includes('shield-alert') || str.includes('perimeter') || str.includes('defense')) return <ShieldAlert className="w-5 h-5" />;
    if (str.includes('activity') || str.includes('monitor') || str.includes('execution') || str.includes('service') || str.includes('centralized')) return <Activity className="w-5 h-5" />;
    return <ShieldAlert className="w-5 h-5" />;
  };

  return (
    <div className="w-full text-slate-900 bg-white font-sans">
      
      {/* 1. Header Banner */}
      <section
        className="relative bg-gray-900/70 text-white py-12 lg:py-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${solution.bannerBgImage})` }}
      >
        <div className="max-w-[1200px] mx-auto p-5 py-1 px-0 md:px-2 lg:px-0">
          <div className="absolute inset-0 bg-gray-950/50 backdrop-blur-[1px]"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-10">
                <nav aria-label="breadcrumb" className="mb-6 bg-white rounded-full px-4 py-2 inline-block shadow-sm">
                  <ol className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500">
                    <li className="flex items-center gap-2">
                      <Link className="hover:text-gray-900 transition-colors" to="/">
                        Home
                      </Link>
                      <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                    </li>
                    <li className="flex items-center gap-2">
                      <Link className="hover:text-gray-900 transition-colors" to="/solutions">
                        Solutions
                      </Link>
                      <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                    </li>
                    <li className="text-gray-800 font-medium" aria-current="page">
                      {solution.breadcrumbTitle}
                    </li>
                  </ol>
                </nav>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
                  {solution.pageTitle}
                </h1>

                <p className="mt-3 text-sm md:text-base text-gray-200 font-medium max-w-4xl">
                  {solution.bannerTagline}
                </p>

                <div className="mt-6">
                  {solution.heroCtaLink?.startsWith('http') ? (
                    <a
                      className="group inline-flex items-center gap-2 bg-[#0a6eab] hover:bg-[#0a5d8c] text-white font-semibold text-sm px-5 py-2.5 rounded shadow transition-all duration-200"
                      href={solution.heroCtaLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{solution.heroCtaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <Link
                      className="group inline-flex items-center gap-2 bg-[#0a6eab] hover:bg-[#0a5d8c] text-white font-semibold text-sm px-5 py-2.5 rounded shadow transition-all duration-200"
                      to={solution.heroCtaLink}
                    >
                      <span>{solution.heroCtaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview Section */}
      <section className="relative py-12 bg-white">
        <div className="max-w-[1200px] mx-auto p-5 py-2 px-5 md:px-6 lg:px-2">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#0a6eab] bg-blue-50 border border-blue-100 mb-3 uppercase">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{solution.overviewBadge}</span>
                </span>

                <h2
                  className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-3"
                  dangerouslySetInnerHTML={{ __html: solution.overviewHeading }}
                />

                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                  {solution.description}
                </p>
              </div>

              <div className="lg:px-4">
                <div className="relative p-2 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#0a6eab] rounded-tl-xl -mt-px -ml-px"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#0a6eab] rounded-br-xl -mb-px -mr-px"></div>
                  <div className="overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] lg:aspect-auto">
                    <img
                      src={solution.secImage}
                      alt={solution.title}
                      className="w-full h-full object-cover min-h-[300px] lg:min-h-[390px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Scope of Work Section */}
      {solution.scopeOfWork && solution.scopeOfWork.length > 0 && (
        <section className="relative py-12 bg-gray-50">
          <div className="max-w-[1200px] mx-auto p-5 p-5">
            <div className="text-center mb-10">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-opacity-10 mb-3 uppercase"
                style={{ color: '#0a6eab', backgroundColor: '#0a6eab1a' }}
              >
                <ListCheck className="w-3.5 h-3.5" />
                <span>{solution.scopeBadge}</span>
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
                WHAT'S INCLUDED IN{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(to right, #0a6eab, #1d4ed8)' }}
                >
                  OUR SERVICE
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {solution.scopeOfWork.map((scope, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-start p-5 bg-white rounded-xl shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow duration-200"
                >
                  <div
                    className="w-11 h-11 mb-3.5 flex items-center justify-center rounded-full shrink-0"
                    style={{ color: '#0a6eab', backgroundColor: '#0a6eab1a' }}
                  >
                    {renderScopeIcon(scope.icon, scope.title)}
                  </div>
                  <h4 className="text-sm font-bold tracking-wide text-gray-900 uppercase mb-2">
                    {scope.title}
                  </h4>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed m-0">
                    {scope.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Key Brands & Technology Section */}
      {solution.brands && solution.brands.length > 0 && (
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto p-5 p-5">
            <div className="text-center mb-8">
              <h2
                className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900"
                dangerouslySetInnerHTML={{ __html: solution.brandsHeading }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {solution.brands.map((brand, idx) => (
                <div
                  key={idx}
                  className="w-[calc(50%-8px)] sm:w-36 md:w-64 h-[130px] p-4 flex items-center justify-center border border-gray-200/80 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 shrink-0"
                >
                  <img
                    src={brand.src || brand.logoUrl}
                    alt={brand.alt || brand.name || 'Brand Partner'}
                    className="max-h-[65px] md:max-h-[75px] max-w-[85%] w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Targeted Sectors Section */}
      {solution.targetSectors && solution.targetSectors.length > 0 && (
        <section className={`group-structure-section relative overflow-hidden ${solution.sectorsBg || 'py-10 bg-[#F1F5F9]'}`}>
          <div className="max-w-[1200px] mx-auto p-5 p-5">
            <div className="text-center mb-10 flex flex-col items-center">
              <span className="cyber-badge bg-blue-100 text-slate-900 border border-white rounded-full p-1 px-4 mb-3 inline-flex items-center gap-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 text-slate-800"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M475.115 163.781L336 252.309v-68.28c0-18.916-20.931-30.399-36.885-20.248L160 252.309V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56v400c0 13.255 10.745 24 24 24h464c13.255 0 24-10.745 24-24V184.029c0-18.917-20.931-30.399-36.885-20.248z"></path>
                </svg>
                <span>{solution.sectorsBadge}</span>
              </span>

              {solution.sectorsHeading && (
                <h2
                  className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-3"
                  dangerouslySetInnerHTML={{ __html: solution.sectorsHeading }}
                />
              )}

              {solution.sectorsDesc && (
                <p className="text-slate-500 text-sm md:text-base mx-auto mt-4 max-w-[800px] leading-relaxed">
                  {solution.sectorsDesc}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center text-left">
              {solution.targetSectors.map((sector, idx) => (
                <div key={idx} className="col">
                  <div className="group-card glance-card h-full p-5 bg-white rounded-xl shadow-sm border-0 relative overflow-hidden flex flex-col items-start transition-all duration-200 hover:shadow-md">
                    <div className="flex items-center gap-4 mb-3 width-full">
                      <div
                        className="glance-icon-box shrink-0 flex items-center justify-center rounded-lg text-slate-800 bg-slate-900/10"
                        style={{ width: '50px', height: '50px' }}
                      >
                        {renderSectorIcon(sector.icon, sector.title)}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 m-0 tracking-wide">
                        {sector.title}
                      </h3>
                    </div>
                    <p className="text-slate-500 leading-relaxed m-0 text-[13px]">
                      {sector.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Why UniSpark For This Service */}
      {solution.whyChooseUs && solution.whyChooseUs.length > 0 && (
        <section className="relative py-12 bg-gray-50 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto p-5 p-5">
            <div className="text-center mb-10">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-opacity-10 mb-3 uppercase"
                style={{ color: '#0a6eab', backgroundColor: '#0a6eab1a' }}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{solution.whyBadge || 'Compliance & Expertise'}</span>
              </span>
              <h2
                className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900"
                dangerouslySetInnerHTML={{ __html: solution.whyHeading }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
              {solution.whyChooseUs.map((w, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-start p-5 bg-white rounded-xl shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow duration-200"
                >
                  <div
                    className="w-11 h-11 mb-3.5 flex items-center justify-center rounded-full shrink-0"
                    style={{ color: '#0a6eab', backgroundColor: '#0a6eab1a' }}
                  >
                    {renderWhyIcon(w.icon, w.title)}
                  </div>
                  <h4 className="text-sm font-bold tracking-wide text-gray-900 uppercase mb-2">
                    {w.title}
                  </h4>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed m-0">
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Final CTA Section */}
      <section className="relative w-full overflow-hidden bg-slate-950 py-12 md:py-14">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
          style={{ backgroundImage: 'url(/images/home-cta.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/90 to-slate-950/95 pointer-events-none z-10"></div>
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-10"></div>
        <div className="max-w-[1200px] mx-auto p-5 py-2 px-2 relative z-20">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl md:text-5xl font-semibold font-black text-white tracking-tight leading-tight uppercase"
              dangerouslySetInnerHTML={{
                __html: solution.ctaHeading.startsWith('Ready to Discuss')
                  ? solution.ctaHeading
                  : `Ready to Discuss Your <span class="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">${solution.ctaHeading}</span>`
              }}
            />

            <p className="text-xs sm:text-sm text-slate-300 font-light mt-3 mb-6 max-w-xl leading-relaxed">
              {solution.ctaDesc}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-lg shadow-cyan-900/20 transition-all duration-150 border border-cyan-500/30 uppercase tracking-wider"
                to={solution.ctaBtn1Link || '/contact-us'}
              >
                <span>{solution.ctaBtn1Text || 'Request an AMC/PMC Quotation'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
              </Link>
              <a
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-lg transition-all duration-150 uppercase tracking-wider backdrop-blur-sm"
                href={solution.ctaBtn2Link || 'tel:+971-4-1234567'}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{solution.ctaBtn2Text || 'Call Our Team'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
