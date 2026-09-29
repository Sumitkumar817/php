import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import HeaderConfig from '../models/HeaderConfig.js';
import HeroConfig from '../models/HeroConfig.js';
import MarqueeConfig from '../models/MarqueeConfig.js';
import Section2Config from '../models/Section2Config.js';
import Section3Config from '../models/Section3Config.js';
import Section4Config from '../models/Section4Config.js';
import Section5Config from '../models/Section5Config.js';
import Section6Config from '../models/Section6Config.js';
import AboutConfig from '../about/AboutConfig.js';
import ContactConfig from '../contact/ContactConfig.js';
import PartnerConfig from '../models/PartnerConfig.js';
import StatsConfig from '../models/StatsConfig.js';
import FooterConfig from '../models/FooterConfig.js';

export const seedAllData = async () => {
  try {
    // 1. Seed Users
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      await User.insertMany([
        {
          name: 'Sumit Kumar',
          email: 'sumit.kumar@example.com',
          password: hashedPassword,
          role: 'Super Admin',
          status: 'Active'
        },
        {
          name: 'Priya Sharma',
          email: 'priya.s@example.com',
          password: hashedPassword,
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Alexander Wright',
          email: 'alex.w@example.com',
          password: hashedPassword,
          role: 'Editor',
          status: 'Active'
        },
        {
          name: 'Michael Scott',
          email: 'michael.s@example.com',
          password: hashedPassword,
          role: 'Viewer',
          status: 'Inactive'
        }
      ]);
      console.log('✅ [Seeder] Seeded default users (Sumit Kumar, Priya Sharma, Alexander Wright)');
    }

    // 2. Seed Header
    if (await HeaderConfig.countDocuments() === 0) {
      await HeaderConfig.create({
        email: 'contact@unise.com',
        socialLinks: {
          facebook: 'https://facebook.com/unise',
          instagram: 'https://instagram.com/unise',
          twitter: 'https://twitter.com/unise',
          linkedin: 'https://linkedin.com/company/unise'
        },
        logoUrl: '/images/logo.png'
      });
      console.log('✅ [Seeder] Header configuration seeded');
    }

    // 3. Seed Hero
    if (await HeroConfig.countDocuments() === 0) {
      await HeroConfig.create({
        title: 'Welcome to Unispark',
        heading: "UAE's Trusted Security Systems Partner",
        words: ["Design.", "Supply.", "Installation.", "Maintenance."],
        description: 'Protecting businesses, assets, and people across Dubai, Abu Dhabi, Sharjah, and the UAE — with world-class physical security infrastructure, expert engineers, and zero-compromise service.',
        button1: { text: 'Request a Free Site Survey', link: '/contact-us' },
        button2: { text: 'Call Us Now: +971 50 288 5874', link: 'tel:+971502885874' },
        videoUrl: ''
      });
      console.log('✅ [Seeder] Hero configuration seeded');
    }

    // 4. Seed Marquee
    if (await MarqueeConfig.countDocuments() === 0) {
      await MarqueeConfig.create({
        enabled: true,
        speed: 25,
        bgColor: '#ffffff',
        textColor: '#0f172a',
        items: [
          { text: 'SIRA & ADMCC Compliant Security Solutions', icon: 'fa-shield-halved', link: '/solutions', badge: 'Certified', isActive: true },
          { text: '24/7 Rapid Emergency Response Across UAE', icon: 'fa-clock', link: '/contact-us', badge: '24/7', isActive: true },
          { text: 'Authorized Systems Integrator & Hardware Distributor', icon: 'fa-certificate', link: '/about-us', badge: 'Verified', isActive: true },
          { text: 'Over 500+ Enterprise Projects Delivered Nationwide', icon: 'fa-building', link: '/solutions', badge: 'Proven', isActive: true }
        ]
      });
      console.log('✅ [Seeder] Marquee configuration seeded');
    }

    // 5. Seed Section2
    if (await Section2Config.countDocuments() === 0) {
      await Section2Config.create({
        badge: 'WHY UNISPARK',
        title: 'Complete Lifecycle Security Engineering',
        subtitle: 'From initial threat assessment and regulatory blueprint submission to physical installation and 24/7 preventative maintenance.',
        features: [
          { title: 'Regulatory Compliance', description: 'Fully aligned with UAE municipal, civil defense, and specialized security agency frameworks.', icon: 'ShieldCheck' },
          { title: 'Enterprise Hardware', description: 'Tier-1 international manufacturers with manufacturer-backed warranties and genuine components.', icon: 'Cpu' },
          { title: 'Certified Engineers', description: 'In-house certified technical teams trained in advanced cabling, configuration, and integration.', icon: 'Users' },
          { title: 'Preventative AMC', description: 'Structured preventative maintenance contracts with rapid SLA resolution windows.', icon: 'Wrench' }
        ]
      });
      console.log('✅ [Seeder] Section 2 configuration seeded');
    }

    // 5.1 Seed Section 3 (Solutions)
    if (await Section3Config.countDocuments() === 0) {
      const { getSection3Config } = await import('../controllers/section3Controller.js');
      await getSection3Config({ headers: {} }, { json: () => {} });
      console.log('✅ [Seeder] Section 3 configuration seeded');
    }

    // 5.2 Seed Section 5 (Industries)
    if (await Section5Config.countDocuments() === 0) {
      const { getSection5Config } = await import('../controllers/section5Controller.js');
      await getSection5Config({ headers: {} }, { json: () => {} });
      console.log('✅ [Seeder] Section 5 configuration seeded');
    }

    // 6. Seed Section4 (Divisions)
    if (await Section4Config.countDocuments() === 0) {
      await Section4Config.create({
        title: 'Our Two Divisions',
        heading: 'One Partner. Two Specialist Divisions.',
        cards: [
          {
            title: 'Installation & Maintenance',
            description: 'Professional design, supply, installation, commissioning, and AMC/PMC services across all physical security systems. SLA-governed, UAE-wide coverage.',
            icon: 'fa-screwdriver-wrench',
            buttonText: 'Explore Installation Services',
            buttonLink: '/solutions'
          },
          {
            title: 'Security Equipment Trading',
            description: 'Supply of globally-recognised security hardware — cameras, recorders, access control, alarm panels, biometric devices, cabling — with UAE stock for fast delivery.',
            icon: 'fa-truck-ramp-box',
            buttonText: 'Request a Survey',
            buttonLink: '/contact-us'
          }
        ]
      });
      console.log('✅ [Seeder] Section 4 configuration seeded');
    }

    // 7. Seed Section6 (Why Us)
    if (await Section6Config.countDocuments() === 0) {
      await Section6Config.create({
        badge: 'ENGINEERED FOR SECURITY',
        title: 'Why Choose UniSpark Security Systems?',
        subtitle: 'We combine international security technology with deep UAE regulatory knowledge to deliver systems that protect your operations without compromise.',
        reasons: [
          { title: 'UAE Regulatory Alignment', description: 'Deep knowledge of local security authority guidelines ensuring all installations comply with relevant standards.', icon: 'ShieldCheck' },
          { title: 'End-to-End Delivery', description: 'From site audit and design to equipment procurement, installation, and handover.', icon: 'Layers' },
          { title: 'Brand Agnostic', description: 'We recommend what is right for your facility, risk profile, and budget — not just what is on our shelf.', icon: 'GitCompare' },
          { title: 'Long-Term AMC Support', description: 'Structured maintenance contracts that keep your security systems operational year after year.', icon: 'Clock' }
        ]
      });
      console.log('✅ [Seeder] Section 6 configuration seeded');
    }

    // 8. Seed Stats
    if (await StatsConfig.countDocuments() === 0) {
      await StatsConfig.create({
        items: [
          { value: '500+', label: 'Projects Completed' },
          { value: '99.8%', label: 'System Uptime' },
          { value: '15+', label: 'Years Combined Experience' },
          { value: '24/7', label: 'Support & Response' }
        ]
      });
      console.log('✅ [Seeder] Stats configuration seeded');
    }

    // 9. Seed Partners
    if (await PartnerConfig.countDocuments() === 0) {
      await PartnerConfig.create({
        title: 'Trusted Global Technology Partners',
        subtitle: 'We work directly with the world’s leading security equipment manufacturers.',
        partners: [
          { name: 'Hikvision', logo: '/images/hikvision.png', category: 'CCTV & Video Surveillance' },
          { name: 'Dahua Technology', logo: '/images/dahua.png', category: 'Smart IoT Solutions' },
          { name: 'ZKTeco', logo: '/images/zkteco.png', category: 'Biometrics & Access Control' },
          { name: 'HID Global', logo: '/images/hid.png', category: 'Identity & Access' },
          { name: 'Bosch Security', logo: '/images/bosch.png', category: 'Integrated Safety' },
          { name: 'Honeywell', logo: '/images/honeywell.png', category: 'Building Automation & Fire' }
        ]
      });
      console.log('✅ [Seeder] Partners configuration seeded');
    }

    // 10. Seed Footer
    if (await FooterConfig.countDocuments() === 0) {
      await FooterConfig.create({
        logoUrl: '/images/logo.png',
        companyName: 'UniSpark Innovation Security Systems & Equipment Trading L.L.C',
        companyTagline: 'Next-generation enterprise protection and cyber-physical infrastructure logic designed for global digital business velocity.',
        groupCompaniesLabel: 'Group Companies:',
        groupCompanies: [
          { label: 'Horizon Hive Technology L.L.C', url: 'https://horizonhivetechnology.com/' },
          { label: 'UniSpark Innovations HR Consultants L.L.C', url: 'https://usihr.com/' }
        ],
        socialLinks: [
          { platform: 'Facebook', icon: 'fa-facebook-f', url: 'https://www.facebook.com/UnisparkInnovation/' },
          { platform: 'Instagram', icon: 'fa-instagram', url: 'https://www.instagram.com/unispark_innovation/' },
          { platform: 'X / Twitter', icon: 'fa-x-twitter', url: 'https://x.com/unispark_inn' },
          { platform: 'LinkedIn', icon: 'fa-linkedin-in', url: 'https://www.linkedin.com/company/unispark-innovation/posts/?feedView=all' }
        ],
        solutionsColumnTitle: 'SOLUTIONS',
        industriesColumnTitle: 'INDUSTRIES',
        quickLinksColumnTitle: 'QUICK LINKS',
        quickLinks: [
          { label: 'Home', url: '/' },
          { label: 'About Us', url: '/about-us' },
          { label: 'Solutions', url: '/solutions' },
          { label: 'Industries', url: '/industries' },
          { label: 'Contact Us', url: '/contact-us' }
        ],
        serviceAreasLabel: 'Service Areas:',
        serviceAreas: 'Dubai | Abu Dhabi | Sharjah | UAE Nationwide',
        officeLocation: 'Dubai, United Arab Emirates',
        email: 'sales@unisparkinnovation.com',
        emailLabel: 'Sales',
        phone: '+971 50 288 5874',
        phoneLabel: 'Direct Line / WhatsApp',
        emergencySupportNotice: '24/7 Emergency Technical Support Available for SLA Clients',
        copyrightText: '© 2026 UniSpark Innovation Security Systems & Equipment Trading L.L.C. All Rights Reserved.'
      });
      console.log('✅ [Seeder] Footer configuration seeded');
    }

    // 11. Seed About
    if (await AboutConfig.countDocuments() === 0) {
      await AboutConfig.create({
        bannerBadge: 'ABOUT UNISPARK SECURITY',
        bannerTitle: 'About UniSpark Security Systems',
        bannerDesc: 'UniSpark Innovation Security Systems & Equipment Trading L.L.C is a Dubai-registered company specializing in end-to-end physical security solutions — from design and supply to professional installation, commissioning, and long-term AMC maintenance.',
        bannerBgImage: '',
        mainHeading: 'WHO WE ARE',
        mainDesc: 'We are a physical security company built on technical credibility, regulatory compliance, and a deep understanding of the UAE market.',
        mission: {
          title: 'OUR MISSION',
          description: 'To be the UAE\'s most reliable security systems partner — delivering design, supply, installation, and maintenance of world-class physical security infrastructure.',
          icon: 'Target'
        },
        vision: {
          title: 'OUR VISION',
          description: 'To become a leading UAE security brand — synonymous with technical excellence, rapid response, and uncompromising commitment to safety.',
          icon: 'Eye'
        },
        mainImage: '/images/abt-sec.jpg',
        glanceBadge: 'QUICK OVERVIEW',
        glanceTitle: 'COMPANY AT A GLANCE',
        glanceCards: [
          { title: "Registered Location", desc: "Dubai, United Arab Emirates", icon: "Building2" },
          { title: "Business Core", desc: "Security Systems Trading, Installation & Maintenance", icon: "Wrench" },
          { title: "Geographic Coverage", desc: "Dubai, Abu Dhabi, Sharjah & All Northern Emirates", icon: "Globe" },
          { title: "Target Sectors", desc: "Commercial, Real Estate, Aviation, Oil & Gas, Healthcare", icon: "Target" }
        ],
        timelineBadge: 'OUR JOURNEY',
        timelineTitle: 'MILESTONES OF GROWTH',
        timeline: [
          { year: '2021', title: 'Company Inception', desc: 'Established in Dubai with focus on commercial physical security and systems integration.' },
          { year: '2023', title: 'Enterprise Expansion', desc: 'Secured Tier-1 brand distributor agreements and major hospitality AMC contracts.' },
          { year: '2025', title: 'UAE Nationwide Reach', desc: 'Expanded rapid-response field engineer coverage across all seven Emirates.' }
        ]
      });
      console.log('✅ [Seeder] About configuration seeded');
    }

    // 12. Seed Contact
    if (await ContactConfig.countDocuments() === 0) {
      await ContactConfig.create({
        companyName: 'UniSpark Innovation Security Systems & Equipment Trading L.L.C',
        address: 'Dubai, United Arab Emirates',
        phone: '+971 50 288 5874',
        email: 'sales@unisparkinnovation.com',
        businessHours: 'Monday - Saturday: 8:00 AM - 6:00 PM',
        emergencySupport: '24/7 Available for SLA Contract Clients'
      });
      console.log('✅ [Seeder] Contact configuration seeded');
    }

    console.log('🌟 [Seeder] Database initialization & seeding completed successfully!');
  } catch (err) {
    console.error('⚠️ [Seeder] Error during automatic seeding:', err.message);
  }
};
