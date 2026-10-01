import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { COUNTRIES, DEFAULT_COUNTRY, detectCountryFromPhone } from '../data/countries';
import CountrySelect from '../components/CountrySelect';
import CaptchaBox from '../components/CaptchaBox';
import contactBg from '../../images/contact-bg.jpg';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    country: DEFAULT_COUNTRY.name,
    countryCode: DEFAULT_COUNTRY.dialCode,
    phone: '',
    location: '',
    enquiryType: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Anti-Bot CAPTCHA & Honeypot State
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaExpected, setCaptchaExpected] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [config, setConfig] = useState({
    bannerTitle: "Get in Touch — We're Ready to Help",
    bannerDesc: "Whether you need a site survey, a product quotation, or information about our annual maintenance contracts — our team is ready to respond quickly and professionally. Contact us by phone, email, or complete the enquiry form below.",
    country: "United Arab Emirates",
    countryCode: "+971",
    phone: "+971 50 288 5874",
    whatsapp: "971502885874",
    email: "info@unisparkinnovation.com",
    address: "Dubai, United Arab Emirates",
    coverage: "Dubai · Abu Dhabi · Sharjah · UAE Nationwide",
    workingHours: "Sunday – Thursday, 8:00 AM – 6:00 PM (UAE)",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28884.867909334753!2d55.2707828!3d25.2048493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a6d0883%3A0x2f57581dbf302924!2sDubai!5e0!3m2!1sen!2sae!4v1625000000000!5m2!1sen!2sae",
    formBadge: "ENQUIRY FORM",
    formTitle: "Send us a message!",
    formSubtitle: "Fill in the details below and our technical engineering team will get back to you promptly.",
    formSuccessTitle: "Enquiry Dispatched!",
    formSuccessDesc: "Thank you for contacting UniSpark Innovation. Our technical engineering division will respond quickly within 2 business hours.",
    partnerLinks: [
      { title: "Looking for IT Services?", label: "Visit Horizon Hive Technology L.L.C", url: "https://horizonhivetechnology.com/" },
      { title: "Looking for HR Solutions?", label: "Visit UniSpark Innovations Human Resource Consultants L.L.C", url: "https://usihr.com/" }
    ]
  });

  const apiBase = import.meta.env.VITE_API_BASE_URL || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.'))) ? 'http://localhost:5000/api' : 'https://unispark-backend-api.onrender.com/api');

  const loadConfig = async () => {
    try {
      const res = await fetch(`${apiBase}/contact`);
      const data = await res.json();
      if (data.success && data.data) {
        setConfig(prev => ({ ...prev, ...data.data }));
        if (data.data.country) {
          setFormData(prev => ({
            ...prev,
            country: prev.country === DEFAULT_COUNTRY.name ? data.data.country : prev.country,
            countryCode: prev.countryCode === DEFAULT_COUNTRY.dialCode ? (data.data.countryCode || prev.countryCode) : prev.countryCode
          }));
        }
      }
    } catch (err) {
      console.warn("Error fetching contact config:", err);
    }
  };

  useEffect(() => {
    loadConfig();
    const handleFocus = () => loadConfig();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleLocationChange = (e) => {
    const loc = e.target.value;
    const uaeEmirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];
    
    let matchedCountry;
    if (uaeEmirates.includes(loc)) {
      matchedCountry = COUNTRIES.find(c => c.code === 'AE');
    } else {
      matchedCountry = COUNTRIES.find(c => c.name.toLowerCase() === loc.toLowerCase() || c.code.toLowerCase() === loc.toLowerCase());
    }

    setFormData(prev => ({
      ...prev,
      location: loc,
      country: matchedCountry ? matchedCountry.name : prev.country,
      countryCode: matchedCountry ? matchedCountry.dialCode : prev.countryCode
    }));
  };

  const handleCountrySelectChange = (selected) => {
    setFormData(prev => ({
      ...prev,
      country: selected.name,
      countryCode: selected.dialCode,
      location: selected.name === 'United Arab Emirates' 
        ? (prev.location && ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'].includes(prev.location) ? prev.location : 'Dubai')
        : selected.name
    }));
  };

  const handleCountryChange = (countryName) => {
    const found = COUNTRIES.find(c => c.name === countryName);
    setFormData(prev => ({
      ...prev,
      country: countryName,
      countryCode: found ? found.dialCode : prev.countryCode,
      location: countryName
    }));
  };

  const handleCountryCodeChange = (dialCode) => {
    const found = COUNTRIES.find(c => c.dialCode === dialCode);
    setFormData(prev => ({
      ...prev,
      countryCode: dialCode,
      country: found ? found.name : prev.country,
      location: found ? found.name : prev.location
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const detected = detectCountryFromPhone(value);
    if (detected) {
      setFormData(prev => ({
        ...prev,
        country: detected.country.name,
        countryCode: detected.dialCode,
        location: detected.country.name,
        phone: detected.localNumber
      }));
    } else {
      setFormData(prev => ({ ...prev, phone: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot anti-bot verification check
    if (honeypot && honeypot.trim() !== '') {
      console.warn("Spam bot submission blocked via honeypot.");
      setIsSubmitting(false);
      return;
    }

    // Security CAPTCHA verification check
    if (!captchaInput || captchaInput.trim().toUpperCase() !== captchaExpected.trim().toUpperCase()) {
      setCaptchaError('Security CAPTCHA verification failed. Please enter the correct code shown.');
      setIsSubmitting(false);
      return;
    }

    setCaptchaError('');
    setIsSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/contact/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, honeypot })
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setCaptchaInput('');
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          country: DEFAULT_COUNTRY.name,
          countryCode: DEFAULT_COUNTRY.dialCode,
          phone: '',
          location: '',
          enquiryType: '',
          service: '',
          message: ''
        });
      } else {
        alert("Failed to submit enquiry. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#f1f5f9] text-slate-900 min-h-screen">
      
      {/* 1. Page Header / Breadcrumb Hero (Exact match to reference) */}
      <section
        className="page-header con-banner relative w-full overflow-hidden bg-slate-900 bg-cover bg-center bg-no-repeat py-20 md:py-24 border-b border-slate-800"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <div className="absolute inset-0 bg-slate-950/55 pointer-events-none z-0"></div>
        <div className="max-w-[1200px] mx-auto p-5 py-0 px-5">
          <div className="relative z-10 max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-4 bg-white rounded-full px-4 py-2 inline-flex items-center gap-2 shadow-sm">
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
                  Contact Us
                </li>
              </ol>
            </nav>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black font-semibold text-white tracking-tight leading-tight mb-3">
              {i18n.language === 'hi' ? t('pages.contact.title') : (config.bannerTitle || "Get in Touch — We're Ready to Help")}
            </h1>

            <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed text-justify md:text-left max-w-6xl">
              {i18n.language === 'hi' ? t('pages.contact.subtitle') : (config.bannerDesc || "Whether you need a site survey, a product quotation, or information about our annual maintenance contracts — our team is ready to respond quickly and professionally. Contact us by phone, email, or complete the enquiry form below.")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative w-full bg-slate-50 py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm p-5 sm:p-6 md:p-8">
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-sky-600 uppercase tracking-wider mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-network"><rect x="16" y="16" width="6" height="6" rx="1"></rect><rect x="2" y="16" width="6" height="6" rx="1"></rect><rect x="9" y="2" width="6" height="6" rx="1"></rect><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path><path d="M12 12V8"></path></svg>
                {config.formBadge || 'ENQUIRY FORM'}
              </span>
              <h2 className="text-xl sm:text-3xl font-semibold font-black text-slate-900 tracking-tight">
                {config.formTitle || 'Send us a message!'}
              </h2>
              {config.formSubtitle && (
                <p className="text-sm text-slate-500 mt-1 font-light">{config.formSubtitle}</p>
              )}
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{config.formSuccessTitle || 'Enquiry Dispatched!'}</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {config.formSuccessDesc || 'Thank you for contacting UniSpark Innovation. Our technical engineering division will respond quickly within 2 business hours.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#0073b7] hover:bg-[#005a96] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row 1 (3 Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[14px] font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                      FULL NAME <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-xs px-3 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-slate-900 placeholder-slate-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                      COMPANY NAME <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Company Name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full text-xs px-3 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-slate-900 placeholder-slate-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                      EMAIL ADDRESS <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-slate-900 placeholder-slate-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2 (3 Columns: Phone, Emirate/Location, Enquiry Type) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[14px] font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                      PHONE NUMBER <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-2 items-stretch">
                      <CountrySelect
                        variant="dialCodeOnly"
                        value={formData.country || formData.countryCode}
                        onChange={handleCountrySelectChange}
                      />
                      <input
                        type="tel"
                        required
                        placeholder="50 123 4567"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="w-full text-xs px-3 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-slate-900 placeholder-slate-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                      EMIRATE / LOCATION <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.location}
                      onChange={handleLocationChange}
                      className="w-full text-xs px-3 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-slate-900 transition-colors"
                    >
                      <option value="" disabled>Select Location / Country...</option>
                      <optgroup label="United Arab Emirates (Emirates)">
                        <option value="Dubai">Dubai (UAE) (+971)</option>
                        <option value="Abu Dhabi">Abu Dhabi (UAE) (+971)</option>
                        <option value="Sharjah">Sharjah (UAE) (+971)</option>
                        <option value="Ajman">Ajman (UAE) (+971)</option>
                        <option value="Ras Al Khaimah">Ras Al Khaimah (UAE) (+971)</option>
                        <option value="Fujairah">Fujairah (UAE) (+971)</option>
                        <option value="Umm Al Quwain">Umm Al Quwain (UAE) (+971)</option>
                      </optgroup>
                      <optgroup label="All Countries Worldwide">
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.name}>
                            {c.name} ({c.dialCode})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                      ENQUIRY TYPE <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.enquiryType}
                      onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                      className="w-full text-xs px-3 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-slate-900 transition-colors"
                    >
                      <option value="" disabled>Select Enquiry Type...</option>
                      <option value="Installation Project">Installation Project</option>
                      <option value="Equipment Supply">Equipment Supply</option>
                      <option value="AMC/PMC">AMC/PMC</option>
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="AI Powered Solution">AI Powered Solution</option>
                    </select>
                  </div>
                </div>

                {/* Row 3 (Full Width: Service of Interest) */}
                <div>
                  <label className="block text-[14px] font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                    SERVICE OF INTEREST
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full text-xs px-3 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-slate-900 transition-colors"
                  >
                    <option value="" disabled>Select Service...</option>
                    <option value="CCTV">CCTV</option>
                    <option value="Access Control">Access Control</option>
                    <option value="Alarm Systems">Alarm Systems</option>
                    <option value="Fire Alarm">Fire Alarm</option>
                    <option value="Biometric">Biometric</option>
                    <option value="Perimeter">Perimeter</option>
                    <option value="System Integration">System Integration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Row 4 (Full Width: Message / Brief Scope) */}
                <div>
                  <label className="block text-[14px] font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                    MESSAGE / BRIEF SCOPE <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your project scope or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs px-3 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-slate-900 placeholder-slate-400 transition-colors resize-none"
                  />
                </div>

                {/* Honeypot Anti-Bot Field (Hidden from human users) */}
                <input
                  type="text"
                  name="website_url_security_verify"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Anti-Bot Visual Security CAPTCHA */}
                <div className="pt-2">
                  <CaptchaBox
                    captchaInput={captchaInput}
                    setCaptchaInput={(val) => {
                      setCaptchaInput(val);
                      if (captchaError) setCaptchaError('');
                    }}
                    captchaError={captchaError}
                    theme="light"
                    onCaptchaGenerated={(code) => setCaptchaExpected(code)}
                  />
                </div>

                {/* Row 5: Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 disabled:bg-sky-400 active:bg-sky-700 rounded-lg transition-colors duration-150 uppercase tracking-wider shadow-sm select-none"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send">
                      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                      <path d="m21.854 2.147-10.94 10.939"></path>
                    </svg>
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (4 Cards) */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center shrink-0 text-xl">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Call us</h4>
                  <a href={`tel:${config.phone.replace(/\s+/g, '')}`} className="text-[#0073b7] font-bold text-sm block hover:underline">{config.phone}</a>
                  <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noreferrer" className="text-emerald-600 font-bold text-xs block mt-1 hover:underline">
                    <i className="fa-brands fa-whatsapp me-1"></i> +{config.whatsapp} — WhatsApp Business
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center shrink-0 text-xl">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Email us</h4>
                  <a href={`mailto:${config.email}`} className="text-[#0073b7] font-bold text-sm block hover:underline">
                    <span className="text-slate-900 font-bold">Sales:</span> {config.email}
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center shrink-0 text-xl">
                  <i className="fa-solid fa-map-pin"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Company Address & Coverage</h4>
                  <span className="text-slate-900 font-bold text-sm block">{config.address}</span>
                  <span className="text-slate-500 text-xs block mt-1">
                    <strong>Coverage:</strong> {config.coverage}
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center shrink-0 text-xl">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Working Hours</h4>
                  <span className="text-slate-500 text-xs">{config.workingHours}</span>
                </div>
              </div>

            </div>

            {/* Right Column (Google Maps iframe) */}
            <div className="lg:col-span-6">
              <div className="h-full min-h-[350px] rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
                <iframe
                  title="Location Map"
                  src={config.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '350px' }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Group Entity Links Banner */}
      {config.partnerLinks && config.partnerLinks.length > 0 && (
        <section className="py-12 bg-white border-t border-slate-200 text-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
              {config.partnerLinks.map((link, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <p className="text-sm font-medium text-slate-800">
                    {link.title}<br />
                    <a href={link.url} target="_blank" rel="noreferrer" className="text-[#0073b7] font-bold hover:underline">
                      {link.label}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
