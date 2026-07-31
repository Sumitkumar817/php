import React from 'react';
import { Link } from 'react-router-dom';
import CtaSection from '../components/CtaSection';

export default function IndustriesPage() {
  const industriesList = [
    {
      id: "aviation-security",
      title: "Aviation Security",
      secImage: "/images/aviation-sec.jpg",
      description: "Aviation security demands the highest levels of precision, compliance, and operational reliability. UniSpark deploys physical security infrastructure for airports, airline facilities, MRO operations, and cargo terminals — systems that meet international aviation security standards, integrate with existing airport management platforms, and support 24/7 operational environments."
    },
    {
      id: "real-estate-security",
      title: "Real Estate Security",
      secImage: "/images/estate-sec.jpg",
      description: "Real estate security demands flexible, scalable systems that serve the full spectrum of property types — from high-rise commercial towers and mixed-use developments to residential compounds, retail malls, and individual villas. UniSpark delivers complete physical security solutions for developers, facility management companies, and property operators across the UAE."
    },
    {
      id: "oil-and-gas-security",
      title: "Oil & Gas Security",
      secImage: "/images/oil-sec.jpg",
      description: "Oil and gas facilities operate in demanding conditions — remote locations, hazardous environments, extreme temperatures, and critical infrastructure that requires absolute protection. UniSpark delivers ruggedised physical security solutions for refineries, processing facilities, pipeline corridors, and field sites across the UAE and GCC."
    },
    {
      id: "hospitality-security",
      title: "Hospitality Security",
      secImage: "/images/hospitality-sec.jpg",
      description: "Hospitality security requires an invisible presence — systems that protect guests, staff, and assets without disrupting the guest experience. UniSpark installs discreet, high-performance security solutions for hotels, resorts, restaurants, and entertainment venues, with systems that integrate into hotel management platforms and support round-the-clock operations."
    },
    {
      id: "healthcare-security",
      title: "Healthcare Security",
      secImage: "/images/healthcare-sec.jpg",
      description: "Healthcare environments require security systems that protect patients, staff, and sensitive areas while ensuring full compliance with UAE healthcare regulations and civil defence standards. UniSpark delivers tailored physical security solutions for hospitals, clinics, pharmacies, laboratories, and medtech facilities across the UAE."
    },
    {
      id: "consumer-security",
      title: "Consumer Security",
      secImage: "/images/consumer-sec.jpg",
      description: "Consumer and retail security requires intuitive, cost-effective solutions that protect assets, manage visitor flow, and prevent loss. UniSpark provides complete physical security packages for retail outlets, SMEs, residential compounds, and private villas across the UAE."
    }
  ];

  return (
    <div className="bg-[#f1f5f9] text-slate-900 min-h-screen font-sans">
      
      {/* Banner Section */}
      <section className="relative py-16 bg-[#004b78] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <nav aria-label="breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-semibold text-white/80">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li>/</li>
              <li className="text-white font-bold">Industries</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            End-to-End Security Infrastructure <br className="hidden sm:inline" />
            For UAE Commercial & Industrial Sites.
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed font-light">
            From initial site design and engineering to integration, compliance, and lifecycle maintenance.
          </p>

          <div className="pt-2">
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0073b7] hover:bg-[#005a96] text-white font-bold text-xs tracking-wider uppercase shadow-md transition duration-300"
            >
              <span>Request an Enterprise Security Consultation</span>
              <i className="fa-solid fa-arrow-right-long text-xs"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Grid of All 6 Industries */}
      <section className="py-16 bg-[#f8f9fa] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0073b7] text-xs font-bold uppercase tracking-wider">
              <i className="fa-solid fa-list-check text-xs"></i>
              <span>Industries We Serve</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Reliable Security. <span className="text-[#0073b7]">Trusted Delivery.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesList.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 overflow-hidden transition duration-300 flex flex-col justify-between"
              >
                <Link to={`/industries/${item.id}`} className="block relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={item.secImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <span className="px-5 py-2 rounded-full bg-white text-slate-900 text-xs font-bold uppercase tracking-wider shadow-md">
                      Know More <i className="fa-solid fa-arrow-right ms-1 text-[10px]"></i>
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold uppercase tracking-wide text-slate-900 group-hover:text-[#0073b7] transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      to={`/industries/${item.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0073b7] hover:text-[#005a96] transition"
                    >
                      <span>Explore Sector Framework</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
