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

  const Section3Config = mongoose.model(
    'Section3Config',
    new mongoose.Schema({}, { strict: false }),
    'section3configs'
  );

  const config = await Section3Config.findOne();
  if (!config) {
    console.log('No Section3Config found!');
    process.exit(1);
  }

  // Load solutionsData from unise-php
  const solutionsFile = path.resolve(__dirname, '../unise-php/src/data/solutionsData.js');
  let code = fs.readFileSync(solutionsFile, 'utf8');
  code = code.replace(/export\s+const\s+solutionsData\s*=\s*/, '').trim().replace(/;$/, '');
  const solutionsData = JSON.parse(code);

  const services = config.services || [];

  for (const sol of solutionsData) {
    const idx = services.findIndex(s => s.id === sol.id);
    const updatedService = {
      id: sol.id,
      title: sol.title,
      desc: sol.summary || sol.desc,
      icon: sol.icon || 'fa-shield-halved',
      featured: true,
      pageTitle: sol.pageTitle,
      bannerTagline: sol.bannerTagline,
      bannerBgImage: sol.bannerBgImage,
      heroCtaText: sol.heroCtaText,
      heroCtaLink: sol.heroCtaLink || '/contact-us',
      overviewBadge: sol.overviewBadge || 'SECTOR OVERVIEW',
      overviewHeading: sol.overviewHeading,
      description: sol.description,
      secImage: sol.secImage,
      scopeBadge: sol.scopeBadge || 'Scope of Work',
      scopeHeading: sol.scopeHeading || "WHAT'S INCLUDED IN OUR SERVICE",
      scopeOfWork: sol.scopeOfWork || [],
      brandsHeading: sol.brandsHeading,
      brands: (sol.brands || []).map(b => ({
        name: b.name || b.alt || '',
        src: b.src
      })),
      sectorsBadge: sol.sectorsBadge || 'Targeted Sectors',
      sectorsHeading: sol.sectorsHeading || '',
      sectorsDesc: sol.sectorsDesc || '',
      targetSectors: sol.targetSectors || [],
      whyBadge: sol.whyBadge || 'Compliance & Expertise',
      whyHeading: sol.whyHeading,
      whyChooseUs: sol.whyChooseUs || [],
      ctaHeading: sol.ctaHeading,
      ctaDesc: sol.ctaDesc,
      ctaBtn1Text: sol.ctaBtn1Text,
      ctaBtn1Link: sol.ctaBtn1Link,
      ctaBtn2Text: sol.ctaBtn2Text,
      ctaBtn2Link: sol.ctaBtn2Link
    };

    if (idx !== -1) {
      services[idx] = { ...services[idx], ...updatedService };
    } else {
      services.push(updatedService);
    }
  }

  config.services = services;
  config.markModified('services');
  await config.save();

  console.log('Successfully synced MongoDB section3 services with exact solutionsData!');
  await mongoose.disconnect();
}

sync().catch(err => {
  console.error('Error syncing DB:', err);
  process.exit(1);
});
