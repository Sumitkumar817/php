import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  icon: { type: String, default: 'fa-shield-halved' },
  iconUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false }
});

const section3ConfigSchema = new mongoose.Schema({
  badgeText: {
    type: String,
    default: 'WHAT WE DO'
  },
  mainHeading: {
    type: String,
    default: 'End-to-End Physical Security Solutions'
  },
  description: {
    type: String,
    default: 'From initial site survey and system design through to professional installation, commissioning, and long-term maintenance — UniSpark delivers complete security infrastructure for every environment.'
  },
  viewAllButton: {
    text: { type: String, default: 'View All Services' },
    link: { type: String, default: '/solutions' }
  },
  services: {
    type: [serviceSchema],
    default: [
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
  }
}, {
  timestamps: true
});

const Section3Config = mongoose.model('Section3Config', section3ConfigSchema);
export default Section3Config;
