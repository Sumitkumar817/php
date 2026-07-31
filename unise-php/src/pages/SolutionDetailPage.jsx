import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { solutionsData } from '../data/solutionsData';

export default function SolutionDetailPage({ onOpenEnquiry }) {
  const { slug } = useParams();
  const solution = solutionsData.find((s) => s.id === slug) || solutionsData[0];

  const targetSectors = [
    { title: "Aviation", icon: "fa-plane", desc: "High-security tracking infrastructures suited strictly for critical tarmac, terminal, and access control environments." },
    { title: "Real Estate", icon: "fa-building", desc: "Comprehensive asset surveillance setups optimized across mixed-use spaces and high-rise commercial structures." },
    { title: "Oil & Gas", icon: "fa-oil-well", desc: "ATEX explosion-proof thermal imaging systems custom-engineered for heavy industrial perimeters." },
    { title: "Hospitality", icon: "fa-hotel", desc: "Discreet luxury-focused surveillance components balancing visitor safety requirements seamlessly." },
    { title: "Healthcare", icon: "fa-hospital", desc: "Compliance-certified security monitoring deployments built around stringent patient privacy guidelines." },
    { title: "Consumer", icon: "fa-shopping-cart", desc: "Highly scalable premium residential setups boasting interactive local app controls." }
  ];

  const whyChooseUs = [
    { title: "UAE-Compliant System Design", icon: "fa-file-shield", desc: "All relevant regulatory standards addressed at the design stage" },
    { title: "Multi-Brand Capability", icon: "fa-shuffle", desc: "We source the right technology for your specific requirements" },
    { title: "End-to-End Delivery", icon: "fa-circle-nodes", desc: "Survey, supply, installation, commissioning, and ongoing maintenance" },
    { title: "SLA-Governed Response", icon: "fa-handshake-angle", desc: "Emergency and planned maintenance covered under formal contract" }
  ];

  return (
    <div className="bg-[#f1f5f9] text-slate-900 min-h-screen font-sans">
      
      {/* 1. Header Banner (Dark Ocean Blue #004b78) */}
      <section className="relative py-16 bg-[#004b78] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <nav aria-label="breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-semibold text-white/80">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li>/</li>
              <li><Link to="/solutions" className="hover:underline">Services</Link></li>
              <li>/</li>
              <li className="text-white font-bold">{solution.title}</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {solution.pageTitle || solution.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed font-light">
            Professional Installation · Commissioning · Long-Term Maintenance &nbsp;|&nbsp; UAE-Wide Coverage
          </p>

          <div className="pt-2">
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0073b7] hover:bg-[#005a96] text-white font-bold text-xs tracking-wider uppercase shadow-md transition duration-300"
            >
              <span>Request a {solution.shortTitle} Site Survey</span>
              <i className="fa-solid fa-arrow-right-long text-xs"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Overview Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0073b7] text-xs font-bold uppercase tracking-wider">
                <i className={`fa-solid ${solution.icon} text-xs`}></i>
                <span>SERVICE OVERVIEW</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight uppercase">
                COMPLETE <span className="text-[#0073b7]">{solution.title}</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {solution.description}
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
                <img
                  src={solution.secImage}
                  alt={solution.title}
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Scope of Work Section (#f8f9fa) */}
      {solution.scopeOfWork && solution.scopeOfWork.length > 0 && (
        <section className="py-16 bg-[#f8f9fa] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0073b7] text-xs font-bold uppercase tracking-wider">
                <i className="fa-solid fa-list-check text-xs"></i>
                <span>Scope of Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                WHAT'S INCLUDED IN <span className="text-[#0073b7]">OUR SERVICE</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {solution.scopeOfWork.map((scope, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center mb-4 text-xl">
                      <i className={`fa-solid ${scope.icon}`}></i>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900 uppercase tracking-wide mb-2">
                      {scope.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {scope.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Key Brands & Technology Section */}
      {solution.brands && solution.brands.length > 0 && (
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              KEY BRANDS & <span className="text-[#0073b7]">TECHNOLOGY</span>
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {solution.brands.map((brand, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center w-40 h-28"
                >
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Targeted Sectors Section */}
      <section className="py-16 bg-[#f1f5f9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0073b7] text-xs font-bold uppercase tracking-wider">
              <i className="fa-solid fa-industry text-xs"></i>
              <span>Targeted Sectors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              INDUSTRIES <span className="text-[#0073b7]">SERVED</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              Deploying specialized {solution.shortTitle} architecture designed for challenging environments across the Middle East.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetSectors.map((sector, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center text-xl shrink-0">
                    <i className={`fa-solid ${sector.icon}`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{sector.title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why UniSpark For This Service */}
      <section className="py-16 bg-[#f8f9fa] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0073b7] text-xs font-bold uppercase tracking-wider">
              <i className="fa-solid fa-shield-halved text-xs"></i>
              <span>WHY CHOOSE US</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Why UniSpark For <span className="text-[#0073b7]">This Service</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((w, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073b7] flex items-center justify-center text-xl">
                    <i className={`fa-solid ${w.icon}`}></i>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{w.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Block Section */}
      <section className="relative py-16 bg-[#030e21] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Discuss Your <span className="text-cyan-300">{solution.title} Requirements?</span>
          </h2>

          <p className="text-base text-slate-300 max-w-2xl mx-auto font-light">
            Our engineers are available for site surveys across Dubai, Abu Dhabi, Sharjah, and all UAE locations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/contact-us"
              className="px-8 py-3.5 rounded-xl bg-[#0073b7] hover:bg-[#005a96] text-white font-bold text-sm shadow-lg flex items-center gap-2 transition"
            >
              <span>Request a {solution.shortTitle} Site Survey</span>
              <i className="fa-solid fa-arrow-right-long text-xs"></i>
            </Link>

            <a
              href="tel:+971502885874"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm transition"
            >
              Call Our Team (+971 50 288 5874)
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
