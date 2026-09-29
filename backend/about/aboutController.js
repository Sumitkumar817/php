import AboutConfig from './AboutConfig.js';
import { getDBStatus } from '../config/db.js';
import cloudinary from '../config/cloudinary.js';

const defaultAbout = {
  bannerBadge: 'ABOUT UNISPARK SECURITY',
  bannerTitle: 'About UniSpark Security Systems',
  bannerDesc: 'UniSpark Innovation Security Systems & Equipment Trading L.L.C is a Dubai-registered company specialising in end-to-end physical security solutions — from design and supply to professional installation, commissioning, and long-term maintenance. We serve enterprises, real estate developers, aviation facilities, oil & gas installations, hospitality groups, healthcare institutions, and consumer properties across the UAE, bringing hands-on technical expertise and a zero-compromise commitment to security.',
  bannerBgImage: '/images/contact-bg.jpg',
  mainHeading: 'WHO WE ARE',
  mainDesc: 'We are a physical security company built on technical credibility, regulatory compliance, and a deep understanding of the UAE market. Our engineers have hands-on experience across every system category we offer — CCTV, access control, intruder alarm, fire detection, biometrics, perimeter security, and integrated control room design.\n\nWe do not sell security. We deliver it — with precision design, certified installation, and long-term maintenance agreements that ensure your systems remain operational and compliant at all times.',
  mission: {
    title: 'OUR MISSION',
    description: 'To be the UAE\'s most reliable security systems partner — delivering design, supply, installation, and maintenance of world-class physical security infrastructure that protects businesses, assets, and people with zero compromise.',
    icon: 'Target'
  },
  vision: {
    title: 'OUR VISION',
    description: 'To become a leading UAE-based security systems brand — synonymous with technical excellence, rapid response, and uncompromising commitment to safety across every sector we serve, from aviation and real estate to oil & gas and healthcare.',
    icon: 'Eye'
  },
  mainImage: '/images/abt-sec.jpg',
  glanceBadge: 'Quick Overview',
  glanceTitle: 'COMPANY AT A GLANCE',
  glanceCards: [
    { title: "Registered", desc: "Dubai, United Arab Emirates", icon: "Building2" },
    { title: "Business Type", desc: "Security Equipment Trading · Installation · Maintenance", icon: "Settings" },
    { title: "Target Market", desc: "UAE Commercial, Industrial & Residential — B2B & B2G", icon: "Users" },
    { title: "Service Areas", desc: "Dubai · Abu Dhabi · Sharjah · UAE Nationwide", icon: "MapPin" },
    { title: "Industries Served", desc: "Aviation · Real Estate · Oil & Gas · Hospitality · Healthcare", icon: "ShieldAlert" },
    { title: "Group", desc: "UniSpark Innovation Group of Companies.", icon: "Network" }
  ],
  groupBadge: 'Corporate Architecture',
  groupTitle: 'OUR GROUP STRUCTURE',
  groupDesc: 'UniSpark Security is part of the UniSpark Innovations Group — a UAE-registered group of companies delivering technology, human resource, and physical security solutions.',
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
  diffDesc: 'UniSpark combines regulatory excellence, technical expertise, and a vendor-neutral approach to deliver reliable, end-to-end security infrastructure tailored to your needs.',
  diffCards: [
    {
      title: 'UAE-Compliant by Design',
      desc: 'Every installation follows UAE Civil Defence, NESA, and DESC standards. We handle compliance documentation so you don\'t have to.',
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
      icon: 'Cpu'
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
};

let inMemoryAbout = { ...defaultAbout };

const handleCloudinaryImageUpload = async (imageUrl, folderName = 'about_images') => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://') || imageUrl.startsWith('/')) {
    return imageUrl;
  }
  if (!imageUrl.startsWith('data:image/')) {
    return imageUrl;
  }
  const hasCloudinaryKeys = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;
  if (hasCloudinaryKeys) {
    try {
      console.log(`Uploading ${folderName} image to Cloudinary...`);
      const uploadRes = await cloudinary.uploader.upload(imageUrl, {
        folder: folderName,
        resource_type: 'auto'
      });
      return uploadRes.secure_url;
    } catch (err) {
      console.error(`Cloudinary ${folderName} image upload failed:`, err.message);
      return imageUrl;
    }
  }
  return imageUrl;
};

export const getAboutConfig = async (req, res) => {
  try {
    if (getDBStatus()) {
      let config = await AboutConfig.findOne();
      if (!config) {
        config = await AboutConfig.create(defaultAbout);
      } else {
        let needsSave = false;
        if (!config.groupCards || config.groupCards.length === 0) {
          config.groupCards = defaultAbout.groupCards;
          needsSave = true;
        }
        if (!config.diffCards || config.diffCards.length === 0) {
          config.diffCards = defaultAbout.diffCards;
          needsSave = true;
        }
        if (!config.groupBadge) {
          config.groupBadge = defaultAbout.groupBadge;
          config.groupTitle = defaultAbout.groupTitle;
          config.groupDesc = defaultAbout.groupDesc;
          needsSave = true;
        }
        if (!config.diffBadge) {
          config.diffBadge = defaultAbout.diffBadge;
          config.diffTitle = defaultAbout.diffTitle;
          config.diffDesc = defaultAbout.diffDesc;
          needsSave = true;
        }
        if (!config.ctaBadge) {
          config.ctaBadge = defaultAbout.ctaBadge;
          config.ctaTitle = defaultAbout.ctaTitle;
          config.ctaDesc = defaultAbout.ctaDesc;
          config.ctaPrimaryBtnText = defaultAbout.ctaPrimaryBtnText;
          config.ctaPrimaryBtnLink = defaultAbout.ctaPrimaryBtnLink;
          config.ctaSecondaryBtnText = defaultAbout.ctaSecondaryBtnText;
          config.ctaSecondaryBtnLink = defaultAbout.ctaSecondaryBtnLink;
          needsSave = true;
        }
        if (needsSave) {
          await config.save();
        }
      }
      return res.json({ success: true, data: config });
    } else {
      return res.json({ success: true, data: inMemoryAbout });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAboutConfig = async (req, res) => {
  const data = req.body;
  try {
    const finalMainImage = await handleCloudinaryImageUpload(data.mainImage, 'about_images');
    const finalCtaBgImage = await handleCloudinaryImageUpload(data.ctaBgImage, 'about_cta_bg');
    const finalBannerBgImage = await handleCloudinaryImageUpload(data.bannerBgImage, 'about_banner_bg');

    const updateData = {
      ...data,
      mainImage: finalMainImage || defaultAbout.mainImage,
      ctaBgImage: finalCtaBgImage !== undefined ? finalCtaBgImage : defaultAbout.ctaBgImage,
      bannerBgImage: finalBannerBgImage !== undefined ? finalBannerBgImage : defaultAbout.bannerBgImage,
      mission: data.mission || defaultAbout.mission,
      vision: data.vision || defaultAbout.vision,
      glanceCards: Array.isArray(data.glanceCards) && data.glanceCards.length > 0 ? data.glanceCards : defaultAbout.glanceCards,
      groupCards: Array.isArray(data.groupCards) && data.groupCards.length > 0 ? data.groupCards : defaultAbout.groupCards,
      diffCards: Array.isArray(data.diffCards) && data.diffCards.length > 0 ? data.diffCards : defaultAbout.diffCards
    };

    if (getDBStatus()) {
      const updated = await AboutConfig.findOneAndUpdate(
        {},
        { $set: updateData },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return res.json({ success: true, message: 'About configuration saved', data: updated });
    } else {
      inMemoryAbout = { ...updateData };
      return res.json({ success: true, message: 'About configuration saved (In-Memory)', data: inMemoryAbout });
    }
  } catch (error) {
    console.error('Error in updateAboutConfig:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
