import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SolutionsSection from '../components/SolutionsSection';
import DivisionsSection from '../components/DivisionsSection';
import IndustriesSection from '../components/IndustriesSection';
import WhyUsSection from '../components/WhyUsSection';
import PartnersSection from '../components/PartnersSection';
import StatsSection from '../components/StatsSection';
import OurGroupSection from '../components/OurGroupSection';
import CtaSection from '../components/CtaSection';

export default function HomePage({ onOpenEnquiry }) {
  return (
    <div className="space-y-0">
      <HeroSection onOpenEnquiry={onOpenEnquiry} />
      <AboutSection />
      <SolutionsSection />
      <DivisionsSection onOpenEnquiry={onOpenEnquiry} />
      <IndustriesSection />
      <WhyUsSection />
      <PartnersSection />
      <StatsSection />
      <OurGroupSection />
      <CtaSection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
}
