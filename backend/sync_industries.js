import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const mongoUri = process.env.MONGO_URI;

async function sync() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(mongoUri);
  console.log('Connected!');

  const Section5Config = mongoose.model(
    'Section5Config',
    new mongoose.Schema({}, { strict: false }),
    'section5configs'
  );

  let config = await Section5Config.findOne();
  if (!config) {
    config = new Section5Config({
      title: 'INDUSTRIES WE SERVE',
      heading: 'Security Solutions Built for Your Sector',
      description: 'Deploying custom, advanced cyber-security, monitoring, and automated safety matrices engineered for enterprise ecosystems.',
      cards: []
    });
  }

  // Load industriesData
  const file = path.resolve(__dirname, '../unise-php/src/data/industriesData.js');
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/export\s+const\s+industriesData\s*=\s*/, '').trim().replace(/;$/, '');
  const industriesData = JSON.parse(code);

  const cards = config.cards || [];

  for (const ind of industriesData) {
    const idx = cards.findIndex(c => c.id === ind.id);
    const updatedCard = {
      id: ind.id,
      title: ind.title,
      subtitle: ind.bannerTagline || ind.subtitle || '',
      description: ind.description || '',
      icon: ind.icon || 'fa-building',
      image: ind.secImage || ind.image || '/images/ind1.jpg',
      link: `/industries/${ind.id}`,

      // Detailed inside page fields
      pageTitle: ind.pageTitle,
      bannerTagline: ind.bannerTagline,
      bannerBgImage: ind.bannerBgImage,
      heroCtaText: ind.heroCtaText,
      heroCtaLink: ind.heroCtaLink,

      overviewBadge: ind.overviewBadge,
      overviewHeading: ind.overviewHeading,
      challengesHeading: ind.challengesHeading,
      challengesText: ind.challengesText,
      secImage: ind.secImage,
      overviewImage: ind.secImage,

      solutionsBadge: ind.solutionsBadge,
      solutionsHeading: ind.solutionsHeading,
      solutionsProvided: ind.solutionsProvided,

      brandsHeading: ind.brandsHeading,
      brandsSubheading: ind.brandsSubheading,
      brands: ind.brands,

      whyBadge: ind.whyBadge,
      whyHeading: ind.whyHeading,
      whyChooseUs: ind.whyChooseUs,

      ctaHeading: ind.ctaHeading,
      ctaDesc: ind.ctaDesc,
      ctaBtn1Text: ind.ctaBtn1Text,
      ctaBtn1Link: ind.ctaBtn1Link,
      ctaBtn2Text: ind.ctaBtn2Text,
      ctaBtn2Link: ind.ctaBtn2Link
    };

    if (idx !== -1) {
      cards[idx] = { ...cards[idx], ...updatedCard };
    } else {
      cards.push(updatedCard);
    }
  }

  config.cards = cards;
  config.markModified('cards');
  await config.save();

  console.log('Successfully synced MongoDB section5 with full industries data!');
  await mongoose.disconnect();
}

sync().catch(err => {
  console.error('Error syncing DB:', err);
  process.exit(1);
});
