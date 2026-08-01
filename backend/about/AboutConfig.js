import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema({
  title: { type: String, default: 'OUR MISSION' },
  description: { type: String, default: 'To be the UAEs most reliable security systems partner...' },
  icon: { type: String, default: 'Target' } // Lucide icon name
});

const visionSchema = new mongoose.Schema({
  title: { type: String, default: 'OUR VISION' },
  description: { type: String, default: 'To become a leading UAE security brand...' },
  icon: { type: String, default: 'Eye' } // Lucide icon name
});

const glanceCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, required: true } // Lucide icon name
});

const aboutConfigSchema = new mongoose.Schema({
  bannerBadge: { type: String, default: 'ABOUT UNISPARK SECURITY' },
  bannerTitle: { type: String, default: 'About UniSpark Security Systems' },
  bannerDesc: { type: String, default: 'UniSpark Innovation Security Systems & Equipment Trading L.L.C is a Dubai-registered company...' },
  
  mainHeading: { type: String, default: 'WHO WE ARE' },
  mainDesc: { type: String, default: 'We are a physical security company built on technical credibility...' },
  mission: missionSchema,
  vision: visionSchema,
  mainImage: { type: String, default: '/images/abt-sec.jpg' },
  
  glanceBadge: { type: String, default: 'QUICK OVERVIEW' },
  glanceTitle: { type: String, default: 'COMPANY AT A GLANCE' },
  glanceCards: [glanceCardSchema]
}, { timestamps: true });

const AboutConfig = mongoose.model('AboutConfig', aboutConfigSchema);

export default AboutConfig;
