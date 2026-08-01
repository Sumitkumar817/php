import Section5Config from '../models/Section5Config.js';
import { getDBStatus } from '../config/db.js';
import cloudinary from '../config/cloudinary.js';

const defaultSection5 = {
  title: 'INDUSTRIES WE SERVE',
  heading: 'Security Solutions Built for Your Sector',
  description: 'Deploying custom, advanced cyber-security, monitoring, and automated safety matrices engineered for enterprise ecosystems.',
  cards: [
    {
      title: 'Commercial',
      subtitle: 'Corporate offices, retail chains, and business centers.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
      link: '/industries/commercial'
    }
  ]
};

let inMemorySection5 = { ...defaultSection5 };

const handleCloudinaryImageUpload = async (imageUrl) => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  const hasCloudinaryKeys = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;
  if (hasCloudinaryKeys) {
    try {
      console.log('Uploading Section 5 image to Cloudinary...');
      const uploadRes = await cloudinary.uploader.upload(imageUrl, {
        folder: 'section5_images',
        resource_type: 'auto'
      });
      return uploadRes.secure_url;
    } catch (err) {
      console.error('Cloudinary Section 5 image upload failed:', err.message);
      return imageUrl;
    }
  }
  return imageUrl;
};

export const getSection5Config = async (req, res) => {
  try {
    if (getDBStatus()) {
      let config = await Section5Config.findOne();
      if (!config) {
        config = await Section5Config.create(defaultSection5);
      }
      return res.json({ success: true, data: config });
    } else {
      return res.json({ success: true, data: inMemorySection5 });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSection5Config = async (req, res) => {
  const { title, heading, description, cards } = req.body;
  try {
    let finalCards = [];
    if (Array.isArray(cards)) {
      finalCards = await Promise.all(cards.map(async (card) => {
        let finalImage = card.image;
        if (card.image && card.image.startsWith('data:image')) {
          finalImage = await handleCloudinaryImageUpload(card.image);
        }
        return {
          title: card.title,
          subtitle: card.subtitle,
          image: finalImage,
          link: card.link
        };
      }));
    }

    const updateData = {
      title: title || defaultSection5.title,
      heading: heading || defaultSection5.heading,
      description: description || defaultSection5.description,
      cards: finalCards.length > 0 ? finalCards : defaultSection5.cards
    };

    if (getDBStatus()) {
      const updated = await Section5Config.findOneAndUpdate(
        {},
        { $set: updateData },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return res.json({ success: true, message: 'Section 5 configuration saved', data: updated });
    } else {
      inMemorySection5 = { ...updateData };
      return res.json({ success: true, message: 'Section 5 configuration saved (In-Memory)', data: inMemorySection5 });
    }
  } catch (error) {
    console.error('Error in updateSection5Config:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
