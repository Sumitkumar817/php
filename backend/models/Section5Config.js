import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  image: { type: String, required: true },
  link: { type: String }
});

const section5ConfigSchema = new mongoose.Schema({
  title: { type: String, default: 'INDUSTRIES WE SERVE' },
  heading: { type: String, default: 'Security Solutions Built for Your Sector' },
  description: { type: String, default: 'Deploying custom, advanced cyber-security, monitoring, and automated safety matrices engineered for enterprise ecosystems.' },
  cards: [cardSchema]
}, { timestamps: true });

const Section5Config = mongoose.model('Section5Config', section5ConfigSchema);

export default Section5Config;
