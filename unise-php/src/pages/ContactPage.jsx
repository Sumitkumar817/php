import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    location: '',
    enquiryType: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f1f5f9] text-slate-900 min-h-screen">
      
      {/* Header Banner (con-banner style) */}
      <section className="relative py-16 bg-[#004b78] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <nav aria-label="breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-semibold text-white/80">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li>/</li>
              <li className="text-white font-bold">Contact Us</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Get in Touch — We're Ready to Help
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed font-light">
            Whether you need a site survey, a product quotation, or information about our annual maintenance contracts — our team is ready to respond quickly and professionally. Contact us by phone, email, or complete the enquiry form below.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0073b7] flex items-center gap-2 mb-1">
              <i className="fa-solid fa-network-wired text-xs"></i> ENQUIRY FORM
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">Send us a message!</h2>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Enquiry Dispatched!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for contacting UniSpark Innovation. Our technical engineering division will respond quickly within 2 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-[#0073b7] hover:bg-[#005a96] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1 (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#0073b7] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Company Name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#0073b7] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#0073b7] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Row 2 (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 XX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#0073b7] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Emirate / Location *
                  </label>
                  <select
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#0073b7] focus:bg-white transition"
                  >
                    <option value="" disabled>Select Location...</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Other UAE">Other UAE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Enquiry Type *
                  </label>
                  <select
                    required
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#0073b7] focus:bg-white transition"
                  >
                    <option value="" disabled>Select Enquiry Type...</option>
                    <option value="Installation Project">Installation Project</option>
                    <option value="Equipment Supply">Equipment Supply</option>
                    <option value="AMC/PMC">AMC/PMC</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>
              </div>

              {/* Service of Interest */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Service of Interest
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#0073b7] focus:bg-white transition"
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

              {/* Full Width Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Message / Brief Scope *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your project scope or requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#0073b7] focus:bg-white transition resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#0073b7] hover:bg-[#005a96] text-white font-bold text-sm rounded-xl shadow-md transition duration-300"
                >
                  Submit Enquiry
                </button>
              </div>

            </form>
          )}
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
                  <a href="tel:+971502885874" className="text-[#0073b7] font-bold text-sm block hover:underline">+971 50 288 5874</a>
                  <a href="https://wa.me/971502885874" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold text-xs block mt-1 hover:underline">
                    <i className="fa-brands fa-whatsapp me-1"></i> +971 50 288 5874 — WhatsApp Business
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center shrink-0 text-xl">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Email us</h4>
                  <a href="mailto:info@unisparkinnovation.com" className="text-[#0073b7] font-bold text-sm block hover:underline">
                    <span className="text-slate-900 font-bold">Sales:</span> info@unisparkinnovation.com
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center shrink-0 text-xl">
                  <i className="fa-solid fa-map-pin"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Company Address & Coverage</h4>
                  <span className="text-slate-900 font-bold text-sm block">Dubai, United Arab Emirates</span>
                  <span className="text-slate-500 text-xs block mt-1">
                    <strong>Coverage:</strong> Dubai · Abu Dhabi · Sharjah · UAE Nationwide
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center shrink-0 text-xl">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Working Hours</h4>
                  <span className="text-slate-500 text-xs">Sunday – Thursday, 8:00 AM – 6:00 PM (UAE)</span>
                </div>
              </div>

            </div>

            {/* Right Column (Google Maps iframe) */}
            <div className="lg:col-span-6">
              <div className="h-full min-h-[350px] rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
                <iframe
                  title="Dubai Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28884.867909334753!2d55.2707828!3d25.2048493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a6d0883%3A0x2f57581dbf302924!2sDubai!5e0!3m2!1sen!2sae!4v1625000000000!5m2!1sen!2sae"
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
      <section className="py-12 bg-white border-t border-slate-200 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
              <p className="text-sm font-medium text-slate-800">
                Looking for IT Services?<br />
                <a href="https://horizonhivetechnology.com/" target="_blank" rel="noreferrer" className="text-[#0073b7] font-bold hover:underline">
                  Visit Horizon Hive Technology L.L.C
                </a>
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
              <p className="text-sm font-medium text-slate-800">
                Looking for HR Solutions?<br />
                <a href="https://usihr.com/" target="_blank" rel="noreferrer" className="text-[#0073b7] font-bold hover:underline">
                  Visit UniSpark Innovations Human Resource Consultants L.L.C
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
