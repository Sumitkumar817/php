import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Target,
  Eye,
  Building2,
  Settings,
  Users,
  MapPin,
  Network,
  Laptop,
  FileLock,
  Shuffle,
  Waypoints,
  Handshake,
  Building,
  Microchip,
  Cpu,
  ChartPie,
  ArrowRight,
  Phone
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const IconMap = {
  Building2,
  Settings,
  Users,
  MapPin,
  ShieldAlert,
  Network,
  Laptop,
  Shield,
  ShieldCheck,
  Target,
  Eye,
  FileLock,
  Shuffle,
  Waypoints,
  Handshake,
  Building,
  Microchip,
  Cpu: Microchip,
  ChartPie,
  PieChart: ChartPie
};

export default function AboutPage({ onOpenEnquiry }) {
  const { t, i18n } = useTranslation();
  const [aboutData, setAboutData] = useState({
    bannerBadge: 'ABOUT UNISPARK SECURITY',
    bannerTitle: 'About UniSpark Security Systems',
    bannerDesc:
      'UniSpark Innovation Security Systems & Equipment Trading L.L.C is a Dubai-registered company specialising in end-to-end physical security solutions — from design and supply to professional installation, commissioning, and long-term maintenance. We serve enterprises, real estate developers, aviation facilities, oil & gas installations, hospitality groups, healthcare institutions, and consumer properties across the UAE, bringing hands-on technical expertise and a zero-compromise commitment to security.',
    bannerBgImage: '/images/contact-bg.jpg',
    mainHeading: 'WHO WE ARE',
    mainDesc:
      'We are a physical security company built on technical credibility, regulatory compliance, and a deep understanding of the UAE market. Our engineers have hands-on experience across every system category we offer — CCTV, access control, intruder alarm, fire detection, biometrics, perimeter security, and integrated control room design.\n\nWe do not sell security. We deliver it — with precision design, certified installation, and long-term maintenance agreements that ensure your systems remain operational and compliant at all times.',
    mission: {
      title: 'OUR MISSION',
      description:
        "To be the UAE's most reliable security systems partner — delivering design, supply, installation, and maintenance of world-class physical security infrastructure that protects businesses, assets, and people with zero compromise.",
      icon: 'Target'
    },
    vision: {
      title: 'OUR VISION',
      description:
        'To become a leading UAE-based security systems brand — synonymous with technical excellence, rapid response, and uncompromising commitment to safety across every sector we serve, from aviation and real estate to oil & gas and healthcare.',
      icon: 'Eye'
    },
    mainImage: '/images/abt-sec.jpg',
    glanceBadge: 'Quick Overview',
    glanceTitle: 'COMPANY AT A GLANCE',
    glanceCards: [
      { title: 'Registered', desc: 'Dubai, United Arab Emirates', icon: 'Building2' },
      { title: 'Business Type', desc: 'Security Equipment Trading · Installation · Maintenance', icon: 'Settings' },
      { title: 'Target Market', desc: 'UAE Commercial, Industrial & Residential — B2B & B2G', icon: 'Users' },
      { title: 'Service Areas', desc: 'Dubai · Abu Dhabi · Sharjah · UAE Nationwide', icon: 'MapPin' },
      { title: 'Industries Served', desc: 'Aviation · Real Estate · Oil & Gas · Hospitality · Healthcare', icon: 'ShieldAlert' },
      { title: 'Group', desc: 'UniSpark Innovation Group of Companies.', icon: 'Network' }
    ],
    groupBadge: 'Corporate Architecture',
    groupTitle: 'OUR GROUP STRUCTURE',
    groupDesc:
      'UniSpark Security is part of the UniSpark Innovations Group — a UAE-registered group of companies delivering technology, human resource, and physical security solutions.',
    groupCards: [
      {
        tag: 'Group Lead Technology Entity',
        title: 'Horizon Hive Technology L.L.C',
        subtitle: 'Core Business:',
        tags: ['Managed IT', 'Cybersecurity', 'Digital Transformation', 'Aviation IT', 'AI/ML Surveillance', 'Network Infrastructure'],
        icon: 'Laptop',
        link: 'https://www.horizonhivetechnology.com/',
        disclaimer: 'You are being redirected to Horizon Hive Technology L.L.C, a sister entity of UniSpark Security Systems & Equipment Trading L.L.C.'
      },
      {
        tag: 'Sister Entity — HR Division',
        title: 'UniSpark Innovations HR Consultants L.L.C',
        subtitle: 'Core Business:',
        tags: ['HR Consultancy', 'Payroll', 'HRMS', 'Staff Augmentation', 'Skilled Manpower'],
        icon: 'Users',
        link: 'https://usihr.com/',
        disclaimer: 'You are being redirected to UniSpark Innovations HR Consultants L.L.C, a sister entity of UniSpark Security Systems & Equipment Trading L.L.C.'
      },
      {
        tag: 'Sister Entity — Physical Security Division',
        title: 'UniSpark Security Systems & Equipment Trading (This Entity)',
        subtitle: 'Core Business:',
        tags: ['Security Equipment Installation & Maintenance', 'Security Systems & Equipment Trading'],
        icon: 'Shield',
        link: '/solutions',
        disclaimer: ''
      }
    ],
    diffBadge: 'Why Choose Us',
    diffTitle: 'Our Key Differentiators',
    diffDesc:
      'UniSpark combines regulatory excellence, technical expertise, and a vendor-neutral approach to deliver reliable, end-to-end security infrastructure tailored to your needs.',
    diffCards: [
      {
        title: 'UAE-Compliant by Design',
        desc: "Every installation follows UAE Civil Defence, NESA, and DESC standards. We handle compliance documentation so you don't have to.",
        icon: 'FileLock'
      },
      {
        title: 'Multi-Brand Vendor Independence',
        desc: 'We source from Hikvision, Dahua, Bosch, ZKTeco, HID, Honeywell, and more — selecting the right technology, not the most convenient one.',
        icon: 'Shuffle'
      },
      {
        title: 'One Partner, Full Lifecycle',
        desc: 'Site survey, design, supply, installation, testing, commissioning, handover, and AMC. You deal with one team across the full project lifecycle.',
        icon: 'Waypoints'
      },
      {
        title: 'SLA-Governed Service',
        desc: 'Emergency response, preventive maintenance, remote health monitoring, and spare parts supply — all governed by formal SLA agreements.',
        icon: 'Handshake'
      },
      {
        title: 'Cross-Sector Experience',
        desc: 'From international airports to residential compounds, from oil field installations to hotel lobbies, we have deployed security systems across every major UAE sector.',
        icon: 'Building'
      },
      {
        title: 'Backed by Technology Expertise',
        desc: 'Through our sister company Horizon Hive Technology, we integrate physical security with AI/ML surveillance, cybersecurity, and digital transformation capabilities.',
        icon: 'Microchip'
      }
    ],
    ctaBadge: 'AMC & PMC Consultation',
    ctaTitle: 'Ready to Discuss Your Maintenance Contracts — AMC & PMC Requirements?',
    ctaDesc: 'Our engineers are available for site surveys across Dubai, Abu Dhabi, Sharjah, and all UAE locations.',
    ctaPrimaryBtnText: 'Request an AMC/PMC Quotation',
    ctaPrimaryBtnLink: '/contact-us',
    ctaSecondaryBtnText: 'Call Our Team',
    ctaSecondaryBtnLink: 'tel:+971502885874',
    ctaBgImage: '/images/home-cta.jpg'
  });

  const loadAboutFromBackend = async () => {
    try {
      const apiBase =
        import.meta.env.VITE_API_BASE_URL ||
        (typeof window !== 'undefined' &&
          (window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname.startsWith('192.168.'))
          ? 'http://localhost:5000/api'
          : 'https://unispark-backend-api.onrender.com/api');

      const res = await fetch(`${apiBase}/about`);
      const data = await res.json();
      if (data.success && data.data) {
        setAboutData(prev => ({
          ...prev,
          ...data.data,
          mission: { ...prev.mission, ...(data.data.mission || {}) },
          vision: { ...prev.vision, ...(data.data.vision || {}) },
          glanceCards:
            Array.isArray(data.data.glanceCards) && data.data.glanceCards.length === 6
              ? data.data.glanceCards
              : prev.glanceCards,
          groupCards:
            Array.isArray(data.data.groupCards) && data.data.groupCards.length === 3
              ? data.data.groupCards
              : prev.groupCards,
          diffCards:
            Array.isArray(data.data.diffCards) && data.data.diffCards.length === 6
              ? data.data.diffCards
              : prev.diffCards
        }));
      }
    } catch (err) {
      console.warn('Error fetching about data:', err);
    }
  };

  useEffect(() => {
    loadAboutFromBackend();

    const handleFocus = () => loadAboutFromBackend();
    window.addEventListener('focus', handleFocus);

    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <div className="flex-1 bg-white font-sans antialiased text-zinc-900">
      {/* 1. Page Header / Breadcrumb Hero */}
      <section
        className="page-header con-banner relative w-full overflow-hidden bg-slate-900 bg-cover bg-center bg-no-repeat py-20 md:py-24 border-b border-slate-800"
        style={{ backgroundImage: `url(${aboutData.bannerBgImage || '/images/contact-bg.jpg'})` }}
      >
        <div className="absolute inset-0 bg-slate-950/55 pointer-events-none z-0"></div>
        <div className="max-w-[1200px] mx-auto p-5 py-0 px-5">
          <div className="relative z-10 max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-4 bg-white rounded-full px-4 py-2 inline-flex items-center gap-2">
              <ol className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <li>
                  <Link to="/" className="hover:text-[#1380c2] transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li className="text-slate-600 shrink-0">
                  <ChevronRight className="w-3 h-3" />
                </li>
                <li className="text-slate-700 truncate" aria-current="page">
                  About Us
                </li>
              </ol>
            </nav>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-3">
              {i18n.language === 'hi' ? t('pages.about.title') : aboutData.bannerTitle}
            </h1>

            <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed md:text-left max-w-6xl">
              {i18n.language === 'hi' ? t('pages.about.subtitle') : aboutData.bannerDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Who We Are Section */}
      <section className="relative w-full overflow-hidden bg-white py-14 md:py-18">
        <div className="absolute top-[10%] left-[-10%] w-[300px] h-[300px] bg-[#1380c2]/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
        <div className="max-w-[1320px] mx-auto p-5 py-2 px-5 md:px-8">
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Copy & Mission/Vision */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-3.5 text-xs font-semibold tracking-wide uppercase text-[#1380c2] bg-[#1380c2]/10 border border-[#1380c2]/20 rounded-full self-start">
                  <Shield className="w-3.5 h-3.5" /> Who We Are
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-5">
                  WHO WE <span className="bg-gradient-to-r from-[#1380c2] to-[#0c5683] bg-clip-text text-transparent">ARE</span>
                </h2>

                <div className="space-y-4 mb-7 text-xs sm:text-sm text-gray-600 leading-relaxed text-justify font-sans">
                  {aboutData.mainDesc.includes('\n\n') ? (
                    aboutData.mainDesc.split('\n\n').map((para, i) => (
                      <p key={i} className="leading-relaxed font-sans text-justify text-gray-600">
                        {para}
                      </p>
                    ))
                  ) : (
                    <>
                      <p className="leading-relaxed font-sans text-justify text-gray-600">
                        We are a physical security company built on technical credibility, regulatory compliance, and a deep understanding of the UAE market. Our engineers have hands-on experience across every system category we offer — CCTV, access control, intruder alarm, fire detection, biometrics, perimeter security, and integrated control room design.
                      </p>
                      <p className="leading-relaxed font-sans text-justify text-gray-600">
                        We do not sell security. We deliver it — with precision design, certified installation, and long-term maintenance agreements that ensure your systems remain operational and compliant at all times.
                      </p>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-4 md:gap-5">
                  {/* Mission Card (Enlarged) */}
                  <div className="group flex items-start gap-4 md:gap-5 p-6 md:p-7 bg-gray-50/90 border border-gray-200/80 rounded-2xl transition-all duration-300 hover:border-[#1380c2]/50 hover:bg-white hover:shadow-md">
                    <div className="flex items-center justify-center w-13 h-13 md:w-14 md:h-14 rounded-2xl bg-[#1380c2]/10 text-[#1380c2] group-hover:bg-[#1380c2] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                      <Target className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-wide uppercase mb-1.5">
                        {aboutData.mission?.title || 'OUR MISSION'}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                        {aboutData.mission?.description || "To be the UAE's most reliable security systems partner — delivering design, supply, installation, and maintenance of world-class physical security infrastructure that protects businesses, assets, and people with zero compromise."}
                      </p>
                    </div>
                  </div>

                  {/* Vision Card (Enlarged) */}
                  <div className="group flex items-start gap-4 md:gap-5 p-6 md:p-7 bg-gray-50/90 border border-gray-200/80 rounded-2xl transition-all duration-300 hover:border-[#1380c2]/50 hover:bg-white hover:shadow-md">
                    <div className="flex items-center justify-center w-13 h-13 md:w-14 md:h-14 rounded-2xl bg-[#1380c2]/10 text-[#1380c2] group-hover:bg-[#1380c2] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                      <Eye className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-wide uppercase mb-1.5">
                        {aboutData.vision?.title || 'OUR VISION'}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                        {aboutData.vision?.description || 'To become a leading UAE-based security systems brand — synonymous with technical excellence, rapid response, and uncompromising commitment to safety across every sector we serve, from aviation and real estate to oil & gas and healthcare.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Image with Corner Brackets */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative p-3 w-full max-w-[460px] lg:max-w-full">
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gray-400"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-gray-400"></div>
                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm aspect-[4/3] sm:aspect-[16/11] lg:aspect-square">
                    <img
                      src={aboutData.mainImage || '/images/abt-sec.jpg'}
                      alt="Tech Infrastructure"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Company At A Glance Section (Enlarged Cards with Sans-Serif Typography) */}
      <section className="relative w-full bg-[#f8f9fa] py-16 md:py-20 border-y border-gray-200/60">
        <div className="max-w-[1380px] mx-auto p-5 py-2 px-5 md:px-8">
          <div className="text-start mb-9">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-3 text-xs font-bold tracking-wide uppercase text-[#1380c2] bg-[#1380c2]/10 border border-[#1380c2]/20 rounded-md">
              <ChartPie className="w-3.5 h-3.5" /> Quick Overview
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none uppercase">
              COMPANY AT A <span className="text-[#1380c2]">GLANCE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 lg:gap-6">
            {(aboutData.glanceCards && aboutData.glanceCards.length === 6 ? aboutData.glanceCards : [
              { title: 'Registered', desc: 'Dubai, United Arab Emirates', icon: 'Building2' },
              { title: 'Business Type', desc: 'Security Equipment Trading · Installation · Maintenance', icon: 'Settings' },
              { title: 'Target Market', desc: 'UAE Commercial, Industrial & Residential — B2B & B2G', icon: 'Users' },
              { title: 'Service Areas', desc: 'Dubai · Abu Dhabi · Sharjah · UAE Nationwide', icon: 'MapPin' },
              { title: 'Industries Served', desc: 'Aviation · Real Estate · Oil & Gas · Hospitality · Healthcare', icon: 'ShieldAlert' },
              { title: 'Group', desc: 'UniSpark Innovation Group of Companies.', icon: 'Network' }
            ]).map((card, idx) => {
              const IconComponent = IconMap[card.icon] || Building2;
              return (
                <div
                  key={idx}
                  className="group flex flex-col justify-between p-6 md:p-6 lg:p-7 bg-white border border-gray-200/90 rounded-2xl shadow-sm min-h-[220px] md:min-h-[240px] transition-all duration-300 hover:border-[#1380c2]/60 hover:shadow-xl hover:-translate-y-1.5"
                >
                  <div>
                    <div className="flex items-center justify-center w-13 h-13 md:w-14 md:h-14 mb-4 rounded-2xl bg-[#1380c2]/10 text-[#1380c2] group-hover:bg-[#1380c2] group-hover:text-white transition-all duration-300 shadow-xs">
                      <IconComponent className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-wider uppercase mb-2 leading-snug group-hover:text-[#1380c2] transition-colors duration-200">
                      {card.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans mt-auto">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Corporate Architecture / Group Structure Section (Enlarged Cards) */}
      <section className="relative w-full bg-[#fdfdfd] py-16 md:py-20 border-b border-gray-200/60">
        <div className="max-w-[1360px] mx-auto p-5 py-2 px-5 md:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-3 text-xs font-bold tracking-wide uppercase text-[#1380c2] bg-[#1380c2]/10 border border-[#1380c2]/20 rounded-md">
              <Network className="w-3.5 h-3.5" /> Corporate Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase mb-3">
              OUR GROUP <span className="text-[#1380c2]">STRUCTURE</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
              {aboutData.groupDesc || 'UniSpark Security is part of the UniSpark Innovations Group — a UAE-registered group of companies delivering technology, human resource, and physical security solutions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
            {/* Card 1 */}
            <div className="flex flex-col p-7 md:p-8 bg-white border rounded-2xl transition-all duration-300 border-gray-200/90 hover:border-gray-300 shadow-sm hover:shadow-xl min-h-[300px] md:min-h-[320px]">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] md:text-xs font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
                  Group Lead Technology Entity
                </span>
                <div className="flex items-center justify-center w-12 h-12 md:w-13 md:h-13 rounded-2xl bg-gray-100 text-gray-700 shadow-xs">
                  <Laptop className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 tracking-tight leading-snug mb-3">
                Horizon Hive Technology L.L.C
              </h3>

              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
                Core Business:
              </span>

              <div className="flex flex-wrap gap-2 mt-auto">
                {['Managed IT', 'Cybersecurity', 'Digital Transformation', 'Aviation IT', 'AI/ML Surveillance', 'Network Infrastructure'].map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200/90 px-3 py-1.5 rounded-lg transition-colors duration-150 hover:bg-gray-100 font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col p-7 md:p-8 bg-white border rounded-2xl transition-all duration-300 border-gray-200/90 hover:border-gray-300 shadow-sm hover:shadow-xl min-h-[300px] md:min-h-[320px]">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] md:text-xs font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
                  Sister Entity — HR Division
                </span>
                <div className="flex items-center justify-center w-12 h-12 md:w-13 md:h-13 rounded-2xl bg-gray-100 text-gray-700 shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 tracking-tight leading-snug mb-3">
                UniSpark Innovations HR Consultants L.L.C
              </h3>

              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
                Core Business:
              </span>

              <div className="flex flex-wrap gap-2 mt-auto">
                {['HR Consultancy', 'Payroll', 'HRMS', 'Staff Augmentation', 'Skilled Manpower'].map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200/90 px-3 py-1.5 rounded-lg transition-colors duration-150 hover:bg-gray-100 font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col p-7 md:p-8 bg-white border rounded-2xl transition-all duration-300 border-[#1380c2] ring-2 ring-[#1380c2]/30 shadow-md hover:shadow-xl min-h-[300px] md:min-h-[320px]">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] md:text-xs font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[#1380c2]/10 text-[#1380c2]">
                  Sister Entity — Physical Security Division
                </span>
                <div className="flex items-center justify-center w-12 h-12 md:w-13 md:h-13 rounded-2xl bg-[#1380c2] text-white shadow-xs">
                  <Shield className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 tracking-tight leading-snug mb-3">
                UniSpark Security Systems &amp; Equipment Trading
                <span className="text-[#1380c2] font-semibold"> (This Entity)</span>
              </h3>

              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
                Core Business:
              </span>

              <div className="flex flex-wrap gap-2 mt-auto">
                {['Security Equipment Installation & Maintenance', 'Security Systems & Equipment Trading'].map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200/90 px-3 py-1.5 rounded-lg transition-colors duration-150 hover:bg-gray-100 font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Key Differentiators Section (Enlarged Cards) */}
      <section className="relative w-full overflow-hidden bg-[#f1f5f9] py-16 md:py-20">
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[#1380c2]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="max-w-[1360px] mx-auto p-5 py-2 px-5 md:px-8">
          <div className="relative z-10">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-3 text-xs font-semibold tracking-wide uppercase text-[#1380c2] bg-[#1380c2]/10 border border-[#1380c2]/20 rounded-full">
                <ShieldAlert className="w-3.5 h-3.5" /> Why Choose Us
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                Our Key{' '}
                <span className="bg-gradient-to-r from-[#1380c2] to-[#0c5683] bg-clip-text text-transparent">
                  Differentiators
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-sans">
                {aboutData.diffDesc || 'UniSpark combines regulatory excellence, technical expertise, and a vendor-neutral approach to deliver reliable, end-to-end security infrastructure tailored to your needs.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: 'UAE-Compliant by Design',
                  desc: "Every installation follows UAE Civil Defence, NESA, and DESC standards. We handle compliance documentation so you don't have to.",
                  icon: FileLock
                },
                {
                  title: 'Multi-Brand Vendor Independence',
                  desc: 'We source from Hikvision, Dahua, Bosch, ZKTeco, HID, Honeywell, and more — selecting the right technology, not the most convenient one.',
                  icon: Shuffle
                },
                {
                  title: 'One Partner, Full Lifecycle',
                  desc: 'Site survey, design, supply, installation, testing, commissioning, handover, and AMC. You deal with one team across the full project lifecycle.',
                  icon: Waypoints
                },
                {
                  title: 'SLA-Governed Service',
                  desc: 'Emergency response, preventive maintenance, remote health monitoring, and spare parts supply — all governed by formal SLA agreements.',
                  icon: Handshake
                },
                {
                  title: 'Cross-Sector Experience',
                  desc: 'From international airports to residential compounds, from oil field installations to hotel lobbies, we have deployed security systems across every major UAE sector.',
                  icon: Building
                },
                {
                  title: 'Backed by Technology Expertise',
                  desc: 'Through our sister company Horizon Hive Technology, we integrate physical security with AI/ML surveillance, cybersecurity, and digital transformation capabilities.',
                  icon: Microchip
                }
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="group flex flex-col justify-between bg-white p-7 md:p-8 border border-gray-200/90 rounded-2xl shadow-sm min-h-[220px] md:min-h-[240px] transition-all duration-300 hover:border-[#1380c2]/50 hover:shadow-xl hover:-translate-y-1.5"
                  >
                    <div>
                      <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-2xl bg-[#1380c2]/10 text-[#1380c2] group-hover:bg-[#1380c2] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <h5 className="text-base md:text-lg font-bold text-gray-900 tracking-tight mb-2.5 group-hover:text-[#1380c2] transition-colors duration-150">
                        {item.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. AMC / PMC Consultation CTA Section */}
      <section className="relative w-full overflow-hidden bg-slate-950 py-14 md:py-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
          style={{ backgroundImage: `url('/images/home-cta.jpg')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/90 to-slate-950/95 pointer-events-none z-10"></div>
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-10"></div>
        <div className="max-w-[1240px] mx-auto p-5 py-2 px-2 relative z-20">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold font-black text-white tracking-tight leading-tight uppercase">
              Ready to Discuss Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Maintenance Contracts — AMC &amp; PMC Requirements?
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-3 mb-6 max-w-xl leading-relaxed font-sans">
              Our engineers are available for site surveys across Dubai, Abu Dhabi, Sharjah, and all UAE locations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                to="/contact-us"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-lg shadow-cyan-900/20 transition-all duration-150 border border-cyan-500/30 uppercase tracking-wider"
              >
                Request an AMC/PMC Quotation
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
              </Link>
              <a
                href="tel:+971502885874"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-lg transition-all duration-150 uppercase tracking-wider backdrop-blur-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Our Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
