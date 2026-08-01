import AboutConfig from './AboutConfig.js';
import { getDBStatus } from '../config/db.js';
import cloudinary from '../config/cloudinary.js';

const defaultAbout = {
  bannerBadge: 'ABOUT UNISPARK SECURITY',
  bannerTitle: 'About UniSpark Security Systems',
  bannerDesc: 'UniSpark Innovation Security Systems & Equipment Trading L.L.C is a Dubai-registered company specializing in end-to-end physical security solutions — from design and supply to professional installation, commissioning, and long-term AMC maintenance. We serve enterprises, real estate developers, aviation facilities, oil & gas installations, hospitality groups, healthcare institutions, and consumer properties across the UAE.',
  mainHeading: 'WHO WE ARE',
  mainDesc: 'We are a physical security company built on technical credibility, regulatory compliance, and a deep understanding of the UAE market. Our engineers have hands-on experience across every system category we offer — CCTV, access control, intruder alarms, fire detection, biometrics, perimeter security, and integrated control room design.',
  mission: {
    title: 'OUR MISSION',
    description: 'To be the UAE\'s most reliable security systems partner — delivering design, supply, installation, and maintenance of world-class physical security infrastructure that protects assets and people with zero compromise.',
    icon: 'Target'
  },
  vision: {
    title: 'OUR VISION',
    description: 'To become a leading UAE security brand — synonymous with technical excellence, rapid response, and uncompromising commitment to safety across every sector we serve.',
    icon: 'Eye'
  },
  mainImage: '/images/abt-sec.jpg',
  glanceBadge: 'QUICK OVERVIEW',
  glanceTitle: 'COMPANY AT A GLANCE',
  glanceCards: [
    { title: "Registered Location", desc: "Dubai, United Arab Emirates", icon: "Building2" },
    { title: "Business Core", desc: "Security Systems Trading, Installation & Maintenance", icon: "Wrench" },
    { title: "Geographic Coverage", desc: "Dubai, Abu Dhabi, Sharjah & All Northern Emirates", icon: "Globe" },
    { title: "Target Sectors", desc: "Commercial, Real Estate, Aviation, Oil & Gas, Healthcare", icon: "Target" },
    { title: "Key Partners", desc: "Hikvision, Dahua, ZKTeco, HID, Bosch, Honeywell", icon: "Award" },
    { title: "Compliance", desc: "UAE Civil Defence & SIRA Standard Operations", icon: "ShieldCheck" }
  ]
};

let inMemoryAbout = { ...defaultAbout };

const handleCloudinaryImageUpload = async (imageUrl) => {
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
      console.log('Uploading About image to Cloudinary...');
      const uploadRes = await cloudinary.uploader.upload(imageUrl, {
        folder: 'about_images',
        resource_type: 'auto'
      });
      return uploadRes.secure_url;
    } catch (err) {
      console.error('Cloudinary About image upload failed:', err.message);
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
    const finalImage = await handleCloudinaryImageUpload(data.mainImage);

    const updateData = {
      ...data,
      mainImage: finalImage || defaultAbout.mainImage,
      mission: data.mission || defaultAbout.mission,
      vision: data.vision || defaultAbout.vision,
      glanceCards: Array.isArray(data.glanceCards) && data.glanceCards.length > 0 ? data.glanceCards : defaultAbout.glanceCards
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
