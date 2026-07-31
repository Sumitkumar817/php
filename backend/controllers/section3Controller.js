import Section3Config from '../models/Section3Config.js';
import { getDBStatus } from '../config/db.js';
import cloudinary from '../config/cloudinary.js';

const defaultSection3 = {
  badgeText: 'WHAT WE DO',
  mainHeading: 'End-to-End Physical Security Solutions',
  description: 'From initial site survey and system design through to professional installation, commissioning, and long-term maintenance — UniSpark delivers complete security infrastructure for every environment.',
  viewAllButton: {
    text: 'View All Services',
    link: '/solutions'
  },
  services: [
    {
      id: 'cctv-and-ip-camera-systems',
      title: 'CCTV & IP Camera Systems',
      icon: 'fa-video',
      desc: 'HD surveillance, remote monitoring, and smart analytics for complete site visibility.',
      featured: true
    },
    {
      id: 'access-control-systems',
      title: 'Access Control Systems',
      icon: 'fa-id-card-clip',
      desc: 'Card, biometric, and multi-factor access control for every door, gate, and perimeter.',
      featured: true
    },
    {
      id: 'intruder-alarm-and-detection-systems',
      title: 'Intruder Alarm & Detection',
      icon: 'fa-bell',
      desc: 'Motion, vibration, and perimeter detection systems connected to central monitoring.',
      featured: false
    },
    {
      id: 'fire-alarm-and-detection-systems',
      title: 'Fire Alarm & Detection',
      icon: 'fa-fire-extinguisher',
      desc: 'UAE Civil Defence-compliant fire detection and alarm systems for all building types.',
      featured: false
    },
    {
      id: 'biometric-and-smart-security-systems',
      title: 'Biometric & Smart Security',
      icon: 'fa-fingerprint',
      desc: 'Fingerprint, face recognition, and iris scan systems integrated with HR and payroll.',
      featured: false
    },
    {
      id: 'system-integration-and-control-room-setup',
      title: 'System Integration & Control Room Setup',
      icon: 'fa-display',
      desc: 'Unified security management platforms, SOC design, and video walls.',
      featured: true
    }
  ]
};

let inMemorySection3 = { ...defaultSection3 };

// Helper to upload Service icon image to Cloudinary if base64/new image
const handleCloudinaryIconUpload = async (iconUrl) => {
  if (!iconUrl) return '';
  if (iconUrl.startsWith('http://') || iconUrl.startsWith('https://')) return iconUrl;

  const hasCloudinaryKeys =
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

  if (hasCloudinaryKeys) {
    try {
      console.log('Uploading service icon to Cloudinary...');
      const uploadRes = await cloudinary.uploader.upload(iconUrl, {
        folder: 'service_icons',
        resource_type: 'auto'
      });
      return uploadRes.secure_url;
    } catch (err) {
      console.error('Cloudinary icon upload failed:', err.message);
      return iconUrl;
    }
  } else {
    return iconUrl;
  }
};

// GET /api/section3 - Retrieve Section 3 Configuration
export const getSection3Config = async (req, res) => {
  try {
    if (getDBStatus()) {
      let config = await Section3Config.findOne();
      if (!config) {
        config = await Section3Config.create(defaultSection3);
      }
      return res.json({ success: true, data: config });
    } else {
      return res.json({ success: true, data: inMemorySection3 });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/section3 - Update Section 3 Configuration
export const updateSection3Config = async (req, res) => {
  const { badgeText, mainHeading, description, viewAllButton, services } = req.body;

  try {
    let processedServices = [];
    if (Array.isArray(services)) {
      for (const item of services) {
        let finalIconUrl = item.iconUrl;
        if (item.iconUrl && item.iconUrl.startsWith('data:image/')) {
          finalIconUrl = await handleCloudinaryIconUpload(item.iconUrl);
        }
        processedServices.push({
          id: item.id || `service-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          title: item.title,
          desc: item.desc || '',
          icon: item.icon || 'fa-shield-halved',
          iconUrl: finalIconUrl || '',
          featured: !!item.featured
        });
      }
    } else {
      processedServices = defaultSection3.services;
    }

    const updateData = {
      badgeText: badgeText || defaultSection3.badgeText,
      mainHeading: mainHeading || defaultSection3.mainHeading,
      description: description || defaultSection3.description,
      viewAllButton: {
        text: viewAllButton?.text || defaultSection3.viewAllButton.text,
        link: viewAllButton?.link || defaultSection3.viewAllButton.link
      },
      services: processedServices
    };

    if (getDBStatus()) {
      const updated = await Section3Config.findOneAndUpdate(
        {},
        { $set: updateData },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return res.json({ success: true, message: 'Section 3 configuration saved in MongoDB Atlas', data: updated });
    } else {
      inMemorySection3 = { ...updateData };
      return res.json({ success: true, message: 'Section 3 configuration saved (In-Memory)', data: inMemorySection3 });
    }
  } catch (error) {
    console.error('Error in updateSection3Config:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
