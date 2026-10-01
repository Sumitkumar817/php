import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { industriesData } from '../data/industriesData';
import {
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
  ListCheck,
  Video,
  Fingerprint,
  Radio,
  Flame,
  Network,
  Plane,
  PlaneTakeoff,
  Building2,
  Activity,
  MapPin,
  Phone,
  Bell,
  Wrench,
  Package,
  HeartPulse,
  Shield
} from 'lucide-react';

export default function IndustryDetailPage({ onOpenEnquiry }) {
  const { t } = useTranslation();
  const { slug } = useParams();

  // Primary static industry data directly from industriesData
  const staticFallback =
    industriesData.find((i) => i.id === slug || i.slug === slug) || industriesData[0];

  const [backendIndustry, setBackendIndustry] = useState(null);

  const loadIndustryFromBackend = async () => {
    try {
      const apiBase =
        import.meta.env.VITE_API_BASE_URL ||
        (typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.hostname.startsWith('192.168.'))
          ? 'http://localhost:5000/api'
          : 'https://unispark-backend-api.onrender.com/api');
      const res = await fetch(`${apiBase}/section5`);
      const data = await res.json();
      if (data.success && data.data && Array.isArray(data.data.cards)) {
        const found = data.data.cards.find(
          (c) => c.id === slug || c.slug === slug
        );
        if (found) {
          setBackendIndustry(found);
        }
      }
    } catch (err) {
      console.warn('Error loading industry detail from backend:', err);
    }
  };

  useEffect(() => {
    loadIndustryFromBackend();
    const handleFocus = () => loadIndustryFromBackend();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadIndustryFromBackend, 10000);

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

  // Combine backend CMS data with static fallback
  const industry = {
    ...staticFallback,
    pageTitle: backendIndustry?.pageTitle || staticFallback.pageTitle || staticFallback.title,
    breadcrumbTitle: staticFallback.breadcrumbTitle || staticFallback.title,
    bannerTagline: backendIndustry?.bannerTagline || staticFallback.bannerTagline,
    bannerBgImage:
      backendIndustry?.bannerBgImage && backendIndustry.bannerBgImage.trim() !== ''
        ? backendIndustry.bannerBgImage
        : staticFallback.bannerBgImage || '/images/aviation-bg.jpg',
    heroCtaText: backendIndustry?.heroCtaText || staticFallback.heroCtaText || 'Request an Aviation Security Assessment',
    heroCtaLink: backendIndustry?.heroCtaLink || staticFallback.heroCtaLink || '/contact-us',
    overviewBadge: backendIndustry?.overviewBadge || staticFallback.overviewBadge || 'SECTOR OVERVIEW',
    overviewHeading: backendIndustry?.overviewHeading || staticFallback.overviewHeading || `${staticFallback.title} STANDARDS`,
    description: backendIndustry?.description || staticFallback.description,
    challengesHeading: backendIndustry?.challengesHeading || staticFallback.challengesHeading || 'Sector Security Challenges:',
    challengesText: backendIndustry?.challengesText || staticFallback.challengesText,
    secImage:
      backendIndustry?.overviewImage && backendIndustry.overviewImage.trim() !== ''
        ? backendIndustry.overviewImage
        : staticFallback.secImage || '/images/aviation-sec.jpg',
    secImageAlt: staticFallback.secImageAlt || staticFallback.title,
    solutionsBadge: backendIndustry?.solutionsBadge || staticFallback.solutionsBadge || 'Ecosystem Deployment',
    solutionsHeading:
      backendIndustry?.solutionsHeading ||
      staticFallback.solutionsHeading ||
      'OUR SOLUTIONS FOR <span class="bg-clip-text text-transparent" style="background-image:linear-gradient(to right, #0a6eab, #1d4ed8)">THIS SECTOR</span>',
    solutionsProvided: pickArray(backendIndustry?.solutionsProvided, staticFallback.solutionsProvided),
    brandsHeading:
      backendIndustry?.brandsHeading ||
      staticFallback.brandsHeading ||
      'KEY BRANDS FOR <span class="bg-clip-text text-transparent" style="background-image:linear-gradient(to right, #0a6eab, #1d4ed8)">THIS SECTOR</span>',
    brandsSubheading: backendIndustry?.brandsSubheading || staticFallback.brandsSubheading,
    brands: pickArray(backendIndustry?.brands, staticFallback.brands),
    whyBadge: backendIndustry?.whyBadge || staticFallback.whyBadge || 'Compliance & Expertise',
    whyHeading:
      backendIndustry?.whyHeading ||
      staticFallback.whyHeading ||
      `WHY UNISPARK FOR <span class="bg-clip-text text-transparent uppercase" style="background-image:linear-gradient(to right, #0a6eab, #1d4ed8)">${staticFallback.title}</span>`,
    whyChooseUs: pickArray(backendIndustry?.whyChooseUs, staticFallback.whyChooseUs),
    ctaHeading: backendIndustry?.ctaHeading || staticFallback.ctaHeading,
    ctaDesc: backendIndustry?.ctaDesc || staticFallback.ctaDesc,
    ctaBtn1Text: backendIndustry?.ctaBtn1Text || staticFallback.ctaBtn1Text || 'Request a Sector Assessment',
    ctaBtn1Link: backendIndustry?.ctaBtn1Link || staticFallback.ctaBtn1Link || '/contact-us',
    ctaBtn2Text: backendIndustry?.ctaBtn2Text || staticFallback.ctaBtn2Text || 'Call Our Team',
    ctaBtn2Link: backendIndustry?.ctaBtn2Link || staticFallback.ctaBtn2Link || 'tel:+971502885874'
  };

  const renderSolutionIcon = (iconName, title = '') => {
    const str = `${iconName || ''} ${title}`.toLowerCase();
    if (str.includes('video') || str.includes('cctv') || str.includes('camera') || str.includes('surveillance')) {
      return <Video className="w-5 h-5" />;
    }
    if (str.includes('fingerprint') || str.includes('access') || str.includes('gate') || str.includes('door') || str.includes('lock') || str.includes('turnstile')) {
      return <Fingerprint className="w-5 h-5" />;
    }
    if (str.includes('radio') || str.includes('perimeter') || str.includes('intrusion') || str.includes('fence') || str.includes('beam') || str.includes('radar')) {
      return <Radio className="w-5 h-5" />;
    }
    if (str.includes('flame') || str.includes('fire') || str.includes('smoke')) {
      return <Flame className="w-5 h-5" />;
    }
    if (str.includes('network') || str.includes('soc') || str.includes('control') || str.includes('command') || str.includes('vms') || str.includes('server')) {
      return <Network className="w-5 h-5" />;
    }
    if (str.includes('vehicle') || str.includes('bollard') || str.includes('mitigation') || str.includes('parking') || str.includes('anpr')) {
      return <ShieldAlert className="w-5 h-5" />;
    }
    if (str.includes('bell') || str.includes('intercom') || str.includes('doorbell') || str.includes('alarm')) {
      return <Bell className="w-5 h-5" />;
    }
    if (str.includes('wrench') || str.includes('amc') || str.includes('maintenance') || str.includes('repair')) {
      return <Wrench className="w-5 h-5" />;
    }
    if (str.includes('package') || str.includes('bundle')) {
      return <Package className="w-5 h-5" />;
    }
    if (str.includes('heart') || str.includes('nurse') || str.includes('patient') || str.includes('hospital') || str.includes('medical')) {
      return <HeartPulse className="w-5 h-5" />;
    }
    return <Shield className="w-5 h-5" />;
  };

  const renderWhyIcon = (iconName, title = '') => {
    const str = `${iconName || ''} ${title}`.toLowerCase();
    if (str.includes('experience') || str.includes('sector') || str.includes('aviation') || str.includes('plane')) {
      return <PlaneTakeoff className="w-5 h-5" />;
    }
    if (str.includes('compliance') || str.includes('sira') || str.includes('standards') || str.includes('regulatory') || str.includes('civil') || str.includes('building')) {
      return <Building2 className="w-5 h-5" />;
    }
    if (str.includes('service') || str.includes('lifecycle') || str.includes('end-to-end') || str.includes('execution') || str.includes('activity')) {
      return <Activity className="w-5 h-5" />;
    }
    if (str.includes('response') || str.includes('fast') || str.includes('uae-wide') || str.includes('pin') || str.includes('location') || str.includes('map')) {
      return <MapPin className="w-5 h-5" />;
    }
    return <ShieldAlert className="w-5 h-5" />;
  };

  return (
    <div className="w-full text-slate-900 bg-white font-sans">
      {/* 1. Header Banner */}
      <section
        className="relative bg-gray-900/70 text-white py-12 lg:py-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${industry.bannerBgImage})` }}
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
                      <Link className="hover:text-gray-900 transition-colors" to="/industries">
                        Industries
                      </Link>
                      <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                    </li>
                    <li className="text-gray-800 font-medium" aria-current="page">
                      {industry.breadcrumbTitle}
                    </li>
                  </ol>
                </nav>

                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight"
                  dangerouslySetInnerHTML={{ __html: industry.pageTitle }}
                />

                <p
                  className="mt-3 text-sm md:text-base text-gray-200 font-medium max-w-4xl"
                  dangerouslySetInnerHTML={{ __html: industry.bannerTagline }}
                />

                <div className="mt-6">
                  {industry.heroCtaLink?.startsWith('http') ? (
                    <a
                      className="group inline-flex items-center gap-2 bg-[#0a6eab] hover:bg-[#0a5d8c] text-white font-semibold text-sm px-5 py-2.5 rounded shadow transition-all duration-200"
                      href={industry.heroCtaLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{industry.heroCtaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <Link
                      className="group inline-flex items-center gap-2 bg-[#0a6eab] hover:bg-[#0a5d8c] text-white font-semibold text-sm px-5 py-2.5 rounded shadow transition-all duration-200"
                      to={industry.heroCtaLink || '/contact-us'}
                    >
                      <span>{industry.heroCtaText}</span>
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
                  <span>{industry.overviewBadge || 'SECTOR OVERVIEW'}</span>
                </span>
                <h2
                  className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-3"
                  dangerouslySetInnerHTML={{ __html: industry.overviewHeading }}
                />
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                  {industry.description}
                </p>
                {industry.challengesText && (
                  <div className="bg-gray-100/80 border border-gray-200/60 rounded-xl p-4">
                    <h5 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-1.5">
                      <TriangleAlert className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{industry.challengesHeading || 'Sector Security Challenges:'}</span>
                    </h5>
                    <p className="text-gray-500 text-xs md:text-sm leading-normal m-0">
                      {industry.challengesText}
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:px-4">
                <div className="relative p-2 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#0a6eab] rounded-tl-xl -mt-px -ml-px"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#0a6eab] rounded-br-xl -mb-px -mr-px"></div>
                  <div className="overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] lg:aspect-auto">
                    <img
                      src={industry.secImage}
                      alt={industry.secImageAlt || industry.title}
                      className="w-full h-full object-cover min-h-[280px] lg:min-h-[340px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solutions For This Sector Section */}
      {industry.solutionsProvided && industry.solutionsProvided.length > 0 && (
        <section className="relative py-12 bg-gray-50">
          <div className="max-w-[1200px] mx-auto p-5 p-5">
            <div className="text-center mb-10">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-opacity-10 mb-3 uppercase"
                style={{ color: '#0a6eab', backgroundColor: '#0a6eab1a' }}
              >
                <ListCheck className="w-3.5 h-3.5" />
                <span>{industry.solutionsBadge || 'Ecosystem Deployment'}</span>
              </span>
              <h2
                className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900"
                dangerouslySetInnerHTML={{ __html: industry.solutionsHeading }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {industry.solutionsProvided.map((sol, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-start p-5 bg-white rounded-xl shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow duration-200"
                >
                  <div
                    className="w-11 h-11 mb-3.5 flex items-center justify-center rounded-full shrink-0"
                    style={{ color: '#0a6eab', backgroundColor: '#0a6eab1a' }}
                  >
                    {renderSolutionIcon(sol.icon, sol.title)}
                  </div>
                  <h4 className="text-sm font-bold tracking-wide text-gray-900 uppercase mb-2">
                    {sol.title}
                  </h4>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed m-0">
                    {sol.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Key Brands For This Sector Section */}
      {industry.brands && industry.brands.length > 0 && (
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto p-5 p-5">
            <div className="text-center mb-8">
              <h2
                className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900"
                dangerouslySetInnerHTML={{ __html: industry.brandsHeading }}
              />
              {industry.brandsSubheading && (
                <p className="text-gray-500 text-xs md:text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
                  {industry.brandsSubheading}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {industry.brands.map((brand, idx) => (
                <div
                  key={idx}
                  className="w-[calc(50%-8px)] sm:w-36 md:w-64 h-[130px] p-4 flex items-center justify-center border border-gray-200/80 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 shrink-0"
                >
                  <img
                    src={brand.src}
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

      {/* 5. Why UniSpark For This Sector Section */}
      {industry.whyChooseUs && industry.whyChooseUs.length > 0 && (
        <section className="relative py-12 bg-gray-50 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto p-5 p-5">
            <div className="text-center mb-10">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-opacity-10 mb-3 uppercase"
                style={{ color: '#0a6eab', backgroundColor: '#0a6eab1a' }}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{industry.whyBadge || 'Compliance & Expertise'}</span>
              </span>
              <h2
                className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900"
                dangerouslySetInnerHTML={{ __html: industry.whyHeading }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
              {industry.whyChooseUs.map((w, idx) => (
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

      {/* 6. CTA Section */}
      <section className="relative w-full overflow-hidden bg-slate-950 py-12 md:py-14">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
          style={{ backgroundImage: "url('/images/home-cta.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/90 to-slate-950/95 pointer-events-none z-10"></div>
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-10"></div>
        <div className="max-w-[1200px] mx-auto p-5 py-2 px-2 relative z-20">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl md:text-5xl font-semibold font-black text-white tracking-tight leading-tight uppercase"
              dangerouslySetInnerHTML={{
                __html:
                  industry.ctaHeading ||
                  'Ready to Discuss Your <span class="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Sector Security Requirements?</span>'
              }}
            />
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-3 mb-6 max-w-xl leading-relaxed">
              {industry.ctaDesc ||
                'Our engineers are available for site surveys across Dubai, Abu Dhabi, Sharjah, and all UAE locations.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                to={industry.ctaBtn1Link || '/contact-us'}
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-lg shadow-cyan-900/20 transition-all duration-150 border border-cyan-500/30 uppercase tracking-wider"
              >
                <span>{industry.ctaBtn1Text || 'Request an AMC/PMC Quotation'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
              </Link>
              <a
                href={industry.ctaBtn2Link || 'tel:+971-4-1234567'}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-lg transition-all duration-150 uppercase tracking-wider backdrop-blur-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{industry.ctaBtn2Text || 'Call Our Team'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
